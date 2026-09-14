---
title: 'Bridge'
summary: 'The bridge was React Native’s original asynchronous, JSON-serialised channel between JavaScript and native code. The New Architecture replaces it with JSI.'
aliases:
  - 'Legacy bridge'
  - 'React Native bridge'
related:
  - 'JSI'
  - 'Legacy vs New Architecture'
  - 'Communication Layer'
  - 'Native Module'
updated: 2026-09-12
---

The bridge was the original mechanism connecting JavaScript to native code in React Native. Every interaction — mounting a view, calling a native module, delivering a touch event — was serialised to JSON, placed on a queue, and processed asynchronously on the other side.

That design bought thread safety and simplicity, but it had three well-known costs:

- **Serialisation overhead** on every call, which grew with payload size.
- **No synchronous reads.** JavaScript could never ask native code a question and get an immediate answer, which is why measuring a view was awkward.
- **Congestion.** A busy queue — a fast scroll driving many events — meant frames arriving late.

The bridge is gone in bridgeless mode, the default since **React Native 0.76**, replaced by [JSI](/react-native-glossary/jsi).

Newcomers still meet the word constantly because a decade of blog posts, conference talks, and library READMEs describe React Native in bridge terms. If an article's central claim is "the bridge is the bottleneck", it predates late 2024.
