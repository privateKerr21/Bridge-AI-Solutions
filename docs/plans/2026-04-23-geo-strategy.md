# GEO Strategy — Bridge AI Solutions
**Created:** 2026-04-23  
**Goal:** Get Bridge AI cited by AI engines (ChatGPT, Perplexity, Gemini, Claude) when ICP searches for custom AI software for small B2B businesses.

---

## What We're Optimizing For

When a small B2B business owner asks an AI assistant:
- *"What's the difference between no-code automation and custom AI software?"*
- *"How much does custom business software cost for a small business?"*
- *"Who builds custom AI tools for small businesses?"*
- *"Should I use Zapier or hire someone to build custom software?"*

...Bridge AI should appear in the answer.

---

## Architecture

GEO has three layers. Each phase builds on the last:

```
Layer 1: Technical Foundation  →  AI engines CAN read us correctly
Layer 2: Content (On-site)     →  AI engines WANT to cite us
Layer 3: Off-site Citations    →  AI engines TRUST us enough to mention us
```

Nurture loop runs continuously across all three layers.

---

## Phase 1: Technical Foundation
**Timeline:** Week 1  
**Goal:** Give AI engines the raw signals they need to correctly identify, categorize, and excerpt Bridge AI content.

### Task 1: JSON-LD Schema — Organization + WebSite
Add to `<head>` of every page (`index.html`, `pricing.html`, `insights.html`, `use-cases.html`).

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Bridge AI Solutions",
  "url": "https://bridgeaisolutions.com",
  "description": "Bridge AI Solutions builds custom AI-powered software and tools for small B2B service businesses. We identify your biggest operational bottleneck and build a real solution you own.",
  "foundingDate": "2026",
  "areaServed": "US",
  "knowsAbout": ["AI software development", "business automation", "custom software for small businesses"],
  "sameAs": ["https://linkedin.com/company/bridge-ai-solutions"]
}
```

**Acceptance criteria:**
- [ ] JSON-LD block in `<head>` of all 4 pages
- [ ] Passes Google Rich Results Test
- [ ] `sameAs` points to real, live LinkedIn company page

---

### Task 2: JSON-LD Schema — Service (one per tier)
Add to `index.html` and `pricing.html`.

Three `Service` schemas covering Focused Build, Signature Build, Studio Partner — each with `name`, `description`, `provider`, `offers` (with `price`, `priceCurrency`).

**Acceptance criteria:**
- [ ] 3 `Service` schemas present in pricing.html
- [ ] Each has a description that includes the key benefit sentence
- [ ] Prices match what's on the page

---

### Task 3: JSON-LD Schema — WebSite with SearchAction
Add to `index.html`.

```json
{
  "@type": "WebSite",
  "name": "Bridge AI Solutions",
  "url": "https://bridgeaisolutions.com"
}
```

**Acceptance criteria:**
- [ ] WebSite schema present in index.html

---

### Task 4: Sitemap + robots.txt
Neither currently exists.

- `sitemap.xml`: list all 4 pages with `<lastmod>` dates
- `robots.txt`: `User-agent: * / Allow: /` — explicitly allow AI crawlers (GPTBot, PerplexityBot, ClaudeBot, Google-Extended)

**Acceptance criteria:**
- [ ] `sitemap.xml` accessible at root
- [ ] `robots.txt` explicitly allows GPTBot, PerplexityBot, ClaudeBot, Google-Extended
- [ ] Sitemap referenced in robots.txt

---

### Task 5: Entity Clarity Pass — index.html
AI engines need a clear, unambiguous entity sentence within the first ~200 words of the page.

Add or surface this sentence in the hero or just below it:

> *"Bridge AI Solutions is a custom software consultancy that builds AI-powered tools and automations for small B2B service businesses in the United States."*

**Acceptance criteria:**
- [ ] Entity sentence visible in page body (not just meta description)
- [ ] Sentence is within first 300 words of rendered content
- [ ] Sentence includes: who (Bridge AI Solutions), what (custom AI software), for whom (small B2B service businesses), where (US)

---

### Checkpoint 1
- [ ] All 4 pages have Organization + WebSite schema
- [ ] pricing.html has 3 Service schemas
- [ ] sitemap.xml and robots.txt live
- [ ] Entity sentence visible on homepage

---

## Phase 2: On-Site Content
**Timeline:** Weeks 2–3  
**Goal:** Give AI engines excerpt-ready, citable content that directly answers ICP queries.

### Task 6: FAQ Section — index.html
8–10 Q&As targeting the queries our ICP asks AI assistants. Each answer: 2–4 sentences max, direct, no fluff.

**Target questions:**
1. What does Bridge AI Solutions do?
2. What's the difference between no-code automation (Zapier/Make) and custom AI software?
3. Who is Bridge AI Solutions for?
4. How long does a project take?
5. Do I own the software after the project?
6. What kind of problems does custom AI software solve for small businesses?
7. Is Bridge AI right for me if I'm not technical?
8. How is Bridge AI different from hiring a freelancer?

Add `FAQPage` JSON-LD schema alongside the HTML section.

**Acceptance criteria:**
- [ ] FAQ section rendered on index.html
- [ ] `FAQPage` JSON-LD matches the HTML questions exactly
- [ ] Each answer is ≤4 sentences
- [ ] Passes Google Rich Results Test for FAQ

---

### Task 7: FAQ Section — pricing.html
5–6 Q&As targeting cost/ROI/process questions:

1. How much does custom AI software cost for a small business?
2. What's included in the Focused Build?
3. Do I have to sign a long-term contract?
4. What happens after the project is delivered?
5. What's the ROI on custom AI software?
6. How does the 50/50 payment structure work?

**Acceptance criteria:**
- [ ] FAQ section on pricing.html
- [ ] `FAQPage` JSON-LD in pricing.html
- [ ] Each answer includes at least one concrete number or timeframe

---

### Task 8: Use Cases Page — Structured Answer Chunks
`use-cases.html` currently exists. Restructure each use case as a self-contained answer block:

- H2 as the problem statement (question format)
- First paragraph: direct answer (who this helps, what we build)
- Second paragraph: what it replaces and approximate ROI
- Add `HowTo` or `Article` schema per use case

**Acceptance criteria:**
- [ ] Each use case has H2 in question format
- [ ] First paragraph answers the question directly in ≤3 sentences
- [ ] Use cases page has Article or HowTo schema

---

### Task 9: Insights Page — GEO-first Articles
`insights.html` exists but likely holds generic content. Write 2–3 articles specifically targeting AI-answerable queries:

**Article ideas:**
- *"No-code automation vs. custom AI software: which is right for your business?"*
- *"What can a small B2B business automate with AI in 2026?"*
- *"How to evaluate whether custom software is worth it for a 10-person business"*

Each article should:
- Open with a direct answer to the title question (inverted pyramid)
- Include a definition section with bolded terms
- End with a concrete recommendation

**Acceptance criteria:**
- [ ] 2 articles published to insights.html or linked pages
- [ ] Each article ≥600 words
- [ ] Each article has `Article` JSON-LD schema
- [ ] Articles open with a direct answer in the first paragraph

---

### Checkpoint 2
- [ ] FAQ live on index.html and pricing.html with JSON-LD
- [ ] Use cases restructured as answer chunks
- [ ] ≥2 insights articles published
- [ ] All new content validates in Rich Results Test

---

## Phase 3: Off-Site Citations
**Timeline:** Months 1–2 (ongoing)  
**Goal:** Get Bridge AI mentioned on third-party sites that AI engines are trained on / actively crawl.

### Task 10: LinkedIn Company Page
AI engines pull heavily from LinkedIn.

- Company description: use entity clarity sentence + 3 service bullets
- About section: plain text, not marketing copy
- Link back to bridgeaisolutions.com
- Post 1–2x/week (see Task 15)

**Acceptance criteria:**
- [ ] Company page live and fully filled
- [ ] Description matches entity clarity sentence from website
- [ ] `sameAs` in Organization schema points to this page

---

### Task 11: ProductHunt Launch
ProductHunt is heavily crawled and often cited by Perplexity.

- Create a product listing for Bridge AI
- Tagline: "Custom AI software for small B2B businesses — not templates, not Zapier"
- Link to all relevant pages
- Engage comments on launch day

**Acceptance criteria:**
- [ ] Product listed on ProductHunt
- [ ] Description uses GEO-friendly language (entity sentence + differentiator)

---

### Task 12: Indie Hackers Profile
IH is crawled and trusted. Many AI engines cite IH posts.

- Create founder profile (Hayden Kerr)
- Post: *"Building a custom AI software boutique for small B2B businesses — here's what I've learned"*
- Include Bridge AI link naturally in post

**Acceptance criteria:**
- [ ] IH profile live
- [ ] ≥1 substantive post linking to Bridge AI

---

### Task 13: Business Directories
Submit to directories that AI engines use as knowledge sources:

| Directory | Priority | Type |
|---|---|---|
| Clutch.co | High | Agency listing |
| G2 | Medium | Software/services |
| Crunchbase | Medium | Company profile |
| DesignRush | Low | Agency directory |
| GoodFirms | Low | IT services |

**Acceptance criteria:**
- [ ] Clutch profile live with full description
- [ ] Crunchbase company page created
- [ ] Description consistent across all directories (NAP + entity sentence)

---

### Task 14: Reddit Presence
Reddit is cited extremely frequently by Perplexity and ChatGPT.

Strategy: helpful answering, not promotion. Answer relevant questions in:
- r/smallbusiness
- r/entrepreneur
- r/artificial
- r/SaaS

When relevant, mention Bridge AI as context ("I run an AI software boutique, and what I see most..."). Don't spam — 1–2 quality answers/week.

**Acceptance criteria:**
- [ ] Reddit account created (or personal account used)
- [ ] ≥4 substantive answers posted across relevant subreddits in Month 1
- [ ] Bridge AI mentioned naturally in ≥2 posts

---

### Checkpoint 3
- [ ] LinkedIn company page live and linked in schema
- [ ] ProductHunt listing live
- [ ] Indie Hackers post published
- [ ] Clutch + Crunchbase profiles created
- [ ] Reddit engagement started

---

## Phase 4: Ongoing Nurture
**Timeline:** Monthly, indefinitely

### Task 15: Content Cadence
Publish **1 insights article per week** targeting a new AI-answerable query. Repurpose as:
- LinkedIn post (same day)
- Reddit comment where relevant (once account exists)

**Topic backlog (first 12 weeks):**
- Week 1: No-code vs. custom AI software — which is right for your business?
- Week 2: What AI can realistically automate for a 10-person B2B business
- Week 3: How to evaluate a custom software vendor (red flags + green flags)
- Week 4: What does custom AI software actually cost in 2026?
- Week 5: Case study format — anonymized client (process, result, timeline)
- Week 6: "Is AI right for my business?" — a decision framework
- Week 7: The hidden cost of duct-tape software (Zapier + spreadsheets)
- Week 8: How long does a custom AI project actually take?
- Week 9: What to do before hiring a software developer
- Week 10: 5 operational bottlenecks AI can eliminate for service businesses
- Week 11: Do you own the software? What to ask before signing anything
- Week 12: How to brief a developer — what they need to build the right thing

**Quality rule:** Each article must open with a direct answer to the title question in ≤3 sentences. No fluffy intros. AI engines excerpt the first clear answer they find.

---

### Task 16: GEO Monitoring (Monthly Check)
Every month, manually query these AI engines and record what they say about Bridge AI:

**Query set:**
1. "Who builds custom AI software for small businesses?"
2. "What's the difference between Zapier and custom AI software?"
3. "Bridge AI Solutions" (direct brand query)
4. "custom AI tools for B2B service businesses"

**Engines to check:** ChatGPT, Perplexity, Gemini, Claude

Log results in `docs/geo-monitoring.md`. Track: cited/not cited, excerpt used, competitors mentioned.

**Acceptance criteria:**
- [ ] `docs/geo-monitoring.md` created with first entry
- [ ] Monthly cadence established (calendar reminder)

---

### Task 17: Schema Maintenance
When any page content changes, update the corresponding JSON-LD to match. Stale schema hurts trust signals.

Checklist on any page edit:
- [ ] JSON-LD descriptions still accurate?
- [ ] FAQ answers still current?
- [ ] Service prices still correct?

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| AI engines don't crawl the site | High | robots.txt explicitly allows all major bots; submit sitemap to GSC |
| Schema errors | Medium | Validate with Google Rich Results Test after every change |
| Reddit backfire (looks spammy) | Medium | Only respond to genuine questions; never post links without context |
| Low domain authority hurts off-site mentions | Medium | Focus on quality (Clutch, IH) over quantity of directories |
| Content goes stale | Low | Monthly monitoring task flags gaps |

---

## Resolved Questions
- **Canonical domain**: `https://aibridgedsolutions.com`
- **Google Search Console**: not yet verified — Task 0 added below
- **Reddit**: no account yet — deprioritized until account created
- **Insights articles**: deferred — content generation dashboard planned as a separate future project (auto-generate articles in Hayden's voice, one-click publish pipeline)

## Task 0: Google Search Console Setup
Do this before Phase 1 — GSC is how you submit the sitemap and confirm AI/search engines are crawling correctly.

**Steps:**
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → choose "Domain" type → enter `aibridgedsolutions.com`
3. Verify via DNS TXT record (add it in your domain registrar — Namecheap, GoDaddy, Cloudflare, etc.)
4. Once verified: go to Sitemaps → submit `https://aibridgedsolutions.com/sitemap.xml`

**Acceptance criteria:**
- [ ] GSC property verified for `aibridgedsolutions.com`
- [ ] Sitemap submitted and showing no errors
