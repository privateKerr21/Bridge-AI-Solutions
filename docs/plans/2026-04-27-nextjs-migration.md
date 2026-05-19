# Implementation Plan: Next.js Migration
**Created:** 2026-04-27
**Status:** Awaiting approval

---

## Overview

Migrate Bridge AI Solutions from static HTML to a Next.js App Router site deployed on Vercel. The marketing site (5 pages + articles) and the internal dashboard both move into one Next.js project. Articles become MDX files — no more hand-writing HTML per post. API routes migrate directly. The design system (CSS variables, typography, brand tokens) carries over unchanged.

---

## Architecture Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Router | App Router | Current default, RSC support, best Vercel integration |
| Language | TypeScript | 2026 default, catches prop errors early |
| Styling | `globals.css` + CSS Modules | Preserves existing design tokens with zero rewrite; no Tailwind migration needed |
| Articles | MDX via `@next/mdx` | Write in markdown, publish by adding a file — no HTML per article |
| Dashboard | Integrated route (`/dashboard`) | Keep existing vanilla JS + Supabase — wrap in a Next.js page shell, no React rewrite |
| Fonts | `next/font/google` | Replaces manual preconnect tags, eliminates layout shift |
| Sitemap | `app/sitemap.ts` | Auto-generates + auto-includes new articles as MDX files are added |
| JSON-LD | Inline `<script>` in page components | Keeps schema co-located with the page it describes |

---

## Task List

### Phase 1: Project Setup

