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
  const price = tier === "audit_9" ? "$9.95" : "$97";
  const ctaLabel = `Take the Audit — ${price}`;
  const includesCall = tier === "audit_97";

  return (
    <main className={styles.page}>
      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>
            // For founders, operators, and business owners
          </p>
          <h1 className={styles.h1}>
            The automation you keep meaning to ship.
          </h1>
          <p className={styles.heroSub}>
            Half-built Zaps. Prompts buried in docs. Tools that almost worked.
            You&apos;d save five hours a week if any of it actually ran end-to-end.
            The Shadow Work Audit names the one to ship first — and gives you the
            90-day roadmap to do it.
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
              {includesCall
                ? "Personalized roadmap PDF + a 30-min call with Hayden, delivered within 5 business days."
                : "Personalized roadmap PDF, delivered in 5 minutes."}
            </p>
          </div>
        </div>
      </section>

      <hr className={styles.rule} />

      {/* ── THE PATTERN ────────────────────────────────────────────── */}
      <section className={styles.examples}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>// The patterns we see</p>
          <h2 className={styles.h2}>
            Your version of this is probably specific.
          </h2>
          <p className={styles.body}>
            Most operators we talk to have a workflow that&apos;s been quietly
            eating their week for months. Different teams, different tools, but
            the shape is the same. A few common ones:
          </p>

          <ol className={styles.exampleList}>
            <li className={styles.exampleItem}>
              <span className={styles.exampleNum}>01</span>
              <div>
                <p className={styles.exampleTitle}>
                  Following up on leads that go cold because nobody has the
                  bandwidth.
                </p>
                <p className={styles.exampleBody}>
                  You know which leads are warm. You don&apos;t have time to
                  reach out, qualify, route, and stay on top of follow-ups. The
                  pipeline silently leaks.
                </p>
              </div>
            </li>
            <li className={styles.exampleItem}>
              <span className={styles.exampleNum}>02</span>
              <div>
                <p className={styles.exampleTitle}>
                  Pulling together client reports that eat your week.
                </p>
                <p className={styles.exampleBody}>
                  Different tools, different formats, copy-paste every week.
                  Clients deserve better, but rebuilding the dashboard is
                  always next week&apos;s problem.
                </p>
              </div>
            </li>
            <li className={styles.exampleItem}>
              <span className={styles.exampleNum}>03</span>
              <div>
                <p className={styles.exampleTitle}>
                  Generating quotes and proposals from scratch every single time.
                </p>
                <p className={styles.exampleBody}>
                  You have the data. You have a process. It still takes two
                  hours per quote because nothing&apos;s connected.
                </p>
              </div>
            </li>
          </ol>

          <p className={styles.bodyEmphasis}>
            The audit names the one that&apos;s worth shipping first — and tells
            you why.
          </p>
        </div>
      </section>

      <hr className={styles.rule} />

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <section className={styles.how}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>// How it works</p>
          <h2 className={styles.h2}>
            Ten questions. Five to seven minutes. A Strategic Roadmap when you finish.
          </h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNum}>// Step 01</span>
              <h3 className={styles.stepH}>Answer ten questions</h3>
              <p className={styles.stepBody}>
                Pick the two areas eating the most of your week. Tell us how the
                work actually gets done today, what it&apos;s meant to accomplish,
                and what you wish you were doing instead.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>// Step 02</span>
              <h3 className={styles.stepH}>We diagnose</h3>
              <p className={styles.stepBody}>
                Your answers run through the same PULL methodology we use to
                scope $2,500 client builds. We surface where shadow work
                concentrates, what&apos;s actually worth automating, and what
                isn&apos;t.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>// Step 03</span>
              <h3 className={styles.stepH}>You get your roadmap</h3>
              <p className={styles.stepBody}>
                A personalized PDF lands in your inbox. The one automation worth
                shipping first, rough scope, and a 90-day plan to ship it.
                {includesCall && (
                  <>
                    {" "}
                    Plus a 30-minute call with Hayden to walk through it within
                    five business days.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className={styles.rule} />

      {/* ── MECHANISM / AUTHORITY ──────────────────────────────────── */}
      <section className={styles.mechanism}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>// Why this works</p>
          <h2 className={styles.h2}>
            The same diagnostic we run on $2,500 client builds.
          </h2>
          <p className={styles.body}>
            Bridge AI Solutions installs custom AI into B2B operations — not
            tutorials, not platforms, not consulting decks. Working systems,
            deployed and running, clients own the code. We&apos;ve shipped this
            pattern across multiple builds and run our own software on the same
            stack.
          </p>
          <p className={styles.body}>
            <strong>Surety</strong>, a multi-tenant SaaS for general contractors,
            is live in production at{" "}
            <a
              href="https://suretybuild.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              suretybuild.com
            </a>
            . We built it, we operate it, we eat our own cooking. The audit
            compresses our discovery process into ten questions and runs the
            analysis automatically.
          </p>
        </div>
      </section>

      <hr className={styles.rule} />

      {/* ── WHAT YOU GET ───────────────────────────────────────────── */}
      <section className={styles.deliverables}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>// What you actually get</p>
          <h2 className={styles.h2}>The Strategic Roadmap.</h2>
          <ul className={styles.deliverableList}>
            <li className={styles.deliverable}>
              <p className={styles.deliverableH}>The Diagnosis</p>
              <p className={styles.deliverableBody}>
                Where shadow work concentrates in your operation, and roughly
                how much weekly time is sitting on the table.
              </p>
            </li>
            <li className={styles.deliverable}>
              <p className={styles.deliverableH}>The Opportunity Matrix</p>
              <p className={styles.deliverableBody}>
                For each of the two workflows you flagged: the project
                underneath, the proposed solution, the action (automate,
                augment, or eliminate), and the impact.
              </p>
            </li>
            <li className={styles.deliverable}>
              <p className={styles.deliverableH}>The First Build</p>
              <p className={styles.deliverableBody}>
                The one automation worth shipping first, the rationale, and
                rough scope — mapped to a real engagement tier so you know what
                it would cost to actually do it.
              </p>
            </li>
            {includesCall && (
              <li className={styles.deliverable}>
                <p className={styles.deliverableH}>
                  A 30-minute call with Hayden
                </p>
                <p className={styles.deliverableBody}>
                  Walk through the roadmap together. Pressure-test the
                  recommendation. Decide if it&apos;s worth shipping. Booked
                  within five business days.
                </p>
              </li>
            )}
          </ul>
        </div>
      </section>

      <hr className={styles.rule} />

      {/* ── FINAL CTA ──────────────────────────────────────────────── */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>// Next</p>
          <h2 className={styles.finalH}>Take the audit.</h2>
          <p className={styles.body}>
            Ten questions, five to seven minutes, and you&apos;ll know exactly
            which automation is worth shipping next.
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
              All sales final. Report delivered within five minutes. Your
              responses stay private.
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
