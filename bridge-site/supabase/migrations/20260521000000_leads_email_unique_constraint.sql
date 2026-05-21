-- Fix: webhook upsert uses onConflict: "email" which requires a column-level
-- unique constraint, not an expression index on lower(email). The app already
-- lowercases emails before insert, so a plain column constraint is sufficient.

drop index if exists public.leads_email_unique;
alter table public.leads add constraint leads_email_unique unique (email);
