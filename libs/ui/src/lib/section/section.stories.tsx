import type { Meta, StoryObj } from '@storybook/react';
import { Section } from './section';

const meta: Meta<typeof Section> = {
  component: Section,
  title: 'Section',
  argTypes: {
    variant: {
      control: 'radio',
      options: ['light', 'transparent'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Section>;

export const Light: Story = {
  args: {
    variant: 'light',
    children: <p className="text-center">Section content</p>,
  },
};

export const Transparent: Story = {
  args: {
    variant: 'transparent',
    children: <p className="text-center">Section content</p>,
  },
};
