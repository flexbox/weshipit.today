---
title: 'JavaScript Bundle'
summary: 'The JavaScript bundle is the single file Metro produces from your source code. It ships inside the app binary and is what the JavaScript engine actually executes.'
aliases:
  - 'JS bundle'
  - 'Bundle'
related:
  - 'Metro'
  - 'Hermes'
  - 'JavaScript Runtime'
  - 'Over-the-Air Update'
updated: 2026-09-12
---

The JavaScript bundle is the compiled output of your entire application's JavaScript — your code plus every npm dependency — collapsed by [Metro](/react-native-glossary/metro) into one file.

Where it lives depends on the build:

- **Development** — served over HTTP by the Metro dev server and fetched on launch, which is why the app needs Metro running.
- **Release** — written into the binary as `main.jsbundle` (iOS) or `index.android.bundle` (Android), and precompiled to [Hermes](/react-native-glossary/hermes) bytecode.

Two consequences worth internalising as a newcomer.

Bundle size affects startup, not download size, in the way you might expect — the bundle is a small fraction of an app binary, but everything in it is parsed or loaded at launch, so an unused 2MB dependency still costs you.

And the JS/native split is exactly this file. Changing bundle contents can ship as an [over-the-air update](/react-native-glossary/over-the-air-update); changing anything outside it requires a new store build.
