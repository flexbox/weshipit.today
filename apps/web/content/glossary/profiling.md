---
title: 'Profiling'
summary: 'Profiling is measuring where a React Native app spends time and memory, using tools that record JS, React renders and native threads, so you fix real bottlenecks.'
aliases:
  - 'Profiler'
  - 'Performance profiling'
related:
  - 'React Native DevTools'
  - 'Jank'
  - 'Re-render'
  - 'Memory Leak'
  - 'Frame Rate'
updated: 2026-11-13
---

Profiling is recording what your app actually does over a period of time, then reading the recording to find what is slow. It replaces guessing with evidence: which function blocked the thread, which component rendered forty times, which allocation kept growing.

A React Native app runs on several layers, and each has its own profiler:

- **React renders.** The React Profiler in [React Native DevTools](/react-native-glossary/react-native-devtools) records every commit and shows which components rendered, how long they took and why. This is the place to hunt unnecessary [re-renders](/react-native-glossary/re-render).
- **JavaScript execution.** Sampling the Hermes runtime shows which functions consume time on the JavaScript thread.
- **Native threads.** Xcode Instruments (Time Profiler, Allocations) on iOS and the Android Studio profilers or Perfetto on Android show the UI thread, rendering and native memory.

The usual workflow is: reproduce one specific slow interaction, record only that interaction, find the single most expensive item, fix it, then record again to confirm the improvement.

The most common mistake is profiling a debug build. Development mode runs extra checks, warnings and unoptimised code, which inflates render times and can point you at problems that do not exist in production. Absolute numbers from a debug build are misleading; use a release or profiling build on a real, preferably low-end, device when timing matters.

The second mistake is optimising before profiling. Wrapping everything in `React.memo` or `useCallback` adds complexity and sometimes cost. Profile first, and fix the one thing the recording points at.
