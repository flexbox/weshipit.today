# Plan 005: Put "React Native" in the /react-native-tools index H1

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat a7457e8..HEAD -- apps/web/pages/react-native-tools/index.tsx`
> If the file changed since this plan was written, compare the "Current state"
> excerpt against the live code before proceeding; on a mismatch, treat it as
> a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: seo (on-page)
- **Planned at**: commit `a7457e8`, 2026-07-08

## Why this matters

The page `https://weshipit.today/react-native-tools` targets the query "react
native tools" — its `<title>` is "49+ React Native Tools & Resources" — but its
`<h1>` renders **"The best tools and resources for busy developers."** The
primary keyword "React Native" never appears in the H1 (when a `?type=` filter
is active, the _category_ name is inserted, still not "React Native"). H1/title
keyword alignment is a basic on-page ranking signal; this is the single
highest-leverage fix on the page and it is a one-JSX-expression change.

## Current state

- `apps/web/pages/react-native-tools/index.tsx` — the tools directory index
  page (Next.js **pages router**, SSG with `revalidate: 3600`). The H1 is the
  `title` prop passed to the shared `Hero` component.

Excerpt as of `a7457e8` (`apps/web/pages/react-native-tools/index.tsx:85-97`):

```tsx
          title={
            <>
              The best{' '}
              {toolType && (
                <span className="text-indigo-600">
                  {toolType.toLowerCase()}
                </span>
              )}{' '}
              tools
              <br />
              and resources for busy developers.
            </>
          }
```

`toolType` comes from `router.query.type` (line 41) and is a category name like
`Analytics` or `CI/CD & Release`. Unfiltered, the H1 reads "The best tools and
resources for busy developers."; with `?type=Analytics` it reads "The best
analytics tools and resources for busy developers."

The `Hero` component lives in `libs/ui/src/lib/hero/` and renders `title`
inside an `<h1>` — you do not need to modify it, only the JSX passed to it.

Repo conventions: JSX copy changes like this are made inline in the page file;
Prettier formatting is enforced (2-space indent, single quotes). Match the
existing fragment style.

## Commands you will need

| Purpose   | Command                                      | Expected on success |
| --------- | -------------------------------------------- | ------------------- |
| Install   | `yarn install` (only if node_modules absent) | exit 0              |
| Typecheck | `npx nx typecheck web`                       | exit 0              |
| Build     | `npx nx build web`                           | exit 0              |

Do **NOT** gate on `npx nx lint web` — it fails for a pre-existing monorepo
eslint-config error unrelated to this change (see `plans/README.md`).

## Scope

**In scope** (the only file you should modify):

- `apps/web/pages/react-native-tools/index.tsx`

**Out of scope** (do NOT touch, even though they look related):

- `libs/ui/src/lib/hero/**` — shared component used by many pages.
- The `seoTitle` / `seoDescription` props on `Layout` (lines 61–62) — already
  correctly keyworded; leave them exactly as-is.
- `apps/web/pages/react-native-tools/[slug].tsx` — detail pages have their own
  plans (006, 007).

## Git workflow

- Branch: `advisor/005-tools-index-h1-keyword` cut from `main`.
- Single commit; message style matches repo (`git log --oneline` shows
  conventional commits, e.g. `feat: optimize title/meta/og-alt for Maestro
testing page SEO`). Suggested: `feat: 🔍 add React Native keyword to tools index H1`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Rewrite the Hero `title` JSX

In `apps/web/pages/react-native-tools/index.tsx`, replace the `title` fragment
shown in "Current state" with:

```tsx
          title={
            <>
              The best React Native{' '}
              {toolType && (
                <span className="text-indigo-600">
                  {toolType.toLowerCase()}{' '}
                </span>
              )}
              tools
              <br />
              and resources for busy developers.
            </>
          }
```

Target rendered output:

- Unfiltered: `The best React Native tools and resources for busy developers.`
  (exactly one space between each word — check the whitespace produced by the
  JSX; the previous version had a double space when unfiltered, do not
  reproduce that).
- Filtered (`?type=Analytics`): `The best React Native analytics tools and
resources for busy developers.`

**Verify**: `npx nx typecheck web` → exit 0.

### Step 2: Confirm the rendered H1

Run the dev server or build and inspect the HTML:

```bash
npx nx build web
grep -o '<h1[^>]*>.*best React Native.*</h1>' dist/apps/web/.next/server/pages/react-native-tools.html | head -1
```

**Verify**: the grep matches (H1 contains "React Native"), and the visible text
has no double spaces (`grep -c '  tools' dist/apps/web/.next/server/pages/react-native-tools.html`
inside the h1 region should be 0 — simplest check: view the string returned by
the first grep and read it).

## Test plan

No unit tests exist for page-level JSX copy in this repo (pages have no
`.spec` files) and none are expected — the build + grep verification above is
the test. Do not add a test file for this.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npx nx typecheck web` exits 0
- [ ] `npx nx build web` exits 0
- [ ] Built HTML for `/react-native-tools` contains `React Native` inside the `<h1>` element
- [ ] `git status` shows only `apps/web/pages/react-native-tools/index.tsx` (plus `plans/README.md`) modified
- [ ] `plans/README.md` status row for 005 updated

## STOP conditions

Stop and report back (do not improvise) if:

- The `title` JSX at lines ~85–97 does not match the "Current state" excerpt
  (drift — someone already changed the H1).
- The `Hero` component does not render `title` in an `<h1>` (grep step 2 finds
  no `<h1>` at all) — the fix would then belong in `libs/ui`, which is out of
  scope.
- You feel the need to change `seoTitle`, `seoDescription`, or anything in
  `libs/ui` — that is out of scope.

## Maintenance notes

- If the page's H1 is later A/B-tested for conversion, keep "React Native" in
  every variant — the SEO value lives in those two words, not the surrounding
  copy.
- Reviewer should check the filtered variant (`/react-native-tools?type=Analytics`)
  visually: the inserted category span must keep single spacing on both sides.
