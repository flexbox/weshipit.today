import { StoryFn, Meta } from '@storybook/react';
import { apiListFixture } from './tool-list.fixture';
import { ToolList } from './tool-list';

export default {
  component: ToolList,
  title: 'ToolList',
} as Meta<typeof ToolList>;

export const List = {
  args: {
    records: apiListFixture,
  },
};
