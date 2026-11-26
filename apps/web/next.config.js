const fs = require('fs');
const path = require('path');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** Slug of the most recent weekly plan, e.g. `2026-W42`. */
function latestPlanSlug() {
  const [latest] = fs
    .readdirSync(path.join(__dirname, 'content/plan'))
    .filter((file) => file.endsWith('.md'))
    .sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }));
  return latest?.replace(/\.md$/, '');
}

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    agentUpgrade: 'security',
    // app/global-not-found.tsx: the 404 page of a site with two root layouts
    // (docs/app-router/plan.md, decision 2).
    globalNotFound: true,
  },
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
    const planSlug = latestPlanSlug();

    return [
      // /plan opens the latest weekly plan. Plans are files in the repo, so
      // the target is known at build time: no function runs per request.
      ...(planSlug
        ? [
            {
              destination: `/plan/${planSlug}`,
              permanent: false,
              source: '/plan',
            },
          ]
        : []),
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
  // PostHog reverse proxy (EU region). A neutral path keeps ad blockers,
  // common in a dev audience, from dropping conversion events.
  async rewrites() {
    return [
      {
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
        source: '/wsi/static/:path*',
      },
      {
        destination: 'https://eu-assets.i.posthog.com/array/:path*',
        source: '/wsi/array/:path*',
      },
      {
        destination: 'https://eu.i.posthog.com/:path*',
        source: '/wsi/:path*',
      },
    ];
  },
  // PostHog API paths end with a trailing slash; don't redirect them.
  skipTrailingSlashRedirect: true,
};

// Production builds and `next start` use dist/apps/web/.next, the
// outputDirectory in vercel.json. The dev server keeps .next in the app dir.
module.exports = (phase) => ({
  ...nextConfig,
  distDir:
    phase === PHASE_DEVELOPMENT_SERVER ? '.next' : '../../dist/apps/web/.next',
});
