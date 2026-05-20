import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/insights");

export interface FaqPair {
  q: string;
  a: string;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateModified?: string;
  readTime: string;
  tag: string;
  keywords?: string[];
  faqPairs?: FaqPair[];
}

function readMeta(slug: string, raw: string): ArticleMeta {
  const { data } = matter(raw);
  const meta = { slug, ...data } as ArticleMeta;
  if (!meta.dateModified) meta.dateModified = meta.date;
  return meta;
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      return readMeta(slug, fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8"));
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleMeta(slug: string): ArticleMeta {
  return readMeta(slug, fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf-8"));
}
