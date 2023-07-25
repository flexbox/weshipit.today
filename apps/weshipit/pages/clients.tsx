import Link from 'next/link';
import { Layout } from '../components/layout';
import { getAllClients } from './api/client';
import { Button, Text } from '@weshipit/ui';
import { ClientsList } from '@weshipit/ui';
import { linksApi } from '../pages/api/links';

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

export default function ClientsPage({ clients }: clientsPageProps) {
  return (
    <Layout
      withContainer
      withFooter
      seoTitle="Clients"
      seoDescription="Our clients are at the heart of everything we do. We are proud to have worked with a diverse range of businesses and organizations, helping them achieve their goals with our high-quality React Native development services. Visit our /clients page to see a selection of our satisfied clients and learn more about the projects we have completed for them."
      ogImageTitle="Clients"
      withAccessoryRight={
        <div className="sm:flex sm:justify-center lg:justify-start">
          <Button
            as="a"
            variant="filled"
            href={linksApi.airtable.CONSULTATION_FORM}
            target="_blank"
          >
            Book a consultation
          </Button>
        </div>
      }
    >
      <div className="py-12">
        <Text as="h3" variant="h3" className="py-4">
          Our Customers
        </Text>
        <Text as="p" variant="s2" className="mb-4">
          We help ambitious teams do amazing things. Over the last decades we’ve
          guided more than {clients.length} companies to winning products,
          impactful designs and right answers.
        </Text>
        <Text as="p" variant="p1" className="mb-4">
          Over the years, we have had the good fortune to work on React Native
          development and design projects for clients from a wide range of
          industries and locations. Our clients have come from Paris France,
          London UK, Bruxelles Belgium, Troy Michigan USA, Hamilton Bermuda,
          Berlin Germany, and beyond to seek our expertise.
        </Text>
      </div>
      <ClientsList clients={clients} />
      <div>
        <Text as="p" variant="s2" className="py-4">
          is your company missing?
        </Text>
        <Link
          href="/onboarding"
          className="my-4 flex w-60 justify-center rounded-md bg-indigo-600 py-6 text-white hover:bg-indigo-700"
        >
          Add your logo today
        </Link>
      </div>
    </Layout>
  );
}

ClientsPage.getInitialProps = async function () {
  const clients = await getAllClients();
  return clients;
};
