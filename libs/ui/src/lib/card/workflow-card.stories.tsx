import type { Meta, StoryObj } from '@storybook/react';
import { ImageFieldImage } from '@prismicio/client';
import { WorkflowCard } from './workflow-card';

const image: ImageFieldImage = {
  id: 'placeholder-image',
  url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=429&h=335&fit=crop',
  dimensions: { width: 429, height: 335 },
  edit: { x: 0, y: 0, zoom: 1, background: 'transparent' },
  alt: null,
  copyright: null,
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
