---
title: 'Memory Leak'
summary: 'A memory leak is memory a React Native app keeps holding after it is no longer needed, so usage grows until the app slows down or the OS kills it.'
aliases:
  - 'Memory usage'
  - 'Out of memory'
related:
  - 'Garbage Collection'
  - 'useEffect'
  - 'Profiling'
  - 'Image Caching'
updated: 2026-11-13
---

A memory leak is memory your app allocated and never releases, even though nothing will use it again. Each leak may be small, but repeated over many screen visits it adds up until the app becomes sluggish or the operating system terminates it for using too much memory.

JavaScript has [garbage collection](/react-native-glossary/garbage-collection), which surprises people who assume leaks are impossible. The collector only frees objects that are unreachable, so anything still referenced stays alive. The most common React Native leaks are references you forgot to remove:

- Event listeners and subscriptions (AppState, Keyboard, a WebSocket, a store) added in a [useEffect](/react-native-glossary/useeffect) without a cleanup function.
- `setInterval` timers that keep running, and keep their closures alive, after a screen unmounts.
- Module-level caches or arrays that only ever grow.
- Screens kept mounted in a navigation stack that keeps getting deeper instead of going back.

```tsx
useEffect(() => {
  const sub = AppState.addEventListener('change', onChange);
  return () => sub.remove();
}, []);
```

Leaks can also be native. Large decoded images are the classic case: a bitmap held by the native side can be many megabytes even when the file was small, which is why long image grids crash on low-memory Android phones. Native modules that hold strong references to callbacks can leak too.

To find a leak, repeat one action many times (open and close a screen twenty times) and watch whether memory returns to its baseline. Use the memory tools in React Native DevTools for the Hermes heap, and Xcode Instruments or the Android Studio Memory Profiler for native memory. A single high reading is not a leak; steady growth that never comes back down is.
