import type { Meta, StoryObj } from '@storybook/react';
import { withPageBackdrop } from '../utils/story-backdrop';
import { Container } from './container';

const SIZES = [
  { size: 'sm', width: 'max-w-3xl · 768px', use: 'FAQ, prose, forms' },
  { size: 'md', width: 'max-w-4xl · 896px', use: 'Text-heavy sections' },
  { size: 'lg', width: 'max-w-5xl · 1024px', use: 'Hero, programme' },
  { size: 'xl', width: 'max-w-6xl · 1152px', use: 'Grids, final CTA' },
  { size: '2xl', width: 'max-w-7xl · 1280px', use: 'Wide directories' },
] as const;

const meta: Meta<typeof Container> = {
  argTypes: {
    as: {
      control: 'text',
      description: 'Element to render, `div` by default.',
    },
    size: {
      control: 'inline-radio',
      description: 'Max width of the column.',
      options: SIZES.map(({ size }) => size),
      table: { defaultValue: { summary: 'xl' } },
    },
  },
  component: Container,
  decorators: [withPageBackdrop],
  parameters: {
    docs: {
      description: {
        component:
          'Centred column with the site gutter (`px-6`). Put it inside a `<Section>` to set the width of its content. Replaces `<div className="mx-auto max-w-*xl px-6">`.',
      },
    },
    layout: 'fullscreen',
  },
  title: 'Layout/Container',
};
export default meta;
type Story = StoryObj<typeof Container>;

function Ruler({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-dashed border-accent/50 bg-accent/10 px-4 py-3 text-center font-mono text-sm text-accent">
      {label}
    </div>
  );
}

export const Playground: Story = {
  args: {
    children: <Ruler label="Container content" />,
    size: 'xl',
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pick the narrowest size that fits the content: long lines are hard to read.',
      },
    },
  },
  render: () => (
    <div className="grid gap-6">
      {SIZES.map(({ size, use, width }) => (
        <Container key={size} size={size}>
          <div className="mb-1.5 flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
            <span className="font-mono">size=&quot;{size}&quot;</span>
            <span>{use}</span>
          </div>
          <Ruler label={width} />
        </Container>
      ))}
    </div>
  ),
};

export const AsLandmark: Story = {
  args: {
    as: 'main',
    children: <Ruler label="<main> landmark" />,
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use `as` to render a landmark such as `main` or `nav`.',
      },
    },
  },
};
