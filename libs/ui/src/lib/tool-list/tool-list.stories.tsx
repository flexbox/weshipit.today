import { ComponentStory, Meta } from '@storybook/react';
import { apiListFixture } from './tool-list.fixture';
import { ToolList } from './tool-list';

export default {
  component: ToolList,
  title: 'ToolList',
} as Meta<typeof ToolList>;

const Template: ComponentStory<typeof ToolList> = (args) => (
  <ToolList {...args} />
);

export const List = Template.bind({});
List.args = {
  records: apiListFixture,
};
