import { ComponentStory, Meta } from '@storybook/react';
import { AvatarAvenger } from './avatar-avengers';

export default {
  component: AvatarAvenger,
  title: 'AvatarAvenger',
} as Meta<typeof AvatarAvenger>;

const Template: ComponentStory<typeof AvatarAvenger> = (args) => (
  <AvatarAvenger {...args} />
);

export const List = Template.bind({});
List.args = {
  email: 'dleuliette@gmail.com',
  emailhover: 'dleuliette+tony@gmail.com',
  username: '@flexbox',
  githubUrl: 'https://github.com/flexbox',
};
