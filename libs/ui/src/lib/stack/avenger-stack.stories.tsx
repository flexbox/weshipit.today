import type { Meta, StoryObj } from '@storybook/react';
import { AvengerStack } from './avenger-stack';

const meta: Meta<typeof AvengerStack> = {
  component: AvengerStack,
  title: 'AvengerStack',
};
export default meta;
type Story = StoryObj<typeof AvengerStack>;

export const Primary: Story = {
  args: {},
};
