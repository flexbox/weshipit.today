import type { Meta, StoryObj } from '@storybook/react';
import ReactNativeLogo from './react-native-logo';

const meta: Meta<typeof ReactNativeLogo> = {
  component: ReactNativeLogo,
  title: 'Logo/React Native',
};
export default meta;
type Story = StoryObj<typeof ReactNativeLogo>;

export const Primary: Story = {
  args: {},
};
