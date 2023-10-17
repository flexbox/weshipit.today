import { Layout } from '../../components/layout';
import client from '../api/apollo-client';

import { Text, Hero, Hyperlink, Card } from '@weshipit/ui';
import { gql } from '@apollo/client';
import round from 'lodash/round';

import { HeaderLinksForTools } from '../../components/header-links-for-tools';

export default function ReactNativeToolsPage({ records }) {
  const recordsNumber = round(records.length, -1);

  return (
    <Layout
      seoTitle={`${recordsNumber}+ starter templates to create your React Native project`}
      seoDescription="Starter repos to create your React Native project."
      ogImageTitle="React Native Starter Templates"
      withAccessoryRight={<HeaderLinksForTools />}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Hero>
          <Text as="h1" variant="h2">
            The best <span className="text-blue-600">Starter Templates</span>{' '}
            for busy developers.
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {records.map((record) => (
            <Card key={record.id}>
              <div className="prose prose-lg dark:prose-invert">
                <h2 className="mt-0">{record.fields.name}</h2>

                <ul>
                  <li>
                    <Hyperlink href={record.fields.github_url}>
                      GitHub
                    </Hyperlink>
                  </li>
                  <li>
                    <Hyperlink href={record.fields.website_url}>
                      Website
                    </Hyperlink>
                  </li>
                </ul>
              </div>
            </Card>
          ))}
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
          tableName: "starter_templates"
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
