import type { Meta, StoryObj } from '@storybook/react';
import { AirtableToggleForm } from './airtable-toggle-form';

const meta: Meta<typeof AirtableToggleForm> = {
  component: AirtableToggleForm,
  title: 'AirtableToggleForm',
};
export default meta;
type Story = StoryObj<typeof AirtableToggleForm>;

export const Primary: Story = {
  args: {
    buttonText: 'Add your tool',
    formLink: 'https://airtable.com/embed/shrExampleFormId',
    formHeight: 533,
  },
};
