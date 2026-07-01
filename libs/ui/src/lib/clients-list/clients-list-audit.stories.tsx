import type { Meta, StoryObj } from '@storybook/react';
import { clientsListFixture } from './clients-list.fixture';
import { ClientsListAudit } from './clients-list-audit';

const auditClients = clientsListFixture.map((client) => ({
  ...client,
  data: {
    ...client.data,
    is_audit: true,
    industry: 'SaaS',
  },
}));

const meta: Meta<typeof ClientsListAudit> = {
  component: ClientsListAudit,
  title: 'ClientsListAudit',
};
export default meta;
type Story = StoryObj<typeof ClientsListAudit>;

export const Primary: Story = {
  args: {
    clients: auditClients,
  },
};
