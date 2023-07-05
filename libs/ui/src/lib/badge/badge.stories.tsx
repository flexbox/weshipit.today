import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Badge } from './badge';

const Story: ComponentMeta<typeof Badge> = {
  component: Badge,
  title: 'Badge',
};
export default Story;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary',
};

const VariantExamples = () => (
  <div className="grid gap-4">
    <Badge variant="lime">Analytics</Badge>
    <Badge variant="indigo">Authentication</Badge>
    <Badge variant="green">Backend</Badge>
    <Badge variant="pink">Crash reporting</Badge>
    <Badge variant="cyan">Persistent storage</Badge>
    <Badge variant="yellow">Infrastructure</Badge>
  </div>
);
export const Variant = VariantExamples.bind({});

const SizeExamples = () => (
  <div className="grid gap-4">
    <Badge size="sm">Infrastructure</Badge>
    <Badge size="md">Infrastructure</Badge>
  </div>
);
export const Size = SizeExamples.bind({});
