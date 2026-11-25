import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './container';

const meta: Meta<typeof Container> = {
  component: Container,
  title: 'Layout/Container',
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg', 'xl', '2xl'] },
  },
};
export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-slate-200 p-4 text-center dark:bg-slate-800">
        max-w-6xl
      </div>
    ),
  },
};

export const Sizes = {
  render: () => (
    <div className="grid gap-4">
      {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Container key={size} size={size}>
          <div className="rounded-lg bg-slate-200 p-4 text-center dark:bg-slate-800">
            {size}
          </div>
        </Container>
      ))}
    </div>
  ),
};
