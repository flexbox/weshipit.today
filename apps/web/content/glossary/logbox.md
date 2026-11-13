---
title: 'LogBox'
summary: 'LogBox is React Native’s in-app overlay for development builds that shows errors full screen and warnings as dismissible notifications, with readable stack traces.'
aliases:
  - 'Red box'
  - 'Yellow box'
  - 'Error overlay'
related:
  - 'Dev Menu'
  - 'React Native DevTools'
  - 'Error Boundary'
  - 'Fast Refresh'
updated: 2026-11-13
---

LogBox is the overlay React Native draws on top of your app in development builds to surface errors and warnings. It replaced the older "red box" and "yellow box" screens in React Native 0.63, though many developers still use those names.

It shows three kinds of message:

- **Errors**, such as an exception during render, open full screen with a symbolicated stack trace and the component stack.
- **Warnings**, such as a deprecated API or a missing `key`, appear as a small notification at the bottom that you can tap to expand.
- **Syntax errors** from Metro open full screen and clear automatically once you fix the file and [Fast Refresh](/react-native-glossary/fast-refresh) reloads.

LogBox matters because it puts the cause of a problem in front of you in the app, collapsing React Native internals so the frames from your own code stand out.

You can silence noise from libraries you do not control:

```js
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Some third-party warning']);
```

Patterns match by substring or regular expression. `LogBox.ignoreAllLogs()` hides everything, which is useful for demo recordings and dangerous anywhere else.

The common misconceptions:

- **Ignoring a warning does not fix it.** It only hides the overlay; the message still reaches the console and [React Native DevTools](/react-native-glossary/react-native-devtools). Deprecation warnings ignored today become crashes after the next upgrade.
- **LogBox does not exist in release builds.** An error that shows a dismissible overlay in development will close the app in production unless an [error boundary](/react-native-glossary/error-boundary) catches it. Dismissing the red screen and carrying on hides how users will experience the bug.
