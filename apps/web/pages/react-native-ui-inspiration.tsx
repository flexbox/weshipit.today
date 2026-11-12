import { Layout } from '../components/layout';

import { Badge, CompanyLogo, Text } from '@weshipit/ui';
import Head from 'next/head';
import Link from 'next/link';

interface InspirationResource {
  url: string;
  name: string;
  tags: string[];
  bestFor: string;
  pricing: string;
  description: string;
}

interface InspirationCategory {
  id: string;
  step: string;
  intro: string;
  title: string;
  shortTitle: string;
  resources: InspirationResource[];
}

const categories: InspirationCategory[] = [
  {
    id: 'screens-and-flows',
    intro:
      'Before you write a single component, check how the best apps solve the same flow. Onboarding, paywalls and settings screens are solved problems.',
    resources: [
      {
        bestFor: 'UX research before you design a flow',
        description:
          'A searchable library of more than 600,000 screens from real mobile and web apps. Filter by screen, flow or UI element to see how top apps handle onboarding, paywalls, empty states and more.',
        name: 'Mobbin',
        pricing: 'Free tier + paid plans',
        tags: ['Screens', 'Flows', 'UI patterns'],
        url: 'https://mobbin.com/',
      },
      {
        bestFor: 'Studying a full funnel, from first screen to purchase',
        description:
          'A design library of thousands of mobile apps, with full recordings of each flow from the first launch to after the purchase. Every screen is tagged, and each app comes with revenue and download estimates.',
        name: 'ScreensDesign',
        pricing: 'Pro plan available',
        tags: ['Flow recordings', 'Onboarding', 'Paywalls'],
        url: 'https://screensdesign.com/',
      },
    ],
    shortTitle: 'Screens & flows',
    step: 'Research',
    title: 'Real app screens and flows',
  },
  {
    id: 'growth',
    intro:
      'A beautiful app still needs to convert. See how top apps run their onboarding, their paywalls and the ads that bring users in.',
    resources: [
      {
        bestFor: 'Borrowing proven onboarding and paywall tactics',
        description:
          'A collection of growth tricks and real examples from top apps: onboarding steps, paywall layouts, and the ads and organic content that drive their installs.',
        name: 'AppFuel',
        pricing: 'Pricing on their site',
        tags: ['Paywalls', 'Onboarding', 'Ads'],
        url: 'https://www.theappfuel.com/',
      },
    ],
    shortTitle: 'Growth',
    step: 'Convert',
    title: 'Onboarding, paywalls and ads',
  },
  {
    id: 'animations',
    intro:
      'Motion is what makes a React Native app feel native. Find the interaction you want, then copy working Reanimated and Gesture Handler code instead of rebuilding it from a video.',
    resources: [
      {
        bestFor: 'Finding the micro-interaction you want',
        description:
          'A curated collection of more than 2,000 animations and interaction details from the best iOS and web apps. Browse by app or by motion type to see what a polished transition looks like.',
        name: '60fps',
        pricing: 'Free to explore + Pro from $15/month',
        tags: ['Motion', 'Interactions', 'iOS'],
        url: 'https://60fps.design/',
      },
      {
        bestFor: 'Shipping polished micro-interactions fast',
        description:
          'A library of premium React Native animations built with Reanimated, Gesture Handler and Skia. Each animation ships with its full source code, and you can preview them all in a companion app before you buy.',
        name: 'Animate React Native',
        pricing: 'Free animations + paid lifetime access',
        tags: ['Source code', 'Reanimated', 'Skia'],
        url: 'https://www.animatereactnative.com',
      },
      {
        bestFor: 'Learning how an animation is built',
        description:
          'A gallery of React Native animations made with Reanimated, Gesture Handler, the Animated API and Skia. Browse the examples, read the code and use it to level up your own motion design.',
        name: 'Make It Animated',
        pricing: 'Free examples + paid plan',
        tags: ['Source code', 'Reanimated', 'Tutorials'],
        url: 'https://makeitanimated.dev/',
      },
    ],
    shortTitle: 'Animations',
    step: 'Animate',
    title: 'Animations and interactions',
  },
  {
    id: 'ui-blocks',
    intro:
      'When you need a full screen or section, not a single animation, start from a block that already works on iOS and Android.',
    resources: [
      {
        bestFor: 'Finding a ready-made screen in seconds',
        description:
          'A handpicked catalog of React Native UI blocks from real builders. Every block has a video preview, and the catalog plugs into your code editor over MCP, so your AI agent can search it for you.',
        name: 'Native Bloom',
        pricing: 'Free catalog + Pro from $8/month',
        tags: ['UI blocks', 'Video previews', 'MCP'],
        url: 'https://nativebloom.dev/',
      },
    ],
    shortTitle: 'UI blocks',
    step: 'Build',
    title: 'Ready-made React Native UI blocks',
  },
];

