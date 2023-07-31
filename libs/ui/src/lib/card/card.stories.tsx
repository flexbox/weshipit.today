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
    <Card variant="gradient-blue" className="p-12">
      I am a link card.
    </Card>
    <Card variant="gradient-pink" className="p-12">
      I am a link card.
    </Card>
    <Card variant="gradient-purple" className="p-12">
      I am a link card.
    </Card>
  </div>
);
