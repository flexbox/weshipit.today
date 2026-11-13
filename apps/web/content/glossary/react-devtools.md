---
title: 'React DevTools'
summary: 'React DevTools is the React team’s inspector for browsing the component tree, reading props, state and hooks, and profiling why and how long components render.'
aliases:
  - 'Component inspector'
related:
  - 'React Native DevTools'
  - 'Re-render'
  - 'Profiling'
  - 'React.memo'
updated: 2026-11-13
---

React DevTools is the React team’s inspector for React apps. In React Native it shows the live component tree of your running app, lets you select any component to read its props, state and hook values, and records profiles of every render.

Today it is built into [React Native DevTools](/react-native-glossary/react-native-devtools) as the Components and Profiler panels, so there is nothing extra to install. The standalone app, started with `npx react-devtools`, still exists for setups that need it.

It answers two questions you cannot answer from logs alone:

- **What is on screen and with which data?** The Components panel shows the tree as React sees it, including context values and custom hook state, and you can edit props live to test a theory.
- **Why did this render?** The Profiler records a session commit by commit, shows how long each component took and, with "record why each component rendered" turned on, whether props, state, hooks or a parent caused it.

That second question is the heart of most [re-render](/react-native-glossary/re-render) investigations. Turning on "Highlight updates when components render" is a fast way to spot a whole screen flashing on every keystroke.

The common mistake is reading absolute timings from a development build as real performance. Development mode adds checks and runs much slower than a release build, so the Profiler is best for relative comparisons and finding _which_ components render too often. Measure actual frame rates and startup time on a release build with a dedicated [profiling](/react-native-glossary/profiling) tool.

Another gotcha: the component tree shows React components, not native views. A component that renders nothing visible still appears, and layout problems are better explored with the Element Inspector.
