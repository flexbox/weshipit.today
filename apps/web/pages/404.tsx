import { Layout } from '../components/layout';
import { NotFoundContent } from '../components/not-found-content';

/**
 * Pages Router 404: only rendered when a page in `pages/` answers
 * `notFound: true`. A URL that matches no route at all is handled by
 * `app/global-not-found.tsx`.
 */
export default function NotFoundPage() {
  return (
    <Layout
      withHeader
      withContainer
      withFooter
      seoTitle="404 : Page not found"
      seoDescription="We are sorry but the page you are looking for does not exist."
      ogImageTitle="Page not found"
      ogImageKicker="404"
      noindex
    >
      <NotFoundContent />
    </Layout>
  );
}
