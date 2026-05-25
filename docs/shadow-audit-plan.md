# Shadow Work Audit — Tripwire Funnel for Bagel Bots Campaign

---

## ⏸ CURRENT STATUS (as of 2026-05-18, paused)

**Branch:** `feat/shadow-audit` (pushed to origin)
**Last commit:** `3b5f5de feat: shadow audit tripwire funnel — infrastructure, audit form, PDF generation`

### Code progress

| Day | Status | What landed |
|---|---|---|
| Day 1: Infrastructure | ✅ Done | npm deps installed; `lib/stripe.ts`, `lib/resend.ts`, `lib/anthropic.ts`, `lib/supabase/{admin,server,client}.ts`, `lib/types.ts`; `/api/checkout` + `/api/webhooks/stripe`; Supabase migration |
| Day 2: Audit form | ✅ Done | `AuditQuiz.tsx` (10-step ATLAS form); `/api/audit/submit` route; `/shadow-audit/thank-you/[session_id]` page (Stripe-gated); `/dashboard/audit/[id]` report viewer; `(squeeze)` route group; audit + squeeze CSS |
| Day 3: PDF generation | ✅ Done | `lib/pdf.tsx` React-PDF renderer; wired into audit submit; Supabase Storage upload + signed URLs; PDF download link on report viewer |
| Day 4: Squeeze pages | ⏳ Pending | Variant A ($9.95) and Variant B ($97) marketing pages with full PULL copy |
| Day 5: Email + nurture | ⏳ Pending | Resend templates + Vercel Cron for Day 1/5/14 follow-up emails |
| Day 6: $97 Calendly flow | ⏳ Pending | Booking flow + 24-hr reminder + confirmation email |
| Day 7: Cron + UTM + e2e | ⏳ Pending | Stripe abandoned-checkout cron; UTM tracking; full e2e test |
| Day 7-8: Admin dashboard | ⏳ Pending | `/admin` route + Supabase Auth + leads/purchases/audits table |

**TypeScript compiles cleanly across all committed code.**

### External setup status (NOT done yet)

The walkthrough is in `bridge-site/SHADOW-AUDIT-SETUP.md`. Order:

1. ⏳ **Supabase**: create new "bridge-ai" project, run migration in SQL editor, copy URL + anon key + service_role key
2. ⏳ **Stripe**: create $9.95 and $97 products, copy `price_...` IDs, set up webhook endpoint on production URL
3. ⏳ **Resend**: verify `aibridgesolutions.com` domain (add SPF/DKIM/DMARC records), copy API key
4. ⏳ **Anthropic**: confirm API key (user has one — just needs to copy)
5. ⏳ **Vercel env vars**: paste all keys into Preview environment for `feat/shadow-audit` branch

### Resume next session

1. Read this file
2. Read `bridge-site/SHADOW-AUDIT-SETUP.md` for env setup
3. Continue from the next pending day OR finish external setup if not done
4. The user is on `feat/shadow-audit` branch — preview deploys land there

### Key decisions locked in

- **Product**: Shadow Work Audit → Roadmap (one product, two tiers)
- **Tiers**: $9.95 self-serve, $97 + 30-min call within 5 business days
- **No refunds** (revisit at $97 if friction)
- **No email gate** — use Stripe abandonment data via cron
- **A/B test**: segment-split (confirm with Bagel Bots), tripwire revenue per send as primary metric
- **Storage**: New Supabase project for Bridge AI (separate from Surety)
- **Auth**: Supabase Auth with email allowlist for `/admin`
- **Three example projects on squeeze page**: sales follow-up, client reporting, quote/proposal generation
- **Urgency framing**: half-built systems narrative (aligns with Variant E ad)
- **Audit engine**: ATLAS-derived (Friction/Goal/Void per workflow × 2), Claude Haiku 4.5 as default model
- **Build location**: `bridge-site/app/(squeeze)/` route group, noindex'd

---

## Context

Bridge AI Solutions is running its first paid acquisition campaign — a 3-send sponsorship in the Bagel Bots newsletter (10k+ subscribers, founders/operators) for $375 total. The campaign uses Variant E ("This is the exception") which directs cold traffic to a squeeze page.

