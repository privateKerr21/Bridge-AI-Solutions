import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/insights");

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tag: string;
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data } = matter(
        fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8")
      );
      return { slug, ...data } as ArticleMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleMeta(slug: string): ArticleMeta {
  const { data } = matter(
    fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf-8")
  );
  return { slug, ...data } as ArticleMeta;
}
