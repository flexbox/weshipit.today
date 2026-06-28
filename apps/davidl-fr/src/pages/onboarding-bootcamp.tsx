import * as React from 'react';
import Page, { ContentContainer } from '~/components/Page';
import Frame from '~/components/Onboarding/Frame';
import GlobalSeo from '~/components/SEO/GlobalSeo';
import { AIRTABLE_FORM } from '~/utils/airtable-links';

const SEO_DATA = {
  seo_title: 'Bootcamp Onboarding',
  seo_description:
    'Get ready for your next bootcamp with David Leuliette and his team.',
  image: {
    alt: 'Bootcamp Onboarding',
  },
};

const OnboardingBootcamp = () => (
  <ContentContainer style={{ marginTop: 30 }}>
    <Frame src={AIRTABLE_FORM.BOOTCAMP_ONBOARDING} width="100%" height="2980" />
  </ContentContainer>
);

export default function OnboardingBootcampPage() {
  return (
    <Page withHeader>
      <GlobalSeo
        data={SEO_DATA}
        slug="onboarding-bootcamp"
        title="Bootcamp Onboarding"
      />

      <OnboardingBootcamp />
    </Page>
  );
}
