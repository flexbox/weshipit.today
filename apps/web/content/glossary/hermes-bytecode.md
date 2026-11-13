---
title: 'Hermes Bytecode'
summary: 'Hermes bytecode is the precompiled binary form of your JavaScript bundle that Hermes executes in release builds, so the device skips parsing source code at launch.'
aliases:
  - 'HBC'
  - 'Bytecode precompilation'
related:
  - 'Hermes'
  - 'JavaScript Bundle'
  - 'Startup Time'
  - 'Source Maps'
  - 'Over-the-Air Update'
updated: 2026-11-13
---

Hermes bytecode (HBC) is what [Hermes](/react-native-glossary/hermes) actually runs in a production React Native app. During a release build, Metro produces the JavaScript bundle, then the Hermes compiler, `hermesc`, turns it into a compact binary file of bytecode instructions. That file is embedded in the app instead of readable source.

The benefit is [start-up time](/react-native-glossary/startup-time). A traditional engine must download, parse and compile the whole bundle on the device every launch. With bytecode, that work happened on your build machine, so the app can memory-map the file and start executing functions as they are needed. On low-end Android devices this is often the largest single start-up win available.

How it behaves in practice:

- **Development builds usually run plain JavaScript.** Hermes can compile source on the device when you load the bundle from Metro, which keeps Fast Refresh quick. Bytecode is a release-build step, so start-up measured in debug mode is not representative.
- **Bytecode is tied to the engine version.** The bytecode format changes between Hermes versions, and a file compiled for one cannot be run by another. This is why an [over-the-air update](/react-native-glossary/over-the-air-update) must target a binary with the matching React Native version: services such as EAS Update compile bytecode for the runtime that will load it.
- **Stack traces need source maps.** Errors from a release build point at bytecode offsets. Upload the Hermes [source maps](/react-native-glossary/source-maps) produced at build time to your crash reporter, or your production stack traces are unreadable.

A common misconception is that bytecode protects your code. It is harder to read than minified JavaScript, but decompilers for Hermes bytecode exist, and string constants such as API endpoints and keys are visible in the file. Never treat it as a place to hide secrets.

Bytecode does not make running code faster in general; Hermes still interprets it. The gain is skipping parse and compile at launch.
