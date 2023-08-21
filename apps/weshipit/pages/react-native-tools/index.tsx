import { Layout } from '../../components/layout';
import client from '../api/apollo-client';

import {
  ToolList,
  TypeFilter,
  Hyperlink,
  Text,
  SearchBar,
  Hero,
  getVariantFromType,
} from '@weshipit/ui';
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import round from 'lodash/round';
import { HeaderLinksForTools } from './[slug]';
import { useSearchParams } from 'next/navigation';

/**
 * Filter airtable records by type
 */
function filterRecordsByType(records, type) {
  return records.filter((record) => record.fields.type === type);
}

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID_REACT_NATIVE;

const GET_AIRTABLE_DATA = gql`
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
`;

/**
 * Filter airtable records by description
 */
function filterByDescription(records, searchTerm: string) {
  return records.filter((record) => {
    const description = record.fields.description;
    return description?.toLowerCase().includes(searchTerm);
  });
}

function ToolListPage({ records }) {
  const numberOfTools = round(records.length, -1);

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
    <>
      <div>
        <TypeFilter numberOfTools={numberOfTools} />
      </div>
      <div className="col-span-5">
        <div className="mb-6">
          <SearchBar searchTerm={searchTerm} handleChange={handleChange} />
        </div>
        <ToolList records={searchResults} />
      </div>
    </>
  );
}

export default function ReactNativeToolsPage() {
  const searchParams = useSearchParams();
  const { loading, error, data, networkStatus } = useQuery(GET_AIRTABLE_DATA);
  console.log(
    'file: index.tsx:85 ~ ReactNativeToolsPage ~ networkStatus:',
    networkStatus
  );
  console.log('file: index.tsx:85 ~ ReactNativeToolsPage ~ data:', data);
  console.log('file: index.tsx:85 ~ ReactNativeToolsPage ~ loading:', loading);

  if (error) return `Error! ${error.message}`;

  const toolType = searchParams.get('type')?.toLowerCase();

  return (
    <Layout
      seoTitle={`Repository of resources and tools to elevate your React Native game`}
      seoDescription={`The best tools & apis for React Native developers. Accelerate your product development and improvement with more than 30+ design resources and tools.`}
      ogImageTitle="React Native Tools"
      withAccessoryRight={<HeaderLinksForTools />}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Hero>
          <Text as="h1" variant="h2">
            The best <span className="text-indigo-600">{toolType}</span> tools
            <br />
            and resources for busy developers.
          </Text>
        </Hero>
        <Text as="p" variant="p1" className="mb-4 text-gray-500">
          We have curated essential resources for the success of your React
          Native app.
          <br />
          This informative content has been brought to you through the generous
          sponsorship of{' '}
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
        <div className="grid grid-cols-1 md:grid-cols-6 md:gap-6">
          {loading ? 'Loading...' : <ToolListPage records={data.records} />}
        </div>

        <div className="py-12">
          <Hyperlink
            href="https://clearbit.com"
            isExternal={true}
            className="text-sm text-gray-400"
          >
            Logos provided by Clearbit
          </Hyperlink>
        </div>
      </div>
    </Layout>
  );
}

// export async function getServerSideProps(context) {
//   const { query } = context;
//   let records = data.airtable_tableData.records;
//   if (query.type) {
//     records = filterRecordsByType(records, query.type);
//   }

//   return {
//     props: {
//       records,
//     },
//   };
// }
