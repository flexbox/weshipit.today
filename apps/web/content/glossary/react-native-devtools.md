---
title: 'React Native DevTools'
summary: 'React Native DevTools is the official debugger for React Native apps, a Chrome DevTools-based window for console logs, breakpoints, React components and profiling.'
aliases:
  - 'DevTools'
  - 'Debugger'
related:
  - 'React DevTools'
  - 'Hermes'
  - 'Dev Menu'
  - 'Source Maps'
  - 'Flipper'
updated: 2026-11-13
---

React Native DevTools is the official debugging tool for React Native, the default since React Native 0.76. It opens a desktop window built on the Chrome DevTools front end and connects directly to the [Hermes](/react-native-glossary/hermes) engine running inside your app.

Open it by pressing `j` in the terminal running Metro, or pick the debugger entry in the [Dev Menu](/react-native-glossary/dev-menu).

What you get:

- **Console** showing your app’s logs, with objects you can expand and inspect.
- **Sources** with breakpoints, stepping and `debugger;` statements, mapped back to your original files.
- **Memory** for heap snapshots when you suspect a leak.
- **Components** and **Profiler** panels from [React DevTools](/react-native-glossary/react-devtools), built in.

Newer releases keep adding panels, such as network and performance tooling, so check the docs for your version.

It matters because it replaced a fragmented history. Earlier, developers juggled Chrome remote debugging, [Flipper](/react-native-glossary/flipper) and standalone tools, each with its own setup. Now one tool ships with React Native and needs no extra install.

The biggest misconception comes from that history. The old "Debug JS Remotely" option ran your JavaScript inside Chrome rather than on the device. Timing, available APIs and even bugs differed from the real app, and synchronous native calls did not work at all. React Native DevTools debugs the code where it actually runs, on Hermes, which is also why it requires Hermes and does not support JavaScriptCore.

A common gotcha: breakpoints that never hit or land on the wrong line usually mean the debugger is attached to a stale bundle. Reload the app with DevTools open. See the [debugging docs](https://reactnative.dev/docs/debugging).
