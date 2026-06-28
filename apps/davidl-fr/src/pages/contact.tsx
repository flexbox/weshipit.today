import React from 'react';
import Page, { SectionHeading, ContentContainer } from '~/components/Page';
import { H1, P, H2 } from '~/components/Typography';
import { PrimaryButton } from '~/components/Button';
import Link from 'next/link';
import { TweetComposer } from '~/components/Tweet/TweetComposer';
import GlobalSeo from '~/components/SEO/GlobalSeo';

const SEO_DATA = {
  seo_title: 'Contact Freelance React Native Developer',
  seo_description:
    'Start your project today! Contact me with this form to kickstart your next success — Freelance React Native Expert',
  image: {
    alt: 'Set Up a Call for In-Depth Questions',
  },
};

export default function ContactPage() {
  return (
    <Page withHeader>
      <GlobalSeo data={SEO_DATA} />
      <ContentContainer>
        <SectionHeading $mt="0">
          <H1>How to Get in Touch</H1>
        </SectionHeading>
        <div className="pb-10">
          <TweetComposer />
        </div>
        <SectionHeading $mt="0">
          <H2 className="mb-6">Set Up a Call for In-Depth Questions</H2>
          <P>
            If you question requires more than 280 characters in response, it’s
            probably pushing into consulting territory. And that’s okay — I’m
            always happy to do coaching and consulting calls — but I do charge
            for my time.
          </P>
          <P className="mb-12">
            To make this easy and charge per-minute. If you want to get into
            details, talk specifics, or even put together a personalized action
            plan for you or your business, request a 30-minute call and we’ll do
            amazing things together.
          </P>
          <Link href="/coaching" passHref legacyBehavior>
            <PrimaryButton size="large" style={{ marginTop: 24 }}>
              Book a coaching session
            </PrimaryButton>
          </Link>
        </SectionHeading>
      </ContentContainer>
    </Page>
  );
}
