import { Layout } from '../../components/layout';
import client from '../api/apollo-client';

import { Text, Hero, CallToActionCards, Card, Button } from '@weshipit/ui';
import { gql } from '@apollo/client';
import round from 'lodash/round';
import { HeaderLinksForTools } from '../../components/header-links-for-tools';
import { format } from 'date-fns';
import { linksApi } from '../api/links';

interface ResourceRecord {
  fields: {
    name: string;
    description?: string;
    type: string[];
    website_url?: string;
    slack_url?: string;
    youtube_url?: string;
    discord_url?: string;
    country?: string;
    date_event?: string;
  };
  id: string;
}

type ResourceRecords = ResourceRecord[];

function ResourceList({ records }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {records.map((record: ResourceRecord) => {
        const {
          name,
          description,
          website_url,
          slack_url,
          youtube_url,
          discord_url,
          country,
          date_event,
        } = record.fields;

        return (
          <Card key={record.id}>
            {country && (
              <Text as="p" variant="p2" className="mb-2">
                {country}
              </Text>
            )}
            <Text as="h3" variant="h3" className="mb-2">
              {name}
            </Text>
            {date_event && (
              <Text as="p" variant="p2" className="mb-4">
                {format(new Date(date_event), 'cccc dd MMMM yyyy')}
              </Text>
            )}

            {description && (
              <Text as="p" variant="p1" className="mb-4">
                {description}
              </Text>
            )}

            <div className="mb-4 flex flex-wrap">
              {website_url && (
                <Button
                  href={website_url}
                  variant="secondary"
                  as="a"
                  isExternalLink={true}
                  className="mr-4"
                >
                  Website
                </Button>
              )}
              {youtube_url && (
                <Button
                  href={youtube_url}
                  variant="secondary"
                  as="a"
                  isExternalLink={true}
                  className="mr-4"
                >
                  Youtube
                </Button>
              )}
              {slack_url && (
                <Button
                  href={slack_url}
                  variant="secondary"
                  as="a"
                  isExternalLink={true}
                  className="mr-4"
                >
                  Slack
                </Button>
              )}
              {discord_url && (
                <Button
                  href={discord_url}
                  variant="secondary"
                  as="a"
                  isExternalLink={true}
                >
                  Discord
                </Button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default function ReactNativeResourcesPage({
  records,
}: {
  records: ResourceRecords;
}) {
  const numberOfRecords = round(records.length, -1);

  const guides = records.filter((record) =>
    record.fields.type.includes('guide')
  );
  const newsletters = records.filter((record) =>
    record.fields.type.includes('newsletter')
  );
  const podcasts = records.filter((record) =>
    record.fields.type.includes('podcast')
  );
  const conferences = records.filter((record) =>
    record.fields.type.includes('conference')
  );

  return (
    <Layout
      seoTitle={`${numberOfRecords}+ best resources to start with React Native in mobile app development`}
      seoDescription={`Most effective resources for learning React Native, online guides and tutorials, podcast and newsletter.`}
      ogImageTitle="React Native Resources"
      withAccessoryRight={
        <HeaderLinksForTools
          buttonLink={linksApi.airtable.RESOURCES_FORM}
          buttonText="Add resource"
        />
      }
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Hero>
          <Text as="h1" variant="h1">
            Starting mobile app development
            <br /> with React Native.
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

      <div className="mx-auto max-w-screen-2xl px-4 pb-12 sm:px-6">
        <section className="mb-32">
          <Text as="h2" variant="s2" className="my-6 font-semibold">
            React Native online resources
          </Text>
          <ResourceList records={guides} />
        </section>

        <section className="mb-32">
          <Text as="h2" variant="s2" className="my-6 font-semibold">
            React Native newsletters
          </Text>
          <ResourceList records={newsletters} />
        </section>

        <section className="mb-32">
          <Text as="h2" variant="s2" className="my-6 font-semibold">
            React Native podcasts
          </Text>
          <ResourceList records={podcasts} />
        </section>

        <section className="mb-32">
          <Text as="h2" variant="s2" className="my-6 font-semibold">
            React Native conferences
          </Text>
          <ResourceList records={conferences} />
        </section>
      </div>
      <div className="mx-auto mb-24 max-w-7xl px-4 sm:px-6">
        <section className="mb-12">
          <Text as="h2" variant="h2" className="my-4">
            Level up your skills
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
