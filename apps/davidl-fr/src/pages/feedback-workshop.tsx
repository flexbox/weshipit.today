import * as React from 'react';

import Page, { ContentContainer, Iframe } from '~/components/Page';
import Frame from '~/components/Onboarding/Frame';
import GlobalSeo from '~/components/SEO/GlobalSeo';
import { AIRTABLE_FORM } from '~/utils/airtable-links';

export const FeedBackWorkshop = () => (
  <ContentContainer style={{ marginTop: 30 }}>
    <Frame src={AIRTABLE_FORM.BOOTCAMP_NPS} width="100%" height="1701" />
  </ContentContainer>
);

const SEO_DATA = {
  seo_title: 'Feedback Workshop - David Leuliette',
  seo_description:
    'In order to improve the quality of the materials can you take 3:14 min (on average) to complete this form ?',
  image: {
    alt: 'Contact Freelance React Native Developer',
  },
};

const FeedbackWorkshopPage = () => {
  return (
    <Page withHeader>
      <GlobalSeo
        data={SEO_DATA}
        slug="feedback-workshop"
        title="I hope you enjoyed the workshop"
      />

      <FeedBackWorkshop />
    </Page>
  );
};
export default FeedbackWorkshopPage;
