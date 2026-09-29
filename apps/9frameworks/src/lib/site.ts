export const SITE_NAME = '9frameworks';

const PRODUCTION_URL = 'https://9frameworks.weshipit.today';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL ? PRODUCTION_URL : 'http://localhost:4500');

export const SHARE_TEXT =
  'The 9 frameworks that shaped me as a developer. What are yours?';
