import type { Meta, StoryObj } from '@storybook/react';
import { CardConsultation } from './card-consultation';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof CardConsultation> = {
  component: CardConsultation,
  title: 'CardConsultation',
};
export default meta;
type Story = StoryObj<typeof CardConsultation>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to CardConsultation!/gi)).toBeTruthy();
  },
};
