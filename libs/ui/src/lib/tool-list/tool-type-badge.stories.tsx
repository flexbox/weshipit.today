import type { Meta } from '@storybook/react';
import { ToolTypeBadge } from './tool-type-badge';

const Story: Meta<typeof ToolTypeBadge> = {
  component: ToolTypeBadge,
  title: 'ToolTypeBadge',
};
export default Story;

export const Primary = {
  args: {
    type: 'Persistent storage',
    size: 'md',
  },
};
