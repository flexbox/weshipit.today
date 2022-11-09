import { ComponentStory, ComponentMeta } from '@storybook/react';
import { apiListFixture } from './api-list.fixture';
import { ApiList } from './api-list';

export default {
  component: ApiList,
  title: 'components/react-native-api',
} as ComponentMeta<typeof ApiList>;

const Template: ComponentStory<typeof ApiList> = (args) => (
  <ApiList {...args} />
);

export const List = Template.bind({});
List.args = {
  apis: apiListFixture,
};
