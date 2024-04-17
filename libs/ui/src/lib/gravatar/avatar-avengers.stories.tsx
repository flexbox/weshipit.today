import { StoryFn, Meta } from '@storybook/react';
import { AvatarAvenger } from './avatar-avengers';

export default {
  component: AvatarAvenger,
  title: 'AvatarAvenger',
} as Meta<typeof AvatarAvenger>;

export const List = {
  args: {
    email: 'dleuliette@gmail.com',
    emailhover: 'dleuliette+tony@gmail.com',
    username: '@flexbox',
    githubUrl: 'https://github.com/flexbox',
  },
};
