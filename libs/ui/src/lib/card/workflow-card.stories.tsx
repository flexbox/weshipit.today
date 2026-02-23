import type { Meta, StoryObj } from '@storybook/react';
import { WorkflowCard } from './workflow-card';

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
};
