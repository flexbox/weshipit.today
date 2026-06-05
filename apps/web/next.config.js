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
        hostname: '**.mzstatic.com',
        protocol: 'https',
      },
      {
        hostname: 'play-lh.googleusercontent.com',
        protocol: 'https',
      },
    ],
  },
  nx: {},
  async redirects() {
    return [
      {
        source: '/consulting',
        destination: '/services/consulting',
        permanent: true,
      },
      { source: '/audit', destination: '/services/audit', permanent: true },
      {
        source: '/react-native-tools',
        destination: '/resources/react-native-tools',
        permanent: true,
      },
      {
        source: '/react-native-tools/:slug',
        destination: '/resources/react-native-tools/:slug',
        permanent: true,
      },
      {
        source: '/react-native-starters',
        destination: '/resources/react-native-starters',
        permanent: true,
      },
      {
        source: '/react-native-migration',
        destination: '/resources/react-native-migration',
        permanent: true,
      },
      {
        source: '/react-native-glossary',
        destination: '/resources/react-native-glossary',
        permanent: true,
      },
      {
        source: '/react-native-glossary/:uid',
        destination: '/resources/react-native-glossary/:uid',
        permanent: true,
      },
      {
        source: '/react-native-resources',
        destination: '/resources/learn',
        permanent: true,
      },
      {
        source: '/devtools',
        destination: '/resources/dev-tools',
        permanent: true,
      },
      {
        source: '/french-react-native-apps',
        destination: '/resources/french-apps',
        permanent: true,
      },
      { source: '/terms-of-service', destination: '/terms', permanent: true },
    ];
  },
};

module.exports = withNx(nextConfig);
