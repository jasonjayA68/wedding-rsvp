-- =============================================================================
--  Wedding RSVP — Supabase schema
--  Run this in your Supabase project: SQL Editor → New query → paste → Run.
-- =============================================================================

-- gen_random_uuid() comes from pgcrypto, which is enabled by default on
-- Supabase. If your project lacks it, uncomment the next line:
-- create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
--  updated_at trigger helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
--  events
-- ---------------------------------------------------------------------------
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  event_date  date not null,
  location    text not null,
  description text,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
--  participants (the RSVPs)
-- ---------------------------------------------------------------------------
create table if not exists public.participants (
  id              uuid primary key default gen_random_uuid(),
  full_name       text not null,
  email           text not null unique,
  phone           text,
  response_status text not null default 'pending'
                  check (response_status in ('attending', 'not_attending', 'maybe', 'pending')),
  guest_count     integer not null default 1
                  check (guest_count >= 0 and guest_count <= 50),
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

drop trigger if exists participants_set_updated_at on public.participants;
create trigger participants_set_updated_at
  before update on public.participants
  for each row execute function public.set_updated_at();

create index if not exists participants_status_idx  on public.participants (response_status);
create index if not exists participants_created_idx on public.participants (created_at desc);

-- ---------------------------------------------------------------------------
--  admins (dashboard logins)
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,
  password_hash text not null,
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
--  Row Level Security
--  Enable RLS with NO policies. The public (anon / publishable key) is then
--  denied all access. The app reaches the database only from the server using
--  the SERVICE ROLE key, which bypasses RLS — so the app works while the
--  publishable key is completely inert. This is the security backbone.
-- ---------------------------------------------------------------------------
alter table public.events       enable row level security;
alter table public.participants enable row level security;
alter table public.admins       enable row level security;

-- ---------------------------------------------------------------------------
--  Seed: your event (only inserts if the table is empty)
-- ---------------------------------------------------------------------------
insert into public.events (title, event_date, location, description)
select
  'Dave & Eliza''s Wedding',
  date '2026-06-27',
  'Sacred Heart of Jesus Parish, Bayugan City',
  'Ceremony at 1:00 PM, reception to follow.'
where not exists (select 1 from public.events);

-- ---------------------------------------------------------------------------
--  Admin login
--  Default credentials  →  username: admin   password: Pass123!
--  ⚠️  CHANGE THESE before going live. To set a new password, run:
--        npm run hash-password -- 'your-new-password'
--      and replace the hash string below, then re-run this statement.
-- ---------------------------------------------------------------------------
insert into public.admins (email, password_hash)
values (
  'admin',
  'a7d1c7cf6a4c9871eb4c9342950a4eb6:104b75ed60a3ce5175801bee692d6d3b1bd56ef399c20b3964c9ed4009dbdb4743e2eaacf81db1e0711716bf313bfcb432fde914bbe63ca2bebee830fe44c10d'
)
on conflict (email) do update set password_hash = excluded.password_hash;
