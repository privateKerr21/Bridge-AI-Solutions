import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "See what custom AI-powered software looks like across consulting, accounting, marketing agencies, and recruitment — with real time savings per use case.",
  openGraph: {
    title: "Use Cases — Bridge AI Solutions",
    description:
      "See what custom AI-powered software looks like across consulting, accounting, marketing agencies, and recruitment — with real time savings per use case.",
    url: "https://aibridgedsolutions.com/use-cases",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Cases — Bridge AI Solutions",
    description:
      "See what custom AI-powered software looks like across consulting, accounting, marketing agencies, and recruitment.",
  },
};

export default function UseCasesPage() {
  return (
    <>
      {/* TODO Phase 6: JSON-LD schema */}

      {/* HERO */}
      <section className={styles.ucHero}>
        <div className="container">
          <span className={"label " + styles.heroLabel}>// Use Cases</span>
          <h1>What custom AI-powered software looks like in practice</h1>
          <p className={styles.ucHeroSub}>
            These are real tools and platforms built for small B2B service businesses — the kind of internal software that replaces the spreadsheets and manual steps eating your team&apos;s time.
          </p>
          <p className={styles.ucHeroNote}>
            Custom software applies across industries. These are examples of what it can look like — your specific bottleneck is the real starting point.
          </p>
        </div>
      </section>

      {/* INDUSTRY SECTIONS */}
      <section className={styles.ucSections}>
        <div className="container">

          {/* Consulting */}
          <article className={styles.ucIndustry} id="consulting">
            <div className={styles.tldrBlock}>
              <strong>Quick Answer</strong>
              <p>
                Consulting businesses using custom AI software typically save 8–10 hours per week on proposal writing, meeting documentation, and client reporting. These tasks follow repeatable patterns — the exact workflows custom software handles well. Bridge AI Solutions builds these tools for consulting firms and hands them off so the firm owns and operates them independently.
              </p>
            </div>
            <div className={styles.ucIndustryHeader}>
              <h2>What can AI automate for consulting businesses?</h2>
              <p>
                Consulting firms spend significant hours each week on proposal writing, meeting notes, and status reporting — work that follows repeatable patterns. Custom AI software handles these administrative tasks so your team stays billable rather than buried in admin.
              </p>
            </div>
            <div className={styles.cardsGrid}>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Proposal Builder</div>
                <p className={styles.ucCardDesc}>A custom tool that generates first-draft proposals from discovery notes and a scoped template — replacing hours of manual formatting. Consistent output, faster turnaround, every engagement.</p>
                <span className={styles.timeBadge}>~3 hrs saved / week</span>
              </div>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Meeting Intelligence Tool</div>
                <p className={styles.ucCardDesc}>An internal tool that transcribes client calls and surfaces structured action items — replacing manual note-taking entirely. Your team leaves every meeting with a clean record.</p>
                <span className={styles.timeBadge}>~2 hrs saved / week</span>
              </div>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Client Research Dashboard</div>
                <p className={styles.ucCardDesc}>A custom briefing platform that compiles company background, recent news, and talking points before every meeting — replacing an hour of manual research. Show up prepared every time.</p>
                <span className={styles.timeBadge}>~2 hrs saved / week</span>
              </div>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Client Reporting Platform</div>
                <p className={styles.ucCardDesc}>A purpose-built tool that compiles project updates into a formatted weekly report automatically — replacing manual assembly. Clients stay informed; your team stays focused on delivery.</p>
                <span className={styles.timeBadge}>~1.5 hrs saved / week</span>
              </div>
            </div>
          </article>

          {/* Accounting */}
          <article className={styles.ucIndustry} id="accounting">
            <div className={styles.tldrBlock}>
              <strong>Quick Answer</strong>
              <p>
                Accounting firms using custom AI software typically save 8–12 hours per week on invoice processing, document collection, and recurring report generation. These high-volume, rule-based tasks are ideal for automation. Bridge AI Solutions builds custom tools for accounting firms and hands them off so the firm owns and operates them independently.
              </p>
            </div>
            <div className={styles.ucIndustryHeader}>
              <h2>What can AI automate for accounting firms?</h2>
              <p>
                Accounting firms lose hours every week to data entry, document chasing, and recurring report assembly. Custom AI software automates these repetitive workflows so your team can focus on advisory work that actually requires judgment.
              </p>
            </div>
            <div className={styles.cardsGrid}>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Invoice Processing Tool</div>
                <p className={styles.ucCardDesc}>A custom tool that extracts line items from incoming invoices and logs them to your system — replacing manual data entry. Eliminates errors and frees up hours at scale.</p>
                <span className={styles.timeBadge}>~4 hrs saved / week</span>
              </div>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Client Onboarding Platform</div>
                <p className={styles.ucCardDesc}>A branded intake system that generates engagement letters, checklists, and intake forms from a client profile — replacing a manual multi-step process. First impressions are consistent and fast.</p>
                <span className={styles.timeBadge}>~2 hrs saved / week</span>
              </div>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Document Collection Tracker</div>
                <p className={styles.ucCardDesc}>A custom portal that tracks document receipt per client and surfaces what&apos;s missing — replacing email chains and spreadsheet trackers. Nothing falls through the cracks during busy season.</p>
                <span className={styles.timeBadge}>~3 hrs saved / week</span>
              </div>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Reporting Dashboard</div>
                <p className={styles.ucCardDesc}>A purpose-built tool that generates monthly or quarterly financial summaries from your data — replacing manual report assembly. Reports go out on time, every cycle.</p>
                <span className={styles.timeBadge}>~2 hrs saved / week</span>
              </div>
            </div>
          </article>

          {/* Marketing Agencies */}
          <article className={styles.ucIndustry} id="marketing-agencies">
            <div className={styles.tldrBlock}>
              <strong>Quick Answer</strong>
              <p>
                Marketing agencies using custom AI software typically save 6–8 hours per week on client reporting, content repurposing, and lead scoring. These production tasks follow predictable patterns that custom software handles reliably. Bridge AI Solutions builds these tools for marketing agencies and hands them off so the agency owns and operates them independently.
              </p>
            </div>
            <div className={styles.ucIndustryHeader}>
              <h2>What can AI automate for marketing agencies?</h2>
              <p>
                Marketing agencies spend significant time on client reporting, content reformatting, and lead qualification — tasks that follow predictable patterns. Custom AI tools handle the production work so your creative team stays focused on strategy and execution.
              </p>
            </div>
            <div className={styles.cardsGrid}>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Content Repurposing Tool</div>
                <p className={styles.ucCardDesc}>A custom AI tool that turns a single blog post or video into social copy, email snippets, and ad variations — replacing hours of manual reformatting. One asset, multiple formats.</p>
                <span className={styles.timeBadge}>~3 hrs saved / week</span>
              </div>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Client Reporting Dashboard</div>
                <p className={styles.ucCardDesc}>A purpose-built platform that pulls campaign metrics and generates formatted client reports — replacing manual spreadsheet assembly. Polished output without the grind.</p>
                <span className={styles.timeBadge}>~2 hrs saved / week</span>
              </div>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Lead Scoring Platform</div>
                <p className={styles.ucCardDesc}>A custom tool that scores and prioritizes inbound leads based on your fit criteria before they hit your CRM — replacing manual qualification. Your sales team focuses only on the right conversations.</p>
                <span className={styles.timeBadge}>~2 hrs saved / week</span>
              </div>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Brief Generator</div>
                <p className={styles.ucCardDesc}>A custom intake-to-brief tool that converts client form answers into a structured creative brief — replacing the blank-page start. Consistent quality and faster kickoffs every time.</p>
                <span className={styles.timeBadge}>~1.5 hrs saved / week</span>
              </div>
            </div>
          </article>

          {/* Recruitment */}
          <article className={styles.ucIndustry} id="recruitment">
            <div className={styles.tldrBlock}>
              <strong>Quick Answer</strong>
              <p>
                Recruitment agencies using custom AI software typically save 6–8 hours per week on resume screening, outreach drafting, and scheduling coordination. These high-volume tasks are ideal for automation. Bridge AI Solutions builds custom tools for recruitment agencies and hands them off so the agency owns and operates them independently.
              </p>
            </div>
            <div className={styles.ucIndustryHeader}>
              <h2>What can AI automate for recruitment agencies?</h2>
              <p>
                Recruitment agencies spend hours on resume screening, outreach drafting, and scheduling coordination. Custom AI software handles the repetitive coordination work so recruiters stay in the conversations that actually close placements.
              </p>
            </div>
            <div className={styles.cardsGrid}>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Candidate Screening Tool</div>
                <p className={styles.ucCardDesc}>A custom AI tool that summarizes resumes against job requirements and surfaces top matches — replacing manual first-pass review. Shortlists in minutes, not hours.</p>
                <span className={styles.timeBadge}>~4 hrs saved / week</span>
              </div>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Outreach Message Builder</div>
                <p className={styles.ucCardDesc}>A custom tool that drafts personalized outreach messages from a candidate profile and role description — replacing templated copy-paste. Higher response rates, less time per message.</p>
                <span className={styles.timeBadge}>~2 hrs saved / week</span>
              </div>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Job Description Generator</div>
                <p className={styles.ucCardDesc}>A purpose-built intake-to-JD tool that produces first drafts from a role intake form — replacing blank-page writing. Consistent tone and structure without starting from scratch.</p>
                <span className={styles.timeBadge}>~1.5 hrs saved / week</span>
              </div>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Scheduling Coordination Platform</div>
                <p className={styles.ucCardDesc}>A custom scheduling tool that manages coordination between candidates and hiring managers — replacing back-and-forth email chains entirely. Everyone stays on track without manual follow-up.</p>
                <span className={styles.timeBadge}>~1 hr saved / week</span>
              </div>
            </div>
          </article>

          {/* Construction */}
          <article className={styles.ucIndustry} id="construction">
            <div className={styles.tldrBlock}>
              <strong>Quick Answer</strong>
              <p>
                Construction businesses using custom AI software typically save 6–10 hours per week on site reporting, estimate preparation, and compliance documentation. These back-office tasks follow repeatable patterns that custom software handles reliably. Bridge AI Solutions builds these tools for construction businesses and hands them off so the company owns and operates them independently.
              </p>
            </div>
            <div className={styles.ucIndustryHeader}>
              <h2>What can AI automate for construction businesses?</h2>
              <p>
                Construction businesses spend significant time on site reporting, bid preparation, and compliance documentation. Custom AI software handles the back-office paperwork so project managers and crews stay focused on the build.
              </p>
            </div>
            <div className={styles.cardsGrid}>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Site Report Generator</div>
                <p className={styles.ucCardDesc}>A custom tool that produces end-of-day reports from crew notes and site updates — replacing manual write-ups. Keeps clients informed and creates a paper trail without the overhead.</p>
                <span className={styles.timeBadge}>~3 hrs saved / week</span>
              </div>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Estimate &amp; Quote Builder</div>
                <p className={styles.ucCardDesc}>A purpose-built quoting tool that drafts project estimates from a scope of work template and materials list — replacing manual calculation and formatting. Faster bids mean more jobs won.</p>
                <span className={styles.timeBadge}>~3 hrs saved / week</span>
              </div>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Subcontractor Management Platform</div>
                <p className={styles.ucCardDesc}>A custom tracker for scheduling, document requests, and status follow-ups with subs — replacing scattered emails and spreadsheets. One place to manage every sub relationship.</p>
                <span className={styles.timeBadge}>~2 hrs saved / week</span>
              </div>
              <div className={styles.ucCard}>
                <div className={styles.ucCardTitle}>Safety &amp; Compliance Doc Tool</div>
                <p className={styles.ucCardDesc}>A custom generator for toolbox talk summaries, incident reports, and inspection checklists — replacing manual document creation. Stay compliant without the paperwork pile.</p>
                <span className={styles.timeBadge}>~2 hrs saved / week</span>
              </div>
            </div>
          </article>

        </div>
      </section>

      {/* CTA BAND */}
      <section className={styles.ctaBand}>
        <div className="container">
          <div className={styles.ctaBandInner}>
            <h2>Don&apos;t see your industry? Let&apos;s talk.</h2>
            <a href="mailto:h.kerr@aibridgedsolutions.com" className="btn btn-primary">
              Get in Touch &rarr;
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
