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

export const Accessory = () => (
  <div className="flex gap-4">
    <Button
      accessoryLeft={
        <span role="img" aria-label="backhand index pointing right">
          👉
        </span>
      }
    >
      accessoryLeft
    </Button>
    <Button
      accessoryRight={
        <span role="img" aria-label="backhand index pointing right">
          👈
        </span>
      }
    >
      accessoryRight
    </Button>
    <Button as="a" href="https://davidl.fr/" isExternalLink={true}>
      a href `isExternalLink`
    </Button>
    <Button
      as="a"
      href="https://davidl.fr/"
      isExternalLink={true}
      variant="secondary"
    >
      a href `isExternalLink`
    </Button>
  </div>
);

export const VariantExamples = () => (
  <div className="grid gap-4">
    <Button as="a" href="https://weshipit.today" variant="primary">
      primary
    </Button>
    <Button as="a" href="https://weshipit.today" variant="secondary">
      secondary
    </Button>
  </div>
);

const SizeExamples = () => (
  <div className="grid gap-4">
    <LinkButton href="/" size="xs">
      size sx
    </LinkButton>
    <LinkButton href="/" size="sm">
      size sm
    </LinkButton>
    <LinkButton href="/" size="md">
      size md
    </LinkButton>
    <LinkButton href="/" size="lg">
      size lg
    </LinkButton>
    <LinkButton href="/" size="xl">
      size xl
    </LinkButton>
    <LinkButton href="/" size="xs" variant="secondary">
      size sx
    </LinkButton>
    <LinkButton href="/" size="sm" variant="secondary">
      size sm
    </LinkButton>
    <LinkButton href="/" size="md" variant="secondary">
      size md
    </LinkButton>
    <LinkButton href="/" size="lg" variant="secondary">
      size lg
    </LinkButton>
    <LinkButton href="/" size="xl" variant="secondary">
      size xl
    </LinkButton>
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
      primary `isExternalLink`
    </Button>
    <Button
      as="a"
      href="https://davidl.fr/"
      isExternalLink={true}
      variant="secondary"
    >
      a href `isExternalLink`
    </Button>
    <Button
      as="button"
      href="https://davidl.fr/"
      isExternalLink={true}
      variant="secondary"
    >
      primary `isExternalLink`
    </Button>
  </div>
);
export const As = AsExamples.bind({});
