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
} from '@weshipit/ui';
import client from '../api/apollo-client';
import Layout from '../../components/layout';
import { linksApi } from '../api/links';
import ReactMarkdown from 'react-markdown';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

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

export function ReactNativeSlugPage({ records, recomendedRecords }) {
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
      <div className="flex">
        <div>
          <ToolCardLogo name={name} websiteUrl={website_url} />
          <Text as="h2" variant="h2">
            {name}
          </Text>
          <div className="prose lg:prose-xl">
            <ReactMarkdown>{description}</ReactMarkdown>
            <ReactMarkdown>{description_success}</ReactMarkdown>
          </div>

          {platform && platform.length > 0 && (
            <>
              <Text as="h3" variant="p1" className=" mb-2 mt-4 ">
                Platforms
              </Text>
              <PlatformList platforms={platform} />
            </>
          )}
          {features && features.length > 0 && (
            <>
              <Text as="h3" variant="p1" className=" mb-2 mt-4 ">
                Features
              </Text>
              <PlatformList platforms={features} />
            </>
          )}
          <Text as="h3" variant="p1" className="mb-2 mt-4 ">
            Pricing
          </Text>
          <PlatformList platforms={pricing} />
          <Text as="h3" variant="p1" className=" mb-2 mt-4 ">
            Type
          </Text>
          <ToolTypeBadge type={type} />
        </div>
        <div>
          <ToolWebsitePreview url={website_url} />

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

      <section className="py-12">
        <Text as="h3" variant="h3" className="my-4">
          Other tools from the category {fields.type.toLowerCase()}
        </Text>
        <ToolList records={recomendedRecords} />
      </section>

      <section className="py-24">
        <Text as="h3" variant="h3" className="my-4">
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
    },
  };
}

export default ReactNativeSlugPage;
