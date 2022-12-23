import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './button';

export default {
  component: Button,
  title: 'Button',
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary',
};

export const AccessoryLeft = Template.bind({});
AccessoryLeft.args = {
  accessoryLeft: <span>👉</span>,
  children: 'Accessory Left',
};

const IntentExamples = () => (
  <div className="grid gap-4">
    <Button href="https://weshipit.today">primary</Button>
    <Button href="https://weshipit.today" intent="ghost">
      ghost
    </Button>
  </div>
);

export const Intent = IntentExamples.bind({});

const SizeExamples = () => (
  <div className="grid gap-4">
    <Button href="https://weshipit.today" size="sm">
      primary
    </Button>
    <Button href="https://weshipit.today" size="md">
      primary
    </Button>
  </div>
);

export const Size = SizeExamples.bind({});
