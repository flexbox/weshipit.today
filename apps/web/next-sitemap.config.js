/** @type {import('next-sitemap').IConfig} */

module.exports = {
  generateRobotsTxt: true,
  // Write into the app's source public/ dir so the sitemap + robots.txt are
  // committed and collected into the build output that Vercel serves.
  // (The previous value, dist/apps/web/public, is neither served nor committed,
  // so the generated sitemap was silently dropped and /sitemap-0.xml 404'd.)
  outDir: 'apps/web/public',
  exclude: ['/qr', '/brand', '/onboarding', '/home'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/', '/api/og/'],
        disallow: ['/api/'],
      },
      // AI search crawlers, listed explicitly. A bare `*` policy already
      // allows them, but several of these bots only read the rule that names
      // them, so being explicit is what actually guarantees access to the
      // glossary and the rest of the reference content.
      ...[
        'GPTBot', // OpenAI — ChatGPT web search index
        'OAI-SearchBot', // OpenAI — search features
        'ChatGPT-User', // OpenAI — user-initiated browsing
        'ClaudeBot', // Anthropic — Claude web features
        'Claude-User', // Anthropic — user-initiated browsing
        'PerplexityBot', // Perplexity
        'Perplexity-User', // Perplexity — user-initiated browsing
        'Google-Extended', // Google — Gemini / AI Overviews grounding
        'Applebot-Extended', // Apple Intelligence
      ].map((userAgent) => ({
        userAgent,
        allow: ['/'],
        disallow: ['/api/'],
      })),
    ],
    additionalSitemaps: ['https://weshipit.today/sitemap.xml'],
  },
  siteUrl: 'https://weshipit.today/',
  sourceDir: 'dist/apps/web/.next',
};
