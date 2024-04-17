import type { Meta, StoryObj } from '@storybook/react';
import { LinkButton } from './link-button';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof LinkButton> = {
  component: LinkButton,
  title: 'LinkButton',
};
export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to LinkButton!/gi)).toBeTruthy();
  },
};
