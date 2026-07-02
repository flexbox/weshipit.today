# Plan 002: Add Service, Offer, BreadcrumbList & Review structured data to the Maestro testing page

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 99172de..HEAD -- apps/web/pages/react-native-testing.tsx`
> If that file changed since this plan was written, compare the "Current state"
> excerpts below against the live code before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: seo (structured-data)
- **Planned at**: commit `99172de`, 2026-07-02

## Why this matters

`apps/web/pages/react-native-testing.tsx` is a productized-service landing page,
but it emits **only** `FAQPage` JSON-LD. Every other comparable page on the site
(`bonjour.tsx`, `avis-incubateur-solopreneur.tsx`, `flavie-prevot-avis.tsx`,
`code-reduction-solopreneur.tsx`, `index.tsx`) ships a richer graph —
`Service`/`ProfessionalService`, `Offer`, `BreadcrumbList`, and `Review`.
Without them, this page is ineligible for breadcrumb and service rich results
that its peers already qualify for, and search engines have a weaker entity
understanding of what the page offers. Adding the missing schema — following the
exact site convention — is a low-risk, high-leverage SEO win.

**Decision already made by the site owner:** the `Review` must NOT contain a
star rating. The on-page testimonial (Maxence Cottel / Nacon) has no genuine
numeric score, and fabricating one violates Google's guidelines. Emit the review
with `author` + `reviewBody` only. Do not add `reviewRating` or
`aggregateRating` anywhere in this plan.

## Current state

- `apps/web/pages/react-native-testing.tsx` — the target page. It is a Next.js
  Pages-Router page (default export `ReactNativeTesting`).
- It already builds ONE JSON-LD block. Current relevant code:

  Top of file (line 12) already imports `Head`:

  ```tsx
  import Head from 'next/head';
  ```

  The FAQ array `faqs` is defined at `react-native-testing.tsx:508-545`.

  The default export, `react-native-testing.tsx:570-616`:

  ```tsx
  export default function ReactNativeTesting() {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    };

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
        <Head>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </Head>
        <main>
          <HeroSection />
          <WhyMaestro />
          <WhatYouGet />
          <Timeline />
          <WhoItsFor />
          <SocialProof />
          <WhoAmI />
          <Faqs />
          <FinalCta />
        </main>
      </Layout>
    );
  }
  ```

**Convention to follow (the exemplar) — `apps/web/pages/bonjour.tsx:773-865`.**
That page defines each schema object as a plain `const` inside the component,
then renders them as sibling `<script type="application/ld+json">` tags inside a
single `<Head>`. Match that shape exactly. Relevant excerpt:

```tsx
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://weshipit.today' },
    { '@type': 'ListItem', position: 2, name: 'Agence React Native', item: 'https://weshipit.today/bonjour' },
  ],
};
// ...
<Head>
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }} />
</Head>;
```

The canonical URL for this page is `https://weshipit.today/react-native-testing`
(the file is `apps/web/pages/react-native-testing.tsx`). The booking URL is
`linksApi.cal.ONBOARDING` = `https://cal.com/davidl/weshipit-onboarding`
(`apps/web/pages/api/links.ts:17-18`).

## Commands you will need

| Purpose     | Command                    | Expected on success                         |
| ----------- | -------------------------- | ------------------------------------------- |
| Typecheck   | `npx nx typecheck web`     | exit 0, "Successfully ran target typecheck" |
| Build       | `npx nx build web`         | exit 0, "Successfully ran target build"     |
| JSON sanity | `node -e "require('...')"` | see Step 3                                  |

**Do NOT gate on `npx nx lint web`** — it fails for a pre-existing, unrelated
reason (a `FlatCompat` / `eslint-plugin-react` circular-structure error in the
monorepo eslint config). That failure is not caused by your change. Ignore lint
for this plan.

## Scope

**In scope** (the only file you should modify):

- `apps/web/pages/react-native-testing.tsx`

**Out of scope** (do NOT touch):

- The FAQ content, hero copy, or any visible JSX/sections — this plan adds
  invisible JSON-LD only, no rendered-DOM changes.
- `seoTitle` / `seoDescription` / `ogImageTitle` on the `Layout` — those are
  handled by plan 003. Leave them exactly as they are.
- Any other page. The schema strings here are specific to this page.
- **Do not add `reviewRating` or `aggregateRating`** (owner decision).

## Git workflow

- Branch: `advisor/002-maestro-testing-structured-data`
- Conventional-commit style (matches `git log`, e.g. `feat: 🎸 …`, `fix: 🐛 …`).
  Suggested message: `feat: add Service/Breadcrumb/Review schema to Maestro testing page`
- Do NOT push or open a PR unless the operator asks.

## Steps

### Step 1: Add the three new schema objects inside the component

In `apps/web/pages/react-native-testing.tsx`, inside
`export default function ReactNativeTesting() {`, immediately **after** the
existing `const faqSchema = { … };` block (ends at line 582) and **before** the
`return (`, add these three constants verbatim:

