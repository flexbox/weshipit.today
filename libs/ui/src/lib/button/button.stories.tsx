import { Meta } from '@storybook/react';
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
      variant="outline"
    >
      a href `isExternalLink`
    </Button>
  </div>
);

export const Variants = () => (
  <div className="grid gap-4">
    <Button onClick={() => alert('click')} variant="primary">
      primary
    </Button>
    <Button onClick={() => alert('click')} variant="secondary">
      secondary
    </Button>
    <Button onClick={() => alert('click')} variant="outline">
      outline
    </Button>
    <Button onClick={() => alert('click')} variant="ghost">
      ghost
    </Button>
    <Button onClick={() => alert('click')} variant="primary" disabled={true}>
      primary disabled
    </Button>
    <Button onClick={() => alert('click')} variant="secondary" disabled={true}>
      secondary disabled
    </Button>
    <Button onClick={() => alert('click')} variant="outline" disabled={true}>
      outline disabled
    </Button>
    <Button onClick={() => alert('click')} variant="ghost" disabled={true}>
      ghost disabled
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
    <Button href="/" size="xs" variant="outline">
      size sx
    </Button>
    <Button href="/" size="sm" variant="outline">
      size sm
    </Button>
    <Button href="/" size="md" variant="outline">
      size md
    </Button>
    <Button href="/" size="lg" variant="outline">
      size lg
    </Button>
    <Button href="/" size="xl" variant="outline">
      size xl
    </Button>
    <Button href="/" size="xxl" variant="outline">
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
      variant="outline"
    >
      a href `isExternalLink`
    </Button>
    <Button
      as="button"
      href="https://davidl.fr/"
      isExternalLink={true}
      variant="outline"
    >
      primary `isExternalLink`
    </Button>
  </div>
);