#### Task 1: Scaffold Next.js project
- [ ] `npx create-next-app@latest bridge-site --typescript --app --no-tailwind --no-src-dir`
- [ ] Connect to existing Vercel project (or create new, point domain)
- [ ] Confirm `npm run dev` starts clean
- [ ] Add `.env.local` with `ANTHROPIC_API_KEY`, `GPTZERO_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Acceptance criteria:**
- [ ] Dev server runs at localhost:3000
- [ ] Vercel project linked
- [ ] Env vars loaded

**Files:** `package.json`, `next.config.ts`, `.env.local`, `tsconfig.json`
**Scope:** Small

---

#### Task 2: Global styles + font setup
- [ ] Copy CSS variables and base styles from `Assets/Brand/styles.css` into `app/globals.css`
- [ ] Replace Google Fonts `<link>` tags with `next/font/google` in `app/layout.tsx` (Space Grotesk, Inter, Space Mono)
- [ ] Expose font CSS variables on `:root` so existing class names work unchanged

**Acceptance criteria:**
- [ ] CSS variables (`--gold`, `--ink`, `--bg`, etc.) available globally
- [ ] Fonts load without layout shift
- [ ] No existing class names need to change

**Files:** `app/globals.css`, `app/layout.tsx`
**Scope:** Small

---

#### Task 3: Shared Nav + Footer components
- [ ] Build `components/Nav.tsx` — matches current nav exactly (links, logo, mobile behavior)
- [ ] Build `components/Footer.tsx` — matches current footer
- [ ] Wire both into `app/layout.tsx`

**Acceptance criteria:**
- [ ] Nav renders on all pages without per-page code
- [ ] Mobile nav toggle works
- [ ] Active link state correct per page
- [ ] Footer links all resolve

**Files:** `components/Nav.tsx`, `components/Footer.tsx`, `app/layout.tsx`
**Scope:** Medium

---

### Checkpoint 1
- [ ] Dev server runs, fonts load, nav + footer render
- [ ] No console errors

---

### Phase 2: Marketing Pages

#### Task 4: Homepage (`/`)
- [ ] Migrate `index.html` to `app/page.tsx`
- [ ] Extract page-specific styles to `app/page.module.css`
- [ ] Add Organization + WebSite + FAQPage JSON-LD inline
- [ ] Migrate inline `<script>` quiz logic to a `components/Quiz.tsx` client component

**Acceptance criteria:**
- [ ] Page matches current design pixel-for-pixel
- [ ] Quiz functions correctly
- [ ] JSON-LD validates in Google Rich Results Test
- [ ] `next/head` metadata (title, description, OG tags) set

**Files:** `app/page.tsx`, `app/page.module.css`, `components/Quiz.tsx`
**Scope:** Large

---

#### Task 5: Pricing page (`/pricing`)
- [ ] Migrate `pricing.html` to `app/pricing/page.tsx`
- [ ] Extract styles to `app/pricing/page.module.css`
- [ ] Add Organization + 3x Service + FAQPage JSON-LD

**Acceptance criteria:**
- [ ] All three pricing tiers render correctly
- [ ] Founding offer banner displays
- [ ] JSON-LD validates

**Files:** `app/pricing/page.tsx`, `app/pricing/page.module.css`
**Scope:** Medium

---

#### Task 6: Use Cases page (`/use-cases`)
- [ ] Migrate `use-cases.html` to `app/use-cases/page.tsx`
- [ ] Extract styles to `app/use-cases/page.module.css`
- [ ] Add Organization + ItemList JSON-LD

**Acceptance criteria:**
- [ ] All 5 industry sections render
- [ ] Schema validates

**Files:** `app/use-cases/page.tsx`, `app/use-cases/page.module.css`
**Scope:** Medium

---

#### Task 7: Insights landing page (`/insights`)
- [ ] Migrate `insights.html` to `app/insights/page.tsx`
- [ ] Article cards pull from MDX file metadata (frontmatter) automatically — no manual card updates when new articles publish
- [ ] "Coming Next" placeholder removed; page shows whatever MDX files exist

**Acceptance criteria:**
- [ ] Article cards render from MDX frontmatter
- [ ] Adding a new MDX file automatically adds a card — no code change needed
- [ ] Page metadata set

**Files:** `app/insights/page.tsx`, `app/insights/page.module.css`
**Scope:** Medium

---

#### Task 8: Onboarding page (`/onboarding`)
- [ ] Migrate `onboarding.html` to `app/onboarding/page.tsx`
- [ ] Preserve ATLAS iframe embed

**Acceptance criteria:**
- [ ] ATLAS iframe loads correctly
- [ ] Page metadata set

**Files:** `app/onboarding/page.tsx`
**Scope:** Small

---

### Checkpoint 2
- [ ] All 5 marketing pages render correctly
- [ ] `npm run build` succeeds with no errors
- [ ] No broken links in nav

---

### Phase 3: Articles (MDX Pipeline)

#### Task 9: MDX pipeline setup
- [ ] Install `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`
- [ ] Configure `next.config.ts` for MDX
- [ ] Create `app/insights/[slug]/page.tsx` — the article layout template
- [ ] Article layout includes: hero (title, date, read time), body prose styles, sidebar, footer nav
- [ ] Create `components/ArticleSchema.tsx` — renders Article JSON-LD from frontmatter props

**Acceptance criteria:**
- [ ] MDX file in `content/insights/` renders at `/insights/[slug]`
- [ ] Frontmatter fields: `title`, `description`, `date`, `readTime`, `tag`
- [ ] Article JSON-LD present and validates

**Files:** `next.config.ts`, `app/insights/[slug]/page.tsx`, `components/ArticleSchema.tsx`
**Scope:** Medium

---

#### Task 10: Migrate existing article + publish Article 2
- [ ] Convert `insights/no-code-vs-custom-ai.html` body to `content/insights/no-code-vs-custom-ai.mdx`
- [ ] Create `content/insights/what-ai-can-automate-for-small-business.mdx` (Article 2 — draft already approved)
- [ ] Verify both render correctly at their slugs
- [ ] Update `sitemap.ts` to include both

**Acceptance criteria:**
- [ ] Both articles accessible and correct
- [ ] Article cards on `/insights` show both automatically
- [ ] Sitemap includes both URLs

**Files:** `content/insights/*.mdx`, `app/sitemap.ts`
**Scope:** Small

---

### Checkpoint 3
- [ ] Both articles render correctly
- [ ] Insights landing auto-populates from MDX files
- [ ] Build clean

---

### Phase 4: API Routes

#### Task 11: Migrate API routes
- [ ] Migrate `api/detect-ai.js` → `app/api/detect-ai/route.ts`
- [ ] Migrate `api/humanize-article.js` → `app/api/humanize-article/route.ts`
- [ ] Migrate `api/generate-article.js` → `app/api/generate-article/route.ts`
- [ ] All routes use Next.js `Request`/`Response` format

**Acceptance criteria:**
- [ ] All three endpoints return correct responses
- [ ] Dashboard article generation still works end-to-end
- [ ] Error handling preserved

**Files:** `app/api/*/route.ts`
**Scope:** Small

---

### Phase 5: Dashboard

#### Task 12: Wrap dashboard in Next.js route
- [ ] Create `app/dashboard/page.tsx` — renders a shell that loads the existing `dashboard.js` and `dashboard.css` as static assets
- [ ] Move `dashboard/dashboard.js` and `dashboard/dashboard.css` to `public/dashboard/`
- [ ] Supabase CDN + SortableJS CDN links preserved in the page shell
- [ ] Login flow unchanged

**Note:** Not rewriting the dashboard in React — it works, it's ~45KB of tested logic, and the ROI of rewriting it is near zero. Wrap it, serve it, move on.

**Acceptance criteria:**
- [ ] `/dashboard` loads and functions identically to current
- [ ] Supabase auth works
- [ ] Kanban drag/drop works
- [ ] No regressions in any dashboard feature

**Files:** `app/dashboard/page.tsx`, `public/dashboard/dashboard.js`, `public/dashboard/dashboard.css`
**Scope:** Small

---

### Phase 6: SEO & GEO Infrastructure

#### Task 13: Sitemap, robots, llms.txt
- [ ] `app/sitemap.ts` — auto-generates from page routes + MDX files in `content/insights/`
- [ ] `app/robots.ts` — mirrors current `robots.txt` (all AI crawlers explicitly allowed)
- [ ] Copy `llms.txt` to `public/llms.txt`
- [ ] Verify all three accessible at root URLs after deploy

**Acceptance criteria:**
- [ ] `https://aibridgedsolutions.com/sitemap.xml` lists all pages + all articles
- [ ] `https://aibridgedsolutions.com/robots.txt` allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended
- [ ] `https://aibridgedsolutions.com/llms.txt` loads
- [ ] Adding a new MDX article auto-adds it to sitemap — no manual update

