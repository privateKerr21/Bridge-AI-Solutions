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

      <section className={styles.articleHero}>
        <div className={"container " + styles.articleHeroInner}>
          <span className={"label " + styles.articleTag}>{meta.tag}</span>
          <h1 className={styles.articleTitle}>{meta.title}</h1>
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
                <span className="label" style={{ color: "var(--muted)", display: "block", marginBottom: 14 }}>
                  // Take the quiz
                </span>
                <h3>Find your biggest bottleneck</h3>
                <p>Answer 3 questions and get a clear read on where custom software would have the biggest impact on your operation.</p>
                <Link href="/#quiz" className="btn btn-primary" style={{ width: "100%", textAlign: "center", display: "block" }}>
                  Take the Quiz &rarr;
                </Link>
              </div>
              <div className={styles.sidebarBack}>
                <Link href="/insights">← All Articles</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.articleFooterNav}>
        <div className="container">
          <span className="label" style={{ color: "var(--gold)", display: "block", marginBottom: 20 }}>
            // Ready to build?
          </span>
          <h2>Turn your bottleneck into a custom tool.</h2>
          <p>A 30-minute discovery call is all it takes to map out exactly what to build and what it would cost.</p>
          <Link href="/#quiz" className="btn btn-primary">
            Book a Discovery Call &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
