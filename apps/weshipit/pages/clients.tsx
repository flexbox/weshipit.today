import { getClients } from '../../weshipit/pages/api/client';

interface clientProps {
  id: string;
  data: {
    name: string;
    is_visible_homepage: boolean;
    logo?: object;
    id: string;
  };
}

interface clientPageProps {
  clients: clientProps[];
}

export default function ClientPage({ clients }: clientPageProps) {
  return (
    <div>
      <h1>Client</h1>
      <p>
        Over the years, we have had the good fortune to work on React Native
        development and design projects for clients from a wide range of
        industries and locations. Our clients have come from Paris, London,
        Bruxelles, Troy Michigan, Bermuda, Munich, and beyond to seek our
        expertise. Here are some of the clients that have chosen to partner with
        weshipit.today.
      </p>
      {clients.map((client) => (
        <div key={client.id}>{client.data.name}</div>
      ))}
    </div>
  );
}

ClientPage.getInitialProps = async function () {
  const clients = await getClients();
  return clients;
};
