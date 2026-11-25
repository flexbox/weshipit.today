import {
  ArrowRightIcon,
  CalendarDaysIcon,
  CheckIcon,
  CodeBracketIcon,
  CpuChipIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import { Container } from '../container/container';
import { Surface } from '../surface/surface';
import { Text } from '../text/text';
import { withPageBackdrop } from '../utils/story-backdrop';
import { Section } from './section';

const meta: Meta<typeof Section> = {
  argTypes: {
    as: {
      control: 'text',
      description: 'Element to render, `section` by default.',
    },
    spacing: {
      control: 'inline-radio',
      description: '`md` = py-16, `lg` = py-24, `hero` = pt-32 pb-20.',
      options: ['md', 'lg', 'hero'],
      table: { defaultValue: { summary: 'lg' } },
    },
    variant: {
      control: 'inline-radio',
      description: '`divided` draws a hairline on top of the band.',
      options: ['divided', 'plain'],
      table: { defaultValue: { summary: 'divided' } },
    },
  },
  component: Section,
  decorators: [withPageBackdrop],
  parameters: {
    docs: {
      description: {
        component:
          'Vertical band of a landing page. It sets the rhythm (padding, top hairline) and leaves the width to `<Container>`. Every attribute, such as `id` for anchor links, reaches the `<section>`.',
      },
    },
    layout: 'fullscreen',
  },
  title: 'Layout/Section',
};
export default meta;
type Story = StoryObj<typeof Section>;

function SectionHeading({ title, lede }: { title: string; lede: string }) {
  return (
    <div className="mb-12 text-center">
      <Text variant="h2" as="h2" className="mb-4">
        {title}
      </Text>
      <Text
        variant="inherit"
        tone="muted"
        className="mx-auto max-w-2xl text-pretty"
      >
        {lede}
      </Text>
    </div>
  );
}

export const Divided: Story = {
  args: {
    children: (
      <Container size="md">
        <SectionHeading
          title="1 mois, 4 lives"
          lede="Default band: hairline on top, py-24."
        />
      </Container>
    ),
    id: 'programme',
  },
};

export const Plain: Story = {
  args: {
    children: (
      <Container size="md">
        <SectionHeading
          title="Sans séparateur"
          lede='variant="plain" spacing="md", for bands that follow a hero or sit on their own background.'
        />
      </Container>
    ),
    spacing: 'md',
    variant: 'plain',
  },
};

export const Hero: Story = {
  args: {
    children: (
      <Container size="lg" className="text-center">
        <Badge variant="accent" className="mb-6">
          <CalendarDaysIcon className="size-4" />
          Batch en ligne · 8 places
        </Badge>
        <Text variant="h1" as="h1" className="mb-6">
          Agentic Sprint
        </Text>
        <Text
          variant="lead"
          tone="muted"
          className="mx-auto mb-10 max-w-2xl text-pretty"
        >
          variant=&quot;plain&quot; spacing=&quot;hero&quot; leaves room for the
          fixed header above the first band.
        </Text>
        <Button
          size="xl"
          accessoryRight={<ArrowRightIcon className="ml-2 size-4" />}
        >
          Réserver ma place
        </Button>
      </Container>
    ),
    className: 'relative overflow-hidden',
    spacing: 'hero',
    variant: 'plain',
  },
};

const FEATURES = [
  {
    description: 'Un agent qui ouvre de vraies PR sur ton repo.',
    icon: CodeBracketIcon,
    title: 'Agent dans ta CI',
  },
  {
    description: 'Les prompts, règles et skills qu’on utilise tous les jours.',
    icon: CpuChipIcon,
    title: 'Notre outillage',
  },
  {
    description: 'Une PR mergée sur ton app à la fin du mois.',
    icon: RocketLaunchIcon,
    title: 'Livrable concret',
  },
];

export const LandingPage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'How the primitives compose on a landing page: `Section` for the rhythm, `Container` for the width, `Badge` and `Text` for the heading, `Surface` for the boxes.',
      },
    },
  },
  render: () => (
    <>
      <Section
        variant="plain"
        spacing="hero"
        className="relative overflow-hidden"
      >
        <Container size="lg" className="text-center">
          <Badge variant="accent" className="mb-6">
            <CalendarDaysIcon className="size-4" />
            Batch en ligne · 8 places
          </Badge>
          <Text variant="h1" as="h1" className="mb-6">
            Agentic Sprint
          </Text>
          <Text
            variant="lead"
            tone="muted"
            className="mx-auto max-w-2xl text-pretty"
          >
            4 semaines pour faire travailler un agent sur ton app.
          </Text>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            title="Ce qui est inclus"
            lede="Chaque Surface interactive prend une bordure accent au survol."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <Surface key={feature.title} interactive>
                <feature.icon className="mb-3 size-6 text-accent" />
                <Text variant="h6" as="h3" className="mb-2">
                  {feature.title}
                </Text>
                <Text variant="small" tone="muted">
                  {feature.description}
                </Text>
              </Surface>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="prix">
        <Container size="md">
          <Surface radius="2xl" padding="xl" className="text-center">
            <Text variant="h3" as="h2" className="mb-4">
              490 € HT
            </Text>
            <ul className="mx-auto mb-8 grid max-w-sm gap-2 text-left">
              {['4 lives', 'Replays', 'Accès au Discord'].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <Button size="xl">Réserver ma place</Button>
          </Surface>
        </Container>
      </Section>
    </>
  ),
};
