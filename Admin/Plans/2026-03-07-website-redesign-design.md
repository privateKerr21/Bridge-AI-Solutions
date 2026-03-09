# Bridge AI Solutions — Website Redesign Design Doc

**Date**: 2026-03-07
**Status**: Approved
**Author**: Claude (Bridge AI Solutions session)

---

## Context & Goal

The current landing page (`Assets/landing_page_v2.html`) has solid content but looks visually generic — "created with a prompt." The site needs to serve as a **lead generation funnel** for newsletter traffic: people already interested in AI automation who want someone to build it for them.

**Primary conversion goal**: Email capture
**Secondary engagement**: 3-question quiz (qualifies leads, drives interaction)
**Traffic source**: Newsletter partnership (warm, AI-curious audience)

---

## Architecture: Two Pages

### Page 1 — Landing Page (`index.html`)
Pure conversion focus. Every element earns its place by moving visitors toward the quiz or email capture.

**Section order:**
1. **Hero** (full viewport) — Bold headline + one-liner offer + two CTAs
   - Primary: "Find Out What You Can Automate" (anchors to quiz)
   - Secondary: "Get Updates" (email field, immediate capture)
2. **Quiz Block** — 3 questions, inline card-based, one at a time
   - Q1: What type of work are you looking to automate?
   - Q2: How much time per week do you spend on it?
   - Q3: Have you tried any AI tools already?
3. **Quiz Result + Email Capture** — Personalized output based on answers + "Get your custom automation roadmap" email field
4. **How It Works** — 3 steps: Discover → Build → Hand Off (brief, credibility not education)
5. **Stats Strip** — 3–4 oversized numbers (hours saved, tasks automated, ROI examples)
6. **Footer** — Link to editorial page, contact, social

### Page 2 — Editorial Page (`insights.html`)
Long-form credibility content repurposed from `landing_page_v2.html`. Linked from footer and hero nav. Sections include:
- Pain points by industry
- ROI data and real-world stats
- "What AI Can (and Can't) Do" honest section
- Process detail
- Audience targeting ("Is this right for you?")

All restyled in the new design system. CTAs at top and bottom link back to `index.html`.

---

## Visual Design System

### Color Palette
| Role | Hex | Usage |
|---|---|---|
| Background | `#F5F2EE` | Warm off-white — page background |
| Primary text | `#0D0D0D` | Near-black — all body and headline text |
| Accent | `#D4AF37` | Soft gold — CTAs, highlights, quiz progress, stat callouts |
| Dark sections | `#0D0D0D` bg | Hero, stats strip, footer — full-bleed contrast moments |
| Dark section text | `#F5F2EE` | Text on dark backgrounds |
| Muted text | `#6B6B6B` | Secondary copy, captions |

### Typography
| Role | Font | Weight |
|---|---|---|
| Headlines | Space Grotesk | 700–800 |
| Body | Inter | 400, 500 |
| Labels / Mono | Space Mono | 400 |

All fonts loaded via Google Fonts.

### Layout Principles
- **Asymmetric composition**: headlines can break grid, oversized elements overlap sections
- **Full-bleed section transitions**: dark → light → dark creates visual rhythm
- **No rounded corners** on primary UI elements (editorial feel)
- **Thick ruled lines**: 2–3px solid `#0D0D0D` as section dividers
- **Oversized stat numbers**: rendered at 80–120px to create visual impact
- **Sharp CTA buttons**: black bg + gold text OR gold bg + black text, 0px border-radius

### Quiz Design
- One question displayed at a time (JS-driven, no page reload)
- Large clickable answer tiles (not radio buttons)
- Gold progress bar across the top of the quiz block
- Result screen is personalized (3 outcome variants based on answer combo)
- Email field appears on result screen only — feels earned, not forced

---

## File Structure

```
Bridge AI Solutions/
├── index.html                  # New landing page (replaces redirect)
├── insights.html               # New editorial page
├── Assets/
│   ├── landing_page_v2.html    # Archived (content source for insights.html)
│   └── Brand/
│       ├── styles.css          # Updated global styles
│       └── Logos/              # Existing logo assets
└── docs/
    └── plans/
        └── 2026-03-07-website-redesign-design.md
```

---

## Content Notes

- **Hero headline**: Should lead with the outcome, not the service. E.g. "Your AI Systems, Built For You." or "Stop Doing Work That AI Can Do."
- **Quiz**: Qualifies leads and personalizes the follow-up email sequence
- **Editorial page**: Preserve all existing stats, pain point copy, and "AI reality" section — just restyle
- **Tone**: Confident, direct, no jargon. Speaks to someone already sold on AI who needs to trust the builder.

---

## Out of Scope (this phase)
- Backend email capture integration (placeholder form for now, Mailchimp/ConvertKit hookup later)
- Quiz result email automation
- Blog or additional content pages
- Analytics / tracking setup
