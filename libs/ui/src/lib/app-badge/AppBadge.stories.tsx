import type { Meta, StoryObj } from '@storybook/react';
import { AppBadge } from './AppBadge';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof AppBadge> = {
  component: AppBadge,
  title: 'AppBadge',
};
export default meta;
type Story = StoryObj<typeof AppBadge>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to AppBadge!/gi)).toBeTruthy();
  },
};
