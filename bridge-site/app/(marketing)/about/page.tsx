import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

const SITE = "https://aibridgedsolutions.com";
const PERSON_ID = `${SITE}/about#person`;

export const metadata: Metadata = {
  title: "About Hayden Kerr",
  description:
    "Hayden Kerr is the founder of Bridge AI Solutions, a consultancy building custom AI software for small B2B service businesses. Built across SaaS, healthtech, and AI tooling before starting Bridge.",
  alternates: { canonical: `${SITE}/about` },
  openGraph: {
    type: "profile",
    url: `${SITE}/about`,
    title: "About Hayden Kerr — Bridge AI Solutions",
    description:
      "Founder of Bridge AI Solutions. Building custom AI software for small B2B service businesses.",
    siteName: "Bridge AI Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Hayden Kerr — Bridge AI Solutions",
    description:
      "Founder of Bridge AI Solutions. Building custom AI software for small B2B service businesses.",
  },
};

export default function AboutPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Hayden Kerr",
    givenName: "Hayden",
    familyName: "Kerr",
    jobTitle: "Founder",
    description:
      "Founder of Bridge AI Solutions, a consultancy building custom AI-powered software for small B2B service businesses.",
    url: `${SITE}/about`,
    image: `${SITE}/brand/logos/bridge_ai_logo4.png`,
    worksFor: {
      "@type": "Organization",
      name: "Bridge AI Solutions",
      url: SITE,
    },
    knowsAbout: [
      "Custom AI software",
      "Business process automation",
      "AI for small business",
      "B2B service operations",
      "Software consulting",
    ],
    sameAs: ["https://www.linkedin.com/in/haydenkerr-bridged"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.kicker}>// About</p>
            <h1 className={styles.heroTitle}>Hayden Kerr</h1>
            <p className={styles.heroLead}>
              Founder of Bridge AI Solutions. I build custom AI software for
              small B2B service businesses — the ones too big for ChatGPT and
              too small for enterprise consulting.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.body}>
        <div className="container">
          <div className={styles.grid}>
            <aside className={styles.aside}>
              <p className={styles.factsLabel}>// At a glance</p>
              <ul className={styles.facts}>
                <li>
                  <span>Role</span>
                  <strong>Founder</strong>
                </li>
                <li>
                  <span>Based</span>
                  <strong>United States</strong>
                </li>
                <li>
                  <span>LinkedIn</span>
                  <strong>
                    <a
                      href="https://www.linkedin.com/in/haydenkerr-bridged"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @haydenkerr-bridged
                    </a>
                  </strong>
                </li>
                <li>
                  <span>Contact</span>
                  <strong>
                    <a href="mailto:h.kerr@aibridgedsolutions.com">
                      h.kerr@aibridgedsolutions.com
                    </a>
                  </strong>
                </li>
              </ul>
            </aside>

            <div className={styles.prose}>
              <h2>Why Bridge exists</h2>
              <p>
                Most AI tooling is built for one of two markets: consumers
                paying $20/month for ChatGPT, or enterprises with seven-figure
                budgets. The band in between — small B2B service businesses
                running on spreadsheets, manual handoffs, and a few SaaS
                subscriptions — has been quietly underwritten.
              </p>
              <p>
                That band is where the real leverage is. A 10-50 person firm
                with one workflow eating a week of labor per month doesn't need
                a platform. It needs a small, focused piece of software that
                does that one thing well — and that they own outright.
              </p>
              <p>
                Bridge AI Solutions builds those tools. Fixed-price, scoped
                tight, handed off cleanly so the client owns the code and can
                run it without us.
              </p>

              <h2>How we work</h2>
              <p>
                Every engagement starts with a discovery call to figure out
                whether building is actually the right answer. Sometimes it
                isn't — sometimes the right answer is a process change, a SaaS
                tool, or a no-code stitch. We say so when that's the case.
              </p>
              <p>
                When custom software is the right call, the work is shaped
                around three engagements: a Focused Build for a single
                bottleneck, a Signature Build for a larger system, and a Studio
                Partner arrangement for ongoing development. The full breakdown
                lives on the <Link href="/pricing">pricing page</Link>.
              </p>

              <h2>The opinions that drive the work</h2>
              <p>
                <strong>AI drafts, humans approve.</strong> The economic value
                of AI in a service business is rarely in replacing the person —
                it's in pushing them from creator to editor on the repetitive
                work. Every Bridge build keeps a human in the loop.
              </p>
              <p>
                <strong>You should own the code.</strong> The era of renting
                software you can't see inside of is ending. Custom software is
                handed off cleanly — code, data, all of it — so the client
                isn't dependent on us to keep the lights on.
              </p>
              <p>
                <strong>Scope kills more projects than complexity.</strong> The
                difference between a $5k tool and a $50k platform is the
                discipline to keep the scope surgical. Bridge stays small on
                purpose.
              </p>

              <div className={styles.cta}>
                <h3>Working with Bridge</h3>
                <p>
                  Thirty minutes to scope the work. The proposal that follows
                  lays out exactly what to build and what it would cost.
                </p>
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
          </div>
        </div>
      </section>
    </>
  );
}
