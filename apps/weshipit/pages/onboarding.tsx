import React from 'react';
import { linksApi } from './api/links';
import { Layout } from '../components/layout';

export default function Onboarding() {
  return (
    <Layout
      withContainer
      withFooter
      seoTitle="Onboard with React Native Experts"
      seoDescription="We are excited to work with you! Please fill out the form below to get started."
      withHeader
    >
      <iframe
        src={linksApi.airtable.ONBOARDING_FORM_EMBED}
        width="100%"
        height="1480"
        className=" m-12 rounded-md"
        style={{ background: '#ffffff' }}
      />
    </Layout>
  );
}
