import type { StoryFn, Meta } from '@storybook/react';
import { CalendarDaysIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { withPageBackdrop } from '../utils/story-backdrop';
import { Badge } from './badge';

const Story: Meta<typeof Badge> = {
  component: Badge,
  title: 'Badge',
};
export default Story;

export const Primary = {
  args: {
    children: 'Primary',
  },
};

const VariantExamples = () => (
  <div className="grid gap-4">
    <Badge variant="accent">Accent</Badge>
    <Badge variant="neutral">Neutral</Badge>
    <Badge variant="lime">Analytics</Badge>
    <Badge variant="indigo">Authentication</Badge>
    <Badge variant="green">Backend</Badge>
    <Badge variant="pink">Crash reporting</Badge>
    <Badge variant="cyan">Persistent storage</Badge>
    <Badge variant="blue">Infrastructure</Badge>
    <Badge variant="yellow">Payment</Badge>
    <Badge variant="gray-lighter">Misc</Badge>
    <Badge variant="gray-light">Misc</Badge>
    <Badge variant="gray">Misc</Badge>
    <Badge variant="gray-dark">Misc</Badge>
    <Badge variant="gray-darker">Misc</Badge>
  </div>
);

export const Variant = {
  render: VariantExamples,
};

const SizeExamples = () => (
  <div className="grid gap-4">
    <Badge size="sm">Infrastructure</Badge>
    <Badge size="md">Infrastructure</Badge>
  </div>
);

export const Size = {
  render: SizeExamples,
};

/**
 * `accent` and `neutral` follow the theme tokens (`--accent`, `--border`,
 * `--secondary`) like `Surface`. `accent` is the pill above landing-page
 * headings; an icon sits next to the label with the built-in gap.
 */
export const ThemePills = {
  decorators: [withPageBackdrop],
  render: () => (
    <div className="grid justify-items-start gap-4">
      <Badge variant="accent">
        <CalendarDaysIcon className="size-4" />
        Batch en ligne · 14 septembre – 9 octobre 2026
      </Badge>
      <Badge variant="accent" size="sm">
        <SparklesIcon className="size-3.5" />
        Nouveau
      </Badge>
      <Badge variant="neutral">Pourquoi je publie cette page</Badge>
      <Badge variant="neutral" size="sm">
        Le plus choisi
      </Badge>
    </div>
  ),
};
