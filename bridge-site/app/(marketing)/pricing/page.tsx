import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "How we work",
  description:
    "Three engagements for custom AI-powered software, from a focused one-week build to ongoing partnership. Every project scoped and priced after a 30-minute discovery call.",
  openGraph: {
    title: "How we work — Bridge AI Solutions",
    description:
      "Three engagements for custom AI-powered software, from a focused one-week build to ongoing partnership. Every project scoped and priced after a 30-minute discovery call.",
    url: "https://aibridgedsolutions.com/pricing",
  },
  twitter: {
    card: "summary_large_image",
    title: "How we work — Bridge AI Solutions",
    description:
      "Three engagements. Every project scoped and priced after a 30-minute discovery call.",
  },
};

const faqs = [
  {
    q: "What kinds of tools do you actually build?",
    a: "Custom internal apps, dashboards, and platforms — anything from a single-purpose tracker to a full multi-user system. If you're managing something important in spreadsheets, manual processes, or a patchwork of tools that don't talk to each other, that's the kind of problem we solve.",
  },
  {
    q: "How long does a build take?",
    a: "Focused Builds typically take about a week from kickoff. Signature Builds run 3–4 weeks depending on scope and how quickly you can provide feedback. The specific timeline lands in the proposal that follows the discovery call.",
  },
  {
    q: "Why isn't pricing listed on the site?",
    a: "Every build is shaped to a specific operational problem, and the right scope depends on what's actually broken and what you want it to do. We price after the discovery call so the number reflects the work, not a template. You receive a written proposal with a specific build plan and a fixed fee — no hourly billing, no surprises.",
  },
  {
    q: "What do I need to have ready before we start?",
    a: "A clear problem you want solved and availability to give feedback during the build. You don't need a technical spec, that's our job. The more specifically you can describe what's eating your time, the better.",
  },
  {
    q: "What happens after the build is handed off?",
    a: "You own everything — code, data, all of it. We build in our own environment, then transfer everything cleanly to your accounts at handoff. No lock-in, no dependency on us to keep the lights on. Post-launch support is included — 30 days on a Focused Build, 60 days on a Signature Build. If you want ongoing development and new features, that's what Studio Partner is for.",
  },
  {
    q: "How should I think about the return on investment?",
    a: "Run the math against your own time. If a custom build replaces five hours a week of work that would otherwise cost $100 an hour of your time or a contractor's, that's $2,000 a month back in capacity — most Focused Builds pay for themselves inside a month. The ROI compounds the longer the tool runs, since custom software handles more volume without adding headcount. The proposal after discovery includes this calculation against your actual workflow.",
  },
];

const serviceTiers = [
  {
    name: "Focused Build",
    timeline: "~1 week",
    scope: "One targeted problem",
    bestFor: "One specific operational pain — internal trackers, dashboards, custom tools.",
    features: [
      "Discovery call to scope the problem",
      "Custom-built tool, deployed and working",
      "Documentation so you understand what was built",
      "30 days of post-launch support",
      "You own everything",
    ],
  },
  {
    name: "Signature Build",
    timeline: "3–4 weeks",
    scope: "Multi-feature platform",
    bestFor: "Replacing a patchwork of spreadsheets and tools with one platform built around how you work.",
    features: [
      "Deep-dive discovery to map your full workflow",
      "Custom multi-feature platform, deployed and working",
      "Multi-user support where needed",
      "Full testing before handoff",
      "Documentation and team walkthrough",
      "60 days of post-launch support",
      "You own everything",
    ],
    featured: true,
  },
  {
    name: "Studio Partner",
    timeline: "Ongoing",
    scope: "Monthly partnership",
    bestFor: "Businesses ready to treat custom software as infrastructure, not a one-time project.",
    features: [
      "Active development sprints each month",
      "Ongoing maintenance and bug fixes",
      "Monthly strategy call",
      "New features as your business grows",
      "Priority response time",
      "Quarterly system review",
    ],
  },
];

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Bridge AI Solutions — Engagements",
  url: "https://aibridgedsolutions.com/pricing",
  itemListElement: serviceTiers.map((tier, i) => ({
    "@type": "Service",
    position: i + 1,
    name: tier.name,
    serviceType: "Custom AI software development",
    description: tier.bestFor,
    provider: { "@type": "Organization", name: "Bridge AI Solutions" },
    areaServed: "US",
  })),
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      {/* HEADER */}
      <section className={styles.header} aria-labelledby="pricing-heading">
        <div className={styles.headerInner}>
          <p className={styles.headerMeta}>
            <span>// How we work</span>
          </p>
          <h1 id="pricing-heading" className={styles.headerH1}>
            Three engagements.<br />
            <em>You own the code.</em>
          </h1>
          <p className={styles.headerSub}>
            From a focused one-week build to ongoing partnership. Every
            engagement is scoped and priced after a 30-minute discovery call —
            so you only pay for what your problem actually needs.
          </p>
        </div>
      </section>

      <hr className={styles.rule} />

      {/* TIERS */}
      <section className={styles.tiers}>
        <div className={styles.tiersInner}>
          {serviceTiers.map((tier) => (
            <article
              key={tier.name}
              className={`${styles.tier} ${tier.featured ? styles.tierFeatured : ""}`}
            >
              <h2 className={styles.tierName}>{tier.name}</h2>
              <p className={styles.tierPriceLine}>
                <span className={styles.tierPriceFigure}>{tier.timeline}</span>
                <span className={styles.tierPriceUnit}>{tier.scope}</span>
              </p>
              <p className={styles.tierDescription}>{tier.bestFor}</p>
              <hr className={styles.tierDivider} />
              <ul className={styles.tierFeatures}>
                {tier.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                href="https://calendly.com/h-kerr711/30min"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-ink ${styles.tierCTA}`}
              >
                Book a discovery call
              </a>
            </article>
          ))}
        </div>

        <p className={styles.disclaimer}>
          Every engagement scoped and priced after the discovery call. Project
          work is split 50% upfront, 50% on delivery.
        </p>
      </section>

      <hr className={styles.rule} />

      {/* FAQ */}
      <section className={styles.faq} aria-labelledby="faq-heading">
        <div className={styles.faqInner}>
          <p className={styles.faqMeta}>
            <span>// Before you book</span>
          </p>
          <h2 id="faq-heading" className={styles.faqH2}>
            Common questions.
          </h2>
          <div className={styles.faqList}>
            {faqs.map(({ q, a }) => (
              <div key={q} className={styles.faqItem}>
                <p className={styles.faqQ}>{q}</p>
                <p className={styles.faqA}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className={styles.rule} />

      {/* CLOSING CTA */}
      <section className={styles.closing} aria-labelledby="closing-heading">
        <div className={styles.closingInner}>
          <p className={styles.closingMeta}>
            <span>// Next</span>
          </p>
          <h2 id="closing-heading" className={styles.closingH2}>
            Not sure which fits?
          </h2>
          <p className={styles.closingSub}>
            That&apos;s what the discovery call is for. Thirty minutes to scope
            the work. Either you receive a written proposal afterward with a
            specific build plan and a fixed fee, or we tell you straight that
            it isn&apos;t a fit.
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
