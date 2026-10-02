import type { GetServerSideProps } from 'next';

import { listPublishedRecords } from '../utils/testimonials/store';

const BASE_URL = 'https://weshipit.today';

/**
 * Testimonial pages are created after the build, so `next-sitemap` (which reads
 * the build output) can never see them. This serves them at request time.
 */
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const records = await listPublishedRecords();

  const urls = records
    .map(
      (record) =>
        `<url><loc>${BASE_URL}/testimonials/${record.slug}</loc><lastmod>${
          record.publishedAt ?? record.createdAt
        }</lastmod></url>`,
    )
    .join('');

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600');
  res.setHeader('Content-Type', 'application/xml');
  res.write(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
  );
  res.end();

  return { props: {} };
};

export default function TestimonialsSitemap() {
  return null;
}
