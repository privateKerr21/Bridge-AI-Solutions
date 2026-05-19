import { NextRequest } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import type { AuditTier, AuditVariant } from "@/lib/types";

// POST /api/checkout
// Body: { tier: 'audit_paid', variant: 'a' | 'b', utm?: {...} }
// Response: { url: string } — Stripe-hosted checkout URL to redirect to
// Note: audit_free does NOT go through this endpoint — it skips Stripe and uses
// /api/lead/free instead.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { tier, variant, utm } = body as {
    tier?: AuditTier;
    variant?: AuditVariant;
    utm?: { source?: string; campaign?: string; content?: string };
  };

  if (tier !== "audit_paid") {
    return Response.json({ error: "Invalid tier" }, { status: 400 });
  }
  if (variant !== "a" && variant !== "b") {
    return Response.json({ error: "Invalid variant" }, { status: 400 });
  }

  try {
    const session = await createCheckoutSession({
      tier,
      variant,
      utm: utm || {},
    });

    if (!session.url) {
      return Response.json({ error: "Stripe did not return a checkout URL" }, { status: 502 });
    }

    return Response.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: `Checkout creation failed: ${message}` }, { status: 500 });
  }
}
