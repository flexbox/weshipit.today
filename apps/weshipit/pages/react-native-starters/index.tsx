import { Layout } from '../../components/layout';
import {
  CategorizedStarters,
  ReactNativeStartersPageProps,
  StarterLevel,
  starters,
} from '../../fixtures/starters.fixture';

import {
  Badge,
  Button,
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
      {categorizedRecords.map((category) => (
        <div key={category.title} className="mb-12">
          <Text variant="h4" as="h2" className="mb-6">
            {category.title} Templates
          </Text>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.records.map((record) => {
              const { github_url, level, name, scope, stack, website_url } =
                record.fields;

              const author = extractUsernameFromGithubUrl(github_url || '');
              return (
                <Card key={record.id}>
                  <div className="flex items-start justify-between">
                    <div className="shrink">
                      <Text variant="h4" as="h3" className="my-0">
                        {name}
                      </Text>
                      <Text className="italic opacity-40">by {author}</Text>
                    </div>
                    <BadgeLevel level={level} />
                  </div>
                  {scope && (
                    <div className="mt-2">
                      <Text variant="c1" className="mb-2 mr-2 flex">
                        Scope of the template
                      </Text>
                      <TagList tags={scope} />
                    </div>
                  )}
                  {stack && (
                    <div className="mt-2">
                      <Text variant="c1" className="mb-2 mr-2 flex">
                        Stack included
                      </Text>
                      <TagList tags={stack} size="sm" />
                    </div>
                  )}

                  <div className="mt-6">
                    {github_url && (
                      <Button
                        href={github_url}
                        variant="outline"
                        as="a"
                        isExternalLink={true}
                        size="xl"
                        className="mr-4"
                      >
                        GitHub
                      </Button>
                    )}
                    {website_url && (
                      <Button
                        href={website_url}
                        variant="outline"
                        as="a"
                        isExternalLink={true}
                        size="xl"
                      >
                        Website
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ReactNativeStartersPage({
  categorizedRecords,
}: ReactNativeStartersPageProps) {
  const recordsNumber = round(categorizedRecords?.length, -1);

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
      <div className="mx-auto mb-6 max-w-6xl px-4 sm:px-6">
        <Hero
          title={
            <>
              The best <span className="text-blue-600">Starter Templates</span>{' '}
              for busy developers.
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
