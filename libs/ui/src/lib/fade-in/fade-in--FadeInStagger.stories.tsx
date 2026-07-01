import type { Meta, StoryObj } from '@storybook/react';
import { FadeIn, FadeInStagger } from './fade-in';

const meta: Meta<typeof FadeInStagger> = {
  component: FadeInStagger,
  title: 'FadeInStagger',
};
export default meta;
type Story = StoryObj<typeof FadeInStagger>;

const items = ['One', 'Two', 'Three', 'Four'];

export const Primary: Story = {
  args: {
    faster: false,
    children: (
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <FadeIn key={item}>
            <div className="rounded-xl bg-slate-100 p-8 text-center dark:bg-slate-800">
              {item}
            </div>
          </FadeIn>
        ))}
      </div>
    ),
  },
};

export const Faster: Story = {
  args: {
    ...Primary.args,
    faster: true,
  },
};
