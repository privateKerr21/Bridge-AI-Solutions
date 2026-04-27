import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Quiz from "@/components/Quiz";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Bridge AI Solutions — Stop Patching. Start Building.",
  description:
    "Bridge AI Solutions builds custom AI-powered software and tools for small B2B businesses. We identify your biggest operational bottleneck and build a real solution — handed off so you own it.",
};

const faqItems = [
  {
    q: "What does Bridge AI Solutions do?",
    a: "Bridge AI Solutions is a custom software consultancy that builds AI-powered tools and automations for small B2B service businesses in the United States. We identify your biggest operational bottleneck, build a real solution around it, and hand it off — you own the code and everything in it.",
  },
  {
    q: "Who is Bridge AI Solutions for?",
    a: "Small B2B service businesses — typically 1–20 people — spending significant hours each week on manual, repetitive work. If you are tracking important things in spreadsheets, copy-pasting between tools, or running processes that depend on one person's memory, we are built for you.",
  },
  {
    q: "What is the difference between custom AI software and no-code tools like Zapier?",
    a: "Zapier connects existing apps with pre-built triggers and actions. Custom software is built from the ground up around your exact process — no workarounds, no per-task limits, no breaking when an API changes. You own it outright instead of renting access to someone else's infrastructure.",
  },
  {
    q: "How long does a project take?",
    a: "A Focused Build (one targeted problem) takes about a week from kickoff. A Signature Build runs 3–4 weeks depending on scope. You get a specific timeline during your discovery call.",
  },
  {
    q: "Do I own the software after the project?",
    a: "Yes — fully. You own the code, the data, and all of it. We build in our own environment and transfer everything cleanly to your accounts at handoff. No lock-in, no dependency on Bridge AI to keep it running.",
  },
  {
    q: "What kinds of problems does custom AI software solve for small businesses?",
    a: "The most common: manual client reporting that takes hours weekly, outreach and follow-up that falls through the cracks, research done by hand, and internal dashboards that do not yet exist. If the process is repetitive and rule-based, it is usually automatable.",
  },
  {
    q: "Do I need to be technical to work with Bridge AI?",
    a: "No. You need to describe the problem clearly — what you are doing today, how long it takes, and what the ideal outcome looks like. We handle the technical side entirely. Most clients have never written a line of code.",
  },
  {
    q: "How is Bridge AI different from hiring a freelancer?",
    a: "A freelancer builds what you spec. We start with discovery — identifying the right problem before writing code. We also bring AI-specific expertise most freelancers do not have, and every project includes documentation and training so you are never dependent on us afterward.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* JSON-LD schema added in Phase 6 via server-safe injection */}

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={"container " + styles.heroInner}>
          <Image
            src="/brand/logos/bridge_ai_logo4.png"
            alt="Bridge AI Solutions mark"
            width={160}
            height={160}
            className={styles.heroLogoMark}
            priority
          />
          <span className={"label " + styles.heroLabel}>// Bridge AI Solutions</span>
          <h1 className={styles.heroH1}>
            Stop patching.<br />
            <span className={styles.textAccent}>Start building.</span>
          </h1>
          <p className={styles.heroSub}>
            Bridge AI Solutions is a custom software consultancy that builds AI-powered tools and
            automations for small B2B service businesses in the United States. We identify your biggest
            operational bottleneck and build a real solution — real software, handed off so you own it.
          </p>
          <div className={styles.heroActions}>
            <Link href="#quiz" className="btn btn-primary">
              Find Your Biggest Bottleneck
            </Link>
            <span className={styles.heroOr}>or reach out directly</span>
            <div className={styles.heroContactLinks}>
              <a href="mailto:h.kerr@aibridgedsolutions.com">h.kerr@aibridgedsolutions.com</a>
              <a
                href="https://www.linkedin.com/in/harrisonkerr21/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <hr className="rule" />
      <Quiz />

      {/* HOW IT WORKS */}
      <section className={styles.processSection} id="process">
        <div className="container">
          <div className={styles.processHeader}>
            <span className="label">How It Works</span>
            <h2>Three steps. Real results.</h2>
          </div>
          <div className={styles.processGrid}>
            {[
              { num: "01 / Discover", title: "We map your time", body: "A 30-minute call to identify exactly which tasks are eating your hours and which are ready to automate." },
              { num: "02 / Build", title: "We build the solution", body: "A custom AI-powered tool or platform built around your exact workflow — not a generic SaaS that almost fits." },
              { num: "03 / Hand Off", title: "You take the wheel", body: "Full documentation, training, and ongoing support. You own it — we are here when you need us." },
            ].map(({ num, title, body }) => (
              <div key={num} className={styles.processStep}>
                <span className={styles.processNum}>{num}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {[
              { num: "10", suffix: "+", label: "Hours saved / week", desc: "Average time recovered by clients in the first 30 days" },
              { num: "80", suffix: "%", label: "Of busywork is automatable", desc: "Research shows most repetitive tasks can be handled by AI today" },
              { num: "3", suffix: "x", label: "ROI in 90 days", desc: "Typical return on automation investment within the first quarter" },
              { num: "2", suffix: "wks", label: "Average build time", desc: "From discovery call to live, working custom tool" },
            ].map(({ num, suffix, label, desc }) => (
              <div key={label} className={styles.statItem}>
                <div className={styles.statNumber}>
                  {num}<span className={styles.statSuffix}>{suffix}</span>
                </div>
                <div className={styles.statLabel}>{label}</div>
                <p className={styles.statDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className="container">
          <span
            className="label"
            style={{ display: "block", marginBottom: 16, color: "var(--muted)" }}
          >
            Common Questions
          </span>
          <h2>Everything you need to know.</h2>
          <div className={styles.faqGrid}>
            {faqItems.map(({ q, a }) => (
              <div key={q} className={styles.faqItem}>
                <p className={styles.faqQ}>{q}</p>
                <p className={styles.faqA}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className={styles.ctaBand}>
        <div className="container">
          <div className={styles.ctaBandInner}>
            <h2>Want the full picture first?</h2>
            <Link href="/insights" className="btn btn-dark">
              Read the Research
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
