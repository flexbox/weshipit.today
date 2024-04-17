import type { Meta, StoryObj } from '@storybook/react';
import { ReactNativeLogo } from './react-native-logo';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ReactNativeLogo> = {
  component: ReactNativeLogo,
  title: 'ReactNativeLogo',
};
export default meta;
type Story = StoryObj<typeof ReactNativeLogo>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to ReactNativeLogo!/gi)).toBeTruthy();
  },
};
