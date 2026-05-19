"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { AuditVariant } from "@/lib/types";

interface StartFormProps {
  variant: AuditVariant;
  utmSource?: string;
  utmCampaign?: string;
  utmContent?: string;
}

export default function StartForm({
  variant,
  utmSource,
  utmCampaign,
  utmContent,
}: StartFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/lead/free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || undefined,
          variant,
          utm: {
            source: utmSource,
            campaign: utmCampaign,
            content: utmContent,
          },
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Submission failed (${res.status})`);
      }

      const { redirectUrl } = await res.json();
      if (!redirectUrl) throw new Error("No redirect URL returned");
      router.push(redirectUrl);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="start-form">
      <label htmlFor="start-email" className="start-form__label">
        Email
        <input
          id="start-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="start-form__input"
          disabled={loading}
        />
      </label>
      <label htmlFor="start-name" className="start-form__label">
        Name <span className="start-form__optional">(optional)</span>
        <input
          id="start-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First and last"
          className="start-form__input"
          disabled={loading}
        />
      </label>
      <button type="submit" disabled={loading} className="start-form__submit">
        {loading ? "Starting…" : "Start the audit →"}
      </button>
      {error && <p className="start-form__error">{error}</p>}
    </form>
  );
}
