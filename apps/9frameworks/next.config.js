// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {};

// Production builds and `next start` use dist/apps/9frameworks/.next, the
// outputDirectory in vercel.json. The dev server keeps .next in the app dir.
module.exports = (phase) => ({
  ...nextConfig,
  distDir:
    phase === PHASE_DEVELOPMENT_SERVER
      ? '.next'
      : '../../dist/apps/9frameworks/.next',
});
