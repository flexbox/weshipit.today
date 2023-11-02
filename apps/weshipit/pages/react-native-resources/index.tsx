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
import { useState } from 'react';
import round from 'lodash/round';
import { HeaderLinksForTools } from '../../components/header-links-for-tools';

export default function ReactNativeResourcesPage({ records }) {
  const numberOfTools = round(records.length, -1);

  return (
    <Layout
      seoTitle={`Repository of ${numberOfTools}+ resources and tools to elevate your React Native game`}
      seoDescription={`The best tools & apis for React Native developers. Accelerate your product development and improvement with more than ${numberOfTools}+ design resources and tools.`}
      ogImageTitle="React Native Tools"
      withAccessoryRight={<HeaderLinksForTools />}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Hero>
          <Text as="h1" variant="h2">
            <br />
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

      <div className="mx-auto max-w-screen-2xl px-4 pb-12 text-white sm:px-6">
        {JSON.stringify(records)}
      </div>
      <div className="mx-auto mb-24 max-w-7xl px-4 sm:px-6">
        <section className="mb-12">
          <Text as="h2" variant="h3" className="my-4">
            Useful resources
          </Text>
          <CallToActionCards />
        </section>
      </div>
    </Layout>
  );
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
          tableName: "resources"
        ) {
          records {
            fields
            id
          }
        }
      }
    `,
  });

  const records = data.airtable_tableData.records;

  return {
    props: {
      records,
    },
  };
}
