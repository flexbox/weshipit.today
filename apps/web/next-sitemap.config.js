/** @type {import('next-sitemap').IConfig} */

module.exports = {
  generateRobotsTxt: true,
  // Write into the app's source public/ dir so the sitemap + robots.txt are
  // committed and collected into the build output that Vercel serves.
  // (The previous value, dist/apps/web/public, is neither served nor committed,
  // so the generated sitemap was silently dropped and /sitemap-0.xml 404'd.)
  outDir: 'apps/web/public',
  exclude: [
    '/qr',
    '/brand',
    '/onboarding',
    '/home',
    // Invite-only and admin surfaces.
    '/testimonial/*',
    '/testimonials/moderation',
    // Published testimonials are ISR pages that don't exist at build time —
    // they are listed by /testimonials-sitemap.xml instead.
    '/testimonials/*',
    '/testimonials-sitemap.xml',
  ],
  robotsTxtOptions: {
    additionalSitemaps: ['https://weshipit.today/testimonials-sitemap.xml'],
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
