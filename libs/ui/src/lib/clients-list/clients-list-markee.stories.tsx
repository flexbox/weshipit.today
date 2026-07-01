import type { Meta, StoryObj } from '@storybook/react';
import { clientsListFixture } from './clients-list.fixture';
import { ClientsListMarkee } from './clients-list-markee';

const meta: Meta<typeof ClientsListMarkee> = {
  component: ClientsListMarkee,
  title: 'ClientsListMarkee',
};
export default meta;
type Story = StoryObj<typeof ClientsListMarkee>;

export const Primary: Story = {
  args: {
    clients: clientsListFixture,
  },
};
