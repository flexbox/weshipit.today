/* eslint-disable @next/next/no-img-element */
import {
  AppBadge,
  Card,
  Hero,
  Hyperlink,
  LinkButton,
  Prose,
} from '@weshipit/ui';

import { Layout } from '../components/layout';
import client from './api/apollo-client';
import { gql } from '@apollo/client';
import { InferGetStaticPropsType } from 'next/types';
import Image from 'next/image';

type FrenchApp = {
  fields: {
    name: string;
    website_url?: string;
    ios_url?: string;
    android_url?: string;
    category: string;
    logo: {
      url: string;
    };
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
            logo {
              url
            }
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
          company that uses React Native,{' '}
          <a
            href={
              'https://airtable.com/appLcVC7NmRBu1itw/pagxKprcd7i0tLxML/form'
            }
          >
            add your app
          </a>{' '}
          to the list.
        </p>
      </Prose>
      <ul className="my-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {records.map((record) => (
            <Card key={record.fields.name} size={'md'}>
              <Prose>
                <Image
                  src={record.fields.logo[0].url}
                  width={96}
                  height={96}
                  alt={record.fields.name}
                  className=" rounded-lg"
                />
                <div className="mb-4 flex justify-start gap-4">
                  <AppBadge link={record.fields.website_url as string} />
                  <AppBadge link={record.fields.ios_url as string} iOS />
                  <AppBadge
                    link={record.fields.android_url as string}
                    android
                  />
                  {/* <Hyperlink
                    href={record.fields.website_url as string}
                    isExternal
                    noIcon
                  >
                    Website
                  </Hyperlink>

                  <Hyperlink
                    href={record.fields.ios_url as string}
                    isExternal
                    noIcon
                  >
                    iOS
                  </Hyperlink>

                  <Hyperlink
                    href={record.fields.android_url as string}
                    isExternal
                    noIcon
                  >
                    Android
                  </Hyperlink> */}
                </div>
                <h3 className="mt-0">{record.fields.name}</h3>
                <p>{record.fields.category}</p>
              </Prose>
            </Card>
          ))}
        </div>
      </ul>
    </Layout>
  );
}
