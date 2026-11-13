import { Layout } from '../../components/layout';
import { tools } from '../../fixtures/tools.fixture';

import { ToolList, SearchBar, TypeFilter } from '@weshipit/ui';
import {
  DirectoryHero,
  DirectoryHeroHighlight,
  RoadmapSponsorship,
} from '../../components/directory-hero';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { linksApi } from '../api/links';

export async function getStaticProps() {
  const records = tools;

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    description:
      'Curated tools and libraries for React Native developers — analytics, CI/CD, debugging, UI components, and more.',
    itemListElement: records.map((record, index) => ({
      '@type': 'ListItem',
      name: record.name,
      position: index + 1,
      url: `https://weshipit.today/react-native-tools/${record.slug}`,
    })),
    name: 'React Native Tools & Resources',
    numberOfItems: records.length,
    url: 'https://weshipit.today/react-native-tools',
  };

  return {
    props: {
      itemListSchema,
      records,
    },
    revalidate: 3600,
  };
}

export default function ReactNativeToolsPage({ itemListSchema, records }) {
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
      seoTitle={`React Native Tools: ${numberOfTools}+ Libraries & SDKs`}
      seoDescription={`${numberOfTools}+ curated React Native tools, libraries and SDKs: analytics, auth, payments, databases, CI/CD and error monitoring, with alternatives for each.`}
      ogImageTitle="React Native Tools"
      ogImageKicker="Free directory"
      withHeader
      withFooter
      callToActionLink={{
        href: linksApi.airtable.TOOLS_FORM,
        isExternalLink: true,
        name: 'Add a tool',
      }}
      callToActionButton={{ href: '/', name: 'Work with us' }}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      </Head>
      <DirectoryHero
        kicker={`Free directory · ${numberOfTools} tools`}
        title={
          <>
            The best React Native{' '}
            {toolType && (
              <>
                <DirectoryHeroHighlight>
                  {toolType.toLowerCase()}
                </DirectoryHeroHighlight>{' '}
              </>
            )}
            tools and resources for busy developers
          </>
        }
        description={
          <>
            Analytics, CI/CD, debugging, UI components and more, curated for the
            success of your React Native app. <RoadmapSponsorship />
          </>
        }
      />

      <div className="mx-auto max-w-screen-xl px-4 pb-12 sm:px-6">
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
