# LinkedIn Content System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a fully automated LinkedIn content pipeline with two Claude Code skills — `/linkedin-batch` (generates 3 post drafts + image prompts per week) and `/linkedin-resource` (scaffolds lead magnet deliverables + Pillar 6 posts).

**Architecture:** Pillar definitions and voice guidelines live in `Marketing/LinkedIn/pillars.md`. Skills read that file on every invocation so the system stays in sync with any edits. A `rotation.md` file tracks which pillars ran last so Claude rotates fairly. All output is saved as markdown files in `drafts/` or `resources/`.

**Tech Stack:** Claude Code skills (markdown prompt files in `.claude/skills/`), vanilla markdown for all content files, no external APIs or scheduling tools required.

---

### Task 1: Create the Marketing/LinkedIn folder structure

**Files:**
- Create: `Marketing/LinkedIn/pillars.md`
- Create: `Marketing/LinkedIn/rotation.md`
- Create: `Marketing/LinkedIn/resources/.gitkeep`
- `Marketing/LinkedIn/posts/` and `Marketing/LinkedIn/drafts/` already exist

**Step 1: Create `pillars.md`**

```markdown
# LinkedIn Content Pillars — Bridge AI Solutions

## Voice Guidelines
- Professional but approachable — never corporate, never salesy
- Short paragraphs, lots of white space — LinkedIn is skimmed, not read
- No AI jargon: avoid "leverage", "utilize", "game-changer", "cutting-edge"
- Quantify whenever possible — "39 hours a year" beats "a lot of time"
- Every post ends with a question or comment trigger
- Introduce "shadow work" naturally across Pillar 1 posts — don't force it

## Image Style (Nano Banana 2)
All image prompts should use: warm off-whites, deep blacks, gold/amber tones.
Photorealistic editorial style. Minimal, clean composition. No text overlays.
Mood varies by pillar — see pillar-specific notes below.

---

## Pillar 1 — Shadow Work
**Purpose:** Relatable scenes of repetitive tasks that speak directly to the ideal client's daily pain.
**Template:** Scene → Real cost → Name it (shadow work) → Solution hint → CTA question
**Image mood:** Tired-but-focused. Golden hour. Someone at a desk doing something repetitive.
**Example hook:** "It's 5pm on a Friday."
**Avoid:** Being preachy. The post shows the problem — it doesn't lecture about it.

## Pillar 2 — AI Myth-Busting
**Purpose:** Dispel hype and fear. Position Bridge AI as a straight-shooter, not a hype machine.
**Template:** Common belief (stated sympathetically) → Why it's understandable → What's actually true → Practical takeaway → CTA question
**Image mood:** Clean, clarifying. Split light — one side chaotic, one side calm.
**Example hook:** "AI is going to replace your entire team. (You've heard this.)"
**Avoid:** Being condescending about the myth. State it with empathy first.

## Pillar 3 — Tool Spotlight
**Purpose:** Practical AI tool breakdowns for SMBs. Builds credibility and search visibility.
**Template:** Problem it solves → What the tool is (one sentence, no jargon) → How an SMB would actually use it → Time/effort saved → Where to start → CTA question
**Image mood:** Clean, technical but approachable. Laptop or interface closeup. Bright and focused.
**Example hook:** "Most business owners have never heard of [Tool]. They should."
**Avoid:** Making it sound like an ad. Be honest about limitations too.

## Pillar 4 — The Build
**Purpose:** Building Bridge AI Solutions in public. Honest and human. Drives connection over credibility.
**Template:** What I'm working on or figuring out → Honest observation or lesson → Why it matters for small businesses → CTA question
**Image mood:** Personal, warm. Home office or notebook. Candid feel.
**Example hook:** "I've been building Bridge AI Solutions for [X months]. Here's what I didn't expect."
**Avoid:** Humble-bragging. Keep it genuinely honest — including the hard parts.

## Pillar 5 — Client Pain Point
**Purpose:** Specific industry problem → automation approach. Signals expertise to prospects.
**Template:** Industry + specific frustration → Why it keeps happening → What an automation approach looks like → CTA question
**Image mood:** Industry-specific but minimal. Clean and professional.
**Example hook:** "If you run a [industry], you know this problem."
**Avoid:** Being too vague. The more specific the industry and pain point, the better.

## Pillar 6 — Free Resource
**Purpose:** Drive comments, warm leads, and DM conversations. Offer a real, useful deliverable.
**Template:** Specific problem → Tease the solution → What the resource gives them → Comment trigger CTA ([KEYWORD])
**Image mood:** Bold, generous. Something that looks like a real document or tool preview.
**Example hook:** "I built something for this. And I'm giving it away."
**Comment trigger format:** "Comment [KEYWORD] and I'll DM it to you."
**Avoid:** Vague resources. The freebie must be specific enough to feel immediately useful.
```

**Step 2: Create `rotation.md`**

```markdown
# Pillar Rotation Tracker

Last batch: (none yet)
Last pillars used: (none yet)

## History
| Date | Pillars Used |
|------|-------------|
```

**Step 3: Create resources placeholder**

Create an empty file at `Marketing/LinkedIn/resources/.gitkeep` (empty file, just to establish the folder).

**Step 4: Commit**

```bash
git add "Marketing/LinkedIn/pillars.md" "Marketing/LinkedIn/rotation.md" "Marketing/LinkedIn/resources/.gitkeep"
git commit -m "feat: add LinkedIn content system folder structure and pillar definitions"
```

---

### Task 2: Create the `/linkedin-batch` skill

**Files:**
- Create: `.claude/skills/linkedin-batch.md`

**Step 1: Write the skill file**

