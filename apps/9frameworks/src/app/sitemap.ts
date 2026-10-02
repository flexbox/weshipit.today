import type { MetadataRoute } from 'next';

import { SITE_URL } from '../lib/site';

// /g is left out on purpose: every shared grid is a query-string variant of
// the same page, so listing them would only feed crawlers duplicate content.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { changeFrequency: 'monthly', priority: 1, url: SITE_URL },
    { changeFrequency: 'monthly', priority: 0.8, url: `${SITE_URL}/create` },
  ];
}
