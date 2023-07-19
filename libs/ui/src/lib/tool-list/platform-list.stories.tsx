import type { Meta } from '@storybook/react';
import { PlatformList } from './platform-list';

const Story: Meta<typeof PlatformList> = {
  component: PlatformList,
  title: 'PlatformList',
};
export default Story;

export const Primary = {
  args: {},
};
