import type { Meta, StoryObj } from '@storybook/react';
import {
  RocketLaunchIcon,
  StarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { StatisticsGrid } from './statistics-grid';

const meta: Meta<typeof StatisticsGrid> = {
  component: StatisticsGrid,
  title: 'StatisticsGrid',
};
export default meta;
type Story = StoryObj<typeof StatisticsGrid>;

export const Primary: Story = {
  args: {
    items: [
      {
        icon: <RocketLaunchIcon />,
        value: 40,
        suffix: '+',
        label: 'Apps shipped',
      },
      {
        icon: <UserGroupIcon />,
        value: 25,
        suffix: '+',
        label: 'Happy clients',
      },
      {
        icon: <StarIcon />,
        value: 10,
        suffix: ' yrs',
        label: 'React Native expertise',
      },
    ],
  },
};
