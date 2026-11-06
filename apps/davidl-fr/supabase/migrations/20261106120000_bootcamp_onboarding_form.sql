-- Bootcamp onboarding questionnaire, migrated off the Airtable embed form.
-- Answers are nullable so the email-only signups imported from Airtable stay valid,
-- the insert policy below makes them required for every new submission.
alter table public.bootcamp_onboarding
  add column if not exists full_name             text check (char_length(full_name) <= 200),
  add column if not exists github_username       text check (github_username ~ '^[A-Za-z0-9-]{1,39}$'),
  add column if not exists git_confidence        smallint check (git_confidence between 1 and 10),
  add column if not exists javascript_confidence smallint check (javascript_confidence between 1 and 10),
  add column if not exists react_experience      smallint check (react_experience between 1 and 10),
  add column if not exists motivation            text check (char_length(motivation) <= 5000),
  add column if not exists phone_os              text check (phone_os in ('ios', 'android', 'other')),
  add column if not exists computer_os           text check (computer_os in ('macos', 'linux', 'windows')),
  add column if not exists setup_done            boolean;

-- Visitors sign up before they have an account, so the public form inserts as anon.
-- Insert only: nobody but the service role reads the answers back, created_at stays server side.
grant insert (
  email, full_name, github_username, git_confidence, javascript_confidence,
  react_experience, motivation, phone_os, computer_os, setup_done
) on table public.bootcamp_onboarding to anon, authenticated;

create policy "Visitors submit the bootcamp onboarding form"
  on public.bootcamp_onboarding for insert
  to anon, authenticated
  with check (
    email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and char_length(email) <= 320
    and char_length(trim(full_name)) > 0
    and git_confidence is not null
    and javascript_confidence is not null
    and react_experience is not null
    and char_length(trim(motivation)) > 0
    and phone_os is not null
    and computer_os is not null
    and setup_done is not null
  );
