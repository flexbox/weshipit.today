import rootMain from '../../../.storybook/main.js';

export default {
  ...rootMain,

  addons: [
    ...rootMain.addons,
    // https://github.com/nrwl/nx/issues/16629
    // eslint-disable-next-line storybook/no-uninstalled-addons
    '@nx/react/plugins/storybook',
  ],

  stories: [...rootMain.stories, '../src/lib/**/*.stories.@(js|jsx|ts|tsx)'],
};
