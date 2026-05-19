# LinkedIn Content System — Design Doc
**Date**: 2026-03-09
**Status**: Approved, ready for implementation

---

## Overview

A fully automated LinkedIn content pipeline for Bridge AI Solutions. AI generates weekly post drafts and image prompts from a structured pillar system. Owner reviews, approves, and posts. A companion lead magnet scaffolder generates real deliverables for Pillar 6 posts.

**Target audience**: SMB business owners (potential clients)
**Frequency**: 2-3 posts per week
**Workflow**: Full pipeline — AI drafts, human reviews and approves

---

## Content Pillars

| # | Pillar | Purpose |
|---|--------|---------|
| 1 | **Shadow Work** | Relatable scenes of repetitive tasks — speaks to ideal client's daily pain |
| 2 | **AI Myth-Busting** | Dispels hype and fear — positions Bridge AI as straight-shooting, not salesy |
| 3 | **Tool Spotlight** | Practical AI tool breakdowns for SMBs — builds credibility and search visibility |
| 4 | **The Build** | Building Bridge AI Solutions in public — honest, human, drives connection |
| 5 | **Client Pain Point** | Specific industry problem → automation approach — signals expertise to prospects |
| 6 | **Free Resource** | Valuable freebie + comment trigger CTA — drives comments and warm leads |

---

## Post Templates

### Pillar 1 — Shadow Work
`Scene → Real cost → Name it (shadow work) → Solution hint → CTA question`

### Pillar 2 — AI Myth-Busting
`Common belief (stated sympathetically) → Why it's understandable → What's actually true → Practical takeaway → CTA question`

### Pillar 3 — Tool Spotlight
`Problem it solves → What the tool is (one sentence, no jargon) → How an SMB would use it → Time/effort saved → Where to start → CTA question`

### Pillar 4 — The Build
`What I'm working on or figuring out → Honest observation or lesson → Why it matters for small businesses → CTA question`

### Pillar 5 — Client Pain Point
`Industry + specific frustration → Why it keeps happening → What an automation approach looks like → CTA question`

### Pillar 6 — Free Resource
`Specific problem → Tease the solution → What the resource gives them → Comment trigger CTA ([KEYWORD])`

---

## Each Post Output Includes
- Post text (LinkedIn-formatted, short paragraphs, white space)
- Nano Banana 2 image prompt (brand-aligned: warm off-whites, deep blacks, gold tones)

---

## Weekly Workflow

1. Run `/linkedin-batch` in Claude Code — generates 3 posts rotating through pillars
2. Each draft saved to `Marketing/LinkedIn/drafts/YYYY-MM-DD-pillar-slug.md`
3. Review drafts, approve, move to `Marketing/LinkedIn/posts/`
4. Copy to LinkedIn, attach generated image

For Pillar 6 posts:
1. Run `/linkedin-resource` — scaffolds the actual deliverable (checklist, one-pager, mini-guide)
2. Deliverable saved to `Marketing/LinkedIn/resources/`
3. Post generated around the resource
4. Offer deliverable via DM to commenters

---

## File Structure

```
Marketing/
└── LinkedIn/
    ├── pillars.md          # Pillar definitions, templates, voice guidelines
    ├── drafts/             # AI-generated, not yet approved
    ├── posts/              # Approved, posted or ready to post
    └── resources/          # Lead magnet deliverables (checklists, guides)
```

---

## Skills to Build

| Skill | Command | What it does |
|-------|---------|--------------|
| LinkedIn Batch | `/linkedin-batch` | Generates 3 post drafts + image prompts, rotates pillars |
| LinkedIn Resource | `/linkedin-resource` | Scaffolds a lead magnet deliverable + generates the Pillar 6 post |

---

## Voice Guidelines
- Professional but approachable
- Short paragraphs, lots of white space
- No AI jargon ("leverage", "utilize", "game-changer")
- ROI-focused — quantify time/effort saved when possible
- Always ends with a question or comment trigger
- Introduces "shadow work" concept naturally across Pillar 1 posts
