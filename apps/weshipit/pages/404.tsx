import { Text } from '@weshipit/ui';
import Link from 'next/link';
import { Layout } from '../components/layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 : Page not found',
  description: 'We are sorry but the page you are looking for does not exist.',
};

export default function NotFoundPage() {
  return (
    <Layout
      withHeader
      withContainer
      withFooter
      ogImageTitle="weshipit - 404"
      seoTitle={'404 : Page not found'}
      seoDescription={
        'We are sorry but the page you are looking for does not exist.'
      }
    >
      <div className="m-auto w-2/3 py-24 ">
        <Text variant={'h3'} style="mb-12">
          Oh oh. There is nothing to see here.
        </Text>
        <Text variant={'p1'} style="mb-12">
          The page you requested does not exist.
        </Text>
        <Link
          href="/"
          className="rounded-md bg-indigo-600 p-4 text-white hover:bg-indigo-700"
        >
          Go back to homepage
        </Link>
      </div>
    </Layout>
  );
}
