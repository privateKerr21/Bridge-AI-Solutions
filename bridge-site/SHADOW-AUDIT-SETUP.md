# Shadow Audit — Environment Setup

Internal setup guide for the Shadow Audit tripwire funnel. Reference: `C:\Users\kerrk\.claude\plans\continue-and-let-s-build-agile-mitten.md`.

## Required `.env.local` variables

Create `bridge-site/.env.local` (gitignored) with the following:

```
# ── Stripe ────────────────────────────────────────────────────
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_AUDIT_9=price_...
STRIPE_PRICE_AUDIT_97=price_...

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
   - Product 1: "Shadow Audit — Self-Serve" → one-time price $9.95 USD → copy the `price_...` ID into `STRIPE_PRICE_AUDIT_9`
   - Product 2: "Shadow Audit — Done-With-You" → one-time price $97.00 USD → copy the `price_...` ID into `STRIPE_PRICE_AUDIT_97`
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
| `app/api/checkout/route.ts` | Create Stripe checkout session |
| `app/api/webhooks/stripe/route.ts` | Handle Stripe webhook events |
| `app/api/audit/submit/route.ts` | Receive audit, generate report, email |
| `app/api/cron/stripe-abandoned/route.ts` | Pull abandoned checkouts → leads table |
| `app/(squeeze)/layout.tsx` | Squeeze route group layout (no Nav/Footer) |
| `app/(squeeze)/shadow-audit-9/page.tsx` | Variant A ($9.95) |
| `app/(squeeze)/shadow-audit-97/page.tsx` | Variant B ($97) |
| `app/(squeeze)/shadow-audit/thank-you/[session_id]/page.tsx` | Post-purchase audit form |
| `app/admin/page.tsx` | Bridge AI funnel dashboard |
| `components/AuditQuiz.tsx` | Multi-step audit form |
| `emails/*.tsx` | Resend email templates |
| `supabase/migrations/` | SQL schema |
