import type { Meta, StoryObj } from '@storybook/react';
import { CardChecklist } from './card-checklist';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof CardChecklist> = {
  component: CardChecklist,
  title: 'CardChecklist',
};
export default meta;
type Story = StoryObj<typeof CardChecklist>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to CardChecklist!/gi)).toBeTruthy();
  },
};
