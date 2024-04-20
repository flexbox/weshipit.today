import type { Meta } from '@storybook/react';
import { Card } from './card';

const Story: Meta<typeof Card> = {
  component: Card,
  title: 'Card',
};
export default Story;

export const Primary = {
  args: {
    children: 'I am a card.',
  },
};

export const Variants = () => (
  <div className="grid gap-4">
    <Card>I am a card.</Card>
    <Card variant="link">I am a link card.</Card>
    <Card variant="gradient-blue">I am a gradient-blue card.</Card>
    <Card variant="gradient-pink">I am a gradient-pink card.</Card>
    <Card variant="gradient-purple">I am a gradient-purple card.</Card>
    <Card variant="gradient-purple-dark">
      I am a gradient-purple-dark card.
    </Card>
    <Card variant="green">I am a green card.</Card>
    <Card variant="red">I am a red card.</Card>
  </div>
);

export const Sizes = () => (
  <div className="grid gap-4">
    <Card variant="gradient-blue" size="xs">
      I am a xs card.
    </Card>
    <Card variant="gradient-blue" size="sm">
      I am a sm card.
    </Card>
    <Card variant="gradient-blue" size="md">
      I am a md card.
    </Card>
    <Card variant="gradient-blue" size="lg">
      I am a lg card.
    </Card>
  </div>
);
