import { ComponentStory, Meta } from '@storybook/react';
import { HeroText } from './hero-text';
import React from 'react';
import Button from '../button/button';

export default {
  component: HeroText,
  title: 'HeroText',
} as Meta<typeof HeroText>;

const Template: ComponentStory<typeof HeroText> = (args) => (
  <HeroText {...args} />
);

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
