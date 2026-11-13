---
title: 'End-to-End Testing'
summary: 'End-to-end testing runs a real build of a React Native app on a simulator or device and drives it like a user, checking that whole flows work from screen to backend.'
aliases:
  - 'E2E testing'
  - 'UI testing'
related:
  - 'Detox'
  - 'Maestro'
  - 'Unit Testing'
  - 'CI/CD'
  - 'Release Build'
updated: 2026-11-13
---

End-to-end (E2E) testing checks a complete user journey in the real app: launch, sign in, add to cart, pay. A tool installs an actual build on a simulator, emulator or device, taps and types through the interface, and asserts on what appears on screen.

It is the only kind of test that exercises everything together: JavaScript, native modules, navigation, permissions, the network and the backend. A Jest test can pass while the screen it covers crashes on launch because a native dependency is misconfigured; an E2E test catches that.

The main options for React Native:

- **[Detox](/react-native-glossary/detox)** — grey-box, JavaScript tests, synchronises with the app's idle state.
- **[Maestro](/react-native-glossary/maestro)** — black-box, YAML flows, quick to set up.
- **Appium** — a long-standing cross-platform option based on the WebDriver protocol.

E2E tests are slow and expensive to maintain, so a sound strategy keeps them few and focused on flows that would lose money or users if they broke: onboarding, login, checkout. Business rules and edge cases belong in faster [unit tests](/react-native-glossary/unit-testing).

The biggest practical problem is flakiness: a test that passes and fails on the same code. Common causes are fixed `sleep` calls instead of waiting for elements, tests that depend on each other's leftover state, live backends returning different data, and animations still running when an assertion fires. Seed predictable test data, reset app state between tests, and target elements by `testID` rather than copy.

Run E2E tests against a [release build](/react-native-glossary/release-build) where possible, because debug builds behave differently and are slower. For how this fits into a full strategy, see our [React Native testing](/react-native-testing) page.
