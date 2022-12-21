import { gql } from '@apollo/client';
import { Button, Text, ApiCardLogo, ApiList } from '@weshipit/ui';
import client from '../api/apollo-client';
import Layout from '../../components/layout';

export function Slug({ records, recomendedRecords }) {
  if (records[0] === undefined || records[0].fields === undefined) {
    return (
      <Layout seoTitle={'Not found'} seoDescription={''}>
        <h1>404</h1>
      </Layout>
    );
  }

  const { fields } = records[0];
  const { name, description, url, logo, website_url } = fields;
  return (
    <Layout
      seoTitle="Slug React Native Serverless API"
      seoDescription="The best tools and resources for busy developers"
      ogImageTitle="React Native Serverless API"
      withAccessoryRight={
        <Button href="https://airtable.com/shrKPA2DGcG8xnQGG">
          Add a new API
        </Button>
      }
    >
      <div className="m-auto w-5/6 py-16 md:w-2/3">
        <Text variant="h2" style="w-2/3 md:m-auto">
          {name}
        </Text>
        <div className="my-16 flex w-full  justify-center">
          <ApiCardLogo
            name={name}
            websiteUrl={website_url}
            logoUrl={logo?.[0].url || undefined}
          />
        </div>
        <div className="w-7/8 m-auto my-8 rounded-2xl bg-white p-8 md:w-2/3 ">
          <Text variant="p1"> {description} </Text>
        </div>
      </div>
      <div className="m-auto flex w-4/5 flex-col divide-y-2">
        <Text variant="h3" style="py-4">
          Other tools from the category {fields.type}
        </Text>
        <div className="mb-12 pt-4">
          <ApiList apis={recomendedRecords} />
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
          tableName: "API"
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
          tableName: "API"
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

export default Slug;
