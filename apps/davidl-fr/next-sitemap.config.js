/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://davidl.fr',
  generateRobotsTxt: true,
  exclude: ['/workshop', '/workshop/*'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/', disallow: '/workshop' }],
  },
  // next-sitemap runs from the workspace root, so its default `.next` source
  // dir doesn't exist — the Nx build writes to dist/apps/davidl-fr/.next.
  sourceDir: 'dist/apps/davidl-fr/.next',
  // Write into the app's source public/ dir so the sitemap + robots.txt are
  // committed and served.
  outDir: 'apps/davidl-fr/public',
};
