import { ComponentStory, ComponentMeta } from '@storybook/react';
import { clientsListFixture } from './clients-list.fixture';
import { ClientsList } from './clients-list';

export default {
  component: ClientsList,
  title: 'components/clients',
} as ComponentMeta<typeof ClientsList>;

const Template: ComponentStory<typeof ClientsList> = (args) => (
  <ClientsList {...args} />
);

export const List = Template.bind({});
List.args = {
  clients: clientsListFixture,
};
