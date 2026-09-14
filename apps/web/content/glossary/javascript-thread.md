---
title: 'JavaScript Thread'
summary: 'The JavaScript thread is where your React components, business logic and event handlers run. Blocking it makes the app feel frozen even though native rendering continues.'
aliases:
  - 'JS thread'
related:
  - 'UI Thread (Main Thread)'
  - 'JavaScript Runtime'
  - 'Worklet'
  - 'Reanimated'
updated: 2026-09-12
---

The JavaScript thread is the single thread where your application code executes: component renders, hooks, event handlers, network callbacks, and state updates all queue here.

It is separate from the [UI thread](/react-native-glossary/ui-thread-main-thread), which draws the actual pixels. That separation is why a React Native app can stay visually responsive — a scroll can keep moving natively — while your JavaScript is stuck.

Because it is single-threaded, anything expensive blocks everything else:

- Parsing a large JSON payload
- A heavy `map`/`filter` over thousands of records on every render
- Synchronous work inside a `useEffect` that runs on mount

Symptoms are a button that responds a second late, or a `setState`-driven animation that stutters. The fixes are to move work off the render path (`useMemo`, pagination, background native modules) or to move animation off this thread entirely with [worklets](/react-native-glossary/worklet).

Profiling the JS thread is the first step in almost any React Native performance investigation.
