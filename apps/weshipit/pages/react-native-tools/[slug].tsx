import { gql } from '@apollo/client';
import {
  Button,
  TagList,
  Text,
  ToolCardLogo,
  ToolList,
  ToolWebsitePreview,
  ToolTypeBadge,
  CardBootcamp,
  CardChecklist,
  CardConsultation,
  Card,
} from '@weshipit/ui';
import client from '../api/apollo-client';
import { Layout } from '../../components/layout';
import { linksApi } from '../api/links';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { isNil } from 'lodash';

export function HeaderLinksForTools() {
  return (
    <div className="flex">
      <Button
        variant="secondary"
        as="a"
        className="mr-4 px-2"
        href="https://flexbox.gumroad.com/l/expo-checklist"
        target="_blank"
        size="xl"
      >
        🎁 Free Launch Checklist
      </Button>
      <Button
        as="a"
        href={linksApi.airtable.TOOLS_FORM}
        className="px-2"
        target="_blank"
        size="xl"
      >
        Add a React Native Tool
      </Button>
    </div>
  );
}

export function ReactNativeSlugPage({
  records,
  recomendedRecords,
  screenshotAccessKey,
}) {
  if (records[0] === undefined || records[0].fields === undefined) {
    return (
      <Layout seoTitle={'Not found'} seoDescription={''}>
        <h1>404</h1>
      </Layout>
    );
  }

  const { fields } = records[0];

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
  } = fields;

  return (
    <Layout
      seoTitle={`${name} React Native Tools and Resources`}
      seoDescription="The best tools and resources for busy developers in React Native. Find the best tools to help you grow and be more successful."
      ogImageTitle={`${name} for React Native`}
      withAccessoryRight={<HeaderLinksForTools />}
      withContainer={true}
    >
      <div className="mt-8 flex">
        <Link
          href="/react-native-tools"
          className="flex py-4 text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
        >
          Go back
        </Link>
      </div>

      <section className="mx-auto my-8 max-w-6xl">
        <div className="grid grid-cols-1 gap-24 pt-6 md:grid-cols-12">
          <div className="col-span-1 md:col-span-8">
            <ToolCardLogo name={name} websiteUrl={website_url} size={64} />
            <Text as="h1" variant="h2" className="my-6">
              {name}
            </Text>

            <div className="mb-4 flex flex-wrap">
              <ToolTypeBadge type={type} size="sm" />
            </div>
            <div className="prose lg:prose-xl dark:prose-invert prose-slate mb-12">
              <ReactMarkdown>{description}</ReactMarkdown>

              {!isNil(description_success) && (
                <>
                  <Text as="h2" variant="s1" className="my-6">
                    How {name} will help you grow and be more successful?
                  </Text>
                  <ReactMarkdown>{description_success}</ReactMarkdown>
                </>
              )}
            </div>

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

      <section className="py-12">
        <Text as="h2" variant="h3" className="my-4">
          Other tools from the category {fields.type.toLowerCase()}
        </Text>
        <ToolList records={recomendedRecords} />
      </section>

      <section className="py-24">
        <Text as="h2" variant="h3" className="my-4">
          Useful resources
        </Text>
        <div className="flex justify-between">
          <CardBootcamp imageSize={124} />
          <CardChecklist imageSize={124} />
          <CardConsultation gravatarSize={80} />
        </div>
      </section>
    </Layout>
  );
}

// make sure the build is happy
export async function getStaticPaths() {
  const paths = [];

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID_REACT_NATIVE;
  const screenshotAccessKey = process.env.APIFLASH_ACCESS_KEY;

  const { slug } = params;

  const { data } = await client.query({
    query: gql`
      query GetAirtableDataBySlug {
        airtable_tableData(
          airtable_apiKey: "${apiKey}"
          airtable_baseId: "${baseId}"
          tableName: "tools"
          filterByFormula: "{slug}='${slug}'"
        ) {
          records {
            fields
          }
        }
      }
    `,
  });
  const type = data.airtable_tableData.records[0].fields.type;
  const recomended = await client.query({
    query: gql`
      query GetAirtableDataByType {
        airtable_tableData(
          airtable_apiKey: "${apiKey}"
          airtable_baseId: "${baseId}"
          tableName: "tools"
          filterByFormula: "{type}='${type}'"
        ) {
          records {
            fields
          }
        }
      }
    `,
  });

  return {
    props: {
      records: data.airtable_tableData.records,
      recomendedRecords: recomended.data.airtable_tableData.records,
      screenshotAccessKey,
    },
    revalidate: 600, // 10 minutes
  };
}

export default ReactNativeSlugPage;
