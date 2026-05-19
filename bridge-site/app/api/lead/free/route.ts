import { NextRequest } from "next/server";
import { randomBytes } from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { AuditVariant } from "@/lib/types";

export const runtime = "nodejs";

// POST /api/lead/free
// Body: { email, variant, utm?: { source, campaign, content }, name? }
// Creates (or updates) a lead with a random audit_token and returns the URL
// to the token-gated audit form. Free tier only — no Stripe involved.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email, variant, utm, name } = body as {
    email?: string;
    variant?: AuditVariant;
    utm?: { source?: string; campaign?: string; content?: string };
    name?: string;
  };

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Valid email is required" }, { status: 400 });
  }
  if (variant !== "a" && variant !== "b") {
    return Response.json({ error: "Invalid variant" }, { status: 400 });
  }

  const normalizedEmail = email.toLowerCase();
  const utm_source = utm?.source || null;
  const utm_campaign = utm?.campaign || null;
  const utm_content = utm?.content || null;

  // If a lead already exists for this email, reuse its token (or mint one
  // if a paid lead is doing the free flow for some reason).
  const { data: existing } = await supabaseAdmin
    .from("leads")
    .select("id, audit_token, status")
    .eq("email", normalizedEmail)
    .maybeSingle();

  let leadId: string;
  let token: string;

  if (existing) {
    leadId = existing.id;
    if (existing.audit_token) {
      token = existing.audit_token;
    } else {
      token = randomBytes(24).toString("base64url");
      const { error: updateError } = await supabaseAdmin
        .from("leads")
        .update({ audit_token: token })
        .eq("id", leadId);
      if (updateError) {
        return Response.json(
          { error: `Failed to update lead: ${updateError.message}` },
          { status: 500 }
        );
      }
    }
  } else {
    token = randomBytes(24).toString("base64url");
    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("leads")
      .insert({
        email: normalizedEmail,
        name: name || null,
        source: utm_source || "bagelbots",
        utm_source,
        utm_campaign,
        utm_content,
        variant,
        status: "lead",
        audit_token: token,
      })
      .select("id")
      .single();

    if (insertError || !inserted) {
      return Response.json(
        { error: `Failed to create lead: ${insertError?.message || "no row"}` },
        { status: 500 }
      );
    }
    leadId = inserted.id;
  }

  return Response.json({ token, redirectUrl: `/shadow-audit/audit/${token}` });
}
