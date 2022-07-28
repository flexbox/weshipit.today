import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Hero } from './hero';

export default {
  component: Hero,
  title: 'Hero',
} as ComponentMeta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = (args) => <Hero {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
