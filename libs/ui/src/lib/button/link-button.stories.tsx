import type { Meta, StoryObj } from '@storybook/react';
import { LinkButton } from './link-button';

const meta: Meta<typeof LinkButton> = {
  component: LinkButton,
  title: 'LinkButton',
};
export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Primary: Story = {
  args: {
    href: '#',
    children: 'Get started',
  },
};

export const External: Story = {
  args: {
    href: 'https://weshipit.today',
    children: 'Visit weshipit.today',
    isExternalLink: true,
    withExternalLinkIcon: true,
    variant: 'outline',
  },
};
