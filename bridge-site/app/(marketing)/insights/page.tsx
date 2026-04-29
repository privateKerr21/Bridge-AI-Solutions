import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Insights — The Custom AI Build Brief",
  description:
    "The real numbers. The honest limitations. And what's possible when you replace patchwork tools with software built for how you actually work.",
  openGraph: {
    title: "Insights — The Custom AI Build Brief",
    description:
      "The real numbers. The honest limitations. And what's possible when you replace patchwork tools with software built for how you actually work.",
    url: "https://aibridgedsolutions.com/insights",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights — The Custom AI Build Brief",
    description:
      "The real numbers. The honest limitations. And what's possible when you replace patchwork tools with software built for how you actually work.",
  },
};

export default function InsightsPage() {
  const articles = getAllArticles();

  return (
    <>
      {/* TODO Phase 6: JSON-LD schema */}

      {/* HERO */}
      <section className={styles.insightsHero}>
        <div className={"container " + styles.insightsHeroInner}>
          <span className={"label " + styles.heroLabel}>// The Custom AI Build Brief</span>
          <h1>
            What custom AI tools can<br />
            <span className={styles.textAccent}>actually do for your business.</span>
          </h1>
          <p className={styles.insightsHeroSub}>
            The real numbers. The honest limitations. And what&apos;s possible when you replace patchwork tools with software built for how you actually work.
          </p>
          <Link href="/#quiz" className="btn btn-primary">
            Find Your Biggest Bottleneck &rarr;
          </Link>
        </div>
      </section>

      {/* SECTION A: PAIN POINTS */}
      <section className={styles.painPointsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={"label " + styles.sectionLabel}>The Problem</span>
            <h2>Where your time is actually going</h2>
          </div>
          <div className={styles.insightCards}>

            <div className={styles.insightCard}>
              <span className={styles.industryTag}>Spreadsheet Debt</span>
              <h3>Your spreadsheet is doing a job it was never designed for.</h3>
              <p>You built something impressive in Excel or Google Sheets. But it&apos;s become a full-time maintenance burden — broken formulas, manual updates, and zero visibility for anyone else on the team.</p>
              <div className={styles.painStat}>15+ hours/week maintaining manual tracking systems</div>
            </div>

            <div className={styles.insightCard}>
              <span className={styles.industryTag}>Patchwork Tools</span>
              <h3>You&apos;re duct-taping five tools together and it&apos;s starting to show.</h3>
              <p>Your stack is a collection of apps that almost work together. Data lives in different places, nothing syncs cleanly, and every new hire takes weeks to get up to speed on &quot;the system.&quot;</p>
              <div className={styles.painStat}>73% of small B2B teams cite tool fragmentation as a top pain point</div>
            </div>

            <div className={styles.insightCard}>
              <span className={styles.industryTag}>Manual Processes</span>
              <h3>You&apos;re drowning in tasks that don&apos;t actually make you money.</h3>
              <p>Data entry, status chasing, document processing, manual reporting. The back-office work multiplies faster than you can handle it. Every hour spent here is an hour not spent on billable work.</p>
              <div className={styles.painStat}>2–3 hrs/day on work a custom tool could handle</div>
            </div>

            <div className={styles.insightCard}>
              <span className={styles.industryTag}>Scaling</span>
              <h3>You&apos;ve hired before. It didn&apos;t solve the problem.</h3>
              <p>You brought on help, but the training took forever, quality was inconsistent, and the costs added up fast. What you really need isn&apos;t another body. It&apos;s a better system — built specifically for how your business runs.</p>
              <div className={styles.painStat}>Hiring solves 20% of the problem at 100% of the cost</div>
            </div>

            <div className={styles.insightCard}>
              <span className={styles.industryTag}>Repetitive Work</span>
              <h3>You keep doing the same thing over and over... and it&apos;s draining you.</h3>
              <p>Same reports. Same data pulls. Same manual steps to produce the same output. You&apos;ve done this a hundred times, and you&apos;ll do it a hundred more. The right custom tool would eliminate it entirely.</p>
              <div className={styles.painStat}>50–70% of daily work is repeatable and buildable</div>
            </div>

            <div className={styles.insightCard}>
              <span className={styles.industryTag}>The Real Issue</span>
              <h3>The work that grows your business keeps losing to the work that just maintains it.</h3>
              <p>You got into this to serve clients and build something meaningful. Instead, you&apos;re trapped managing processes that should run themselves — because the right software doesn&apos;t exist off the shelf for your specific situation.</p>
              <div className={styles.painStat}>Only 20% of your time is on high-value work</div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION B: THE GAP */}
      <section className={styles.gapSection}>
        <div className="container">
          <span className={"label " + styles.gapLabel}>The Gap That&apos;s Costing You</span>
          <div className={styles.gapPullQuote}>
            Where you are vs. where you could be in the next 12 months — the distance is smaller than you think, and larger than you can afford to ignore.
          </div>
          <p className={styles.gapIntro}>
            For most small B2B service businesses, it&apos;s not a lack of skill or effort. It&apos;s running operations on tools that were never built for your specific workflow. Custom software changes that equation.
          </p>

          <div className={styles.gapColumns}>
            <div>
              <span className={`${styles.gapColLabel} ${styles.current}`}>Where You Are Now</span>
              <ul className={styles.gapList}>
                <li>Tracking everything in spreadsheets and shared docs</li>
                <li>Processes live in people&apos;s heads, not systems</li>
                <li>Manual steps for everything repeatable</li>
                <li>Working IN the business, not ON it</li>
                <li>Capacity-constrained by your hours</li>
                <li>Revenue plateaued despite working harder</li>
              </ul>
            </div>
            <div>
              <span className={`${styles.gapColLabel} ${styles.future}`}>Where You Could Be</span>
              <ul className={`${styles.gapList} ${styles.futureList}`}>
                <li>A custom platform that runs your core operations</li>
                <li>Processes encoded in software, not tribal knowledge</li>
                <li>Repeatable work handled by tools you own outright</li>
                <li>Time for strategy and high-value client work</li>
                <li>Capacity scales without adding headcount</li>
                <li>Revenue grows while hours stay the same</li>
              </ul>
            </div>
          </div>

          <div className={styles.gapCtaBlock}>
            <h3>What&apos;s Standing Between You and That Future?</h3>
            <p>
              The answer usually isn&apos;t ambition or resources — it&apos;s the right software. Build it once, own it forever, and the gap closes faster than you&apos;d expect.
            </p>
            <Link href="/#quiz" className="btn btn-primary">
              Find Your Biggest Bottleneck &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION C: COST OF INACTION */}
      <section className={styles.inactionSection}>
        <div className="container">
          <span className={"label " + styles.inactionLabel}>The Hidden Cost</span>
          <h2>Every month you wait is costing you more than you think</h2>
          <div className={styles.inactionPullQuote}>4.8x</div>
          <div className={styles.inactionPullCaption}>Faster productivity growth in businesses with purpose-built software</div>
          <p className={styles.inactionBody}>
            78% of small businesses report that generic off-the-shelf tools don&apos;t fit their actual workflow. Meanwhile, businesses with custom-built internal tools and AI-powered platforms pull ahead — not because they have bigger teams, but because their systems do more. Your competitors aren&apos;t waiting to build. Every quarter you delay is a quarter they extend their lead.
          </p>
        </div>
      </section>

      {/* SECTION D: ROI & RESULTS */}
      <section className={styles.roiSection}>
        <div className="container">
          <span className={"label " + styles.roiLabel}>The Numbers Don&apos;t Lie</span>
          <h2>What the research actually shows</h2>
          <p className={styles.roiIntro}>Industry data backs up what early adopters are already experiencing.</p>

          <div className={styles.roiStatsGrid}>
            <div className={styles.roiStatCell}>
              <div className={styles.roiStatNumber}>$3.70</div>
              <div className={styles.roiStatLabel}>Return Per $1 Invested</div>
              <div className={styles.roiStatDesc}>Average ROI for businesses deploying custom AI-powered tools</div>
            </div>
            <div className={styles.roiStatCell}>
              <div className={styles.roiStatNumber}>26–55%</div>
              <div className={styles.roiStatLabel}>Productivity Gains</div>
              <div className={styles.roiStatDesc}>What teams report after replacing manual processes with purpose-built software</div>
            </div>
            <div className={styles.roiStatCell}>
              <div className={styles.roiStatNumber}>240%</div>
              <div className={styles.roiStatLabel}>Average ROI</div>
              <div className={styles.roiStatDesc}>From custom internal platforms replacing patchwork tool stacks</div>
            </div>
            <div className={styles.roiStatCell}>
              <div className={styles.roiStatNumber}>2–3 mo</div>
              <div className={styles.roiStatLabel}>Break-Even</div>
              <div className={styles.roiStatDesc}>Most businesses recover the build cost within 90 days of launch</div>
            </div>
          </div>

          <p className={styles.roiSource}>Sources: McKinsey State of AI Report 2025, Deloitte Tech Trends 2025</p>
        </div>
      </section>

      {/* SECTION E: AI REALITY */}
      <section className={styles.aiRealitySection}>
        <div className="container">
          <span className={"label " + styles.aiRealityLabel}>The Honest Conversation</span>
          <h2>What custom AI software can (and can&apos;t) do for you</h2>
          <p className={styles.aiRealityIntro}>
            We&apos;ll never oversell. Here&apos;s what purpose-built AI tools handle extremely well, and where your expertise remains irreplaceable.
          </p>

          <div className={styles.aiRealityGrid}>
            <div className={styles.aiRealityCol}>
              <div className={styles.aiRealityColHeader}>
                <div className={`${styles.aiRealityIndicator} ${styles.can}`}>&#10003;</div>
                <div className={styles.aiRealityColTitle}>Build a Tool For This</div>
              </div>
              <ul className={styles.aiRealityList}>
                <li>
                  <strong>Internal Trackers &amp; Dashboards</strong>
                  <p>Custom platforms that replace spreadsheets and give your team real-time visibility</p>
                </li>
                <li>
                  <strong>Document Generation &amp; Processing</strong>
                  <p>Tools that produce reports, contracts, or summaries from your data — automatically</p>
                </li>
                <li>
                  <strong>Intake &amp; Workflow Systems</strong>
                  <p>Structured intake forms, routing logic, and status tracking built for your exact process</p>
                </li>
                <li>
                  <strong>Data Aggregation &amp; Formatting</strong>
                  <p>Pulling information from multiple sources into one clean, usable view</p>
                </li>
                <li>
                  <strong>AI-Assisted First Drafts</strong>
                  <p>Tools that generate proposals, briefs, or responses for your team to review and send</p>
                </li>
              </ul>
            </div>

            <div className={styles.aiRealityCol}>
              <div className={styles.aiRealityColHeader}>
                <div className={`${styles.aiRealityIndicator} ${styles.cant}`}>&#10005;</div>
                <div className={styles.aiRealityColTitle}>Keep This Human</div>
              </div>
              <ul className={styles.aiRealityList}>
                <li>
                  <strong>Relationship Building &amp; Trust</strong>
                  <p>The actual conversations that win clients and keep them loyal</p>
                </li>
                <li>
                  <strong>Strategic Advice &amp; Judgment Calls</strong>
                  <p>The expertise and context that makes your service valuable</p>
                </li>
                <li>
                  <strong>Complex Negotiations</strong>
                  <p>Reading between the lines, handling sensitive situations with nuance</p>
                </li>
                <li>
                  <strong>Creative Problem-Solving</strong>
                  <p>Novel situations that require thinking outside established patterns</p>
                </li>
                <li>
                  <strong>Final Decisions &amp; Client-Facing Communication</strong>
                  <p>Everything important gets your approval — the tool supports you, not replaces you</p>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.aiRealityTagline}>
            <p>
              We build the software that{" "}
              <span>handles the grind</span>, so you can focus on the work that{" "}
              <span>actually grows your business</span>.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION F: WHO IT'S FOR */}
      <section className={styles.audienceSection}>
        <div className="container">
          <span className={"label " + styles.audienceLabel}>Is This Right For You?</span>
          <h2>Who we work with</h2>
          <p className={styles.audienceIntro}>
            We work best with businesses that have a real operational problem — and want it solved properly with software they own, not patched with another subscription tool.
          </p>

          <div className={styles.audienceGrid}>
            <div className={styles.audienceCard}>
              <h3>Business Owners</h3>
              <p>Who are tired of being the bottleneck and want custom-built systems that scale without adding headcount</p>
            </div>
            <div className={styles.audienceCard}>
              <h3>Service Providers</h3>
              <p>Whose expertise is being wasted managing spreadsheets and manual processes that a purpose-built tool would replace</p>
            </div>
            <div className={styles.audienceCard}>
              <h3>Growth-Focused Teams</h3>
              <p>Who need to do more without hiring more — and are ready to invest in a platform built specifically for how they work</p>
            </div>
            <div className={styles.audienceCard}>
              <h3>Operators Stuck on Off-The-Shelf</h3>
              <p>Who&apos;ve outgrown generic tools and need something custom — and want it built and handed off, not explained as a DIY project</p>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className={styles.articlesSection}>
        <div className="container">
          <span className={"label " + styles.articlesLabel}>From the Brief</span>
          <h2>Deep dives on decisions that matter</h2>

          <div className={styles.articleCards}>
            {articles.map((article) => (
              <Link key={article.slug} href={`/insights/${article.slug}`} className={styles.articleCard}>
                <span className={styles.articleCardTag}>{article.tag}</span>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <div className={styles.articleCardFooter}>
                  <span className={styles.articleCardMeta}>
                    {new Date(article.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    &nbsp;&middot;&nbsp;
                    {article.readTime}
                  </span>
                  <span className={styles.articleCardArrow}>&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SIDE EFFECTS */}
      <section className={styles.sideEffectsSection}>
        <div className="container">
          <span className={"label " + styles.sideEffectsLabel}>Side Effects of Working With Us</span>
          <h2>Results suspiciously consistent across clients</h2>
          <p className={styles.sideEffectsIntro}>Actual experiences reported by real clients:</p>

          <ul className={styles.sideEffectsList}>
            <li>Mysterious reclamation of 10+ hours per week previously lost to manual processes and spreadsheet maintenance</li>
            <li>Sudden realization that &quot;this used to take me all day&quot; now takes 10 minutes</li>
            <li>Unexplained confidence when prospects ask &quot;Can you handle more volume?&quot;</li>
            <li>Operational workflows that run themselves while you focus on actual billable work</li>
            <li>Chronic reduction in &quot;I&apos;ll deal with that spreadsheet later&quot; guilt</li>
            <li>Dangerous habit of expecting the platform to handle it automatically</li>
            <li>Competitors wondering how you&apos;re moving so fast with the same team size</li>
            <li>Inability to imagine going back to the old patchwork of disconnected tools</li>
            <li>Frequent urge to show new clients &quot;here&apos;s the platform we built for this&quot;</li>
            <li>Risk of having to actually take that vacation you&apos;ve been postponing</li>
          </ul>

          <p className={styles.sideEffectsFooter}>Results may vary. Not responsible for increased job satisfaction or work-life balance.</p>
        </div>
      </section>

      {/* FLOATING CTA */}
      <div className={styles.floatingCta}>
        <Link href="/#quiz" className="btn btn-primary">
          Find Your Bottleneck &rarr;
        </Link>
      </div>
    </>
  );
}
