import Stripe from "stripe";
import type { AuditTier, AuditVariant } from "./types";

// Use a placeholder during build if env var is missing. Any actual API call
// will fail clearly at runtime. This lets `next build` evaluate routes that
// import this module without env vars set (e.g. on a fresh Vercel deploy).
const secretKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_unset";

export const stripe = new Stripe(secretKey, {
  // Lock to the SDK's pinned API version. Bump intentionally when upgrading.
  apiVersion: "2026-04-22.dahlia",
});

export function assertStripeConfigured(): void {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────

export function priceIdForTier(tier: AuditTier): string {
  if (tier === "audit_9") {
    const id = process.env.STRIPE_PRICE_AUDIT_9;
    if (!id) throw new Error("STRIPE_PRICE_AUDIT_9 is not set");
    return id;
  }
  const id = process.env.STRIPE_PRICE_AUDIT_97;
  if (!id) throw new Error("STRIPE_PRICE_AUDIT_97 is not set");
  return id;
}

export function tierFromPriceId(priceId: string): AuditTier | null {
  if (priceId === process.env.STRIPE_PRICE_AUDIT_9) return "audit_9";
  if (priceId === process.env.STRIPE_PRICE_AUDIT_97) return "audit_97";
  return null;
}

export function tierAmountCents(tier: AuditTier): number {
  return tier === "audit_9" ? 995 : 9700;
}

interface CreateCheckoutOptions {
  tier: AuditTier;
  variant: AuditVariant;
  utm: {
    source?: string;
    campaign?: string;
    content?: string;
  };
}

export async function createCheckoutSession({
  tier,
  variant,
  utm,
}: CreateCheckoutOptions): Promise<Stripe.Checkout.Session> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: priceIdForTier(tier),
        quantity: 1,
      },
    ],
    // Force Stripe to collect email so abandoned-checkout capture works.
    customer_creation: "always",
    payment_intent_data: {
      // Tag the underlying payment for easier reconciliation.
      metadata: {
        tier,
        variant,
      },
    },
    metadata: {
      tier,
      variant,
      utm_source: utm.source || "",
      utm_campaign: utm.campaign || "",
      utm_content: utm.content || "",
    },
    success_url: `${appUrl}/shadow-audit/thank-you/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/shadow-audit-${tier === "audit_9" ? "9" : "97"}?cancelled=1`,
    // Hide the "Powered by Stripe" footer and disable extra payment methods we don't want.
    billing_address_collection: "auto",
  });
}
