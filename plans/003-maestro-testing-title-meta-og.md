# Plan 003: Optimize the Maestro testing page title tag, meta description & OG image alt

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 99172de..HEAD -- apps/web/pages/react-native-testing.tsx apps/web/components/next-head.tsx`
> If either file changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding; on a mismatch,
> treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (independent of 002; both edit the same file's different regions)
- **Category**: seo (on-page)
- **Planned at**: commit `99172de`, 2026-07-02

## Why this matters

The page's `<title>` is `"Mobile App Testing with Maestro for React Native"`.
It's serviceable but: (a) omits the highest-intent search phrase people actually
type — "end-to-end" / "E2E"; and (b) has no brand suffix, while the site's own
convention appends `| weshipit.today` (see `bonjour.tsx:867`). The page also
passes `ogImageTitle` but no `ogImageAlt`, so social/share cards fall back to a
generic global alt (`"Hire React Native Developers as a Service"`,
`next-head.tsx:53`) that is unrelated to this page. Tightening the title,
sharpening the meta description around the target keywords, and setting a
page-specific OG alt are pure-upside on-page SEO with zero rendering risk.

## Current state

- `apps/web/pages/react-native-testing.tsx` — the target page. The SEO strings
  live on the `Layout` props in the default export, `react-native-testing.tsx:584-596`:

  ```tsx
    return (
      <Layout
        withFooter
        seoTitle="Mobile App Testing with Maestro for React Native"
        seoDescription="Productized end-to-end testing setup for React Native apps using Maestro. We write YAML flows for your 5 core user journeys, wire CI, and hand off in 2 weeks. Flat fee."
        ogImageTitle="Mobile testing for React Native, done in 2 weeks"
        withHeader
        callToActionButton={{
          name: 'Book a call',
          href: linksApi.cal.ONBOARDING,
          isExternalLink: true,
        }}
      >
  ```

- How these props are consumed — `apps/web/components/next-head.tsx`:

  - `seoTitle` → `<title>` and `og:title` (`next-head.tsx:63,68`). It is used
    **verbatim** — there is no automatic `| weshipit.today` suffix, so the brand
    must be written into `seoTitle` itself (which is exactly what `bonjour.tsx`
    does).
  - `seoDescription` → meta description + `og:description` (`next-head.tsx:64,69`).
  - `ogImageTitle` → rendered into the generated OG image via `/api/og`
    (`next-head.tsx:37-46`). Leave this as-is unless a step says otherwise.
  - `ogImageAlt` (a valid `Layout`/`NextHead` prop, `next-head.tsx:15,53`) →
    `og:image` `alt`. Currently NOT passed by this page, so it defaults to the
    generic `'Hire React Native Developers as a Service'`.

- Brand-suffix convention exemplar — `apps/web/pages/bonjour.tsx:867`:
  ```tsx
  seoTitle = 'Ton app React Native ralentit ? On la transforme en machine à shipper | weshipit.today';
  ```
  and it sets a page-specific alt at `bonjour.tsx:870`:
  ```tsx
  ogImageAlt = 'weshipit.today — Experts React Native. 5k/mois. Ship tous les jours.';
  ```

## Commands you will need

| Purpose   | Command                | Expected on success                         |
| --------- | ---------------------- | ------------------------------------------- |
| Typecheck | `npx nx typecheck web` | exit 0, "Successfully ran target typecheck" |
| Build     | `npx nx build web`     | exit 0, "Successfully ran target build"     |

**Do NOT gate on `npx nx lint web`** — it fails for a pre-existing, unrelated
monorepo eslint-config error, not caused by your change.

## Scope

**In scope** (the only file you should modify):

- `apps/web/pages/react-native-testing.tsx`

**Out of scope** (do NOT touch):

- `apps/web/components/next-head.tsx` and `layout.tsx` — read-only reference;
  the `ogImageAlt` prop already exists and needs no changes.
- The JSON-LD schema blocks (plan 002 owns those).
- Any visible page copy / JSX sections.
- The `ogImageTitle` value — keep it (it drives the generated share image).

## Git workflow

- Branch: `advisor/003-maestro-testing-title-meta-og`
- Conventional-commit style. Suggested message:
  `feat: optimize title/meta/og-alt for Maestro testing page SEO`
- Do NOT push or open a PR unless the operator asks.

## Steps

### Step 1: Update `seoTitle`, `seoDescription`, and add `ogImageAlt`

In `apps/web/pages/react-native-testing.tsx`, in the `Layout` props of the
default export, make exactly these three changes:

1. Replace `seoTitle`:

   ```tsx
   seoTitle = 'React Native E2E Testing with Maestro | weshipit.today';
   ```

   (Adds the high-intent "E2E Testing" phrase and the brand suffix. Length ≈ 58
   characters incl. suffix — within Google's ~60-char display budget.)

2. Replace `seoDescription`:

   ```tsx
   seoDescription = 'Done-for-you end-to-end (E2E) testing for React Native apps with Maestro. We write YAML flows for your 5 core user journeys, wire CI/CD, and hand off in 2 weeks — one flat fee. A simpler alternative to Detox.';
   ```

   (Front-loads "end-to-end (E2E) testing for React Native … Maestro", keeps the
   flat-fee/2-week proof, and adds the "Detox alternative" intent term already
   present in the page copy. Length ≈ 208 chars — Google truncates around 155–160,
   so the first sentence carries the message; that's intentional.)

3. Add an `ogImageAlt` prop (it does not exist yet). Place it directly after the
   `ogImageTitle` line:
   ```tsx
   ogImageTitle = 'Mobile testing for React Native, done in 2 weeks';
   ogImageAlt = 'React Native E2E testing with Maestro — 5 flows, CI wired, handed off in 2 weeks. weshipit.today';
   ```

The resulting `Layout` opening tag should read:

```tsx
    <Layout
      withFooter
      seoTitle="React Native E2E Testing with Maestro | weshipit.today"
      seoDescription="Done-for-you end-to-end (E2E) testing for React Native apps with Maestro. We write YAML flows for your 5 core user journeys, wire CI/CD, and hand off in 2 weeks — one flat fee. A simpler alternative to Detox."
      ogImageTitle="Mobile testing for React Native, done in 2 weeks"
      ogImageAlt="React Native E2E testing with Maestro — 5 flows, CI wired, handed off in 2 weeks. weshipit.today"
      withHeader
      callToActionButton={{
        name: 'Book a call',
        href: linksApi.cal.ONBOARDING,
        isExternalLink: true,
      }}
    >
```

**Verify**: `npx nx typecheck web` → exit 0. (`ogImageAlt` is a typed prop on
`NextHeadProps`/`LayoutProps`, so a typo in the prop name would fail here.)

### Step 2: Confirm the strings landed

```bash
grep -c 'React Native E2E Testing with Maestro | weshipit.today' apps/web/pages/react-native-testing.tsx
grep -c 'ogImageAlt=' apps/web/pages/react-native-testing.tsx
```

**Verify**: both commands → `1`.

### Step 3: Full build

**Verify**: `npx nx build web` → exit 0, "Successfully ran target build for project web".

## Test plan

No page-level unit tests exist in this repo and none are warranted for static
metadata strings. Do not scaffold a test framework. Verification is typecheck +
build + the Step 2 greps.

(Optional runtime proof, not a gate: `npx nx serve web`, open
`http://localhost:4200/react-native-testing`, and confirm the browser tab title
is `React Native E2E Testing with Maestro | weshipit.today` and
`<meta name="description">` / `<meta property="og:image:alt">` reflect the new
values.)

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npx nx typecheck web` exits 0
- [ ] `npx nx build web` exits 0
- [ ] `grep -c 'React Native E2E Testing with Maestro | weshipit.today' apps/web/pages/react-native-testing.tsx` → `1`
- [ ] `grep -c 'ogImageAlt=' apps/web/pages/react-native-testing.tsx` → `1`
- [ ] `git status --porcelain` shows only `apps/web/pages/react-native-testing.tsx` modified
- [ ] `plans/README.md` status row for 003 updated

## STOP conditions

Stop and report back (do not improvise) if:

- The drift check shows the file changed since `99172de` and the "Current state"
  excerpt no longer matches.
- `npx nx typecheck web` reports that `ogImageAlt` is not a valid prop — that
  would mean `NextHeadProps` changed; do not force it, report instead.
- `npx nx build web` fails with an error naming `react-native-testing.tsx`.

## Maintenance notes

- Keep `seoTitle` ≤ ~60 characters including the `| weshipit.today` suffix so it
  isn't truncated in SERPs. The current value is ~58.
- If the offer's timeline ("2 weeks") or scope ("5 flows") changes, update the
  meta description and OG alt to stay truthful — they're quoted as concrete
  proof.
- A reviewer should confirm the title still leads with the primary keyword
  ("React Native E2E Testing with Maestro") and that the brand suffix wasn't
  duplicated by any future automatic-suffix change in `next-head.tsx`.
