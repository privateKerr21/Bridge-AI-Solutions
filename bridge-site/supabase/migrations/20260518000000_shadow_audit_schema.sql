-- ─────────────────────────────────────────────────────────────────────────────
-- Bridge AI Solutions — Shadow Audit funnel schema
-- ─────────────────────────────────────────────────────────────────────────────

-- Leads: every email that enters the funnel (buyers + abandoned-checkout emails)
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  source text default 'bagelbots',
  utm_source text,
  utm_campaign text,
  utm_content text,
  variant text check (variant in ('a', 'b')),
  status text not null default 'lead' check (status in ('lead', 'purchased', 'audit_completed', 'call_booked', 'converted', 'churned')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index leads_email_unique on public.leads (lower(email));
create index leads_status_idx on public.leads (status);
create index leads_variant_idx on public.leads (variant);
create index leads_created_at_idx on public.leads (created_at desc);

-- Purchases: completed Stripe transactions
create table public.purchases (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  stripe_session_id text not null unique,
  stripe_payment_intent_id text,
  tier text not null check (tier in ('audit_9', 'audit_97')),
  amount_cents integer not null,
  status text not null default 'completed' check (status in ('completed', 'refunded', 'disputed')),
  created_at timestamptz not null default now()
);

create index purchases_lead_id_idx on public.purchases (lead_id);
create index purchases_tier_idx on public.purchases (tier);

-- Audit responses: the form data + generated report
create table public.audit_responses (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  purchase_id uuid references public.purchases(id) on delete set null,
  raw_responses jsonb not null,
  generated_report jsonb,
  pdf_url text,
  status text not null default 'pending' check (status in ('pending', 'generating', 'completed', 'failed')),
  error_message text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index audit_responses_lead_id_idx on public.audit_responses (lead_id);
create index audit_responses_status_idx on public.audit_responses (status);

-- Bookings: $97 tier Calendly bookings
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  purchase_id uuid references public.purchases(id) on delete set null,
  calendly_event_uuid text,
  calendly_event_url text,
  scheduled_at timestamptz,
  status text not null default 'pending' check (status in ('pending', 'scheduled', 'completed', 'canceled', 'no_show')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index bookings_lead_id_idx on public.bookings (lead_id);
create index bookings_status_idx on public.bookings (status);

-- Conversions: manual marker for downstream Focused Build / Signature Build / Studio Partner closes
create table public.conversions (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  conversion_type text not null check (conversion_type in ('focused_build', 'signature_build', 'studio_partner', 'other')),
  value_cents integer,
  notes text,
  created_at timestamptz not null default now()
);

create index conversions_lead_id_idx on public.conversions (lead_id);

-- Email events: log every transactional email sent
create table public.email_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  email_type text not null,
  resend_id text,
  status text not null default 'sent' check (status in ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed')),
  payload jsonb,
  created_at timestamptz not null default now()
);

create index email_events_lead_id_idx on public.email_events (lead_id);
create index email_events_email_type_idx on public.email_events (email_type);

-- ─── Auto-update updated_at ────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_updated_at before update on public.leads
  for each row execute function public.set_updated_at();

create trigger bookings_updated_at before update on public.bookings
  for each row execute function public.set_updated_at();

-- ─── Row-Level Security ────────────────────────────────────────────────────
-- Lock everything down by default. Service role bypasses RLS.
-- Admin dashboard reads via service role only.

alter table public.leads enable row level security;
alter table public.purchases enable row level security;
alter table public.audit_responses enable row level security;
alter table public.bookings enable row level security;
alter table public.conversions enable row level security;
alter table public.email_events enable row level security;

-- No anon/authenticated policies — all access goes through service_role from server-side.

-- ─── Storage Bucket for PDF reports ────────────────────────────────────────
-- Private bucket. Access via signed URLs only.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('audit-reports', 'audit-reports', false, 10485760, array['application/pdf'])
on conflict (id) do nothing;
