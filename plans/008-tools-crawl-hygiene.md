# Plan 008: Crawl hygiene — internal ItemList URLs, drop stray ?id= param, wire sitemap

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat a7457e8..HEAD -- apps/web/pages/react-native-tools/index.tsx libs/ui/src/lib/tool-list/tool-card.tsx apps/web/project.json`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition. (Plan 005 also edits
> `index.tsx`, in the Hero `title` region — that drift is expected, proceed.)

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW (three isolated changes; one touches a shared UI component)
- **Depends on**: none
- **Category**: seo (crawl/indexing hygiene)
- **Planned at**: commit `a7457e8`, 2026-07-08

## Why this matters

Three small defects waste the crawl/link signals of the tools directory:

1. **ItemList schema points off-site.** The index page's `ItemList` JSON-LD
   lists each tool with the _vendor's external URL_ — Google's ItemList
   guidance expects same-site URLs; the structured-data graph currently
   promotes 49 external domains instead of our 49 detail pages.
2. **Every internal card link carries a stray `?id=recXXX` query param.**
   The card `Link` passes `id` in `query` but the route only uses `slug`, so
   crawlers discover `/react-native-tools/segment?id=rec26VdpJBnJo2tzo` —
   49+ parametrized duplicates. The static-HTML canonical is clean, but the
   client-rendered canonical (built from `router.asPath` in
   `apps/web/components/next-head.tsx:33-35`) then _includes_ the param —
   mixed canonical signals.
3. **The sitemap is regenerated manually and goes stale.** The `postbuild`
   target (next-sitemap) is not chained to `build`, and its output is
   committed to `apps/web/public/`. The committed sitemap predates recently
   added tool pages, so new pages lag in discovery until someone remembers to
   regenerate.

## Current state

### Files

- `apps/web/pages/react-native-tools/index.tsx` — tools index; builds the
  ItemList schema in `getStaticProps`.
- `libs/ui/src/lib/tool-list/tool-card.tsx` — shared card component; renders
  the internal link. Used by `ToolList`
  (`libs/ui/src/lib/tool-list/tool-list.tsx:18`), which is used by the tools
  index, the tool detail pages' "related" section, and possibly other pages —
  Step 2 includes a usage sweep.
- `apps/web/project.json` — Nx targets; `postbuild` runs
  `next-sitemap --config apps/web/next-sitemap.config.js`.
- `apps/web/next-sitemap.config.js` — writes sitemap + robots.txt into
  `apps/web/public/` **on purpose** (see the comment in the file: the previous
  `dist/` outDir was never served). Do not change `outDir`.

### Excerpt 1 — ItemList schema (`index.tsx:13-27` as of `a7457e8`)

```ts
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'React Native Tools & Resources',
  description: 'Curated tools and libraries for React Native developers — analytics, CI/CD, debugging, UI components, and more.',
  url: 'https://weshipit.today/react-native-tools',
  numberOfItems: records.length,
  itemListElement: records.map((record, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: record.name,
    url: record.website_url || null,
  })),
};
```

### Excerpt 2 — card link (`tool-card.tsx:30-36` as of `a7457e8`)

```tsx
    <Card variant="link">
      <Link
        href={{
          pathname: '/react-native-tools/[slug]',
          query: { id, slug },
        }}
      >
```

(`id` is also used as the React `key` in `tool-list.tsx:18` — that usage
stays; only the `query` object changes.)

### Excerpt 3 — Nx targets (`apps/web/project.json:8-30` as of `a7457e8`)

```json
    "build": {
      "executor": "@nx/next:build",
      "outputs": ["{options.outputPath}"],
      "defaultConfiguration": "production",
      "options": {
        "outputPath": "dist/apps/web"
      },
      ...
    },
    "postbuild": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          {
            "command": "next-sitemap --config apps/web/next-sitemap.config.js"
          }
        ]
      }
    },
