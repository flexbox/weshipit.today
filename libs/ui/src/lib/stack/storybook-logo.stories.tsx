import type { Meta, StoryObj } from '@storybook/react';
import StorybookLogo from './storybook-logo';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof StorybookLogo> = {
  component: StorybookLogo,
  title: 'StorybookLogo',
};
export default meta;
type Story = StoryObj<typeof StorybookLogo>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to StorybookLogo!/gi)).toBeTruthy();
  },
};
