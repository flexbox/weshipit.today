import Avatar from '~/components/Avatar';
import Image from 'next/image';
import React from 'react';
import Page, { ContentContainer } from '~/components/Page';
import { H1, Subheading } from '~/components/Typography';
import GlobalSeo from '~/components/SEO/GlobalSeo';
import BootcampStack from '~/components/Stack/BootcampStack';
import CurriculumLearn from '../components/Content/curriculum-learn.mdx';
import CurriculumInstructor from '../components/Content/curriculum-instructor.mdx';
import CurriculumTeam from '../components/Content/curriculum-team.mdx';
import { ProseContainer } from '~/components/Container/ProseContainer';
import { FaqBootcamp } from '~/components/Faq/FaqBootcamp';
import AirtableToggleForm from '~/components/Airtable/AirtableToggleForm';
import { AIRTABLE_FORM } from '~/utils/airtable-links';
import { Alumnis } from '~/components/Alumnis/Alumnis';

const ScheduleForm = ({ title = 'Schedule' }: { title?: string }) => {
  return (
    <AirtableToggleForm
      formLink={AIRTABLE_FORM.BOOTCAMP_ONBOARDING}
      formHeight={2990}
      buttonText={title}
    />
  );
};

const SEO_DATA = {
  seo_title: 'Coding Bootcamp React Native Remote',
  seo_description:
    'Let’s amplify your magic and create an experience on web and mobile that connects, engages and inspires your dreamiest clients and customers.',
  image: {
    alt: 'Coding Bootcamp React Native Remote',
  },
};

export default function BootcampPage() {
  return (
    <Page withHeader>
      <GlobalSeo
        data={SEO_DATA}
        slug="bootcamp"
        title="Coding Bootcamp React Native Remote"
      />

      <ContentContainer>
        <div className="text-center">
          <span className="uppercase text-gray-400">Grow your skills</span>
          <H1 className="mb-4">React Native Bootcamp</H1>
        </div>

        <Subheading style={{ textAlign: 'center', maxWidth: '100%' }}>
          <p className="text-gray-500">
            Never stop learning by booking a workshop for yourself or your team,
            tailored to the latest technologies around the React Native
            ecosystem.
          </p>
        </Subheading>
      </ContentContainer>
      <ScheduleForm title="Join Bootcamp" />

      <Alumnis />

      <div className="mb-32 text-center">
        <p className="py-8 uppercase text-gray-400">
          Workshop technologies included
        </p>
        <BootcampStack />
      </div>

      <ProseContainer withContentContainer>
        <CurriculumLearn />
      </ProseContainer>

      <ScheduleForm title="Join Bootcamp" />

      <div className="mt-12 flex justify-center py-12">
        <Avatar />
      </div>

      <ProseContainer withContentContainer>
        <CurriculumInstructor />
      </ProseContainer>

      <ScheduleForm title="Learn React Native" />

      <ProseContainer withContentContainer>
        <CurriculumTeam />
      </ProseContainer>

      <ProseContainer withContentContainer>
        <h2 className="mt-24">Life time access to our community</h2>
        <p>
          Joining the bootcamp you will have a life time access to our
          community. If you have questions, I will happy on helping you unlock
          the problems you are facing.
        </p>
        <Image
          src="/images/workshop/question3.png"
          alt="Slack community question"
          width="443"
          height="199"
        />
        <Image
          src="/images/workshop/question2.png"
          alt="Slack community question"
          width="731"
          height="517"
        />
        <Image
          src="/images/workshop/question1.png"
          alt="Slack community question"
          width="1156"
          height="494"
        />
      </ProseContainer>

      <FaqBootcamp />
    </Page>
  );
}
