import type { Meta, StoryObj } from '@storybook/react';
import { CardBootcamp } from './card-bootcamp';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof CardBootcamp> = {
  component: CardBootcamp,
  title: 'CardBootcamp',
};
export default meta;
type Story = StoryObj<typeof CardBootcamp>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to CardBootcamp!/gi)).toBeTruthy();
  },
};
