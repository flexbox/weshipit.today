import React from 'react';
import { ProseContainer } from '~/components/Container/ProseContainer';
import Page from '~/components/Page';
import Uses from '../components/Content/uses.mdx';
import GlobalSeo from '~/components/SEO/GlobalSeo';

const SEO_DATA = {
  seo_title: 'Uses - David Leuliette',
  seo_description:
    'I am a highly skilled and experienced freelance react developer, specializing in web development and mobile app development using the React Native framework.',
  image: {
    alt: 'David Leuliette - Uses',
  },
};

export default function UsesPage() {
  return (
    <Page withHeader>
      <GlobalSeo data={SEO_DATA} slug="uses" />
      <ProseContainer style="prose-lg">
        <Uses />
      </ProseContainer>
    </Page>
  );
}
