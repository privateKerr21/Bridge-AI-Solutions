import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { generateAuditReport } from "@/lib/anthropic";
import { renderReportPdf } from "@/lib/pdf";
import type { AuditRawResponses } from "@/lib/types";

export const runtime = "nodejs";
// Audit generation calls Anthropic — give it generous time.
export const maxDuration = 60;

// POST /api/audit/submit
// Body: AuditRawResponses + { session_id }
// Flow: look up purchase by session_id → save raw responses → generate report → return auditId
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { session_id, ...responses } = body as AuditRawResponses & { session_id?: string };

  if (!session_id || typeof session_id !== "string") {
    return Response.json({ error: "session_id is required" }, { status: 400 });
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

  // Look up the purchase + lead from the Stripe session
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

  // Idempotency: if an audit already exists for this purchase, return it.
  const { data: existing } = await supabaseAdmin
    .from("audit_responses")
    .select("id, status")
    .eq("purchase_id", purchase.id)
    .maybeSingle();

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
        lead_id: purchase.lead_id,
        purchase_id: purchase.id,
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
    try {
      const pdfBuffer = await renderReportPdf(report);
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
      .eq("id", purchase.lead_id);

    // Email delivery is wired in Day 5.

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
