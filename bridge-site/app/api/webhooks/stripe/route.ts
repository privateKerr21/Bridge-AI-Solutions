import { NextRequest } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe, tierAmountCents } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { AuditTier, AuditVariant } from "@/lib/types";

export const runtime = "nodejs"; // Stripe SDK uses Node crypto for signature verification

// POST /api/webhooks/stripe
// Stripe sends events here. We verify the signature, then handle:
// - checkout.session.completed → create lead + purchase records
// - checkout.session.expired   → record abandoned-checkout email as lead
export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return Response.json({ error: "STRIPE_WEBHOOK_SECRET not configured" }, { status: 500 });
  }

  const headersList = await headers();
  const signature = headersList.get("stripe-signature");
  if (!signature) {
    return Response.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  // We need the raw body for signature verification — read as text.
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: `Signature verification failed: ${message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case "checkout.session.expired":
        await handleCheckoutExpired(event.data.object as Stripe.Checkout.Session);
        break;
      default:
        // Ignore other events
        break;
    }
    return Response.json({ received: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[stripe webhook] handler error:", err);
    return Response.json({ error: `Handler error: ${message}` }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email || session.customer_email;
  if (!email) {
    console.warn(`[stripe webhook] completed session ${session.id} has no email — skipping`);
    return;
  }

  const tier = (session.metadata?.tier || "") as AuditTier;
  const variant = (session.metadata?.variant || "a") as AuditVariant;
  if (tier !== "audit_paid") {
    console.warn(`[stripe webhook] completed session ${session.id} has invalid tier:`, tier);
    return;
  }

  const utm_source = session.metadata?.utm_source || null;
  const utm_campaign = session.metadata?.utm_campaign || null;
  const utm_content = session.metadata?.utm_content || null;
  const name = session.customer_details?.name || null;

  // Upsert lead by email (lowercase for uniqueness)
  const { data: lead, error: leadError } = await supabaseAdmin
    .from("leads")
    .upsert(
      {
        email: email.toLowerCase(),
        name,
        source: utm_source || "bagelbots",
        utm_source,
        utm_campaign,
        utm_content,
        variant,
        status: "purchased",
      },
      { onConflict: "email", ignoreDuplicates: false }
    )
    .select()
    .single();

  if (leadError || !lead) {
    throw new Error(`Failed to upsert lead: ${leadError?.message || "no row returned"}`);
  }

  // Insert purchase
  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id || null;

  const { error: purchaseError } = await supabaseAdmin.from("purchases").insert({
    lead_id: lead.id,
    stripe_session_id: session.id,
    stripe_payment_intent_id: paymentIntentId,
    tier,
    amount_cents: session.amount_total ?? tierAmountCents(tier),
    status: "completed",
  });

  if (purchaseError) {
    // Idempotency: if already inserted (duplicate webhook), don't fail
    if (!purchaseError.message.includes("duplicate")) {
      throw new Error(`Failed to insert purchase: ${purchaseError.message}`);
    }
  }
}

async function handleCheckoutExpired(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email || session.customer_email;
  if (!email) return; // No email captured — nothing to record

  const variant = (session.metadata?.variant || "a") as AuditVariant;
  const utm_source = session.metadata?.utm_source || null;
  const utm_campaign = session.metadata?.utm_campaign || null;
  const utm_content = session.metadata?.utm_content || null;

  // Insert as lead only if we don't already have one (don't downgrade a purchased lead)
  const { data: existing } = await supabaseAdmin
    .from("leads")
    .select("id, status")
    .eq("email", email.toLowerCase())
    .maybeSingle();

  if (existing) {
    // Already in our system — don't touch status
    return;
  }

  await supabaseAdmin.from("leads").insert({
    email: email.toLowerCase(),
    name: session.customer_details?.name || null,
    source: utm_source || "bagelbots",
    utm_source,
    utm_campaign,
    utm_content,
    variant,
    status: "lead",
  });
}
