import type { Meta, StoryObj } from '@storybook/react';
import TypeScriptLogo from './typescript-logo';

const meta: Meta<typeof TypeScriptLogo> = {
  component: TypeScriptLogo,
  title: 'Logo/TypeScript',
};
export default meta;
type Story = StoryObj<typeof TypeScriptLogo>;

export const Primary: Story = {
  args: {},
};
