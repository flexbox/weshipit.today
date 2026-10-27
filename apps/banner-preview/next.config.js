// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'placehold.co',
        protocol: 'https',
      },
      {
        hostname: 'gravatar.com',
        protocol: 'https',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

// Production builds and `next start` use dist/apps/banner-preview/.next, the
// outputDirectory in vercel.json. The dev server keeps .next in the app dir.
module.exports = (phase) => ({
  ...nextConfig,
  distDir:
    phase === PHASE_DEVELOPMENT_SERVER
      ? '.next'
      : '../../dist/apps/banner-preview/.next',
});
