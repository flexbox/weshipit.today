# Plan 001: davidl-fr quick-wins janitor pass

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 885cc40..HEAD -- apps/davidl-fr/ package.json`
> If any in-scope file has changed since this plan was written, compare the "Current state" excerpts in each sub-task against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S (one PR, ~1-2 hours)
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug / tests / perf / migration / docs (bundled)
- **Planned at**: commit `885cc40`, 2026-06-28

## Why this matters

`davidl-fr` was just imported into the monorepo from a standalone Next 15 repo. Eight independent low-risk items came out of the audit, each S-effort with HIGH confidence; bundling them in one PR is cheaper than eight tiny PRs. None of them touch the 281 TS errors or the styled-components refactor — those are separate plans on the roadmap. After this lands: jest setup actually runs, 3 stale tests pass, 2 dead deps gone, homepage ships ~50KB less JS, talks page is statically generated, PWA chrome matches the dark-mode button fix, no more `next/legacy/image`, README matches reality.

## Current state — facts the executor needs

### Verified at planning time (commit `885cc40`)

**Workshop data shape** (read from `apps/davidl-fr/src/pages/api/workshop.ts`):

- Total challenges: 24 across 7 modules (setup, foundation×5, data×3, ecosystem×6, expo-router×5, release×3, hackathon)
- `countChallenges` subtracts 2 (setup + hackathon) → returns 22, not 21
- The chain `ecosystem-05 → ecosystem-06` (the test still expects the old `ecosystem-05 → react-navigation-01`, which no longer exists)
- The chain `expo-router-05 → release-01` (the test still expects `react-navigation-04 → release-01`, which no longer exists)
- The chain `release-03 → hackathon` (test still passes; preserve it)

**Theme tokens** (read from `apps/davidl-fr/src/components/Theme/light.ts` and `dark.ts`):

- `lightTheme.bg.accent = '#007AFF'` (blue), `darkTheme.bg.accent = '#FF9500'` (orange)
- `lightTheme.accent.blue = '#007AFF'`, `darkTheme.accent.blue = '#0A84FF'` (stays blue in dark)
- The `bg.accent` token is the theme-aware brand color; `accent.blue` is a fixed color
- This same swap was just made to `PrimaryButton` in `src/components/Button/style.tsx` — use that as the exemplar

**Legacy/image usages** (5 files, verified by grep):

1. `apps/davidl-fr/src/components/Onboarding/Frame.tsx` — 1 `<Image width={400} height={200}>` (no layout prop)
2. `apps/davidl-fr/src/pages/bootcamp.tsx` — 3 `<Image width="…" height="…">` (no layout prop)
3. `apps/davidl-fr/src/pages/start.tsx` — 2 `<Image width={700} height={100}>` (no layout prop)
4. `apps/davidl-fr/src/pages/about.tsx` — many `<Image width={32} height={32}>` (no layout prop)
5. `apps/davidl-fr/src/pages/workshop/challenges/certification.tsx` — 3 `<Image …  layout="responsive">` ← **only file using `layout`**

For files 1–4: literally just change the import. Modern `next/image` accepts the same `width`/`height` props with no behavior change.
For file 5: drop `layout="responsive"` and add `style={{ width: '100%', height: 'auto' }}` to each `<Image>` — modern equivalent.

**Jest config bug** (`apps/davidl-fr/jest.config.ts:13`):

```ts
setupFilesAfterEach: ['<rootDir>/jest.setup.ts'],   // ← INVALID Jest key
```

Correct key is `setupFilesAfterEnv` ("env" = after Jest test framework env is set up, before tests run). Confirm by running tests once before the fix — Jest 30 emits `Unknown option "setupFilesAfterEach"` validation warning.

**Talks SSR usage** (`apps/davidl-fr/src/pages/talks.tsx:43-51`):

```ts
export async function getServerSideProps() {
  const rawContent = await fetch('https://raw.githubusercontent.com/flexbox/talks/master/README.md');
  const mdxContent = await rawContent.text();
  const mdxSource = await serialize(mdxContent);
  return { props: { source: mdxSource } };
}
```

The README updates rarely. Convert to `getStaticProps` with hourly ISR.

**Hero typewriter** (`apps/davidl-fr/src/components/Hero/Hero.tsx:3,31-37`):

```tsx
import Typed from 'react-typed';
// …
<Typed strings={pitch} typeSpeed={40} loop={true} smartBackspace={true} backDelay={1000} />;
```

`react-typed` (last release 2020, ~30-50KB) ships on the homepage. Decorative only. Extract the `<Typed>` subtree into a `Typewriter` component and load it via `next/dynamic` with `ssr: false`.

**PWA color** (`apps/davidl-fr/src/pages/_app.tsx`):

- Line 6: `import lightTheme from '~/components/Theme/light';` ← only imports light theme
- Line 75: `color: lightTheme.text.primary,` ← Safari mask-icon
- Line 79: `content: lightTheme.accent.blue` ← `theme-color` meta
- Line 82: `content: lightTheme.accent.blue` ← `msapplication-TileColor`

The page's `theme-color` controls the mobile browser chrome (URL bar tint). It cannot be theme-aware via React state because Next emits the meta tag at SSR time. The correct fix is two media-query meta tags via `<Head>` (one per color scheme). `next-seo`'s `additionalMetaTags` doesn't type a `media` attribute, so use Next's native `<Head>` for the two `theme-color` entries and keep the rest in `additionalMetaTags`.

**Unused deps** (verified by grep returning zero hits in `apps/davidl-fr/src/`):

- `react-helmet` (`^6.1.0`) — also `@types/react-helmet` (`^6.1.11`) devDep
- `react-mailchimp-subscribe` (`^2.1.3`) — has no `@types/*` entry

**README staleness** (`apps/davidl-fr/README.md`):

- Line 14: `yarn dev` — no such script in monorepo root; correct is `yarn davidl-fr:start`
- Line 21: `vercel env pull` advice — explicitly contradicted by the migration ("hands off Vercel")
- Line 37: error message references `yarn@4.1.0` — monorepo pins `yarn@4.17.0`
- Line 54: `yarn slide` — no such script exists in this repo

### Repo conventions

- **Commit style**: conventional commits via `git-cz` (`fix: 🐛 …`, `chore: 🤖 …`, `feat: 🎸 …`). Match the recent log:

  ```
  fix: 🐛 dark mode button for davidl
  chore: 🤖 drop deprecated @nrwl/cli (replaced by nx) (#322)
  feat: 🎸 add /react-native-testing landing for Maestro mobile testing (#323)
  ```

- **Branch naming**: `advisor/001-<slug>` for this plan.
- **TypeScript**: `apps/davidl-fr/tsconfig.json` has `strict: true`. Don't introduce new `any` types in test fixture updates.
- **Path alias**: `~/*` resolves to `apps/davidl-fr/src/*`. Use it for intra-app imports.

## Commands you will need

| Purpose             | Command                                                | Expected on success                                    |
| ------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| Install             | `yarn install`                                         | exits 0; "Done with warnings" is fine (peer-dep noise) |
| Run tests           | `npx nx test davidl-fr`                                | exits 0; 23 of 23 pass after sub-task E                |
| Dev server (sanity) | `npx nx serve davidl-fr`                               | starts on http://localhost:4400 within ~1s             |
| Production build    | `npx nx build davidl-fr`                               | **EXPECTED TO FAIL** with 281 TS errors — out of scope |
| Grep guard          | `grep -rn '<pattern>' apps/davidl-fr/src package.json` | varies per sub-task                                    |

**Important**: `nx build davidl-fr` will fail during this plan and after. That is OUT OF SCOPE for this plan (it's the 281-error backlog, a separate planned item). Do NOT try to fix TypeScript errors here.

**Lint is also broken at the monorepo level** (pre-existing FlatCompat circular-structure issue affecting `apps/web` too). Don't try to fix it. Don't gate on lint.

## Scope

**In scope** (the only files you may modify):

- `apps/davidl-fr/jest.config.ts`
- `apps/davidl-fr/src/pages/_app.tsx`
- `apps/davidl-fr/src/pages/talks.tsx`
- `apps/davidl-fr/src/utils/findNextChallenge.test.ts`
- `apps/davidl-fr/src/pages/api/workshop.test.ts`
- `apps/davidl-fr/src/components/Hero/Hero.tsx`
- `apps/davidl-fr/src/components/Hero/Typewriter.tsx` (**create**)
- `apps/davidl-fr/src/components/Onboarding/Frame.tsx`
- `apps/davidl-fr/src/pages/bootcamp.tsx`
- `apps/davidl-fr/src/pages/start.tsx`
- `apps/davidl-fr/src/pages/about.tsx`
- `apps/davidl-fr/src/pages/workshop/challenges/certification.tsx`
- `apps/davidl-fr/README.md`
- `package.json` (root — only the two unused deps removed)
- `yarn.lock` (auto-updated by `yarn install`)
- `plans/README.md` (status row only)

**Out of scope** (do NOT touch even if related):

- `apps/web/`, `apps/banner-preview/`, `libs/` — different apps
- Any other file in `apps/davidl-fr/` not listed above
- The 281 TS errors — separate planned item
- The `--exclude=davidl-fr` flag in `.github/workflows/ci.yml:33` — leave it; that's the next plan's job
- The React 19 peer-dep warnings — same as above
- Removing `prismic-reactjs`, `react-gravatar`, `react-typed` from deps — those are still imported and have their own plans
- `styled-components` → `tailwind` migration
- The Vercel project / env vars / dashboard
- Anything in `.next/`, `dist/`, `node_modules/`

## Git workflow

- Branch: `advisor/001-davidl-fr-quick-wins`
- Commit per sub-task (8 commits) OR one squashed commit — operator's choice. If committing per sub-task, message style: `chore: 🤖 fix jest setupFilesAfterEnv` etc. (conventional commits, with emoji).
- Do NOT push or open a PR unless explicitly instructed.
- Do NOT touch git config, do NOT skip hooks (`--no-verify`), do NOT amend prior commits.

## Steps

### Step A — Fix Jest setup file key (#1)

In `apps/davidl-fr/jest.config.ts`, change `setupFilesAfterEach` → `setupFilesAfterEnv`. There is exactly one occurrence:

```ts
// before
setupFilesAfterEach: ['<rootDir>/jest.setup.ts'],
// after
setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
```

**Verify**:

```bash
grep -c "setupFilesAfterEnv" apps/davidl-fr/jest.config.ts   # → 1
grep -c "setupFilesAfterEach" apps/davidl-fr/jest.config.ts  # → 0
npx nx test davidl-fr 2>&1 | grep -E "Unknown option"        # → empty (no warning)
```

### Step B — Remove unused deps (#3)

Edit `package.json` (root):

1. From `dependencies`, remove the line `"react-helmet": "^6.1.0",`
2. From `dependencies`, remove the line `"react-mailchimp-subscribe": "^2.1.3",`
3. From `devDependencies`, remove the line `"@types/react-helmet": "^6.1.11",`

Then:

```bash
yarn install
```

**Verify**:

```bash
grep -E "react-helmet|react-mailchimp" package.json                                # → empty
grep -rn "react-helmet\|react-mailchimp-subscribe" apps/davidl-fr/src              # → empty
ls node_modules/react-helmet node_modules/react-mailchimp-subscribe 2>&1 | grep "No such"  # → 2 lines
```

### Step C — Fix PWA chrome color (#4)

Two changes in `apps/davidl-fr/src/pages/_app.tsx`:

1. Add the `darkTheme` import alongside the existing `lightTheme` import (line 6):

```tsx
// before
import lightTheme from '~/components/Theme/light';
// after
import lightTheme from '~/components/Theme/light';
import darkTheme from '~/components/Theme/dark';
import Head from 'next/head';
```

2. The current `additionalMetaTags` array (lines ~78–96) contains four entries; the first two are the broken `theme-color` and `msapplication-TileColor`. Replace the `theme-color` entry with two media-scoped tags emitted via Next's `<Head>` (because `next-seo`'s typed shape doesn't expose `media`). Keep `msapplication-TileColor` in `additionalMetaTags` but switch its value to `lightTheme.bg.accent` so it matches the new brand-accent token. Switch `mask-icon` color (line ~75) from `lightTheme.text.primary` to `lightTheme.bg.accent`.

The diff conceptually:

```tsx
// before (in additionalMetaTags)
{ name: 'theme-color', content: lightTheme.accent.blue },
{ name: 'msapplication-TileColor', content: lightTheme.accent.blue },

// after (in additionalMetaTags — drop theme-color entirely, fix the tile color)
{ name: 'msapplication-TileColor', content: lightTheme.bg.accent },
```

And add the two `<meta>` tags via `<Head>` immediately before `<Component {...pageProps} />` (the existing JSX has a `<div className={inter.className}>` wrapping it; place `<Head>` as a sibling of that `<div>`, or directly before the `<DefaultSeo>` element — both are valid; Next merges `<Head>` content):

```tsx
<Head>
  <meta name="theme-color" media="(prefers-color-scheme: light)" content={lightTheme.bg.accent} />
  <meta name="theme-color" media="(prefers-color-scheme: dark)" content={darkTheme.bg.accent} />
</Head>
```

Also fix the `mask-icon` color in `additionalLinkTags` (around line 73–76):

```tsx
// before
{
  rel: 'mask-icon',
  href: '/metadata/safari-pinned-tab.svg',
  color: lightTheme.text.primary,
},
// after
{
  rel: 'mask-icon',
  href: '/metadata/safari-pinned-tab.svg',
  color: lightTheme.bg.accent,
},
```

**Note for the executor**: the existing `PrimaryButton` in `apps/davidl-fr/src/components/Button/style.tsx` uses `props.theme.bg.accent` throughout — that's the exemplar this change matches.

**Verify**:

```bash
grep -c "accent.blue" apps/davidl-fr/src/pages/_app.tsx               # → 0
grep -c "darkTheme" apps/davidl-fr/src/pages/_app.tsx                 # → ≥1
grep -c "next/head" apps/davidl-fr/src/pages/_app.tsx                 # → 1
grep -c "prefers-color-scheme" apps/davidl-fr/src/pages/_app.tsx      # → 2
```

If next-seo emits a TS error about the `additionalMetaTags` shape, leave the array unchanged and rely entirely on the `<Head>` `theme-color` tags — STOP and report instead of inventing a workaround.

### Step D — Convert `talks.tsx` to ISR (#5)

In `apps/davidl-fr/src/pages/talks.tsx`, replace the entire `getServerSideProps` block (around lines 43–51) with a `getStaticProps` that returns `revalidate: 3600`:

```ts
// before
export async function getServerSideProps() {
  const rawContent = await fetch('https://raw.githubusercontent.com/flexbox/talks/master/README.md');
  const mdxContent = await rawContent.text();
  const mdxSource = await serialize(mdxContent);
  return { props: { source: mdxSource } };
}

// after
export async function getStaticProps() {
  const rawContent = await fetch('https://raw.githubusercontent.com/flexbox/talks/master/README.md');
  const mdxContent = await rawContent.text();
  const mdxSource = await serialize(mdxContent);
  return { props: { source: mdxSource }, revalidate: 3600 };
}
```

**Verify**:

```bash
grep -c "getServerSideProps" apps/davidl-fr/src/pages/talks.tsx   # → 0
grep -c "getStaticProps"     apps/davidl-fr/src/pages/talks.tsx   # → 1
grep -c "revalidate: 3600"   apps/davidl-fr/src/pages/talks.tsx   # → 1
```

### Step E — Fix 3 stale test assertions (#6)

**E.1** — In `apps/davidl-fr/src/utils/findNextChallenge.test.ts`:

The current data chain in `apps/davidl-fr/src/pages/api/workshop.ts` says `ecosystem-05 → ecosystem-06` and `expo-router-05 → release-01`. The old chain had `react-navigation-*` which no longer exists. Update assertions to match the current data and rename the `react-navigation-04` case to `expo-router-05`:

```ts
// case at line ~23–27 — change expected value
it('gives the name of the exercice for `ecosystem-05`', () => {
  const source = '/workshop/challenges/ecosystem-05';
  const result = findNextChallenge(source);
  expect(result).toBe('/workshop/challenges/ecosystem-06'); // was: react-navigation-01
});

// case at line ~29–33 — rename source AND expected value
it('gives the name of the exercice for `expo-router-05`', () => {
  const source = '/workshop/challenges/expo-router-05'; // was: react-navigation-04
  const result = findNextChallenge(source);
  expect(result).toBe('/workshop/challenges/release-01'); // unchanged
});
```

The three other test cases (`setup`, `foundation-05`, `data-03`, `release-03`) are still correct against current data — leave them alone.

**E.2** — In `apps/davidl-fr/src/pages/api/workshop.test.ts`:

Change `21` → `22`:

```ts
expect(numberChallenges).toBe(22); // was: 21
```

(Reason: `ecosystem-06` was added as a new challenge; total is now 24, minus setup+hackathon = 22.)

**Verify**:

```bash
npx nx test davidl-fr 2>&1 | tail -5
```

Expected last lines: `Tests: 23 passed, 23 total`. No failures.

If a test STILL fails, STOP and report — the data may have drifted further since planning time.

### Step F — Lazy-load Hero typewriter (#7)

Create a new file `apps/davidl-fr/src/components/Hero/Typewriter.tsx`:

```tsx
import React from 'react';
import Typed from 'react-typed';

const pitch = ['I build mobile applications for iOS', 'I build mobile applications for Android', 'I craft scalable and clean design systems', 'You should hire me for your next success', 'I can turn your casual visitors into customers…', '… then ambassadors of your product'];

export default function Typewriter() {
  return <Typed strings={pitch} typeSpeed={40} loop={true} smartBackspace={true} backDelay={1000} />;
}
```

Then edit `apps/davidl-fr/src/components/Hero/Hero.tsx`:

1. Remove the `import Typed from 'react-typed';` line.
2. Remove the local `pitch` array (moved to Typewriter.tsx).
3. Add at the top of the imports:
   ```tsx
   import dynamic from 'next/dynamic';
   ```
4. Add after the imports:
   ```tsx
   const Typewriter = dynamic(() => import('./Typewriter'), { ssr: false });
   ```
5. Replace the `<Typed ... />` element (around line 31–37) with `<Typewriter />`.

**Verify**:

```bash
grep -c "from 'react-typed'" apps/davidl-fr/src/components/Hero/Hero.tsx     # → 0
grep -c "Typewriter"        apps/davidl-fr/src/components/Hero/Hero.tsx      # → ≥2
ls apps/davidl-fr/src/components/Hero/Typewriter.tsx                          # → file exists
npx nx serve davidl-fr &                                                      # start dev server
sleep 8                                                                       # let Next compile
curl -s http://localhost:4400 | grep -c "I build mobile applications"         # → 0 (typewriter loads client-side after hydration)
pkill -f "nx serve davidl-fr"                                                 # cleanup
```

(If `pkill` doesn't fully kill the dev server — that happened during the original migration — also `pkill -f "next-server"`.)

### Step G — Migrate `next/legacy/image` → `next/image` (#8)

For each of these 4 files, change the import only:

```tsx
// before
import Image from 'next/legacy/image';
// after
import Image from 'next/image';
```

Files:

- `apps/davidl-fr/src/components/Onboarding/Frame.tsx`
- `apps/davidl-fr/src/pages/bootcamp.tsx`
- `apps/davidl-fr/src/pages/start.tsx`
- `apps/davidl-fr/src/pages/about.tsx`

The 5th file is special — `apps/davidl-fr/src/pages/workshop/challenges/certification.tsx` uses `layout="responsive"` on 3 `<Image>` elements. Modern `next/image` removed `layout`. For each of those 3 elements:

1. Change the import as above.
2. Drop the `layout="responsive"` prop.
3. Add `style={{ width: '100%', height: 'auto' }}` to keep responsive behavior. The existing `width={…} height={…}` props remain (modern `next/image` uses them as aspect-ratio hints).

Example diff:

```tsx
// before
<Image
  src="https://media.giphy.com/media/l1AsPDzmgSdwDG7v2/giphy.gif"
  alt="Certification React Native Bootcamp"
  className="bg-slate-200"
  width={480}
  height={200}
  layout="responsive"
/>

// after
<Image
  src="https://media.giphy.com/media/l1AsPDzmgSdwDG7v2/giphy.gif"
  alt="Certification React Native Bootcamp"
  className="bg-slate-200"
  width={480}
  height={200}
  style={{ width: '100%', height: 'auto' }}
/>
```

Repeat for the other 2 `<Image>` elements in the same file.

**Verify**:

```bash
grep -rn "next/legacy/image" apps/davidl-fr/src                            # → empty
grep -rn 'layout="responsive"' apps/davidl-fr/src                          # → empty
grep -c "from 'next/image'" apps/davidl-fr/src/pages/about.tsx             # → 1
```

### Step H — Update README (#10)

Edit `apps/davidl-fr/README.md`. Apply ALL of:

1. Change line 14 from:

   ```
   yarn dev
   ```

   to:

   ```
   yarn davidl-fr:start
   ```

2. Delete lines 18–22 entirely (the `If you have access to the Vercel project, you can pull the env vars instead:` paragraph and the `vercel env pull` code block). Per the migration brief, Vercel is hands-off for this app.

3. In the "Troubleshooting" section, change `"yarn@4.1.0"` to `"yarn@4.17.0"` on line 37. The error message wording stays the same shape, only the version changes.

4. Delete the entire `## /courses` section at the bottom (lines 49–56 — heading, paragraph, and the `yarn slide` code block). No such script exists in the monorepo.

5. Add a brief monorepo note. Find the line `yarn` in the "Getting started" code block (currently line 14) and replace the whole block to read:

   ```
   cp .env.local.example .env.local
   # fill in the values, then from the monorepo root:
   yarn
   yarn davidl-fr:start
   ```

**Verify**:

```bash
grep -c "yarn dev"          apps/davidl-fr/README.md   # → 0
grep -c "yarn slide"        apps/davidl-fr/README.md   # → 0
grep -c "yarn@4.1.0"        apps/davidl-fr/README.md   # → 0
grep -c "vercel env pull"   apps/davidl-fr/README.md   # → 0
grep -c "yarn davidl-fr:start" apps/davidl-fr/README.md  # → 1
grep -c "yarn@4.17.0"       apps/davidl-fr/README.md   # → 1
```

## Test plan

- This plan does not add new tests; it fixes 3 stale assertions in existing tests (sub-task E).
- After sub-task A (jest config), the test setup file (`apps/davidl-fr/jest.setup.ts`) finally loads. If any test was secretly relying on its mocks NOT being installed, it may now start failing. Don't fix that here — STOP and report instead.
- Verification of all tests passing happens in sub-task E and in Done Criteria.

## Done criteria

ALL of the following must hold simultaneously. Run them in order at the end:

- [ ] `git diff --stat 885cc40..HEAD` shows changes only to files in the Scope list (and `yarn.lock`).
- [ ] `yarn install` exits 0.
- [ ] `grep -E '"react-helmet"|"react-mailchimp-subscribe"|"@types/react-helmet"' package.json` → empty.
- [ ] `grep -rn "next/legacy/image" apps/davidl-fr/src` → empty.
- [ ] `grep -rn 'layout="responsive"' apps/davidl-fr/src` → empty.
- [ ] `grep -c "accent.blue" apps/davidl-fr/src/pages/_app.tsx` → 0.
- [ ] `grep -c "setupFilesAfterEnv" apps/davidl-fr/jest.config.ts` → 1.
- [ ] `grep -c "setupFilesAfterEach" apps/davidl-fr/jest.config.ts` → 0.
- [ ] `grep -c "getServerSideProps" apps/davidl-fr/src/pages/talks.tsx` → 0.
- [ ] `grep -c "from 'react-typed'" apps/davidl-fr/src/components/Hero/Hero.tsx` → 0.
- [ ] `apps/davidl-fr/src/components/Hero/Typewriter.tsx` exists.
- [ ] `grep -cE "yarn dev|yarn slide|yarn@4\\.1\\.0|vercel env pull" apps/davidl-fr/README.md` → 0.
- [ ] `npx nx test davidl-fr` → exits 0, `Tests: 23 passed, 23 total`, no warning about `Unknown option`.
- [ ] `npx nx serve davidl-fr` → starts on http://localhost:4400 within ~5 seconds without errors (then kill it).
- [ ] The status row for plan 001 in `plans/README.md` is updated from `TODO` → `DONE`.

`npx nx build davidl-fr` is **expected to fail** (281 unrelated TS errors). Do not gate on it.

## STOP conditions

Stop and report back (do not improvise) if:

- The drift-check `git diff` shows any in-scope file has changed substantially since `885cc40` (e.g., `Hero.tsx` no longer imports `react-typed`, `talks.tsx` no longer uses `getServerSideProps`, `_app.tsx` no longer uses `next-seo`).
- After Step A (jest fix), `npx nx test davidl-fr` fails on a test that was previously passing — STOP, investigate what the setup file enables that broke; do not delete the setup file.
- Step C: adding the `media` attribute to a `next-seo` `additionalMetaTags` entry raises a TS error — the plan already routes around this by using `<Head>` directly; if you went the other way, switch back to the `<Head>` approach.
- Step E: a test STILL fails after updating assertions to the values in this plan — `workshop.ts` data has drifted further than the planning-time read showed. Open `apps/davidl-fr/src/pages/api/workshop.ts`, trace the `linkHref → nextLinkHref` chain again, update assertions to match, and report the drift.
- Step G: a `<Image>` element in `certification.tsx` has additional legacy-only props beyond `layout="responsive"` (e.g., `objectFit`, `objectPosition`) — STOP and report; those need a different migration.
- Step F: `nx serve davidl-fr` fails to start after the Hero refactor (verify by stopping any existing dev server with `pkill -f next-server` first).
- A verification command returns an unexpected result twice after a reasonable fix attempt.
- Any change appears to require touching a file outside the Scope list.

## Maintenance notes

For the reviewer / future maintainer:

- **Sub-task A unlocks the setup file** — any future test relying on jest-dom matchers (`toBeInTheDocument`) or `next/router` mocking will now work. Previously they would silently no-op.
- **Sub-task C** is a partial fix — the PWA `theme-color` now flips between blue (light) and orange (dark), but `msapplication-TileColor` (Windows tile) stays single-valued because that's how the spec works. If a future plan wants the Windows tile to be dark-aware too, it'll need a JS-side `browserconfig.xml` workaround, not a meta tag.
- **Sub-task D** moves `/talks` to ISR with 1-hour revalidation. If the talks README updates more often, drop `revalidate` to a lower value or add an on-demand ISR endpoint with a webhook from the `flexbox/talks` repo.
- **Sub-task F** sets `ssr: false` on the Typewriter; the static HTML for `/` will not contain any of the `pitch` strings, only the surrounding markup. SEO impact is minimal (the pitch is animated decoration, not core content), but if SEO becomes a concern, switch to `dynamic(..., { ssr: true, loading: () => <></> })` or pre-render a single static pitch string.
- **Removed `react-helmet` and `react-mailchimp-subscribe`** — if a future contributor adds a newsletter form, prefer Mailchimp's REST API directly (already used in `/api/newsletter.ts`) over re-adding the abandoned `react-mailchimp-subscribe`. For `<head>` management, use `next-seo` (already in deps) or Next's native `<Head>`.
- **The 281 TS errors remain** — the CI exclusion (`--exclude=davidl-fr` in `.github/workflows/ci.yml:33`) stays in place after this plan. The next plan on the roadmap is to swap `react-gravatar` (a key offender) for a React 19-compatible alternative, then chip away at the rest.

## Follow-ups explicitly deferred

- All "Findings selected but not yet planned" items in `plans/README.md`.
- The pre-existing monorepo `nx lint` regression (FlatCompat circular-structure error) — affects `apps/web` too, so not davidl-fr's problem to solve.
- Bundle-analyzer evidence for the Prismjs duplication suspicion (MED-confidence finding from the audit; needs measurement before planning).
