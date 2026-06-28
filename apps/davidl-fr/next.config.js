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
  webpack: (config) => {
    config.resolve.alias['~'] = path.resolve(__dirname, 'src');
    return config;
  },
  nx: {},
};

module.exports = withNx(withMDX(nextConfig));
