/* eslint-disable tailwindcss/classnames-order */
import Layout from '../components/Layout';
import { getClients } from '../../weshipit/pages/api/client';
import Text from '@weshipit/ui';

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
  console.log(
    '🚀 ~ file: clients.tsx ~ line 19 ~ ClientPage ~ clients',
    clients
  );
  return (
    <Layout withHeader>
      <h1 className="text-2xl font-bold text-center">Clients</h1>
      <div className="m-auto px-24 py-12">
        <Text variant="p1">
          Over the years, we have had the good fortune to work on React Native
          development and design projects for clients from a wide range of
          industries and locations. Our clients have come from Paris, London,
          Bruxelles, Troy Michigan, Bermuda, Munich, and beyond to seek our
          expertise. Here are some of the clients that have chosen to partner
          with weshipit.today.
        </Text>
      </div>
      <div className="flex flex-wrap justify-between  font-semibold">
        {clients.map((client) => (
          <div key={client.id} className="text-center">
            <p className="font-semibold text-lg">{client.data.name}</p>
            {client.data.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={client.data.logo.url} alt={client.data.name} />
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
