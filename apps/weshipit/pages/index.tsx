import { ClientsListHomepage, Header, Hero, Text } from '@weshipit/ui';
import Link from 'next/link';
import { getAllClients } from './api/client';

interface clientProps {
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
  clients: clientProps[];
}

export default function IndexPage({ clients }: clientsPageProps) {
  return (
    <>
      <Header />
      <Hero />
      <section className="m-auto max-w-7xl">
        <div className="my-48 text-center">
          <Text variant="h3" style="py-4">
            Some of the wonderful clients who have trusted us
          </Text>
          <ClientsListHomepage clients={clients} />

          <Link href="/clients">
            <div className="m-auto max-w-md cursor-pointer  rounded-md bg-indigo-600 py-3    font-medium text-white   shadow-md hover:bg-indigo-700 md:px-6 md:text-lg">
              View our client list
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}

IndexPage.getInitialProps = async function () {
  const clients = await getAllClients();
  return clients;
};
