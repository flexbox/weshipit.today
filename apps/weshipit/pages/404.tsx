import { LinkButton, Text } from '@weshipit/ui';
import { Layout } from '../components/layout';

export default function NotFoundPage() {
  return (
    <Layout
      withHeader
      withContainer
      withFooter
      seoTitle="404 : Page not found"
      seoDescription="We are sorry but the page you are looking for does not exist."
      ogImageTitle="weshipit - 404"
    >
      <div className="m-auto mb-64 w-2/3 py-24">
        <Text variant="h2" as="h1" className="mb-12">
          Oh oh. There is nothing to see here.
        </Text>
        <Text variant="p2" as="p" className="mb-12">
          The page you requested does not exist.
        </Text>
        <LinkButton href="/" size="xl">
          Go back to homepage
        </LinkButton>
      </div>
    </Layout>
  );
}
