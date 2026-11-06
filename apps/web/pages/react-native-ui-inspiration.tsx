import { Layout } from '../components/layout';

import { Badge, Card, Hero, Text } from '@weshipit/ui';
import Head from 'next/head';
import Link from 'next/link';

interface InspirationResource {
  url: string;
  name: string;
  bestFor: string;
  pricing: string;
  description: string;
}

interface InspirationCategory {
  id: string;
  intro: string;
  title: string;
  resources: InspirationResource[];
}

const categories: InspirationCategory[] = [
  {
    id: 'animations',
    intro:
      'Motion is what makes a React Native app feel native. These libraries show you working Reanimated and Gesture Handler code, so you can copy an interaction instead of rebuilding it from a Dribbble shot.',
    resources: [
      {
        bestFor: 'Shipping polished micro-interactions fast',
        description:
          'A library of premium React Native animations built with Reanimated, Gesture Handler and Skia. Each animation ships with its full source code, and you can preview them all in a companion app before you buy.',
        name: 'Animate React Native',
        pricing: 'Free animations + paid lifetime access',
        url: 'https://www.animatereactnative.com',
      },
      {
        bestFor: 'Learning how an animation is built',
        description:
          'A gallery of React Native animations made with Reanimated, Gesture Handler, the Animated API and Skia. Browse the examples, read the code and use it to level up your own motion design.',
        name: 'Make It Animated',
        pricing: 'Free examples + paid plan',
        url: 'https://makeitanimated.dev/',
      },
    ],
    title: 'React Native animation libraries',
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
        url: 'https://nativebloom.dev/',
      },
    ],
    title: 'React Native UI blocks',
  },
  {
    id: 'design-inspiration',
    intro:
      'Before you write a single component, check how the best apps solve the same flow. Onboarding, paywalls and settings screens are solved problems.',
    resources: [
      {
        bestFor: 'UX research before you design a flow',
        description:
          'A searchable library of more than 600,000 screenshots from real mobile and web apps. Filter by screen, flow or UI element to see how top apps handle onboarding, paywalls, empty states and more.',
        name: 'Mobbin',
        pricing: 'Free tier + paid plans',
        url: 'https://mobbin.com/',
      },
    ],
    title: 'Mobile app design inspiration',
  },
];

const allResources = categories.flatMap((category) => category.resources);

const PAGE_URL = 'https://weshipit.today/react-native-ui-inspiration';
const SEO_DESCRIPTION =
  'The best places to find React Native UI inspiration: animation libraries, ready-made UI blocks and real app screenshots to design and ship faster.';

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

function ResourceCard({ resource }: { resource: InspirationResource }) {
  return (
    <Card className="flex flex-col justify-between rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800">
      <div>
        <Text
          as="h3"
          variant="h4"
          className="mb-2 font-semibold text-gray-800 dark:text-gray-100"
        >
          {resource.name}
        </Text>
        <div className="mb-4">
          <Badge variant="gray" size="sm">
            {resource.pricing}
          </Badge>
        </div>
        <Text as="p" variant="p1" className="mb-4 text-gray-600">
          {resource.description}
        </Text>
        <Text as="p" variant="p2" className="mb-4 text-gray-500">
          <span className="font-semibold">Best for:</span> {resource.bestFor}
        </Text>
      </div>

      <div className="mt-auto pt-4">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-blue-300 bg-blue-100 px-4 py-2 text-md font-medium text-blue-700 transition-colors hover:border-blue-400 hover:bg-blue-200 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-300 dark:hover:border-blue-600 dark:hover:bg-blue-800"
        >
          <span>Visit {resource.name}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-1 h-3 w-3"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </a>
      </div>
    </Card>
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
        name: category.title,
      }))}
      callToActionButton={{ href: '/', name: 'Work with us' }}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      </Head>

      <div className="mx-auto mb-12 max-w-6xl px-4 sm:px-6">
        <Hero
          title={
            <>
              React Native UI inspiration
              <br />
              for apps that feel native.
            </>
          }
          description={
            <>
              Good-looking apps are rarely designed from scratch. These are the
              animation libraries, UI blocks and screenshot galleries we use
              when we build React Native apps for our clients. Each one saves
              you hours of design and prototyping.
            </>
          }
        />
      </div>

      <div className="mx-auto grid max-w-screen-xl gap-16 px-4 pb-12 sm:px-6 md:gap-24">
        {categories.map((category) => (
          <section key={category.id} id={category.id}>
            <Text
              as="h2"
              variant="s2"
              className="my-6 font-semibold text-gray-800 dark:text-gray-100"
            >
              {category.title}
            </Text>
            <Text as="p" variant="p1" className="mb-8 max-w-3xl text-gray-600">
              {category.intro}
            </Text>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.resources.map((resource) => (
                <ResourceCard key={resource.url} resource={resource} />
              ))}
            </div>
          </section>
        ))}

        <section id="how-to-choose" className="max-w-3xl">
          <Text
            as="h2"
            variant="s2"
            className="my-6 font-semibold text-gray-800 dark:text-gray-100"
          >
            How to use these resources together
          </Text>
          <Text as="p" variant="p1" className="mb-4 text-gray-600">
            Start with Mobbin to see how established apps solve the flow you are
            about to build. Then pick a matching screen in Native Bloom, and
            finish with an animation from Animate React Native or Make It
            Animated to make the interaction feel right on both iOS and Android.
          </Text>
          <Text as="p" variant="p1" className="text-gray-600">
            Need the plumbing too? Browse our{' '}
            <Link
              href="/react-native-tools"
              className="font-semibold text-blue-500 underline underline-offset-4 hover:text-blue-700"
            >
              React Native tools directory
            </Link>
            , start from one of the{' '}
            <Link
              href="/react-native-starters"
              className="font-semibold text-blue-500 underline underline-offset-4 hover:text-blue-700"
            >
              React Native starters
            </Link>
            , or learn the basics with our{' '}
            <Link
              href="/react-native-resources"
              className="font-semibold text-blue-500 underline underline-offset-4 hover:text-blue-700"
            >
              React Native learning resources
            </Link>
            .
          </Text>
        </section>
      </div>
    </Layout>
  );
}
