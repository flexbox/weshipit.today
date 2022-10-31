import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Link } from '@weshipit/ui';

export default {
  component: Link,
  title: 'Link',
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

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

const AllLinkExample = () => (
  <>
    <Link href="google.com">Primary</Link>
    <Link href="google.com" variant="secondary">
      Secondary
    </Link>
  </>
);

export const AllLink = AllLinkExample.bind({});
