import { Layout } from '../components/layout';

import { ApiList, Button, Text } from '@weshipit/ui';
import client from './api/apollo-client';
import { gql } from '@apollo/client';

export default function ReactNativeApiPage({ records }) {
  return (
    <Layout
      withAccessoryRight={
        <Button href="https://airtable.com/shrKPA2DGcG8xnQGG">
          Add a new API
        </Button>
      }
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Text variant="h3" style="py-4">
          The best resources and tools for busy developers
        </Text>
        <Text variant="s2" style="mb-8">
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

        <ApiList apis={records} />
        {records.map((record) => {
          return (
            <div key={record.id} className="mb-12">
              <Text variant="h3">{record.fields.name}</Text>
              <Text variant="p1">{record.fields.description}</Text>
            </div>
          );
        })}
      </div>

      <iframe
        src="https://airtable.com/embed/shrcF4Xn27rhIZVCs/tblpNvaodZH5S99le"
        height={3200}
        width="100%"
        className="mx-auto"
      />
    </Layout>
  );
}

export async function getStaticProps() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID_REACT_NATIVE;

  const { data } = await client.query({
    query: gql`
      query {
        airtable_tableData(
          airtable_apiKey: "${apiKey}"
          airtable_baseId: "${baseId}"
          tableName: "API"
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
