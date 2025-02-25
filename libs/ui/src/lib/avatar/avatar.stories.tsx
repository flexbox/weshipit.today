import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Avatar',
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {
  args: {
    email: 'user@example.com',
    size: 100,
  },
};

export const WithName: Story = {
  args: {
    email: 'john.doe@example.com',
    name: 'John Doe',
    size: 100,
  },
};

export const Small: Story = {
  args: {
    email: 'user@example.com',
    size: 40,
  },
};
