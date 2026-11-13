---
title: 'FlashList'
summary: 'FlashList is Shopify’s high-performance list component for React Native. It recycles mounted cells instead of unmounting them, with an API close to FlatList.'
aliases:
  - 'Shopify FlashList'
  - '@shopify/flash-list'
related:
  - 'FlatList'
  - 'VirtualizedList'
  - 'Frame Rate'
  - 'Keys'
updated: 2026-11-13
---

FlashList is an open-source list component from Shopify, installed as `@shopify/flash-list`. It replaces [FlatList](/react-native-glossary/flatlist) for long or complex lists, keeping a similar props API while changing how rows are managed underneath.

The difference is **cell recycling**. A [VirtualizedList](/react-native-glossary/virtualizedlist) unmounts rows that leave the window and mounts new ones as they enter. FlashList keeps a pool of mounted row components and re-renders them with new data as they scroll back into view, so the app avoids creating and destroying native views during a fling. On big feeds that means fewer blank areas and steadier [frame rate](/react-native-glossary/frame-rate), especially on mid-range Android phones.

```tsx
<FlashList data={products} renderItem={({ item }) => <ProductCard product={item} />} getItemType={(item) => item.kind} />
```

Version 2 was rewritten for the New Architecture and no longer needs the `estimatedItemSize` prop that v1 required, because it measures items synchronously. If you read an older tutorial that insists on it, it was written for v1.

Recycling brings its own gotchas:

- **Local state leaks between rows.** A recycled component keeps its `useState` values, so row A’s “expanded” flag can appear on row D. Derive UI from item data, or reset state when the item id changes.
- **Don’t put a `key` on the row’s root.** That forces React to remount the component and throws away the recycling benefit. Keys on children inside the row are also worth avoiding.
- **Use `getItemType`** when rows have very different layouts, so a header cell is never recycled into a product card.

FlashList is not magic: heavy row components still need memoising. It shines once rows are reasonably cheap and the list is long.
