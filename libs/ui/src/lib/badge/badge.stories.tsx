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

const IntentExamples = () => (
  <div className="grid gap-4">
    <Badge intent="lime">Analytics</Badge>
    <Badge intent="indigo">Authentication</Badge>
    <Badge intent="green">Backend</Badge>
    <Badge intent="pink">Crash reporting</Badge>
    <Badge intent="cyan">Persistent storage</Badge>
    <Badge intent="yellow">Infrastructure</Badge>
  </div>
);

export const Intent = IntentExamples.bind({});

const SizeExamples = () => (
  <div className="grid gap-4">
    <Badge size="sm">Infrastructure</Badge>
    <Badge size="md">Infrastructure</Badge>
  </div>
);

export const Size = SizeExamples.bind({});