```tsx
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://weshipit.today',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'React Native E2E Testing with Maestro',
      item: 'https://weshipit.today/react-native-testing',
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'React Native End-to-End Testing with Maestro',
  serviceType: 'Mobile app end-to-end test automation',
  description: 'Productized end-to-end testing setup for React Native apps using Maestro: YAML flows for your 5 core user journeys, CI/CD integration, a tailored runbook, and a recorded team handoff — delivered in 2 weeks for a flat fee.',
  url: 'https://weshipit.today/react-native-testing',
  category: 'Software Testing',
  areaServed: 'Worldwide',
  provider: {
    '@type': 'ProfessionalService',
    name: 'weshipit.today',
    url: 'https://weshipit.today',
    founder: { '@type': 'Person', name: 'David Leuliette' },
  },
  offers: {
    '@type': 'Offer',
    url: 'https://cal.com/davidl/weshipit-onboarding',
    description: 'Flat-fee productized engagement: Maestro installed and wired, 5 core user-journey flows, CI/CD integration, runbook & README, recorded handoff session, and 14 days of follow-up support.',
    availability: 'https://schema.org/InStock',
  },
  review: {
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: 'Maxence Cottel',
      jobTitle: 'QA engineer',
      worksFor: { '@type': 'Organization', name: 'Nacon' },
    },
    reviewBody: 'Went from zero end-to-end tests and 3+ hours of manual QA per release to Maestro flows running on iOS and Android, with CI green on every PR and the e-commerce checkout covered.',
  },
};
```

Note the deliberate omissions: the `Offer` has **no** `price` / `priceCurrency`
(the fee is quoted per-call, not public — do not invent a number), and the
`Review` has **no** `reviewRating` (owner decision). Do not add either.

### Step 2: Render the new schema blocks in `<Head>`

Replace the existing `<Head>` block (currently only the `faqSchema` script,
`react-native-testing.tsx:597-602`) with all four sibling scripts. The new
`<Head>` must read exactly:

```tsx
<Head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(breadcrumbSchema),
    }}
  />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
</Head>
```

Leave everything else in the `return (...)` untouched.

**Verify**: `npx nx typecheck web` → exit 0, "Successfully ran target typecheck for project web".

### Step 3: Sanity-check the JSON-LD is well-formed and present

Run this grep to confirm exactly three JSON-LD scripts are wired and the new
schema types exist in the source:

```bash
grep -c 'application/ld+json' apps/web/pages/react-native-testing.tsx
grep -c "'@type': 'BreadcrumbList'\|'@type': 'Service'\|'@type': 'Review'" apps/web/pages/react-native-testing.tsx
grep -c 'reviewRating\|aggregateRating\|ratingValue' apps/web/pages/react-native-testing.tsx
```

**Verify**:

- first command → `3`
- second command → `3` (or more)
- third command → `0` (no rating anywhere — this must be zero)

### Step 4: Full build to confirm nothing broke at render/serialization time

**Verify**: `npx nx build web` → exit 0, "Successfully ran target build for project web".

## Test plan

There are **no** Jest tests for pages in this repo (`apps/web/pages` has no
`*.test.*` files), and JSON-LD is not covered by unit tests here. Do **not**
scaffold a new test framework for this. Verification is:

1. `npx nx typecheck web` → exit 0.
2. `npx nx build web` → exit 0.
3. Step 3 grep counts match.

(Optional, if the operator wants runtime proof and a dev server is available:
`npx nx serve web`, open `http://localhost:4200/react-native-testing`,
View Source, and confirm three `application/ld+json` blocks are present and each
`JSON.parse`-able. This is optional and not a gate.)

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npx nx typecheck web` exits 0
- [ ] `npx nx build web` exits 0
- [ ] `grep -c 'application/ld+json' apps/web/pages/react-native-testing.tsx` → `3`
- [ ] `grep -c 'reviewRating\|aggregateRating\|ratingValue' apps/web/pages/react-native-testing.tsx` → `0`
- [ ] `git status --porcelain` shows only `apps/web/pages/react-native-testing.tsx` modified
- [ ] `plans/README.md` status row for 002 updated

## STOP conditions

Stop and report back (do not improvise) if:

- The drift check shows `react-native-testing.tsx` changed since `99172de` and
  the "Current state" excerpts no longer match the live code.
- `npx nx typecheck web` or `npx nx build web` fails **and** the error names
  `react-native-testing.tsx` (a pre-existing failure elsewhere is not your
  concern — but a new error in this file is).
- You find yourself wanting to add a rating/score to make rich results work.
  Do not. Report that the owner needs to supply a genuine rating first.
- The change appears to require editing any file other than
  `react-native-testing.tsx`.

## Maintenance notes

- If the on-page testimonial (`SocialProof`, `react-native-testing.tsx:349-420`)
  is ever changed or removed, update or remove the `review` node in
  `serviceSchema` to keep schema and visible content consistent (Google requires
  review markup to reflect on-page content).
- If a public price is ever added to the page, add `price` + `priceCurrency` to
  the `Offer` to unlock offer rich results — until then, keep it price-less to
  avoid "missing price" validation warnings being interpreted as intent.
- A reviewer should paste the rendered page HTML into the
  [Rich Results Test](https://search.google.com/test/rich-results) and confirm
  Breadcrumb + FAQ detected with no errors, and that no review-snippet warning
  about a missing rating is treated as blocking.
- This plan pairs with plan 003 (title/meta/OG). They touch the same file but
  different regions (schema consts vs. `Layout` props) — land 002 first to keep
  diffs clean, or coordinate if doing both at once.
