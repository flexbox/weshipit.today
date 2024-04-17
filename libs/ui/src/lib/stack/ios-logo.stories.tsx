import type { Meta, StoryObj } from '@storybook/react';
import { IosLogo } from './ios-logo';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof IosLogo> = {
  component: IosLogo,
  title: 'IosLogo',
};
export default meta;
type Story = StoryObj<typeof IosLogo>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to IosLogo!/gi)).toBeTruthy();
  },
};
