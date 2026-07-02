# Plan 004: Add contextual internal links from the Maestro testing page to related React Native pages

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat dab4340..HEAD -- apps/web/pages/react-native-testing.tsx`
> If that file changed since this plan was written, compare the "Current state"
> excerpts against the live code before proceeding; on a mismatch, treat it as
> a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (independent; edits a different region than plans 002/003)
- **Category**: seo (internal-links)
- **Planned at**: commit `99172de`, 2026-07-02 (rebased to `dab4340` on 2026-07-02 after plans 002 + 003 landed on `main`; both edit other regions, so 004's `WhoAmI` excerpt is byte-identical — only line numbers shifted)

## Why this matters

The Maestro testing page currently links **only outward** (maestro.mobile.dev,
Stack Overflow, cal.com). It has zero internal links to the rest of the site, so
it neither passes link equity to related pages nor reinforces topical clustering
around "React Native" for search engines. Two well-matched contextual internal
links — to the existing `/react-native-migration` and `/react-native-tools`
pages — strengthen the site's React Native topic cluster and give crawlers a
path deeper into the site. This is deliberately scoped to the credibility
section (`WhoAmI`), **not** the hero or CTA, so there is no conversion risk.

## Current state

- `apps/web/pages/react-native-testing.tsx` — the target page. **`apps/web` is a
  Next.js site (Pages Router, Next 16).** Internal links MUST use the `next/link`
  `Link` component, NOT the `@weshipit/ui` `Hyperlink` component (which renders a
  bare `<a>` and forces a full page reload). `next/link` gives client-side
  navigation + route prefetching and is the repo's standard for in-site links.
  The `Hyperlink` component is for **external** links only.

  - Convention exemplar — `apps/web/pages/about.tsx:10,280`:
    ```tsx
    import Link from 'next/link';
    // ...
    <Link href="/">weshipit.today</Link>;
    ```
    Next 16 renders the underlying `<a>` automatically — no `legacyBehavior`, no
    nested `<a>`. A `className` may be passed directly to `<Link>` (see
    `apps/web/pages/podcast/[slug]/transcript.tsx:118`), but these two links need
    no styling.
  - The target file does **not** currently import `Link` — you will add the
    import. It keeps using `Hyperlink` (from `@weshipit/ui`) for its existing
    external links; leave those untouched.

- The two link targets exist as real routes:

  - `apps/web/pages/react-native-migration/index.tsx` → `/react-native-migration`
    (page title "Migrate to Expo — Simplify Your React Native Development").
  - `apps/web/pages/react-native-tools/index.tsx` → `/react-native-tools`
    (a directory of React Native tools).

- The injection site — the `WhoAmI` section, `react-native-testing.tsx:463-489`.
  Current code:

  ```tsx
          <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              I&apos;ve been shipping React Native apps since 2016 — through
              every breaking-change cycle, every Expo SDK, every New
              Architecture migration. I&apos;m a{' '}
              <Hyperlink href="https://x.com/flexbox_/status/1801588179687936329">
                top 20 contributor on Stack Overflow
              </Hyperlink>{' '}
              for React Native questions.
            </p>
  ```

  Note how `Hyperlink` is already used in this section for external links (it is
  used here **without** `isExternal`, matching the file's existing style — do not
  change that pre-existing usage).

## Commands you will need

| Purpose   | Command                | Expected on success                         |
| --------- | ---------------------- | ------------------------------------------- |
| Typecheck | `npx nx typecheck web` | exit 0, "Successfully ran target typecheck" |
| Build     | `npx nx build web`     | exit 0, "Successfully ran target build"     |

**Do NOT gate on `npx nx lint web`** — it fails for a pre-existing, unrelated
monorepo eslint-config error, not caused by your change.

## Scope

**In scope** (the only file you should modify):

- `apps/web/pages/react-native-testing.tsx` (the `WhoAmI` function only)

**Out of scope** (do NOT touch):

- The hero (`HeroSection`), CTA sections, or FAQ — no links added there.
- The JSON-LD schema (plan 002) and the `Layout` SEO props (plan 003).
- The pre-existing external `Hyperlink` usages — leave their props unchanged.
- Do not add more than the two internal links specified (avoid over-linking).

## Git workflow

- Branch: `advisor/004-maestro-testing-internal-links`
- Conventional-commit style. Suggested message:
  `feat: add internal links from Maestro testing page to RN migration/tools`
- Do NOT push or open a PR unless the operator asks.

## Steps

### Step 1: Add the `next/link` import

At the top of `apps/web/pages/react-native-testing.tsx`, add the `Link` import
next to the other imports (the file already imports `Head` from `next/head` and
`Image` from `next/image` — put this alongside them):

```tsx
import Link from 'next/link';
```

### Step 2: Add an internal link to `/react-native-migration`

In the `WhoAmI` paragraph, wrap the words "Expo SDK" so they link to the
migration page. Replace this exact text:

```tsx
              I&apos;ve been shipping React Native apps since 2016 — through
              every breaking-change cycle, every Expo SDK, every New
              Architecture migration. I&apos;m a{' '}
