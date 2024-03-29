import { ComponentStory, Meta } from '@storybook/react';
import { clientsListFixture } from './clients-list.fixture';
import { ClientsList } from './clients-list';

export default {
  component: ClientsList,
  title: 'ClientsList',
} as Meta<typeof ClientsList>;

const Template: ComponentStory<typeof ClientsList> = (args) => (
  <ClientsList {...args} />
);

export const List = Template.bind({});
List.args = {
  clients: clientsListFixture,
};
