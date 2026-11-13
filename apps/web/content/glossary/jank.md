---
title: 'Jank'
summary: 'Jank is visible stutter in a React Native app, caused when the UI or JavaScript thread misses its frame deadline and frames are dropped or delivered late.'
aliases:
  - 'Dropped frames'
  - 'Frame drop'
  - 'Stutter'
related:
  - 'Frame Rate'
  - 'Profiling'
  - 'Re-render'
  - 'FlashList'
  - 'Native Driver'
updated: 2026-11-13
---

Jank is the stutter a user sees when an app fails to produce a frame in time. Instead of smooth motion, a scroll or animation jumps, hitches or freezes for a moment because one or more frames were dropped.

In React Native, jank has two different sources and the fix depends on which one you have:

- **UI thread jank.** Native work takes too long: laying out a huge view tree, decoding a large image, or mounting hundreds of views at once. Scrolling itself stutters.
- **JavaScript thread jank.** The JS thread is busy with a large [re-render](/react-native-glossary/re-render), a heavy JSON parse or a synchronous loop. Native scrolling may stay smooth, but taps respond late, lists show blank cells and JS-driven animations pause.

A classic example is an animation started with the `Animated` API without the [native driver](/react-native-glossary/native-driver): it runs on the JS thread, so the moment a screen fetches data and re-renders, the animation hitches.

Typical fixes:

- Virtualise long lists with [FlashList](/react-native-glossary/flashlist) or a well-tuned FlatList instead of mapping over arrays in a ScrollView.
- Move animation and gesture work to the UI thread.
- Defer expensive work until after a navigation transition finishes.
- Resize images to the size they are displayed at.

The usual mistake is guessing. Developers often add `useMemo` everywhere when the real cause is one oversized image or an unvirtualised list. Measure first with a profiler, in a release build, on a slow Android device, where jank shows up long before it does on a flagship phone.
