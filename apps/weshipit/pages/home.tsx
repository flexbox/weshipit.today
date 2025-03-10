import {
  ClientsListHomepage,
  Hero,
  Text,
  Hyperlink,
  CardHomepage,
  LinkButton,
} from '@weshipit/ui';
import { Customer, getAllClients } from './api/client';
import { Layout } from '../components/layout';

interface ClientsPageProps {
  clients: Customer[];
}

export default function HomePage({ clients }: ClientsPageProps) {
  return (
    <Layout
      withContainer
      withFooter
      seoTitle="React Native Experts"
      seoDescription="At our React Native Development Agency, we specialize in creating high-quality, performant, and scalable mobile applications using the latest technologies and best practices. Our team of experienced developers can help you bring your idea to life and deliver a seamless user experience across all platforms. Contact us today to discuss your project and get a free quote."
      ogImageTitle="React Native Experts"
      callToActionButton={{ name: 'Work with us', href: '/' }}
    >
      <Hero
        title={
          <div className="mt-12">
            A tiny studio, making delightful React Native apps,
            <br />
            brought to you by
            <Hyperlink
              href="https://twitter.com/intent/follow?screen_name=flexbox_"
              className="items-center gap-1.5 rounded-full p-1 font-bold transition hover:bg-gray-50 sm:px-2 md:top-1 dark:hover:bg-white/10"
            >
              @flexbox
            </Hyperlink>
            &
            <Hyperlink
              href="https://twitter.com/intent/follow?screen_name=MatthysDev"
              className="items-center gap-1.5 rounded-full p-1 font-bold transition hover:bg-gray-50 sm:px-2 md:top-1 dark:hover:bg-white/10"
            >
              @MatthysDev
            </Hyperlink>
          </div>
        }
      />
      <CardHomepage />
      <section className="m-auto max-w-7xl">
        <div className="mb-24 text-center ">
          <div className="flex justify-between">
            <Text as="h2" variant="p2">
              Trusted by top companies
            </Text>
            <LinkButton href="/customers" variant="outline" size="lg">
              View our client list
            </LinkButton>
          </div>
          <ClientsListHomepage clients={clients} />
        </div>
      </section>
    </Layout>
  );
}

HomePage.getInitialProps = async function () {
  const clients = await getAllClients();
  return clients;
};
