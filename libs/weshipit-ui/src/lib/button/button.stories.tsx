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

export const Secondary = Template.bind({});
Secondary.args = { variant: 'secondary', children: 'Secondary' };

export const AccessoryLeft = Template.bind({});
AccessoryLeft.args = {
  accessoryLeft: <span>👉</span>,
};

const AllButtonExample = () => (
  <>
    <Button>Primary</Button>
    <Button variant="secondary">Secondary</Button>
  </>
);

export const AllButton = AllButtonExample.bind({});
