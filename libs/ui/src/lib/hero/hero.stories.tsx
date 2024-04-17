import { StoryFn, Meta } from '@storybook/react';
import { Hero } from './hero';
import React from 'react';
import Button from '../button/button';

export default {
  component: Hero,
  title: 'Hero',
} as Meta<typeof Hero>;

export const WithHint = {
  args: {
    hintTitle: 'Read our changelog',
    hintDescription: 'We just released a new version of our app!',
    hintLink: 'https://nx.dev',
    title: 'Expert React Native developer on-demand. Anytime, anywhere.',
    children: <Button size="xl">View plans</Button>,
  },
};

export const WithChildren = {
  args: {
    title: 'Expert React Native developer on-demand. Anytime, anywhere.',
    children: <Button size="xl">View plans</Button>,
  },
};

export const Simple = {
  args: {
    title: 'Expert React Native developer on-demand. Anytime, anywhere.',
  },
};
