import {
  Button,
  TagList,
  Text,
  ToolCardLogo,
  ToolWebsitePreview,
  ToolTypeBadge,
  Card,
  CallToActionCards,
  Prose,
  ToolList,
  NotFound,
} from '@weshipit/ui';
import { Layout } from '../../components/layout';
import { tools } from '../../fixtures/tools.fixture';

import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import isNil from 'lodash/isNil';
import take from 'lodash/take';
import ChevronLeftIcon from '@heroicons/react/20/solid/ChevronLeftIcon';

export function ReactNativeSlugPage({
  recommendedRecords,
  record,
  screenshotAccessKey,
}) {
  if (record === undefined || record.fields === undefined) {
    return (
      <Layout
        seoTitle={'Not found'}
        seoDescription={''}
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
  } = record.fields;

  return (
    <Layout
      seoTitle={`${name} for React Native`}
      seoDescription="The best tools and resources for busy developers in React Native. Find the best tools to help you grow and be more successful."
      ogImageTitle={`${name} for React Native`}
      withHeader
      callToActionLink={{
        name: 'Expo Launch Checklist',
        href: 'https://flexbox.gumroad.com/l/expo-checklist',
        isExternalLink: true,
      }}
      callToActionButton={{ name: 'Work with us', href: '/' }}
      withContainer
      withProductHunt
    >
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
            <ToolCardLogo name={name} websiteUrl={website_url} size={64} />
            <Text as="h1" variant="h2" className="my-6">
              {name}
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
              <ToolWebsitePreview
                url={website_url}
                accessKey={screenshotAccessKey}
              />
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
        <section className="py-12">
          <Text as="h2" variant="h3" className="my-4">
            Other tools from the category {type.toLowerCase()}
          </Text>
          <ToolList records={recommendedRecords} />
        </section>
      )}

      <section className="mb-12 py-24">
        <Text as="h2" variant="h3" className="my-4">
          Useful resources
        </Text>
        <CallToActionCards />
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ query, res }) {
  const screenshotAccessKey = process.env.APIFLASH_ACCESS_KEY;

  try {
    const { slug } = query;
    const records = tools.records;
    const record = records.find((record) => record.fields.slug === slug);

    if (!record) {
      res.statusCode = 404;
      return { props: { error: 'Not Found' } };
    }

    const type = record.fields.type;

    const recommendedRecords = take(
      records.filter((r) => r.fields.type === type && r.fields.slug !== slug),
      3,
    );

    return {
      props: {
        recommendedRecords,
        record,
        screenshotAccessKey,
      },
    };
  } catch (error) {
    res.statusCode = 500;
    return { props: { error: 'Server Error' } };
  }
}

export default ReactNativeSlugPage;
