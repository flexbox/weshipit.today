---
title: 'Mocking'
summary: 'Mocking replaces a real dependency, such as a native module, network call or timer, with a controlled fake so React Native code can be tested in Jest without a device.'
aliases:
  - 'Jest mocks'
  - 'Mock native module'
related:
  - 'Jest'
  - 'Native Module'
  - 'Unit Testing'
  - 'React Native Testing Library'
updated: 2026-11-13
---

Mocking means swapping a real dependency for a fake one during a test. The fake returns whatever the test needs and records how it was called. In React Native it is not optional: [Jest](/react-native-glossary/jest) runs in Node.js, where no iOS or Android exists, so any code that reaches a [native module](/react-native-glossary/native-module) has to be mocked to run at all.

Jest provides the core tools:

- `jest.fn()` creates a fake function you can program and inspect.
- `jest.mock('module-name', factory)` replaces a whole module for every file in the test.
- `jest.spyOn(object, 'method')` watches or overrides a single method.
- Fake timers (`jest.useFakeTimers()`) control `setTimeout` and intervals.

```js
// jest.setup.js
jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));
```

Many popular libraries ship an official Jest mock or setup file for exactly this reason. Check a library's documentation for a testing section before writing your own, and register shared mocks once in a setup file referenced from your Jest config rather than repeating them in every test.

Typical errors that mean a mock is missing include "native module cannot be null", "TurboModuleRegistry.getEnforcing(...) could not be found", or an import failing with unexpected syntax because the package ships untransformed code (which is fixed with `transformIgnorePatterns`, not a mock).

The gotcha is over-mocking. Mock the edges of your system, such as the network, native APIs, time and randomness, not your own modules. A test where every collaborator is mocked passes even when the real pieces no longer fit together. For network calls, mocking at the HTTP level with a tool such as Mock Service Worker keeps more of your real code under test than mocking your API client.
