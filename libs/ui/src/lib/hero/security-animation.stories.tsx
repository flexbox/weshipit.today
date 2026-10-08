import type { Meta, StoryObj } from '@storybook/react';
import { SecurityAnimation } from './security-animation';

const meta: Meta<typeof SecurityAnimation> = {
  component: SecurityAnimation,
  title: 'SecurityAnimation',
};
export default meta;
type Story = StoryObj<typeof SecurityAnimation>;

export const Primary: Story = {
  args: {},
};
