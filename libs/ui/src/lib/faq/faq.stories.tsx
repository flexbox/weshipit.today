import type { Meta, StoryObj } from '@storybook/react';
import { Faq } from './faq';

const meta: Meta<typeof Faq> = {
  component: Faq,
  title: 'Faq',
};
export default meta;
type Story = StoryObj<typeof Faq>;

export const Primary: Story = {
  args: {
    faqs: [
      {
        id: '1',
        question: 'What is weshipit.today?',
        answer:
          'A React Native studio that ships production-ready mobile apps for startups.',
      },
      {
        id: '2',
        question: 'How fast can you start?',
        answer:
          'Most engagements kick off within a week of the discovery call.',
      },
      {
        id: '3',
        question: 'Do you offer ongoing support?',
        answer:
          'Yes — our Essential and Growth plans include continuous development and maintenance.',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    faqs: [],
  },
};
