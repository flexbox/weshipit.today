# Plan 007: Make tool detail-page recommendations same-type and fix the heading

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat a7457e8..HEAD -- apps/web/pages/react-native-tools/[slug].tsx`
> If the file changed since this plan was written, compare the "Current state"
> excerpts against the live code before proceeding; on a mismatch, treat it as
> a STOP condition. (Note: plan 006 also edits this file, in the
> `seoDescription`/schema region — if 006 already landed, that region will
> differ; that is expected drift, proceed.)

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (recommended order: after 006 to keep diffs clean)
- **Category**: seo (internal linking) + bug (mislabeled heading)
- **Planned at**: commit `a7457e8`, 2026-07-08

## Why this matters

Every one of the ~49 tool detail pages shows a "related tools" section that is
**always the first 3 records of the fixture array** (Segment, Purchasely, …)
regardless of the current tool's category — under a heading that _claims_ they
are same-type ("Other {type} React Native tools"). Two problems:

1. **Weak topical internal linking** — same-category cross-links concentrate
   crawl relevance within each category cluster; random links dilute it.
2. **Rendering bug** — the heading interpolates the raw `type` **array**, so a
   multi-type tool renders "Other CI/CD & Release,Backend & APIs React Native
   tools".

## Current state

- `apps/web/pages/react-native-tools/[slug].tsx` — SSG detail page. Two
  regions are affected.

Excerpt 1 — `getStaticProps` (`[slug].tsx:45-48` as of `a7457e8`):

```ts
const recommendedRecords = take(
  tools.filter((r) => r.slug !== slug),
  3,
);
```

(`take` is `lodash/take`, imported at line 19. `tools` is the full fixture
array from `apps/web/fixtures/tools.fixture.ts`; each record's `type` is
`string[]`, e.g. `['CI/CD & Release']` or
`['CMS & Content', 'Backend & APIs']`.)

Excerpt 2 — page body (`[slug].tsx:261-269` as of `a7457e8`):

```tsx
{
  recommendedRecords.length > 0 && (
    <section className="py-12 max-w-6xl mx-auto">
      <Text as="h2" variant="h3" className="my-4">
        Other {type} React Native tools
      </Text>

      <ToolList records={recommendedRecords} />
    </section>
  );
}
```

(`type` here is destructured from `record` at line ~123 and is `string[]`.
JSX renders arrays by concatenating elements — hence the comma-joined bug for
multi-type tools.)

`ToolList` (`libs/ui/src/lib/tool-list/tool-list.tsx`) just maps records to
`ToolCard`s — it needs no changes.

## Commands you will need

| Purpose   | Command                                      | Expected on success |
| --------- | -------------------------------------------- | ------------------- |
| Install   | `yarn install` (only if node_modules absent) | exit 0              |
| Typecheck | `npx nx typecheck web`                       | exit 0              |
| Build     | `npx nx build web`                           | exit 0              |

Do **NOT** gate on `npx nx lint web` — pre-existing monorepo eslint failure
unrelated to this change (see `plans/README.md`).

## Scope

**In scope** (the only file you should modify):

- `apps/web/pages/react-native-tools/[slug].tsx`

**Out of scope** (do NOT touch):

- `libs/ui/src/lib/tool-list/**` (`ToolList`, `ToolCard`) — shared components.
- `apps/web/fixtures/tools.fixture.ts` — data stays as-is.
- The `seoDescription` / `softwareAppSchema` region — that is plan 006.

## Git workflow

- Branch: `advisor/007-tools-related-by-type` cut from `main` (or from 006's
  branch if executing sequentially).
- Single commit, conventional style, e.g.
  `fix: 🔗 recommend same-type tools on detail pages and fix heading`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Compute same-type recommendations with backfill

Replace the `recommendedRecords` block (Excerpt 1) with:

```ts
const sameType = tools.filter((r) => r.slug !== slug && r.type.some((t) => record.type.includes(t)));
const others = tools.filter((r) => r.slug !== slug && !r.type.some((t) => record.type.includes(t)));
const recommendedRecords = take([...sameType, ...others], 3);
```

Notes:

- Same-type = shares **at least one** entry of the `type` array.
- Backfill with unrelated tools only when fewer than 3 same-type tools exist
  (smallest categories today have 4+ members, so backfill is a safety net).
- Keep using the existing `take` import; do not add imports.

**Verify**: `npx nx typecheck web` → exit 0.

### Step 2: Fix the heading to use the primary type

In the page body (Excerpt 2), change

```tsx
            Other {type} React Native tools
```

to

```tsx
            Other {type[0]} React Native tools
```

`type[0]` is the tool's primary category (the fixture convention — first entry
is the primary type; see how single-type records dominate the fixture). Keep
the heading even when backfill made the list mixed — the list is majority
same-type by construction.

**Verify**: `npx nx typecheck web` → exit 0.

### Step 3: Build and inspect a sample page

```bash
npx nx build web
node -e "
const html = require('fs').readFileSync('dist/apps/web/.next/server/pages/react-native-tools/revopush.html','utf8');
const heading = html.match(/Other [^<]+ React Native tools/);
console.log('heading:', heading && heading[0]);
console.log('links to segment (old default #1):', html.includes('/react-native-tools/segment'));
"
```

(If `revopush.html` does not exist because the RevoPush fixture entry is not
yet on this branch, use any `CI/CD & Release` tool page instead — find one
with `grep -B8 \"'CI/CD & Release'\" apps/web/fixtures/tools.fixture.ts | grep slug`.)

**Verify**:

- heading prints `Other CI/CD & Release React Native tools` (no comma-joined
  array text),
- `links to segment` prints `false` for a non-Analytics tool (Segment was the
  old always-first recommendation; an Analytics-type page linking to Segment
  is correct and fine).

## Test plan

No page-level spec files exist in `apps/web/pages` (repo convention). The
Step 3 built-HTML assertions are the regression test. If executing together
with 006, run both plans' Step-verify assertions on the same build.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npx nx typecheck web` exits 0
- [ ] `npx nx build web` exits 0
- [ ] A `CI/CD & Release` tool's built page recommends CI/CD tools (Step 3 heading + link checks pass)
- [ ] A multi-type tool's page (e.g. slug for the record with `type: ['CMS & Content', 'Backend & APIs']`) renders a heading with **no comma** in the category
- [ ] `git status` shows only `apps/web/pages/react-native-tools/[slug].tsx` (plus `plans/README.md`) modified
- [ ] `plans/README.md` status row for 007 updated

## STOP conditions

Stop and report back (do not improvise) if:

- The two excerpts don't match the live code beyond plan-006's expected region.
- `record.type` turns out to be optional/empty for any fixture record
  (`type[0]` would render `undefined` in the heading) — check with
  `grep -c "type: \[\]" apps/web/fixtures/tools.fixture.ts` (expect 0) and
  report if nonzero.
- The change seems to require touching `ToolList`/`ToolCard` — out of scope.

## Maintenance notes

- When new tools are added to the fixture, first `type` entry = primary
  category; it now drives both the badge order and this heading.
- If a category ever shrinks below ~4 members, backfilled cards will appear
  under the same-type heading — acceptable, but a reviewer adding/removing
  many tools should be aware.
- Follow-up idea (not in scope): sort `sameType` by overlap count for
  multi-type tools; today's any-overlap filter is sufficient at 49 tools.
