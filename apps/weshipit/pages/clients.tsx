import { Layout } from '../components/layout';
import { getAllClients } from './api/client';
import { Text } from '@weshipit/ui';
import { ClientsList } from '@weshipit/ui';

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

export default function ClientsPage({ clients }: clientsPageProps) {
  return (
    <Layout withHeader withContainer>
      <div className="py-24">
        <Text variant="h3" style="py-4">
          Clients
        </Text>
        <Text variant="s2" style="mb-4">
          Over the years, we have had the good fortune to work on React Native
          development and design projects for clients from a wide range of
          industries and locations. Our clients have come from Paris France,
          London UK, Bruxelles Belgium, Troy Michigan USA, Hamilton Bermuda,
          Berlin Germany, and beyond to seek our expertise.
        </Text>
        <Text variant="s2">
          Here are some of the clients that have chosen to partner with
          weshipit.today.
        </Text>
      </div>
      <ClientsList clients={clients} />
    </Layout>
  );
}

ClientsPage.getInitialProps = async function () {
  const clients = await getAllClients();
  return clients;
};