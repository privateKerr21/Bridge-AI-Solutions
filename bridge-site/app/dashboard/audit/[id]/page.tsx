import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { GeneratedReport } from "@/lib/types";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Your Strategic Roadmap",
  robots: { index: false, follow: false },
};

export default async function AuditViewPage({ params }: PageProps) {
  const { id } = await params;

  const { data: audit } = await supabaseAdmin
    .from("audit_responses")
    .select("id, status, generated_report, pdf_url, created_at, completed_at, error_message")
    .eq("id", id)
    .maybeSingle();

  if (!audit) {
    notFound();
  }

  if (audit.status === "failed") {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>// Report unavailable</p>
          <h1 className={styles.h1}>Something went wrong generating your roadmap.</h1>
          <p className={styles.body}>
            Don&apos;t worry — your audit responses are saved and we&apos;ll regenerate it.
            Email <a href="mailto:hello@aibridgedsolutions.com">hello@aibridgedsolutions.com</a> if
            this persists.
          </p>
          {audit.error_message && (
            <p className={styles.errorDetail}>
              <code>{audit.error_message}</code>
            </p>
          )}
        </div>
      </main>
    );
  }

  if (audit.status !== "completed" || !audit.generated_report) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>// Generating</p>
          <h1 className={styles.h1}>Building your roadmap…</h1>
          <p className={styles.body}>Refresh in a few seconds.</p>
        </div>
      </main>
    );
  }

  const report = audit.generated_report as GeneratedReport;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>// Strategic Roadmap · Design Phase</p>
        <h1 className={styles.h1}>{report.diagnosis.role_summary}</h1>

        {/* DIAGNOSIS */}
        <section className={styles.section}>
          <h2 className={styles.sectionH}>The Diagnosis</h2>
          <p className={styles.narrative}>{report.diagnosis.narrative}</p>
          <dl className={styles.factsRow}>
            <div className={styles.fact}>
              <dt>Shadow Work concentrated in</dt>
              <dd>{report.diagnosis.shadow_work_areas.join(" · ")}</dd>
            </div>
            <div className={styles.fact}>
              <dt>Estimated time reclaimable</dt>
              <dd className={styles.factHighlight}>{report.diagnosis.total_hours_reclaimable}</dd>
            </div>
          </dl>
        </section>

        {/* OPPORTUNITY MATRIX */}
        <section className={styles.section}>
          <h2 className={styles.sectionH}>The Opportunity Matrix</h2>
          {report.opportunity_matrix.map((item, i) => (
            <article key={i} className={styles.opportunity}>
              <h3 className={styles.opportunityName}>{item.workflow_name}</h3>
              <div className={styles.opportunityGrid}>
                <div>
                  <p className={styles.opLabel}>// Problem / Goal</p>
                  <p className={styles.opValue}>{item.problem_or_goal}</p>
                </div>
                <div>
                  <p className={styles.opLabel}>// Proposed Solution</p>
                  <p className={styles.opValue}>{item.proposed_solution}</p>
                </div>
                <div>
                  <p className={styles.opLabel}>// Action</p>
                  <p className={styles.opValue}>{item.action_category}</p>
                </div>
                <div>
                  <p className={styles.opLabel}>// Impact</p>
                  <p className={styles.opValue}>{item.impact}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* NEXT STEPS */}
        <section className={styles.section}>
          <h2 className={styles.sectionH}>The First Build</h2>
          <p className={styles.recommendation}>{report.next_steps.recommended_first_build}</p>
          <p className={styles.body}>{report.next_steps.rationale}</p>
          <div className={styles.scopeBox}>
            <div className={styles.scopeBlock}>
              <p className={styles.opLabel}>// Phases</p>
              <ul className={styles.phaseList}>
                {report.next_steps.scope.phases.map((phase, i) => (
                  <li key={i} className={styles.phaseRow}>
                    <span className={styles.phaseName}>{phase.name}</span>
                    <span className={styles.phaseSummary}>{phase.summary}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.scopeBlock}>
              <p className={styles.opLabel}>// Key Components</p>
              <ul className={styles.componentList}>
                {report.next_steps.scope.key_components.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className={styles.opLabel}>// Definition of Done</p>
              <p className={styles.opValue}>{report.next_steps.scope.definition_of_done}</p>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <h2 className={styles.sectionH}>Want help shipping this?</h2>
          <p className={styles.body}>
            You could take this roadmap and run with it. Or, if you&apos;d rather have it
            built for you, reply to the email this came from — we&apos;ll talk through the
            first build and decide if it&apos;s worth doing together.
          </p>
          {audit.pdf_url && (
            <div className={styles.ctaActions}>
              <a
                href={audit.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.pdfLink}
              >
                Download PDF ↓
              </a>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
