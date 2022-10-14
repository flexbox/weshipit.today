import { Text } from '@weshipit/ui';
import { Layout } from '../components/layout';
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

export default function ClientsPage({ clients }: clientsPageProps) {
  return (
    <Layout withHeader withContainer>
      <div className="py-24">
        <Text variant="h3" style="py-4">
          Clients
        </Text>
        <Text variant="p1">
          Over the years, we have had the good fortune to work on React Native
          development and design projects for clients from a wide range of
          industries and locations. Our clients have come from Paris France,
          London UK, Bruxelles Belgium, Troy Michigan USA, Hamilton Bermuda,
          Berlin Germany, and beyond to seek our expertise.
        </Text>
        <Text variant="p1">
          Here are some of the clients that have chosen to partner with
          weshipit.today.
        </Text>
      </div>
      <div className="flex w-3/4 justify-between">
        {clients.map((client) => (
          <div key={client.id} className="text-center">
            <Text variant="s2">{client.data.name}</Text>
            {client.data.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={client.data.logo.url}
                alt={`${client.data.name} logo client of weshipit.today`}
                className="opacity-80 hover:opacity-100"
              />
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}

ClientsPage.getInitialProps = async function () {
  const clients = await getAllClients();
  return clients;
};