```markdown
# LinkedIn Batch — Generate Weekly Post Drafts

When this skill is invoked, generate 3 LinkedIn post drafts for Bridge AI Solutions.

## Instructions

1. Read `Marketing/LinkedIn/pillars.md` for pillar definitions, templates, and voice guidelines.
2. Read `Marketing/LinkedIn/rotation.md` to see which pillars were used last.
3. Pick 3 pillars that rotate fairly — avoid repeating pillars used in the last batch. If all have been used recently, prioritize Pillars 1 and 5 (highest client-conversion value).
4. For each pillar, generate:
   - A complete LinkedIn post following that pillar's template and voice guidelines
   - A Nano Banana 2 image prompt following the pillar's image mood and the global image style
5. Save each draft as a markdown file to `Marketing/LinkedIn/drafts/YYYY-MM-DD-pillar-N-slug.md` where N is the pillar number and slug is a 2-3 word description of the post topic.
6. Update `Marketing/LinkedIn/rotation.md` with today's date and the pillars used.
7. Print a summary: list the 3 draft filenames and one-line description of each post.

## Output Format (per draft file)

```
# [Post Title — internal only]
**Pillar**: [Pillar name]
**Date generated**: YYYY-MM-DD
**Status**: Draft

---

[Post text — LinkedIn formatted, short paragraphs, line breaks between sections]

---

**Nano Banana 2 Image Prompt:**
[Image prompt]
```

## Quality Checks Before Saving
- No jargon (leverage, utilize, game-changer, cutting-edge)
- Each post ends with a question or comment trigger
- Short paragraphs — no block of more than 3 lines
- Post is 150-300 words
- Image prompt references brand palette: warm off-whites, deep blacks, gold/amber tones
```

**Step 2: Test the skill**

Run `/linkedin-batch` in Claude Code. Verify:
- 3 files created in `Marketing/LinkedIn/drafts/`
- Each file has post text + image prompt
- `rotation.md` is updated with today's date and pillars used
- No jargon in any post
- Each post ends with a question

**Step 3: Commit**

```bash
git add ".claude/skills/linkedin-batch.md"
git commit -m "feat: add /linkedin-batch skill for weekly post generation"
```

---

### Task 3: Create the `/linkedin-resource` skill

**Files:**
- Create: `.claude/skills/linkedin-resource.md`

**Step 1: Write the skill file**

```markdown
# LinkedIn Resource — Scaffold a Lead Magnet + Pillar 6 Post

When this skill is invoked, do the following in order:

## Phase 1: Generate Resource Ideas

Suggest 3 lead magnet ideas relevant to Bridge AI Solutions' audience (SMB owners dealing with shadow work and repetitive tasks). Each idea should be:
- Specific enough to be immediately useful
- Deliverable as a 1-2 page markdown document
- Tied to a real pain point from the content pillars

Format each idea as:
- **Title**: [Resource name]
- **Format**: [Checklist / One-pager / Mini-guide / Template]
- **Pain point it solves**: [One sentence]
- **Comment trigger keyword**: [ALLCAPS single word]

Ask the user which idea they want to build, or if they have their own idea.

## Phase 2: Scaffold the Deliverable

Once an idea is chosen, create the full resource as a markdown file at:
`Marketing/LinkedIn/resources/YYYY-MM-DD-[slug].md`

The resource should be genuinely useful — not a teaser or a vague overview.
Include real, actionable steps, examples, or templates.
Format clearly with headers, bullets, and a brief intro.

Add a footer to the resource:
```
---
Built by Bridge AI Solutions — helping small businesses eliminate shadow work.
[Link to website]
```

## Phase 3: Generate the Pillar 6 Post

Using the resource just created, generate a Pillar 6 post following this template:
- Specific problem the resource solves
- Tease what's inside (1-2 bullet points of the most valuable items)
- Comment trigger CTA: "Comment [KEYWORD] and I'll DM it to you."

Save the post draft to `Marketing/LinkedIn/drafts/YYYY-MM-DD-pillar-6-[slug].md`
Update `Marketing/LinkedIn/rotation.md` to log this Pillar 6 post.

Also generate a Nano Banana 2 image prompt: bold and generous in mood, looks like a real document or tool preview. Brand palette applies.

## Quality Checks
- Resource must be genuinely useful, not vague
- Post must name the specific problem, not just say "free resource"
- Comment keyword must be memorable and relevant (e.g. SHADOW, AUDIT, TOOLKIT)
```

**Step 2: Test the skill**

Run `/linkedin-resource` in Claude Code. Verify:
- 3 resource ideas are presented
- After selecting one, a full resource file is created in `Marketing/LinkedIn/resources/`
- A Pillar 6 draft post is created in `Marketing/LinkedIn/drafts/`
- `rotation.md` is updated
- Resource is genuinely useful (not a teaser)
- Post ends with a comment trigger CTA

**Step 3: Commit**

```bash
git add ".claude/skills/linkedin-resource.md"
git commit -m "feat: add /linkedin-resource skill for lead magnet scaffolding"
```

---

### Task 4: Final verification and push

**Step 1: Verify full file structure**

Confirm the following exist:
```
Marketing/LinkedIn/
├── pillars.md
├── rotation.md
├── drafts/          (contains test batch from Task 2)
├── posts/           (contains 2026-03-09-shadow-work-data-entry.md)
└── resources/       (contains test resource from Task 3)

.claude/skills/
├── linkedin-batch.md
└── linkedin-resource.md
```

**Step 2: Push to GitHub**

```bash
git push origin main
```

**Step 3: Done**

Both skills are live. Weekly workflow:
1. `/linkedin-batch` — generates 3 posts every week
2. `/linkedin-resource` — run whenever you want to create a lead magnet
3. Review drafts in `Marketing/LinkedIn/drafts/`, approve by moving to `posts/`
