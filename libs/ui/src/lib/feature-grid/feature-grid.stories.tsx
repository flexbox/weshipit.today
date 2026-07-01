import type { Meta, StoryObj } from '@storybook/react';
import {
  BoltIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { FeatureGrid } from './feature-grid';

const meta: Meta<typeof FeatureGrid> = {
  component: FeatureGrid,
  title: 'FeatureGrid',
};
export default meta;
type Story = StoryObj<typeof FeatureGrid>;

const items = [
  {
    icon: <BoltIcon />,
    title: 'Fast delivery',
    description: 'Ship production-ready features in days, not months.',
  },
  {
    icon: <ShieldCheckIcon />,
    title: 'Battle-tested',
    description:
      'Senior React Native engineering with 10+ years of experience.',
  },
  {
    icon: <SparklesIcon />,
    title: 'Polished UX',
    description: 'Native-feeling interfaces that users love.',
  },
  {
    icon: <WrenchScrewdriverIcon />,
    title: 'Maintainable',
    description: 'Clean architecture and documentation you can build on.',
  },
];

export const TwoColumns: Story = {
  args: {
    columns: 2,
    items,
  },
};

export const FourColumns: Story = {
  args: {
    columns: 4,
    items,
  },
};
