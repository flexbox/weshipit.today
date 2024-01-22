import React from 'react';
import { Layout } from '../components/layout';
import { Text, AirtableToggleForm, ClientsListHomepage } from '@weshipit/ui';
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
          Let’s make something <br /> great together
        </Text>
        <Text variant="p1" className="text-center">
          Let’s talk about your next project. We‘ll reply to your message within
          24 hours. ✌️
        </Text>
        <AirtableToggleForm
          formHeight={1480}
          formLink={linksApi.airtable.ONBOARDING_FORM_EMBED}
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
        <Text variant="p1">
          We are a team of{' '}
          <strong>
            highly skilled and experienced freelance React developers
          </strong>
          . Our expertise lies in web and mobile app development using the{' '}
          <strong>React Native library</strong>.
        </Text>
        <Text variant="p1">
          With years of experience in <strong>JavaScript development</strong>,
          we are well-equipped to handle any web development project, regardless
          of its size. As freelance React developers, we are dedicated to
          providing our clients with high-quality, reliable, and cost-effective
          solutions.
        </Text>
        <Text variant="p1">
          If you are looking for skilled JavaScript developers to help bring
          your web development ideas to life, do not hesitate to contact us. We
          are always <strong>available to discuss your project</strong> and
          provide a tailored solution to meet your needs.
        </Text>
        <Text variant="p1">
          If you’re interested in working with us, please fill out the form
          linked below to <strong>gain access to our calendar</strong>. From
          there, we can schedule a call to discuss your project in further
          detail.
        </Text>
      </div>
      <div className="mb-32">
        <AirtableToggleForm
          formHeight={1480}
          formLink={linksApi.airtable.ONBOARDING_FORM_EMBED}
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
