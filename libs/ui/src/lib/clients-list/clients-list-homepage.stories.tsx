import { Meta } from '@storybook/react';
import { clientsListFixture } from './clients-list.fixture';
import { ClientsListHomepage } from './clients-list-homepage';

export default {
  component: ClientsListHomepage,
  title: 'ClientsListHomepage',
} as Meta<typeof ClientsListHomepage>;

export const Homepage = {
  args: {
    clients: clientsListFixture,
  },
};
