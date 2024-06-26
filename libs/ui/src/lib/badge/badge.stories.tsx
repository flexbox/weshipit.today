import type { StoryFn, Meta } from '@storybook/react';
import { Badge } from './badge';

const Story: Meta<typeof Badge> = {
  component: Badge,
  title: 'Badge',
};
export default Story;

export const Primary = {
  args: {
    children: 'Primary',
  },
};

const VariantExamples = () => (
  <div className="grid gap-4">
    <Badge variant="lime">Analytics</Badge>
    <Badge variant="indigo">Authentication</Badge>
    <Badge variant="green">Backend</Badge>
    <Badge variant="pink">Crash reporting</Badge>
    <Badge variant="cyan">Persistent storage</Badge>
    <Badge variant="blue">Infrastructure</Badge>
    <Badge variant="yellow">Payment</Badge>
    <Badge variant="gray-lighter">Misc</Badge>
    <Badge variant="gray-light">Misc</Badge>
    <Badge variant="gray">Misc</Badge>
    <Badge variant="gray-dark">Misc</Badge>
    <Badge variant="gray-darker">Misc</Badge>
  </div>
);

export const Variant = {
  render: VariantExamples,
};

const SizeExamples = () => (
  <div className="grid gap-4">
    <Badge size="sm">Infrastructure</Badge>
    <Badge size="md">Infrastructure</Badge>
  </div>
);

export const Size = {
  render: SizeExamples,
};
