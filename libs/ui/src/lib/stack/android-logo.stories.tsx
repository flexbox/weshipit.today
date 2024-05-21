import type { Meta, StoryObj } from '@storybook/react';
import AndroidLogo from './android-logo';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof AndroidLogo> = {
  component: AndroidLogo,
  title: 'AndroidLogo',
};
export default meta;
type Story = StoryObj<typeof AndroidLogo>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to AndroidLogo!/gi)).toBeTruthy();
  },
};
