import type { Meta, StoryObj } from '@storybook/react';
import { NotFound } from './not-found';

const meta: Meta<typeof NotFound> = {
  component: NotFound,
  title: 'NotFound',
};
export default meta;
type Story = StoryObj<typeof NotFound>;

export const Primary: Story = {
  args: {},
};
