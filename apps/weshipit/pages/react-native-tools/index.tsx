import { Layout } from '../../components/layout';
import client from '../api/apollo-client';

import {
  ApiList,
  Button,
  TypeFilter,
  Hyperlink,
  Text,
  SearchBar,
} from '@weshipit/ui';
import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';

function filterByDescription(records, searchTerm: string) {
  return records.filter((record) => {
    const description = record.fields.description;
    return description?.toLowerCase().includes(searchTerm);
  });
}

export default function ReactNativeToolsPage({ records }) {
  const numberOfTools = records.length;

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(records);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const results = filterByDescription(records, searchTerm);
    setSearchResults(results);
  }, [records, searchTerm]);

  return (
    <Layout
      seoTitle={`Repository of ${numberOfTools} resources and tools to elevate your React Native game`}
      seoDescription={`The best tools & apis for React Native developers. Accelerate your product development and improvement with more than ${numberOfTools} design resources and tools.`}
      ogImageTitle="React Native Tools"
      withAccessoryRight={
        <Button href="https://airtable.com/shrKPA2DGcG8xnQGG">
          Add a new tool
        </Button>
      }
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Text as="h3" variant="h3" className="py-4">
          The best tools and resources for busy developers
        </Text>
        <Text as="p" variant="s2" className="mb-8 text-gray-500">
          We curated the essentials for the success of your React Native App.
          <br />
          Get all the data with{' '}
          <a
            href="https://gum.co/road-react-native/HELLO_FRIEND"
            className="font-semibold text-blue-500 underline underline-offset-4 hover:text-blue-700"
          >
            the React Native Roadmap
          </a>
          .
        </Text>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 pb-48 sm:px-6">
        <div className="mb-6">
          <TypeFilter />
          <SearchBar searchTerm={searchTerm} handleChange={handleChange} />
        </div>

        <div className="flex-1">
          <ApiList records={searchResults} />
        </div>

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

/**
 * Filter airtable records by type
 */
function filterRecordsByType(records, type) {
  return records.filter((record) => record.fields.type === type);
}

export async function getServerSideProps(context) {
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

  const { query } = context;
  let records = data.airtable_tableData.records;
  if (query.type) {
    records = filterRecordsByType(records, query.type);
  }

  return {
    props: {
      records,
    },
  };
}
