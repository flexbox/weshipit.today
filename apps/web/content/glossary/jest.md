---
title: 'Jest'
summary: 'Jest is the JavaScript test runner most React Native projects use for unit and component tests. It runs tests in Node.js, not on a device, with mocks and snapshots.'
aliases:
  - 'Jest testing framework'
related:
  - 'React Native Testing Library'
  - 'Mocking'
  - 'Unit Testing'
  - 'Snapshot Testing'
  - 'Code Coverage'
updated: 2026-11-13
---

Jest is a JavaScript testing framework: it finds your test files, runs them, and reports which assertions passed or failed. It is the default test runner in new React Native projects, and Expo projects use it through the `jest-expo` preset.

A Jest test is plain JavaScript or TypeScript:

```ts
import { formatPrice } from './formatPrice';

test('formats euros with two decimals', () => {
  expect(formatPrice(12.5, 'EUR')).toBe('€12.50');
});
```

Jest bundles everything a test suite needs in one tool: the runner, the `expect` assertion library, [mocking](/react-native-glossary/mocking) with `jest.fn()` and `jest.mock()`, fake timers, [snapshots](/react-native-glossary/snapshot-testing) and coverage reports. Watch mode re-runs only the tests affected by the files you change.

The most important thing to understand is where Jest runs: **in Node.js on your computer, not on a phone**. There is no iOS or Android, no native views and no native modules. The `react-native` preset swaps core components for JavaScript stand-ins so components can render in a test, but anything that calls native code (camera, storage, a payments SDK) must be mocked. When a test fails with "native module cannot be null" or a similar error, a missing mock is almost always the cause.

That also defines Jest's limits. It is excellent for business logic, hooks and component behaviour, which is where [unit testing](/react-native-glossary/unit-testing) pays off most. It cannot tell you whether a screen looks right, scrolls smoothly or works on a real device; that is the job of end-to-end tools.

Most teams pair Jest with [React Native Testing Library](/react-native-glossary/react-native-testing-library) to render components and interact with them the way a user would.
