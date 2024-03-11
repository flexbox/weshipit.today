import { ComponentStory, Meta } from '@storybook/react';
import { Hero } from './hero';
import React from 'react';
import Button from '../button/button';

export default {
  component: Hero,
  title: 'Hero',
} as Meta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = (args) => <Hero {...args} />;

export const WithHint = Template.bind({});
WithHint.args = {
  hintTitle: 'Read our changelog',
  hintDescription: 'We just released a new version of our app!',
  hintLink: 'https://nx.dev',
  title: 'Expert React Native developer on-demand. Anytime, anywhere.',
  children: <Button size="xl">View plans</Button>,
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  title: 'Expert React Native developer on-demand. Anytime, anywhere.',
  children: <Button size="xl">View plans</Button>,
};

export const Simple = Template.bind({});
Simple.args = {
  title: 'Expert React Native developer on-demand. Anytime, anywhere.',
};
