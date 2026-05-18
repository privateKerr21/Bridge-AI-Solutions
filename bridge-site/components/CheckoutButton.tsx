"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { AuditTier, AuditVariant } from "@/lib/types";

interface CheckoutButtonProps {
  tier: AuditTier;
  variant: AuditVariant;
  label: string;
  className?: string;
}

export default function CheckoutButton({
  tier,
  variant,
  label,
  className,
}: CheckoutButtonProps) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    const utm = {
      source: searchParams.get("utm_source") || "bagelbots",
      campaign: searchParams.get("utm_campaign") || "launch",
      content: searchParams.get("utm_content") || `variant-${variant}`,
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, variant, utm }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Checkout failed (${res.status})`);
      }

      const { url } = await res.json();
      if (!url) throw new Error("No checkout URL returned");
      window.location.href = url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setLoading(false);
    }
  }

  return (
    <div className="checkout-button-wrap">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={className || "checkout-button"}
      >
        {loading ? "Redirecting…" : label}
      </button>
      {error && <p className="checkout-error">{error}</p>}
    </div>
  );
}
