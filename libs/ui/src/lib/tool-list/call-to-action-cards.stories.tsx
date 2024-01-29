import type { Meta, StoryObj } from '@storybook/react';
import { CallToActionCards } from './call-to-action-cards';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof CallToActionCards> = {
  component: CallToActionCards,
  title: 'CallToActionCards',
};
export default meta;
type Story = StoryObj<typeof CallToActionCards>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to CallToActionCards!/gi)).toBeTruthy();
  },
};
