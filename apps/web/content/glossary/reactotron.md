---
title: 'Reactotron'
summary: 'Reactotron is a free desktop app from Infinite Red for inspecting a React Native app in development: logs, network requests, state, storage and custom commands.'
aliases:
  - 'Reactotron debugger'
related:
  - 'React Native DevTools'
  - 'Flipper'
  - 'Redux'
  - 'AsyncStorage'
  - 'ADB'
updated: 2026-11-13
---

Reactotron is an open-source desktop app from Infinite Red that connects to your React Native app while it runs in development and shows a timeline of what is happening inside it. It complements, rather than replaces, [React Native DevTools](/react-native-glossary/react-native-devtools).

Its strengths are app-level insight that a general debugger does not give you out of the box:

- A timeline of logs, network requests and responses, and async events.
- State inspection and subscriptions for [Redux](/react-native-glossary/redux) and MobX-State-Tree, including dispatching actions and restoring snapshots.
- A view of [AsyncStorage](/react-native-glossary/asyncstorage) contents.
- Custom commands: buttons in the desktop app that run code in your app, such as "reset onboarding" or "log in as test user".

Unlike a debugger, Reactotron is set up in code with the `reactotron-react-native` package and a small config file, imported only in development:

```ts
if (__DEV__) {
  require('./ReactotronConfig');
}
```

That guard matters. The most common mistake is importing the config unconditionally, which ships the client in production builds where it tries to reach a desktop that is not there.

Other practical gotchas:

- On a physical Android device the app cannot reach `localhost` on your computer. Forward the port with `adb reverse tcp:9090 tcp:9090`, or point the client at your machine’s IP address.
- Network logging works by intercepting the app’s requests, so the configuration order relative to your HTTP client setup can matter.
- Reactotron shows what your code reports. It does not set breakpoints or inspect native views.

Teams that relied on [Flipper](/react-native-glossary/flipper) for state and network plugins often move to Reactotron for that part of the workflow.
