import type { StoryFn, Meta } from '@storybook/react';
import { Hyperlink } from './hyperlink';

const Story: Meta<typeof Hyperlink> = {
  component: Hyperlink,
  title: 'Hyperlink',
};
export default Story;

const Template: StoryFn<typeof Hyperlink> = (args) => (
  <div className="grid gap-4">
    <Hyperlink href="https://davidl.fr" isExternal={true}>
      View the FAQs
    </Hyperlink>
    <Hyperlink href="https://weshipit.today">View the website</Hyperlink>
    <Hyperlink
      href="https://davidl.fr"
      isExternal={true}
      className="text-red-500 underline underline-offset-4 hover:text-red-700"
    >
      View the FAQs
    </Hyperlink>
    <Hyperlink
      href="https://weshipit.today"
      className="text-red-500 underline underline-offset-4 hover:text-red-700"
    >
      View the website
    </Hyperlink>
  </div>
);

export const Primary = {
  render: Template,
  args: {},
};
