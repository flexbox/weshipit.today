import { Header, Hero } from '@weshipit/ui';
import { getAllClients } from '../pages/api/client';
import ClientsListHomepage from '../components/clients-list/clients-list-homepage';

export default function IndexPage() {
  return (
    <>
      <Header />
      <Hero />
      {/* <ClientsListHomepage clients={[]} /> */}
    </>
  );
}

ClientsListHomepage.getInitialProps = async function () {
  const clients = await getAllClients();
  return clients;
};
