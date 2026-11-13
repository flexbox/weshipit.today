---
title: 'Frame Rate'
summary: 'Frame rate is how many frames per second a React Native app draws. At 60 FPS each frame has about 16.7 ms of work; on 120 Hz screens only 8.3 ms.'
aliases:
  - 'FPS'
  - '60 FPS'
  - '120 Hz'
related:
  - 'Jank'
  - 'JavaScript Thread'
  - 'UI Thread (Main Thread)'
  - 'Profiling'
  - 'Reanimated'
updated: 2026-11-13
---

Frame rate is the number of frames your app renders each second, measured in FPS. Phones refresh at 60 Hz as a baseline, and many iPhones (ProMotion) and Android devices run at 90 or 120 Hz, so a frame must be ready in 16.7 ms, 11.1 ms or 8.3 ms.

React Native has two frame rates worth watching, not one:

- **UI FPS** — how often the native [UI thread](/react-native-glossary/ui-thread-main-thread) produces a frame. If this drops, scrolling and native transitions visibly stutter.
- **JS FPS** — how often the [JavaScript thread](/react-native-glossary/javascript-thread) gets through its work. If this drops, taps feel slow, state updates lag and JS-driven animations freeze, even while native scrolling stays smooth.

The Perf Monitor in the [Dev Menu](/react-native-glossary/dev-menu) shows both numbers live, which makes it the quickest way to tell which side is struggling.

The common mistake is judging frame rate in a debug build. Development mode adds runtime checks, warnings and an unoptimised bundle, so a screen that crawls at 30 FPS in development can be perfectly smooth in a release build. Always confirm on a release build and on a mid-range Android phone, not only on the latest iPhone.

The second misconception is that 120 Hz is free. Higher refresh rates halve the time budget, so code that was just under 16 ms now misses every other frame. Work that must run every frame, such as gesture-driven animation, belongs on the UI thread through [Reanimated](/react-native-glossary/reanimated) worklets or the native driver, where a busy JavaScript thread cannot hold it back.
