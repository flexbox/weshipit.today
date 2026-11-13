---
title: 'Unit Testing'
summary: 'Unit testing checks one small piece of a React Native app, such as a function, hook or component, in isolation and in milliseconds, usually with Jest.'
aliases:
  - 'Unit test'
  - 'Component test'
related:
  - 'Jest'
  - 'React Native Testing Library'
  - 'Mocking'
  - 'End-to-End Testing'
  - 'Code Coverage'
updated: 2026-11-13
---

Unit testing means testing a single unit of code on its own: a pure function, a [custom hook](/react-native-glossary/custom-hook), a reducer or one component. Anything outside the unit, such as the network, storage or native modules, is replaced with a controlled stand-in so the test is fast and deterministic.

In React Native, unit tests run in [Jest](/react-native-glossary/jest) under Node.js, not on a device. That makes them quick enough to run hundreds on every save, but it also sets their boundary: they verify logic and behaviour, not native integration or visual appearance.

In practice there are two flavours:

- **Logic tests** for code with no UI: price calculations, date formatting, validation rules, state machines, API response mapping. These give the best return of any test you can write.
- **Component tests** that render a component with [React Native Testing Library](/react-native-glossary/react-native-testing-library), interact with it, and assert on the output: the error message appears, the button is disabled, the callback fires.

```ts
test('rejects passwords shorter than 8 characters', () => {
  expect(validatePassword('abc123')).toEqual({ valid: false, reason: 'too_short' });
});
```

The common mistake is testing implementation details: asserting on internal state, on how many times a private helper was called, or on the exact component tree. Such tests break every time you refactor even though the behaviour is unchanged, and teams end up deleting them. Test inputs and outputs, and what the user would observe.

A second mistake is mocking so much that the test only checks the mocks. If a test replaces every dependency, it can pass while the real code is broken. Push logic into plain functions that need no mocks, and keep UI components thin.
