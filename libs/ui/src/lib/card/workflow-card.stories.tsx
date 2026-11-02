import type { Meta, StoryObj } from '@storybook/react';
import { WorkflowCard, WorkflowCardImage } from './workflow-card';

const image: WorkflowCardImage = {
  url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=429&h=335&fit=crop',
  width: 429,
  height: 335,
};

const meta: Meta<typeof WorkflowCard> = {
  component: WorkflowCard,
  title: 'WorkflowCard',
};
export default meta;
type Story = StoryObj<typeof WorkflowCard>;

export const Primary: Story = {
  args: {
    step: 1,
    title: 'Discovery call',
    image,
    children: (
      <p>
        We start with a 30-minute call to understand your product, timeline and
        technical constraints.
      </p>
    ),
  },
};