const allResources = categories.flatMap((category) => category.resources);

const PAGE_URL = 'https://weshipit.today/react-native-ui-inspiration';
const SEO_DESCRIPTION =
  'The best places to find React Native UI inspiration: real app screens and flows, paywall and onboarding examples, animation libraries and ready-made UI blocks.';

export async function getStaticProps() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    description: SEO_DESCRIPTION,
    itemListElement: allResources.map((resource, index) => ({
      '@type': 'ListItem',
      name: resource.name,
      position: index + 1,
      url: resource.url,
    })),
    name: 'React Native UI inspiration and animation libraries',
    numberOfItems: allResources.length,
    url: PAGE_URL,
  };

  return {
    props: {
      itemListSchema,
    },
  };
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

function ResourceCard({ resource }: { resource: InspirationResource }) {
  return (
    <li className="group relative flex min-w-0 flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-shadow duration-300 hover:shadow-lg dark:bg-slate-800 dark:ring-white/10">
      <div className="flex items-center gap-4">
        <div className="size-12 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-700">
          <CompanyLogo
            name={resource.name}
            websiteUrl={resource.url}
            size={48}
          />
        </div>
        <div className="min-w-0">
          <Text
            as="h3"
            variant="s2"
            className="font-semibold text-slate-900 dark:text-slate-100"
          >
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none group-focus-within:underline"
            >
              {resource.name}
            </a>
          </Text>
          <Text as="p" variant="c2" className="text-slate-500">
            {resource.pricing}
          </Text>
        </div>
        <ExternalIcon className="ms-auto size-5 shrink-0 text-slate-400 transition-colors group-hover:text-blue-600" />
      </div>

      <Text as="p" variant="p2" className="text-slate-600 dark:text-slate-300">
        {resource.description}
      </Text>

      <div className="mt-auto flex flex-col gap-3 pt-2">
        <Text
          as="p"
          variant="p2"
          className="text-slate-900 dark:text-slate-100"
        >
          <span className="font-semibold">Best for:</span> {resource.bestFor}
        </Text>
        <ul className="flex flex-wrap gap-2" aria-label="Topics">
          {resource.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="gray-lighter" size="sm">
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function ReactNativeUiInspirationPage({ itemListSchema }) {
  return (
    <Layout
      seoTitle="React Native UI Inspiration & Animations"
      seoDescription={SEO_DESCRIPTION}
      ogImageTitle="React Native UI Inspiration"
      ogImageKicker="Free directory"
      withHeader
      withFooter
      navigation={categories.map((category) => ({
        href: `#${category.id}`,
        name: category.shortTitle,
      }))}
      callToActionButton={{ href: '/', name: 'Work with us' }}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      </Head>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
        <header className="flex max-w-3xl flex-col gap-6 py-12 lg:py-24">
          <Badge variant="blue" size="sm" className="self-start">
            Free directory · {allResources.length} handpicked resources
          </Badge>
          <Text as="h1" variant="h2" className="text-balance">
            React Native UI inspiration for apps that feel native
          </Text>
          <Text
            as="p"
            variant="p1"
            className="text-pretty text-slate-600 dark:text-slate-400"
          >
            Good-looking apps are rarely designed from scratch. This is the
            short list of screen libraries, paywall examples, animation
            galleries and UI blocks we use when we build React Native apps for
            our clients. Each one saves you hours of design and prototyping.
          </Text>

          <nav aria-label="Categories">
            <ul className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`#${category.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-300 transition-colors hover:bg-slate-50 hover:ring-slate-400 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600 dark:hover:bg-slate-700"
                  >
                    {category.shortTitle}
                    <span className="rounded-full bg-slate-100 px-2 text-xs tabular-nums text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                      {category.resources.length}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div className="flex flex-col gap-24 pb-24">
          {categories.map((category, index) => (
            <section
              key={category.id}
              id={category.id}
              aria-labelledby={`${category.id}-title`}
              className="flex scroll-mt-24 flex-col gap-8"
            >
              <div className="flex max-w-3xl flex-col gap-3">
                <Text
                  as="p"
                  variant="c2"
                  className="font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400"
                >
                  Step {index + 1} · {category.step}
                </Text>
                <Text
                  as="h2"
                  variant="h4"
                  id={`${category.id}-title`}
                  className="text-balance font-semibold text-slate-900 dark:text-slate-100"
                >
                  {category.title}
                </Text>
                <Text
                  as="p"
                  variant="p1"
                  className="text-pretty text-slate-600 dark:text-slate-400"
                >
                  {category.intro}
                </Text>
              </div>
              <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-6">
                {category.resources.map((resource) => (
                  <ResourceCard key={resource.url} resource={resource} />
                ))}
              </ul>
            </section>
          ))}

          <section
            id="how-to-choose"
            aria-labelledby="how-to-choose-title"
            className="flex scroll-mt-24 flex-col gap-8 rounded-3xl bg-slate-50 p-6 sm:p-10 dark:bg-slate-800/50"
          >
            <div className="flex max-w-3xl flex-col gap-3">
              <Text
                as="h2"
                variant="h4"
                id="how-to-choose-title"
                className="font-semibold text-slate-900 dark:text-slate-100"
              >
                How to use these resources together
              </Text>
              <Text
                as="p"
                variant="p1"
                className="text-pretty text-slate-600 dark:text-slate-400"
              >
                Each category covers one step, from the first sketch to the
                shipped screen.
              </Text>
            </div>
            <ol className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,14rem),1fr))] gap-6">
              <li className="flex flex-col gap-2">
                <Text as="p" variant="s2" className="font-semibold">
                  1. Research the flow
                </Text>
                <Text as="p" variant="p2" className="text-slate-600">
                  Open Mobbin or ScreensDesign and see how established apps
                  solve the flow you are about to build.
                </Text>
              </li>
              <li className="flex flex-col gap-2">
                <Text as="p" variant="s2" className="font-semibold">
                  2. Plan the conversion
                </Text>
                <Text as="p" variant="p2" className="text-slate-600">
                  Check AppFuel for the onboarding and paywall tactics that
                  already work in your category.
                </Text>
              </li>
              <li className="flex flex-col gap-2">
                <Text as="p" variant="s2" className="font-semibold">
                  3. Pick the motion
                </Text>
                <Text as="p" variant="p2" className="text-slate-600">
                  Find the interaction on 60fps, then grab working code from
                  Animate React Native or Make It Animated.
                </Text>
              </li>
              <li className="flex flex-col gap-2">
                <Text as="p" variant="s2" className="font-semibold">
                  4. Ship the screen
                </Text>
                <Text as="p" variant="p2" className="text-slate-600">
                  Start from a Native Bloom block so the screen works on iOS and
                  Android from day one.
                </Text>
              </li>
            </ol>
            <Text as="p" variant="p2" className="max-w-3xl text-slate-600">
              Need the plumbing too? Browse our{' '}
              <Link
                href="/react-native-tools"
                className="font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-800 dark:text-blue-400"
              >
                React Native tools directory
              </Link>
              , start from one of the{' '}
              <Link
                href="/react-native-starters"
                className="font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-800 dark:text-blue-400"
              >
                React Native starters
              </Link>
              , or learn the basics with our{' '}
              <Link
                href="/react-native-resources"
                className="font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-800 dark:text-blue-400"
              >
                React Native learning resources
              </Link>
              .
            </Text>
          </section>
        </div>
      </div>
    </Layout>
  );
}
