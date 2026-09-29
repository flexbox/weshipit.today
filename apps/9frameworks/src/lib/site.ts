export const SITE_NAME = '9frameworks';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4500');

export const SHARE_TEXT =
  'The 9 frameworks that shaped me as a developer. What are yours?';
