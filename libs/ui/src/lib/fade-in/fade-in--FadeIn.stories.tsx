import type { Meta, StoryObj } from '@storybook/react';
import { FadeIn } from './fade-in';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof FadeIn> = {
  component: FadeIn,
  title: 'FadeIn',
};
export default meta;
type Story = StoryObj<typeof FadeIn>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to FadeIn!/gi)).toBeTruthy();
  },
};
