# Shadow Audit — Environment Setup

Internal setup guide for the Shadow Audit tripwire funnel. Reference: `C:\Users\kerrk\.claude\plans\continue-and-let-s-build-agile-mitten.md`.

---

## ⏸ Current Status (2026-05-19, paused)

**Branch**: `feat/shadow-audit` (pushed to origin, not merged to main)
**PR**: #9 (DRAFT) — title/body still references old $9.95/$97 pricing; needs an update or merge

**Pricing pivot (2026-05-19):** A/B test moved from $9.95 vs $97 → **Free vs $1**. Free tier skips Stripe entirely (email capture → token-gated audit form). Paid tier ($1) still uses Stripe.

| Day | Status |
|---|---|
| Day 1: Infrastructure | ✅ Code shipped |
| Day 2: Audit form | ✅ Code shipped |
| Day 3: PDF generation | ✅ Code shipped |
| Day 4: Squeeze pages | ✅ Code shipped (Bagel Bots restyle + roadmap image + Free/$1 routes) |
| Day 5: Email + nurture | ⏳ Not started |
| Day 6: $1 Calendly flow | ⏳ Not started |
| Day 7: Cron + UTM + e2e | ⏳ Not started |
| Day 7-8: Admin dashboard | ⏳ Not started |

**External setup status**:
- ⏳ Stripe: NEW $1 product needed (`STRIPE_PRICE_AUDIT_PAID`). Old $9.95/$97 products can be archived.
- ⏳ Supabase: needs the `20260519000000_free_vs_paid_pricing.sql` migration applied
- ⏳ Resend domain verification: not done
- Free tier flow works end-to-end as soon as the migration runs (no Stripe needed)
- Paid ($1) tier needs Stripe product + env var to function

**Resume next session**: pick from (a) apply Supabase migration + smoke-test free flow locally, (b) create $1 Stripe product to unblock paid path, (c) move to Day 5 (Resend nurture sequence).

---

## Required `.env.local` variables

Create `bridge-site/.env.local` (gitignored) with the following:

```
# ── Stripe ────────────────────────────────────────────────────
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_AUDIT_PAID=price_...   # the $1 variant; free tier skips Stripe

# ── Resend ────────────────────────────────────────────────────
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=hello@aibridgesolutions.com
RESEND_FROM_NAME=Bridge AI Solutions

# ── Anthropic ─────────────────────────────────────────────────
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-haiku-4-5-20251001

# ── Supabase ──────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# ── App ───────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_EMAILS=hayden.kerr@lifetraq.com
```

## One-time setup steps

### 1. Stripe
1. Stripe Dashboard → Products → Add product
   - Product: "Shadow Audit — Paid Tier" → one-time price $1.00 USD → copy the `price_...` ID into `STRIPE_PRICE_AUDIT_PAID`
   - (The free tier skips Stripe entirely — `/shadow-audit-free` goes straight to email capture.)
2. Stripe Dashboard → Developers → Webhooks → Add endpoint
   - URL: `https://aibridgesolutions.com/api/webhooks/stripe` (production) — for dev, use Stripe CLI to forward
   - Events: `checkout.session.completed`, `checkout.session.expired`
   - Copy the signing secret into `STRIPE_WEBHOOK_SECRET`
3. For local development, install Stripe CLI and run:
   ```
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

### 2. Resend
1. Resend Dashboard → Domains → Add Domain → `aibridgesolutions.com`
2. Add the DNS records Resend shows (SPF, DKIM, DMARC) to your DNS provider
3. Wait for verification (~5-30 min)
4. Resend Dashboard → API Keys → Create → copy into `RESEND_API_KEY`

### 3. Anthropic
1. console.anthropic.com → API Keys → Create
2. Copy into `ANTHROPIC_API_KEY`
3. Ensure billing is enabled on the account

### 4. Supabase (new project)
1. supabase.com/dashboard → New Project → "Bridge AI"
2. Settings → API → copy URL into `NEXT_PUBLIC_SUPABASE_URL`
3. Settings → API → copy `anon` key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Settings → API → copy `service_role` key into `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)
5. Run schema migration (see `supabase/migrations/` once created)
6. Authentication → Email allowlist → add `hayden.kerr@lifetraq.com`

### 5. Vercel
Once `.env.local` works locally, mirror all variables in Vercel:
- Vercel Dashboard → bridge-site → Settings → Environment Variables
- Add each var for `Production` and `Preview` environments
- Set `NEXT_PUBLIC_APP_URL=https://aibridgesolutions.com` for Production

## File map

| File | Purpose |
|---|---|
| `lib/stripe.ts` | Stripe client + checkout session helpers |
| `lib/resend.ts` | Resend client + email send helpers |
| `lib/anthropic.ts` | Claude client + ATLAS prompt builder |
| `lib/supabase/server.ts` | Server-side Supabase client |
| `lib/supabase/admin.ts` | Admin (service role) Supabase client |
| `lib/supabase/client.ts` | Browser Supabase client |
| `lib/pdf.ts` | React-PDF report renderer |
| `app/api/checkout/route.ts` | Create Stripe checkout session (paid tier only) |
| `app/api/lead/free/route.ts` | Free tier — create lead + audit_token, no Stripe |
| `app/api/webhooks/stripe/route.ts` | Handle Stripe webhook events |
| `app/api/audit/submit/route.ts` | Receive audit, generate report, email |
| `app/api/cron/stripe-abandoned/route.ts` | Pull abandoned checkouts → leads table |
| `app/(squeeze)/layout.tsx` | Squeeze route group layout (no Nav/Footer) |
| `app/(squeeze)/shadow-audit-free/page.tsx` | Variant A (Free) |
| `app/(squeeze)/shadow-audit-1/page.tsx` | Variant B ($1) |
| `app/(squeeze)/shadow-audit/start/page.tsx` | Free tier — email capture before audit |
| `app/(squeeze)/shadow-audit/audit/[token]/page.tsx` | Free tier — token-gated audit form |
| `app/(squeeze)/shadow-audit/thank-you/[session_id]/page.tsx` | Paid tier — post-purchase audit form |
| `app/admin/page.tsx` | Bridge AI funnel dashboard |
| `components/AuditQuiz.tsx` | Multi-step audit form |
| `emails/*.tsx` | Resend email templates |
| `supabase/migrations/` | SQL schema |
