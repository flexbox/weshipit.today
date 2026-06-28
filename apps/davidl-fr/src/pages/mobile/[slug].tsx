import React from 'react';
import Page, { SectionHeading } from '~/components/Page';
import { H1, Subheading } from '~/components/Typography';
import { designDetailsPosts } from '~/data';
import DesignDetailView from '~/components/DesignDetailView';
import DesignDetailsGrid from '~/components/DesignDetailsGrid';
import MobileSEO from '~/components/SEO/MobileSeo';
import { GetStaticPaths, GetStaticProps } from 'next';
import { DesignDetailsPost } from '~/types/design';
import { CaseStudyForm } from '~/components/Form/CaseStudyForm';

interface DesignDetailProps {
  post: DesignDetailsPost;
}

export default function DesignDetail({ post }: DesignDetailProps) {
  if (post) {
    return (
      <Page withHeader>
        <MobileSEO title={post.title} />
        <DesignDetailView post={post} />
        <CaseStudyForm />
      </Page>
    );
  }

  return (
    <Page withHeader>
      <MobileSEO title="UX and UX that rocks" />

      <SectionHeading>
        <H1>Best Mobile Design</H1>
        <Subheading>A visual exploration of digital products</Subheading>
      </SectionHeading>

      <DesignDetailsGrid truncate={false} />
    </Page>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: any = [];

  designDetailsPosts.forEach((post) => {
    paths.push({ params: post });
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const post = designDetailsPosts.find(
    (post) => post.slug === context.params.slug,
  );

  return {
    props: {
      post,
    },
  };
};
