import {
  ChartBarIcon,
  ClockIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../badge/badge';
import { Text } from '../text/text';
import { withPageBackdrop } from '../utils/story-backdrop';
import { Surface } from './surface';

const meta: Meta<typeof Surface> = {
  argTypes: {
    as: {
      control: 'text',
      description: 'Element to render (`div`, `li`, `article`, `a`…).',
    },
    interactive: {
      control: 'boolean',
      description: 'Accent border on hover, for surfaces that link somewhere.',
    },
    padding: {
      control: 'inline-radio',
      description:
        '`none` · `sm` p-5 · `md` p-6 · `lg` p-6 md:p-8 · `xl` p-6 md:p-10',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      table: { defaultValue: { summary: 'md' } },
    },
    tone: {
      control: 'inline-radio',
      description:
        '`default` card · `accent` highlight · `destructive` warning · `muted` recessed box inside another surface',
      options: ['default', 'accent', 'destructive', 'muted'],
      table: { defaultValue: { summary: 'default' } },
    },
    radius: {
      control: 'inline-radio',
      options: ['xl', '2xl'],
      table: { defaultValue: { summary: 'xl' } },
    },
  },
  args: {
    children: (
      <>
        <Text variant="h6" as="h3" className="mb-2">
          Livrable concret
        </Text>
        <Text variant="small" tone="muted">
          Une PR d’agent mergée sur ton app à la fin du mois.
        </Text>
      </>
    ),
  },
  component: Surface,
  decorators: [withPageBackdrop],
  parameters: {
    contentWidth: 'min(28rem, 85vw)',
    docs: {
      description: {
        component:
          'Bordered panel on the theme tokens (`--card`, `--border`, `--accent`): the box landing sections are built from. Use `Card` for the older slate, rounded-3xl look.',
      },
    },
  },
  title: 'Layout/Surface',
};
export default meta;
type Story = StoryObj<typeof Surface>;

export const Default: Story = {};

export const Interactive: Story = {
  args: { interactive: true },
  render: ({ children, ...args }) => (
    <a href="#interactive" className="block">
      <Surface {...args}>{children}</Surface>
    </a>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Hover it: the border turns accent. Wrap it in a link (or `next/link`) when the whole box navigates.',
      },
    },
  },
};

export const Paddings: Story = {
  parameters: {
    contentWidth: 'min(48rem, 85vw)',
  },
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2">
      {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((padding) => (
        <Surface key={padding} padding={padding}>
          <div className="rounded-md bg-accent/10 px-3 py-2 font-mono text-sm text-accent">
            padding=&quot;{padding}&quot;
          </div>
        </Surface>
      ))}
    </div>
  ),
};

export const Tones: Story = {
  parameters: {
    contentWidth: 'min(48rem, 85vw)',
    docs: {
      description: {
        story:
          'Use `tone`, not ad-hoc `border-accent/*` and `bg-accent/*` classes, so every highlighted box on the site matches.',
      },
    },
  },
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2">
      <Surface>
        <Text variant="h6" as="h3" className="mb-1">
          default
        </Text>
        <Text variant="small" tone="muted">
          Cards in a grid.
        </Text>
      </Surface>
      <Surface tone="accent">
        <Text variant="h6" as="h3" className="mb-1">
          accent
        </Text>
        <Text variant="small" tone="muted">
          Garantie, recommandation, chiffre clé.
        </Text>
      </Surface>
      <Surface tone="destructive">
        <Text variant="h6" as="h3" className="mb-1">
          destructive
        </Text>
        <Text variant="small" tone="muted">
          Ce qu’il ne faut pas faire.
        </Text>
      </Surface>
      <Surface>
        <Surface tone="muted" padding="sm">
          <Text variant="small" tone="muted">
            muted, nested inside a default surface.
          </Text>
        </Surface>
      </Surface>
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="grid gap-4">
      <Surface>radius=&quot;xl&quot;, default, for cards in a grid</Surface>
      <Surface radius="2xl" padding="lg">
        radius=&quot;2xl&quot;, for large standalone panels (pricing, final CTA)
      </Surface>
    </div>
  ),
};

const STATS = [
  { icon: ClockIcon, label: 'par semaine', value: '2–3 h' },
  { icon: ChartBarIcon, label: 'lives', value: '4' },
  { icon: ShieldCheckIcon, label: 'satisfait ou remboursé', value: '14 j' },
];

export const FeatureGrid: Story = {
  parameters: {
    contentWidth: 'min(56rem, 85vw)',
    docs: {
      description: {
        story: 'A `ul` of `Surface as="li"`, the common landing-page grid.',
      },
    },
  },
  render: () => (
    <ul className="grid gap-4 sm:grid-cols-3">
      {STATS.map((stat) => (
        <Surface key={stat.label} as="li" padding="sm" className="text-center">
          <stat.icon className="mx-auto mb-3 size-6 text-accent" />
          <div className="text-3xl font-bold text-accent">{stat.value}</div>
          <Text as="div" variant="small" tone="muted">
            {stat.label}
          </Text>
        </Surface>
      ))}
    </ul>
  ),
};

export const WithHeader: Story = {
  args: {
    children: (
      <>
        <div className="border-b border-border px-6 py-4">
          <Badge variant="neutral" size="sm">
            Le plus choisi
          </Badge>
        </div>
        <div className="p-6">
          <Text variant="h5" as="h3" className="mb-1">
            Sprint Solo SaaS
          </Text>
          <Text variant="small" tone="muted">
            `padding=&quot;none&quot;` lets the content split the box into rows.
          </Text>
        </div>
      </>
    ),
    className: 'overflow-hidden',
    padding: 'none',
    radius: '2xl',
  },
};
