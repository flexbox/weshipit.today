import { Card, Hero, LinkButton, Prose } from '@weshipit/ui';

import { linksApi } from './api/links';
import { Layout } from '../components/layout';
import client from './api/apollo-client';
import { gql } from '@apollo/client';
import { InferGetStaticPropsType } from 'next/types';

type FrenchApp = {
  fields: {
    name: string;
    website_url?: string;
    ios_url?: string;
    android_url?: string;
    category: string;
  };
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query getFrenchAppsRecords {
        getFrenchAppsRecords {
          fields {
            name
            android_url
            ios_url
            category
            website_url
          }
        }
      }
    `,
  });
  const records: FrenchApp[] = data.getFrenchAppsRecords;

  return {
    props: {
      records,
    },
  };
}

export default function FrenchReactNativePage({
  records,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('🚀 ~ records:', records);
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
        <p>
          We are building a list of French iOS and Android apps apps that are
          using React Native in {currentYear}. If you’re working in a French
          company that uses React Native, <a href={''}>add your app</a> to the
          list.
        </p>
        <ul>
          {records.map((record) => (
            <>
              <h3>{record.fields.name}</h3>
              <p>{record.fields.category}</p>

              <div className="flex gap-4">
                <a
                  href={record.fields.website_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Website
                </a>

                <a
                  href={record.fields.ios_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  iOS
                </a>

                <a
                  href={record.fields.android_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Android
                </a>
              </div>
            </>
          ))}
        </ul>
      </Prose>
    </Layout>
  );
}
