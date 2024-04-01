import { Card, Hero, LinkButton, Prose } from '@weshipit/ui';

import { linksApi } from './api/links';
import { Layout } from '../components/layout';

export default function FrenchReactNativePage() {
  const currentYear = new Date().getFullYear();
  const heroTitle = `French companies using React Native in ${currentYear}`;

  return (
    <Layout
      withHeader
      withFooter
      withContainer
      seoTitle="React Native Usage Among French Companies"
      seoDescription="Discover how French companies like BlaBlaCar, Doctolib, Ledger, and Shine are harnessing the power of React Native to create robust mobile applications."
    >
      <Hero title={heroTitle}></Hero>

      <Prose>
        <Card>
          We are building a list of French iOS and Android apps apps that are
          using React Native in {currentYear}. If you’re working in a French
          company that uses React Native,{' '}
          <LinkButton href={linksApi.airtable.RESOURCES_FORM}>
            add your app
          </LinkButton>{' '}
          to the list.
        </Card>
      </Prose>
    </Layout>
  );
}
