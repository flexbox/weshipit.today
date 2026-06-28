import * as React from 'react';

import Page, { SectionHeading, ContentContainer } from '~/components/Page';
import {
  H1,
  H2,
  LargeSubheading,
  Rarr,
  Subheading,
} from '~/components/Typography';
import BlogList from '~/components/Blog/List';
import { getPosts } from '../api/blogpost';
import DesignDetailsGrid from '~/components/DesignDetailsGrid';
import Link from 'next/link';
import GlobalSeo from '~/components/SEO/GlobalSeo';
import { post } from '~/types/blog';

const SEO_DATA = {
  seo_title: 'Article about freelancing and React Native - David Leuliette',
  seo_description:
    'Blog about design, developement, automation and how to ship product for mobile users.',
  image: {
    alt: 'Blog',
  },
};

interface BlogPageProps {
  data: {
    posts: post[];
  };
}

export default function BlogPage({ data }: BlogPageProps) {
  return (
    <Page withHeader withNewsletter>
      <GlobalSeo data={SEO_DATA} slug="blog" title="Blog - David Leuliette" />
      <ContentContainer>
        <SectionHeading $mt="0">
          <H1>Mobile Design</H1>
          <LargeSubheading>
            From a React Native developer’s perspective, UX and UI analysis can
            provide valuable insights into the onboarding process and user
            experience.
          </LargeSubheading>
          <Subheading>
            <Link href="/mobile" as="/mobile">
              View all posts
              <Rarr />
            </Link>
          </Subheading>
        </SectionHeading>
      </ContentContainer>

      <DesignDetailsGrid truncate={true} />

      <ContentContainer className="mt-20">
        <SectionHeading $mt="0">
          <H2>Blog</H2>
          <LargeSubheading>
            Articles about design, developement, automation and how to ship
            product for mobile users.
          </LargeSubheading>
        </SectionHeading>
      </ContentContainer>
      {data ? (
        <BlogList posts={data.posts} />
      ) : (
        <LargeSubheading>There is no article right now.</LargeSubheading>
      )}

      <Subheading>
        Want to learn more about React Native?{' '}
        <Link href="/bootcamp" as="/mobile">
          join the bootcamp
          <Rarr />
        </Link>
      </Subheading>
    </Page>
  );
}

export async function getStaticProps() {
  const data = await getPosts();

  return {
    props: {
      data,
    },
  };
}
