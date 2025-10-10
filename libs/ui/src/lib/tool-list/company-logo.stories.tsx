import type { Meta } from '@storybook/react';
import { CompanyLogo } from './company-logo';

const Story: Meta<typeof CompanyLogo> = {
  component: CompanyLogo,
  title: 'CompanyLogo',
};
export default Story;

export const Primary = {
  args: {
    name: 'Expo',
    websiteUrl: 'https://expo.dev',
  },
};
