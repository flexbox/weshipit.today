import { ClientsListHomepage, Header, Hero, Text } from '@weshipit/ui';
import NextHead from '../components/next-head';
import Link from 'next/link';
import { getAllClients } from './api/client';
import Layout from '../components/layout';
import GlobalSeo from '../components/global-seo';

interface ClientProps {
  id: string;
  data: {
    name: string;
    is_visible_homepage: boolean;
    logo: {
      url: string;
    };
    id: string;
  };
}

interface clientsPageProps {
  clients: ClientProps[];
}

export default function IndexPage({ clients }: clientsPageProps) {
  return (
    <Layout withHeader withContainer withFooter ogTitle="weshipit">
      <GlobalSeo
        data={{
          seo_description: 'React Native Development Agency',
          seo_title: 'React Native Development Agency - weshiptit.today',
        }}
      />
      <NextHead ogTitle="React Native Development Agency - weshipit" />
      <Hero />
      <section className="m-auto max-w-7xl">
        <div className="my-48 text-center">
          <Text variant="h3" style="py-4">
            Some of the wonderful clients who have trusted us
          </Text>
          <ClientsListHomepage clients={clients} />
          <Link legacyBehavior href="/clients">
            <a className="text-sm font-semibold text-blue-500 underline underline-offset-4 hover:text-blue-700">
              View our client list
            </a>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

IndexPage.getInitialProps = async function () {
  const clients = await getAllClients();
  return clients;
};
