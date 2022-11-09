import { ComponentStory, ComponentMeta } from '@storybook/react';
import { apiListFixture } from './api-list.fixture';
import ApiCard from './api-card';

export default {
  component: ApiCard,
  title: 'components/react-native-api',
} as ComponentMeta<typeof ApiCard>;

const Template: ComponentStory<typeof ApiCard> = (args) => (
  <ApiCard {...args} />
);

export const Card = Template.bind({});
Card.args = {
  fields: apiListFixture[1].fields,
};
