import { AppBadge, Button, Card, Hero, Prose, Text } from '@weshipit/ui';
import { Layout } from '../components/layout';
import { InferGetStaticPropsType } from 'next/types';
import Image from 'next/image';
import { formatAppsByCategory } from '../components/french-react-native-apps/format-apps-by-category';
import { linksApi } from './api/links';
import kebabCase from 'lodash/kebabCase';
import { useMemo, useState } from 'react';

import {
  filteredApp,
  frenchApp,
  frenchAppsFixture,
} from '../fixtures/french-apps.fixture';

type ViewMode =
  | 'category'
  | 'alphabetical'
  | 'ios'
  | 'android'
  | 'web'
  | 'podcast';

export async function getStaticProps() {
  const records: frenchApp[] = frenchAppsFixture.records.map((record) => ({
    name: record.fields.name,
    category: record.fields.category,
    logo_url: record.fields.logo_url,
    ios_url: record.fields.ios_url,
    android_url: record.fields.android_url,
    website_url: record.fields.website_url,
    podcast_url: record.fields.podcast_url,
  }));

  const categorizedApps = formatAppsByCategory(records);

  categorizedApps.sort((a, b) => a.category.localeCompare(b.category));

  return {
    props: {
      categorizedApps,
    },
  };
}

function AppGrid({ apps }: { apps: filteredApp[] }) {
  if (apps.length === 0) {
    return (
      <Text className="my-12 text-center text-gray-500 dark:text-gray-400">
        No applications found for this view.
      </Text>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {apps.map((app) => (
        <Card key={app.name} size={'md'}>
          <Image
            src={app.logo_url}
            width={96}
            height={96}
            alt={app.name}
            className="rounded-xl bg-slate-300 dark:bg-slate-700"
          />
          <Text variant="s2" as="h3" className="my-4 ml-1 font-bold">
            {app.name}
          </Text>
          <div className="flex gap-4 flex-wrap">
            {app.website_url && (
              <AppBadge link={app.website_url} platform="web" />
            )}
            {app.ios_url && <AppBadge link={app.ios_url} platform="iOS" />}
            {app.android_url && (
              <AppBadge link={app.android_url} platform="android" />
            )}
            {app.podcast_url && (
              <AppBadge link={app.podcast_url}>🎙️ Podcast</AppBadge>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function FrenchReactNativePage({
  categorizedApps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const currentYear = new Date().getFullYear();
  const heroTitle = `French companies using React Native in ${currentYear}`;
  const [viewMode, setViewMode] = useState<ViewMode>('category');

  const allApps = useMemo(() => {
    return categorizedApps.flatMap(
      (category) => category.apps as filteredApp[],
    );
  }, [categorizedApps]);

  const sortedApps = useMemo(() => {
    return [...allApps].sort((a, b) => a.name.localeCompare(b.name));
  }, [allApps]);

  const iosApps = useMemo(
    () => sortedApps.filter((app) => !!app.ios_url),
    [sortedApps],
  );
  const androidApps = useMemo(
    () => sortedApps.filter((app) => !!app.android_url),
    [sortedApps],
  );
  const webApps = useMemo(
    () => sortedApps.filter((app) => !!app.website_url),
    [sortedApps],
  );
  const podcastApps = useMemo(
    () => sortedApps.filter((app) => !!app.podcast_url),
    [sortedApps],
  );

  const viewOptions: { id: ViewMode; label: string }[] = [
    { id: 'category', label: 'Category' },
    { id: 'alphabetical', label: 'Alphabetical' },
    { id: 'ios', label: 'iOS' },
    { id: 'android', label: 'Android' },
    { id: 'web', label: 'Web' },
    { id: 'podcast', label: 'Podcast' },
  ];

  return (
    <Layout
      withFooter
      withContainer
      withHeader
      callToActionLink={{ name: 'Work with us', href: '/' }}
      callToActionButton={{
        name: 'Add your app',
        href: linksApi.airtable.FRENCH_REACT_NATIVE_APPS_FORM,
        isExternalLink: true,
      }}
      seoTitle="React Native Usage Among French Companies"
      seoDescription="Discover how French companies like BlaBlaCar, Doctolib, Ledger, and Shine are harnessing the power of React Native to create robust mobile applications."
    >
      <Hero title={heroTitle} />
      <Prose size="xl" className="my-8">
        <p>
          We are building a list of french iOS and Android apps that are using
          React Native in {currentYear}. If you&apos;re working in a french
          company that uses React Native,{' '}
          <a href={linksApi.airtable.FRENCH_REACT_NATIVE_APPS_FORM}>
            add your app
          </a>{' '}
          to the list.
        </p>
      </Prose>

      <div className="my-8 flex justify-start flex-wrap gap-2">
        {viewOptions.map((option) => (
          <Button
            key={option.id}
            onClick={() => setViewMode(option.id)}
            variant={viewMode === option.id ? 'primary' : 'outline'}
            size="md"
          >
            {option.label}
          </Button>
        ))}
      </div>

      <div className="mb-24">
        {viewMode === 'category' && (
          <div className="flex flex-col gap-8">
            {categorizedApps.length > 0 ? (
              categorizedApps.map((category) => (
                <section
                  key={category.category}
                  id={kebabCase(category.category)}
                >
                  <Text
                    variant={'h4'}
                    as={'h2'}
                    className="mb-6 mt-8 capitalize"
                  >
                    {category.category}
                  </Text>
                  <AppGrid apps={category.apps} />
                </section>
              ))
            ) : (
              <Text className="my-12 text-center text-gray-500 dark:text-gray-400">
                No applications found.
              </Text>
            )}
          </div>
        )}

        {viewMode === 'alphabetical' && <AppGrid apps={sortedApps} />}
        {viewMode === 'ios' && <AppGrid apps={iosApps} />}
        {viewMode === 'android' && <AppGrid apps={androidApps} />}
        {viewMode === 'web' && <AppGrid apps={webApps} />}
        {viewMode === 'podcast' && <AppGrid apps={podcastApps} />}
      </div>

      <div className="m-auto max-w-4xl py-24">
        <Card
          size="lg"
          className="my-24 flex flex-col items-center justify-center gap-8 text-center"
          variant="gradient-blue"
        >
          <Text
            variant="h4"
            as="h2"
            className="bg-gradient-to-b from-white to-white/75 bg-clip-text font-bold tracking-tight text-transparent drop-shadow"
          >
            Join the elite network of <br />
            french companies using React Native
          </Text>
          <Text
            variant="p1"
            as="p"
            className="bg-gradient-to-b from-white to-white/75 bg-clip-text tracking-tight text-transparent drop-shadow"
          >
            Showcase your innovation alongside France's most forward-thinking
            tech companies.
          </Text>
          <Button
            href={linksApi.airtable.FRENCH_REACT_NATIVE_APPS_FORM}
            size="xxl"
            variant="outline"
            as="a"
            isExternalLink
          >
            Add your app
          </Button>
        </Card>
      </div>
    </Layout>
  );
}
