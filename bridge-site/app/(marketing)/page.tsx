import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Quiz from "@/components/Quiz";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: "Bridge AI Solutions — Stop Patching. Start Building." },
  description:
    "Bridge AI Solutions builds custom AI-powered software and tools for small B2B businesses. We identify your biggest operational bottleneck and build a real solution — handed off so you own it.",
  openGraph: {
    title: "Bridge AI Solutions — Stop Patching. Start Building.",
    description:
      "Custom AI-powered software for small B2B businesses. We identify your biggest operational bottleneck and build a real solution you own.",
    url: "https://aibridgedsolutions.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bridge AI Solutions — Stop Patching. Start Building.",
    description:
      "Custom AI-powered software for small B2B businesses. We identify your biggest operational bottleneck and build a real solution you own.",
  },
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
    a: "A Focused Build (one targeted problem) takes about a week from kickoff. A Signature Build runs 3–4 weeks depending on scope. The specific timeline lands in the proposal that follows the discovery call.",
  },
  {
    q: "Do I own the software after the project?",
    a: "Yes — fully. You own the code, the data, and all of it. We build in our own environment and transfer everything cleanly to your accounts at handoff. No lock-in, no dependency on Bridge AI to keep it running.",
  },
  {
    q: "What kinds of problems does custom AI software solve for small businesses?",
    a: "Patterns we look for: manual client reporting that takes hours weekly, outreach and follow-up that falls through the cracks, research done by hand, and internal dashboards that do not yet exist. If a process is repetitive and rule-based, it is usually automatable.",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* HERO */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <p className={styles.heroMeta}>
              <span>// 2026 — A Practice</span>
            </p>
            <h1 id="hero-heading" className={styles.heroH1}>
              Stop patching.<br />
              <em>Start building.</em>
            </h1>
            <p className={styles.heroSub}>
              A small studio building custom AI-powered software for small B2B
              service businesses in the United States. We identify the bottleneck,
              build the tool, hand off the code.
            </p>
            <div className={styles.heroCTA}>
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
          <div className={styles.heroRight}>
            <div className={styles.heroImageWrap}>
              <Image
                src="/work/surety-landing.png"
                alt="Surety — multi-tenant SaaS for COI tracking, shipped 2026"
                fill
                sizes="(max-width: 1023px) 100vw, 60vw"
                className={styles.heroImage}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <section className={styles.proofStrip} aria-label="From the studio">
        <div className={styles.proofStripInner}>
          <span className={styles.proofStripItem}>
            <span className={styles.proofStripKey}>// From the studio</span>
          </span>
          <span className={styles.proofStripItem}>
            <span className={styles.proofStripKey}>Product —</span>
            <a
              href="https://suretybuild.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.proofStripLink}
            >
              suretybuild.com
            </a>
          </span>
          <span className={styles.proofStripItem}>
            <span className={styles.proofStripKey}>In production —</span>
            <span className={styles.proofStripValue}>2026</span>
          </span>
          <span className={styles.proofStripItem}>
            <span className={styles.proofStripKey}>Stack —</span>
            <span className={styles.proofStripValue}>Next.js · Supabase · Stripe</span>
          </span>
        </div>
      </section>
      <Quiz />

      {/* HOW IT WORKS */}
      <section className={styles.processSection} id="process" aria-labelledby="process-heading">
        <div className={styles.processInner}>
          <div className={styles.processHeader}>
            <p className={styles.processMeta}>
              <span>// How it works</span>
            </p>
            <h2 id="process-heading" className={styles.processH2}>
              Three steps. <em>You own the result.</em>
            </h2>
          </div>
          <div className={styles.processGrid}>
            {[
              { num: "01 / Discover", title: "We scope your time", body: "A 30-minute call to map the tasks eating your hours. The proposal that follows lays out what to build, the price, and the ROI math against your actual workflow." },
              { num: "02 / Build", title: "We ship the tool", body: "A custom AI-powered tool or platform built around your exact workflow — not a generic SaaS that almost fits. Documented, tested, deployed." },
              { num: "03 / Hand off", title: "You take the wheel", body: "Full documentation, training, and a clean transfer to your accounts. You own the code outright. We're here if you want us; you don't need us to keep the lights on." },
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

      {/* FAQ */}
      <section className={styles.faqSection} aria-labelledby="faq-heading">
        <div className={styles.faqInner}>
          <p className={styles.faqMeta}>
            <span>// Common questions</span>
          </p>
          <h2 id="faq-heading" className={styles.faqH2}>
            Everything you need to know.
          </h2>
          <div className={styles.faqList}>
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
      <section className={styles.ctaBand} aria-labelledby="cta-heading">
        <div className={styles.ctaBandInner}>
          <p className={styles.ctaBandMeta}>
            <span>// Read further</span>
          </p>
          <h2 id="cta-heading" className={styles.ctaBandH2}>
            Want the full picture first?
          </h2>
          <p className={styles.ctaBandSub}>
            The Insights page lays out where custom AI software actually pays
            off, what it can and can&apos;t do, and the kinds of workflows
            we&apos;d build around.
          </p>
          <Link href="/insights" className={styles.ctaBandLink}>
            Read the research →
          </Link>
        </div>
      </section>
    </>
  );
}
