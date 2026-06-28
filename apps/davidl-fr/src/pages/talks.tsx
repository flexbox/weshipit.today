import React, { ReactElement } from 'react';
import Page, { SectionHeading } from '~/components/Page';
import Testimonials from '~/components/Testimonials';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { MDXProps } from '~/types/mdx';
import { ProseContainer } from '~/components/Container/ProseContainer';
import GlobalSeo from '~/components/SEO/GlobalSeo';

const SEO_DATA = {
  seo_title: 'Speaking appearances',
  seo_description:
    'React Native is about React, with the native bits on top. Learn how to get started with the framework with David Leuliette —an experienced freelance developer.',
  image: {
    alt: 'Speaking appearances',
  },
};

export default function TalksPage({ source }: MDXProps): ReactElement {
  return (
    <Page
      withHeader
      withFooter
      footerTitle="I can speak at your meetup or company"
      footerText="Interested in seeing any of these talks at your meetup, or adapted as a workshop for your company?"
    >
      <GlobalSeo
        data={SEO_DATA}
        slug={'talks'}
        title={'Talks and Speaking Appearances'}
      />

      <ProseContainer style="mt-7" withContentContainer>
        <MDXRemote {...source} />
      </ProseContainer>
      <SectionHeading>
        <Testimonials start={7} end={8} />
      </SectionHeading>
    </Page>
  );
}

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  const rawContent = await fetch(
    'https://raw.githubusercontent.com/flexbox/talks/master/README.md',
  );
  const mdxContent = await rawContent.text();
  const mdxSource = await serialize(mdxContent);

  return { props: { source: mdxSource }, revalidate: 3600 };
}
