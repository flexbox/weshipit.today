const rootMain = require('../../../.storybook/main');

module.exports = {
  ...rootMain,

  core: { ...rootMain.core, builder: 'webpack5' },

  stories: [...rootMain.stories, '../src/lib/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    ...rootMain.addons,
    // https://github.com/nrwl/nx/issues/16629
    // eslint-disable-next-line storybook/no-uninstalled-addons
    '@nx/react/plugins/storybook',
  ],
};
