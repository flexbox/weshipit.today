---
title: 'Maestro'
summary: 'Maestro is a mobile end-to-end testing tool where tests are short YAML flows that tap, type and assert on a running app, with no changes needed inside the app.'
aliases:
  - 'Maestro flows'
related:
  - 'End-to-End Testing'
  - 'Detox'
  - 'EAS Workflows'
  - 'Accessibility Label'
updated: 2026-11-13
---

Maestro is an [end-to-end testing](/react-native-glossary/end-to-end-testing) framework for mobile apps in which each test is a flow written in YAML. It drives an installed app on a simulator, emulator or device from the outside, much as a user would.

```yaml
appId: com.example.app
---
- launchApp
- tapOn: 'Email'
- inputText: 'ada@example.com'
- tapOn: 'Sign in'
- assertVisible: 'Welcome, Ada'
```

Run it with `maestro test flow.yaml`. Maestro also offers an interactive Studio for inspecting the screen and building flows.

Why React Native teams adopt it:

- **No app integration.** Maestro is black-box: it works with any build, so there is no test library to link and no special test build.
- **Built-in tolerance for flakiness.** Commands retry and wait for elements to appear rather than failing immediately.
- **Readable tests.** Product people and QA can read, and often write, flows.
- **Framework-agnostic.** The same tool tests React Native, native and Flutter apps.

Maestro finds elements by visible text, [accessibility labels](/react-native-glossary/accessibility-label) or `testID`. Text matching is convenient but brittle: a copy change or switching the device language breaks the flow. For anything beyond a quick smoke test, give key elements a `testID`.

The trade-off against [Detox](/react-native-glossary/detox) is control. Maestro waits by observing the screen, not by knowing what the JavaScript thread is doing, and logic beyond YAML (loops, conditions, API calls to seed data) relies on its JavaScript scripting support rather than a full test framework. It runs well in CI, including in [EAS Workflows](/react-native-glossary/eas-workflows), and is often the quickest way to get a first set of critical-path tests running.
