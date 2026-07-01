import type { Meta, StoryObj } from '@storybook/react';
import { FadeIn } from './fade-in';

const meta: Meta<typeof FadeIn> = {
  component: FadeIn,
  title: 'FadeIn',
};
export default meta;
type Story = StoryObj<typeof FadeIn>;

export const Primary: Story = {
  args: {
    children: (
      <div className="rounded-xl bg-slate-100 p-8 text-center dark:bg-slate-800">
        I fade in when scrolled into view.
      </div>
    ),
  },
};
