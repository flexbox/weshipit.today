import { AppBadge, Button, Card, Hero, Prose, Text } from '@weshipit/ui';
import { Layout } from '../components/layout';
import { InferGetStaticPropsType } from 'next/types';
import Image from 'next/image';
import { formatAppsByCategory } from '../components/french-react-native-apps/format-apps-by-category';
import { linksApi } from './api/links';
import kebabCase from 'lodash/kebabCase';

import { frenchApps } from '../fixtures/french-apps.fixture';

type FrenchApp = {
  name: string;
  website_url?: string | null;
  podcast_url?: string | null;
  ios_url?: string | null;
  android_url?: string | null;
  category: string;
  logo: {
    url: string;
  }[];
};

export async function getStaticProps() {
  // Use the local fixture data directly
  const records: FrenchApp[] = frenchApps.records.map((record) => ({
    android_url: record.fields.android_url || null,
    category: record.fields.category,
    ios_url: record.fields.ios_url || null,
    logo: record.fields.logo.map((logo) => ({ url: logo.url })),
    name: record.fields.name,
    website_url: record.fields.website_url || null,
    podcast_url: record.fields.podcast_url || null,
  }));

  const categorizedApps = formatAppsByCategory(records);

  return {
    props: {
      categorizedApps,
    },
  };
}

export default function FrenchReactNativePage({
  categorizedApps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const currentYear = new Date().getFullYear();
  const heroTitle = `French companies using React Native in ${currentYear}`;

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
      <Prose size={'xl'} className="my-8">
        <p>
          We are building a list of French iOS and Android apps that are using
          React Native in {currentYear}. If you&apos;re working in a French
          company that uses React Native,{' '}
          <a href={linksApi.airtable.FRENCH_REACT_NATIVE_APPS_FORM}>
            add your app
          </a>{' '}
          to the list.
        </p>
      </Prose>
      <div className="mb-24 flex flex-col gap-24">
        {categorizedApps.map((category) => (
          <section key={category.category} id={kebabCase(category.category)}>
            <Text variant={'h4'} as={'h2'} className="mb-8 mt-12 capitalize">
              {category.category}
            </Text>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {category.apps.map((app) => (
                <Card key={app.name} size={'md'}>
                  <Image
                    src={app.logo_url}
                    width={96}
                    height={96}
                    alt={app.name}
                    className="rounded-lg bg-slate-300 dark:bg-slate-700"
                  />
                  <Text variant="s2" as="h3" className="my-4 ml-1 font-bold">
                    {app.name}
                  </Text>
                  <div className="flex gap-4 flex-wrap">
                    <AppBadge link={app.website_url} platform="web" />
                    {app.ios_url && (
                      <AppBadge link={app.ios_url} platform="iOS" />
                    )}
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
          </section>
        ))}
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
