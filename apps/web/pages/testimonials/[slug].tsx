import { Card, Text } from '@weshipit/ui';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { Layout } from '../../components/layout';
import { getPublishedRecord } from '../../utils/testimonials/store';
import type { TestimonialRecord } from '../../utils/testimonials/types';

const BASE_URL = 'https://weshipit.today';

interface TestimonialPageProps {
  record: TestimonialRecord;
}

export default function TestimonialPage({ record }: TestimonialPageProps) {
  const byline = [record.jobTitle, record.company].filter(Boolean).join(', ');
  const audioUrl = `/api/testimonials/media?slug=${record.slug}&kind=audio`;

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: record.fullName,
    },
    datePublished: record.publishedAt,
    itemReviewed: {
      '@type': 'Organization',
      name: 'weshipit.today',
      url: BASE_URL,
    },
    reviewBody: record.review,
    reviewRating: {
      '@type': 'Rating',
      bestRating: 5,
      ratingValue: 5,
    },
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      </Head>
      <Layout
        ogImageAlt={`${record.fullName} on working with weshipit.today`}
        ogImageTitle={`/api/testimonial-og?quote=${encodeURIComponent(
          record.pullQuote,
        )}&name=${encodeURIComponent(record.fullName)}&company=${encodeURIComponent(
          record.company,
        )}`}
        seoDescription={record.pullQuote || record.review.slice(0, 155)}
        seoTitle={`${record.fullName} on working with us`}
        withContainer
        withFooter
        withHeader
      >
        <article className="mx-auto my-16 max-w-3xl">
          {record.pullQuote ? (
            <Text
              as="h1"
              variant="h1"
              className="text-balance text-slate-900 dark:text-white"
            >
              “{record.pullQuote}”
            </Text>
          ) : null}

          <Card size="lg" className="mt-10">
            <audio className="w-full" controls preload="none" src={audioUrl}>
              <track kind="captions" />
            </audio>

            <div className="mt-8 whitespace-pre-wrap text-pretty text-slate-700 dark:text-slate-300">
              {record.review}
            </div>

            <div className="mt-8 flex items-center gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
              {record.photoPathname ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={record.fullName}
                  className="size-12 rounded-full bg-slate-200 object-cover dark:bg-slate-700"
                  height={48}
                  src={`/api/testimonials/media?slug=${record.slug}&kind=photo`}
                  width={48}
                />
              ) : null}
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {record.fullName}
                </p>
                {byline ? (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {byline}
                  </p>
                ) : null}
              </div>
            </div>
          </Card>
        </article>
      </Layout>
    </>
  );
}

// Published pages are created after the build, so nothing is pre-rendered and
// every slug is resolved on first request, then cached.
export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: 'blocking',
  paths: [],
});

export const getStaticProps: GetStaticProps<TestimonialPageProps> = async ({
  params,
}) => {
  const record = await getPublishedRecord(String(params?.slug ?? ''));

  if (!record) {
    return { notFound: true, revalidate: 60 };
  }

  return { props: { record }, revalidate: 60 };
};
