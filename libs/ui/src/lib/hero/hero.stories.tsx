import { ComponentStory, Meta } from '@storybook/react';
import { Hero } from './hero';

export default {
  component: Hero,
  title: 'Hero',
} as Meta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = (args) => <Hero {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: (
    <h1 className="max-w-[20ch] text-2xl font-bold sm:text-5xl lg:max-w-full">
      The ultimate music app for iOS.
    </h1>
  ),
};
