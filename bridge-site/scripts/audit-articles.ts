/**
 * Article freshness audit.
 *
 * Run: npx tsx scripts/audit-articles.ts
 *
 * Flags articles whose `dateModified` is older than the threshold (default 90 days).
 * Recency is the single biggest GEO lever — AI-cited URLs are ~25.7% fresher than organic top
 * results (Ahrefs), and 76.4% of ChatGPT's top-cited pages were updated within 30 days (Seer).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const REFRESH_DAYS = Number(process.env.REFRESH_DAYS ?? 90);
const CONTENT_DIR = path.join(process.cwd(), "content/insights");

interface Row {
  slug: string;
  title: string;
  date: string;
  dateModified: string;
  ageDays: number;
  hasFaq: boolean;
  hasKeywords: boolean;
  hasCitableStat: boolean;
}

function ageInDays(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
}

function audit(): Row[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Missing content dir: ${CONTENT_DIR}`);
    process.exit(1);
  }
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file): Row => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const date = data.date ?? "";
      const dateModified = data.dateModified ?? data.date ?? "";
      // Citable factoid heuristic: a number followed by a parenthetical source — e.g. "73% (HubSpot, 2024)"
      const hasCitableStat = /\d+[%a-zA-Z]?\s*\([^)]*\d{4}\)/.test(content);
      return {
        slug,
        title: String(data.title ?? slug),
        date,
        dateModified,
        ageDays: dateModified ? ageInDays(dateModified) : Infinity,
        hasFaq: Array.isArray(data.faqPairs) && data.faqPairs.length > 0,
        hasKeywords: Array.isArray(data.keywords) && data.keywords.length > 0,
        hasCitableStat,
      };
    })
    .sort((a, b) => b.ageDays - a.ageDays);
}

function main() {
  const rows = audit();
  const stale = rows.filter((r) => r.ageDays > REFRESH_DAYS);
  const missingFaq = rows.filter((r) => !r.hasFaq);
  const missingKeywords = rows.filter((r) => !r.hasKeywords);
  const missingStats = rows.filter((r) => !r.hasCitableStat);

  console.log(`\nArticle freshness audit — threshold ${REFRESH_DAYS} days\n`);
  console.log("Slug".padEnd(50), "Modified".padEnd(12), "Age", "FAQ", "Kw", "Stat");
  console.log("-".repeat(90));
  for (const r of rows) {
    const flag = r.ageDays > REFRESH_DAYS ? " ← refresh" : "";
    console.log(
      r.slug.padEnd(50),
      (r.dateModified || "?").padEnd(12),
      String(r.ageDays).padStart(4),
      r.hasFaq ? " ✓ " : " ✗ ",
      r.hasKeywords ? " ✓ " : " ✗ ",
      r.hasCitableStat ? " ✓ " : " ✗ ",
      flag
    );
  }

  console.log(`\nSummary:`);
  console.log(`  Total: ${rows.length}`);
  console.log(`  Stale (>${REFRESH_DAYS}d): ${stale.length}`);
  console.log(`  Missing FAQ: ${missingFaq.length}`);
  console.log(`  Missing keywords: ${missingKeywords.length}`);
  console.log(`  Missing inline-cited stat: ${missingStats.length}`);

  if (stale.length) {
    console.log(`\nRefresh candidates:`);
    for (const r of stale) console.log(`  - ${r.slug}  (${r.ageDays}d old)`);
  }

  process.exit(stale.length > 0 ? 1 : 0);
}

main();
