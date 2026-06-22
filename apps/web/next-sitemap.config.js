/** @type {import('next-sitemap').IConfig} */

module.exports = {
  generateRobotsTxt: true,
  outDir: 'dist/apps/web/public',
  exclude: ['/qr', '/brand', '/onboarding', '/home'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/', '/api/og/'],
        disallow: ['/api/'],
      },
    ],
  },
  siteUrl: 'https://weshipit.today/',
  sourceDir: 'dist/apps/web/.next',
};
