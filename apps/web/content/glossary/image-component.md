---
title: 'Image Component'
summary: 'Image is the React Native core component for displaying bundled, remote or base64 pictures; expo-image is the popular drop-in with stronger caching and placeholders.'
aliases:
  - 'Image'
  - '<Image>'
  - 'expo-image'
related:
  - 'Image Caching'
  - 'Core Components'
  - 'Density-Independent Pixels'
  - 'Metro'
updated: 2026-11-13
---

`<Image>` is the core component that draws pictures in React Native, from three kinds of source: a static file pulled in with `require()`, a remote URI, or a base64 data URI.

The two kinds of source behave very differently:

```jsx
<Image source={require('./logo.png')} />
<Image source={{ uri: 'https://example.com/a.jpg' }} style={{ width: 120, height: 120 }} />
```

- **Static images** are resolved by [Metro](/react-native-glossary/metro) at build time. Their size is known, and Metro picks `logo@2x.png` or `logo@3x.png` to match the screen density.
- **Remote images** have no intrinsic size until they download, so they render as nothing unless you give them a width and height. This is the single most common “my image doesn’t show” bug.

`resizeMode` (`cover`, `contain`, `stretch`, `repeat`, `center`) controls how the picture fills its box. `Image.prefetch()` warms the cache before a screen opens, and `onLoad` and `onError` let you react to the result.

The built-in component leans on each platform’s networking stack for caching, which gives you little control over disk cache behaviour. That is why many apps switch to **expo-image**, which uses SDWebImage on iOS and Glide on Android. It adds a real memory and disk cache with a `cachePolicy` prop, blurhash and thumbhash placeholders, transitions, and formats such as WebP and AVIF. Its `contentFit` prop replaces `resizeMode`. It works in bare React Native projects too, not only Expo ones; see [image caching](/react-native-glossary/image-caching) for strategy.

A frequent performance mistake is loading a 4000-pixel photo into a 100-point thumbnail. Decoding it costs memory on every render, so request a server-resized image sized for the device’s pixel density.
