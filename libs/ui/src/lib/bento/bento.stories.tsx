import type { Meta, StoryObj } from '@storybook/react';
import { Bento } from './bento';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Bento> = {
  component: Bento,
  title: 'Bento',
};
export default meta;
type Story = StoryObj<typeof Bento>;

export const Primary = {
  args: {
    auditLink: '',
    slackLink: '',
    expertLink: '',
    gumroadLink: '',
  },
};

export const Heading: Story = {
  args: {
    auditLink: '',
    slackLink: '',
    expertLink: '',
    gumroadLink: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Bento!/gi)).toBeTruthy();
  },
};
