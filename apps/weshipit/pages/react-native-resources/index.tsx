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
          <Card
            key={record.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
          >
            <div>
              {conference_country && (
                <Text as="p" variant="p2" className="mb-2 text-gray-500">
                  {conference_country}
                </Text>
              )}
              <Text
                as="h3"
                variant="h4"
                className="mb-2 font-semibold text-gray-800"
              >
                {name}
              </Text>
              {conference_date && (
                <Text as="p" variant="p2" className="mb-4 text-gray-500">
                  {format(new Date(conference_date), 'cccc dd MMMM yyyy')}
                </Text>
              )}

              {description && (
                <Text as="p" variant="p1" className="mb-4 text-gray-600">
                  {description}
                </Text>
              )}
            </div>

            <div className="mt-auto pt-4 flex flex-wrap gap-2">
              {website_url && (
                <a
                  href={website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-blue-300 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                >
                  <span>Website</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              )}
              {youtube_url && (
                <a
                  href={youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-red-300 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-800 hover:border-red-400 dark:hover:border-red-600 transition-colors"
                >
                  <span>Youtube</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              )}
              {slack_url && (
                <a
                  href={slack_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-purple-300 dark:border-purple-700 hover:bg-purple-200 dark:hover:bg-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-colors"
                >
                  <span>Slack</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              )}
              {discord_url && (
                <a
                  href={discord_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-indigo-300 dark:border-indigo-700 hover:bg-indigo-200 dark:hover:bg-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
                >
                  <span>Discord</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
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
    record.fields.type.includes('Guide'),
  );
  const newsletters = records.filter((record) =>
    record.fields.type.includes('Newsletter'),
  );
  const podcasts = records.filter((record) =>
    record.fields.type.includes('Podcast'),
  );
  const conferences = records.filter((record) =>
    record.fields.type.includes('Conference'),
  );

  return (
    <Layout
      seoTitle={`${numberOfRecords}+ best resources to start with React Native in mobile app development`}
      seoDescription={`Most effective resources for learning React Native, online guides and tutorials, podcast and newsletter.`}
      ogImageTitle="React Native Resources"
      withHeader
      navigation={[
        { name: 'Guides', href: '#guides' },
        { name: 'Newsletters', href: '#newsletters' },
        { name: 'Podcasts', href: '#podcasts' },
        { name: 'Conferences', href: '#conferences' },
      ]}
      callToActionButton={{
        name: 'Add resource',
        href: 'https://github.com/flexbox/weshipit.today/blob/main/apps/weshipit/fixtures/resources.fixture.ts',
        isExternalLink: true,
      }}
    >
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 md:py-20 mb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Hero
            title={
              <>
                <span className="text-white">
                  Starting mobile app development
                </span>
                <br /> <span className="text-white">with React Native.</span>
              </>
            }
          >
            <Text as="p" variant="p1" className="my-4 !text-purple-100">
              We have curated essential resources for the success of your React
              Native app.
              <br />
              This informative content has been brought to you through the
              generous sponsorship of{' '}
              <a
                href="https://gum.co/road-react-native/HELLO_FRIEND"
                className="font-semibold text-white underline underline-offset-4 hover:text-purple-200 transition-colors"
              >
                the React Native Roadmap
              </a>
              .
            </Text>
          </Hero>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 pb-12 sm:px-6 grid gap-16 md:gap-24">
        <section id="guides">
          <Text
            as="h2"
            variant="s2"
            className="my-6 pb-2 font-semibold text-gray-800 border-b border-gray-200"
          >
            React Native online resources
          </Text>
          <ResourceList records={guides} />
        </section>

        <section id="newsletters">
          <Text
            as="h2"
            variant="s2"
            className="my-6 pb-2 font-semibold text-gray-800 border-b border-gray-200"
          >
            React Native newsletters
          </Text>
          <ResourceList records={newsletters} />
        </section>

        <section id="podcasts">
          <Text
            as="h2"
            variant="s2"
            className="my-6 pb-2 font-semibold text-gray-800 border-b border-gray-200"
          >
            React Native podcasts
          </Text>
          <ResourceList records={podcasts} />
        </section>

        <section id="conferences">
          <Text
            as="h2"
            variant="s2"
            className="my-6 pb-2 font-semibold text-gray-800 border-b border-gray-200"
          >
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
