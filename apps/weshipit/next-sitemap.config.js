/** @type {import('next-sitemap').IConfig} */

module.exports = {
  sourceDir: 'dist/apps/weshipit/.next',
  outDir: 'dist/apps/weshipit/public',
  siteUrl: 'https://weshipit.today/',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/', '/api/og/*'],
      },
    ],
  },
};
