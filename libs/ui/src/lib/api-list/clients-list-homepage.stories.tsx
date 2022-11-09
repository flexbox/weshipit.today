import { ComponentStory, ComponentMeta } from '@storybook/react';
import { apiListFixture } from './api-list.fixture';
import ApiCard from './api-card';

export default {
  component: ApiCard,
  title: 'components/apiCard',
} as ComponentMeta<typeof ApiCard>;

const Template: ComponentStory<typeof ApiCard> = (args) => (
  <ApiCard {...args} />
);

export const Homepage = Template.bind({});
Homepage.args = {
  apis: apiListFixture,
};
