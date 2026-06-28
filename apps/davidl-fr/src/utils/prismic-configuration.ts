import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';

const PRISMIC_API_ENDPOINT =
  process.env.PRISMIC_API_ENDPOINT ||
  'https://your-repo-name.cdn.prismic.io/api/v2';
const PRISMIC_ACCESS_TOKEN = process.env.PRISMIC_ACCESS_TOKEN;

// Link resolution rules
// Manages links to internal Prismic documents
// Modify as your project grows to handle any new routes you've made
export const linkResolver = (doc: { type: string; uid: any }) => {
  if (doc.type === 'post') {
    return `/blog/${doc.uid}`;
  }
  return '/';
};

// Additional helper function for Next/Link components
export const hrefResolver = (doc: { type: string; uid: any }) => {
  if (doc.type === 'post') {
    return `/post?uid=${doc.uid}`;
  }
  return '/';
};

// Client method to query Prismic
// Connects to the given repository to facilitate data queries

export const createClient = (config = {}) => {
  const client = prismic.createClient(PRISMIC_API_ENDPOINT, {
    accessToken: PRISMIC_ACCESS_TOKEN,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { cache: 'force-cache' }
        : { cache: 'default' },
    ...config,
  });

  prismicNext.enableAutoPreviews({ client });

  return client;
};
