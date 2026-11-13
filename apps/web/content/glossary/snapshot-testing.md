---
title: 'Snapshot Testing'
summary: 'Snapshot testing saves a serialised copy of a rendered React Native component to a file and fails the test whenever later output differs from that stored copy.'
aliases:
  - 'Snapshot'
  - 'toMatchSnapshot'
related:
  - 'Jest'
  - 'Unit Testing'
  - 'React Native Testing Library'
  - 'Storybook'
updated: 2026-11-13
---

Snapshot testing is a [Jest](/react-native-glossary/jest) feature that records the output of a value, typically a rendered component tree, and compares future runs against that recording. The first run writes a `.snap` file into a `__snapshots__` folder; every later run fails if the output changes.

```tsx
import { render } from '@testing-library/react-native';

test('Badge renders', () => {
  const tree = render(<Badge count={3} />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

When a change is intentional, you update the stored snapshot with `jest -u` (or press `u` in watch mode). `toMatchInlineSnapshot()` stores the snapshot inside the test file itself, which keeps small snapshots visible in code review.

The misconception to avoid: a React Native snapshot is **not a screenshot**. It is a text serialisation of the component tree, with element types, props and style objects. It does not run layout, so it cannot tell you whether something overlaps, is cut off or looks right on a small screen. Visual regression needs real screenshots taken on a device or simulator.

The bigger problem in practice is snapshot fatigue. Large snapshots of whole screens change with every small edit, so developers learn to run `jest -u` without reading the diff, and the test stops protecting anything. Signs you are there: snapshots hundreds of lines long, and pull requests where snapshot updates are the noisiest part.

Snapshots work best when they are small and focused: a serialised data transformation, an error message, a single small component with a stable output. For behaviour, an explicit assertion such as "the error text is shown" with [React Native Testing Library](/react-native-glossary/react-native-testing-library) says far more about intent than a 300-line snapshot.
