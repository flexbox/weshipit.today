import type { Meta } from '@storybook/react';
import { SearchBar } from './search-bar';

const Story: Meta<typeof SearchBar> = {
  component: SearchBar,
  title: 'SearchBar',
};
export default Story;

export const Primary = {
  args: {},
};
