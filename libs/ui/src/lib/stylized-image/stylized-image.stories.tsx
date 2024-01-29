import type { Meta, StoryObj } from '@storybook/react';
import { StylizedImage } from './stylized-image';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof StylizedImage> = {
  component: StylizedImage,
  title: 'StylizedImage',
};
export default meta;
type Story = StoryObj<typeof StylizedImage>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to StylizedImage!/gi)).toBeTruthy();
  },
};
