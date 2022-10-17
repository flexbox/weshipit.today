import { ComponentStory, ComponentMeta } from '@storybook/react';
import { clientsListFixture } from '../clients-list/clients-list.fixture.spec';
import { ClientsListHomepage } from './clients-list-homepage';

export default {
  component: ClientsListHomepage,
  title: 'components/clients',
} as ComponentMeta<typeof ClientsListHomepage>;

const Template: ComponentStory<typeof ClientsListHomepage> = (args) => (
  <ClientsListHomepage {...args} />
);

export const Homepage = Template.bind({});
Homepage.args = {
  clients: clientsListFixture,
};
