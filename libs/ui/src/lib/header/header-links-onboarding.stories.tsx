import type { Meta, StoryObj } from '@storybook/react';
import { HeaderLinksOnboarding } from './header-links-onboarding';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof HeaderLinksOnboarding> = {
  component: HeaderLinksOnboarding,
  title: 'HeaderLinksOnboarding',
};
export default meta;
type Story = StoryObj<typeof HeaderLinksOnboarding>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(/Welcome to HeaderLinksOnboarding!/gi)
    ).toBeTruthy();
  },
};
