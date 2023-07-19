import type { Meta } from '@storybook/react';
import { BuyButton } from './buy-button';

const Story: Meta<typeof BuyButton> = {
  component: BuyButton,
  title: 'BuyButton',
};
export default Story;

export const Primary = {
  args: {},
};
