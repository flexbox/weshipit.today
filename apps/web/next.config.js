const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  // The OG routes read fonts and logos with fs at runtime; make sure Vercel
  // bundles those files with the functions.
  images: {
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: '**.airtableusercontent.com',
        protocol: 'https',
      },
      {
        hostname: 'ghchart.rshah.org',
        protocol: 'https',
      },
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https',
      },
      {
        hostname: 'img.logo.dev',
        protocol: 'https',
      },
      {
        hostname: 'pbs.twimg.com',
        protocol: 'https',
      },
      {
        hostname: '**.mzstatic.com',
        protocol: 'https',
      },
      {
        hostname: 'play-lh.googleusercontent.com',
        protocol: 'https',
      },
    ],
  },
  async redirects() {
    return [
      // Device apps that moved from the tools directory to /devtools.
      ...['exodus-privacy', 'nrf-connect'].map((slug) => ({
        destination: '/devtools',
        permanent: true,
        source: `/react-native-tools/${slug}`,
      })),
      // Transcripts are now part of the episode page.
      {
        destination: '/podcast/:slug#transcript',
        permanent: true,
        source: '/podcast/:slug/transcript',
      },
    ];
  },
  async headers() {
    return [
      // Raw transcript files back the episode pages; keep the .txt copies
      // out of the index so they don't compete with them.
      {
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
        source: '/podcast-transcripts/:path*',
      },
    ];
  },
  outputFileTracingIncludes: {
    '/api/og': ['./public/fonts/**'],
    '/api/podcast-og': [
      './public/fonts/**',
      './public/images/podcast-logos/og/**',
    ],
  },
};

// Production builds and `next start` use dist/apps/web/.next, the
// outputDirectory in vercel.json. The dev server keeps .next in the app dir.
module.exports = (phase) => ({
  ...nextConfig,
  distDir:
    phase === PHASE_DEVELOPMENT_SERVER ? '.next' : '../../dist/apps/web/.next',
});
