import type { MetadataRoute } from 'next';

import { SITE_URL } from '../lib/site';

// /api/og stays crawlable: social card scrapers honour robots.txt and need it
// to render share previews.
export default function robots(): MetadataRoute.Robots {
  return {
    host: SITE_URL,
    rules: { allow: '/', userAgent: '*' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
