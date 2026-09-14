---
title: 'JavaScript Runtime'
summary: 'The JavaScript runtime is the engine that executes your app’s JavaScript on the device. React Native ships Hermes by default, with JavaScriptCore as the alternative.'
aliases:
  - 'JS engine'
  - 'JavaScript engine'
related:
  - 'Hermes'
  - 'JavaScript Thread'
  - 'JavaScript Bundle'
  - 'Metro'
updated: 2026-09-12
---

The JavaScript runtime is the engine embedded in your app that actually runs your code on the user's phone. Unlike a web app there is no browser here — React Native bundles an engine into the binary.

Two engines matter:

- **[Hermes](/react-native-glossary/hermes)** — built by Meta specifically for React Native and the default since React Native 0.70. It compiles JavaScript to bytecode ahead of time, which cuts start-up time and memory use on low-end devices.
- **JavaScriptCore (JSC)** — Apple's engine, the historical default and still selectable.

The runtime executes the [JavaScript bundle](/react-native-glossary/javascript-bundle) that [Metro](/react-native-glossary/metro) produced, on the [JavaScript thread](/react-native-glossary/javascript-thread).

Two consequences newcomers hit. First, Node.js APIs do not exist here — no `fs`, no `Buffer` unless polyfilled. Second, engine differences are real: a regex or `Intl` feature that works in Chrome may be missing in Hermes, which is why debugging in a browser can hide bugs that only appear on device.
