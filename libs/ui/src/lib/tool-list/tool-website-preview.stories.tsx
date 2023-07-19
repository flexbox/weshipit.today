import type { Meta } from '@storybook/react';
import { ToolWebsitePreview } from './tool-website-preview';

const Story: Meta<typeof ToolWebsitePreview> = {
  component: ToolWebsitePreview,
  title: 'ToolWebsitePreview',
};
export default Story;

export const Primary = {
  args: {
    url: '',
  },
};