```

with:

```tsx
              I&apos;ve been shipping React Native apps since 2016 — through
              every breaking-change cycle, every{' '}
              <Link href="/react-native-migration">Expo SDK</Link>,
              every New Architecture migration. I&apos;m a{' '}
```

### Step 3: Add an internal link to `/react-native-tools`

In the same paragraph, extend the Stack Overflow sentence with a natural link to
the tools directory. Replace this exact text:

```tsx
              <Hyperlink href="https://x.com/flexbox_/status/1801588179687936329">
                top 20 contributor on Stack Overflow
              </Hyperlink>{' '}
              for React Native questions.
            </p>
```

with:

```tsx
              <Hyperlink href="https://x.com/flexbox_/status/1801588179687936329">
                top 20 contributor on Stack Overflow
              </Hyperlink>{' '}
              for React Native questions, and I curate a directory of{' '}
              <Link href="/react-native-tools">React Native tools</Link>.
            </p>
```

Note: the two NEW internal links use `<Link>` (next/link). The pre-existing
external link to `x.com` stays a `<Hyperlink>` — do not change it.

**Verify**: `npx nx typecheck web` → exit 0.

### Step 4: Confirm both internal links use `next/link`

```bash
grep -c "import Link from 'next/link'" apps/web/pages/react-native-testing.tsx
grep -c '<Link href="/react-native-migration">\|<Link href="/react-native-tools">' apps/web/pages/react-native-testing.tsx
grep -c '<Hyperlink href="/' apps/web/pages/react-native-testing.tsx
```

**Verify**:

- first command → `1` (the `next/link` import was added)
- second command → `2` (both internal links use `<Link>`)
- third command → `0` (no internal link uses `Hyperlink` — that component is for
  external links only)

### Step 5: Full build

**Verify**: `npx nx build web` → exit 0, "Successfully ran target build for project web".

## Test plan

No page-level unit tests exist and none are warranted for adding two `<Link>`
tags. Do not scaffold a test framework. Verification is typecheck + build + the
Step 4 greps.

(Optional runtime proof, not a gate: `npx nx serve web`, open
`http://localhost:4200/react-native-testing`, scroll to the "Hi, I'm David"
section, and confirm "Expo SDK" and "React Native tools" are clickable links
that navigate to `/react-native-migration` and `/react-native-tools`
respectively, same tab.)

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npx nx typecheck web` exits 0
- [ ] `npx nx build web` exits 0
- [ ] `grep -c '<Link href="/react-native-migration">\|<Link href="/react-native-tools">' apps/web/pages/react-native-testing.tsx` → `2`
- [ ] `grep -c "import Link from 'next/link'" apps/web/pages/react-native-testing.tsx` → `1`
- [ ] `grep -c '<Hyperlink href="/' apps/web/pages/react-native-testing.tsx` → `0` (no internal link uses `Hyperlink`)
- [ ] `git status --porcelain` shows only `apps/web/pages/react-native-testing.tsx` modified
- [ ] `plans/README.md` status row for 004 updated (reviewer maintains the index)

## STOP conditions

Stop and report back (do not improvise) if:

- The drift check shows the file changed since `dab4340` and the `WhoAmI`
  excerpt no longer matches.
- Either target route (`apps/web/pages/react-native-migration/index.tsx` or
  `apps/web/pages/react-native-tools/index.tsx`) no longer exists — do not link
  to a 404; report instead.
- `npx nx build web` fails with an error naming `react-native-testing.tsx`.

## Maintenance notes

- If `/react-native-migration` or `/react-native-tools` is ever renamed or
  removed, update or remove these anchors to avoid internal 404s.
- Keep internal links in this section to two — over-linking a short paragraph
  dilutes anchor value and reads as spammy.
- A reviewer should confirm the two anchors render inline naturally and the
  surrounding sentence still reads well after the edits.
- Follow-up deferred (not in this plan): the page's **external** `Hyperlink`
  usages (e.g. `href="https://maestro.mobile.dev"`) are missing
  `isExternal`/`rel="nofollow noopener"`. That's a separate hygiene item; do not
  fold it in here.
