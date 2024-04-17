import type { Meta, StoryObj } from '@storybook/react';
import { NotFound } from './not-found';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof NotFound> = {
  component: NotFound,
  title: 'NotFound',
};
export default meta;
type Story = StoryObj<typeof NotFound>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to NotFound!/gi)).toBeTruthy();
  },
};
