import { ClientsListHomepage, Header, Hero } from '@weshipit/ui';
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
      <Hero />x
      <ClientsListHomepage clients={clients} />
    </>
  );
}

IndexPage.getInitialProps = async function () {
  const clients = await getAllClients();
  return clients;
};
