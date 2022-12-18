import { gql } from '@apollo/client';
import { Button, Text } from '@weshipit/ui';
import client from '../api/apollo-client';
import Layout from '../../components/layout';
import ApiCardLogo from 'libs/ui/src/lib/api-list/api-card-logo';

export function Slug({ records }) {
  console.log('file: [slug].tsx:8 ~ Slug ~ records', records);
  console.log('file: [slug].tsx:8 ~ Slug ~ records', records.lenght);

  if (records.lenght === 0) {
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
      <h1> {name} </h1>
      <Text variant="p1"> {description} </Text>
      <ApiCardLogo
        name={name}
        websiteUrl={website_url}
        logoUrl={logo?.[0].url || undefined}
      />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID_REACT_NATIVE;

  console.log('file: [slug].tsx:24 ~ getServerSideProps ~ params', params.slug);

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

  console.log('file: [slug].tsx:47 ~ getServerSideProps ~ data', data);

  return {
    props: {
      records: data.airtable_tableData.records,
    },
  };
}

export default Slug;
