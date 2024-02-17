import React from 'react';
import { Layout } from '../components/layout';
import {
  Text,
  AirtableToggleForm,
  ClientsListHomepage,
  Prose,
} from '@weshipit/ui';
import { linksApi } from '../pages/api/links';
import { getAllClients } from '../pages/api/client';

export default function Onboarding({ clients }) {
  return (
    <Layout
      withContainer
      withFooter
      seoTitle="Onboard with React Native Experts"
      seoDescription="We are excited to work with you! Please fill out the form below to get started."
      withHeader
    >
      <div className="m-auto my-24 flex w-1/2 flex-col gap-12">
        <Text variant="h2" className="text-center">
          Make a difference,
          <br />
          work with us
        </Text>
        <Text variant="p1" className="text-center">
          Let’s discuss your upcoming project.
          <br /> We will respond to your message within 24 hours. ✌️
        </Text>
        <AirtableToggleForm
          formHeight={1960}
          formLink={linksApi.airtable.CONSULTATION_FORM_EMBED}
          buttonText="Start a project"
        />
      </div>
      <div className="mx-auto my-48 flex w-2/3 flex-col">
        <Text
          variant="p1"
          className="m-auto text-center italic text-gray-50 opacity-70"
        >
          Join tens of innovators that have already worked with us
        </Text>
        <ClientsListHomepage clients={clients} />
      </div>
      <div className="m-auto my-24 flex w-1/2 flex-col gap-12">
        <Prose>
          <Text>
            We are a team of{' '}
            <strong>experienced freelance React developers</strong>. We
            specialize in web and mobile app development with the{' '}
            <strong>React Native library</strong>.
          </Text>
          <Text>
            Our <strong>JavaScript development</strong> experience equips us to
            manage any web development project, regardless of size. We strive to
            deliver high-quality, reliable, and affordable solutions as
            freelance React developers.
          </Text>
          <Text>
            Contact us if you need capable JavaScript developers to actualize
            your web development concepts. We’re{' '}
            <strong>ready to discuss your project</strong> and offer a
            customized solution to fit your requirements.
          </Text>
          <Text>
            Fill out the form linked below to{' '}
            <strong>access our calendar</strong> if you want to collaborate. We
            can arrange a call to talk about your project more specifically.
          </Text>
        </Prose>
        <AirtableToggleForm
          formHeight={1960}
          formLink={linksApi.airtable.CONSULTATION_FORM_EMBED}
          buttonText="Schedule an appointment"
        />
      </div>
    </Layout>
  );
}

Onboarding.getInitialProps = async function () {
  const clients = await getAllClients();
  return clients;
};
