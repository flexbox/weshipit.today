import type { Meta, StoryObj } from '@storybook/react';
import ExpoLogo from './expo-logo';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ExpoLogo> = {
  component: ExpoLogo,
  title: 'ExpoLogo',
};
export default meta;
type Story = StoryObj<typeof ExpoLogo>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to ExpoLogo!/gi)).toBeTruthy();
  },
};
