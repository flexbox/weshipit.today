# next.davidl.fr

- Build with [Next.js](https://nextjs.org)
- Hosted / Analytics on [Vercel](https://vercel.com)
- Content managed with [Prismic](https://davidl.prismic.io)
- Styled with [Tailwind CSS](https://tailwindcss.com) and styled-components
- Auth with [Supabase](https://supabase.com) magic links (project `bootcamp`)

## Getting started

```console
cp .env.local.example .env.local
# fill in the values, then from the monorepo root:
yarn
yarn davidl-fr:start
```

## Environment variables

Env vars are managed in the Vercel project `next-davidl-fr`. Use the Vercel CLI from `apps/davidl-fr`:

```console
cd apps/davidl-fr
vercel link --yes --project next-davidl-fr   # one time; if it appends `.env*` to .gitignore, revert that line
vercel env ls
vercel env add NAME production               # repeat for preview and development
vercel env pull .env.local --environment=development
```

`vercel env pull` overwrites `.env.local` with the Development environment only, so first make sure every var you need is set in Development.

See [`.env.local.example`](./.env.local.example) for the full list. Required to run locally:

- `NEXT_PUBLIC_BASEQL_API_URL` — GraphQL endpoint for workshop challenges
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — Supabase project `bootcamp`, from Project Settings → API Keys
- `PRISMIC_API_ENDPOINT` / `PRISMIC_ACCESS_TOKEN` — [Prismic](https://prismic.io) CMS access
- `MAILCHIMP_API_KEY` / `MAILCHIMP_LIST_ID` — newsletter subscriptions

## Supabase

The Supabase project lives in [`supabase/`](./supabase). Project `bootcamp`, ref `lsksfgdlzplqvherujbq`.

Run every Supabase CLI command through Nx from the monorepo root. The command then always runs inside `apps/davidl-fr`, whatever folder you are in.

```console
# one time: log in and link the CLI to the remote project
supabase login
yarn davidl-fr:supabase link --project-ref lsksfgdlzplqvherujbq

yarn davidl-fr:db:pull    # pull remote schema changes into supabase/migrations
yarn davidl-fr:db:push    # apply local migrations to the remote database
yarn davidl-fr:db:types   # regenerate src/types/supabase.ts

# any other command, for example:
yarn davidl-fr:supabase migration new add_profiles
yarn davidl-fr:supabase migration list
```

The GitHub integration watches the `apps/davidl-fr` working directory. Migrations merged into `main` are applied to production automatically, so you only need `db:push` for changes you want live before merging.

`supabase/config.toml` only configures the local stack (`supabase start`). Set the hosted auth URLs in the dashboard under Authentication → URL Configuration: Site URL `https://davidl.fr`, plus the `/workshop/auth/callback` redirect URLs.

## New `/mobile/[slug]` page

1. `cp -a src/data/designDetailsPosts/template/. src/data/designDetailsPosts/slug`
1. Update `data/designDetailsPosts/index.ts`
1. Search "app store `slug`" on Google for the icon
1. Open [vimeo](https://vimeo.com/manage/videos)
1. Select a video > Distribution > Links
