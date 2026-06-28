# next.davidl.fr

- Build with [Next.js](https://nextjs.org)
- Hosted / Analytics on [Vercel](https://vercel.com)
- Content managed with [Prismic](https://davidl.prismic.io)
- Styled with [Tailwind CSS](https://tailwindcss.com) and styled-components
- Auth with [Magic](https://magic.link)

## Getting started

```console
cp .env.local.example .env.local
# fill in the values, then from the monorepo root:
yarn
yarn davidl-fr:start
```

## Environment variables

See [`.env.local.example`](./.env.local.example) for the full list. Required to run locally:

- `NEXT_PUBLIC_BASEQL_API_URL` — GraphQL endpoint for workshop challenges
- `MAGIC_SECRET_KEY` / `NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY` — [Magic.link](https://magic.link) auth keys, from the Magic dashboard
- `PRISMIC_API_ENDPOINT` / `PRISMIC_ACCESS_TOKEN` — [Prismic](https://prismic.io) CMS access
- `MAILCHIMP_API_KEY` / `MAILCHIMP_LIST_ID` — newsletter subscriptions

## Troubleshooting

If you encounter the following error:

`error This project's package.json defines "packageManager": "yarn@4.17.0". However the current global version of Yarn is 1.22.22.`

To resolve this issue, you need to change to Node.js version 22. You can use a version manager like `nvm` to switch to the required Node.js version.

## New `/mobile/[slug]` page

1. `cp -a src/data/designDetailsPosts/template/. src/data/designDetailsPosts/slug`
1. Update `data/designDetailsPosts/index.ts`
1. Search "app store `slug`" on Google for the icon
1. Open [vimeo](https://vimeo.com/manage/videos)
1. Select a video > Distribution > Links
