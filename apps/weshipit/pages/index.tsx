import { ClientsListHomepage, Button, Hero, Text } from '@weshipit/ui';
import NextHead from '../components/next-head';
import Link from 'next/link';
import { getAllClients } from './api/client';
import Layout from '../components/layout';
import Gravatar from 'react-gravatar';

const ONBOARDING_FORM = 'https://airtable.com/shryVoJ3nzyeq2P4s';

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
      <NextHead
        ogTitle="React Native Development Agency"
        seoDescription="React Native Development Agency"
        seoTitle="React Native Development Agency"
      />
      <Hero>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
          <span className="block xl:inline">
            Building React Native apps
            <br />
            in <span className=" text-gray-400 line-through">months</span> days.
          </span>
        </h1>
        <p className="mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
          We are software developer, product makers, growth hackers, with a
          focus on engineering community best practices.
        </p>
        <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
          <div className="flex rounded-md">
            <Button variant="primary" style="mr-4" href={ONBOARDING_FORM}>
              Start a project
            </Button>
            <Button
              variant="secondary"
              href={ONBOARDING_FORM}
              accessoryLeft={
                <div className="flex">
                  <Gravatar
                    className="rounded-full border-4 border-white"
                    size={50}
                    email="ducrocq.matthys@gmail.com"
                  />
                  <Gravatar
                    className="-ml-4 mr-4 rounded-full border-4 border-white"
                    size={50}
                    email="dleuliette@gmail.com"
                  />
                </div>
              }
            >
              Book a consultation
            </Button>
          </div>
        </div>
      </Hero>
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
