import { gql } from '@apollo/client';
import {
  Button,
  PlatformList,
  Text,
  ToolCardLogo,
  ToolList,
  ToolListProps,
  ToolWebsitePreview,
  ToolTypeBadge,
  Hyperlink,
} from '@weshipit/ui';
import client from '../api/apollo-client';
import Layout from '../../components/layout';
import { linksApi } from '../api/links';
import ReactMarkdown from 'react-markdown';
import { preview } from '@prismicio/client/dist/cookie';
import Image from 'next/image';

export function HeaderLinksForTools() {
  return (
    <>
      <div className="flex">
        <Button
          variant="ghost"
          className="mr-4"
          href="https://flexbox.gumroad.com/l/expo-checklist"
        >
          🎁 Free Launch Checklist
        </Button>
        <Button href={linksApi.airtable.TOOLS_FORM}>
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
    pricing, // TODO: add this to the page
    type, // TODO: add this to the page
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
    >
      <div className="m-auto w-5/6 py-16  md:w-2/3">
        <Text as="h2" variant="h2" className="w-2/3 md:m-auto">
          {name}
        </Text>
        <div className="my-16 flex w-full  justify-center">
          <ToolCardLogo name={name} websiteUrl={website_url} />
        </div>
        <div className="m-0 h-1/3 justify-around md:mx-4 md:flex md:justify-center">
          <div className=" my-auto w-full  lg:w-1/2">
            <ToolWebsitePreview url={website_url} />
          </div>
          <div className="m-0 my-8 w-full rounded-2xl bg-white p-4 md:mx-4 lg:w-1/2 lg:p-8">
            <div className="prose lg:prose-xl my-4">
              <Text as="p">{description}</Text>
              <Text>
                <ReactMarkdown>{description_success}</ReactMarkdown>
              </Text>
              <div className="flex justify-around">
                <Hyperlink href={website_url} isExternal>
                  Website
                </Hyperlink>
                <Hyperlink href={github_url} isExternal>
                  Github
                </Hyperlink>
                <Hyperlink href={twitter_url} isExternal>
                  Twitter
                </Hyperlink>
              </div>
            </div>
            <PlatformList platforms={platform} />
            <PlatformList platforms={features} />
            <PlatformList platforms={pricing} />
            <ToolTypeBadge type={type} />
          </div>
        </div>
      </div>
      <div className="m-auto flex w-4/5 flex-col">
        <Text as="h3" variant="h3" className="py-4">
          Other tools from the category {fields.type}
        </Text>
        <div className="mb-48 pt-4">
          <ToolList records={recomendedRecords} />
        </div>
      </div>
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
