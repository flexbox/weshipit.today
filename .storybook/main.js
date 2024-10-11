module.exports = {
  stories: [],
  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
  ],

  // uncomment the property below if you want to apply some webpack config globally
  // webpackFinal: async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need that should apply to all storybook configs

  //   // Return the altered config
  //   return config;
  // },
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  docs: {
    autodocs: true,
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
