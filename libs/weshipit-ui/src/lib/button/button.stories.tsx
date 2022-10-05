import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './button';

export default {
  component: Button,
  title: 'Button',
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = { variant: 'secondary' };

const AllButtonExample = () => (
  <>
    <Button>Primary</Button>
    <Button variant="secondary">Secondary</Button>
  </>
);

export const AllButton = AllButtonExample.bind({});
