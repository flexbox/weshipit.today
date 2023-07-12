import { ComponentStory, ComponentMeta } from '@storybook/react';
import { apiListFixture } from './tool-list.fixture';
import { ToolList } from './tool-list';

export default {
  component: ToolList,
  title: 'components/react-native-api',
} as ComponentMeta<typeof ToolList>;

const Template: ComponentStory<typeof ToolList> = (args) => (
  <ToolList {...args} />
);

export const List = Template.bind({});
List.args = {
  records: apiListFixture,
};
