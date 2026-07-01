import type { Meta, StoryObj } from '@storybook/react';
import TanstackLogo from './tanstack-logo';

const meta: Meta<typeof TanstackLogo> = {
  component: TanstackLogo,
  title: 'Logo/TanStack',
};
export default meta;
type Story = StoryObj<typeof TanstackLogo>;

export const Primary: Story = {
  args: {},
};
