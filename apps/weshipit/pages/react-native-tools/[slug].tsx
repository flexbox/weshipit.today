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
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

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
      <div className="mx-auto w-5/6 py-16  md:w-4/5">
        {/* <div className="m-0 h-1/3 justify-around md:mx-4 md:flex md:justify-center"> */}
        <div className="flex flex-col justify-around lg:flex-row">
          <div className=" my-auto w-full lg:w-2/3">
            <ToolWebsitePreview url={website_url} />
          </div>
          <div className="my-4 ml-0 flex w-full flex-col justify-around rounded-xl bg-slate-900 lg:my-0 lg:ml-24 lg:w-1/4">
            <Button
              variant="filled"
              className="m-auto my-4 w-2/3 px-4 lg:my-0 "
              href={website_url}
              accessoryRight={
                <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4 text-gray-400" />
              }
            >
              Visit website
            </Button>
            <Button
              variant="filled"
              className="m-auto my-4 w-2/3 px-4 lg:my-0 "
              href={github_url}
              accessoryRight={
                <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4 text-gray-400" />
              }
            >
              Visit Github
            </Button>
            <Button
              variant="filled"
              className="m-auto my-4 w-2/3 px-4 lg:my-0 "
              href={twitter_url}
              accessoryRight={
                <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4 text-gray-400" />
              }
            >
              Visit Twitter
            </Button>
          </div>
        </div>
        <div className="my-8 flex w-full flex-col justify-around lg:my-16 lg:flex-row">
          <div className="mb-12 flex w-1/2 lg:my-auto">
            <ToolCardLogo name={name} websiteUrl={website_url} />
            <Text as="h2" variant="h2" className="my-auto w-3/4 md:mx-8">
              {name}
            </Text>
          </div>
          <div className="w-full rounded-xl bg-slate-200 p-8 lg:w-1/2">
            <PlatformList platforms={platform} />
            <PlatformList platforms={features} />
            <PlatformList platforms={pricing} />
            <ToolTypeBadge type={type} />
          </div>
        </div>
        <div className="my-8 w-auto rounded-2xl bg-white p-4 ">
          <div className="prose lg:prose-xl m-auto my-4">
            <Text as="p">{description}</Text>
            <Text>
              <ReactMarkdown>{description_success}</ReactMarkdown>
            </Text>
          </div>
        </div>
        {/* </div> */}
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
