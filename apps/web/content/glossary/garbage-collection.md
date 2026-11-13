---
title: 'Garbage Collection'
summary: 'Garbage collection is how the JavaScript engine reclaims memory from objects nothing references any more. In React Native, Hermes runs a mostly concurrent collector.'
aliases:
  - 'GC'
  - 'Hermes GC'
related:
  - 'Memory Leak'
  - 'Hermes'
  - 'Profiling'
  - 'JSI'
updated: 2026-11-13
---

Garbage collection (GC) is the automatic process that frees memory used by JavaScript objects your code can no longer reach. The engine periodically traces every object reachable from the roots — globals, the call stack, live closures — and reclaims the rest.

In React Native that engine is usually [Hermes](/react-native-glossary/hermes), whose collector, called Hades, does most of its work on a background thread. Older collectors stopped the JavaScript thread for the whole collection, which on a large heap could show up as a dropped frame mid-scroll. Hades keeps those pauses short, so GC is rarely the cause of jank on its own.

What GC cannot do is free memory you are still pointing at. That is what a JavaScript [memory leak](/react-native-glossary/memory-leak) really is: an object kept reachable by mistake. The usual culprits in React Native:

- Event listeners and subscriptions never removed, holding closures that capture whole screens.
- `setInterval` timers still running after their component unmounted.
- Module-level caches, arrays or maps that only ever grow.
- Large responses stored in a global store long after they are needed.

There is also a React Native-specific blind spot. Through [JSI](/react-native-glossary/jsi), a small JavaScript object can own a large native allocation — a decoded image, a Skia surface, a database handle. The collector only sees the small JavaScript side, so it feels no pressure to run, and the native memory waits until it does. Libraries that wrap native resources usually offer an explicit `dispose()` or `release()`; call it rather than relying on GC.

To investigate, take heap snapshots in React Native DevTools and compare them before and after repeating an action several times, such as opening and closing a screen. Objects whose count keeps climbing are being retained. Remember that memory from native views, images and the native heap does not appear in a JavaScript heap snapshot; use Xcode Instruments or the Android Studio profiler for those.
