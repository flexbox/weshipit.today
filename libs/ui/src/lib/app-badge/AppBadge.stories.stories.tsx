import type { Meta, StoryObj } from '@storybook/react';
import { allVariants } from './AppBadge.stories';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof allVariants> = {
  component: allVariants,
  title: 'allVariants',
};
export default meta;
type Story = StoryObj<typeof allVariants>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to allVariants!/gi)).toBeTruthy();
  },
};
