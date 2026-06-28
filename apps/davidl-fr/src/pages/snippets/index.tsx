import * as React from 'react';

import Page, { SectionHeading, ContentContainer } from '~/components/Page';
import PatternList from '~/components/Pattern/List';
import { H1, LargeSubheading } from '~/components/Typography';
import BlogSeo from '~/components/SEO/BlogSeo';
import { getPatterns } from '~/pages/api/pattern';
import { pattern } from '~/types/pattern';

export const PatternContainer = ({ patterns }) => (
  <ContentContainer>
    <PatternList patterns={patterns} />
  </ContentContainer>
);

interface PatternPageProps {
  data: {
    patterns: pattern[];
  };
}

export default function PatternPage({ data }: PatternPageProps) {
  const { patterns } = data;
  const first_publication_date = patterns[0].first_publication_date;
  const last_publication_date =
    patterns[patterns.length - 1].last_publication_date;

  const SEO_DATA = {
    seo_title: 'JavaScript to Know for React Native',
    seo_description:
      'What JavaScript and TypeScript features you should be know when learning and using React Native',
    date: last_publication_date,
    first_publication_date: first_publication_date,
    last_publication_date: last_publication_date,
    image: {
      alt: 'Commonly used design patterns in React Native applications',
    },
  };

  return (
    <Page withHeader withNewsletter>
      <BlogSeo
        data={SEO_DATA}
        slug={'pattern'}
        title={'Commonly used design patterns in React Native applications'}
      />

      <ContentContainer>
        <SectionHeading $mt="0">
          <H1>React Native Code Snippets</H1>
          <LargeSubheading>Code examples for your application.</LargeSubheading>
        </SectionHeading>
      </ContentContainer>
      <PatternContainer patterns={patterns} />
    </Page>
  );
}

export async function getStaticProps() {
  const data = await getPatterns();

  return {
    props: {
      data,
    },
  };
}
