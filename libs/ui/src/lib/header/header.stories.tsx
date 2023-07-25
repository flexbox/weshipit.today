import { ComponentStory, Meta } from '@storybook/react';
import { Header } from './header';

export default {
  component: Header,
  title: 'Header',
} as Meta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Primary = Template.bind({});
Primary.args = {};
