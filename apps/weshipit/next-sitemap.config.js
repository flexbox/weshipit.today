/** @type {import('next-sitemap').IConfig} */

module.exports = {
  generateRobotsTxt: true,
  outDir: 'dist/apps/weshipit/public',
  exclude: ['/qr', '/live', '/welcome', '/brand', '/onboarding', '/home'],
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
  sourceDir: 'dist/apps/weshipit/.next',
};
