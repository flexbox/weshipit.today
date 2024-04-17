import { StoryFn, Meta } from '@storybook/react';
import { Header } from './header';

export default {
  component: Header,
  title: 'Header',
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = () => <Header />;

export const Primary = {
  render: Template,
  args: {},
};
