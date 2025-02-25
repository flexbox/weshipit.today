import { Layout } from '../../components/layout';
import { resources } from '../../fixtures/resources.fixture';

import { Text, Hero, CallToActionCards, Card, Button } from '@weshipit/ui';
import round from 'lodash/round';
import { HeaderLinksForTools } from '../../components/header-links-for-tools';
import { format } from 'date-fns';
import { linksApi } from '../api/links';

/**
 * @deprecated we should use codegen
 */
interface ResourceRecord {
  id: string;
  fields: {
    name: string;
    description?: string;
    type: string[];
    website_url?: string;
    slack_url?: string;
    youtube_url?: string;
    discord_url?: string;
    conference_country?: string;
    conference_date?: string;
  };
}

/**
 * @deprecated we should use codegen
 */
type ResourceRecords = ResourceRecord[];

function ResourceList({ records }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {records.map((record: ResourceRecord) => {
        const {
          conference_country,
          conference_date,
          description,
          discord_url,
          name,
          slack_url,
          website_url,
          youtube_url,
        } = record.fields;

        return (
          <Card key={record.id}>
            {conference_country && (
              <Text as="p" variant="p2" className="mb-2">
                {conference_country}
              </Text>
            )}
            <Text as="h3" variant="h3" className="mb-2">
              {name}
            </Text>
            {conference_date && (
              <Text as="p" variant="p2" className="mb-4">
                {format(new Date(conference_date), 'cccc dd MMMM yyyy')}
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
                  variant="outline"
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
                  variant="outline"
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
                  variant="outline"
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
                  variant="outline"
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
    record.fields.type.includes('Guide')
  );
  const newsletters = records.filter((record) =>
    record.fields.type.includes('Newsletter')
  );
  const podcasts = records.filter((record) =>
    record.fields.type.includes('Podcast')
  );
  const conferences = records.filter((record) =>
    record.fields.type.includes('Conference')
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
      <div className="mx-auto mb-6 max-w-6xl px-4 sm:px-6">
        <Hero
          title={
            <>
              Starting mobile app development
              <br /> with React Native.
            </>
          }
        >
          <Text as="p" variant="p1" className="my-4 !text-gray-500">
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
          </Text>
        </Hero>
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

export async function getStaticProps() {
  const records = resources.records;

  return {
    props: {
      records,
    },
  };
}
