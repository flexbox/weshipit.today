# weshipit HQ: a minimal lead-magnet tool for one person

> Plan written 2026-11-21, cut down to the minimum after the [Minute Lead teardown](./minutelead-findings.md), then updated with three decisions the same day. Status: **v1 code written** on branch `feat/hq-lead-magnets` (2026-11-21). Supabase is set up, and sign-in plus magnet creation work locally (tested 2026-11-22). `/hq` has a sidebar layout modelled on Catalyst, built with `@weshipit/ui` (2026-11-22). Shipmail is set up and a local send test passed: `weshipit.today` is verified and the sender `david@mail.weshipit.today` is active (2026-11-22). The env vars are on Vercel Production. Next: merge and deploy, then test `/hq/login` and one `/r` signup on production.
> One user (me). It lives inside `apps/web` on the existing Pages Router. Supabase handles auth and the database, and [Shipmail](https://shipmail.to) is **the only email tool**.

**Decided 2026-11-21**

- **Shipmail only.** MailerLite and Mailchimp are dropped (see §8). This replaces the MailerLite choice in `docs/marketing/plan.md`. _Revised 2026-11-23:_ the newsletter list lives in **one Shipmail audience**, not in the HQ `leads` table. HQ captures leads and adds the ones who opt in to that audience.
- **A new Supabase project** just for HQ.
- **Capture pages at `/r/[slug]`**, short enough for show notes and video descriptions.

---

## 1. Scope

**v1 does five things:**

1. **Magnets.** Each one has a title, slug, one-line pitch, three to five bullets, a markdown body and a published flag. I write them by hand: a checklist is a GFM task list, a guide is headings and paragraphs.
2. **Capture page** at `/r/[slug]`. It asks for an email, an optional first name and an optional, unticked opt-in to other emails, and it records the UTM parameters. The resource is delivered whether or not the box is ticked. A view counter sits behind it. The self-audit quizzes and the davidl.fr newsletter form post to the same endpoint.
3. **Reveal and email.** After submit, the visitor goes straight to the resource, rendered from markdown with print CSS so "save as PDF" works. Shipmail sends them one email with the link (replies go to the mailbox set on the Shipmail sender). I get one Slack message saying who signed up (2026-11-23, it replaces the owner email). Leads who opt in are added to the Shipmail newsletter audience.
4. **HQ** at `/hq`, behind a magic link. Pages: magnets with views, leads and conversion; a magnet form; a leads table with CSV export.
5. **Unsubscribe link** in every email, which sets a flag. Unsubscribed leads are left out of the CSV export by default.

**Left out on purpose:** formats other than markdown, AI in the app, persona, branding, custom user slugs, integrations and webhooks, sequences and broadcasts, a preview page, a promote page, a weekly recap, Shipmail delivery webhooks, daily stats. Each of these exists in Minute Lead (see the [teardown](./minutelead-findings.md)), and none is needed to capture leads and write back to them by hand. Their own guide recommends writing personally to the first ~30 contacts, and the email I get for each new lead is what makes that easy.

## 2. Flow

```
/r/[slug]  ──beacon──▶ POST /api/lm/view                 (views + 1)
self-audit quiz ─┐
davidl.fr form ──┤ (server-to-server)
/r/[slug] form ──┴▶ POST /api/lm/subscribe ── insert lead (or reuse the existing row for this email + magnet)
                         │                    ├─ Shipmail → visitor: resource link (or a welcome note for newsletter signups) + unsubscribe
                         │                    ├─ Slack → me: "Nouveau lead · {magnet or source}" + details
                         │                    └─ opted in → Shipmail audience: Newsletter or Leads
                         ▼
               /r/[slug]/[token]   the resource (markdown, print-friendly, noindex)
```

## 3. Files in `apps/web`

Everything stays on the **Pages Router**, like the rest of the app. There's no App Router and no `proxy.ts` change. Owner checks run in `getServerSideProps` and in each API route.

```
apps/web/
├── pages/
│   ├── r/[slug]/index.tsx             capture page (SSR; unpublished → 404 unless I'm logged in)
│   ├── r/[slug]/[token].tsx           resource page (SSR, noindex; checks the token belongs to the slug)
│   ├── desabonnement.tsx              "unsubscribed" confirmation (static)
│   ├── hq/index.tsx                   magnets table + last 20 leads
│   ├── hq/magnets/[id].tsx            create (id = "new") / edit form
│   ├── hq/leads.tsx                   leads table, ?magnet= / ?source= filters, CSV link
│   ├── hq/login.tsx                   magic-link form
│   └── api/
│       ├── lm/subscribe.ts            public: validate → insert → 2 emails → { token? }
│       ├── lm/view.ts                 public: increment_views(slug)
│       ├── lm/unsubscribe.ts          GET (email link) → redirect /desabonnement; POST (one-click header)
│       ├── hq/login.ts                signInWithOtp, only for HQ_OWNER_EMAIL
│       ├── hq/auth/callback.ts        exchangeCodeForSession → cookies → redirect /hq
│       ├── hq/magnets.ts              owner: upsert from the form → 303 back to /hq
│       └── hq/leads-csv.ts            owner: CSV download
├── utils/hq/
│   ├── supabase.ts                    getHqAdmin() (secret key) + createHqAuthClient(req, res) via @supabase/ssr
│   ├── require-owner.ts               getOwner() / requireOwnerPage(): getUser() + email === HQ_OWNER_EMAIL
│   ├── shipmail.ts                    sendEmail(): one transactional send, logs instead when Shipmail isn't set (dev)
│   ├── emails.ts                      visitorEmail(), followupEmail(): pure { subject, html, text }
│   ├── slack.ts                       newLeadMessage() (pure) + notifySlack(): the per-lead ping to me
│   ├── audience.ts                    addToAudience() / unsubscribeFromAudience(): the Shipmail newsletter audience
│   ├── schemas.ts                     zod: subscribeSchema, magnetFormSchema
│   ├── consent.ts                     opt-in sentence, FR + EN
│   ├── csv.ts, base-url.ts            CSV export (formula-safe), absolute origin for email links
│   ├── database.types.ts              generated by `yarn web:db:types` (formatted with Prettier), never edit by hand
│   └── types.ts                       LeadMagnet / Lead row shortcuts, kept out of the generated file
├── components/hq/
│   ├── lead-magnet-form.tsx           email, first name, opt-in, honeypot, UTM from the URL
│   ├── magnet-markdown.tsx            react-markdown + remark-gfm (already installed)
│   ├── hq-shell.tsx                   sidebar frame modelled on Catalyst: Tableau de bord, Leads, Nouveau magnet, sign out
│   └── leads-table.tsx                shared leads table
└── supabase/                          config.toml (project "weshipit-hq", sign-ups off) + migrations/20261121120000_hq.sql
```

HQ forms are plain `<form method="post">` posts to API routes that answer with a 303 redirect. That avoids client state and data-fetching libraries. The `server-only` package is **not** used: Next only allows it in App Router and API layers, and Pages Router page modules fail the build with it. `utils/hq/supabase.ts` throws if it ever runs in a browser instead, and the build was checked for leaked secret names. Before writing code, read the Pages Router API route docs in `node_modules/next/dist/docs/02-pages/`, as `apps/web/AGENTS.md` asks.

**Reserved slugs:** don't create a magnet with a slug that collides with another route. `/r/[slug]` only matches one segment, so there's no real clash today, but validate the slug format (`^[a-z0-9-]+$`) in `/api/hq/magnets`.

## 4. Data: two tables, one migration

The schema lives in `apps/web/supabase/migrations/20261121120000_hq.sql`, which is the source of truth. In short:

- **`lead_magnets`**: slug (format checked in SQL), title, pitch, bullets, markdown body, published flag, a `views` counter.
- **`leads`**: one row per email and magnet (`unique nulls not distinct`, so a newsletter signup without a magnet is also unique per email). Other columns:
  - `source`, plus an optional `meta` jsonb (the quiz score)
  - UTM fields and referrer
  - `marketing_consent` plus `consent_text`: the exact opt-in sentence that was ticked, in the visitor's language
  - two separate tokens, so knowing the resource link doesn't let anyone unsubscribe you: `access_token` for `/r/[slug]/[token]` and `unsubscribe_token` for the email footer
  - `unsubscribed_at`, set on every row with that email
- `email` is `citext`, so `Jane@` and `jane@` are the same lead.
- A magnet that has leads **can't be deleted** (`on delete restrict`). Unpublish it instead.
- RLS is on with no policies. `increment_views()` is `security definer`, with `search_path = ''` and execute granted to `service_role` only.

Checked on a throwaway Postgres 18 (2026-11-21):

- the migration applies
- service_role can count a view and anon can't
- anon sees 0 leads
- newsletter duplicates are rejected regardless of case
- a bad slug is rejected
- deleting a magnet with leads is refused

Conversion is `count(leads) / views` per magnet, computed in the `/hq` query with an embedded `leads(count)`. GDPR deletions are rare, so I do them in the Supabase table editor rather than building a screen.

## 5. Auth (new Supabase project)

- Create a **new project** in an EU region (it holds personal data). Turn **sign-ups off** and create the single user by hand. Add `https://weshipit.today/api/hq/auth/callback` (and the localhost one) to the allowed redirect URLs.
- `/api/hq/login` ignores any email other than `HQ_OWNER_EMAIL` but answers the same way, so it doesn't reveal which address is the owner's.
- `requireOwner(ctx)` runs in the `getServerSideProps` of every `/hq` page (redirecting to `/hq/login` when it fails) and at the top of every `/api/hq/*` route (401).
- Supabase's built-in mailer allows only a few auth emails per hour. That is plenty for one person, so no custom SMTP is needed.
- **Free tier:** a project pauses after about a week without activity, and a paused project can't take signups. Either use the Pro plan, or add a daily Vercel cron (`/api/cron/keepalive`, protected by `CRON_SECRET`) that runs one query. Check Supabase's current free-tier rules when creating the project.

## 6. Emails (Shipmail)

- `shipmail@0.6.11`: `new ShipmailClient({ apiKey })`, then `client.messages.send({ from, to, subject, html, text, headers, metadata }, { idempotencyKey })`. Idempotency goes in the **second** argument, and `headers` is an array of `{ name, value }`. The shipmail.to homepage example (`new Shipmail(...)`, options first) doesn't match the published SDK.
- **To the visitor:** one email per lead.
  - With a magnet: the link to `/r/{slug}/{token}`.
  - Newsletter signup: a two-line welcome.
  - Idempotency key `visitor-{lead.id}`. No `reply_to`: for a transactional sender, Shipmail adds the display name and the Reply-To mailbox configured on the sender.
  - Every one carries an unsubscribe link plus the headers `List-Unsubscribe: <https://weshipit.today/api/lm/unsubscribe?t={token}>` and `List-Unsubscribe-Post: List-Unsubscribe=One-Click`.
- **Notification to me:** a Slack message through an incoming webhook (`HQ_SLACK_WEBHOOK_URL`), only for a new lead. It gives the email, first name, source, magnet, UTM, `meta.score` when present, a reply link and a link to `/hq/leads`. It replaced the owner email on 2026-11-23.
- **Self-audits (2026-11-26):** the quiz forms have no checkbox. A notice under the submit button says the report comes with occasional emails (`AUDIT_NOTICE_LABELS` in `consent.ts`, B2B soft opt-in), the form posts `marketing_consent: true`, and the notice is stored as `consent_text`. So every audit lead who gets the report lands in the Leads audience. Shipmail's add API can't create `transactional_only` subscribers, which is why it's all or nothing. The `/r/` magnets keep their checkbox.
- **Audiences:** when `marketing_consent` is true, the lead is added to a Shipmail audience with `consent_source: weshipit-hq:{source}`: `davidl-newsletter` signups go to Newsletter (`SHIPMAIL_NEWSLETTER_AUDIENCE_ID`), lead magnets and self-audits go to Leads (`SHIPMAIL_LEADS_AUDIENCE_ID`). Shipmail never re-adds someone who left an audience. `/api/lm/unsubscribe` unsubscribes them from both.
- Run the email, the Slack ping and the audience add with `Promise.allSettled` **before** responding. If they fail, log it and still return the token, because the visitor sees the resource on the page anyway.
- Setup:
  - A transactional domain (e.g. `mail.weshipit.today`) with its DNS records on Vercel, verified in Shipmail. Then a **transactional sender** on it (e.g. `david@mail.weshipit.today`), with replies going to my Shipmail mailbox. `HQ_FROM_EMAIL` is that bare address. Done 2026-11-22: `david@mail.weshipit.today`, replies to `david@weshipit.today` (§7).
  - An API key with scopes `messages:send` and `audiences:write` (the second since 2026-11-23), and **"Hold email to outside addresses for review" off**. With it on, every send returns `202 held_for_review` and sits in Drafts.
- Limits: the trial is capped at 100 recipients per day. Shipmail sends no open or click events, and v1 doesn't need them.

## 7. Build steps (about 2.5 days)

**Setup (half a day)**

- [x] New Supabase project "weshipit-hq" (ref `doztcafmauxhqrqxkiol`), linked; migration pushed and types generated on 2026-11-21. `web:db:push` targets the linked project (`--linked`): Supabase CLI 2.119 pushes to the local stack by default.
- [x] In the Supabase dashboard (done; magic-link sign-in tested locally 2026-11-22):
  - Authentication → Sign In / Providers: turn off "Allow new users to sign up"
  - Authentication → Users → Add user, with "Auto Confirm User" ticked
  - Authentication → URL Configuration: Site URL `https://weshipit.today`; redirect URLs `https://weshipit.today/api/hq/auth/callback` and `http://localhost:4200/api/hq/auth/callback`
  - Don't use `supabase config push`: it would also copy the local `site_url` to the live project.
- [x] Shipmail domain (2026-11-22). `weshipit.today` is verified in Shipmail. Its DNS changes on Vercel:
  - MX now points to `mx1.shipmail.to`, which replaces ImprovMX.
  - The SPF record has `include:spf.shipmail.to` added. The MailerLite and ImprovMX includes stay until §8 is done.
  - A DKIM record `shipmail._domainkey` was added.
  - DMARC is now `v=DMARC1; p=reject`, Shipmail's recommended value. Anything sending as @weshipit.today without aligned DKIM or SPF is rejected. MailerLite signs with its `litesrv._domainkey` DKIM.
  - Incoming mail goes to the mailbox `david@weshipit.today`.
- [x] Transactional domain `mail.weshipit.today`, verified on 2026-11-22. Its records on Vercel are DKIM `shipmail._domainkey.mail`, plus MX and SPF on `mail.mail`, the MAIL FROM domain (Amazon SES eu-central-1). The old Resend records under `mail.` don't conflict.
- [x] Transactional sender `david@mail.weshipit.today` ("David Leuliette"). Replies go to `david@weshipit.today`.
- [x] App API key: scope `messages:send` only, hold-for-review off. It is set as `SHIPMAIL_API_KEY` in `.env.local` (2026-11-22).
- [ ] Revoke the Shipmail setup key used for the steps above.
- [x] Local send test (2026-11-22). One `POST /api/lm/subscribe` with no magnet triggers both emails, the visitor's and the owner's "Nouveau lead". Both reached Gmail outside spam, with DKIM, SPF and DMARC passing, `Reply-To: david@weshipit.today` and the List-Unsubscribe headers. The test lead was deleted. Restart `next dev` after editing `.env.local`; the running server kept the old values.
- [x] Env vars in `apps/web/.env.local` and on Vercel. The list is in `apps/web/.env.local.example`. They're set locally and on Vercel **Production** only (2026-11-22), and the two keys are stored as Secret. Preview is left out because the magic link always returns to `HQ_SITE_URL`, and a preview `/r` page would write real leads and send real emails. Restart `next dev` after editing `.env.local`:
  - `HQ_SUPABASE_URL`, `HQ_SUPABASE_PUBLISHABLE_KEY`, `HQ_SUPABASE_SECRET_KEY`. These have an `HQ_` prefix, not `NEXT_PUBLIC_SUPABASE_*`, because the Supabase integration (installed 2026-11-04) syncs those standard names from the davidl-fr project into the `weshipit-today` Vercel project.
  - `HQ_OWNER_EMAIL`, `HQ_SITE_URL`
  - `SHIPMAIL_API_KEY`, `HQ_FROM_EMAIL`
- [x] `@supabase/ssr@0.12.7`, `shipmail@0.6.11`, `zod@^4.6.7`, plus Nx targets `web:supabase`, `web:db-push`, `web:db-types`

**Public side (1 day)**

- [x] `utils/hq/supabase.ts`, `utils/hq/shipmail.ts`, the email templates (plain functions returning `{ subject, html, text }`), with unit tests for the schemas, emails, CSV and base URL (21 tests)
- [x] `POST /api/lm/subscribe` accepting `{ magnet?, source, email, first_name?, marketing_consent, locale, meta?, utm_*, website }`:
  - zod validation; reject a filled honeypot
  - insert, or on conflict fetch the existing row
  - send the two emails, return `{ token }` when there is a magnet
  - same response whether or not the email is already known
- [x] `/r/[slug]` with `lead-magnet-form.tsx` and the view beacon (a `keepalive` fetch, once per session per slug), then `/r/[slug]/[token]` with `magnet-markdown.tsx` and Tailwind `print:` styles, then `/api/lm/unsubscribe` and `/desabonnement`
- [ ] First magnet: the **React Native Stability Checklist** (`docs/marketing/plan.md` §5), written in `/hq/magnets/new` and published. A first magnet exists as a draft (2026-11-22).
- [x] `/hq` and `/desabonnement` added to `EXCLUDED_PAGES` in `scripts/generate-sitemap.mts` (`/r/*` has no index page, so it isn't picked up), and every new page renders `noindex`

**HQ (half a day)**

- [x] `requireOwnerPage`/`getOwner`, `/hq/login`, `/api/hq/login`, `/api/hq/auth/callback`, `/api/hq/logout`
- [x] `/hq` (magnets with views, leads, conversion and the `/r/` link; latest leads), `/hq/magnets/[id]` + `/api/hq/magnets`, `/hq/leads` + `/api/hq/leads-csv`
- [x] Sidebar layout modelled on [Catalyst](https://catalyst.tailwindui.com) (2026-11-22). Only the layout idea is borrowed; no Catalyst code is copied. Details:
  - `hq-shell.tsx`: a fixed sidebar on desktop, and on mobile a drawer using the same Headless UI `Dialog` as the site header. The content sits on a white panel over a slate background.
  - Text, buttons, badges and cards come from `@weshipit/ui` (`Text`, `Button`, `LinkButton`, `Badge`, `Card`).
  - `/hq` shows four numbers (total leads, leads in the last 7 days, `/r` views, `/r` conversion), the magnets table and the 10 latest leads.
  - Tables have no lines between rows, only a hover tint.
  - The CSV export is `Button as="a"`, not `LinkButton`: `next/link` must not try to open an API route as a page.

**Leave MailerLite and Mailchimp (half a day), see §8**

**Done when** a real submit on production shows the checklist, the email arrives, the Slack ping arrives, and the lead appears in `/hq` with the right conversion rate. Gate PRs on `npx nx typecheck web`, `npx nx test web` and `npx nx build web`. `nx lint web` has a known pre-existing failure (see `apps/web/AGENTS.md`).

## 8. Leaving MailerLite and Mailchimp

Decided 2026-11-23: the newsletter list is **one Shipmail audience**. The old Mailchimp list goes straight there, not into HQ, so there is no HQ import script. Gumroad contacts are added to the same audience by hand later.

| Touchpoint                                   | Change (done 2026-11-23 unless noted)                                                                                                                                                                                                                               |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/web/components/self-audit-quiz.tsx`    | Posts to `/api/lm/subscribe` with `source: 'audit:<config.id>'` and `meta: { score }` (done 2026-11-21). Set `leadMagnetSlug` in an audit config once its "detailed report" magnet exists                                                                           |
| `apps/davidl-fr/src/pages/api/newsletter.ts` | Thin server-to-server forward to `https://weshipit.today/api/lm/subscribe` with `source: 'davidl-newsletter'`, `locale: 'en'` and `marketing_consent: true` (signing up is the opt-in, its consent text is in `FORM_CONSENT_LABELS`). `Newsletter.tsx` is unchanged |
| `/api/lm/subscribe`                          | Opted-in leads are added to the Shipmail audience; the owner email is replaced by a Slack message                                                                                                                                                                   |
| Legacy                                       | `MAILCHIMP_*` env docs, `isomorphic-unfetch`, the ImprovMX README line, the MailerLite mentions in the marketing docs, `ownerEmail()` and the finished `plans/` folder are deleted                                                                                  |

Steps:

- [x] MailerLite account deleted (2026-11-23). ImprovMX was already replaced by the Shipmail mailbox (2026-11-22).
- [ ] Shipmail: create the Newsletter and Leads audiences, set `SHIPMAIL_NEWSLETTER_AUDIENCE_ID` and `SHIPMAIL_LEADS_AUDIENCE_ID`; give the app key the `audiences:write` scope; create a Slack incoming webhook and set `HQ_SLACK_WEBHOOK_URL`. All on Vercel Production for `weshipit-today`.
- [ ] Merge and deploy, then test one davidl.fr newsletter submit and one `/r` submit on production: lead in `/hq`, Slack ping, subscriber in the audience.
- [ ] Remove `MAILCHIMP_API_KEY` and `MAILCHIMP_LIST_ID` from the davidl-fr Vercel project (after the deploy, so the old route never runs without them).
- [ ] One-time Mailchimp export of **subscribed** contacts only. Unsubscribed and cleaned contacts are never imported, because adding them would subscribe them again; keep their CSV outside git as the opt-out record.
- [ ] Clean the subscribed CSV once with no2bounce, keep only the valid addresses, and import them into the Shipmail audience.
- [ ] Cancel Mailchimp.
- [ ] DNS: remove the MailerLite and ImprovMX includes from the `weshipit.today` SPF record and the `litesrv._domainkey` CNAME (DKIM) and the `mailerlite-domain-verification` TXT record.
- [x] Dated note at the top of `docs/marketing/plan.md` (2026-11-21, revised 2026-11-23).

## 9. Optional: a magnet per podcast episode (about 2 hours, no AI in the app)

36 episodes have a transcript in `apps/web/public/podcast-transcripts/` and an article in `apps/web/content/podcast-articles/`. Minute Lead's core feature (transcript in, magnet out) doesn't need an LLM integration in production for one person who already uses Claude Code:

- [ ] Write the draft locally with a saved prompt, `docs/hq/episode-magnet-prompt.md`, then paste the markdown into `/hq/magnets/new`:
  > From `apps/web/public/podcast-transcripts/<slug>.txt` (and `apps/web/content/podcast-articles/<slug>.md` if it exists), write a French lead magnet for React Native tech leads: a title, a one-line pitch, 3–5 bullets, then a checklist of 8–12 `- [ ]` items grouped under 2–4 `##` headings. Use the guest's own examples and wording. Make no claims that aren't in the transcript.
- [ ] Add an optional `lead_magnet_slug` to `podcast-episodes.fixture.ts`. `/podcast/[slug]` renders a small CTA card linking to `/r/{lead_magnet_slug}` (a `next/link`, not an inline form)

## 9b. Follow-up "Merci !" (added 2026-11-23)

Minute Lead's own advice: write to every new contact within 24 hours, one by one, with three lines and no offer. HQ now does that from the leads tables.

- **Status per lead** (`leads.followup_status`, migration `20261123120000_hq_followup.sql`): `to_contact` (default, existing leads included) → `sent` → `replied`. `followup_sent_at` keeps the send time.
- **Suivi column** in `/hq` and `/hq/leads`: a badge (À contacter / Relance envoyée / A répondu) and one button. "Envoyer « Merci ! »" sends the email and moves to `sent`; "A répondu" is clicked by hand once they answer. `/hq/leads?followup=to_contact` lists who's left.
- **The email** (`followupEmail()` in `utils/hq/emails.ts`): subject "Merci !", "Hello {prénom}, Merci d'avoir téléchargé « {magnet} ». Dis-moi, qu'est-ce que tu en as pensé ?" (no signature). Leads without a magnet get "Merci de t'être inscrit. Dis-moi, qu'est-ce qui t'a amené ici ?". No layout and no visible footer, so it reads like a personal note; the List-Unsubscribe header still carries the unsubscribe link. Unsubscribed leads can't be sent one, and the Shipmail idempotency key `followup:{lead id}` stops a double send.
- **Route**: `POST /api/hq/followup` (owner only, `id` + `action` = `send` | `replied` + `returnTo`, 303 back).

## 10. Later, only if a real need shows up

| Need                                           | Smallest answer                                                                                                                               |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Bounces pile up                                | Shipmail webhook (`message.bounced`, `message.complained`) → set `unsubscribed_at`                                                            |
| Too many leads to answer by hand               | One welcome email a few days later, via a daily Vercel cron with idempotency key `welcome-{lead.id}`                                          |
| Newsletter or monthly digest to the whole list | Done by design (2026-11-23): opted-in leads land in the Shipmail audience; write issues in Shipmail's newsletter tool, don't build a composer |
| Drafting by hand gets tedious                  | "Draft from episode" in HQ with AI SDK + AI Gateway                                                                                           |
| Inline capture on content pages                | Reuse `lead-magnet-form.tsx` in podcast, tools and glossary pages                                                                             |
