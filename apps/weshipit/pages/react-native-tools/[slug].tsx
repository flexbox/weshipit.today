import { gql } from '@apollo/client';
import {
  Button,
  PlatformList,
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
import Layout from '../../components/layout';
import { linksApi } from '../api/links';
import ReactMarkdown from 'react-markdown';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export function HeaderLinksForTools() {
  return (
    <>
      <div className="flex">
        <Button
          variant="ghost"
          className="mr-4 px-2"
          href="https://flexbox.gumroad.com/l/expo-checklist"
        >
          🎁 Free Launch Checklist
        </Button>
        <Button href={linksApi.airtable.TOOLS_FORM} className="px-2">
          Add a React Native Tool
        </Button>
      </div>
    </>
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
      seoDescription="The best tools and resources for busy developers in React Native"
      ogImageTitle={`${name} for React Native`}
      withAccessoryRight={<HeaderLinksForTools />}
      withContainer={true}
    >
      <div className="grid grid-cols-1 gap-8 pt-6 md:grid-cols-12">
        <div className="col-span-1 md:col-span-8">
          <Link
            href="/react-native-tools"
            className="mb-2 flex py-4  text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
          >
            Back to list
          </Link>
          <ToolCardLogo name={name} websiteUrl={website_url} size={64} />
          <Text as="h1" variant="h2" className="my-6">
            {name}
          </Text>

          <div className="mb-4 flex flex-wrap">
            <ToolTypeBadge type={type} size="sm" />
          </div>
          <div className="prose lg:prose-xl mb-12">
            <ReactMarkdown>{description}</ReactMarkdown>
            <Text as="h2" variant="s1" className="my-6">
              How {name} will help you grow and be more successful?
            </Text>

            <ReactMarkdown>{description_success}</ReactMarkdown>
          </div>

          <Card>
            {platform && platform.length > 0 && (
              <div className="mb-6">
                <Text as="h3" variant="h3" className="mb-4">
                  Platforms
                </Text>
                <PlatformList platforms={platform} />
              </div>
            )}
            {features && features.length > 0 && (
              <div className="mb-6">
                <Text as="h3" variant="h3" className="mb-4">
                  Features
                </Text>
                <PlatformList platforms={features} />
              </div>
            )}
            {pricing && pricing.length > 0 && (
              <div>
                <Text as="h3" variant="h3" className="mb-4">
                  Pricing
                </Text>
                <PlatformList platforms={pricing} />
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
              variant="ghost"
              href={website_url}
              accessoryRight={
                <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4 text-gray-400" />
              }
            >
              Visit website
            </Button>
            <Button
              variant="ghost"
              href={github_url}
              accessoryRight={
                <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4 text-gray-400" />
              }
            >
              Visit Github
            </Button>
            {twitter_url && (
              <Button
                variant="ghost"
                href={twitter_url}
                accessoryRight={
                  <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4 text-gray-400" />
                }
              >
                Visit Twitter
              </Button>
            )}
          </div>
        </div>
      </div>

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

export async function getServerSideProps({ params }) {
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
  };
}

export default ReactNativeSlugPage;
