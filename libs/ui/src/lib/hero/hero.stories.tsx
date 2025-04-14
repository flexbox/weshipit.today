import { Meta } from '@storybook/react';
import { Hero } from './hero';
import { HeroBanner } from './hero-banner';
import Button from '../button/button';

export default {
  component: Hero,
  title: 'Hero',
} as Meta<typeof Hero>;

export const WithHint = {
  args: {
    children: <Button size="xl">View plans</Button>,
    hintDescription: 'We just released a new version of our app!',
    hintLink: 'https://nx.dev',
    hintTitle: 'Read our changelog',
    title: 'Expert React Native developer on-demand. Anytime, anywhere.',
  },
};

export const WithChildren = {
  args: {
    children: <Button size="xl">View plans</Button>,
    title: 'Expert React Native developer on-demand. Anytime, anywhere.',
  },
};

export const Simple = {
  args: {
    title: 'Expert React Native developer on-demand. Anytime, anywhere.',
  },
};

export const HeroPhone = () => (
  <HeroBanner onboardingHref={'#'} teamSpotsLeft={1} />
);
