import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { generateAuditReport } from "@/lib/anthropic";
import { renderReportPdf } from "@/lib/pdf";
import { sendEmail } from "@/lib/resend";
import { renderAuditReportEmail } from "@/lib/emails/audit-report";
import type { AuditRawResponses } from "@/lib/types";

export const runtime = "nodejs";
// Audit generation calls Anthropic — give it generous time.
export const maxDuration = 60;

// POST /api/audit/submit
// Body: AuditRawResponses + ({ session_id } | { audit_token })
// Flow:
//   - paid: look up purchase by session_id → audit ties to lead_id + purchase_id
//   - free: look up lead by audit_token → audit ties to lead_id, purchase_id null
//   - generate report → return auditId
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { session_id, audit_token, ...responses } = body as AuditRawResponses & {
    session_id?: string;
    audit_token?: string;
  };

  if (!session_id && !audit_token) {
    return Response.json(
      { error: "session_id or audit_token is required" },
      { status: 400 }
    );
  }

  // Basic shape validation
  if (
    !responses.role_and_business ||
    !responses.team_size ||
    !Array.isArray(responses.workflows) ||
    responses.workflows.length !== 2 ||
    !responses.calibration_blocker
  ) {
    return Response.json({ error: "Incomplete audit responses" }, { status: 400 });
  }

  // Resolve gate → lead_id (+ optional purchase_id for the paid path)
  let leadId: string;
  let purchaseId: string | null = null;

  if (session_id) {
    const { data: purchase, error: purchaseError } = await supabaseAdmin
      .from("purchases")
      .select("id, lead_id, tier")
      .eq("stripe_session_id", session_id)
      .maybeSingle();

    if (purchaseError) {
      return Response.json(
        { error: `Failed to look up purchase: ${purchaseError.message}` },
        { status: 500 }
      );
    }

    if (!purchase) {
      return Response.json(
        { error: "Purchase not found for that checkout session. If you just paid, wait a few seconds and refresh." },
        { status: 404 }
      );
    }

    leadId = purchase.lead_id;
    purchaseId = purchase.id;
  } else {
    const { data: lead, error: leadError } = await supabaseAdmin
      .from("leads")
      .select("id")
      .eq("audit_token", audit_token!)
      .maybeSingle();

    if (leadError) {
      return Response.json(
        { error: `Failed to look up lead: ${leadError.message}` },
        { status: 500 }
      );
    }

    if (!lead) {
      return Response.json({ error: "Invalid audit token" }, { status: 404 });
    }

    leadId = lead.id;
  }

  // Idempotency: if an audit already exists for this gate, return it.
  const existingQuery = supabaseAdmin
    .from("audit_responses")
    .select("id, status");
  const { data: existing } = await (purchaseId
    ? existingQuery.eq("purchase_id", purchaseId).maybeSingle()
    : existingQuery.eq("lead_id", leadId).is("purchase_id", null).maybeSingle());

  if (existing && existing.status === "completed") {
    return Response.json({ auditId: existing.id });
  }

  // Save raw responses with status pending
  let auditId: string;
  if (existing) {
    auditId = existing.id;
    await supabaseAdmin
      .from("audit_responses")
      .update({
        raw_responses: responses,
        status: "generating",
        error_message: null,
      })
      .eq("id", auditId);
  } else {
    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("audit_responses")
      .insert({
        lead_id: leadId,
        purchase_id: purchaseId,
        raw_responses: responses,
        status: "generating",
      })
      .select("id")
      .single();

    if (insertError || !inserted) {
      return Response.json(
        { error: `Failed to save audit responses: ${insertError?.message || "no row"}` },
        { status: 500 }
      );
    }
    auditId = inserted.id;
  }

  // Generate report via Claude
  try {
    const report = await generateAuditReport(responses);

    // Render PDF
    let pdfUrl: string | null = null;
    let pdfBuffer: Buffer | null = null;
    try {
      pdfBuffer = await renderReportPdf(report);
      const path = `audits/${auditId}.pdf`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from("audit-reports")
        .upload(path, pdfBuffer, {
          contentType: "application/pdf",
          upsert: true,
        });

      if (uploadError) {
        // Non-fatal — we still have the JSON report
        console.error("[audit submit] PDF upload failed:", uploadError.message);
      } else {
        const { data: signed } = await supabaseAdmin.storage
          .from("audit-reports")
          .createSignedUrl(path, 60 * 60 * 24 * 365); // 1 year
        pdfUrl = signed?.signedUrl || null;
      }
    } catch (pdfErr) {
      console.error("[audit submit] PDF render failed:", pdfErr);
      // Continue — JSON report is the source of truth.
    }

    await supabaseAdmin
      .from("audit_responses")
      .update({
        generated_report: report,
        pdf_url: pdfUrl,
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", auditId);

    // Upgrade lead status
    await supabaseAdmin
      .from("leads")
      .update({ status: "audit_completed" })
      .eq("id", leadId);

    // Send the report delivery email (best-effort — never fail the audit).
    try {
      const { data: lead } = await supabaseAdmin
        .from("leads")
        .select("email, name")
        .eq("id", leadId)
        .maybeSingle();

      if (lead?.email) {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aibridgedsolutions.com";
        const dashboardUrl = `${appUrl}/dashboard/audit/${auditId}`;
        const { subject, html, text } = renderAuditReportEmail({
          recipientName: lead.name,
          dashboardUrl,
          hasPdf: pdfBuffer !== null,
        });

        await sendEmail({
          to: lead.email,
          subject,
          html,
          text,
          attachments: pdfBuffer
            ? [{ filename: "bridge-ai-shadow-audit.pdf", content: pdfBuffer }]
            : undefined,
        });
      }
    } catch (emailErr) {
      console.error("[audit submit] email delivery failed:", emailErr);
    }

    return Response.json({ auditId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[audit submit] generation failed:", err);

    await supabaseAdmin
      .from("audit_responses")
      .update({
        status: "failed",
        error_message: message,
      })
      .eq("id", auditId);

    return Response.json(
      { error: `Report generation failed: ${message}. Your audit is saved — we'll regenerate it.` },
      { status: 500 }
    );
  }
}
