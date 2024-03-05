import { ApolloError, gql } from '@apollo/client';
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
import client from '../api/apollo-client';
import { Layout } from '../../components/layout';

import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import isNil from 'lodash/isNil';
import take from 'lodash/take';
import ChevronLeftIcon from '@heroicons/react/20/solid/ChevronLeftIcon';
import { HeaderLinksForTools } from '../../components/header-links-for-tools';

export function ReactNativeSlugPage({
  record,
  recomendedRecords,
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
    name,
    description,
    description_success,
    features,
    platform,
    pricing,
    type,
    website_url,
    github_url,
    twitter_url,
  } = record.fields;

  return (
    <Layout
      seoTitle={`${name} for React Native`}
      seoDescription="The best tools and resources for busy developers in React Native. Find the best tools to help you grow and be more successful."
      ogImageTitle={`${name} for React Native`}
      withAccessoryRight={<HeaderLinksForTools />}
      withContainer={true}
      withProductHunt={true}
    >
      <div className="mt-4 flex">
        <Link
          href="/react-native-tools"
          className="flex py-4 text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
        >
          <ChevronLeftIcon className="mr-2 size-6" />
          Go back
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
                variant="secondary"
                as="a"
                isExternalLink={true}
                size="xl"
              >
                Visit website
              </Button>
              {github_url && (
                <Button
                  href={github_url}
                  variant="secondary"
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
                  variant="secondary"
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

      {recomendedRecords.length > 0 && (
        <section className="py-12">
          <Text as="h2" variant="h3" className="my-4">
            Other tools from the category {type.toLowerCase()}
          </Text>
          <ToolList records={recomendedRecords} />
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
    const { id } = query;
    const { data } = await client.query({
      query: gql`
        query getToolRecord {
          getToolRecord(id: "${id}") {
            fields {
              description
              description_success
              features
              github_url
              name
              platform
              pricing
              twitter_url
              type
              website_url
            }
          }
        }
      `,
    });
    const record = data.getToolRecord[0];

    const type = record.fields.type;
    const { data: recomendedData } = await client.query({
      query: gql`
      query getToolsRecordsFiltered {
        getToolsRecordsFiltered(filterByFormula: "{type}='${type}'") {
          id
          fields {
            name
            description
            type
            pricing
            website_url
            slug
          }
        }
      }
      `,
    });
    const recomendedRecords = take(recomendedData.getToolsRecordsFiltered, 3);

    return {
      props: {
        record,
        recomendedRecords,
        screenshotAccessKey,
      },
    };
  } catch (error) {
    if (error instanceof ApolloError) {
      res.statusCode = 404;
      return { props: { error: 'Not Found' } };
    } else {
      throw error;
    }
  }
}

export default ReactNativeSlugPage;
