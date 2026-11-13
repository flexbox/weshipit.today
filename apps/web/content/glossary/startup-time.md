---
title: 'Startup Time'
summary: 'Startup time is how long a React Native app takes from the user tapping its icon to a usable first screen, covering native launch, bundle loading and first render.'
aliases:
  - 'Cold start'
  - 'TTI'
  - 'Time to interactive'
  - 'App launch time'
related:
  - 'Hermes'
  - 'Lazy Loading'
  - 'Bundle Size'
  - 'Splash Screen'
  - 'Hermes Bytecode'
updated: 2026-11-13
---

Startup time is the delay between a user tapping your icon and the app being usable. For React Native the key metric is time to interactive (TTI): the moment the first real screen is rendered and responds to touch, not merely when the splash screen appears.

A React Native launch happens in stages:

1. The operating system starts the native process and runs native initialisation.
2. The JavaScript runtime starts and loads the [JavaScript bundle](/react-native-glossary/javascript-bundle).
3. The bundle's top-level code runs: every imported module executes its side effects.
4. React renders the first screen, often after reading storage or fetching data.

A **cold start** runs all of this from nothing; a **warm start** reuses a process the OS kept in memory and is much faster. Measure cold starts, because that is what new users and anyone whose app was killed in the background experience.

[Hermes](/react-native-glossary/hermes) helps the most at stage 2, because release builds ship precompiled bytecode instead of JavaScript source that must be parsed on the device. Stage 3 is where most apps lose time they could win back: importing a large SDK, a date library or every screen of the app at launch means all that code runs before anything appears. [Lazy loading](/react-native-glossary/lazy-loading) with inline requires defers modules until they are first used.

The common mistake is measuring in development. Debug builds load the bundle from Metro over the network and skip bytecode, so their startup numbers say nothing about production. Measure a release build on a low-end Android phone, and keep the [splash screen](/react-native-glossary/splash-screen) up only until the first screen is actually ready.
