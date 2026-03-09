# /linkedin-resource — Lead Magnet + Pillar 6 Post Generator

This skill scaffolds a lead magnet deliverable for Bridge AI Solutions and generates a Pillar 6 LinkedIn post around it.

Bridge AI Solutions is a boutique AI automation consultancy targeting SMB owners who are drowning in shadow work — the invisible admin, repetitive tasks, and manual busywork that quietly consume hours each week.

---

## Phase 1: Generate Resource Ideas

Suggest **3 lead magnet ideas** suited to Bridge AI Solutions' audience. Each idea must:
- Address a specific pain point SMB owners face around shadow work or repetitive tasks
- Be deliverable as a 1–2 page markdown document
- Be immediately actionable — not a teaser or vague overview

Format each idea exactly as:

**Title**: [Resource name]
**Format**: [Checklist / One-pager / Mini-guide / Template]
**Pain point it solves**: [One sentence describing the specific problem]
**Comment trigger keyword**: [ALLCAPS single word — memorable and relevant, e.g. SHADOW, AUDIT, TOOLKIT]

After presenting all 3 ideas, ask:

> "Which of these would you like to build? Or do you have your own idea you'd like to develop instead?"

Wait for the user's response before proceeding to Phase 2.

---

## Phase 2: Scaffold the Deliverable

Once the user selects or provides an idea:

1. Determine today's date in `YYYY-MM-DD` format and create a URL-friendly slug from the resource title (lowercase, hyphens, no special characters).

2. Create the full resource as a markdown file at:
   ```
   Marketing/LinkedIn/resources/YYYY-MM-DD-[slug].md
   ```
   Use the full absolute path: `C:\Users\kerrk\OneDrive\Documents\Bridge AI Solutions\Marketing\LinkedIn\resources\YYYY-MM-DD-[slug].md`

3. The resource must be **genuinely useful** — include real actionable steps, specific examples, or fill-in templates. No vague overviews or teasers. Structure it with:
   - A brief intro (2–3 sentences explaining the problem and what this resource does)
   - Clear headers and bullets
   - Specific, concrete steps or items an SMB owner can act on immediately
   - Where appropriate: examples, prompts, or fill-in-the-blank templates

4. End every resource with this exact footer:
   ```
   ---
   Built by Bridge AI Solutions — helping small businesses eliminate shadow work.
   https://bridgeaisolutions.com
   ```

After creating the file, confirm the path to the user and proceed to Phase 3.

---

## Phase 3: Generate the Pillar 6 Post

Using the resource just created, generate a Pillar 6 LinkedIn post:

**Post requirements:**
- Open by naming the **specific problem** the resource solves (not a generic "free resource" hook)
- Tease 1–2 of the most valuable items inside — make it concrete enough that readers feel the value before they even download it
- Close with a comment trigger CTA: `"Comment [KEYWORD] and I'll DM it to you."`
- Tone: direct, useful, zero fluff — matches Bridge AI Solutions' voice (plain-spoken, expert, not salesy)

**Save the post draft to:**
```
Marketing/LinkedIn/drafts/YYYY-MM-DD-pillar-6-[slug].md
```
Use the full absolute path: `C:\Users\kerrk\OneDrive\Documents\Bridge AI Solutions\Marketing\LinkedIn\drafts\YYYY-MM-DD-pillar-6-[slug].md`

**Draft file format** (use exactly this structure):
```
# [Post Title — internal only]
**Pillar**: 6 — Free Resource
**Date generated**: YYYY-MM-DD
**Status**: Draft
**Resource file**: Marketing/LinkedIn/resources/YYYY-MM-DD-[slug].md
**Comment keyword**: [KEYWORD]

---

[Post text]

---

**Nano Banana 2 Image Prompt:**
[Image prompt]
```

**Update the rotation log:**

Append a new entry to `Marketing/LinkedIn/rotation.md` logging this Pillar 6 post. If the file does not exist, create it. The entry format:
```
| YYYY-MM-DD | 6 — Free Resource | [Post title] | [KEYWORD] | Draft |
```

**Generate a Nano Banana 2 image prompt** for the post visual:
- Mood: bold and generous — this should feel like a real, valuable document or tool preview
- Visual style: looks like a screenshot or preview of an actual document, checklist, or template
- Brand palette: warm off-whites, deep blacks, gold/amber accent tones
- No people, no stock-photo scenes — just the artifact itself, presented with confidence
- Include the Bridge AI Solutions name subtly in the visual

---

## Quality Checks

Before finishing, verify:
- [ ] Resource is genuinely useful — contains specific steps, not vague promises
- [ ] Post names the specific problem (not just "free resource")
- [ ] Comment keyword is memorable, relevant, and ALLCAPS
- [ ] Draft file is correctly formatted with all fields filled
- [ ] rotation.md has been updated
- [ ] Image prompt fits Nano Banana 2 style (bold, document-preview aesthetic, brand palette)
