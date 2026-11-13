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

function stripMarkdown(md: string): string {
  return md
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // [text](url) -> text
    .replace(/(\*\*|__|\*|_|`)/g, '') // emphasis + code markers
    .replace(/^\s*\d+\.\s+/gm, '') // numbered-list markers
    .replace(/^\s*[-*+]\s+/gm, '') // bullet markers
    .replace(/\s+/g, ' ') // newlines/multi-space -> single space
    .trim();
}

function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) {
    return text;
  }
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max)}…`;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = tools
    .filter((r) => r.slug)
    .map((r) => ({ params: { slug: r.slug } }));

  // Unknown slugs render on demand so removed tools can redirect (below)
  // instead of returning a 404.
  return { fallback: 'blocking', paths };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const record = tools.find((r) => r.slug === slug);

  if (!record) {
    // A tool we removed from the directory: send visitors and link equity to
    // the directory rather than a dead end.
    return {
      redirect: { destination: '/react-native-tools', permanent: true },
    };
  }

  const { description, description_success, name, platform, website_url } =
    record;

  const proseSource = description || description_success || '';
  const plainDesc = stripMarkdown(proseSource);
  const prefix = `${name} for React Native`;
  const seoDescription = plainDesc
    ? `${prefix} — ${truncateAtWord(plainDesc, 155 - prefix.length - 3)}`
    : `${prefix}.`;

  const sameType = tools.filter(
    (r) => r.slug !== slug && r.type.some((t) => record.type.includes(t)),
  );
  const others = tools.filter(
    (r) => r.slug !== slug && !r.type.some((t) => record.type.includes(t)),
  );
  // Same-category tools first: they are the real alternatives, and linking
  // siblings to each other is what gives these pages internal links.
  const alternatives = take(sameType, 6);
  const recommendedRecords =
    alternatives.length >= 3
      ? alternatives
      : take([...alternatives, ...others], 3);

  const toolUrl = `https://weshipit.today/react-native-tools/${slug}`;

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    applicationCategory: 'DeveloperApplication',
    description: plainDesc ? truncateAtWord(plainDesc, 300) : null,
    name,
    operatingSystem: platform?.join(', ') || null,
    url: website_url || null,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        item: 'https://weshipit.today/react-native-tools',
        name: 'React Native Tools',
        position: 1,
      },
      {
        '@type': 'ListItem',
        item: toolUrl,
        name,
        position: 2,
      },
    ],
  };

  return {
    props: {
      breadcrumbSchema,
      hasAlternatives: alternatives.length > 0,
      recommendedRecords,
      record,
      seoDescription,
      softwareAppSchema,
    },
    revalidate: 86400,
  };
};

/** ["a", "b", "c"] → "a, b and c". */
function listToSentence(items: string[]): string {
  return items.length > 1
    ? `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
    : (items[0] ?? '');
}

const lowercase = (items: string[]) => items.map((item) => item.toLowerCase());
const platformLabel = (item: string) => (item === 'Web' ? 'the web' : item);

export function ReactNativeSlugPage({
  breadcrumbSchema,
  hasAlternatives,
  recommendedRecords,
  record,
  seoDescription,
  softwareAppSchema,
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
      ogImageKicker="React Native tools"
      withHeader
      withFooter
      callToActionLink={{
        href: 'https://flexbox.gumroad.com/l/expo-checklist',
        isExternalLink: true,
        name: 'Expo Launch Checklist',
      }}
      callToActionButton={{ href: '/', name: 'Work with us' }}
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

            <div className="mb-4 flex flex-wrap gap-2">
              {type.map((t) => (
                <ToolTypeBadge key={t} type={t} size="sm" />
              ))}
            </div>
            <Prose size="lg" className="mb-12">
              {/* Facts from the record, so every page opens with a summary
                  that is specific to this tool. */}
              <p className="lead">
                {name} works in React Native apps
                {platform && platform.length > 0
                  ? ` on ${listToSentence(platform.map(platformLabel))}`
                  : ''}
                . Category: {listToSentence(type)}.
                {pricing && pricing.length > 0
                  ? ` Pricing: ${listToSentence(lowercase(pricing))}.`
                  : ''}
              </p>
              <ReactMarkdown>{description}</ReactMarkdown>

              {!isNil(description_success) && (
                <>
                  <Text as="h2" variant="s1" className="my-6">
                    When to use {name} in a React Native app
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
            {hasAlternatives
              ? `Alternatives to ${name} for React Native`
              : 'Other React Native tools'}
          </Text>

          <ToolList records={recommendedRecords} />
        </section>
      )}
    </Layout>
  );
}

export default ReactNativeSlugPage;
