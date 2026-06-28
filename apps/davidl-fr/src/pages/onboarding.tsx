import React from 'react';
import Page, { ContentContainer, SectionHeading } from '~/components/Page';
import { H1, Subheading, TextLight, P } from '~/components/Typography';
import Companies from '~/components/Companies/Companies';
import GlobalSeo from '~/components/SEO/GlobalSeo';
import AirtableToggleForm from '~/components/Airtable/AirtableToggleForm';
import { AIRTABLE_FORM } from '~/utils/airtable-links';

const SEO_DATA = {
  seo_title: 'Onboard with a Freelance React Native Developer',
  seo_description:
    'Let’s amplify your magic and create an experience on web and mobile that connects, engages and inspires your dreamiest clients and customers.',
  image: {
    alt: 'Contact Freelance React Native Developer',
  },
};

export default function OnboardingPage() {
  return (
    <Page withHeader>
      <GlobalSeo
        data={SEO_DATA}
        slug="consultation"
        title="I’d love to hear about you and your project"
      />

      <ContentContainer>
        <SectionHeading $mt="0">
          <H1 style={{ textAlign: 'center' }}>
            Let’s make something great together
          </H1>
        </SectionHeading>
        <Subheading style={{ textAlign: 'center', maxWidth: '100%' }}>
          Let’s talk about your next project. I’ll reply to your message within
          24 hours. ✌️
        </Subheading>
      </ContentContainer>

      <AirtableToggleForm
        formLink={AIRTABLE_FORM.CLIENT_ONBOARDING}
        formHeight={2300}
        buttonText="Start a project"
      />

      <div style={{ paddingTop: '128px', textAlign: 'center' }}>
        <TextLight>
          Join tens of innovators that have already worked with me
        </TextLight>
        <Companies />
      </div>
      <ContentContainer className="mt-32">
        <P>
          I am a highly{' '}
          <strong>skilled and experienced freelance React developer</strong>. My
          expertise lies in web and mobile app development using the{' '}
          <strong>React Native library</strong>.
        </P>
        <P>
          With years of experience in <strong>JavaScript development</strong>, I
          am well-equipped to handle any web development project, regardless of
          its size. As a freelance React developer, I am dedicated to providing
          my clients with high-quality, reliable, and cost-effective solutions.
        </P>
        <P>
          If you are looking for a skilled JavaScript developer to help bring
          your web development ideas to life, do not hesitate to contact me. I
          am always <strong>available to discuss your project</strong> and
          provide a tailored solution to meet your needs.
        </P>
        <P>
          If you’re interested in working with me, please fill out the form
          linked below to <strong>gain access to my calendar</strong>. From
          there, we can schedule a call to discuss your project in further
          detail.
        </P>

        <AirtableToggleForm
          formLink={AIRTABLE_FORM.CLIENT_ONBOARDING}
          formHeight={2300}
          buttonText="Schedule a video call"
        />
      </ContentContainer>
    </Page>
  );
}
