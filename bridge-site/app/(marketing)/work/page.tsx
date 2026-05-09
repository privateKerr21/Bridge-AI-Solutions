import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected work from Bridge AI Solutions — including Surety, the multi-tenant SaaS we built and operate ourselves.",
  openGraph: {
    title: "Selected Work — Bridge AI Solutions",
    description:
      "Selected work from Bridge AI Solutions — including Surety, the multi-tenant SaaS we built and operate ourselves.",
    url: "https://aibridgedsolutions.com/work",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected Work — Bridge AI Solutions",
    description:
      "Selected work from Bridge AI Solutions — including Surety, the multi-tenant SaaS we built and operate ourselves.",
  },
};

export default function WorkPage() {
  return (
    <>
      {/* HEADER */}
      <section className={styles.header} aria-labelledby="work-heading">
        <div className={styles.headerInner}>
          <p className={styles.headerMeta}>
            <span>// Selected work</span>
          </p>
          <h1 id="work-heading" className={styles.headerH1}>
            We build the software our<br />
            <em>clients ship to their customers.</em>
          </h1>
          <p className={styles.headerSub}>
            And occasionally, we build software for ourselves. Surety is one
            of those — a working product in live production, billed in Stripe,
            running on the same stack we recommend to clients.
          </p>
        </div>
      </section>

      <hr className={styles.rule} />

      {/* CASE STUDY — SURETY */}
      <article className={styles.caseStudy}>
        <header className={styles.caseHeader}>
          <p className={styles.caseMeta}>
            <span>// Case 01</span>
            <span className={styles.caseMetaYear}>2026</span>
          </p>
          <h2 className={styles.caseTitle}>Surety</h2>
          <p className={styles.caseTagline}>
            <em>One lapsed COI can shut down your job site.</em>
            <br />
            Surety stops that from happening.
          </p>
        </header>

        <figure className={styles.caseFigure}>
          <Image
            src="/work/surety-landing.png"
            alt="Surety — multi-tenant SaaS for COI tracking. Live at suretybuild.com."
            width={1440}
            height={900}
            className={styles.caseImage}
            priority
          />
          <figcaption className={styles.caseFigcaption}>
            <a
              href="https://suretybuild.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.caseLink}
            >
              Visit suretybuild.com →
            </a>
          </figcaption>
        </figure>

        <div className={styles.caseFacts}>
          <div className={styles.caseFact}>
            <span className={styles.caseFactKey}>Role</span>
            <span className={styles.caseFactValue}>Studio product</span>
          </div>
          <div className={styles.caseFact}>
            <span className={styles.caseFactKey}>Status</span>
            <span className={styles.caseFactValue}>Live in production</span>
          </div>
          <div className={styles.caseFact}>
            <span className={styles.caseFactKey}>Customers</span>
            <span className={styles.caseFactValue}>General contractors</span>
          </div>
          <div className={styles.caseFact}>
            <span className={styles.caseFactKey}>Stack</span>
            <span className={styles.caseFactValue}>
              Next.js 16 · Supabase · Stripe · Resend
            </span>
          </div>
        </div>

        <div className={styles.caseBody}>
          <section className={styles.caseSection}>
            <p className={styles.caseSectionLabel}>// Problem</p>
            <p>
              General contractors juggle dozens of subcontractors. Each one
              carries a separate Certificate of Insurance, with its own carrier,
              coverages, and expiry date. When a COI lapses unnoticed, the GC
              is on the hook for the liability — or, more often, the job site
              gets shut down until the paperwork catches up. The standard
              tooling is a spreadsheet, a calendar, and a person whose memory
              is the system of record.
            </p>
          </section>

          <section className={styles.caseSection}>
            <p className={styles.caseSectionLabel}>// Approach</p>
            <p>
              Surety was built as a multi-tenant SaaS that ingests COIs in
              under two minutes, parses every expiry, and emails subcontractors
              (and the GC) seven and thirty days before each cliff. Every sub,
              every carrier, every cert — covered. The stack was chosen for
              shipping speed and ownership: Next.js on Vercel for the
              application, Supabase for multi-tenant Postgres and auth, Stripe
              for live billing, Resend for transactional email from a verified
              domain. The same stack we recommend to clients, picked because
              we ship on it ourselves.
            </p>
          </section>

          <section className={styles.caseSection}>
            <p className={styles.caseSectionLabel}>// Outcome</p>
            <p>
              Surety is live at <a href="https://suretybuild.com" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>suretybuild.com</a>,
              billed in Stripe, running on a verified Resend domain at
              suretybuild.com. The product proves out the studio&apos;s thesis:
              custom software, owned outright, beats stitched-together SaaS
              when the workflow is specific enough. We use the same patterns
              and the same stack on every client engagement.
            </p>
          </section>
        </div>
      </article>

      <hr className={styles.rule} />

      {/* CLOSING CTA */}
      <section className={styles.closing} aria-labelledby="closing-heading">
        <div className={styles.closingInner}>
          <p className={styles.closingMeta}>
            <span>// Next</span>
          </p>
          <h2 id="closing-heading" className={styles.closingH2}>
            Have a problem worth building around?
          </h2>
          <p className={styles.closingSub}>
            A 30-minute discovery call. No pitch, no obligation. If there is a
            real fit, you receive a written proposal with the build plan, the
            price, and the ROI math against your actual workflow.
          </p>
          <div className={styles.closingCTA}>
            <a
              href="https://calendly.com/h-kerr711/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink"
            >
              Book a discovery call
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
