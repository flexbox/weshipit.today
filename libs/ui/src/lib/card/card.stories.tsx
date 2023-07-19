import type { Meta } from '@storybook/react';
import { Card } from './card';

const Story: Meta<typeof Card> = {
  component: Card,
  title: 'Card',
};
export default Story;

export const Primary = {
  args: {},
};
