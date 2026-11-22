# Minute Lead teardown

> Captured 2026-11-21 to scope [HQ](./plan.md). These are notes on what the product does, not a spec for copying it.

## How this was gathered

- **Rendered pages in Chrome.** I used REA `capture_browser_scenario` in launch mode, with Google Chrome and a temporary profile that has no login and no cookies. I captured `/login`, `/signup`, `/blog`, `/` and two blog guides. The Evidence IDs are:
  - `ev_55fbb116…` for login and signup, with the network trace
  - `ev_4d7c136e…` for the blog index and homepage
  - `ev_85a3be5e…` for the guides `premier-lead-magnet-60-secondes` and `demarrer-minute-lead-questions-frequentes`
- **Public JS bundles.** I downloaded the 26 `/_next/static/chunks/*.js` files that the login page loads and searched them for routes, API paths and service names. This search was done outside REA, so it has no Evidence ID.
- **Plain fetches.** I read the homepage, pricing section, terms of sale (CGV) and a customer case study with a web fetch.
- **Logged-in pass: pending.** On 2026-11-21 the Claude in Chrome extension was connected, but a headless `claude -p --chrome` run was refused with "Claude in Chrome requires permission" for minutelead.io. Rerun the read-only route tour once the site is allowed.
- **Not seen:** the dashboard itself. Every `/dashboard/*` and `/apercu/*` URL answers `307 → /login` from middleware, and I didn't create an account. Screen layouts and form fields inside the app are therefore unknown. The route list below shows that each screen exists; it doesn't show what is on it.

## Product in one line

You paste a YouTube URL, a transcript or a voice memo and pick a format. AI writes the lead magnet and a hosted capture page in about a minute. You put the link in the video description, and the contacts collect in the dashboard. Minute Lead sends no marketing emails itself.

## Route map (observed in a client chunk)

The client bundle carries a 50-entry route list. The app-relevant ones:

| Route                                                                             | Meaning (inferred from the name, plus guide text where cited)                                             |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `/:userSlug/:magnetSlug`, `/p/:id`                                                | Public capture page: a readable slug on Pro, an id otherwise (guide: "Réglage 1 : l'adresse de la page")  |
| `/apercu/:id`                                                                     | Preview of a page before publishing                                                                       |
| `/dashboard`                                                                      | Overview: page views and contacts per page (FAQ: "le nombre de vues de la page et le nombre de contacts") |
| `/dashboard/create`, `/dashboard/edit/:id`                                        | Generate or edit a lead magnet                                                                            |
| `/dashboard/create-capture`, `/dashboard/capture/new`, `/dashboard/edit-page/:id` | Capture page creation and editing, separate from the magnet                                               |
| `/dashboard/publish`, `/dashboard/promote/:id`                                    | Publish step and a "promote" kit (where to put the link)                                                  |
| `/dashboard/magnets`, `/dashboard/leads`                                          | Lists                                                                                                     |
| `/dashboard/persona`                                                              | Three fields: audience, main pain, offer. They are fed into generation (FAQ)                              |
| `/dashboard/branding`                                                             | Colors, logo, page address (FAQ)                                                                          |
| `/dashboard/integrations`                                                         | CSV export, a webhook per new contact (Zapier, Make, n8n), Systeme.io with a tag (guide + FAQ)            |
| `/dashboard/account`, `/affiliate`, `/admin`, `/signalements(/idees)`             | Billing, affiliate program, internal admin, bug and idea reports                                          |
| `/profile-setup`, `/success`                                                      | Onboarding, page after Stripe checkout                                                                    |

API paths found in the bundles:

| Path                                                                       | Purpose                                      |
| -------------------------------------------------------------------------- | -------------------------------------------- |
| `/api/generate`                                                            | Generate a lead magnet                       |
| `/api/trial-draft`                                                         | Try generation without an account            |
| `/api/youtube-transcript`, `/api/voice-transcript`                         | Turn a video or voice memo into a transcript |
| `/api/submit-lead`                                                         | Store a lead from a capture page             |
| `/api/track-landing`                                                       | Count capture page views                     |
| `/api/testimonials`                                                        | Testimonials                                 |
| `/api/stripe/checkout`, `/api/stripe/claim-session`, `/api/lifetime-seats` | Payments                                     |

`/api/broadcast` in the bundle belongs to the Supabase Realtime client, not to email broadcasts.

## Capture page behavior (observed in the form component)

- `POST /api/submit-lead` with a JSON body. The client adds `utm_source`, `utm_medium` and `utm_campaign` from the page URL.
- Fields:
  - email, checked with the regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`
  - consent checkbox (`capture.consentRequired`)
  - optional `first_name` and `phone`, switched on per page
- No captcha or honeypot field shows up in that chunk.
- The resource is rendered from **markdown**, with the brand color and a **print stylesheet** (`print:block print-header` plus the logo). "Download as PDF" is therefore the browser's print, not a generated PDF.
- The markdown renderer, a "steps" renderer and the quiz result strings (`capture.yourProfile`, `capture.ourRecommendation`) ship in the same chunk as the form. _Inference:_ the visitor gets the resource on the page right after submitting, not by email.

## Lifecycle (from their own guides)

- Generation is written from your own transcript. You edit by typing a one-line instruction ("change le titre", "enlève le jargon").
- The capture page is created along with the magnet, with a form and an unticked consent checkbox.
- You get **an email for each new contact, plus a Monday recap** in weeks with new contacts.
- The guide's advice for the first ~30 contacts: write to each one personally ("Tu as récupéré la checklist hier, qu'est-ce qui coince le plus chez toi ?"). Automated emails only come in "à trois cents contacts par mois".
- GDPR: an unticked checkbox that names what the person signs up for ("la ressource et tes emails"), no reuse of the list, and an unsubscribe link in every email. Double opt-in is called optional in France: it costs 10 to 20 % of contacts.
- The metrics to watch are page views (the traffic problem) and then view-to-email conversion. They say under 20 % means the promise doesn't match the video. Their platform average is quoted as 34.9 % on the homepage and 37.7 % in the guide.

## Stack (observed)

- Next.js (App Router, RSC fetches), with fonts from Fontshare.
- **Supabase** client in the browser bundle (`.from("user_profiles")`).
- Stripe checkout.
- Sentry, with an EU (`ingest.de`) endpoint.
- A self-hosted analytics script at `/64a7817e1f48b5fa/script.js`.
- Sign-in with **Google OAuth, or email and password**.
- FR and EN, with persona landing pages: `/podcast`, `/newsletter`, `/linkedin`, `/instagram`, `/entrepreneur`.
- The transactional email provider is not visible.

## What this means for HQ

These are the parts worth keeping for a one-person tool:

1. **A hosted markdown resource with print CSS, revealed right after submit.** This needs no PDF tooling and no delivery wait.
2. **One capture page per magnet** with email, an unticked consent box and UTM capture.
3. **A view counter and a lead counter per page.** That is the whole analytics story.
4. **An email to the owner for each lead**, so I can write back personally. That replaces sequences until the list is big.
5. **CSV export.**

Everything else is dropped:

- the quiz, simulator, infographic and prompt formats
- persona, branding, user slugs
- integrations, voice memo, YouTube transcript fetching
- preview and promote pages
- the weekly recap, billing, affiliate program, admin, bug reports
