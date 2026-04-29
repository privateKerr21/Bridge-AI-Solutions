import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for custom AI-powered software. No retainers, no surprises. One-time project fees for real custom builds.",
  openGraph: {
    title: "Pricing — Bridge AI Solutions",
    description:
      "Simple, transparent pricing for custom AI-powered software. No retainers, no surprises. One-time project fees for real custom builds.",
    url: "https://aibridgedsolutions.com/pricing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Bridge AI Solutions",
    description:
      "Simple, transparent pricing for custom AI-powered software. No retainers, no surprises.",
  },
};

const faqs = [
  {
    q: "What kinds of tools do you actually build?",
    a: "Custom internal apps, dashboards, and platforms — anything from a single-purpose tracker to a full multi-user system. If you're managing something important in spreadsheets, manual processes, or a patchwork of tools that don't talk to each other, that's the kind of problem we solve.",
  },
  {
    q: "How long does a build take?",
    a: "Focused Builds typically take about a week from kickoff. Signature Builds run 3–4 weeks depending on scope and how quickly you can provide feedback. We'll give you a specific timeline during your discovery call.",
  },
  {
    q: "What do I need to have ready before we start?",
    a: "A clear problem you want solved and availability to give feedback during the build. You don't need a technical spec — that's our job. The more specifically you can describe what's eating your time, the better.",
  },
  {
    q: "What happens after the build is handed off?",
    a: "You own everything — code, data, all of it. We build in our own environment, then transfer everything cleanly to your accounts at handoff. No lock-in, no dependency on us to keep the lights on. Revision rounds are included in every tier — if you want ongoing support and new features, that's what Studio Partner is for.",
  },
  {
    q: "How much does custom AI software cost for a small business?",
    a: "Project-based work starts at $1,500 for a Focused Build — one targeted problem, delivered in about a week. A Signature Build for more complex workflows starts at $3,500. The Studio Partner retainer is $1,500/month for ongoing development. All current spots are founding-client rates, discounted from standard pricing.",
  },
  {
    q: "What's the typical return on investment?",
    a: "Most clients recover the cost of a Focused Build within the first month. If a build saves 5 hours a week at $100/hour of billable time, that's $2,000 a month back in capacity. The ROI compounds over time as the tool handles more volume without adding headcount.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* TODO Phase 6: JSON-LD schema */}

      {/* HERO */}
      <section className={styles.pricingHero}>
        <div className="container">
          <span className={"label " + styles.heroLabel}>// Pricing</span>
          <h1>
            Stop patching.<br />
            Start building.
          </h1>
          <p>No retainers. No surprises. You pay for what gets built.</p>
        </div>
      </section>

      <hr className="rule" />

      {/* PRICING SECTION */}
      <section className={styles.pricingSection}>
        <div className="container">

          <div className={styles.foundingBanner}>
            <div className={styles.foundingBannerDot}></div>
            <p>
              3 Founding Client Spots Available &mdash;{" "}
              <span>Discounted rates shown below. Ask about availability during your discovery call.</span>
            </p>
          </div>

          <div className={styles.pricingGrid}>

            {/* Tier 1: Focused Build */}
            <div className={styles.pricingCard}>
              <p className={styles.tierName}>Focused Build</p>
              <div className={styles.tierRegularPrice}>$2,500</div>
              <div className={styles.tierFoundingLabel}>Founding Rate</div>
              <div className={styles.tierPrice}>$1,500</div>
              <div className={styles.tierType}>One-time project fee</div>
              <div className={styles.tierMonthly}>No monthly fees</div>
              <div className={styles.tierMonthlyLabel}>One problem, one build, done</div>
              <hr className={styles.tierDivider} />
              <ul className={styles.tierFeatures}>
                <li>Discovery call to scope the problem</li>
                <li>Custom-built tool, deployed and working</li>
                <li>Documentation so you understand what was built</li>
                <li>1 revision round</li>
                <li>You own everything &mdash; no subscriptions to us</li>
              </ul>
              <p className={styles.tierNote}>
                Best for: one specific operational pain eating your time &mdash; internal trackers, dashboards, custom tools.
              </p>
              <a
                href="mailto:h.kerr@aibridgedsolutions.com?subject=Focused%20Build%20Inquiry"
                className={"btn btn-dark " + styles.cardBtn}
                style={{ width: "100%", boxSizing: "border-box", textAlign: "center" }}
              >
                Book a Discovery Call &rarr;
              </a>
            </div>

            {/* Tier 2: Signature Build (Featured) */}
            <div className={`${styles.pricingCard} ${styles.featured}`}>
              <p className={styles.tierName}>Signature Build</p>
              <div className={styles.tierRegularPrice}>$6,000&ndash;$8,000</div>
              <div className={styles.tierFoundingLabel}>Founding Rate</div>
              <div className={styles.tierPrice}>$3,500</div>
              <div className={styles.tierType}>One-time project fee</div>
              <div className={styles.tierMonthly}>50% upfront</div>
              <div className={styles.tierMonthlyLabel}>50% on delivery</div>
              <hr className={styles.tierDivider} />
              <ul className={styles.tierFeatures}>
                <li>Deep-dive discovery to map your full workflow</li>
                <li>Custom multi-feature platform, deployed and working</li>
                <li>Multi-user support where needed</li>
                <li>Full testing before handoff</li>
                <li>Documentation + team walkthrough</li>
                <li>2 revision rounds</li>
                <li>You own everything &mdash; no subscriptions to us</li>
              </ul>
              <p className={styles.tierNote}>
                Best for: replacing a patchwork of spreadsheets and tools with one platform built around how you actually work.
              </p>
              <a
                href="mailto:h.kerr@aibridgedsolutions.com?subject=Signature%20Build%20Inquiry"
                className={"btn btn-primary " + styles.cardBtn}
                style={{ width: "100%", boxSizing: "border-box", textAlign: "center" }}
              >
                Book a Discovery Call &rarr;
              </a>
            </div>

            {/* Tier 3: Studio Partner */}
            <div className={styles.pricingCard}>
              <p className={styles.tierName}>Studio Partner</p>
              <div className={styles.tierRegularPrice}>$2,500/mo</div>
              <div className={styles.tierFoundingLabel}>Founding Rate</div>
              <div className={styles.tierPrice}>$1,500</div>
              <div className={styles.tierType}>Per month</div>
              <div className={styles.tierMonthly}>Includes initial build</div>
              <div className={styles.tierMonthlyLabel}>Billed monthly in advance</div>
              <hr className={styles.tierDivider} />
              <ul className={styles.tierFeatures}>
                <li>Everything in Signature Build</li>
                <li>Ongoing maintenance and bug fixes</li>
                <li>Monthly strategy call to prioritize what&apos;s next</li>
                <li>New features as your business grows</li>
                <li>Priority response time</li>
                <li>Quarterly system review</li>
              </ul>
              <p className={styles.tierNote}>
                Best for: businesses ready to treat custom software as infrastructure &mdash; not a one-time project.
              </p>
              <a
                href="mailto:h.kerr@aibridgedsolutions.com?subject=Studio%20Partner%20Inquiry"
                className={"btn btn-dark " + styles.cardBtn}
                style={{ width: "100%", boxSizing: "border-box", textAlign: "center" }}
              >
                Let&apos;s Talk &rarr;
              </a>
            </div>

          </div>

          <p className={styles.pricingDisclaimer}>
            All projects start with a free discovery call to scope the problem and confirm fit.<br />
            Focused Build and Signature Build: 50% upfront, 50% on delivery.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className="container">
          <span className={"label " + styles.faqLabel}>Common Questions</span>
          <h2>Before you book.</h2>
          <div className={styles.faqGrid}>
            {faqs.map(({ q, a }) => (
              <div key={q} className={styles.faqItem}>
                <p className={styles.faqQ}>{q}</p>
                <p className={styles.faqA}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className={styles.pricingCta}>
        <div className="container">
          <div className={styles.pricingCtaInner}>
            <h2>Not sure which tier fits?</h2>
            <a
              href="https://calendly.com/h-kerr711/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark"
            >
              Book a Free Discovery Call &rarr;
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