```

(No `dependsOn` on `postbuild`; nothing invokes it automatically.)

## Commands you will need

| Purpose            | Command                                      | Expected on success                                         |
| ------------------ | -------------------------------------------- | ----------------------------------------------------------- |
| Install            | `yarn install` (only if node_modules absent) | exit 0                                                      |
| Typecheck          | `npx nx typecheck web`                       | exit 0                                                      |
| Build              | `npx nx build web`                           | exit 0                                                      |
| Sitemap regenerate | `npx nx run web:postbuild`                   | exit 0; writes `apps/web/public/sitemap*.xml`, `robots.txt` |
| UI lib unit tests  | `npx nx test ui --testPathPattern=tool-list` | all pass                                                    |

Do **NOT** gate on `npx nx lint web` — pre-existing monorepo eslint failure
unrelated to this change (see `plans/README.md`).

## Scope

**In scope** (the only files you should modify):

- `apps/web/pages/react-native-tools/index.tsx` (ItemList region only)
- `libs/ui/src/lib/tool-list/tool-card.tsx` (the `Link` `href` only)
- `apps/web/project.json` (the `postbuild` target only)
- `apps/web/public/sitemap.xml`, `apps/web/public/sitemap-0.xml`,
  `apps/web/public/robots.txt` (regenerated artifacts, committed)

**Out of scope** (do NOT touch):

- `apps/web/next-sitemap.config.js` — `outDir` pointing at the committed
  `public/` dir is intentional (comment in file explains why).
- `components/next-head.tsx` canonical logic — site-wide; fixing the link
  param removes the polluted asPath at the source.
- `tool-list.tsx`, `record-types.ts` — `id` remains a prop (React key).
- The Hero `title` region of `index.tsx` — plan 005.

## Git workflow

- Branch: `advisor/008-tools-crawl-hygiene` cut from `main`.
- One commit per sub-task is fine, or a single commit; conventional style,
  e.g. `fix: 🔍 crawl hygiene for react-native-tools (schema URLs, link params, sitemap)`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Point ItemList entries at internal detail pages

In `apps/web/pages/react-native-tools/index.tsx`, change the
`itemListElement` mapping (Excerpt 1) to:

```ts
    itemListElement: records.map((record, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: record.name,
      url: `https://weshipit.today/react-native-tools/${record.slug}`,
    })),
```

(Every fixture record has a `slug`; `[slug].tsx`'s `getStaticPaths` already
filters on it. Do not keep `website_url` in the schema.)

**Verify**: `npx nx typecheck web` → exit 0.

### Step 2: Drop the stray `id` from the card link

First sweep for consumers that might rely on the `?id=` param:

```bash
grep -rn "ToolCard" apps/ libs/ --include="*.tsx" | grep -v node_modules | grep -v ".spec." | grep -v ".stories."
grep -rn "query.id\|query\['id'\]" apps/web/pages/ | grep -v node_modules
```

Expected: `ToolCard` is referenced only by `tool-list.tsx` (plus its own
spec/stories), and **no page reads `query.id`**. If either grep shows a real
consumer of the `id` query param, STOP.

Then in `libs/ui/src/lib/tool-list/tool-card.tsx`, change the `Link` (Excerpt 2)
to:

```tsx
      <Link
        href={{
          pathname: '/react-native-tools/[slug]',
          query: { slug },
        }}
      >
```

Leave the `id` prop and its destructuring in place (used as `key` upstream);
if the unused-variable warning appears, keep `id` in the destructure anyway —
it is part of `RecordProps` spread.

**Verify**:

- `npx nx test ui --testPathPattern=tool-list` → all pass
- `npx nx build web && grep -c 'react-native-tools/[a-z-]*?id=' dist/apps/web/.next/server/pages/react-native-tools.html` → `0` (grep exits 1 with count 0 — that is success)

### Step 3: Chain sitemap regeneration to the build

In `apps/web/project.json`, add `dependsOn` to the `postbuild` target:

```json
    "postbuild": {
      "executor": "nx:run-commands",
      "dependsOn": ["build"],
      "options": {
        "commands": [
          {
            "command": "next-sitemap --config apps/web/next-sitemap.config.js"
          }
        ]
      }
    },
