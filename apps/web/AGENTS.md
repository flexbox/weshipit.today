<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Checks

Gate changes on `npx nx typecheck web`, `npx nx test web` and `npx nx build web`. `npx nx lint web` fails on a monorepo eslint-config error that predates any current work, so don't gate on it.

## App Router migration

`apps/web` is moving from `pages/` to `app/`, one cluster of routes at a time. The plan, its checklist and the per-route recipe are in `docs/app-router/plan.md`. Three rules come from it:

- In a file under `app/`, and in any component it renders that is not `'use client'`, import UI components by path (`@weshipit/ui/text/text`), never from the `@weshipit/ui` barrel. The barrel makes the page ship every client component of the library (about 100 kB gzipped). `utils/server-imports.spec.ts` checks it.
- After a build, run `node apps/web/scripts/check-seo.mjs --snapshot-check`. It compares the SEO tags of every page with `scripts/head-snapshot.json`. Explain every difference, then update the file with `--snapshot`.
- Measure page JavaScript with `node apps/web/scripts/measure-js.mjs`.