**Files:** `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt`
**Scope:** Small

---

### Checkpoint 4 — Pre-Deploy
- [ ] `npm run build` completes with zero errors and zero warnings
- [ ] All pages render correctly in production build (`npm start`)
- [ ] All API routes respond correctly
- [ ] Dashboard fully functional
- [ ] Sitemap, robots.txt, llms.txt accessible
- [ ] All JSON-LD validates in Google Rich Results Test
- [ ] No broken internal links

---

### Phase 7: Deploy & Cutover

#### Task 14: Deploy to Vercel + verify
- [ ] Push to `main` — Vercel auto-deploys
- [ ] Verify all routes on production domain
- [ ] Check Vercel Function logs for any API route errors
- [ ] Submit updated sitemap to Google Search Console
- [ ] Confirm AI crawler access (spot-check robots.txt on live URL)
- [ ] Delete old HTML files from repo once verified

**Acceptance criteria:**
- [ ] All pages live at correct URLs
- [ ] No 404s
- [ ] API routes functional in production
- [ ] GSC sitemap updated

**Scope:** Small

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Quiz interactivity breaks in RSC | Medium | Isolate as a `'use client'` component from the start |
| Dashboard JS breaks when moved to `public/` | Medium | Test dashboard fully before removing old files |
| JSON-LD schemas drift during migration | Medium | Validate each page with Rich Results Test at Checkpoint 4 |
| MDX build errors on article content | Low | Test MDX pipeline with one article before migrating both |
| Vercel env vars not set in new project | Low | Verify `.env.local` and Vercel dashboard env vars match before deploy |

---

## Open Questions

None — all architectural decisions resolved above. Ready to start on approval.
