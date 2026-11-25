import type { Meta, StoryObj } from '@storybook/react';
import { Surface } from './surface';

const meta: Meta<typeof Surface> = {
  component: Surface,
  title: 'Layout/Surface',
  argTypes: {
    interactive: { control: 'boolean' },
    padding: { control: 'radio', options: ['none', 'sm', 'md', 'lg', 'xl'] },
    radius: { control: 'radio', options: ['xl', '2xl'] },
  },
};
export default meta;
type Story = StoryObj<typeof Surface>;

export const Default: Story = {
  args: {
    children: <p>Livrable concret à la fin de chaque semaine.</p>,
  },
};

export const Interactive: Story = {
  args: { ...Default.args, interactive: true },
};

export const Large: Story = {
  args: { ...Default.args, padding: 'xl', radius: '2xl' },
};