```

**Verify**: `npx nx run web:postbuild` → runs `build` first if stale, then
next-sitemap; exits 0 and rewrites `apps/web/public/sitemap-0.xml` with a
fresh `<lastmod>`.

### Step 4: Regenerate and commit the sitemap artifacts

```bash
npx nx run web:postbuild
git diff --stat apps/web/public/
```

Commit the updated `sitemap.xml`, `sitemap-0.xml`, `robots.txt`.

**Verify**: every tool slug present in the fixture has a sitemap entry:

```bash
node -e "
const { tools } = require('./apps/web/fixtures/tools.fixture.ts');
" 2>/dev/null || \
grep -o \"slug: '[a-z0-9-]*'\" apps/web/fixtures/tools.fixture.ts | sed \"s/slug: '//;s/'//\" | \
  while read s; do grep -q \"react-native-tools/$s<\" apps/web/public/sitemap-0.xml || echo \"MISSING: $s\"; done
```

Expected: no `MISSING:` lines. (In particular, if the fixture on this branch
contains `slug: 'revopush'`, the regenerated sitemap must include it.)

## Test plan

- Existing spec `libs/ui/src/lib/tool-list/tool-list.spec.tsx` must keep
  passing (Step 2 verify). If it snapshots the card `href`, update the
  snapshot — the new href without `?id=` is the intended behavior.
- No new tests: schema/JSON-LD and sitemap output are covered by the built-
  artifact greps above, matching how plans 002–004 verified structured data.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npx nx typecheck web` exits 0 and `npx nx build web` exits 0
- [ ] Built index HTML's ItemList JSON-LD contains `weshipit.today/react-native-tools/` URLs and **no** vendor domains: `grep -o '"itemListElement":[^]]*]' dist/apps/web/.next/server/pages/react-native-tools.html | grep -c 'segment.com'` → 0
- [ ] Built index HTML contains no `?id=` in tool links (Step 2 grep → 0)
- [ ] `npx nx test ui --testPathPattern=tool-list` → all pass
- [ ] Step 4 slug sweep prints no `MISSING:` lines
- [ ] `git status` shows only the in-scope files modified
- [ ] `plans/README.md` status row for 008 updated

## STOP conditions

Stop and report back (do not improvise) if:

- Any excerpt doesn't match the live code beyond plan-005's expected Hero
  region.
- The Step 2 sweep finds a consumer reading the `id` query param, or `ToolCard`
  used with a different route than `/react-native-tools/[slug]`.
- Any fixture record lacks a `slug` (Step 1 would emit a `/undefined` URL) —
  check `grep -c "slug:" apps/web/fixtures/tools.fixture.ts` equals the record
  count (`grep -c "id: 'rec"`).
- `npx nx run web:postbuild` deletes or rewrites `robots.txt` in a way that
  changes its policies (diff should only touch the sitemap URL/lastmod lines,
  if anything).
- Nx complains that `dependsOn` is invalid for `nx:run-commands` in this
  workspace's Nx version — report the error rather than restructuring targets.

## Maintenance notes

- **Process note for the operator**: with `dependsOn` in place the sitemap
  still only regenerates when someone runs `nx run web:postbuild` — the flow
  is "regenerate locally + commit" by design. Whoever adds a new page/tool
  should run it and commit the artifacts (consider a CI check later:
  regenerate and `git diff --exit-code apps/web/public/sitemap-0.xml`).
- The ItemList URL shape (`https://weshipit.today/react-native-tools/${slug}`)
  duplicates the `toolUrl` construction in `[slug].tsx:50`; if the domain or
  path ever changes, both must move (a shared constant was deliberately not
  introduced to keep this diff minimal).
- Reviewer should scrutinize: the `tool-card.tsx` change is in a shared lib —
  confirm the Storybook story (`tool-card` stories under
  `libs/ui/src/lib/tool-list/`) still renders.
