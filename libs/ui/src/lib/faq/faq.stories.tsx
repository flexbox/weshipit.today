import type { Meta, StoryObj } from '@storybook/react';
import { Faq } from './faq';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Faq> = {
  component: Faq,
  title: 'Faq',
};
export default meta;
type Story = StoryObj<typeof Faq>;

export const Primary = {
  args: {
    faqs: [],
  },
};

export const Heading: Story = {
  args: {
    faqs: [
      {
        id: '1',
        data: {
          question: { text: 'What is the meaning of life?' },
          answer: { text: '42' },
        },
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Faq!/gi)).toBeTruthy();
  },
};
