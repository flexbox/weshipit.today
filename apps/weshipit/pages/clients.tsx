/* eslint-disable tailwindcss/classnames-order */
import Layout from '../components/Layout';
import { getClients } from '../../weshipit/pages/api/client';
import { Text } from '@weshipit/ui';

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

interface clientPageProps {
  clients: clientProps[];
}

export default function ClientPage({ clients }: clientPageProps) {
  return (
    <Layout withHeader>
      <div className="m-auto px-24 py-12">
        <Text variant="h3" style="py-4">
          Clients
        </Text>
        <Text variant="p1">
          Over the years, we have had the good fortune to work on React Native
          development and design projects for clients from a wide range of
          industries and locations. Our clients have come from Paris, London,
          Bruxelles, Troy Michigan, Bermuda, Munich, and beyond to seek our
          expertise. Here are some of the clients that have chosen to partner
          with weshipit.today.
        </Text>
      </div>
      <div className=" m-auto flex  justify-between  font-semibold w-3/4">
        {clients.map((client) => (
          <div key={client.id} className="text-center">
            <Text variant="s2">{client.data.name}</Text>
            {client.data.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={client.data.logo.url}
                alt={client.data.name}
                className="opacity-80 hover:opacity-100"
              />
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}

ClientPage.getInitialProps = async function () {
  const clients = await getClients();
  return clients;
};
