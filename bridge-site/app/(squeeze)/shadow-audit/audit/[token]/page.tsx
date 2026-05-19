import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import AuditQuiz from "@/components/AuditQuiz";

// Token-gated audit form for the free tier.
// URL: /shadow-audit/audit/<audit_token>

interface PageProps {
  params: Promise<{ token: string }>;
}

export const dynamic = "force-dynamic"; // never cache — gated per-lead

export default async function FreeAuditPage({ params }: PageProps) {
  const { token } = await params;

  if (!token || token.length < 8) {
    notFound();
  }

  const { data: lead } = await supabaseAdmin
    .from("leads")
    .select("id, status")
    .eq("audit_token", token)
    .maybeSingle();

  if (!lead) {
    notFound();
  }

  // If the audit is already completed for this lead, send straight to the
  // result page rather than letting them re-fill the form.
  const { data: existingAudit } = await supabaseAdmin
    .from("audit_responses")
    .select("id, status")
    .eq("lead_id", lead.id)
    .is("purchase_id", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingAudit && existingAudit.status === "completed") {
    return (
      <main className="squeeze-page">
        <div className="squeeze-container">
          <p className="squeeze-eyebrow">Audit complete</p>
          <h1 className="squeeze-h1">Your Strategic Roadmap is ready.</h1>
          <p>
            <a href={`/dashboard/audit/${existingAudit.id}`} className="btn-ink">
              View your roadmap →
            </a>
          </p>
        </div>
      </main>
    );
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
        <AuditQuiz auditToken={token} />
      </div>
    </main>
  );
}
