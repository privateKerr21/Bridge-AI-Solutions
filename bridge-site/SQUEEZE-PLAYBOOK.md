# Squeeze Page Playbook — Bridge AI Solutions

Lessons and principles from the Shadow Audit squeeze page build. Use this as the reference for all future landing pages, ad copy, and conversion-focused pages.

---

## Positioning

**Core insight:** The audience already believes AI matters. We are NOT convincing them AI is useful. We are convincing them that:
- Implementation is harder than they think
- Having someone diagnose and install it beats DIY

**Voice:** Strategic, minimal, operator-level. NOT "AI bro," NOT "agency landing page," NOT fake urgency.

**The page should feel like:** Linear, Notion, Arc — high-trust minimalism. The audience (Bagel Bots readers) hates overdesigned funnels, hype marketing, and countdown timers.

---

## Roadmap as Sales Tool

The roadmap is a **diagnostic that creates demand**, not a DIY blueprint.

| Do this | Not this |
|---------|----------|
| Diagnose the problem clearly | Give them a technical spec |
| Name the solution at a high level | Provide architecture they can hand to a dev |
| Quantify the value (hours/week, cost) | Promise a "build plan" or "blueprint" |
| Make the build feel real but complex | Use language like "step-by-step guide" |
| End with a clear path back to Hayden | End with "now go do it yourself" |

**The natural conclusion after reading the roadmap:** "I need someone to build this for me."

**Deliverable framing that works:**
1. The Diagnosis — where you're losing time, quantified
2. The Opportunity — what AI could do, at a high level
3. The Recommendation — what to build first, enough to start OR hand off

**Avoid:** "Buy vs. Build Analysis," "90-day plan," internal methodology names (e.g. "Pull Matrix"), anything that sounds like a course curriculum.

---

## Copy Principles

### Headlines
- Meet the reader where they are: aware but stuck, not mid-build
- Mirror their internal monologue ("You know AI should be doing this already")
- Avoid talking to builders — talk to business owners who haven't started

### Body Copy
- Lead with the gap: awareness vs. implementation
- Name specific pain (ChatGPT tabs, half-finished prototypes, prompts in docs)
- Never use "shipping" — use "building" or "installing"
- Never reference internal pricing ($2,500 builds, engagement tiers) — it triggers "I'm being sold to"
- Keep "automation" language minimal — say "AI agent," "custom AI," "AI system"

### CTAs
- Use "Get My AI Roadmap" not "Take the Audit"
- Include the price in the button ("Get My AI Roadmap — Free")
- Don't oversaturate — max 4 CTAs: hero, after how-it-works, after deliverables, final close
- Skip CTAs in sections that build tension (pain, authority) — let momentum carry

### What to cut
- Any section where you're "preaching to the choir" — if the headline already says it, the section is redundant
- Self-congratulatory authority sections — proof points are strong but must earn their real estate
- Any language that sounds like a sales page (fake scarcity, "limited time," jargon)

---

## Design System (Bagel Bots Style)

These tokens override the Atelier system inside `.squeeze-shell` only. The main Bridge AI site keeps its own design.

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| Background | `#FFFFFF` | Page background |
| Text | `#030712` | Headings, primary text |
| Body text | `#374151` | Paragraphs |
| Muted | `#6B7280` | Eyebrows, secondary text |
| Border | `#E5E7EB` | Dividers, hairlines |
| CTA | `#ff4b00` | Buttons, accent |
| CTA hover | `#cc3d00` | Button hover state |
| Surface | `#F9FAFB` | Cards, deliverable backgrounds |

### Typography
| Role | Font | Weight |
|------|------|--------|
| Headings | Poppins | 600-700 |
| Body | Inter | 400-500 |
| Labels/eyebrows | Space Mono | 400 |

### Components
- **Buttons:** `border-radius: 8px`, no uppercase, Inter 600, orange fill
- **Sections:** Separated by 1px `#E5E7EB` hairlines, not heavy spacing
- **Layout:** Content max-width 760px (hero stretches to 1100px for two-column)
- **Hero:** Two-column grid — text left, visual right. Must fit above the fold.
- **Mobile:** Stacks to single column, image above text

### What NOT to use
- Robots, glowing brains, neon cyberpunk imagery
- Generic AI stock art
- Blue gradient anything
- Sharp corners / brutalist 2px borders (that's the main Bridge AI site, not squeeze pages)

---

## Page Structure (Current)

1. **Hero** — eyebrow, h1, subhead, body copy, image (right column), CTA
2. **How it works** — 3 steps, CTA
3. **What you get** — 3 deliverables, CTA
4. **Final CTA** — dark background close, micro-copy

Four sections. No fat. Every section earns its scroll.

---

## Audience Notes (Bagel Bots)

- Newsletter readers interested in AI for business
- Pre-qualified: they already believe AI matters
- Hate being sold to — trust is earned through clarity, not hype
- Respond to specificity and honesty over persuasion tactics
- Coming from editorial content — the squeeze page should feel like a natural next step, not a jarring funnel

---

*Last updated: 2026-05-19*
