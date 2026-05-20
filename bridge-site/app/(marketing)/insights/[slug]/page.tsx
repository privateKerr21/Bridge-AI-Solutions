import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles, getArticleMeta } from "@/lib/articles";
import styles from "./page.module.css";

const SITE = "https://aibridgedsolutions.com";

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getArticleMeta(slug);
  const url = `${SITE}/insights/${slug}`;
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: meta.title,
      description: meta.description,
      siteName: "Bridge AI Solutions",
      publishedTime: meta.date,
      modifiedTime: meta.dateModified ?? meta.date,
      authors: ["Hayden Kerr"],
      tags: meta.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export const dynamicParams = false;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getArticleMeta(slug);
  const { default: Content } = await import(`@/content/insights/${slug}.mdx`);
  const url = `${SITE}/insights/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.dateModified ?? meta.date,
    url,
    mainEntityOfPage: url,
    keywords: meta.keywords,
    author: {
      "@type": "Person",
      name: "Hayden Kerr",
      url: "https://www.linkedin.com/in/haydenkerr-bridged",
    },
    publisher: {
      "@type": "Organization",
      name: "Bridge AI Solutions",
      url: SITE,
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/brand/logos/bridge_ai_logo4.png`,
      },
    },
    articleSection: meta.tag,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE}/insights` },
      { "@type": "ListItem", position: 3, name: meta.title, item: url },
    ],
  };

  const faqSchema = meta.faqPairs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: meta.faqPairs.map((p) => ({
          "@type": "Question",
          name: p.q,
          acceptedAnswer: { "@type": "Answer", text: p.a },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <section className={styles.articleHero} aria-labelledby="article-title">
        <div className={styles.articleHeroInner}>
          <p className={styles.articleTag}>
            <span>// {meta.tag}</span>
          </p>
          <h1 id="article-title" className={styles.articleTitle}>{meta.title}</h1>
          <div className={styles.articleMeta}>
            <span>{meta.date}</span>
            <span>{meta.readTime}</span>
          </div>
        </div>
      </section>

      <section className={styles.articleBody}>
        <div className="container">
          <div className={styles.articleGrid}>
            <article className={styles.articleContent}>
              <Content />
            </article>

            <aside className={styles.articleSidebar}>
              <div className={styles.sidebarCta}>
                <h3>Find your bottleneck</h3>
                <p>Answer three questions and get a clear read on where custom software would have the biggest impact.</p>
                <Link href="/#quiz" className="btn-ink" style={{ width: "100%", textAlign: "center", justifyContent: "center" }}>
                  Take the quiz →
                </Link>
              </div>
              <div className={styles.sidebarBack}>
                <Link href="/insights">← All articles</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.articleFooterNav}>
        <div className="container">
          <h2>Turn your bottleneck into a custom tool.</h2>
          <p>Thirty minutes to scope the work. The proposal that follows lays out exactly what to build and what it would cost.</p>
          <a
            href="https://calendly.com/h-kerr711/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ink"
          >
            Book a discovery call
          </a>
        </div>
      </section>
    </>
  );
}
