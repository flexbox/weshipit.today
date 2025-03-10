import type { Meta, StoryObj } from '@storybook/react';
import { WorkflowCard } from './workflow-card';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof WorkflowCard> = {
  component: WorkflowCard,
  title: 'WorkflowCard',
};
export default meta;
type Story = StoryObj<typeof WorkflowCard>;

export const Primary = {
  args: {
    step: 0,
    title: '',
    image: '',
    children: '',
  },
};

export const Heading: Story = {
  args: {
    step: 0,
    title: '',
    image: undefined,
    children: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to WorkflowCard!/gi)).toBeTruthy();
  },
};
