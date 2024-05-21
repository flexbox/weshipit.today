import type { Meta, StoryObj } from '@storybook/react';
import TypeScriptLogo from './typescript-logo';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof TypeScriptLogo> = {
  component: TypeScriptLogo,
  title: 'TypeScriptLogo',
};
export default meta;
type Story = StoryObj<typeof TypeScriptLogo>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to TypeScriptLogo!/gi)).toBeTruthy();
  },
};
