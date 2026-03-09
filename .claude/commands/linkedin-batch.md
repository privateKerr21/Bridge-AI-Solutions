# Skill: /linkedin-batch

Generate a batch of 3 LinkedIn post drafts for Bridge AI Solutions, rotating across content pillars fairly, with matching Nano Banana 2 image prompts. Save each draft as a markdown file and update the rotation log.

---

## Steps

### 1. Read source files

Read both of these files in full before doing anything else:

- `Marketing/LinkedIn/pillars.md` — pillar definitions, post templates, voice guidelines, and image style
- `Marketing/LinkedIn/rotation.md` — rotation history table, "Last batch" date, and "Last pillars used" fields

### 2. Select 3 pillars

Review which pillars were used in the most recent batch (from `rotation.md`).

Selection rules:
- Do NOT repeat any pillar used in the immediately preceding batch if avoidable.
- If all 5 pillars have been used recently and you must repeat, prioritize **Pillar 1** (Client Results / Social Proof) and **Pillar 5** (Call to Action / Offer) — they have the highest client-conversion value.
- Aim for variety: spread across educational, social proof, and engagement pillars when possible.
- Pick exactly 3 pillars.

Document your pillar choices before writing any posts.

### 3. Generate each post

For each of the 3 chosen pillars, write one LinkedIn post and one image prompt.

**Post requirements:**
- Follow the pillar's template and voice guidelines from `pillars.md` exactly
- Length: 150–300 words (count carefully)
- Format: short paragraphs, blank line between each paragraph or section
- End with a question or a comment trigger (e.g., "What's been your experience with this?")
- Voice: direct, warm, confident, plain-spoken — write like a trusted advisor, not a marketer
- Zero jargon. The following words are banned: leverage, utilize, game-changer, cutting-edge, synergy, robust, seamlessly, holistic, revolutionary, transformative

**Image prompt requirements:**
- Write a Nano Banana 2 image prompt that matches the pillar's image mood (from `pillars.md`)
- Always reference the global brand palette: warm off-whites, deep blacks, gold/amber tones
- Keep it visual and concrete — describe scene, lighting, and mood
- Do not reference logos, text overlays, or people's faces

### 4. Quality check every post before saving

Run through this checklist for each post. Fix any issues before proceeding to save:

- [ ] No banned jargon words present
- [ ] Post ends with a question or comment trigger
- [ ] No paragraph exceeds 3 lines
- [ ] Word count is between 150 and 300
- [ ] Image prompt references warm off-whites, deep blacks, or gold/amber tones

### 5. Save draft files

Determine today's date in `YYYY-MM-DD` format.

For each post, create a file at:
```
Marketing/LinkedIn/drafts/YYYY-MM-DD-pillar-N-slug.md
```

Where:
- `YYYY-MM-DD` is today's date
- `N` is the pillar number (1–5)
- `slug` is a 2–3 word kebab-case description of the specific post topic (e.g., `saved-client-hours`, `ai-fear-reframe`, `ask-us-anything`)

Each file must use exactly this format:

```
# [Post Title — internal only]
**Pillar**: [Pillar name]
**Date generated**: YYYY-MM-DD
**Status**: Draft

---

[Post text — LinkedIn formatted, with blank lines between paragraphs]

---

**Nano Banana 2 Image Prompt:**
[Image prompt]
```

Create the `Marketing/LinkedIn/drafts/` directory if it does not already exist.

### 6. Update rotation.md

Edit `Marketing/LinkedIn/rotation.md` to:
- Set the "Last batch" field to today's date
- Set the "Last pillars used" field to the 3 pillar numbers used today (e.g., `2, 3, 5`)
- Add a new row to the history table with: today's date, the 3 pillar numbers, and a one-line note on the topics covered

### 7. Print summary

After all files are saved and `rotation.md` is updated, print a summary in this format:

```
LinkedIn batch complete — 3 drafts generated

1. Marketing/LinkedIn/drafts/YYYY-MM-DD-pillar-N-slug.md
   [One-line description of what the post is about]

2. Marketing/LinkedIn/drafts/YYYY-MM-DD-pillar-N-slug.md
   [One-line description of what the post is about]

3. Marketing/LinkedIn/drafts/YYYY-MM-DD-pillar-N-slug.md
   [One-line description of what the post is about]

rotation.md updated. Next batch should avoid pillars: [list the 3 used today]
```

---

## Notes

- Never publish directly. These are drafts for review only.
- If `pillars.md` or `rotation.md` is missing, stop and tell the user which file is missing and what content it should contain before continuing.
- If the drafts directory does not exist, create it silently without asking.
- Do not create any other files or modify any files other than the 3 draft files and `rotation.md`.
