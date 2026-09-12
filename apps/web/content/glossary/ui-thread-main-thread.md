---
title: 'UI Thread (Main Thread)'
summary: 'The UI thread is the platform thread that measures, lays out and draws native views. Everything the user sees is painted here, at 60 or 120 frames per second.'
aliases:
  - 'Main thread'
  - 'Native UI thread'
related:
  - 'JavaScript Thread'
  - 'Fabric Renderer'
  - 'Worklet'
  - 'Yoga'
updated: 2026-09-12
---

The UI thread — the main thread in iOS and Android terminology — is where the operating system measures, lays out, and draws native views. Every frame the user sees is produced here, which on a modern phone means a budget of about 16ms per frame at 60Hz, or 8ms at 120Hz.

React Native runs your code on the separate [JavaScript thread](/react-native-glossary/javascript-thread) and hands the results to the UI thread through the [Fabric renderer](/react-native-glossary/fabric-renderer). Two distinct kinds of jank follow from that split:

- **JS-thread jank** — logic is slow, so new frames are described too late. The screen keeps scrolling but content arrives blank.
- **UI-thread jank** — the view hierarchy itself is expensive: huge images, heavy shadows, deeply nested layouts. Frames are dropped even with idle JavaScript.

Knowing which thread is saturated decides the fix, and they are opposite fixes. [Worklets](/react-native-glossary/worklet) exist precisely so animations can run on this thread and survive a busy JavaScript thread.
