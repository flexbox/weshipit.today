import { AppBadge, Button, Card, Hero, TagList, Text } from '@weshipit/ui';
import { Layout } from '../components/layout';
import { InferGetStaticPropsType } from 'next/types';
import { devtoolsFixture, DevTool } from '../fixtures/devtools.fixture';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import round from 'lodash/round';

type DevToolWithIcon = DevTool & { icon_url: string | null };

function extractAppId(iosUrl: string): string | null {
  const match = iosUrl.match(/id(\d+)/);
  return match ? match[1] : null;
}

async function fetchAppStoreIcon(appId: string): Promise<string | null> {
  try {
    const res = await fetch(`https://itunes.apple.com/lookup?id=${appId}`);
    const data = await res.json();
    const result = data.results?.[0];
    return result?.artworkUrl512 ?? result?.artworkUrl100 ?? null;
  } catch {
    return null;
  }
}

async function fetchPlayStoreIcon(androidUrl: string): Promise<string | null> {
  try {
    const match = androidUrl.match(/id=([^&]+)/);
    if (!match) return null;
    const packageName = match[1];
    const res = await fetch(
      `https://play.google.com/store/apps/details?id=${packageName}`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } },
    );
    const html = await res.text();
    const ogMatch = html.match(
      /<meta[^>]+property="og:image"[^>]+content="([^"]+)"/,
    );
    return ogMatch ? ogMatch[1] : null;
  } catch {
    return null;
  }
}

export async function getStaticProps() {
  const sorted = [...devtoolsFixture].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const devtools: DevToolWithIcon[] = await Promise.all(
    sorted.map(async (tool) => {
      const { ios_url, android_url } = tool;
      if (ios_url) {
        const appId = extractAppId(ios_url);
        const icon_url = appId ? await fetchAppStoreIcon(appId) : null;
        return { ...tool, icon_url };
      }
      if (android_url) {
        const icon_url = await fetchPlayStoreIcon(android_url);
        return { ...tool, icon_url };
      }
      return { ...tool, icon_url: null };
    }),
  );

  const allFeatures = Array.from(
    new Set(devtools.flatMap((t) => t.features ?? [])),
  ).sort();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'React Native Developer Tools',
    description:
      'A curated collection of apps React Native developers need to debug, test, and ship mobile apps.',
    url: 'https://weshipit.today/devtools',
    numberOfItems: devtools.length,
    itemListElement: devtools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      description: tool.description || tool.description_success || null,
      url: tool.website_url || null,
    })),
  };

  return {
    props: {
      devtools,
      allFeatures,
      itemListSchema,
    },
  };
}

function DevToolCard({ tool }: { tool: DevToolWithIcon }) {
  const {
    name,
    description,
    description_success,
    website_url,
    ios_url,
    android_url,
    features,
  } = tool;

  return (
    <Card size="md" className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {tool.icon_url ? (
          <Image
            src={tool.icon_url}
            width={64}
            height={64}
            alt={name}
            className="rounded-xl flex-shrink-0"
          />
        ) : (
          <div className="h-16 w-16 flex-shrink-0 rounded-xl bg-slate-200 dark:bg-slate-700" />
        )}
        <Text variant="s2" as="h3" className="font-bold">
          {name}
        </Text>
      </div>
      {(description || description_success) && (
        <Text
          variant="p2"
          as="p"
          className="text-gray-600 dark:text-gray-400 line-clamp-3"
        >
          {description || description_success}
        </Text>
      )}
      {features && features.length > 0 && <TagList tags={features} size="sm" />}
      <div className="flex gap-4 flex-wrap mt-auto">
        {website_url && <AppBadge link={website_url} platform="web" />}
        {ios_url && <AppBadge link={ios_url} platform="iOS" />}
        {android_url && <AppBadge link={android_url} platform="android" />}
      </div>
    </Card>
  );
}

export default function DevToolsPage({
  devtools,
  allFeatures,
  itemListSchema,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeFeature, setActiveFeature] = useState<string>('');
  const numberOfTools = round(devtools.length, -1);

  useEffect(() => {
    const feature = searchParams?.get('feature') ?? '';
    setActiveFeature(feature);
  }, [searchParams]);

  const filteredDevtools = useMemo(() => {
    if (!activeFeature) return devtools;
    return devtools.filter((t) =>
      t.features?.some((f) => f.toLowerCase() === activeFeature.toLowerCase()),
    );
  }, [devtools, activeFeature]);

  function handleFeatureClick(feature: string) {
    const next =
      activeFeature.toLowerCase() === feature.toLowerCase() ? '' : feature;
    router.push(
      next ? `/devtools?feature=${encodeURIComponent(next)}` : '/devtools',
    );
  }

  return (
    <Layout
      withFooter
      withHeader
      callToActionLink={{ name: 'Work with us', href: '/' }}
      seoTitle="React Native Developer Tools"
      seoDescription={`Discover ${numberOfTools}+ apps React Native developers need to debug, test, and ship mobile apps — curated tools for iOS, Android & Bluetooth testing.`}
      ogImageTitle="React Native Developer Tools"
      ogImageAlt="React Native Developer Tools — weshipit.today"
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      </Head>
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 py-12 md:py-4 mb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Hero
            title={
              <>
                <span className="text-white">
                  All the{' '}
                  {activeFeature && (
                    <span className="text-yellow-300">
                      {activeFeature.toLowerCase()}{' '}
                    </span>
                  )}
                  apps you need
                </span>
                <br />
                <span className="text-white">to ship React Native apps.</span>
              </>
            }
          >
            <Text
              as="p"
              variant="p1"
              className="my-4 !text-purple-100 max-w-2xl"
            >
              A curated collection of all the apps React Native developers need
              on their phone to debug, test, and ship mobile apps.
            </Text>
          </Hero>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="my-6 flex flex-wrap gap-2">
          <Button
            onClick={() => router.push('/devtools')}
            variant={!activeFeature ? 'primary' : 'outline'}
            size="md"
          >
            All
          </Button>
          {allFeatures.map((feature) => (
            <Button
              key={feature}
              onClick={() => {
                handleFeatureClick(feature);
              }}
              variant={
                activeFeature.toLowerCase() === feature.toLowerCase()
                  ? 'primary'
                  : 'outline'
              }
              size="md"
            >
              {feature}
            </Button>
          ))}
        </div>

        <div className="mb-24 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredDevtools.map((tool) => (
            <DevToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        <div className="m-auto max-w-4xl py-24 flex flex-col gap-6">
          <Card variant="gradient-pink" size="lg">
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <Text as="h2" variant="h4" className="mb-2 text-white">
                  Missing a tool?
                </Text>
                <p className="text-white/80 max-w-md">
                  This list is open source. Edit the fixture file on GitHub and
                  submit a pull request.
                </p>
              </div>
              <Button
                href="https://github.com/flexbox/weshipit.today/blob/main/apps/weshipit/fixtures/devtools.fixture.ts"
                size="xl"
                variant="outline"
                as="a"
                isExternalLink
                className="shrink-0"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                Edit on GitHub
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
