import type { Meta, StoryObj } from '@storybook/react';
import { Prose } from './prose';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Prose> = {
  component: Prose,
  title: 'Prose',
};
export default meta;
type Story = StoryObj<typeof Prose>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to Prose!/gi)).toBeTruthy();
  },
};
