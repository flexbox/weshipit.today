-- Workshop challenge submissions (elaboration + feedback), migrated off Airtable/BaseQL.
-- One row per (email, module, exercise). Rows are owned by email, matched against the
-- verified email in the Supabase JWT, so history imported from Airtable shows up on first login.
create table if not exists public.challenge (
  id                  uuid primary key default gen_random_uuid(),
  airtable_id         text unique,                    -- Airtable record id (recXXXX), null for new rows
  module              text not null,                  -- workshop id (foundation, data, ...), legacy ids kept as history
  exercise            smallint not null check (exercise >= 0),
  email               text not null default lower(auth.jwt() ->> 'email') check (email = lower(email)),
  learned             text not null check (char_length(learned) <= 5000),
  exercise_rating     smallint not null check (exercise_rating between 0 and 10),
  instructions_rating smallint not null check (instructions_rating between 0 and 10),
  comments            text check (char_length(comments) <= 5000),
  created_at          timestamptz not null default now(),
  constraint challenge_email_module_exercise_key unique (email, module, exercise)
);

alter table public.challenge enable row level security;

revoke all on table public.challenge from anon;
revoke all on table public.challenge from authenticated;
grant select, insert on table public.challenge to authenticated;

-- Append-only: students read and create their own rows, edits go through the dashboard.
create policy "Students read their own challenges"
  on public.challenge for select
  to authenticated
  using (email = lower(auth.jwt() ->> 'email'));

create policy "Students submit their own challenges"
  on public.challenge for insert
  to authenticated
  with check (email = lower(auth.jwt() ->> 'email'));

-- Public number for the /bootcamp alumni strip, without exposing any email.
create or replace function public.alumni_count()
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select count(distinct email)::integer from public.challenge;
$$;

revoke all on function public.alumni_count() from public;
grant execute on function public.alumni_count() to anon, authenticated;
