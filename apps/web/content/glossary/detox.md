---
title: 'Detox'
summary: 'Detox is an end-to-end testing framework for React Native that drives a real app build on a simulator or emulator and automatically waits for the app to go idle.'
aliases:
  - 'Detox E2E'
related:
  - 'End-to-End Testing'
  - 'Maestro'
  - 'iOS Simulator'
  - 'Android Emulator'
  - 'CI/CD'
updated: 2026-11-13
---

Detox is an open-source [end-to-end testing](/react-native-glossary/end-to-end-testing) framework built by Wix specifically for React Native. It installs a real build of your app on an [iOS Simulator](/react-native-glossary/ios-simulator) or [Android Emulator](/react-native-glossary/android-emulator), then taps, types and scrolls through it while asserting what appears on screen.

Tests are written in JavaScript, typically run by Jest:

```js
it('logs in', async () => {
  await element(by.id('email')).typeText('ada@example.com');
  await element(by.id('password')).typeText('secret');
  await element(by.id('login-button')).tap();
  await expect(element(by.text('Welcome'))).toBeVisible();
});
```

What sets Detox apart is that it is **grey-box**. Because it runs code inside your app, it knows when the app is busy: pending network requests, running animations, timers and work on the JavaScript thread. It waits until the app is idle before each action, instead of relying on fixed sleeps. That synchronisation is its main defence against flaky tests.

It also has costs:

- Setup is the heaviest of the common options: a Detox configuration file, build commands for each platform, and native test configuration on Android.
- Detox tests need a build made for testing, so every run involves a native build or a cached one.
- Automatic idle detection can work against you. An infinite animation, a polling request or a long timer means the app never looks idle, and tests hang until they time out. You then have to disable synchronisation for that step or exclude specific URLs.

Elements are best targeted with a `testID` prop, which keeps tests stable when copy or translations change. Teams choosing between Detox and [Maestro](/react-native-glossary/maestro) usually trade Detox's tight synchronisation and JavaScript API against Maestro's simpler setup.
