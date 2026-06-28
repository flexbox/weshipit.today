import React from 'react';

import Page, { SectionHeading, ContentContainer } from '~/components/Page';
import { H1, Subheading } from '~/components/Typography';
import MindMapList from '~/components/MindMapList';
import GlobalSeo from '~/components/SEO/GlobalSeo';

const SEO_DATA = {
  seo_title: 'Mindmaps - David Leuliette',
  seo_description:
    'All the tools I use, resources I follow to release React and React Native application to production',
  image: {
    alt: 'Mindmaps',
  },
};

const Minmaps = () => {
  return (
    <Page withNewsletter>
      <GlobalSeo
        data={SEO_DATA}
        slug="mindmaps"
        title="Mind maps from a freelance React developer"
      />

      <ContentContainer>
        <SectionHeading $mt="0">
          <H1>Mind Maps</H1>
          <Subheading>
            As human being, we can{' '}
            <strong>hack our brain to remember informations</strong> if we
            organise it. I use MindNode to dump my brain on internet and keep an
            up-to-date list of bookmarks.
          </Subheading>
        </SectionHeading>
      </ContentContainer>
      <MindMapList />
    </Page>
  );
};

export default Minmaps;
