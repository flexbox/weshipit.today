import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from './text';

export default {
  component: Text,
  title: 'Text',
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = () => (
  <div>
    <Text variant="h1" textStyle={'h1'}>
      Title
    </Text>
    <Text variant="h2" textStyle={'h2'}>
      Title
    </Text>
    <Text variant="h3" textStyle={'h3'}>
      Title
    </Text>
    <Text variant="p" textStyle={'s1'}>
      Title
    </Text>
    <Text variant="p" textStyle={'s2'}>
      Title
    </Text>
    <Text variant="p" textStyle={'p1'}>
      Title
    </Text>
    <Text variant="p" textStyle={'p2'}>
      Title
    </Text>
  </div>
);

export const allVariant = Template.bind({});
