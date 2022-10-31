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
          <Text variant="s2" style="uppercase">
            Some of the wonderful clients who have trusted us
          </Text>
          <ClientsListHomepage clients={clients} />
          <Link href="/clients">View our client list</Link>
        </div>
      </section>
    </>
  );
}

IndexPage.getInitialProps = async function () {
  const clients = await getAllClients();
  return clients;
};
