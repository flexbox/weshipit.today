import type { Meta, StoryObj } from '@storybook/react';
import { CountUp } from './count-up';

const meta: Meta<typeof CountUp> = {
  component: CountUp,
  title: 'CountUp',
};
export default meta;
type Story = StoryObj<typeof CountUp>;

export const Primary: Story = {
  args: {
    end: 1200,
  },
};

export const WithSuffix: Story = {
  args: {
    end: 98,
    suffix: '%',
  },
};

export const Slow: Story = {
  args: {
    end: 500,
    duration: 5,
    suffix: '+',
  },
};
