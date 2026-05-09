import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles, getArticleMeta } from "@/lib/articles";
import styles from "./page.module.css";

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
  return { title: meta.title, description: meta.description };
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    url: `https://aibridgedsolutions.com/insights/${slug}`,
    mainEntityOfPage: `https://aibridgedsolutions.com/insights/${slug}`,
    author: {
      "@type": "Person",
      name: "Hayden Kerr",
      url: "https://www.linkedin.com/in/haydenkerr-bridged",
    },
    publisher: {
      "@type": "Organization",
      name: "Bridge AI Solutions",
      url: "https://aibridgedsolutions.com",
      logo: {
        "@type": "ImageObject",
        url: "https://aibridgedsolutions.com/brand/logos/bridge_ai_logo4.png",
      },
    },
    articleSection: meta.tag,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

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
