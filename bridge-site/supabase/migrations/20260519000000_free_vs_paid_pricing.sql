-- ─────────────────────────────────────────────────────────────────────────────
-- Free vs $1 A/B test pricing migration
-- ─ Tier renames: audit_9/audit_97 → audit_free/audit_paid
-- ─ Free tier skips Stripe, so leads need an audit_token to gate the form
-- ─────────────────────────────────────────────────────────────────────────────

-- Update purchases.tier check constraint. Only audit_paid creates a purchase
-- row now; audit_free leads have no purchases row at all.
alter table public.purchases drop constraint if exists purchases_tier_check;
alter table public.purchases
  add constraint purchases_tier_check
  check (tier in ('audit_paid'));

-- Backfill any pre-existing rows (dev only — there should be none in prod yet).
update public.purchases set tier = 'audit_paid' where tier in ('audit_9', 'audit_97');

-- audit_token: random opaque token granting free-tier access to the audit form.
-- Paid tier uses stripe_session_id instead, so this stays null for them.
alter table public.leads add column if not exists audit_token text;
create unique index if not exists leads_audit_token_unique on public.leads (audit_token);
