---
title: 'getItemLayout'
summary: 'getItemLayout is a FlatList prop that tells the list each item’s height and offset in advance, so it can skip measuring rows and jump straight to any index.'
aliases:
  - 'Fixed item height'
related:
  - 'FlatList'
  - 'VirtualizedList'
  - 'SectionList'
  - 'FlashList'
updated: 2026-11-13
---

`getItemLayout` is an optional prop on [FlatList](/react-native-glossary/flatlist) and other lists built on [VirtualizedList](/react-native-glossary/virtualizedlist). You give it a function that returns the length, offset and index of any item, so the list knows the layout of every row without rendering and measuring it first.

```tsx
const ROW_HEIGHT = 72;

<FlatList
  data={items}
  renderItem={renderRow}
  getItemLayout={(data, index) => ({
    length: ROW_HEIGHT,
    offset: ROW_HEIGHT * index,
    index,
  })}
/>;
```

Why it matters:

- **`scrollToIndex` works reliably.** Without it, jumping to a row that has not been rendered yet fails or lands in the wrong place, because the list cannot know where that row is.
- **`initialScrollIndex` opens the list at the right spot** without a visible jump.
- **Less layout work while scrolling fast**, so fewer blank areas appear.

It only makes sense when item sizes are known up front: fixed-height rows, or heights you can compute from the data without rendering. If rows vary with their text content, a wrong `getItemLayout` is worse than none, causing overlapping rows and scroll positions that drift.

The classic gotcha is forgetting extras. If you use `ItemSeparatorComponent`, a header or content padding, the offset must include them, otherwise each row is off by a few pixels more than the last and long lists end up badly misaligned. In a [SectionList](/react-native-glossary/sectionlist), section headers and footers count as items in the index too.

[FlashList](/react-native-glossary/flashlist) does not use `getItemLayout`; it has its own layout approach.
