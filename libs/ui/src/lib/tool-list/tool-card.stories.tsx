import { StoryFn, Meta } from '@storybook/react';
import { apiListFixture } from './tool-list.fixture';
import { ToolCard } from './tool-card';

export default {
  component: ToolCard,
  title: 'ToolCard',
} as Meta<typeof ToolCard>;

export const Card = {
  args: apiListFixture[1],
};
