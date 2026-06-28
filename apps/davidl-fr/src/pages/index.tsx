import React from 'react';

import Page, { SectionHeading, SectionContainer } from '~/components/Page';
import Companies from '~/components/Companies/Companies';
import {
  P,
  Rarr,
  LargeSubheading,
  Subheading,
  H2,
} from '~/components/Typography';

import Hero from '~/components/Hero/Hero';
import Link from 'next/link';
import DesignDetailsGrid from '~/components/DesignDetailsGrid';
import Testimonials from '~/components/Testimonials';
import BlogList from '~/components/Blog/List';
import { getFeaturedPosts } from './api/blogpost';
import GlobalSeo from '~/components/SEO/GlobalSeo';
import { ProseContainer } from '~/components/Container/ProseContainer';
import { post } from '~/types/blog';
import { faqData } from '~/pages/api/homepage';

const SEO_DATA = {
  seo_title: 'Freelance React Native Developer - David Leuliette',
  seo_description:
    "Let's amplify your magic and create an experience on web and mobile that connects, engages and inspires your dreamiest clients and customers.",
  image: {
    alt: 'Freelance React Native Developer - David Leuliette',
  },
};

export const HomeFaq = () => {
  return (
    <div className="py-24">
      <ProseContainer withContentContainer>
        <H2>Frequently Asked Questions</H2>
        {faqData.mainEntity.map((item, index) => {
          return (
            <details key={index} className="mb-6">
              <summary className="font-bold hover:cursor-pointer hover:text-blue-500 dark:hover:text-orange-500">
                {item.name}
              </summary>
              <P>{item.acceptedAnswer.text}</P>
            </details>
          );
        })}
      </ProseContainer>
    </div>
  );
};

interface HomeProps {
  posts: post[];
}

function Home({ posts }: HomeProps) {
  const featuredPosts = posts.slice(0, 3);
  const currentYear = new Date().getFullYear();
  const xpYears = currentYear - 2007;

  return (
    <Page withHeader withFooter>
      <script
        type="application/ld+json"
        key="jsonld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <GlobalSeo
        data={SEO_DATA}
        slug="/"
        title="Freelance React Native Developer"
      />

      <SectionHeading>
        <Hero />
      </SectionHeading>

      <SectionHeading>
        <H2>Transform your business</H2>
        <LargeSubheading>
          I have more than{' '}
          <strong>
            {xpYears} years of experience in building web products
          </strong>
          . I am traveling around the world to sharpen my skills, meeting
          mentors in conferences, and use the same tools as theses{' '}
          <strong>successful companies</strong>:
        </LargeSubheading>
        <Companies />

        {featuredPosts && featuredPosts.length > 0 && (
          <>
            <BlogList posts={featuredPosts} />

            <Subheading>
              <Link href="/blog" as="/blog">
                View all articles
                <Rarr />
              </Link>
            </Subheading>
          </>
        )}
      </SectionHeading>

      <SectionContainer>
        <SectionHeading>
          <H2>My mission</H2>
          <LargeSubheading>
            As a designer, my mission is to{' '}
            <strong>
              transform your users into ambassadors of your product
            </strong>
            . To achieve this goal, we need to deliver a memorable user
            experience.
          </LargeSubheading>
          <LargeSubheading>
            I analyze a lot of mobile applications, to understand what makes a
            successful design in the modern world{' '}
            <strong>where everyone has a phone</strong>.
          </LargeSubheading>
          <Subheading>
            <Link href="/mobile" as="/mobile">
              View all posts
              <Rarr />
            </Link>
          </Subheading>
        </SectionHeading>

        <DesignDetailsGrid truncate={true} />

        <SectionHeading style={{ marginTop: 48 }}>
          <H2>
            You only have one chance
            <br /> to make a first impression
          </H2>
          <LargeSubheading>Let’s make it an amazing one.</LargeSubheading>
          <P style={{ marginTop: 12 }}>
            <Link href="/mobile" as="/mobile">
              Find out more
              <Rarr />
            </Link>
          </P>
        </SectionHeading>
      </SectionContainer>

      <SectionHeading>
        <Testimonials start={0} end={3} />
      </SectionHeading>

      <HomeFaq />
    </Page>
  );
}

Home.getInitialProps = async () => {
  const posts = await getFeaturedPosts();
  return posts;
};

export default Home;
