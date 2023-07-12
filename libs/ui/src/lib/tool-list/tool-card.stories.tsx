import { ComponentStory, ComponentMeta } from '@storybook/react';
import { apiListFixture } from './tool-list.fixture';
import { ToolCard } from './tool-card';

export default {
  component: ToolCard,
  title: 'components/react-native-api',
} as ComponentMeta<typeof ToolCard>;

const Template: ComponentStory<typeof ToolCard> = (args) => (
  <ToolCard {...args} />
);

export const Card = Template.bind({});
Card.args = {
  fields: apiListFixture[1].fields,
};
