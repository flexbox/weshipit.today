import {
  ClientsListHomepage,
  Button,
  Hero,
  Text,
  Hyperlink,
} from '@weshipit/ui';
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
    <Layout
      withHeader
      withContainer
      withFooter
      seoTitle="React Native Experts"
      seoDescription="At our React Native Development Agency, we specialize in creating high-quality, performant, and scalable mobile applications using the latest technologies and best practices. Our team of experienced developers can help you bring your idea to life and deliver a seamless user experience across all platforms. Contact us today to discuss your project and get a free quote."
      ogImageTitle="React Native Experts"
    >
      <Hero>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          <span className="block xl:inline">
            A tiny studio,
            <br />
            making delightful React Native apps,
            <br />
            brought to you by
            <Hyperlink
              href="https://twitter.com/intent/follow?screen_name=flexbox_"
              className="relative top-2 mx-0.5 inline-flex items-center gap-1.5 rounded-full p-1 font-bold transition hover:bg-gray-50 dark:hover:bg-white/10 sm:px-2 md:top-1"
            >
              @flexbox
            </Hyperlink>
            &
            <Hyperlink
              href="https://twitter.com/intent/follow?screen_name=MatthysDev"
              className="relative top-2 mx-0.5 inline-flex items-center gap-1.5 rounded-full p-1 font-bold transition hover:bg-gray-50 dark:hover:bg-white/10 sm:px-2 md:top-1"
            >
              @MatthysDev
            </Hyperlink>
          </span>
        </h1>

        <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
          <Button
            intent="ghost"
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
      </Hero>
      <section className="m-auto max-w-7xl">
        <div className="my-48 text-center">
          <Text variant="h3" style="py-4">
            Some of the wonderful clients who have trusted us
          </Text>
          <ClientsListHomepage clients={clients} />
          <Link legacyBehavior href="/clients">
            <a className="text-base font-bold text-blue-500 underline underline-offset-4 hover:text-blue-700">
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
