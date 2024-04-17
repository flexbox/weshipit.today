import { StoryFn, Meta } from '@storybook/react';
import { Text } from './text';

export default {
  component: Text,
  title: 'Text',
} as Meta<typeof Text>;

const VariantExamples = () => (
  <div className="grid gap-4">
    <Text as="h1" variant="h1">
      Title h1
    </Text>
    <Text as="h2" variant="h2">
      Title h2
    </Text>
    <Text as="h3" variant="h3">
      Title h3
    </Text>
    <Text as="p" variant="s1">
      Subtitle s1
    </Text>
    <Text as="p" variant="s2">
      Subtitle s2
    </Text>
    <Text as="p" variant="p1">
      Paragraph p1
    </Text>
    <Text as="p" variant="p2">
      Paragraph p2
    </Text>
    <Text as="p" variant="c1">
      Paragraph c1
    </Text>
    <Text as="p" variant="c2">
      Paragraph c2
    </Text>
  </div>
);
export const Variant = {
  render: VariantExamples,
};

const SizeExamples = () => (
  <div className="grid gap-4">
    <Text as="h1" variant="h1">
      Title h1
    </Text>
    <Text as="h1" variant="h2">
      Title h2
    </Text>
    <Text as="h1" variant="h3">
      Title h3
    </Text>
    <Text as="p" variant="h1">
      Paragraph h1
    </Text>
    <Text as="p" variant="h2">
      Paragraph h2
    </Text>
    <Text as="p" variant="h3">
      Paragraph h3
    </Text>
  </div>
);
export const Size = {
  render: SizeExamples,
};
