import { Layout } from '../../components/layout';
import client from '../api/apollo-client';

import { ApiList, Button, Hyperlink, Text } from '@weshipit/ui';
import { gql } from '@apollo/client';

export default function ReactNativeApiPage({ records }) {
  return (
    <Layout
      seoTitle="React Native Serverless API"
      seoDescription="The best tools and resources for busy developers"
      ogImageTitle="React Native Serverless API"
      withAccessoryRight={
        <Button href="https://airtable.com/shrKPA2DGcG8xnQGG">
          Add a new API
        </Button>
      }
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 ">
        <Text variant="h3" style="py-4">
          The best tools and resources for busy developers
        </Text>
        <Text variant="s2" style="mb-8" color="text-gray-500">
          We curated the essentials for the success of your React Native App.
          <br />
          Get all the data with{' '}
          <a
            href="https://gum.co/road-react-native"
            className="font-semibold text-blue-500 underline underline-offset-4 hover:text-blue-700"
          >
            the React Native Roadmap
          </a>
          .
        </Text>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 pb-48 sm:px-6">
        <ApiList apis={records} />

        <div className="py-12">
          <Hyperlink
            href="https://clearbit.com"
            isExternal={true}
            className="text-gray-400"
          >
            Logos provided by Clearbit
          </Hyperlink>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID_REACT_NATIVE;

  const { data } = await client.query({
    query: gql`
      query GetAirtableData {
        airtable_tableData(
          airtable_apiKey: "${apiKey}"
          airtable_baseId: "${baseId}"
          tableName: "tools"
        ) {
          records {
            fields
            id
          }
        }
      }
    `,
  });

  return {
    props: {
      records: data.airtable_tableData.records,
    },
  };
}
