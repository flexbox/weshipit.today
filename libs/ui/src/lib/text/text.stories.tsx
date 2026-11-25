import type { Meta, StoryObj } from '@storybook/react';
import { Surface } from '../surface/surface';
import { withPageBackdrop } from '../utils/story-backdrop';
import { Text } from './text';

const VARIANTS = [
  { as: 'h1', variant: 'h1' },
  { as: 'h2', variant: 'h2' },
  { as: 'h3', variant: 'h3' },
  { as: 'h4', variant: 'h4' },
  { as: 'h5', variant: 'h5' },
  { as: 'h6', variant: 'h6' },
  { as: 'p', variant: 's1' },
  { as: 'p', variant: 's2' },
  { as: 'p', variant: 'lead' },
  { as: 'p', variant: 'p1' },
  { as: 'p', variant: 'p2' },
  { as: 'p', variant: 'c1' },
  { as: 'p', variant: 'c2' },
  { as: 'p', variant: 'small' },
  { as: 'p', variant: 'caption' },
  { as: 'p', variant: 'eyebrow' },
] as const;

const TONES = ['default', 'muted', 'accent', 'primary'] as const;

const meta: Meta<typeof Text> = {
  argTypes: {
    as: { control: 'text', description: 'Element to render, `p` by default.' },
    tone: {
      control: 'inline-radio',
      description:
        'Colour. `default` for body copy, `muted` for secondary copy, `accent` for landing pages, `primary` (brand blue) for agency pages. Defaults to `accent` on `eyebrow`, `default` elsewhere.',
      options: TONES,
    },
    variant: {
      control: 'select',
      description: 'Size and weight. `inherit` keeps the parent font size.',
      options: [...VARIANTS.map(({ variant }) => variant), 'inherit', 'quote'],
      table: { defaultValue: { summary: 'p1' } },
    },
  },
  args: {
    children: 'Ship your React Native app with confidence',
    variant: 'p1',
  },
  component: Text,
  decorators: [withPageBackdrop],
  parameters: {
    docs: {
      description: {
        component:
          '`variant` sets size and weight, `tone` sets colour. Pass `tone` rather than a `text-*` colour class so every page shares one palette. `className` still wins over the variant classes (merged with `cn`).',
      },
    },
  },
  title: 'Text',
};
export default meta;
type Story = StoryObj<typeof Text>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4">
      {VARIANTS.map(({ as, variant }) => (
        <div key={variant} className="grid gap-1 sm:grid-cols-[6rem_1fr]">
          <code className="text-xs text-neutral-500">{variant}</code>
          <Text as={as} variant={variant}>
            Ship your React Native app
          </Text>
        </div>
      ))}
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="grid gap-3">
      {TONES.map((tone) => (
        <div key={tone} className="grid gap-1 sm:grid-cols-[6rem_1fr]">
          <code className="text-xs text-neutral-500">{tone}</code>
          <Text variant="c1" tone={tone}>
            Une PR d’agent mergée sur ton app à la fin du mois.
          </Text>
        </div>
      ))}
    </div>
  ),
};

export const Eyebrow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Short uppercase label above a heading or inside a card. It takes the `accent` tone unless you pass another.',
      },
    },
  },
  render: () => (
    <div className="grid gap-8 sm:grid-cols-2">
      <div>
        <Text variant="eyebrow">Étape 1 · accent</Text>
        <Text as="h3" variant="h4" className="mt-2">
          Diagnostic de ton app
        </Text>
      </div>
      <div>
        <Text variant="eyebrow" tone="primary">
          React Native & Expo · primary
        </Text>
        <Text as="h3" variant="h4" className="mt-2">
          Audit en 2 semaines
        </Text>
      </div>
    </div>
  ),
};

export const SectionHeading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The usual stack: eyebrow, heading, muted lede.',
      },
    },
  },
  render: () => (
    <div className="mx-auto max-w-2xl text-center">
      <Text variant="eyebrow">Programme</Text>
      <Text as="h2" variant="h2" className="mt-3 mb-4">
        1 mois, 4 lives
      </Text>
      <Text variant="lead" tone="muted">
        Une PR d’agent mergée sur ton app, avec notre outillage interne.
      </Text>
    </div>
  ),
};

export const InheritSize: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`variant="inherit"` only sets the tone: handy inside table cells or a parent that already sets the size.',
      },
    },
  },
  render: () => (
    <Surface className="max-w-sm text-sm">
      <Text as="span" variant="inherit">
        Agentic Sprint
      </Text>{' '}
      <Text as="span" variant="inherit" tone="muted">
        · 14 septembre
      </Text>
    </Surface>
  ),
};
