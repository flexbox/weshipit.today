import type { Meta } from '@storybook/react';
import { TypeFilter } from './type-filter';

const Story: Meta<typeof TypeFilter> = {
  component: TypeFilter,
  // The component reads the URL with a `next/navigation` hook.
  parameters: { nextjs: { appDirectory: true } },
  title: 'TypeFilter',
};
export default Story;

export const Primary = {
  args: {},
};
