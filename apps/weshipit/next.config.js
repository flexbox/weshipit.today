// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nx/next/plugins/with-nx');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
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
        hostname: 'images.prismic.io',
        protocol: 'https',
      },
      {
        hostname: 'pbs.twimg.com',
        protocol: 'https',
      },
      {
        hostname: 'is1-ssl.mzstatic.com',
        protocol: 'https',
      },
      {
        hostname: 'play-lh.googleusercontent.com',
        protocol: 'https',
      },
    ],
  },
  nx: {},
};

module.exports = withNx(nextConfig);
