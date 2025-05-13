import { Layout } from '../../components/layout';
import {
  CategorizedStarters,
  ReactNativeStartersPageProps,
  StarterLevel,
  starters,
} from '../../fixtures/starters.fixture';

import {
  Badge,
  Card,
  Hero,
  Hyperlink,
  Prose,
  TagList,
  Text,
} from '@weshipit/ui';
import round from 'lodash/round';

import { linksApi } from '../api/links';
import { extractUsernameFromGithubUrl } from '@weshipit/utils';

const BadgeLevel = ({ level }: { level: StarterLevel }) => {
  let color = 'green';
  if (level.toLowerCase() === 'intermediate') {
    color = 'yellow';
  } else if (level.toLowerCase() === 'advanced') {
    color = 'red';
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Badge variant={color as any} size="sm">
      {level}
    </Badge>
  );
};

function StarterList({ categorizedRecords }) {
  return (
    <div>
      {categorizedRecords.map(
        (category) =>
          category.records.length > 0 && (
            <div key={category.title} className="mb-16">
              <Text
                variant="h4"
                as="h2"
                className="mb-6 pb-2 font-semibold text-gray-800 border-b border-gray-200 dark:text-gray-200 dark:border-gray-700"
              >
                {category.title} Starters
              </Text>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                {category.records.map((record) => {
                  const { github_url, level, name, scope, stack, website_url } =
                    record.fields;

                  const author = extractUsernameFromGithubUrl(github_url || '');
                  return (
                    <Card
                      key={record.id}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between dark:bg-gray-800"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div className="shrink">
                            <Text
                              variant="h4"
                              as="h3"
                              className="my-0 font-semibold text-gray-800 dark:text-gray-100"
                            >
                              {name}
                            </Text>
                            {author && (
                              <Text className="italic text-gray-500 dark:text-gray-400 text-sm">
                                by {author}
                              </Text>
                            )}
                          </div>
                          <BadgeLevel level={level} />
                        </div>
                        {scope && (
                          <div className="mt-4">
                            <Text
                              variant="c1"
                              className="mb-2 mr-2 flex text-gray-600 dark:text-gray-400"
                            >
                              Scope of the template
                            </Text>
                            <TagList tags={scope} />
                          </div>
                        )}
                        {stack && (
                          <div className="mt-4">
                            <Text
                              variant="c1"
                              className="mb-2 mr-2 flex text-gray-600 dark:text-gray-400"
                            >
                              Stack included
                            </Text>
                            <TagList tags={stack} size="sm" />
                          </div>
                        )}
                      </div>
                      <div className="mt-auto pt-6 flex flex-wrap gap-2">
                        {github_url && (
                          <a
                            href={github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                          >
                            <span>GitHub</span>
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
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ),
      )}
    </div>
  );
}

export default function ReactNativeStartersPage({
  categorizedRecords,
}: ReactNativeStartersPageProps) {
  // count all records in the list
  const recordsNumber = round(
    categorizedRecords?.reduce(
      (total, category) => total + category.records.length,
      0,
    ),
    -1,
  );

  return (
    <Layout
      seoTitle={`${recordsNumber}+ starter templates to create your React Native project`}
      seoDescription="Starter repos to create your React Native project."
      ogImageTitle="React Native Starter Templates"
      withHeader
      callToActionButton={{
        name: 'Add a React Native Boilerplate',
        href: linksApi.airtable.TEMPLATE_FORM,
        isExternalLink: true,
      }}
      withFooter
    >
      <div className="bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 py-12 md:py-20 mb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Hero
            title={
              <>
                <span className="text-white">The best </span>
                <span className="text-blue-200">Starter Templates</span>{' '}
                <span className="text-white">for busy developers.</span>
              </>
            }
            description={
              <span className="!text-sky-100">
                We have curated essential resources for the success of your
                React Native app.
                <br />
                This informative content has been brought to you through the
                generous sponsorship of{' '}
                <a
                  href="https://gum.co/road-react-native/HELLO_FRIEND"
                  className="font-semibold text-white underline underline-offset-4 hover:text-blue-200 transition-colors"
                >
                  the React Native Roadmap
                </a>
                .
              </span>
            }
          />
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
        <StarterList categorizedRecords={categorizedRecords} />
      </div>
      <div className="mx-auto my-48 max-w-6xl px-4 sm:px-6">
        <Prose size="lg">
          <p>
            Here is a brief explanation of why I categorized each template this
            way:
          </p>

          <ul>
            <li>
              <strong>Beginner</strong>: templates are both very easy to use and
              require very little prior knowledge of React Native. They are both
              good choices for developers who are new to React Native or who
              want to create a simple app quickly.
            </li>

            <li>
              <strong>Intermediate</strong>: Templates offer more flexibility
              and customization options than the beginner templates, but they
              can also be more difficult to set up and use.
            </li>
            <li>
              <strong>Advanced</strong>: are all designed for experienced React
              Native developers. They offer a lot of flexibility and
              customization options, but they can also be more difficult to set
              up and use.
            </li>
          </ul>

          <h2>How do you choose which React Native boilerplate to include?</h2>
          <p>
            Every week, we search and evaluate the best starter templates from
            the Internet.
          </p>
          <p>
            Afterwards, we tested each boilerplate in their common use cases and
            selected best ones that are highly personalized and deliver what
            they promise.
          </p>
          <p>
            If you find a useful template that&apos;s not in the list, but
            should be - please let us know!
          </p>

          <p className="flex">
            You can also{' '}
            <Hyperlink
              className="ml-1"
              href={linksApi.airtable.TEMPLATE_FORM}
              isExternal
            >
              submit your custom template here
            </Hyperlink>
            .
          </p>

          <h2>How can I contact you if I have questions?</h2>
          <p>
            Feedback and ideas on how to improve this site are most welcome.
          </p>
          <p>
            Feel free to reach me on Twitter (X){' '}
            <Hyperlink href="https://twitter.com/intent/follow?screen_name=flexbox_">
              @flexbox_
            </Hyperlink>
            .
          </p>
        </Prose>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const records = starters.records;

  // add an extra keys and order records by level
  // sort all begninner first, then intermediate and advanced
  records.sort((a, b) => {
    const levelA = a.fields.level.toLowerCase();
    const levelB = b.fields.level.toLowerCase();

    if (levelA === 'beginner' && levelB !== 'beginner') {
      return -1;
    }
    if (levelA !== 'beginner' && levelB === 'beginner') {
      return 1;
    }
    if (levelA === 'intermediate' && levelB !== 'intermediate') {
      return -1;
    }
    if (levelA !== 'intermediate' && levelB === 'intermediate') {
      return 1;
    }

    return 0;
  });

  const categorizedRecords: CategorizedStarters[] = [
    { title: 'Beginner', records: [] },
    { title: 'Intermediate', records: [] },
    { title: 'Advanced', records: [] },
  ];

  records.forEach((record) => {
    const level = record.fields.level.toLowerCase();
    if (level === 'beginner') {
      categorizedRecords[0].records.push(record);
    } else if (level === 'intermediate') {
      categorizedRecords[1].records.push(record);
    } else if (level === 'advanced') {
      categorizedRecords[2].records.push(record);
    }
  });

  return {
    props: {
      categorizedRecords,
    },
  };
}
