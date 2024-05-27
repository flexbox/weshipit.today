import { Layout } from '../../components/layout';
import client from '../api/apollo-client';

import {
  ToolList,
  TypeFilter,
  Text,
  SearchBar,
  Hero,
  CallToActionCards,
} from '@weshipit/ui';
import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import round from 'lodash/round';
import { HeaderLinksForTools } from '../../components/header-links-for-tools';
import { useSearchParams } from 'next/navigation';

/**
 * Search throught airtable records by filtering by description
 */
function filterByDescription(records, searchTerm: string) {
  return records.filter((record) => {
    const description = record.fields.description;
    return description?.toLowerCase().includes(searchTerm);
  });
}

/**
 * Filter airtable records by type
 */
function filterRecordsByType(records, type) {
  return records.filter((record) => {
    const recordType = record.fields.type?.toLowerCase();
    return recordType === type.toLowerCase();
  });
}

export default function ReactNativeToolsPage({ records }) {
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

  const searchParams = useSearchParams();

  const toolType = searchParams?.get('type')?.toLowerCase();
  let seoTitle = `Repository of ${numberOfTools}+ resources and tools to elevate your React Native game`;
  if (toolType) {
    seoTitle = `Best React Native ${toolType} tools: Boost your mobile app development`;
  }

  return (
    <Layout
      seoTitle={seoTitle}
      seoDescription={`The best tools & apis for React Native developers. Accelerate your product development and improvement with more than ${numberOfTools}+ design resources and tools.`}
      ogImageTitle="React Native Tools"
      withAccessoryRight={<HeaderLinksForTools />}
    >
      <div className="mx-auto mb-6 max-w-6xl px-4 sm:px-6">
        <Hero
          badgeStyle="bg-orange-200 dark:bg-orange-900 text-[#ed6c5c] ring-[#ed6c5c] dark:ring-[#ed6c5c]"
          hintTitle="Upvote us on Product Hunt"
          hintDescription="Help us climb the ranks and reach more people"
          hintLink="https://www.producthunt.com/@flexbox"
          title={
            <>
              The best <span className="text-indigo-600">{toolType}</span> tools
              <br />
              and resources for busy developers.
            </>
          }
          description={
            <>
              We have curated essential resources for the success of your React
              Native app.
              <br />
              This informative content has been brought to you through the
              generous sponsorship of{' '}
              <a
                href="https://gum.co/road-react-native/HELLO_FRIEND"
                className="font-semibold text-blue-500 underline underline-offset-4 hover:text-blue-700"
              >
                the React Native Roadmap
              </a>
              .
            </>
          }
        />
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 pb-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 md:gap-6">
          <div>
            <TypeFilter numberOfTools={numberOfTools} />
          </div>
          <div className="col-span-5">
            <div className="mb-6">
              <SearchBar searchTerm={searchTerm} handleChange={handleChange} />
            </div>
            <ToolList records={searchResults} />
          </div>
        </div>
      </div>
      <div className="mx-auto mb-24 max-w-7xl px-4 sm:px-6">
        <section className="mb-12">
          <Text as="h2" variant="h3" className="my-4">
            More React Native resources
          </Text>
          <CallToActionCards />
        </section>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { data } = await client.query({
    query: gql`
      query getToolsRecords {
        getToolsRecords {
          id
          fields {
            description
            description_success
            features
            name
            github_url
            platform
            pricing
            slug
            twitter_url
            website_url
            type
          }
        }
      }
    `,
  });

  const searchQuery = context.query.type;

  let records = data.getToolsRecords;
  if (searchQuery) {
    records = filterRecordsByType(records, searchQuery);
  }

  return {
    props: {
      records,
    },
  };
}
