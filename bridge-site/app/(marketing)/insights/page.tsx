import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Insights — The Custom AI Build Brief",
  description:
    "An honest read on what custom AI software actually does, what it doesn't, and where the numbers come from.",
  openGraph: {
    title: "Insights — The Custom AI Build Brief",
    description:
      "An honest read on what custom AI software actually does, what it doesn't, and where the numbers come from.",
    url: "https://aibridgedsolutions.com/insights",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights — The Custom AI Build Brief",
    description:
      "An honest read on what custom AI software actually does, what it doesn't, and where the numbers come from.",
  },
};

const canDo = [
  {
    title: "Internal trackers and dashboards",
    body: "Custom platforms that replace spreadsheets and give your team a real-time view of the work in motion.",
  },
  {
    title: "Document generation",
    body: "Tools that produce reports, summaries, briefs, and contracts from your data — automatically, in your voice.",
  },
  {
    title: "Intake and workflow systems",
    body: "Structured intake forms, routing logic, and status tracking built around your exact process.",
  },
  {
    title: "Data aggregation",
    body: "Pulling information from multiple sources into one clean, usable view your team can actually act on.",
  },
  {
    title: "AI-assisted first drafts",
    body: "Tools that generate proposals, briefs, and responses for your team to review and send.",
  },
];

const cantDo = [
  {
    title: "Relationship building",
    body: "The conversations that win clients, and the trust that keeps them. AI cannot fake this and shouldn't try.",
  },
  {
    title: "Strategic judgment",
    body: "The expertise and context that makes your service valuable. AI summarizes; you decide.",
  },
  {
    title: "Complex negotiation",
    body: "Reading between the lines, handling sensitive situations, knowing when to push and when to wait.",
  },
  {
    title: "Creative problem-solving",
    body: "Novel situations that require thinking outside the patterns the tool was trained on.",
  },
  {
    title: "Final approval",
    body: "Anything client-facing gets your sign-off. The tool supports you. It does not replace you.",
  },
];

const stats = [
  {
    figure: "$3.70",
    label: "Return per $1 invested",
    desc: "Reported average for businesses deploying custom AI-powered tools.",
  },
  {
    figure: "26–55%",
    label: "Productivity gains",
    desc: "Range teams report after replacing manual processes with purpose-built software.",
  },
  {
    figure: "240%",
    label: "Average ROI",
    desc: "From custom internal platforms replacing patchwork tool stacks.",
  },
  {
    figure: "2–3 mo",
    label: "Break-even window",
    desc: "Reported break-even for businesses replacing manual processes with custom software.",
  },
];

export default function InsightsPage() {
  const articles = getAllArticles();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "The Custom AI Build Brief",
    url: "https://aibridgedsolutions.com/insights",
    description:
      "Honest writing on custom AI software for small B2B businesses — what it does, what it doesn't, and where the numbers come from.",
    publisher: {
      "@type": "Organization",
      name: "Bridge AI Solutions",
      url: "https://aibridgedsolutions.com",
    },
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.description,
      datePublished: a.date,
      url: `https://aibridgedsolutions.com/insights/${a.slug}`,
      author: { "@type": "Person", name: "Hayden Kerr" },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* HERO */}
      <section className={styles.hero} aria-labelledby="insights-heading">
        <div className={styles.heroInner}>
          <p className={styles.heroMeta}>
            <span>// The Custom AI Build Brief</span>
          </p>
          <h1 id="insights-heading" className={styles.heroH1}>
            What custom AI software<br />
            <em>actually does for a business.</em>
          </h1>
          <p className={styles.heroSub}>
            An honest read. What it handles well, what it doesn&apos;t, where
            the numbers come from. No hype, no AI buzzwords, no &ldquo;Powered
            by AI&rdquo; badges.
          </p>
        </div>
      </section>

      <hr className={styles.rule} />

      {/* SECTION 1 — CAN / CAN'T */}
      <section className={styles.realitySection} aria-labelledby="reality-heading">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionMeta}>
              <span>// 01 — The honest version</span>
            </p>
            <h2 id="reality-heading" className={styles.sectionH2}>
              What custom AI software<br />
              <em>can and can&apos;t do.</em>
            </h2>
            <p className={styles.sectionSub}>
              Most AI marketing skips this part. Here&apos;s the line we draw,
              and where your expertise stays irreplaceable.
            </p>
          </div>

          <div className={styles.realityGrid}>
            <div className={styles.realityCol}>
              <p className={styles.realityColLabel}>// Build a tool for this</p>
              <ul className={styles.realityList}>
                {canDo.map(({ title, body }) => (
                  <li key={title}>
                    <strong>{title}</strong>
                    <p>{body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.realityCol}>
              <p className={styles.realityColLabel}>// Keep this human</p>
              <ul className={styles.realityList}>
                {cantDo.map(({ title, body }) => (
                  <li key={title}>
                    <strong>{title}</strong>
                    <p>{body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr className={styles.rule} />

      {/* SECTION 2 — THE RESEARCH */}
      <section className={styles.researchSection} aria-labelledby="research-heading">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionMeta}>
              <span>// 02 — The research</span>
            </p>
            <h2 id="research-heading" className={styles.sectionH2}>
              What the industry data <em>actually says.</em>
            </h2>
            <p className={styles.sectionSub}>
              Numbers from independent industry research, not Bridge case
              studies. Bridge is a new practice and we&apos;re not going to
              quote ourselves.
            </p>
          </div>

          <dl className={styles.statsList}>
            {stats.map(({ figure, label, desc }) => (
              <div key={label} className={styles.statRow}>
                <dt className={styles.statFigure}>{figure}</dt>
                <dd className={styles.statBody}>
                  <span className={styles.statLabel}>{label}</span>
                  <span className={styles.statDesc}>{desc}</span>
                </dd>
              </div>
            ))}
          </dl>

          <p className={styles.statsSource}>
            Sources: McKinsey State of AI Report 2025, Deloitte Tech Trends 2025.
          </p>
        </div>
      </section>

      <hr className={styles.rule} />

      {/* SECTION 3 — ARTICLES */}
      <section className={styles.articlesSection} aria-labelledby="articles-heading">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionMeta}>
              <span>// 03 — From the brief</span>
            </p>
            <h2 id="articles-heading" className={styles.sectionH2}>
              Deep dives on decisions <em>that matter.</em>
            </h2>
          </div>

          <ul className={styles.articleList}>
            {articles.map((article) => (
              <li key={article.slug}>
                <Link href={`/insights/${article.slug}`} className={styles.articleRow}>
                  <span className={styles.articleTag}>{article.tag}</span>
                  <div className={styles.articleBody}>
                    <h3 className={styles.articleTitle}>{article.title}</h3>
                    <p className={styles.articleDesc}>{article.description}</p>
                  </div>
                  <span className={styles.articleMeta}>
                    {new Date(article.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    {" · "}
                    {article.readTime}
                  </span>
                  <span className={styles.articleArrow} aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <hr className={styles.rule} />

      {/* CLOSING */}
      <section className={styles.closing} aria-labelledby="insights-closing">
        <div className={styles.closingInner}>
          <p className={styles.closingMeta}>
            <span>// Next</span>
          </p>
          <h2 id="insights-closing" className={styles.closingH2}>
            Ready to translate this into a build?
          </h2>
          <p className={styles.closingSub}>
            Thirty minutes to scope the work. The proposal that follows lays
            out the build plan, the price, and the ROI math against your
            actual workflow.
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
