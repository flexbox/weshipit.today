import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Header } from './header';

export default {
  component: Header,
  title: 'Header',
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Primary = Template.bind({});
Primary.args = {};
