// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nx/next/plugins/with-nx');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: 'www.vectorlogo.zone', protocol: 'https' },
      { hostname: 'raw.githubusercontent.com', protocol: 'https' },
      { hostname: 'cdn.worldvectorlogo.com', protocol: 'https' },
      { hostname: 'docs.amplify.aws', protocol: 'https' },
      { hostname: 'media.giphy.com', protocol: 'https' },
      { hostname: 'img.youtube.com', protocol: 'https' },
      { hostname: 'ghchart.rshah.org', protocol: 'https' },
    ],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  typescript: {
    // 281 errors, mostly styled-components v6 transient-prop typing under React 19.
    // Remove once the styled-components → Tailwind refactor lands.
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.alias['~'] = path.resolve(__dirname, 'src');
    return config;
  },
  async redirects() {
    const archiveSlugs = [
      'openclassroom-integrateur-web',
      'favicon',
      'takeoff-conf-2013',
      'conseil-dev',
      'reactlive',
      'guide-sublime-text',
      'mesure-pixel',
      'windows-repertoire-git',
      'open-du-web-lille',
      'reactamsterdam',
      'css-evolutif',
      'react-native',
      'fin-psd',
      'fabriks',
      'shell-in-nodejs',
      'atom',
      'afficher-masquer-la-grille-des-pixels-en-zoom-photoshop',
      'svg-helper-ruby',
      'easter-egg-april',
      'template-ruby',
      'sublime-package',
      'site-obese',
      'typography-sass',
      'hebergement-gratuit-ovh',
      'mobile-first-webdesign',
      'truncate',
      'javascript',
      'import-sass',
      'integration-emails',
      'webperf',
      'metier-integrateur-web',
      'certification-google',
      'redaction-briefing',
      '2019',
      'webdesign-adaptatif-5-astuces-indispensables',
      'jamstack',
      'base-design-adaptatif',
      'client-idiot',
    ];

    return [
      {
        source: '/linkedin',
        destination: 'https://www.linkedin.com/in/david-leuliette/',
        permanent: true,
      },
      {
        source: '/twitter',
        destination: 'https://twitter.com/intent/follow?screen_name=flexbox_',
        permanent: true,
      },
      {
        source: '/reactnativechecklist',
        destination: 'https://flexbox.gumroad.com/l/expo-checklist',
        permanent: true,
      },
      {
        source: '/view-source',
        destination: 'https://github.com/flexbox',
        permanent: true,
      },
      ...archiveSlugs.map((slug) => ({
        source: `/blog/${slug}.html`,
        destination: `https://archive.davidl.fr/blog/${slug}.html`,
        permanent: true,
      })),
    ];
  },
  nx: {},
};

module.exports = withNx(withMDX(nextConfig));
