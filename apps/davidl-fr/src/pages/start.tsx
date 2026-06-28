import React, { ReactElement } from 'react';
import Page, { ContentContainer, SectionHeading } from '~/components/Page';
import { H1, H2, H3, Subheading, TextLight } from '~/components/Typography';
import GlobalSeo from '~/components/SEO/GlobalSeo';
import AvengerStack from '~/components/Stack/AvengerStack';
import LookingFor from './mdx/lookingFor.mdx';
import Hiring from './mdx/hiring.mdx';
import ReduceRisk from './mdx/reduceRisk.mdx';
import Story from './mdx/story.mdx';
import Image from 'next/legacy/image';
import AvatarAvenger from '~/components/AvatarAvenger/AvatarAvenger';
import Companies from '~/components/Companies/Companies';
import { ProseContainer } from '~/components/Container/ProseContainer';
import AirtableToggleForm from '~/components/Airtable/AirtableToggleForm';
import { AIRTABLE_FORM } from '~/utils/airtable-links';

const SEO_DATA = {
  seo_title: 'Hire the top team of React developers.',
  seo_description:
    'Find a freelance React developer available. Hiring a team has never been so easy.',
  image: {
    alt: 'Hiring a React developers team.',
  },
};

interface SectionContainerProps {
  children: ReactElement[];
  className: string;
}

const SectionContainer = ({ children, className }: SectionContainerProps) => {
  return <section className={className}>{children}</section>;
};

interface FormProps {
  buttonText: string;
}

const Form = ({ buttonText }: FormProps) => {
  return (
    <AirtableToggleForm
      formLink={AIRTABLE_FORM.START}
      formHeight={1650}
      buttonText={buttonText}
    />
  );
};

const StartPage = () => {
  return (
    <Page withHeader>
      <GlobalSeo
        data={SEO_DATA}
        slug="start"
        title="Hire the top team of React.js developers."
      />

      <ContentContainer>
        <SectionHeading $mt="0">
          <H1>Hire top React Native developers</H1>
          <Subheading>
            We are software developer, product makers, growth hackers, with a
            focus on engineering community best practices.{' '}
          </Subheading>
          <Subheading>
            We have written code for startups, established companies, and even
            French Institutions.
          </Subheading>
        </SectionHeading>
      </ContentContainer>

      <Companies />
      <Form buttonText="Schedule an appointment" />

      <ProseContainer withContentContainer style="py-12">
        <LookingFor />
      </ProseContainer>

      <SectionContainer className="m-auto  w-full justify-center bg-white py-24 dark:bg-gray-900">
        <ProseContainer withContentContainer style="m-auto">
          <Hiring />
        </ProseContainer>

        <div className="mx-auto flex flex-col justify-between md:mx-8 md:flex-row">
          <div className="m-auto w-3/4 md:w-1/2">
            <H3 className="mb-8 mr-8 pt-8 text-center text-3xl font-bold">
              David contributions
            </H3>
            <Image
              src="https://ghchart.rshah.org/409ba5/flexbox"
              alt="Open source contributions by David Leuliette"
              width={700}
              height={100}
            />
          </div>
          <div className=" m-auto w-3/4 md:w-1/2">
            <H3 className="mb-8 mr-8 pt-8 text-center text-3xl font-bold">
              Matthys contributions
            </H3>
            <Image
              src="https://ghchart.rshah.org/409ba5/matthysdev"
              alt="Open source contributions by David Leuliette"
              width={700}
              height={100}
            />
          </div>
        </div>
      </SectionContainer>

      <ProseContainer withContentContainer style="pt-32">
        <ReduceRisk />
        <Form buttonText="Start a video call" />
      </ProseContainer>

      <ProseContainer withContentContainer style="my-8 pt-24">
        <Story />
      </ProseContainer>

      <SectionContainer className="m-auto w-full bg-white py-24 dark:bg-gray-900">
        <ContentContainer className="m-auto ">
          <H3>Tech stack</H3>
          <p className="mt-12">
            We are a team of React Native developers who trainned 50+ developers
            during bootcamps, more than 50 students have this courses.
          </p>
        </ContentContainer>
        <AvengerStack />
      </SectionContainer>
      <ContentContainer className="mb-8 mt-12">
        <SectionHeading $mt="0" className="text-center">
          <H2 style={{ textAlign: 'center' }}>
            Let’s make something great together
          </H2>
        </SectionHeading>
        <H3 className="mb-8 text-center text-3xl font-bold">
          Your next coworkers
        </H3>
        <div className=" mb-8 flex h-48 w-full flex-row justify-around">
          <AvatarAvenger
            email={'dleuliette@gmail.com'}
            emailhover={'dleuliette+tony@gmail.com'}
            username={'@flexbox'}
            githubUrl={'https://github.com/flexbox'}
          />
          <AvatarAvenger
            email={'ducrocq.matthys@gmail.com'}
            emailhover={'ducrocq.matthys+spiderman@gmail.com'}
            username={'@MatthysDev'}
            githubUrl={'https://github.com/MatthysDev'}
          />
        </div>
        <TextLight>
          Imagine meeting Tony Stark in real life, that’s how David works. He
          always have a nice piece of technology to solve your problem.
        </TextLight>
        <br />
        <br />
        <TextLight>
          Like Spiderman, Matthys can adapt to the situation to find the right
          way to resolve your problem.
        </TextLight>
      </ContentContainer>
      <Subheading style={{ textAlign: 'center', maxWidth: '100%' }}>
        Let’s talk about your next project. We’ll reply to your message within
        24 hours. ✌️
      </Subheading>

      <ContentContainer>
        <Form buttonText="Start a project" />
      </ContentContainer>
    </Page>
  );
};

export default StartPage;
