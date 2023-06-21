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
        <form className="py-8">
          <label className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search..."
              required
            />
            <button
              type="submit"
              className="absolute right-2.5 bottom-2.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

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
