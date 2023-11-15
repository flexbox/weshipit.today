import React from 'react';
import { linksApi } from './api/links';
import { Layout } from '../components/layout';
import { ClientsListHomepage, Text } from '@weshipit/ui';
import AirtableToggleForm from '../components/AirtableToggleForm';
import { getAllClients } from './api/client';

export default function Onboarding({ clients }) {
  return (
    <Layout
      withContainer
      withFooter
      seoTitle="Onboard with React Native Experts"
      seoDescription="We are excited to work with you! Please fill out the form below to get started."
      withHeader
    >
      <div className="m-auto mb-24 flex w-1/2 flex-col items-center">
        <Text as="h1" variant="h2" className="my-12 text-center">
          <div>Let’s make something</div>
          <span>great together!</span>
        </Text>
        <Text as="h3" variant="p2" className="my-12 text-center">
          Let’s talk about your next project. I’ll reply to your message within
          24 hours. ✌️
        </Text>

        <AirtableToggleForm
          formLink={linksApi.airtable.ONBOARDING_FORM_EMBED}
          formHeight={1480}
          buttonText="Start a project"
        />
      </div>
      <Text
        as="h3"
        variant="p2"
        className="my-12 text-center italic opacity-75"
      >
        Join tens of innovators that have already worked with me
      </Text>
      <ClientsListHomepage clients={clients} />
      <div className="m-auto mt-24 flex w-1/2 flex-col items-center">
        <Text as="h3" variant="p2" className=" my-2">
          I am a highly skilled and experienced freelance React developer. My
          expertise lies in web and mobile app development using the React
          Native library.
        </Text>
        <Text as="h3" variant="p2" className="my-2">
          With years of experience in JavaScript development, I am well-equipped
          to handle any web development project, regardless of its size. As a
          freelance React developer, I am dedicated to providing my clients with
          high-quality, reliable, and cost-effective solutions.
        </Text>
        <Text as="h3" variant="p2" className=" my-2">
          {' '}
          If you are looking for a skilled JavaScript developer to help bring
          your web development ideas to life, do not hesitate to contact me. I
          am always available to discuss your project and provide a tailored
          solution to meet your needs.
        </Text>
        <Text as="h3" variant="p2" className=" my-2 mb-24">
          If you’re interested in working with me, please fill out the form
          linked below to gain access to my calendar. From there, we can
          schedule a call to discuss your project in further detail.
        </Text>
        <AirtableToggleForm
          formLink={linksApi.airtable.ONBOARDING_FORM_EMBED}
          formHeight={1480}
          buttonText="Schedule a video call"
        />
      </div>
    </Layout>
  );
}

Onboarding.getInitialProps = async function () {
  const clients = await getAllClients();
  return clients;
};
