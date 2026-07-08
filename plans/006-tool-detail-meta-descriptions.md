# Plan 006: Strip markdown from tool detail-page meta descriptions and schema

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
> a STOP condition. (Note: plan 007 also edits this file, in a different
> region — if 007 already landed, only the `recommendedRecords`/heading region
> will differ; that is expected drift, proceed.)

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: seo (snippets / structured data)
- **Planned at**: commit `a7457e8`, 2026-07-08

## Why this matters

All ~49 tool detail pages (`/react-native-tools/<slug>`) generate their meta
description by slicing the first 130 characters of `description_success` — a
field that is a **numbered markdown list**. Google therefore sees descriptions
like:

```
Segment for React Native — 1. **Install once, send everywhere.** Add the Segment React Native SDK and connect all your analytics destinations (Mixpanel...
```

Raw `**`, backticks, and `1.` markers in SERP snippets look broken and depress
click-through on every page in the directory. The same markdown leaks into the
`SoftwareApplication` JSON-LD `description`. The fix is a small local
markdown-stripping helper plus preferring the prose `description` field over
the list-formatted `description_success`.

## Current state

- `apps/web/pages/react-native-tools/[slug].tsx` — SSG detail page
  (`getStaticPaths` + `getStaticProps`, `revalidate: 86400`). The bug is
  entirely inside `getStaticProps`.
- `apps/web/fixtures/tools.fixture.ts` — data source. Each record has:
  - `description` — 1–2 **prose paragraphs** of markdown (bold `**...**`,
    occasional backticks, `\n\n` paragraph breaks). Always present in practice
    but typed optional (`description?: string`).
  - `description_success?` — a markdown **numbered list** (`1. **Title.** body…`).

Excerpt as of `a7457e8` (`apps/web/pages/react-native-tools/[slug].tsx:39-60`):

```ts
const { name, description, description_success, website_url, platform } = record;

const rawDesc = description_success || description || '';
const seoDescription = `${name} for React Native${rawDesc ? ` — ${rawDesc.slice(0, 130)}...` : '.'}`;

const recommendedRecords = take(
  tools.filter((r) => r.slug !== slug),
  3,
);

const toolUrl = `https://weshipit.today/react-native-tools/${slug}`;

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  description: rawDesc.slice(0, 300) || null,
  url: website_url || null,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: platform?.join(', ') || null,
};
```

Two defects:

1. `description_success || description` prefers the numbered list.
2. `.slice()` on raw markdown keeps `**`, `` ` ``, `[..](..)`, list markers,
   and can cut mid-word.

Sample fixture data to sanity-check against
(`apps/web/fixtures/tools.fixture.ts`, record `slug: 'segment'`):
`description` starts: `Segment is a **customer data platform (CDP)** that
collects, unifies, and routes user events...`

Repo conventions: helpers used by a single page are defined as plain functions
in the same file, above `getStaticPaths` (no new lib). TypeScript, Prettier,
single quotes.

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

- `apps/web/pages/react-native-tools/[slug].tsx` — the `getStaticProps` region
  only (helper + `seoDescription` + `softwareAppSchema.description`).

**Out of scope** (do NOT touch):

- The rendered page body (`<ReactMarkdown>` blocks) — markdown there is
  intentional and rendered properly.
- `apps/web/fixtures/tools.fixture.ts` — do not rewrite data to work around
  the code.
- `recommendedRecords` and the "Other … tools" heading — that is plan 007.
- `components/next-head.tsx` — shared by the whole site.
- Adding a markdown-parsing dependency — use regex, the input is
  controlled/uniform fixture content.

## Git workflow

- Branch: `advisor/006-tool-detail-meta-descriptions` cut from `main`.
- Single commit, conventional style, e.g.
  `fix: 🔍 strip markdown from tool detail meta descriptions and schema`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add a `stripMarkdown` helper

In `apps/web/pages/react-native-tools/[slug].tsx`, above `getStaticPaths`, add:

```ts
function stripMarkdown(md: string): string {
  return md
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // [text](url) -> text
    .replace(/(\*\*|__|\*|_|`)/g, '') // emphasis + code markers
    .replace(/^\s*\d+\.\s+/gm, '') // numbered-list markers
    .replace(/^\s*[-*+]\s+/gm, '') // bullet markers
    .replace(/\s+/g, ' ') // newlines/multi-space -> single space
    .trim();
}

function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) {
    return text;
  }
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max)}…`;
}
```

**Verify**: `npx nx typecheck web` → exit 0.

### Step 2: Rebuild `seoDescription` from prose, stripped

Replace lines 42–43 (the `rawDesc` / `seoDescription` pair) with:

```ts
const proseSource = description || description_success || '';
const plainDesc = stripMarkdown(proseSource);
const prefix = `${name} for React Native`;
const seoDescription = plainDesc ? `${prefix} — ${truncateAtWord(plainDesc, 155 - prefix.length - 3)}` : `${prefix}.`;
```

Notes:

- Preference order is **reversed** vs today: `description` (prose) first.
- Total length budget ≈155 chars including the prefix and `—` separator.
- Empty-data fallback keeps the current generic `"{name} for React Native."`.

**Verify**: `npx nx typecheck web` → exit 0.

### Step 3: Use the stripped text in the JSON-LD schema

In `softwareAppSchema`, replace

```ts
    description: rawDesc.slice(0, 300) || null,
```

with

```ts
    description: plainDesc ? truncateAtWord(plainDesc, 300) : null,
```

(`rawDesc` should now have no remaining references — delete the variable.)

**Verify**: `grep -n "rawDesc" apps/web/pages/react-native-tools/\[slug\].tsx` → no matches.

### Step 4: Build and inspect a sample page

```bash
npx nx build web
node -e "
const html = require('fs').readFileSync('dist/apps/web/.next/server/pages/react-native-tools/segment.html','utf8');
const m = html.match(/<meta name=\"description\" content=\"([^\"]*)\"/);
console.log(m && m[1]);
"
```

**Verify**: the printed description

- starts with `Segment for React Native — Segment is a customer data platform`
- contains **no** `*`, `` ` ``, `[`, or a `1.` prefix
- is ≤160 characters and does not end mid-word (ends with a full word or `…`).

## Test plan

No page-level spec files exist in `apps/web/pages` (repo convention: pages are
verified by typecheck + build). The helper is small enough that the Step 4
built-HTML assertion is the regression test. Do not create a new test
infrastructure for this. If the repo later adds page tests, `stripMarkdown`
cases to cover: bold, inline code, links, numbered list, multi-paragraph.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npx nx typecheck web` exits 0
- [ ] `npx nx build web` exits 0
- [ ] Step 4 output for `segment` contains no `*`, backtick, `[`, or `1.` and is ≤160 chars
- [ ] Same check passes for one more slug (e.g. `expo` or any existing page under `dist/apps/web/.next/server/pages/react-native-tools/`)
- [ ] `grep -n "rawDesc" apps/web/pages/react-native-tools/[slug].tsx` → no matches
- [ ] `git status` shows only `apps/web/pages/react-native-tools/[slug].tsx` (plus `plans/README.md`) modified
- [ ] `plans/README.md` status row for 006 updated

## STOP conditions

Stop and report back (do not improvise) if:

- The `getStaticProps` code does not match the "Current state" excerpt beyond
  the expected plan-007 region.
- Any record in `tools.fixture.ts` has neither `description` nor
  `description_success` AND the fallback sentence would render an empty
  description — report which slugs.
- Fixing the description seems to require editing `tools.fixture.ts` or
  `next-head.tsx` — out of scope.
- Step 4's meta-description regex finds no match at all (page head structure
  changed — investigate before touching anything else).

## Maintenance notes

- New tools added to `tools.fixture.ts` automatically benefit; keep
  `description` as clean prose paragraphs — it is now the SERP snippet source.
- If a future change adds richer markdown to descriptions (tables, images),
  extend `stripMarkdown` accordingly; it is deliberately minimal.
- Reviewer: spot-check 2–3 built pages' meta descriptions and the
  `SoftwareApplication` JSON-LD block for readability.
- Deferred (audit finding 7, not planned): adding an `offers` block to
  `softwareAppSchema` for rich-result eligibility.
