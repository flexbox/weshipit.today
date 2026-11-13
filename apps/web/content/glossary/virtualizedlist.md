---
title: 'VirtualizedList'
summary: 'VirtualizedList is the React Native base component behind FlatList and SectionList, mounting only items inside a window around the viewport to keep long lists fast.'
aliases:
  - 'Virtualization'
  - 'Windowing'
related:
  - 'FlatList'
  - 'SectionList'
  - 'FlashList'
  - 'getItemLayout'
  - 'Memory Leak'
updated: 2026-11-13
---

`VirtualizedList` is the core component that implements list virtualisation in React Native. [FlatList](/react-native-glossary/flatlist) and SectionList are thin wrappers around it. Virtualisation, also called windowing, means only the items in a region around the viewport are mounted; everything outside is replaced by empty space of the right size.

You rarely use it directly. The case for it is data that is not a plain array, such as an immutable collection, because it takes `getItem` and `getItemCount` instead of requiring `data` to be an array.

Understanding it explains how its children behave. The tuning props live here:

- `windowSize` — how many viewport-heights stay mounted. The default of 21 means ten screens above, ten below and the current one.
- `initialNumToRender` — items rendered for the first paint.
- `maxToRenderPerBatch` and `updateCellsBatchingPeriod` — how quickly new items fill in while scrolling.
- `removeClippedSubviews` — detaches off-screen native views, with occasional rendering bugs.

Lowering `windowSize` saves memory but makes **blank areas** more likely during a fast fling, because rendering happens on the [JavaScript thread](/react-native-glossary/javascript-thread) and cannot keep up. Raising it does the opposite. Fixed-height rows with [getItemLayout](/react-native-glossary/getitemlayout) help more than either, because the list skips measuring.

The biggest misconception is that items keep their state. When an item scrolls out of the window it is **unmounted**, so local state such as an expanded row or a half-typed input is lost when it comes back. Store that state above the list, keyed by item id.

VirtualizedList unmounts and remounts items; [FlashList](/react-native-glossary/flashlist) instead recycles a pool of mounted cells, which is why it often scrolls more smoothly on large lists.
