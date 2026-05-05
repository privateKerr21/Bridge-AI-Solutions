import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Real AI-powered software built for small B2B businesses. See how Bridge AI Solutions has helped clients move faster, research smarter, and own what they build.",
  openGraph: {
    title: "Our Work — Bridge AI Solutions",
    description:
      "Real AI-powered software built for small B2B businesses. See how Bridge AI Solutions has helped clients move faster, research smarter, and own what they build.",
    url: "https://aibridgedsolutions.com/work",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work — Bridge AI Solutions",
    description:
      "Real AI-powered software built for small B2B businesses.",
  },
};

const caseStudies = [
  {
    id: "behavioral-health-market-intelligence",
    client: "Behavioral Health Technology Company",
    service: "AI-Powered Market Intelligence",
    opportunity:
      "A behavioral health technology company was expanding into new market segments. Their team had the domain expertise to identify the right prospects — but translating that knowledge into a systematic research process was slow. Finding and qualifying potential clients across multiple target verticals meant hours of manual work per cycle.",
    build:
      "Working alongside the company's marketing team, we defined the agent's criteria, responsibilities, and capabilities together — then built a custom AI agent trained on the company's proprietary knowledge: product positioning, ideal customer profiles, and target market context. The agent autonomously mapped market spaces and surfaced qualified prospects against their specific criteria, turning institutional knowledge into a repeatable process.",
    result:
      "Competitive market research that previously required significant manual effort now runs in a fraction of the time. The team shifted from doing research to acting on it.",
  },
];

export default function WorkPage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className="container">
          <span className={"label " + styles.heroLabel}>// Our Work</span>
          <h1>Real software. Real results.</h1>
          <p className={styles.heroSub}>
            Every engagement starts with a problem worth solving. Here&apos;s
            what that looks like in practice.
          </p>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className={styles.studies}>
        <div className="container">
          {caseStudies.map((cs) => (
            <article key={cs.id} className={styles.card}>
              <header className={styles.cardHeader}>
                <span className={"label " + styles.cardLabel}>
                  {cs.service}
                </span>
                <h2 className={styles.cardClient}>{cs.client}</h2>
              </header>

              <div className={styles.sections}>
                <div className={styles.block}>
                  <h3 className={styles.blockHeading}>The Opportunity</h3>
                  <p>{cs.opportunity}</p>
                </div>
                <div className={styles.block}>
                  <h3 className={styles.blockHeading}>What We Built</h3>
                  <p>{cs.build}</p>
                </div>
                <div className={styles.resultBlock}>
                  <h3 className={styles.blockHeading}>The Result</h3>
                  <p>{cs.result}</p>
                </div>
              </div>
            </article>
          ))}

          <div className={styles.moreNote}>
            <p>
              More case studies coming soon. Each engagement is different —{" "}
              <Link href="/#quiz">take the quiz</Link> to see what we&apos;d
              build for you.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={"section-dark " + styles.cta}>
        <div className="container">
          <span className={"label " + styles.ctaLabel}>// Start Here</span>
          <h2>Have a problem worth solving?</h2>
          <p>
            We start with a 30-minute discovery call — no pitch, no
            obligation. If there&apos;s a real fit, we&apos;ll tell you exactly
            what we&apos;d build and what it would cost.
          </p>
          <a
            href="https://calendly.com/h-kerr711/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Book a Discovery Call
          </a>
        </div>
      </section>
    </>
  );
}
