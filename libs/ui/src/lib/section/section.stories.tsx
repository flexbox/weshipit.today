import type { Meta, StoryObj } from '@storybook/react';
import { Section } from './section';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Section> = {
  component: Section,
  title: 'Section',
};
export default meta;
type Story = StoryObj<typeof Section>;

export const Primary = {
  args: {
    variants: '',
  },
};

export const Heading: Story = {
  args: {
    variants: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Section!/gi)).toBeTruthy();
  },
};
