import { ComponentStory, Meta } from '@storybook/react';
import { clientsListFixture } from './clients-list.fixture';
import { ClientsListHomepage } from './clients-list-homepage';

export default {
  component: ClientsListHomepage,
  title: 'ClientsListHomepage',
} as Meta<typeof ClientsListHomepage>;

const Template: ComponentStory<typeof ClientsListHomepage> = (args) => (
  <ClientsListHomepage {...args} />
);

export const Homepage = Template.bind({});
Homepage.args = {
  clients: clientsListFixture,
};
