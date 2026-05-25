import { notFound } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";
import AuditQuiz from "@/components/AuditQuiz";

// Post-purchase page. URL: /shadow-audit/thank-you/cs_test_...
// Verifies the Stripe session is paid, then shows the audit form.

interface PageProps {
  params: Promise<{ session_id: string }>;
}

export const dynamic = "force-dynamic"; // never cache — session-specific

export default async function ThankYouPage({ params }: PageProps) {
  const { session_id } = await params;

  if (!session_id || !session_id.startsWith("cs_")) {
    notFound();
  }

  // Verify the Stripe session is real and paid
  let paid = false;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    paid = session.payment_status === "paid";
  } catch {
    notFound();
  }

  if (!paid) {
    return (
      <main className="squeeze-page">
        <div className="squeeze-container">
          <h1 className="squeeze-h1">Payment is still processing.</h1>
          <p>
            We&apos;re waiting for Stripe to confirm your purchase. Refresh this page in
            a moment, or check your email for confirmation. If this persists, email{" "}
            <a href="mailto:hello@aibridgedsolutions.com">hello@aibridgedsolutions.com</a>.
          </p>
        </div>
      </main>
    );
  }

  // Check if audit is already completed for this session — skip the form and redirect
  const { data: purchase } = await supabaseAdmin
    .from("purchases")
    .select("id")
    .eq("stripe_session_id", session_id)
    .maybeSingle();

  if (purchase) {
    const { data: audit } = await supabaseAdmin
      .from("audit_responses")
      .select("id, status")
      .eq("purchase_id", purchase.id)
      .maybeSingle();

    if (audit && audit.status === "completed") {
      // Already done — send to the result page
      return (
        <main className="squeeze-page">
          <div className="squeeze-container">
            <p className="squeeze-eyebrow">Audit complete</p>
            <h1 className="squeeze-h1">Your Strategic Roadmap is ready.</h1>
            <p>
              <a href={`/dashboard/audit/${audit.id}`} className="btn-ink">
                View your roadmap →
              </a>
            </p>
          </div>
        </main>
      );
    }
  }

  return (
    <main className="squeeze-page">
      <div className="squeeze-container">
        <p className="squeeze-eyebrow">// Step 2 of 2</p>
        <h1 className="squeeze-h1">Now build your roadmap.</h1>
        <p className="squeeze-sub">
          Ten quick questions about how your business actually runs. Takes 5–7 minutes.
          Your Strategic Roadmap is generated as soon as you finish.
        </p>
        <AuditQuiz sessionId={session_id} />
      </div>
    </main>
  );
}
