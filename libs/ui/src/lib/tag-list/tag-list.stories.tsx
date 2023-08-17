import type { Meta } from '@storybook/react';
import { TagList } from './tag-list';

const Story: Meta<typeof TagList> = {
  component: TagList,
  title: 'TagList',
};
export default Story;

export const Primary = {
  args: {
    platforms: ['iOS', 'Android', 'Web', 'MacOS', 'Windows', 'Linux', 'Unity'],
  },
};
