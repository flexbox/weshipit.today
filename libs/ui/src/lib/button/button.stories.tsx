import { StoryFn, Meta } from '@storybook/react';
import { Button } from './button';
import { LinkButton } from './link-button';

export default {
  component: Button,
  title: 'Button',
} as Meta<typeof Button>;

export const Primary = {
  args: {
    children: 'Primary',
  },
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

export const Variants = () => (
  <div className="grid gap-4">
    <Button as="a" href="https://weshipit.today" variant="primary">
      primary
    </Button>
    <Button as="a" href="https://weshipit.today" variant="secondary">
      secondary
    </Button>
    <Button href="https://weshipit.today" variant="primary" disabled={true}>
      primary
    </Button>
    <Button href="https://weshipit.today" variant="secondary" disabled={true}>
      secondary
    </Button>
  </div>
);

export const Sizes = () => (
  <div className="grid gap-4">
    <Button href="/" size="xs">
      size sx
    </Button>
    <Button href="/" size="sm">
      size sm
    </Button>
    <Button href="/" size="md">
      size md
    </Button>
    <Button href="/" size="lg">
      size lg
    </Button>
    <Button href="/" size="xl">
      size xl
    </Button>
    <Button href="/" size="xxl">
      size xxl
    </Button>
    <Button href="/" size="xs" variant="secondary">
      size sx
    </Button>
    <Button href="/" size="sm" variant="secondary">
      size sm
    </Button>
    <Button href="/" size="md" variant="secondary">
      size md
    </Button>
    <Button href="/" size="lg" variant="secondary">
      size lg
    </Button>
    <Button href="/" size="xl" variant="secondary">
      size xl
    </Button>
    <Button href="/" size="xxl" variant="secondary">
      size xxl
    </Button>
  </div>
);

export const As = () => (
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
