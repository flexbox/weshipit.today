import type { Meta, StoryObj } from '@storybook/react';
import { BookDiscoveryCta } from './book-discovery-cta';

const meta: Meta<typeof BookDiscoveryCta> = {
  component: BookDiscoveryCta,
  title: 'BookDiscoveryCta',
};
export default meta;
type Story = StoryObj<typeof BookDiscoveryCta>;

export const Primary: Story = {
  args: {
    ctaLink: 'https://cal.com/davidl/weshipit-onboarding',
  },
};

export const CustomCopy: Story = {
  args: {
    ctaLink: 'https://cal.com/davidl/weshipit-onboarding',
    title: 'Ready to ship your app?',
    description:
      'Book a free call and get a tailored plan for your React Native project.',
    buttonLabel: 'Schedule a call',
  },
};
