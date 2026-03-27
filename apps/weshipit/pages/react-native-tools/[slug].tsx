import {
  Button,
  TagList,
  Text,
  CompanyLogo,
  ToolTypeBadge,
  Card,
  Prose,
  ToolList,
  NotFound,
} from '@weshipit/ui';
import { Layout } from '../../components/layout';
import { tools } from '../../fixtures/tools.fixture';

import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Head from 'next/head';
import isNil from 'lodash/isNil';
import take from 'lodash/take';
import ChevronLeftIcon from '@heroicons/react/20/solid/ChevronLeftIcon';
import { GetStaticPaths, GetStaticProps } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = tools
    .filter((r) => r.slug)
    .map((r) => ({ params: { slug: r.slug } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const record = tools.find((r) => r.slug === slug);

  if (!record) {
    return { notFound: true };
  }

  const { name, description, description_success, website_url, platform } =
    record;

  const rawDesc = description_success || description || '';
  const seoDescription = `${name} for React Native${rawDesc ? ` — ${rawDesc.slice(0, 130)}...` : '.'}`;

  const recommendedRecords = take(
    tools.filter((r) => r.slug !== slug),
    3,
  );

  const toolUrl = `https://weshipit.today/react-native-tools/${slug}`;

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description: rawDesc.slice(0, 300) || undefined,
    url: website_url || undefined,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: platform?.join(', ') || undefined,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'React Native Tools',
        item: 'https://weshipit.today/react-native-tools',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name,
        item: toolUrl,
      },
    ],
  };

  return {
    props: {
      record,
      recommendedRecords,
      seoDescription,
      softwareAppSchema,
      breadcrumbSchema,
    },
    revalidate: 86400,
  };
};

export function ReactNativeSlugPage({
  recommendedRecords,
  record,
  seoDescription,
  softwareAppSchema,
  breadcrumbSchema,
}) {
  if (record === undefined) {
    return (
      <Layout
        seoTitle="Not found"
        seoDescription="This React Native tool page could not be found."
        noindex
        withHeader
        withContainer
      >
        <NotFound />
      </Layout>
    );
  }

  const {
    description,
    description_success,
    features,
    github_url,
    name,
    platform,
    pricing,
    twitter_url,
    type,
    website_url,
  } = record;

  return (
    <Layout
      seoTitle={`${name} for React Native`}
      seoDescription={seoDescription}
      ogImageTitle={`${name} for React Native`}
      withHeader
      withFooter
      callToActionLink={{
        name: 'Expo Launch Checklist',
        href: 'https://flexbox.gumroad.com/l/expo-checklist',
        isExternalLink: true,
      }}
      callToActionButton={{ name: 'Work with us', href: '/' }}
      withContainer
      withProductHunt
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </Head>
      <div className="mt-4 flex">
        <Link
          href="/react-native-tools"
          className="flex py-4 text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
        >
          <div className="flex items-center">
            <ChevronLeftIcon className="mr-2 size-6" />
            Go back
          </div>
        </Link>
      </div>

      <section className="mx-auto my-4 max-w-6xl">
        <div className="grid grid-cols-1 gap-24 pt-6 md:grid-cols-12">
          <div className="col-span-1 md:col-span-8">
            <CompanyLogo name={name} websiteUrl={website_url} size={64} />
            <Text as="h1" variant="h2" className="my-6">
              {name} for React Native
            </Text>

            <div className="mb-4 flex flex-wrap">
              <ToolTypeBadge type={type} size="sm" />
            </div>
            <Prose size="lg" className="mb-12">
              <ReactMarkdown>{description}</ReactMarkdown>

              {!isNil(description_success) && (
                <>
                  <Text as="h2" variant="s1" className="my-6">
                    How {name} will help you grow and be more successful?
                  </Text>
                  <ReactMarkdown>{description_success}</ReactMarkdown>
                </>
              )}
            </Prose>

            <Card>
              {platform && platform.length > 0 && (
                <div className="mb-6">
                  <Text as="h3" variant="p2" className="mb-4">
                    Platforms
                  </Text>
                  <TagList tags={platform} />
                </div>
              )}
              {features && features.length > 0 && (
                <div className="mb-6">
                  <Text as="h3" variant="p2" className="mb-4">
                    Features
                  </Text>
                  <TagList tags={features} />
                </div>
              )}
              {pricing && pricing.length > 0 && (
                <div>
                  <Text as="h3" variant="p2" className="mb-4">
                    Pricing
                  </Text>
                  <TagList tags={pricing} />
                </div>
              )}
            </Card>
          </div>

          <div className="col-span-1 md:col-span-4">
            <div className="flex flex-col gap-4">
              <Button
                href={website_url}
                variant="outline"
                as="a"
                isExternalLink={true}
                size="xl"
              >
                Visit website
              </Button>
              {github_url && (
                <Button
                  href={github_url}
                  variant="outline"
                  as="a"
                  isExternalLink={true}
                  size="xl"
                >
                  Visit Github
                </Button>
              )}
              {twitter_url && (
                <Button
                  href={twitter_url}
                  variant="outline"
                  as="a"
                  isExternalLink={true}
                  size="xl"
                >
                  Visit Twitter
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {recommendedRecords.length > 0 && (
        <section className="py-12 max-w-6xl mx-auto">
          <Text as="h2" variant="h3" className="my-4">
            Other {type} React Native tools
          </Text>

          <ToolList records={recommendedRecords} />
        </section>
      )}
    </Layout>
  );
}

export default ReactNativeSlugPage;
