import { Card, Hero, LinkButton, Prose } from '@weshipit/ui';

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
  console.log('🚀 ~ getStaticProps ~ records:', records);

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
      <Prose size={'xl'} className="my-8">
        <p>
          We are building a list of French iOS and Android apps apps that are
          using React Native in {currentYear}. If you’re working in a French
          company that uses React Native, <a href={''}>add your app</a> to the
          list.
        </p>
      </Prose>
      <ul className="my-8">
        <div className="grid grid-cols-3 gap-4">
          {records.map((record) => (
            <Card key={record.fields.name} size={'md'}>
              <Prose>
                <div className="flex gap-4">
                  {/* <img
                src={record.fields.logo[0].url}
                alt={record.fields.name}
                className="size-24 rounded-full object-cover"
              /> */}
                  ici image
                  <div className="m-auto w-2/3">
                    <h3 className="mt-0">{record.fields.name}</h3>
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
                  </div>
                </div>
              </Prose>
            </Card>
          ))}
        </div>
      </ul>
    </Layout>
  );
}
