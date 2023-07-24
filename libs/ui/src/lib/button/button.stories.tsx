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
  accessoryLeft: (
    <span role="img" aria-label="backhand index pointing right">
      👉
    </span>
  ),
  children: 'Accessory Left',
};

const IntentExamples = () => (
  <div className="grid gap-4">
    <Button as={'a'} href="https://weshipit.today" variant="filled">
      filled
    </Button>
    <Button as={'a'} href="https://weshipit.today" variant="ghost">
      ghost
    </Button>
  </div>
);

export const Intent = IntentExamples.bind({});

const SizeExamples = () => (
  <div className="grid gap-4">
    <Button as={'a'} href="https://weshipit.today" size="sm">
      filled
    </Button>
    <Button as={'a'} href="https://weshipit.today" size="md">
      filled
    </Button>
  </div>
);
export const Size = SizeExamples.bind({});

const TypeExamples = () => (
  <div className="grid gap-4">
    <Button as={'a'} href="https://weshipit.today" size="sm">
      filled
    </Button>
    <Button as={'button'} href="https://weshipit.today" size="md">
      filled
    </Button>
    <Button as={'Link'} href="https://weshipit.today" size="md">
      filled
    </Button>
  </div>
);
export const Type = TypeExamples.bind({});
