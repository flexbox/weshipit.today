-- HQ: the personal "Merci !" follow-up sent by hand to each new lead.
-- See docs/hq/plan.md §9.

alter table public.leads
  add column followup_status text not null default 'to_contact'
    check (followup_status in ('to_contact', 'sent', 'replied')),
  add column followup_sent_at timestamptz;

-- Leads that were already there count as "to contact".
create index leads_followup_status_idx on public.leads (followup_status);
