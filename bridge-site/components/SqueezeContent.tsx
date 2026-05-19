import { Suspense } from "react";
import CheckoutButton from "./CheckoutButton";
import type { AuditTier, AuditVariant } from "@/lib/types";
import styles from "./SqueezeContent.module.css";

function CheckoutButtonFallback({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" disabled className={className}>
      {label}
    </button>
  );
}

interface SqueezeContentProps {
  tier: AuditTier;
  variant: AuditVariant;
}

export default function SqueezeContent({ tier, variant }: SqueezeContentProps) {
  const price = tier === "audit_9" ? "Free" : "$1";
  const ctaLabel = `Get My AI Roadmap — ${price}`;

  return (
    <main className={styles.page}>
      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>
              // For founders, operators, and business owners
            </p>
            <h1 className={styles.h1}>
              You know AI should be doing this already.
            </h1>
            <p className={styles.heroSub}>
              One questionnaire. One custom AI roadmap. Zero guesswork.
            </p>
            <p className={styles.heroBody}>
              You already know AI matters. You&apos;ve got the ChatGPT tabs, the
              half-finished prototypes, the prompts buried in docs. The problem
              was never awareness — it&apos;s that nobody&apos;s diagnosed what
              to actually build for <em>your</em> business.
            </p>
            <div className={styles.heroCta}>
              <Suspense fallback={<CheckoutButtonFallback label={ctaLabel} className={styles.ctaButton} />}>
                <CheckoutButton
                  tier={tier}
                  variant={variant}
                  label={ctaLabel}
                  className={styles.ctaButton}
                />
              </Suspense>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <img
              src="/brand/hero-chaos.png"
              alt="Overwhelmed business owner surrounded by disconnected AI tools, half-finished workflows, and scattered prompts"
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      <hr className={styles.rule} />

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <section className={styles.how}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>// How it works</p>
          <h2 className={styles.h2}>
            Five minutes. Ten questions. A custom AI diagnostic when you finish.
          </h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNum}>// Step 01</span>
              <h3 className={styles.stepH}>Tell us where time disappears</h3>
              <p className={styles.stepBody}>
                Pick the two workflows eating the most of your week. Tell us
                how the work actually gets done today and what you wish you
                were doing instead.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>// Step 02</span>
              <h3 className={styles.stepH}>AI maps your opportunities</h3>
              <p className={styles.stepBody}>
                Your answers run through a diagnostic that separates
                what&apos;s actually worth solving with AI from what
                isn&apos;t.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>// Step 03</span>
              <h3 className={styles.stepH}>You see exactly what to build</h3>
              <p className={styles.stepBody}>
                A personalized PDF lands in your inbox: the highest-leverage
                AI opportunity in your business, how much time and money
                it&apos;s worth, and exactly what it would take to get it live.
              </p>
            </div>
          </div>
          <div className={styles.heroCta}>
            <Suspense fallback={<CheckoutButtonFallback label={ctaLabel} className={styles.ctaButton} />}>
              <CheckoutButton
                tier={tier}
                variant={variant}
                label={ctaLabel}
                className={styles.ctaButton}
              />
            </Suspense>
          </div>
        </div>
      </section>

      <hr className={styles.rule} />

      {/* ── WHAT YOU GET ───────────────────────────────────────────── */}
      <section className={styles.deliverables}>
        <div className={`${styles.container} ${styles.deliverablesGrid}`}>
          <div className={styles.deliverablesText}>
            <p className={styles.eyebrow}>// What you actually get</p>
            <h2 className={styles.h2}>Your Custom AI Roadmap.</h2>
            <ul className={styles.deliverableList}>
              <li className={styles.deliverable}>
                <p className={styles.deliverableH}>The Diagnosis</p>
                <p className={styles.deliverableBody}>
                  Where your operation is bleeding time — the specific workflows
                  costing you the most hours every week, quantified.
                </p>
              </li>
              <li className={styles.deliverable}>
                <p className={styles.deliverableH}>The Opportunity</p>
                <p className={styles.deliverableBody}>
                  For each workflow you flagged: what an AI-powered solution
                  looks like at a high level, the type of system required, and
                  the projected impact on your operation.
                </p>
              </li>
              <li className={styles.deliverable}>
                <p className={styles.deliverableH}>The Recommendation</p>
                <p className={styles.deliverableBody}>
                  The one system worth building first and the rationale — enough
                  clarity to start on your own or hand off to someone who can
                  build it for you.
                </p>
              </li>
            </ul>
            <div className={styles.heroCta}>
              <Suspense fallback={<CheckoutButtonFallback label={ctaLabel} className={styles.ctaButton} />}>
                <CheckoutButton
                  tier={tier}
                  variant={variant}
                  label={ctaLabel}
                  className={styles.ctaButton}
                />
              </Suspense>
              <p className={styles.qualifier}>
                Built for founders and operators running a real business. Not a fit
                for AI consultants, agencies, or anyone already mid-build.
              </p>
            </div>
          </div>
          <div className={styles.deliverablesVisual}>
            <img
              src="/brand/ai-roadmap-deliverable.png"
              alt="Sample AI Roadmap deliverable showing top opportunities, implementation timeline, estimated impact, and key takeaways"
              className={styles.deliverablesImage}
            />
            <p className={styles.deliverablesCaption}>
              Sample output. Your roadmap is built from your responses.
            </p>
          </div>
        </div>
      </section>

      <hr className={styles.rule} />

      {/* ── FINAL CTA ──────────────────────────────────────────────── */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>// Next</p>
          <h2 className={styles.finalH}>Get your roadmap.</h2>
          <p className={styles.body}>
            Ten questions, five minutes, and you&apos;ll know exactly where
            AI creates the most leverage in your business — and what it takes
            to get it running.
          </p>
          <div className={styles.heroCta}>
            <Suspense fallback={<CheckoutButtonFallback label={ctaLabel} className={styles.ctaButton} />}>
              <CheckoutButton
                tier={tier}
                variant={variant}
                label={ctaLabel}
                className={styles.ctaButton}
              />
            </Suspense>
            <p className={styles.heroMicro}>
              Delivered in five minutes or less. Your responses stay private.
            </p>
          </div>
        </div>
      </section>

      {/* ── MICRO-FOOTER ───────────────────────────────────────────── */}
      <footer className={styles.microFooter}>
        <div className={styles.container}>
          <p className={styles.footerText}>
            Bridge AI Solutions &nbsp;·&nbsp; aibridgesolutions.com
          </p>
        </div>
      </footer>
    </main>
  );
}
