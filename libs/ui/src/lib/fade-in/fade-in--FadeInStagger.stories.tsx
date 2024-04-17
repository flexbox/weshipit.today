import type { Meta, StoryObj } from '@storybook/react';
import { FadeInStagger } from './fade-in';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof FadeInStagger> = {
  component: FadeInStagger,
  title: 'FadeInStagger',
};
export default meta;
type Story = StoryObj<typeof FadeInStagger>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to FadeInStagger!/gi)).toBeTruthy();
  },
};
