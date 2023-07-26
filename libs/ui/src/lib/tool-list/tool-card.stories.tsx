import { ComponentStory, Meta } from '@storybook/react';
import { apiListFixture } from './tool-list.fixture';
import { ToolCard } from './tool-card';

export default {
  component: ToolCard,
  title: 'ToolCard',
} as Meta<typeof ToolCard>;

const Template: ComponentStory<typeof ToolCard> = (args) => (
  <ToolCard {...args} />
);

export const Card = Template.bind({});
Card.args = {
  fields: apiListFixture[1].fields,
};
