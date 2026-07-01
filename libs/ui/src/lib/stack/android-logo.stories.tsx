import type { Meta, StoryObj } from '@storybook/react';
import AndroidLogo from './android-logo';

const meta: Meta<typeof AndroidLogo> = {
  component: AndroidLogo,
  title: 'Logo/Android',
};
export default meta;
type Story = StoryObj<typeof AndroidLogo>;

export const Primary: Story = {
  args: {},
};
