import type { Meta, StoryObj } from '@storybook/react';
import { Prose } from './prose';

const meta: Meta<typeof Prose> = {
  component: Prose,
  title: 'Prose',
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg', 'xl', '2xl'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Prose>;

export const Primary: Story = {
  args: {
    size: 'base',
    children: (
      <>
        <h1>Shipping React Native, faster</h1>
        <p>
          Prose applies typographic defaults to rich text content such as blog
          posts and documentation. It supports light and dark mode out of the
          box.
        </p>
        <ul>
          <li>Readable line length</li>
          <li>Styled links, lists and headings</li>
        </ul>
        <p>
          Read more on <a href="https://weshipit.today">weshipit.today</a>.
        </p>
      </>
    ),
  },
};
