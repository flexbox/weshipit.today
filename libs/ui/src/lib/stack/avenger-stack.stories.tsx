import type { Meta, StoryObj } from '@storybook/react';
import { AvengerStack } from './avenger-stack';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof AvengerStack> = {
  component: AvengerStack,
  title: 'AvengerStack',
};
export default meta;
type Story = StoryObj<typeof AvengerStack>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to AvengerStack!/gi)).toBeTruthy();
  },
};
