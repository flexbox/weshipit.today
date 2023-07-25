import { ComponentStory, Meta } from '@storybook/react';
import { Button } from './button';
import { LinkButton } from './link-button';

export default {
  component: Button,
  title: 'Button',
} as Meta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary',
};

export const Accessory = Template.bind({});
Accessory.args = {
  accessoryLeft: (
    <span role="img" aria-label="backhand index pointing right">
      👉
    </span>
  ),
  accessoryRight: (
    <span role="img" aria-label="backhand index pointing left">
      👈
    </span>
  ),
  children: 'Accessory Left',
};

const VariantExamples = () => (
  <div className="grid gap-4">
    <Button as="a" href="https://weshipit.today" variant="filled">
      filled
    </Button>
    <Button as="a" href="https://weshipit.today" variant="ghost">
      ghost
    </Button>
  </div>
);

export const Variant = VariantExamples.bind({});

const SizeExamples = () => (
  <div className="grid gap-4">
    <Button as="a" href="https://weshipit.today" size="sm">
      size sm
    </Button>
    <Button as="a" href="https://weshipit.today" size="md">
      size md
    </Button>
  </div>
);
export const Size = SizeExamples.bind({});

const AsExamples = () => (
  <div className="grid gap-4">
    <Button as="a" href="https://weshipit.today">
      a href
    </Button>
    <Button as="button" href="https://weshipit.today">
      button
    </Button>
    <LinkButton href="https://weshipit.today">Link Button</LinkButton>
    <Button as="a" href="https://davidl.fr/" isExternalLink={true}>
      a href `isExternalLink`
    </Button>
    <Button as="button" href="https://davidl.fr/" isExternalLink={true}>
      filled `isExternalLink`
    </Button>
    <Button
      as="a"
      href="https://davidl.fr/"
      isExternalLink={true}
      variant="ghost"
    >
      a href `isExternalLink`
    </Button>
    <Button
      as="button"
      href="https://davidl.fr/"
      isExternalLink={true}
      variant="ghost"
    >
      filled `isExternalLink`
    </Button>
  </div>
);
export const As = AsExamples.bind({});
