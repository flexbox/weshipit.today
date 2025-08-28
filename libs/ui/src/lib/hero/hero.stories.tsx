import { Meta, StoryObj } from '@storybook/react';
import { Hero } from './hero';
import Button from '../button/button';

export default {
  component: Hero,
  title: 'Hero/Hero',
} as Meta<typeof Hero>;

type HeroStory = StoryObj<typeof Hero>;

export const WithHint: HeroStory = {
  args: {
    children: <Button size="xl">View plans</Button>,
    hintDescription: 'We just released a new version of our app!',
    hintLink: 'https://nx.dev',
    hintTitle: 'Read our changelog',
    title: 'Expert React Native developer on-demand. Anytime, anywhere.',
  },
};

export const WithChildren: HeroStory = {
  args: {
    children: <Button size="xl">View plans</Button>,
    title: 'Expert React Native developer on-demand. Anytime, anywhere.',
  },
};

export const Simple: HeroStory = {
  args: {
    title: 'Expert React Native developer on-demand. Anytime, anywhere.',
  },
};
