-- HQ: lead magnets and the leads they capture. See docs/hq/plan.md.
--
-- Row level security is on with no policies, so the publishable key can read
-- and write nothing. Every query runs server-side with the secret key.

create extension if not exists citext;

create table public.lead_magnets (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  pitch text not null,
  bullets text[] not null default '{}',
  content_md text not null,
  published boolean not null default false,
  views integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  -- Null for newsletter signups, quiz leads without a magnet, and imports.
  -- Restrict: a magnet with leads is unpublished, not deleted.
  lead_magnet_id uuid references public.lead_magnets on delete restrict,
  -- Where the lead came from: 'r-page', 'audit:security', 'davidl-newsletter',
  -- 'import:mailchimp'…
  source text not null,
  email citext not null,
  first_name text,
  -- The resource is delivered either way; this is the optional opt-in to
  -- other emails. consent_text keeps the exact wording that was ticked.
  marketing_consent boolean not null default false,
  consent_text text,
  -- e.g. { "score": 72 } from a self-audit quiz.
  meta jsonb not null default '{}',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text,
  -- Opens /r/[slug]/[token]. Separate from the unsubscribe token, so knowing
  -- one does not grant the other.
  access_token uuid unique not null default gen_random_uuid(),
  unsubscribe_token uuid unique not null default gen_random_uuid(),
  -- Set on every row with this email when any of them unsubscribes.
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  unique nulls not distinct (lead_magnet_id, email)
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_email_idx on public.leads (email);

alter table public.lead_magnets enable row level security;
alter table public.leads enable row level security;

-- Called from POST /api/lm/view. Only published magnets count views.
create function public.increment_views(p_slug text) returns void
language sql
security definer
set search_path = ''
as $$
  update public.lead_magnets
  set views = views + 1
  where slug = p_slug and published;
$$;

-- Keep it off the public PostgREST API: only the secret key may call it.
revoke execute on function public.increment_views(text) from public, anon, authenticated;
grant execute on function public.increment_views(text) to service_role;
