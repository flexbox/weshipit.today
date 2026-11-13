---
title: 'JavaScriptCore'
summary: 'JavaScriptCore is Apple’s JavaScript engine from Safari. It was React Native’s original engine and is now an opt-in alternative to Hermes, maintained by the community.'
aliases:
  - 'JSC'
related:
  - 'Hermes'
  - 'JavaScript Runtime'
  - 'JSI'
  - 'Bundle Size'
updated: 2026-11-13
---

JavaScriptCore (JSC) is the JavaScript engine Apple builds for Safari and WebKit. React Native used it to run app code from the very beginning, on both platforms, until [Hermes](/react-native-glossary/hermes) replaced it as the default.

The two platforms got it differently:

- **On iOS** JSC is part of the operating system, so React Native could use the system copy at no extra size cost. The catch is that Apple does not allow third-party apps to use JIT compilation there, so JSC runs in interpreter mode inside a React Native app, unlike in Safari.
- **On Android** there is no system JSC, so React Native bundled its own build, which added several megabytes to every APK and was often years behind WebKit.

Hermes won on the metrics that matter for mobile apps: [start-up time](/react-native-glossary/startup-time) through precompiled bytecode, lower memory use, smaller downloads on Android, and a debugger built for React Native. Meta also stopped maintaining JSC support inside the core repository. JSC now lives in a community package, `@react-native-community/javascriptcore`, for apps that opt out of Hermes.

Why some teams still use it:

- They depend on a library or an `Intl` and regular expression behaviour that matches Safari more closely.
- They measured a CPU-heavy workload that runs faster on JSC in their case.

The common misconception is that switching engines is a quick fix. Behaviour differs at the edges — date parsing, `Intl` support, error messages, stack trace format — so an app tested only on Hermes can break on JSC and vice versa. Debugging tools and performance tooling also centre on Hermes now. Treat moving to JSC as a deliberate decision you measure and test on devices, not a toggle to flip when a bug appears.

Because React Native talks to the engine through [JSI](/react-native-glossary/jsi), your JavaScript code does not change between engines; only the runtime underneath does.
