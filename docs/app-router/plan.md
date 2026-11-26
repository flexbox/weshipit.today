# apps/web: Pages Router → App Router migration plan

Written 2026-11-25, against Next.js 16.4.6 and React 19.3.1. Facts about the
code were read from the repo on that date; facts about Next.js come from the
bundled docs in `node_modules/next/dist/docs/` (read them again before each
phase, as `apps/web/AGENTS.md` asks).

## Progress

Updated 2026-11-26. Phases 0 and 1 are done on the branch
`feat/app-router-phase-0-1` (not committed yet). The pilot's answer to the
go/no-go question is **go**: `/plan/[slug]` went from 251 kB to 144 kB of
JavaScript, see [Pilot results](#pilot-results).

### Phase 0: safety net

- [x] Head snapshot: `check-seo.mjs --snapshot` writes
      `apps/web/scripts/head-snapshot.json` (409 pages),
      `--snapshot-check` diffs a build against it
- [x] `check-seo.mjs` reads `server/pages` and `server/app`
- [x] `generate-sitemap.mts` reads `pages/` and `app/`; the sitemap is
      byte-identical (403 URLs)
- [x] `scripts/measure-js.mjs`: JS per route measured in Chrome, both routers
- [x] Baseline recorded for the five sample routes
- [x] `pages/plan/*.md` → `content/plan/` (readers updated: `next.config.js`,
      the sitemap script, the plan page, `.github/workflows/plan.yml`)
- [x] `pages/styles.css` → `styles/globals.css`
- [x] Fonts → `utils/fonts.ts`
- [x] `libs/ui` Footer: `usePathname()`, in a small client leaf
      (`footer-nav-link.tsx`) so the footer itself stays a Server Component
- [x] `libs/ui` TypeFilter: `useSearchParams()`
- [x] `libs/ui` HeaderLogo: `window.location.assign('/brand')`
- [x] `'use client'` added to 8 `libs/ui` components (the plan said 5; the
      build found `avatar`, `count-up` and `phone-schematic` too)
- [x] Specs updated (`footer`, `header`, `type-filter`): `next-router-mock`
      0.9 has no `next/navigation` entry, so the two hooks are mocked by hand
- [x] Footer and TypeFilter stories take `nextjs: { appDirectory: true }`
- [x] Gates: typecheck, `nx test web`, `nx test ui`, build, Storybook build;
      head snapshot identical on all 409 pages

### Phase 1: foundations and pilot

- [x] Root layouts `app/(en)/layout.tsx` and `app/(fr)/layout.tsx`, sharing
      `components/root-document.tsx`
- [x] `utils/seo/metadata.ts`: `baseMetadata`, `baseViewport`,
      `buildMetadata()`
- [x] `components/json-ld.tsx` and `components/linkedin-og-image.tsx`
- [x] `components/page-shell.tsx` (the shell without SEO). `Layout` now
      wraps it with `<NextHead>` and stays for the Pages Router pages
- [x] `instrumentation-client.ts` starts analytics for both routers
      (verified on a Pages route and an App route); the effect in `_app`
      is removed
- [x] 404 settled: `app/global-not-found.tsx` with
      `experimental.globalNotFound`, plus `not-found.tsx` in each root layout
- [x] Pilot `/plan/[slug]` on the App Router; `pages/plan/[slug].tsx` deleted
- [x] Barrel check done: server files must import `@weshipit/ui` components
      by path. Guarded by `utils/server-imports.spec.ts`
- [x] Gates: typecheck, tests, build, route table, `check-seo.mjs`, browser
      checks (no console or hydration error, sidebar, mobile select, mobile
      menu, link to a Pages Router page), PostHog parity with `/wsi` stubbed
- [x] Head snapshot: one explained difference on the 33 plan pages, then
      the snapshot was updated
- [ ] Vercel preview checks (gate 8): need a pushed branch

### Still to do

- [ ] Commit and open the pull request for phases 0 and 1
- [ ] Decision 5: delete `/home` and `/og-preview`, or port them
- [ ] Phase 2: glossary and podcast (4 routes)
- [ ] Phase 3: directories and tools (9 routes)
- [ ] Phase 4: English landing pages (17 routes)
- [ ] Phase 5: French landing pages (9 routes)
- [ ] Phase 6: HQ and capture pages (6 routes)
- [ ] Phase 7: cleanup

## Pilot results

Measured on 2026-11-26 with `node apps/web/scripts/measure-js.mjs`
(JavaScript executed by the page, gzipped, link prefetching off).

| Route                           | Before         | After phases 0 and 1   |
| ------------------------------- | -------------- | ---------------------- |
| `/plan/2026-W42`                | 251 kB (Pages) | **144 kB (App), −43%** |
| `/`                             | 225 kB         | 228 kB (still Pages)   |
| `/react-native-glossary/hermes` | 227 kB         | 230 kB (still Pages)   |
| `/audit`                        | 186 kB         | 188 kB (still Pages)   |
| `/pricing`                      | 173 kB         | 176 kB (still Pages)   |

What the pilot taught, in order of importance:

1. **Never import from the `@weshipit/ui` barrel in a server file.** With
   `import { Prose } from '@weshipit/ui'` the page shipped 241 kB: Next.js
   sent every client component the barrel re-exports (Headless UI listbox,
   combobox, tabs and so on). Importing by path
   (`@weshipit/ui/prose/prose`, a new alias in `tsconfig.base.json`) gave
   144 kB. `optimizePackageImports` did not help, and `sideEffects: false`
   was already set. `utils/server-imports.spec.ts` fails if a server file
   under `app/` reaches the barrel.
2. **Pages not yet migrated pay about 3 kB.** `usePathname` and
   `useSearchParams` in `libs/ui` pull `next/navigation` into the Pages
   Router bundle. It goes away as pages move.
3. **The App Router's own runtime is larger** than the Pages Router's: about
   136 kB on the plan page before any page code. The gain comes only from
   page code that stops shipping, so pages that are mostly interactive will
   gain little.
4. **One head difference, explained.** The Metadata API copies the Open Graph
   title, description and image into `twitter:title`, `twitter:description`
   and `twitter:image*`. `next-seo` left them out and X fell back to the
   Open Graph tags. Every other tag is identical, including the LinkedIn
   image tag, which React does hoist into `<head>`.
5. **The 404 page did break.** As soon as `app/` exists, an unmatched URL
   gets the App Router's 404, not `pages/404.tsx`; with two root layouts
   that was the bare Next.js page. `app/global-not-found.tsx` restores the
   designed page. `pages/404.tsx` is now only used when a Pages Router page
   answers `notFound: true`.
6. **PostHog treats an automated browser as a bot** (`navigator.webdriver`)
   and sends nothing. The parity check has to override that flag.
7. `apps/davidl-fr` fails `tsc` with 251 errors, with or without this work.
   It is not a gate for `apps/web`.

## Why migrate

The audit of 2026-11-25 (commit `62c0e62`) removed what could be removed in
the Pages Router. What is left is JavaScript that only Server Components can
take out of the browser:

- `react-markdown` (about 34 kB gz) ships on `/`, the glossary, podcast,
  tools, migration and plan pages. Prism (about 15 kB) ships on glossary
  terms, `rehype-raw`'s HTML parser (about 54 kB) on plan pages.
- Each static landing page ships 45–60 kB of page JS that is only JSX to
  hydrate.
- The glossary figure CSS (about 5 kB) loads on every page, because the
  Pages Router only allows global CSS in `_app`.

First baseline (JS, gzipped, after `62c0e62`, read from
`build-manifest.json`):

| Route                          | Today  | Estimate after migration    |
| ------------------------------ | ------ | --------------------------- |
| Shared by every page           | 120 kB | to be measured in the pilot |
| `/`                            | 216 kB | about 185 kB                |
| `/plan/[slug]`                 | 240 kB | about 130 kB                |
| `/react-native-glossary/[uid]` | 208 kB | about 150 kB                |
| `/audit`                       | 178 kB | about 150 kB                |
| `/pricing`                     | 166 kB | about 135 kB                |

The right-hand column is an estimate, not a measurement. Only
`/plan/[slug]` has been measured so far: see [Pilot results](#pilot-results),
which uses a different method (a real browser), so its "before" numbers are
7 to 11 kB higher than this table.

What the migration will not do: shrink the HTML. Podcast episode pages are
600–800 kB of HTML because of the transcript, in either router.

## Scope

- 46 routes in `apps/web/pages` plus the 404 page.
- 13 API routes in `pages/api`. They keep working unchanged next to `app/`
  and stay where they are until the optional last phase.
- `libs/ui` (shared with Storybook): 13 components already carry
  `'use client'`, 5 more need it, 3 import `next/router`.
- `scripts/generate-sitemap.mts`, `scripts/check-seo.mjs` and
  `next.config.js` all read from `pages/`.

Out of scope: `apps/davidl-fr` (stays on the Pages Router), any redesign,
Cache Components.

## Decisions

Each one has a recommendation. Phases 0 and 1 were built on
recommendations 1 to 3; decision 5 is still open.

1. **Caching model: keep the previous model, do not enable
   `cacheComponents`.** `getStaticProps`, `revalidate` and
   `fallback` map one to one onto `generateStaticParams`,
   `export const revalidate` and `dynamicParams`, which Next 16 still supports
   when Cache Components is off. Turning the flag on at the same time would
   be two migrations at once. Revisit it after phase 7.
2. **`<html lang>`: two root layouts, `app/(en)/layout.tsx` and
   `app/(fr)/layout.tsx`.** It keeps the correct language in the HTML with no
   client-side patch (today `_document` plus an effect in `_app` do it). The
   cost: a link between an English and a French page is a full page load.
   Two root layouts also mean no single layout can render the 404 page.
   Settled in phase 1 with `app/global-not-found.tsx`, which needs the
   experimental `globalNotFound` flag. If that flag is ever a problem, the
   fallback is one root layout with `lang="en"` and `lang="fr"` on the
   `<main>` of French pages.
3. **API routes stay in `pages/api` until phase 7**, and phase 7 is optional.
   The docs state they keep working unchanged, and moving them gains no
   browser JS.
4. **HQ and `/r` go last.** They are the only pages that read cookies or the
   database per request, and they gain the least (private, single user).
5. **Delete instead of port** (please confirm): `/home` is an unused
   alternate hero and `/og-preview` is a dev tool. Both are `noindex`.

## Target structure

```
apps/web/
  app/
    (en)/
      layout.tsx            <html lang="en">, fonts, analytics, base metadata
      not-found.tsx
      page.tsx              /
      plan/[slug]/page.tsx
      react-native-glossary/{page.tsx,[uid]/page.tsx,[uid]/figures.css}
      react-native-tools/{page.tsx,[slug]/page.tsx}
      …                     the other English pages
    (fr)/
      layout.tsx            <html lang="fr">
      bonjour/page.tsx
      podcast/{page.tsx,[slug]/page.tsx}
      hq/…                  HQ interface is in French
      …                     the other French pages
    global-not-found.tsx    404 for unmatched URLs (own <html>)
  components/               unchanged, plus small client leaves
  content/plan/*.md         moved out of pages/plan
  styles/globals.css        moved out of pages/styles.css
  utils/seo/metadata.ts     replaces components/next-head.tsx
  utils/fonts.ts            Inter + Space Grotesk, shared by both routers
  pages/api/…               unchanged
```

Which pages are French is already defined in `utils/page-lang.ts`: the nine
French landing pages and everything under `/podcast`. The head snapshot
(phase 0) proves no page changes language by accident.

## Phase 0: safety net (no visible change)

Everything here ships on the Pages Router and makes the later phases
checkable.

1. **Head snapshot.** Add a `--snapshot` mode to `scripts/check-seo.mjs` that
   writes, for every built page: `<html lang>`, title, description,
   canonical, robots, every `og:*` and `twitter:*` tag, hreflang links and
   the parsed JSON-LD. Commit the snapshot. Every later phase diffs against
   it; an unexplained difference blocks the merge.
2. **Make both scripts router-agnostic.** `check-seo.mjs` reads
   `server/pages/*.html` and `pages-manifest.json`; teach it
   `server/app/**/*.html` too. `generate-sitemap.mts` lists routes from
   `pages/*.tsx`; teach it `app/**/page.tsx` (ignoring `(group)` folders).
3. **JS size script.** `build-manifest.json` only describes Pages Router
   routes. Write one script that works for both routers: serve the build,
   open each sample route in Chrome through Playwright
   (`channel: 'chrome'`) and sum the gzipped JS responses. Record today's
   numbers for the six routes in the table above.
4. **Move files that must not live in `pages/`.**
   `pages/plan/*.md` → `content/plan/` (three readers: `latestPlanSlug()` in
   `next.config.js`, the sitemap script, `pages/plan/[slug].tsx`).
   `pages/styles.css` → `styles/globals.css`. Font definitions from `_app`
   → `utils/fonts.ts`.
5. **Make `libs/ui` work in both routers.** These hooks from
   `next/navigation` are documented to work in the Pages Router too
   (they can return `null` there before the router is ready):
   - `footer.tsx`: `useRouter().pathname` → `usePathname()`.
   - `type-filter.tsx`: `router.query.type` → `useSearchParams()`.
   - `header-logo.tsx`: `router.push('/brand')` on right-click →
     `window.location.assign('/brand')`. It is an easter egg and needs no
     router.
   - Add `'use client'` to `airtable-toggle-form`, `avatar-avengers`,
     `header-logo`, `search-bar` and `type-filter` (`mobile-menu` is only
     imported by the client `header`).
   - Update `header.spec.tsx` and `type-filter.spec.tsx`, which mock
     `next/router`. Check that `next-router-mock` 0.9 covers
     `next/navigation`; if not, mock the two hooks by hand.
   - Check Storybook (`@storybook/nextjs-vite`) still renders Footer and
     TypeFilter; stories that need `next/navigation` take the
     `nextjs: { appDirectory: true }` parameter.

Exit: typecheck, tests and build pass; the head snapshot is identical before
and after; Storybook builds.

## Phase 1: foundations and the pilot (`/plan/[slug]`)

**Foundations**

- `app/(en)/layout.tsx` and `app/(fr)/layout.tsx`: `<html>` with the
  `bg-background` class, `<body>` with the font classes from
  `utils/fonts.ts`, `globals.css`, `<Analytics />` and `<SpeedInsights />`
  from the `/next` entry points.
- Base metadata in a shared constant used by both layouts: `metadataBase`,
  `title.template` (`%s — weshipit.today`) and default, icons, manifest,
  author, Twitter card. `theme-color` and the viewport go in
  `export const viewport`.
- `utils/seo/metadata.ts`: `buildMetadata({ path, seoTitle, seoDescription,
ogImageTitle, ogImageKicker, ogImageSubline, ogImagePodcast, ogImageAlt,
locale, noindex, languages })` returns a `Metadata` object. It reuses
  `buildOgImagePath` and takes the same props `Layout` takes today, so each
  page conversion is mechanical. Two things differ from `next-seo`:
  - The canonical no longer comes from the router. Each page passes its own
    `path`; dynamic routes build it from `params`.
  - A page's `openGraph` replaces the layout's instead of merging, so the
    helper always returns the full object.
- The LinkedIn tag (`<meta name="image" property="og:image">`) cannot be
  expressed in the Metadata API. Render it as a plain `<meta>` in the page:
  React 19 hoists it into `<head>`. Verify in the snapshot.
- `<JsonLd data={…} />` server component, escaping `<` as `<` as the
  Next JSON-LD guide recommends. JSON-LD moves from `<Head>` to the page body.
- The shell (banner, header, main, footer) moves to
  `components/page-shell.tsx`, with no SEO props. `components/layout.tsx`
  wraps it with `<NextHead>` for the pages not yet migrated, and goes away
  with the last of them.
- Analytics: move `initAnalytics()` to `apps/web/instrumentation-client.ts`
  so one file initialises PostHog for both routers. Confirmed in the
  browser: it runs on Pages Router pages too.
- `outputFileTracingIncludes` and `proxy.ts` need no change yet.

**The 404 page (settled).** With two root layouts, an unmatched URL has no
layout to render in, and it stopped using `pages/404.tsx` the moment `app/`
existed: the build served the bare Next.js page. `app/global-not-found.tsx`
(experimental `globalNotFound` flag) now renders the designed page as a
whole document. Each root layout also has a `not-found.tsx` for pages that
call `notFound()`.

**Pilot: `/plan/[slug]`** (33 pages, self-contained, largest expected win)

- `generateStaticParams` from `content/plan`, `dynamicParams = false`.
- The page is a Server Component: `gray-matter`, `react-markdown`,
  `remark-gfm` and `rehype-raw` stop shipping to the browser.
- `components/plan-sidebar.tsx` stays a Server Component: each page is
  built for one slug, so the active link is known on the server. Only the
  mobile dropdown, `components/plan-nav-select.tsx`, is a client leaf
  (`useRouter` from `next/navigation`), and it receives the slugs only.
- Read the markdown through one loader wrapped in React `cache()`, so
  `generateMetadata` and the page do not parse the same file twice.

Exit, and the go/no-go for everything after: head snapshot identical for all
plan pages; measured JS for `/plan/[slug]`; a check that importing from the
`@weshipit/ui` barrel in a server page does not drag unrelated client
components into the route (if it does, import by path or add the package to
`optimizePackageImports`). If the measured gain is far below the estimate,
stop and reassess before phase 2.

## Phases 2 to 6: route clusters

One pull request per phase. Routes move in clusters that link to each other,
because a link between a migrated and a non-migrated page is a full page
load and is not prefetched.

### Per-route recipe

1. Create `app/(en|fr)/<route>/page.tsx` as a Server Component. Move the
   body of `getStaticProps` into the component (or a loader next to it).
   `params` is a Promise: `const { slug } = await params`.
   **Import UI components by path** (`@weshipit/ui/text/text`), never from
   the `@weshipit/ui` barrel, in the page and in every component it renders
   that is not `'use client'`. `<Layout>` becomes `<PageShell>`.
2. `getStaticPaths` → `generateStaticParams`. `fallback: false` →
   `export const dynamicParams = false`. `revalidate: n` →
   `export const revalidate = n`. `notFound: true` → `notFound()`.
3. `<Layout seo… >` → `export const metadata = buildMetadata(…)`, or
   `generateMetadata` for dynamic routes. hreflang `<link>` tags →
   `alternates.languages`. JSON-LD → `<JsonLd>`. Add
   `<LinkedInOgImage seo={…} />` with the same object.
4. Anything using state, effects, event handlers or router hooks moves into
   a client leaf in `components/`. The page passes it only the fields it
   renders. Pass rendered elements, never component references or functions.
5. Delete the file in `pages/`.
6. Run the gates (see Verification). The head snapshot will show the new
   `twitter:*` tags on the migrated pages and nothing else; then update it
   with `--snapshot`.

### Phase 2: content (4 routes, about 290 pages)

| Route                          | Notes                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/react-native-glossary/[uid]` | Markdown and Prism render on the server. Add `'use client'` to `components/glossary-figures.tsx`: that one directive covers the 40 anatomy files below it, and `next/dynamic` keeps each figure in its own chunk. Move the eight figure and code CSS imports from `_app` into this route. The page's own `useState` goes into a leaf. |
| `/react-native-glossary`       | Search and filter state (`useState`, `useEffect`) becomes a client leaf fed a trimmed term list: slug, title, category, summary.                                                                                                                                                                                                      |
| `/podcast/[slug]` (fr)         | Article markdown renders on the server. The effect that opens the transcript when the URL ends in `#transcript` becomes a small client leaf.                                                                                                                                                                                          |
| `/podcast` (fr)                | Filter state becomes a client leaf.                                                                                                                                                                                                                                                                                                   |

### Phase 3: directories and tools (9 routes)

| Route                                                                                                          | Notes                                                                                                                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/react-native-tools/[slug]`                                                                                   | `dynamicParams = true`, `revalidate = 86400`. A removed tool calls `permanentRedirect('/react-native-tools')`. `proxy.ts` keeps handling `?id=`.                                                                                       |
| `/react-native-tools`                                                                                          | Reads `?type=`. Put the filtered list in a client leaf wrapped in `<Suspense>` so the page stays static. Pass a trimmed list: `tools.fixture.ts` is 94 kB and should not travel whole. Drop `revalidate: 3600`, the data is a fixture. |
| `/devtools`                                                                                                    | Same pattern for `?feature=`. The App Store icon fetches stay at build time.                                                                                                                                                           |
| `/is-react-native`                                                                                             | `revalidate = 86400`. `is-react-native-checker.tsx`: `router.query`/`isReady` → `useSearchParams()`, shallow `router.replace` → `window.history.replaceState`. Wrap in `<Suspense>`.                                                   |
| `/french-react-native-apps`                                                                                    | Filter state becomes a client leaf.                                                                                                                                                                                                    |
| `/react-native-starters`, `/react-native-resources`, `/react-native-ui-inspiration`, `/react-native-migration` | Straight conversions; `react-markdown` on the migration page renders on the server.                                                                                                                                                    |

### Phase 4: English landing pages (17 routes and the 404)

`/`, `/about`, `/pricing`, `/audit`, `/consulting`, `/customers`,
`/react-native-security-audit`, `/react-native-testing`,
`/react-native-swift-package-manager-migration`,
`/xcode-device-hub-alternatives`, `/retreat`, `/brand`, `/onboarding`,
`/qr`, `/desabonnement`, plus `/home` and `/og-preview` unless deleted, and
`not-found.tsx`.

- Most are JSX with no state: the page becomes a Server Component and only
  Header, FAQ, the reveals and the forms hydrate.
- `/` and `/consulting` use `useState`/`useEffect` in the page file; extract
  those parts. `react-markdown` on `/` renders on the server.
- `components/self-audit-quiz.tsx`, used by the security, SPM and stack
  audits, needs `'use client'`.
- `/` and `/bonjour` point at each other with hreflang; `/` moves here,
  `/bonjour` in phase 5, so the snapshot must hold across both.
- `/about` computes the current year at render. In a static Server Component
  that freezes at build time, which is the same behaviour as today.

### Phase 5: French landing pages (9 routes)

`/agentic-sprint`, `/audit-gratuit`, `/avis-incubateur-solopreneur`,
`/bonjour`, `/code-reduction-solopreneur`, `/flavie-prevot-avis`,
`/incubateur-solopreneur-vs-marketing-mania`, `/partenaires`,
`/sprint-solo-saas`.

These are the longest files (700 to 1,200 lines) and the pages that earn
money, so they go after the pattern has been proven four times. Each keeps
its hreflang pair and its JSON-LD.

### Phase 6: HQ and capture pages (6 routes)

`/hq`, `/hq/leads`, `/hq/login`, `/hq/magnets/[id]`, `/r/[slug]`,
`/r/[slug]/[token]`.

- **Session refresh must move to `proxy.ts`.** Today `getServerSideProps`
  can write refreshed Supabase cookies on the response. A Server Component
  can read cookies but cannot write them. Extend the `proxy.ts` matcher to
  `/hq/:path*` and refresh the session there, as the `@supabase/ssr` guide
  for the App Router describes.
- Add a `cookies()`-based variant of `createHqAuthClient` for Server
  Components. Keep the `(req, res)` variant for the API routes.
- `requireOwnerPage(ctx)` → `requireOwner()`, which calls
  `redirect('/hq/login')`. Call it in every HQ page, not only in a layout:
  layouts do not re-run on navigation.
- `utils/hq/supabase.ts` can now import `server-only` instead of the runtime
  `window` guard.
- Set `export const dynamic = 'force-dynamic'` on all six routes. The token
  page in particular must never be cached.
- `hq-shell`, `lead-magnet-form` and `leads-table` get `'use client'` and
  the `next/navigation` hooks.
- Login, logout and callback stay as API routes; forms keep posting to them.

## Phase 7: cleanup

- Delete `pages/_app.tsx`, `pages/_document.tsx`, `pages/404.tsx`,
  `components/next-head.tsx`, `utils/page-lang.ts`.
- `apps/web` and `libs/ui` no longer import `next-seo` or
  `next-router-mock`. The root `package.json` is shared with
  `apps/davidl-fr`, which still uses `next-seo`, so remove a package only
  when no app imports it.
- Simplify the two scripts back to one router.
- Update `docs/` and the project memory that describe the Pages Router.

Optional, each its own pull request:

- **API routes → Route Handlers.** The one with a real gain is
  `/api/lm/subscribe`: the visitor waits for the email, Slack and audience
  calls. In a Route Handler they can run in `after()` and the response
  returns as soon as the lead is stored. `/api/og` and `/api/podcast-og`
  need their `outputFileTracingIncludes` keys rechecked if they move.
- **`app/sitemap.ts`** instead of the pre-build script.
- **`/r/[slug]` as a cached page**, revalidated by tag when a magnet is
  saved in HQ, instead of a database read per visit.
- **Cache Components**, with the `next-cache-components-adoption` skill.

## Verification (every phase)

1. `npx nx typecheck web`, `npx nx test web`, `npx nx build web`, plus
   `npx nx test ui` when `libs/ui` changed. Lint is not a gate (known
   monorepo config error).
2. Head snapshot diff (`check-seo.mjs --snapshot-check`): empty, or every
   difference explained in the pull request.
3. `node apps/web/scripts/check-seo.mjs`: no errors.
4. Build route table: every public page is static or SSG. Only `/hq/*`,
   `/r/*` and the API routes are dynamic. A page that turns dynamic by
   accident is the most likely silent regression.
5. Headless Chrome on the migrated routes: no hydration or console errors;
   reveals, mobile menu, FAQ, filters and forms work.
6. PostHog parity with `**/wsi/**` stubbed: one pageview per navigation and
   the same conversion events on Cal, Stripe and Gumroad links. Build with a
   dummy `NEXT_PUBLIC_POSTHOG_KEY`, override `navigator.webdriver` in the
   test browser, then rebuild without the key.
7. JS size for the migrated routes (`measure-js.mjs`), recorded in the pull
   request.
8. On the Vercel preview: one OG image, one podcast OG image, the PostHog
   `/wsi` rewrite, the `/plan` redirect and a `?id=` tool link.

## Risks

| Risk                                                                                        | Mitigation                                                                  |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| SEO tags drift (canonical, hreflang, OG, JSON-LD) across 46 pages                           | Head snapshot from phase 0, diffed in every phase                           |
| A static page becomes dynamic (a stray `cookies()`, `useSearchParams` without `<Suspense>`) | Route table check in every phase                                            |
| Full page loads between routers while both exist                                            | Migrate linked clusters together; keep phases 2 to 5 close in time          |
| HQ session stops refreshing                                                                 | Proxy refresh in phase 6; test a session older than one hour before merging |
| 404 page with two root layouts                                                              | Settled in phase 1, with a documented fallback                              |
| The gain is smaller than estimated                                                          | Pilot measures it before phases 2 to 7 start                                |
| `libs/ui` changes break Storybook or the other apps                                         | Phase 0 lands them alone, with Storybook and `nx test ui` as gates          |
