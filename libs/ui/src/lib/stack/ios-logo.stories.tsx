import type { Meta, StoryObj } from '@storybook/react';
import IosLogo from './ios-logo';

const meta: Meta<typeof IosLogo> = {
  component: IosLogo,
  title: 'Logo/iOS',
};
export default meta;
type Story = StoryObj<typeof IosLogo>;

export const Primary: Story = {
  args: {},
};
