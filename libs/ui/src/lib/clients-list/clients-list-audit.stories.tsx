import type { Meta, StoryObj } from '@storybook/react';
import { ClientsListAudit } from './clients-list-audit';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ClientsListAudit> = {
  component: ClientsListAudit,
  title: 'ClientsListAudit',
};
export default meta;
type Story = StoryObj<typeof ClientsListAudit>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ClientsListAudit!/gi)).toBeTruthy();
  },
};
