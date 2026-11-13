---
title: 'Image Caching'
summary: 'Image caching keeps downloaded images in memory or on disk so a React Native app can show them again instantly without re-downloading or re-decoding them.'
aliases:
  - 'Image cache'
  - 'Image performance'
related:
  - 'Image Component'
  - 'Memory Leak'
  - 'FlashList'
  - 'Offline-First'
updated: 2026-11-13
---

Image caching is storing remote images after the first download so they can be displayed again without another network request. A good cache works at two levels: a **memory cache** of decoded images for instant display while scrolling, and a **disk cache** of the files that survives app restarts.

The core [Image component](/react-native-glossary/image-component) relies on the platform's networking and image pipeline, and its caching behaviour differs between iOS and Android and depends on the server's HTTP cache headers. That inconsistency is why many apps use `expo-image`, which is built on mature native image libraries and lets you choose a `cachePolicy` such as `'memory-disk'`, plus placeholders, transitions and prefetching.

```tsx
import { Image } from 'expo-image';

<Image source={{ uri: avatarUrl }} cachePolicy="memory-disk" style={{ width: 48, height: 48 }} />;
```

Things that commonly go wrong:

- **Cache-busting URLs.** Signed URLs or query strings that change on every request (`?token=…`, `?t=…`) give each load a new cache key, so nothing is ever reused.
- **Oversized images.** Caching is not the only cost. A 4000 px photo displayed in a 48 px avatar is still decoded at full size, using far more memory than needed and causing jank and [memory](/react-native-glossary/memory-leak) pressure in long lists. Ask your image server for the display size.
- **Stale content.** If the image behind a URL changes but the URL does not, users keep the old version. Version the URL when content changes.

For lists of images, prefetch the next few items, give every image explicit dimensions to avoid layout jumps, and pair the cache with a recycling list such as [FlashList](/react-native-glossary/flashlist).
