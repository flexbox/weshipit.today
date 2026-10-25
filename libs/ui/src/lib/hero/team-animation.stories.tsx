import type { Meta, StoryObj } from '@storybook/react';
import { TeamAnimation } from './team-animation';

const meta: Meta<typeof TeamAnimation> = {
  component: TeamAnimation,
  title: 'TeamAnimation',
};
export default meta;
type Story = StoryObj<typeof TeamAnimation>;

export const Primary: Story = {
  args: {},
};
