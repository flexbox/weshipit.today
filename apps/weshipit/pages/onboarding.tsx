import React from 'react';
import { linksApi } from './api/links';
import Layout from '../components/layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onboard with React Native Experts',
  description:
    'We are excited to work with you! Please fill out the form below to get started.',
};

export default function Onboarding() {
  return (
    <Layout
      withContainer
      withFooter
      withHeader
      seoTitle={'Onboard with React Native Experts'}
      seoDescription={
        'We are excited to work with you! Please fill out the form below to get started.'
      }
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
