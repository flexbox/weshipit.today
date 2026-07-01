import type { Meta, StoryObj } from '@storybook/react';
import StorybookLogo from './storybook-logo';

const meta: Meta<typeof StorybookLogo> = {
  component: StorybookLogo,
  title: 'Logo/Storybook',
};
export default meta;
type Story = StoryObj<typeof StorybookLogo>;

export const Primary: Story = {
  args: {},
};
