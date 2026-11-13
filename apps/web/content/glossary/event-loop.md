---
title: 'Event Loop'
summary: 'The event loop is how React Native’s JavaScript thread schedules work: it runs one task at a time, drains the microtask queue after each, and then lets rendering update.'
aliases:
  - 'JavaScript event loop'
  - 'Microtasks'
related:
  - 'JavaScript Thread'
  - 'JavaScript Runtime'
  - 'Jank'
  - 'useEffect'
updated: 2026-11-13
---

The event loop is the scheduler that decides what the [JavaScript thread](/react-native-glossary/javascript-thread) runs next. JavaScript never runs two things at once on that thread: it takes one **task** — a touch event, a timer callback, a network response — runs it to completion, then runs every pending **microtask** (resolved promise callbacks, `queueMicrotask`), and only then moves on.

Under the New Architecture, React Native implements an event loop modelled on the web’s, with a defined order between tasks, microtasks and UI updates. That ordering is what lets `useLayoutEffect` read layout synchronously and have its changes applied before the user sees a frame, and it makes browser knowledge about promises and timers transfer to React Native with fewer surprises.

```js
setTimeout(() => console.log('task'), 0);
Promise.resolve().then(() => console.log('microtask'));
console.log('sync');
// sync, microtask, task
```

Why it matters in practice:

- **Long tasks freeze input.** A 300 ms loop over data blocks every touch, scroll event and JavaScript-driven animation queued behind it. That is the root of most JavaScript-side [jank](/react-native-glossary/jank).
- **`async` is not background work.** Marking a function `async` does not move it off the thread. CPU-heavy work inside it still blocks; the `await` only yields when it is waiting on something.
- **Microtasks can starve the loop.** A chain of promises that keeps scheduling more promises never lets the next task run. Chunking work with `setTimeout` gives the loop room to handle input between chunks.

For heavy computation, the real options are leaving the thread entirely — a native module, a worklet on another runtime, or a library that runs work in C++ — or splitting the work into smaller tasks.

The event loop belongs to the [runtime](/react-native-glossary/javascript-runtime) setup React Native provides, not to the JavaScript language, which is why Node.js-specific scheduling such as `process.nextTick` does not exist here.
