import type { Meta, StoryObj } from '@storybook/react';
import { PhoneAnimation } from './phone-animation';

const meta: Meta<typeof PhoneAnimation> = {
  component: PhoneAnimation,
  title: 'PhoneAnimation',
};
export default meta;
type Story = StoryObj<typeof PhoneAnimation>;

export const Primary: Story = {
  args: {},
};
