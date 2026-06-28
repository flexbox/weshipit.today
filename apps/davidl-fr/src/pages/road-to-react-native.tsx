import React, { ReactElement } from 'react';
import Page, { SectionHeading } from '~/components/Page';
import Testimonials from '~/components/Testimonials';
import Script from 'next/script';
import Intro from './road-to-react-native-intro.mdx';
import Faq from './road-to-react-native-faq.mdx';
import { NativeLink } from '~/components/Link/NativeLink';
import GlobalSeo from '~/components/SEO/GlobalSeo';
import { ProseContainer } from '~/components/Container/ProseContainer';

const SEO_DATA = {
  seo_title: 'The Road to React Native Book',
  seo_description:
    'React Native is about React, with the native bits on top. Learn how to get started with the framework with David Leuliette —an experienced freelance developer.',
  image: {
    alt: 'The Road to React Native',
  },
};

export default function RoadToReacNativePage(): ReactElement {
  return (
    <Page>
      <Script
        strategy="afterInteractive"
        src="https://gumroad.com/js/gumroad-embed.js"
      />

      <GlobalSeo
        data={SEO_DATA}
        slug={'road-to-react-native'}
        title={'The Roadmap to Become a React Native Developer'}
      />

      <ProseContainer style="prose-lg" withContentContainer>
        <Intro />

        <div
          className="gumroad-product-embed"
          data-gumroad-product-id="road-react-native"
        >
          <a href="https://gumroad.com/l/road-react-native">Loading…</a>
        </div>

        <NativeLink href="https://gumroad.com/l/road-react-native">
          Open payment link on a new tab
        </NativeLink>

        <Faq />
      </ProseContainer>

      <SectionHeading>
        <Testimonials start={6} end={7} />
      </SectionHeading>
    </Page>
  );
}
