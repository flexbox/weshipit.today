import { AppBadge, Card, Hero, LinkButton, Prose, Text } from '@weshipit/ui';
import { Layout } from '../components/layout';
import client from './api/apollo-client';
import { gql } from '@apollo/client';
import { InferGetStaticPropsType } from 'next/types';
import Image from 'next/image';
import { formatAppsByCategory } from '../components/french-react-native-apps/format-apps-by-category';
import { linksApi } from './api/links';
import kebabCase from 'lodash/kebabCase';

type FrenchApp = {
  fields: {
    name: string;
    website_url?: string;
    ios_url?: string;
    android_url?: string;
    category: string;
    logo: {
      url: string;
    };
  };
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query getFrenchAppsRecords {
        getFrenchAppsRecords {
          fields {
            name
            android_url
            ios_url
            category
            website_url
            logo {
              url
            }
          }
        }
      }
    `,
  });
  const records: FrenchApp[] = data.getFrenchAppsRecords;
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
      withAccessoryRight={
        <LinkButton size="lg" href="/">
          Work with us
        </LinkButton>
      }
      seoTitle="React Native Usage Among French Companies"
      seoDescription="Discover how French companies like BlaBlaCar, Doctolib, Ledger, and Shine are harnessing the power of React Native to create robust mobile applications."
    >
      <Hero title={heroTitle} />
      <Prose size={'xl'} className="my-8">
        <p>
          We are building a list of French iOS and Android apps that are using
          React Native in {currentYear}. If you’re working in a French company
          that uses React Native,{' '}
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
                  <div className="flex justify-start gap-4">
                    <AppBadge link={app.website_url} />
                    {app.ios_url && <AppBadge link={app.ios_url} iOS />}
                    {app.android_url && (
                      <AppBadge link={app.android_url} android />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Card
        size="lg"
        className="m-auto my-24 items-center justify-center text-center"
        variant="gradient-purple"
      >
        <Text variant="h4" as="h2" className="my-12">
          Join the list of French companies using React Native 🚀
        </Text>
        <LinkButton
          size="xxl"
          href={linksApi.airtable.FRENCH_REACT_NATIVE_APPS_FORM}
          className="mb-12"
        >
          Add your app
        </LinkButton>
      </Card>
    </Layout>
  );
}
