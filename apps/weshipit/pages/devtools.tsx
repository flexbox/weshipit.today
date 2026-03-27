import { AppBadge, Button, Card, Hero, TagList, Text } from '@weshipit/ui';
import { Layout } from '../components/layout';
import { InferGetStaticPropsType } from 'next/types';
import { devtoolsFixture, DevTool } from '../fixtures/devtools.fixture';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

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
  const sorted = [...devtoolsFixture.records].sort((a, b) =>
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

  return {
    props: {
      devtools,
      allFeatures,
    },
  };
}

function DevToolCard({ tool }: { tool: DevToolWithIcon }) {
  const {
    name,
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
      {description_success && (
        <Text
          variant="p2"
          as="p"
          className="text-gray-600 dark:text-gray-400 line-clamp-3"
        >
          {description_success}
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
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeFeature, setActiveFeature] = useState<string>('');

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
      seoDescription="A collection of all the apps React Native developers need on their phone to debug and work efficiently."
    >
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 py-12 md:py-20 mb-12">
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
              onClick={() => handleFeatureClick(feature)}
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
      </div>
    </Layout>
  );
}
