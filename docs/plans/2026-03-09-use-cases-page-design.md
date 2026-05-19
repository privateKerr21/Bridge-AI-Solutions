# Use Cases Page — Design Document

**Date:** 2026-03-09

## Goal
Create a standalone `use-cases.html` page showcasing AI automation possibilities across professional services industries, for prospects who don't yet have a specific use case in mind.

## Page Structure

### Hero
- Headline: "What AI automation looks like in practice"
- Subheadline: short explanation that these are illustrative examples across professional services industries
- Muted note: these industries aren't exhaustive — just a starting point

### Industry Tabs
Four tabs: Consulting | Accounting | Marketing Agencies | Recruitment
- Active tab: gold underline indicator
- Click switches visible card grid (JS toggle, no reload)

### Use Case Cards (per tab, 3–4 cards)
Each card contains:
- Bold title
- 2-sentence description
- "~X hrs saved/week" badge in gold

Layout: 2-column grid desktop, 1-column mobile
Style: sharp corners, 2px ink border, hover lift effect (brand system)

### Use Case Content

**Consulting**
- Proposal Drafting (~3 hrs/wk) — Auto-generate first-draft proposals from a template and discovery notes. Cuts prep time and keeps formatting consistent.
- Meeting Summaries (~2 hrs/wk) — Transcribe and summarize client calls into action items automatically. No more manual note-taking after every call.
- Client Research Briefs (~2 hrs/wk) — Pull together company background, news, and talking points before meetings. Shows up prepared without the manual research grind.
- Status Reports (~1.5 hrs/wk) — Auto-compile project updates from your tools into a formatted weekly report. Clients stay informed, you stay focused.

**Accounting**
- Invoice Processing (~4 hrs/wk) — Extract line items from incoming invoices and log them to your system automatically. Reduces manual data entry and entry errors.
- Client Onboarding Docs (~2 hrs/wk) — Generate engagement letters, checklists, and intake forms from a client profile. First impressions are consistent and fast.
- Tax Document Collection (~3 hrs/wk) — Send automated reminders and track document receipt per client. Nothing falls through the cracks at crunch time.
- Recurring Reports (~2 hrs/wk) — Auto-generate monthly or quarterly financial summaries from your data. Reports go out on time without manual assembly.

**Marketing Agencies**
- Content Repurposing (~3 hrs/wk) — Turn a single blog post or video into social copy, email snippets, and ad variations. One asset, five formats, minimal effort.
- Client Reporting (~2 hrs/wk) — Pull campaign metrics and generate formatted client reports automatically. Looks polished without the spreadsheet wrestling.
- Lead Qualification (~2 hrs/wk) — Score and triage inbound leads based on fit criteria before they hit your CRM. Sales team focuses on the right conversations.
- Creative Brief Generation (~1.5 hrs/wk) — Convert intake form answers into a structured creative brief. Briefings are consistent and kickoffs start faster.

**Recruitment**
- Candidate Screening (~4 hrs/wk) — Summarize resumes against job requirements and flag top matches automatically. First-pass review in minutes, not hours.
- Outreach Sequences (~2 hrs/wk) — Draft personalized outreach messages from a candidate profile and role. Higher response rates, less time per message.
- Job Description Writing (~1.5 hrs/wk) — Generate first-draft JDs from a role intake form. Consistent quality without starting from scratch every time.
- Interview Scheduling (~1 hrs/wk) — Automate scheduling coordination between candidates and hiring managers. Eliminates the back-and-forth email chain.

### CTA Band (bottom)
Text: "Don't see your industry? Let's talk."
Reuse existing `.cta-band` component from `index.html`.

### Nav
Add "Use Cases" link to the existing nav on all pages.

## Design System
- All styles from `Assets/Brand/styles.css`
- Sharp corners (`border-radius: 0`)
- 2px ink borders
- Hover lift: `translate(-2px, -2px)` + `box-shadow: 4px 4px 0 var(--ink)`
- Gold badge for time saved
- Space Grotesk headlines, Inter body, Space Mono labels
- Tabs: active state = gold bottom border + ink text; inactive = muted text

## Files to Create/Modify
- Create: `use-cases.html`
- Modify: `index.html` nav — add "Use Cases" link
- Modify: `pricing.html` nav (if exists) — add "Use Cases" link
- Modify: `insights.html` nav (if exists) — add "Use Cases" link
