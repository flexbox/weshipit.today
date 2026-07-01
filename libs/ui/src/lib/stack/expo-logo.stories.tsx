import type { Meta, StoryObj } from '@storybook/react';
import ExpoLogo from './expo-logo';

const meta: Meta<typeof ExpoLogo> = {
  component: ExpoLogo,
  title: 'Logo/Expo',
};
export default meta;
type Story = StoryObj<typeof ExpoLogo>;

export const Primary: Story = {
  args: {},
};
