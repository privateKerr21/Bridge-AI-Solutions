import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import styles from "./RelatedReading.module.css";

interface Props {
  currentSlug: string;
  limit?: number;
}

export default function RelatedReading({ currentSlug, limit = 3 }: Props) {
  const articles = getAllArticles()
    .filter((a) => a.slug !== currentSlug)
    .slice(0, limit);

  if (!articles.length) return null;

  return (
    <aside className={styles.wrap} aria-labelledby="related-heading">
      <p className={styles.label}>// Related reading</p>
      <h2 id="related-heading" className={styles.heading}>
        Keep going
      </h2>
      <ul className={styles.list}>
        {articles.map((a) => (
          <li key={a.slug} className={styles.item}>
            <Link href={`/insights/${a.slug}`} className={styles.link}>
              <span className={styles.tag}>{a.tag}</span>
              <span className={styles.title}>{a.title}</span>
              <span className={styles.meta}>{a.readTime}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
