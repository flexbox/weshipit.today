import { Layout } from '../../components/layout';
import { tools } from '../../fixtures/tools.fixture';

import { ToolList, SearchBar, Hero, TypeFilter } from '@weshipit/ui';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { linksApi } from '../api/links';

export async function getStaticProps() {
  const records = tools;

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'React Native Tools & Resources',
    description:
      'Curated tools and libraries for React Native developers — analytics, CI/CD, debugging, UI components, and more.',
    url: 'https://weshipit.today/react-native-tools',
    numberOfItems: records.length,
    itemListElement: records.map((record, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: record.name,
      url: record.website_url || null,
    })),
  };

  return {
    props: {
      records,
      itemListSchema,
    },
    revalidate: 3600,
  };
}

export default function ReactNativeToolsPage({ records, itemListSchema }) {
  const numberOfTools = records.length;
  const router = useRouter();
  const toolType = router.query.type as string | undefined;

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchResults = records.filter((record) => {
    const matchesType = toolType
      ? record.type.some((t) => t.toLowerCase() === toolType.toLowerCase())
      : true;
    const matchesSearch = searchTerm
      ? record.description?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesType && matchesSearch;
  });

  return (
    <Layout
      seoTitle={`${numberOfTools}+ React Native Tools & Resources`}
      seoDescription={`${numberOfTools}+ curated tools and libraries for React Native developers — analytics, CI/CD, debugging, UI components, and more.`}
      ogImageTitle="React Native Tools"
      withHeader
      withFooter
      callToActionLink={{
        name: 'Add a tool',
        href: linksApi.airtable.TOOLS_FORM,
        isExternalLink: true,
      }}
      callToActionButton={{ name: 'Work with us', href: '/' }}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      </Head>
      <div className="mx-auto mb-6 max-w-6xl px-4 sm:px-6">
        <Hero
          badgeStyle="bg-orange-200 dark:bg-orange-900 text-[#ed6c5c] ring-[#ed6c5c] dark:ring-[#ed6c5c]"
          hintTitle="Upvote us on Product Hunt"
          hintDescription="Help us climb the ranks and reach more people"
          hintLink="https://www.producthunt.com/@flexbox"
          title={
            <>
              The best{' '}
              {toolType && (
                <span className="text-indigo-600">
                  {toolType.toLowerCase()}
                </span>
              )}{' '}
              tools
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
    </Layout>
  );
}