The squeeze page sells a **Shadow Work Audit** — a low-friction tripwire product that captures buyers into the pipeline. Two tiers:
- **$9.95 self-serve**: instant auto-generated PDF report
- **$97 done-with-you**: same report + 30-min call with Hayden within 5 days

Goal: convert cold newsletter traffic into a list of *paying buyers* (not just emails), then nurture those buyers into Focused Build ($2,500) or Signature Build ($6,000) engagements downstream.

The audit applies the **PULL methodology** (Rob Snyder's framework, documented at `Marketing/pull-playbook.html`) and uses the **ATLAS prompt framework** (at `Templates/atlas prompt.txt`) as the engine for generating personalized reports.

A/B test: two squeeze page variants run simultaneously, split across two 5k segments of the Bagel Bots list (pending segment-split confirmation with Bagel Bots). Variant A offers only $9.95. Variant B offers only $97. Decision metric: total tripwire revenue per send.

---

## The Product

### Shadow Work Audit → Roadmap

A 10-12 question diagnostic that:
1. Identifies the buyer's role and 2 highest-priority workflows
2. Captures ATLAS triad per workflow: **Friction** (manual process, time sink), **Strategic Goal** (what they're actually trying to accomplish), **The Void** (what they aren't doing but want to)
3. Generates a personalized **Strategic Roadmap** PDF with:
   - Diagnosis: where Shadow Work is concentrated, estimated hours/week reclaimable
   - Opportunity Matrix: per-workflow recommendation (Problem/Goal, Proposed AI Solution, Action Category, Impact)
   - Next Steps: a single recommended first build with rough scope

### Tiers

| Tier | Price | Deliverable | Fulfillment |
|---|---|---|---|
| Self-Serve | $9.95 | Auto-generated PDF Strategic Roadmap, emailed within 5 minutes of purchase | Fully automated |
| Done-With-You | $97 | Same PDF + 30-min call with Hayden within 5 business days + pre-call refinement form | PDF auto-sent; Calendly booking link emailed; manual call delivery |

**Refund policy:** No refunds, all sales final (revisit at $97 if friction emerges).

---

## PULL Framework Applied to the Squeeze Page

Per Snyder's Part 14 ("Nobody Wants AI"): the buyer is not buying an AI audit. They're trying to complete a project on their to-do list. Every page section must serve their PULL.

### The Locked PULL Hypothesis

> **Project**: Founder/operator is trying to automate a repetitive workflow in their business (most likely sales follow-up, client reporting, or quote/proposal generation).
>
> **Urgency**: Half-built systems they keep meaning to finish. Stalled Zaps. Prompts buried in docs. "I'll do it this weekend" that never happens.
>
> **List**: DIY (Zapier, Make, ChatGPT, n8n), tutorials, contractors who half-shipped.
>
> **Limits**: Tools don't integrate cleanly. Edge cases break things. They can't tell which automation matters most. They lack time to maintain what they build.
>
> **Therefore**: Someone in this state would be **weird NOT to buy** a $9.95 diagnostic that names the one automation worth building right now + the roadmap to ship it.

### Page Structure (Snyder's Part 10 — four-part product description)

1. **PULL Setup** (headline + subhead): name the project and the limitation
2. **Name + Category**: "The Shadow Work Audit — the diagnostic that finds your highest-leverage automation"
3. **How it removes the block**: 10 questions → personalized roadmap → ship the first build
4. **Unique mechanism**: same PULL methodology applied in $2,500 client builds, compressed into an audit

### What the page cannot do (Snyder's Part 11 rules)

- No feature lists
- No "AI-powered" hero copy
- No ROI promises ("save 10 hours/week")
- No "we help businesses like yours"
- No navigation links that compete with the CTA

---

## The Audit Engine (ATLAS-derived)

Adapted from `Templates/atlas prompt.txt`. The original ATLAS is a conversational interview agent; we adapt to a form-based collection + AI report generation pipeline.

### Question Structure (~10 questions total)

**Step 1 — Setup (2 questions)**
1. Your role + business in one line (e.g., "Founder of a 12-person marketing agency")
2. Approximate team size and revenue stage (dropdown: solo, 2-10, 11-50, 51+)

**Step 2 — Workflow Selection (1 question)**
3. Pick the 2 areas eating the most of your week. Options:
   - Sales follow-up & lead qualification
   - Client/customer reporting
   - Quote & proposal generation
   - Client onboarding
   - Internal operational reporting
   - Finance / AR / invoicing
   - Other (specify)

**Step 3 — Per Workflow × 2: ATLAS triad (6 questions, 3 each)**
For each selected workflow:
- Friction: "What does this workflow look like manually today? Roughly how many hours/week does it eat?"
- Goal: "What is this workflow actually meant to accomplish? (Be specific — 'generate leads,' 'maintain compliance,' 'keep clients informed,' etc.)"
- Void: "What aren't you doing here that you wish you were? (What would you do if this took 1/10th the time?)"

**Step 4 — Calibration (1 question)**
10. What's stopped you from automating this so far? (Free text — captures their `Limits`)

### Report Generation (Hybrid AI + Template)

**Backend logic:**
1. Form submission triggers a server-side function
2. Function calls Claude API (Sonnet 4.6 or Haiku — start with Haiku for cost, escalate if quality insufficient)
3. Prompt = ATLAS Phase 2 instructions + user's form responses
4. AI generates the "Strategic Roadmap" structured output (JSON: diagnosis, per-workflow opportunity matrix, next-step recommendation)
5. Server-side template renders the JSON into a branded PDF (puppeteer or react-pdf)
6. Resend delivers the PDF as an email attachment + a permalink to view it on the bridge-site dashboard

**API cost at scale**: ~$0.05-$0.20 per audit on Sonnet 4.6, $0.01-$0.03 on Haiku 4.5. At 100 buyers, total cost is $1-$20 — negligible.

**Quality floor**: hand-designed template structure ensures the report never looks AI-slop. AI only fills the narrative sections, not the architecture.

---

## The Squeeze Page

### Architecture

**Location**: `bridge-site/app/(squeeze)/shadow-audit/`

**Route group** (`(squeeze)`) has its own `layout.tsx` that omits `<Nav>` and `<Footer>`. This keeps the visitor focused on one CTA. The layout still uses brand tokens from `app/globals.css` for visual consistency.

**Routes:**
- `/shadow-audit-9` — Variant A (offers $9.95 only)
- `/shadow-audit-97` — Variant B (offers $97 only)
- `/shadow-audit/quiz` — the audit form itself (post-purchase, gated by Stripe session)
- `/shadow-audit/thank-you/[session_id]` — post-purchase landing, shows audit form
- `/dashboard/audit/[id]` — hosted report view (reuses existing empty `app/dashboard/page.tsx`)

Both squeeze routes noindex'd via metadata + `robots.ts` update.

### Page Sections (both variants — same structure, different price)

1. **Hero**
   - Headline (PULL setup): "When you're trying to automate the manual work eating your week, your existing tools stall, your prompts break, and you can't tell which automation actually matters first."
   - Sub: Name + category sentence
   - CTA button: "Take the Audit — $9.95" (or $97)

2. **The Three Examples** (concrete projects, not products)
   - "Following up on leads that go cold because nobody has the bandwidth"
   - "Pulling together client reports and updates that eat your week"
   - "Generating quotes and proposals from scratch every single time"
   - Bridge text: "Your version of this is probably specific. The audit finds which one to start with."

4. **How it works**
   - 10 questions, 5-7 minutes
   - Get your personalized Strategic Roadmap PDF (delivered in 5 min)
   - Know exactly which automation is worth building first
   - $97 only: 30-min call with Hayden within 5 business days

4. **Mechanism / Authority**
   - "This is the same PULL methodology Bridge AI applies on $2,500 client builds — compressed into 10 questions."
   - Reference Surety (suretybuild.com) as proof of execution capability

5. **What you actually get** (the report sections, briefly)
   - Diagnosis: where Shadow Work is concentrated + hours/week reclaimable
   - Opportunity Matrix per workflow
   - Next Step: the one build worth shipping first
   - $97 only: a 30-min walkthrough call

6. **CTA repeat + micro-trust**
   - Final CTA button
   - "All sales final. Report delivered within 5 minutes."

### Visual Treatment

- Use existing brand tokens from `bridge-site/app/globals.css`: `--paper`, `--ink-warm`, `--gilt`, `--cta`
- Type stack already loaded: Fraunces (display), Inter (body), Space Mono (mono)
- One column, max-width ~720px for reading
- Single CTA color (terracotta `--cta`)
- No navigation, no footer beyond a thin micro-footer with copyright + "by Bridge AI Solutions"

---

## The Funnel (Post-Purchase)

### $9.95 path

1. Buyer clicks CTA → Stripe Checkout → pays
2. Stripe webhook fires → server logs purchase, creates audit session record
3. Buyer redirected to `/shadow-audit/thank-you/[session_id]` → renders audit form
4. Buyer completes 10 questions → form submission triggers AI generation
5. AI generates report (10-30 seconds) → PDF rendered → uploaded to storage
6. Resend sends email: PDF attached + dashboard permalink
7. Day 1 follow-up email: "Did the audit surface what you expected?"
8. Day 5 follow-up email: "Most people who buy this end up with one specific question. What's yours?"
9. Day 14 follow-up email: soft introduction to Focused Build with link to discovery call

### $97 path

Identical to $9.95 path through step 6. Then:

7. Immediately after audit completion: page shows "Book your call within 5 days" → Calendly embed (or redirect with prefilled fields)
8. Calendly booking confirmation triggers Resend email: "Confirmed for [date]. Bring questions about your roadmap."
9. 24-hour reminder via Resend
10. Post-call: Hayden manually sends Focused Build proposal if appropriate (use existing proposal template + sales process)

### Pipeline tracking

Every buyer logged with:
- Stripe session ID
- Variant served (A or B)
- Tier purchased ($9.95 or $97)
- Audit responses (for downstream pattern analysis)
- Source: `utm_source=bagelbots&utm_campaign=launch&utm_content=variant-{a|b}`

---

## The A/B Test

### Mechanics

**Preferred**: segment-split — Bagel Bots sends Variant A creative (linking to `/shadow-audit-9`) to first 5k subscribers and Variant B creative (linking to `/shadow-audit-97`) to second 5k subscribers on the same day. Same time, same creative copy (Variant E ad), only the price + landing URL differs.

**Fallback**: temporal split — send 1 = Variant A to full list, send 2 = Variant B to full list, 7-14 days apart. Adds noise from time-of-week and external variables but workable.

**Hayden's action item**: confirm segment-split capability with Bagel Bots before campaign launch.

### Decision Metric

**Primary**: Total tripwire revenue per 5k impressions.
- Variant A revenue = (# buyers at $9.95) × $9.95
- Variant B revenue = (# buyers at $97) × $97
- Winner = higher dollar total per segment

**Secondary (tracked but not deciding)**:
- Click-through rate from ad to squeeze page
- Conversion rate on squeeze page
- Audit completion rate (post-purchase)
- Focused Build conversations sourced within 90 days, per variant

### Sample size / significance

With ~5k impressions per variant, expected ad CTR ~1-3% = 50-150 clicks per variant. At a 5-10% squeeze conversion, expect 3-15 buyers per variant. This is too small for statistical confidence on tripwire revenue alone — treat the result as directional, not definitive. Use the 3rd Bagel Bots send to validate the winner.

---

## Technical Build

### New dependencies (bridge-site)

- `stripe` (server SDK) + `@stripe/stripe-js` (client) — checkout + webhooks
- `resend` — transactional email
- `@react-pdf/renderer` OR `puppeteer` — PDF generation (lean toward `@react-pdf/renderer` for serverless compatibility on Vercel)
- `@anthropic-ai/sdk` — Claude API calls

### New environment variables

```
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
RESEND_API_KEY=
ANTHROPIC_API_KEY=
```

Store in Vercel env vars, not committed.

### New routes / files

**Squeeze pages**
- `bridge-site/app/(squeeze)/layout.tsx` — no Nav, no Footer
- `bridge-site/app/(squeeze)/shadow-audit-9/page.tsx`
- `bridge-site/app/(squeeze)/shadow-audit-97/page.tsx`
- `bridge-site/app/(squeeze)/shadow-audit/page.module.css` — shared styles

**Audit flow**
- `bridge-site/app/(squeeze)/shadow-audit/thank-you/[session_id]/page.tsx`
- `bridge-site/components/AuditQuiz.tsx` — fork of existing `components/Quiz.tsx` adapted to ATLAS triad questions

**API routes**
- `bridge-site/app/api/checkout/route.ts` — create Stripe checkout session
- `bridge-site/app/api/webhooks/stripe/route.ts` — handle `checkout.session.completed`
- `bridge-site/app/api/audit/submit/route.ts` — accept audit form, call Claude, generate PDF, queue email
- `bridge-site/app/api/audit/[id]/route.ts` — return audit data for dashboard view

**Server libs**
- `bridge-site/lib/stripe.ts` — Stripe client + product/price helpers
- `bridge-site/lib/resend.ts` — email sender + template helpers
- `bridge-site/lib/anthropic.ts` — Claude client + ATLAS prompt builder
- `bridge-site/lib/audit-storage.ts` — persist audit responses + generated reports (Vercel Blob or Supabase)
- `bridge-site/lib/pdf.ts` — render report JSON to PDF

**Dashboard**
- `bridge-site/app/dashboard/audit/[id]/page.tsx` — hosted report view (alternative to PDF)

**Email templates**
- `bridge-site/emails/PurchaseReceipt.tsx`
- `bridge-site/emails/AuditReport.tsx`
- `bridge-site/emails/CallBookingConfirm.tsx`
- `bridge-site/emails/CallReminder24h.tsx`
- `bridge-site/emails/NurtureDay1.tsx`
- `bridge-site/emails/NurtureDay5.tsx`
- `bridge-site/emails/NurtureDay14.tsx`

### Persistence layer

For v1, the audit data + generated reports need storage. Options:
- **Vercel Blob** (simplest, fits Next.js stack) — recommended for v1
- **Supabase** (already in Surety's stack, available pattern) — better if we want SQL queries on responses later

Recommend **Vercel Blob for PDFs + a simple Postgres-like store for audit metadata**. Surety already runs Supabase so consider using that for audit metadata if cross-product learning is wanted later. Keep v1 minimal: Vercel Blob for files + JSON records in Supabase.

### Robots / SEO

Update `bridge-site/app/robots.ts` to disallow `/shadow-audit-9`, `/shadow-audit-97`, `/shadow-audit/`. Add `noindex` metadata to each squeeze page directly.

---

## Build Phasing (1.5 weeks realistic)

**Day 1: Infrastructure**
- Install Stripe, Resend, Anthropic SDK, React PDF renderer
- Wire up environment variables
- Build `/api/checkout` route + Stripe products ($9.95, $97)
- Build `/api/webhooks/stripe` webhook handler
- Test purchase end-to-end with Stripe test mode

**Day 2: Audit form + persistence**
- Fork `Quiz.tsx` → `AuditQuiz.tsx`
- Build all 10 question screens with ATLAS triad logic
- Wire form submission → API route → audit storage
- Test data flow

**Day 3: AI generation + PDF**
- Build Claude API integration with ATLAS prompt
- Define output JSON schema (diagnosis, opportunity matrix, next steps)
- Build PDF template using `@react-pdf/renderer`
- Generate test reports from sample inputs
- Verify quality

**Day 4: Squeeze pages**
- Build `(squeeze)/layout.tsx` (no nav/footer)
- Build Variant A and Variant B pages with all sections
- Wire CTAs to Stripe checkout
- Mobile-test thoroughly

**Day 5: Email + nurture**
- Build all email templates (receipt, audit delivery, call confirm, reminders, nurture)
- Wire Resend integration into webhook + audit-submit handlers
- Build follow-up email scheduler (use Vercel Cron or a queue)
- Test full email flow

**Day 6: $97 call flow**
- Build Calendly integration (embed or pre-filled redirect)
- Wire booking confirmation email
- 24-hour reminder cron job

**Day 7: Dashboard view + polish**
- Repurpose `app/dashboard/page.tsx` for audit report view
- Update `robots.ts`
- Add UTM tracking + analytics on squeeze pages
- End-to-end test both variants
- Deploy to production

**Buffer (Days 8-10)**: copy iteration, mobile polish, edge cases, refunds workflow if needed.

---

## Verification

### Pre-launch checklist

- [ ] Both variants load correctly on mobile + desktop
- [ ] Stripe checkout charges the right amount per variant (test mode + 1 real $9.95 charge as smoke test)
- [ ] Webhook handler creates audit session correctly
- [ ] Audit form submits all 10 questions successfully
- [ ] Claude API generates valid JSON matching the report schema
- [ ] PDF renders cleanly with brand styling
- [ ] PDF email lands in Gmail and Outlook inboxes (no spam folder)
- [ ] $97 buyer sees Calendly booking link
- [ ] Booking confirmation email fires
- [ ] Dashboard permalink renders report correctly
- [ ] UTM tracking present on both squeeze URLs
- [ ] Both squeeze pages have noindex metadata
- [ ] `robots.ts` updated
- [ ] All email templates pass spam-score check (mail-tester.com)
- [ ] Stripe webhook signing verification active in production

### Post-launch monitoring

- Day-of-send: monitor Stripe dashboard for purchase events
- Day-of-send: monitor email deliverability (Resend dashboard)
- Day +1: review audit completion rate (purchases vs. completed audits)
- Day +7: tripwire revenue tally per variant
- Day +30: nurture email engagement rates
- Day +90: Focused Build conversations attributed to each variant

---

## Critical Files (Existing — to reference, not duplicate)

- `Marketing/pull-playbook.html` — PULL methodology reference
- `Templates/atlas prompt.txt` — audit engine prompt framework
- `Admin/Sales/Sales-Process.md` — downstream pipeline once buyers convert
- `bridge-site/app/globals.css` — brand tokens
- `bridge-site/components/Quiz.tsx` — existing multi-step pattern to fork
- `bridge-site/app/(marketing)/work/page.tsx` — Surety case study reference for proof links
- `bridge-site/app/dashboard/page.tsx` — empty page to repurpose for audit reports
- `bridge-site/app/robots.ts` — update to noindex squeeze routes

---

## Open Items (User to confirm before/during build)

1. **Bagel Bots segment-split capability** — Hayden to confirm whether 5k/5k same-day split is available. If not, plan switches to temporal split.
2. **Image creative for ad** — Bagel Bots noted ads/dedicated sends perform best with images. Need to design or source.
3. **$97 refund stance if friction emerges** — current policy "no refunds." If $97 buyers push back hard, add "full refund if call doesn't happen" guarantee.
4. **Supabase vs. Vercel KV for audit metadata** — defer to build day; both viable.
5. **Haiku vs. Sonnet for report generation** — start with Haiku for cost; upgrade to Sonnet if reports feel templated.
6. **Calendly embed vs. redirect** — defer to build day based on UX testing.

---

## Why This Plan

This is a tightly-scoped tripwire funnel that doubles as a paid acquisition channel AND a sales discovery engine. Every buyer fills out a personal PULL profile via the audit, which gives Hayden a pre-qualified pipeline of warm prospects to convert into Focused Build engagements. The A/B test answers a strategic question — does this audience prefer self-serve or human-assisted? — that informs every future paid campaign. The build sits inside bridge-site so Stripe, Resend, and the audit engine become reusable infrastructure for future products. ATLAS-derived audit logic ties directly to Bridge's existing methodology, so the product feels native rather than bolted-on.
