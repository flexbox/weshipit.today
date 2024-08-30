/** @type {import('next-sitemap').IConfig} */

module.exports = {
  generateRobotsTxt: true,
  outDir: 'dist/apps/weshipit/public',
  robotsTxtOptions: {
    policies: [
      {
        allow: ['/', '/api/og/*'],
        userAgent: '*',
      },
    ],
  },
  siteUrl: 'https://weshipit.today/',
  sourceDir: 'dist/apps/weshipit/.next',
};
