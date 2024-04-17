import type { Meta, StoryObj } from '@storybook/react';
import { AirtableToggleForm } from './airtable-toggle-form';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof AirtableToggleForm> = {
  component: AirtableToggleForm,
  title: 'AirtableToggleForm',
};
export default meta;
type Story = StoryObj<typeof AirtableToggleForm>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to AirtableToggleForm!/gi)).toBeTruthy();
  },
};
