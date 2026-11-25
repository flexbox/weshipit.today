import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '../container/container';
import { Section } from './section';

const meta: Meta<typeof Section> = {
  component: Section,
  title: 'Layout/Section',
  argTypes: {
    spacing: { control: 'radio', options: ['md', 'lg', 'hero'] },
    variant: { control: 'radio', options: ['divided', 'plain'] },
  },
};
export default meta;
type Story = StoryObj<typeof Section>;

export const Divided: Story = {
  args: {
    children: (
      <Container size="md">
        <p className="text-center">Section content</p>
      </Container>
    ),
  },
};

export const Plain: Story = {
  args: { ...Divided.args, spacing: 'md', variant: 'plain' },
};
