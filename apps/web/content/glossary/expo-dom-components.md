---
title: 'Expo DOM Components'
summary: 'Expo DOM components are React files marked with a ‘use dom’ directive that render web DOM code inside a native WebView on iOS and Android, and as plain DOM on web.'
aliases:
  - 'use dom'
  - 'DOM components'
related:
  - 'WebView'
  - 'Expo'
  - 'React Native Web'
  - 'Expo Router'
updated: 2026-11-13
---

Expo DOM components let you drop ordinary web React code, with `<div>`, CSS and browser-only libraries, into a native React Native app. You add the `'use dom'` directive at the top of a file, and Expo bundles that component separately and renders it inside a [WebView](/react-native-glossary/webview) on iOS and Android. On web it renders as normal DOM with no WebView at all.

```tsx
'use dom';

export default function Chart({ points }: { points: number[] }) {
  return <svg viewBox="0 0 100 40">{/* any web-only charting code */}</svg>;
}
```

From the native side you import and render it like any other component, passing props across the boundary. The `dom` prop accepts WebView options such as `scrollEnabled` or `matchContents`.

It matters for two jobs: migrating a web app to native one screen at a time, and using web-only libraries that have no native equivalent (rich text editors, certain charting or syntax-highlighting packages). It requires `react-native-webview` to be installed.

The boundary has rules that follow from it being a separate JavaScript context:

- Props must be serialisable. Plain data crosses; class instances and React elements do not.
- Functions passed as props become asynchronous calls back into native, so they should be `async` and return serialisable values.
- Native components cannot be rendered inside a DOM component; the tree is web-only from that point down.

The misconception is that this is a free way to skip native UI. Each DOM component is a WebView with its own startup cost and memory, it does not get native gestures, scrolling or [accessibility](/react-native-glossary/accessibility-label) for free, and it will not feel native beside real native views. Treat it as a tool for islands of web content, not for building whole apps. See [using React DOM in Expo native apps](https://docs.expo.dev/guides/dom-components/).
