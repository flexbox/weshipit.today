import type { Meta } from '@storybook/react';
import { Footer } from './footer';

const Story: Meta<typeof Footer> = {
  component: Footer,
  // The component reads the URL with a `next/navigation` hook.
  parameters: { nextjs: { appDirectory: true } },
  title: 'Footer',
};
export default Story;

export const Primary = {
  args: {},
};
