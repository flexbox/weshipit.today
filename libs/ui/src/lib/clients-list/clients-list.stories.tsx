import { Meta } from '@storybook/react';
import { clientsListFixture } from './clients-list.fixture';
import { ClientsList } from './clients-list';

export default {
  component: ClientsList,
  title: 'ClientsList',
} as Meta<typeof ClientsList>;

export const List = {
  args: {
    clients: clientsListFixture,
  },
};
