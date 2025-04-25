import { Layout } from '../components/layout';
import { Customer, getAllClients } from './api/client';
import { LinkButton, Text, ClientsList, Prose } from '@weshipit/ui';
import { linksApi } from './api/links';

interface CustomersPageProps {
  clients: Customer[];
}

export default function CustomersPage({ clients }: CustomersPageProps) {
  return (
    <Layout
      withContainer
      withFooter
      seoTitle="Customers"
      seoDescription="Our clients are at the heart of everything we do. We are proud to have worked with a diverse range of businesses and organizations, helping them achieve their goals with our high-quality React Native development services. Visit our customer page to see a selection of our satisfied clients and learn more about the projects we have completed for them."
      ogImageTitle="Customers"
      withHeader
      callToActionLink={{
        name: 'Star Us on GitHub',
        href: 'https://github.com/flexbox/weshipit.today',
        isExternalLink: true,
      }}
      callToActionButton={{ name: 'Work with us', href: '/' }}
    >
      <Prose className="py-12" variant="slate">
        <h1>Trusted by ambitious teams worldwide</h1>
        <p>
          We help <strong>ambitious teams do amazing things</strong>. Over the
          last decades we’ve guided more than {clients.length} companies to
          winning products, impactful designs and right answers.
        </p>
        <h2>Global expertise</h2>
        <p>
          Over the years, we have had the good fortune to work on{' '}
          <code>React / React Native development</code> and design projects for
          clients from a wide range of industries and locations. Our clients
          have come from Paris France, London UK, Bruxelles Belgium, Troy
          Michigan USA, Hamilton Bermuda, Berlin Germany, and beyond to seek our
          expertise.
        </p>
      </Prose>

      <ClientsList clients={clients} />

      <section className="py-24">
        <Text as="p" variant="p1" className="mb-2">
          is your company missing?
        </Text>
        <LinkButton href={linksApi.cal.ONBOARDING} size="xl" variant="outline">
          Add your logo today
        </LinkButton>
      </section>
    </Layout>
  );
}

CustomersPage.getInitialProps = async function () {
  const result = await getAllClients();

  result.clients.push({
    id: 'weshipit',
    data: {
      name: 'WeShipIt',
      industry: 'is your company missing?',
      is_visible_homepage: true,
      is_audit: false,
      logo: {
        // url: 'https://cdn.weshipit.today/clients/weshipit.png',
      },
      id: 'weshipit',
    },
  });

  console.log('🚀 ~ result.clients:', result.clients);
  return { clients: result.clients };
};
