import { Layout } from '../../components/layout';
import client from '../api/apollo-client';

import { Text, Hero, Hyperlink, Card, Badge } from '@weshipit/ui';
import { gql } from '@apollo/client';
import round from 'lodash/round';

import { HeaderLinksForTools } from '../../components/header-links-for-tools';
import { linksApi } from '../api/links';


function extractUserNameFromGithubUrl(githubUrl) {
  return githubUrl.split('/')[3];
}

const BadgeLevel = ({ level }) => {
  let color = 'green';
  if (level.toLowerCase() === 'intermediate') {
    color = 'yellow';
  } else if (level.toLowerCase() === 'advanced') {
    color = 'red';
  }

  return <Badge variant={color as any}>{level}</Badge>;
};

function StarterList({ records }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {records.map((record) => {
        const { name, github_url, website_url, level, stack, scope } =
          record.fields;

        const author = extractUserNameFromGithubUrl(github_url || '');
        return (
          <Card key={record.id}>
            <div className="prose prose-lg dark:prose-invert">
              <div className="flex items-start justify-between">
                <div className="shrink">
                  <h2 className="my-0">{name}</h2>
                  <h3 className="mt-0 italic opacity-40">by {author}</h3>
                </div>
                <BadgeLevel level={level} />
              </div>
              <ul>
                {github_url && (
                  <li>
                    <Hyperlink href={github_url}>GitHub</Hyperlink>
                  </li>
                )}
                {website_url && (
                  <li>
                    <Hyperlink href={website_url}>Website</Hyperlink>
                  </li>
                )}
              </ul>
            </div>
            {scope && (
              <div className="mt-8 flex overflow-x-auto">
                {scope &&
                  scope.map((scope, index) => (
                    <Badge
                      key={index}
                      variant="blue"
                      size="sm"
                      className="mx-2 flex items-center"
                    >
                      <span style={{ whiteSpace: 'nowrap' }}>{scope}</span>
                    </Badge>
                  ))}
              </div>
            )}
            {stack && (
              <div className="my-2 flex overflow-x-auto">
                {stack &&
                  stack.map((stack, index) => (
                    <Badge
                      key={index}
                      variant="blue"
                      size="sm"
                      className="mx-2"
                    >
                      <span style={{ whiteSpace: 'nowrap' }}>{stack}</span>
                    </Badge>
                  ))}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

export default function ReactNativeToolsPage({ records }) {
  const recordsNumber = round(records.length, -1);

  return (
    <Layout
      seoTitle={`${recordsNumber}+ starter templates to create your React Native project`}
      seoDescription="Starter repos to create your React Native project."
      ogImageTitle="React Native Starter Templates"
      withAccessoryRight={<HeaderLinksForTools buttonText="Add a React Native Boilerplate" buttonLink={linksApi.airtable.TEMPLATE_FORM} />}
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
        <StarterList records={records} />
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="prose prose-lg dark:prose-invert">
          <p>
            Here is a brief explanation of why I categorized each template this
            way:
          </p>

          <ul>
            <li>
              Beginner: templates are both very easy to use and require very
              little prior knowledge of React Native. They are both good choices
              for developers who are new to React Native or who want to create a
              simple app quickly.
            </li>

            <li>
              Intermediate: Templates offer more flexibility and customization
              options than the beginner templates, but they can also be more
              difficult to set up and use.
            </li>
            <li>
              Advanced: are all designed for experienced React Native
              developers. They offer a lot of flexibility and customization
              options, but they can also be more difficult to set up and use.
            </li>
          </ul>
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
