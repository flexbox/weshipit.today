# weshipit.today

- [Getting started with Nx —our monorepo tool](./docs/nx.md)
- [Running Nx migrations](./docs/nx-migration.md)
- [Check others docs](./docs/)

## Tooling

- Monorepo generated using [Nx](https://nx.dev/getting-started/intro)
- UI design with [tailwindCSS](https://tailwindcss.com/docs/)
- Design system with Storybook [design.weshipit.today](https://design.weshipit.today/)
- Stepzen GraphQL API for Airtable data [dashboard.stepzen.com](https://dashboard.stepzen.com/)
- Airtable API reference [airtable.com/api](https://airtable.com/api)
- Headless content management system with [prismic.io](https://weshipit.prismic.io/)

## Getting Started

Install global dependencies

```bash
yarn global add nx
vercel env pull
```

To make Stepzen work, you need to create a `.env` file on `apps/weshipit`

```bash
cp apps/weshipit/.env.sample apps/weshipit/.env
```

Run the project

```bash
yarn
yarn start
```

## Community

💬 Join us on [Slack](https://weblille.rocks/) to discuss.

⭐️ Help us out by [starring on GitHub](https://github.com/flexbox/weshipit.today), filing bug reports in [issues](https://github.com/flexbox/weshipit.today/issues) with questions or proposals.

👥 Follow `flexbox_` on [Twitter](https://twitter.com/intent/follow?screen_name=flexbox_) for more updates.

## Was this helpful?

☕️ [Leaving a tip helps me a lot!](https://github.com/sponsors/flexbox?frequency=one-time&sponsor=flexbox)
