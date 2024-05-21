import type { Meta, StoryObj } from '@storybook/react';
import TanstackLogo from './tanstack-logo';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof TanstackLogo> = {
  component: TanstackLogo,
  title: 'TanstackLogo',
};
export default meta;
type Story = StoryObj<typeof TanstackLogo>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to TanstackLogo!/gi)).toBeTruthy();
  },
};
