import { Layout } from '../components/layout';
import { getAllClients } from './api/client';
import { Button, LinkButton, Text, ClientsList } from '@weshipit/ui';
import { linksApi } from './api/links';

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
            variant="primary"
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

      <section className="py-24">
        <Text as="p" variant="p1" className="mb-2">
          is your company missing?
        </Text>
        <LinkButton href="/onboarding" size="xl" variant="secondary">
          Add your logo today
        </LinkButton>
      </section>
    </Layout>
  );
}

ClientsPage.getInitialProps = async function () {
  const clients = await getAllClients();
  return clients;
};
