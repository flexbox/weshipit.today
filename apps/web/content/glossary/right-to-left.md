---
title: 'Right-to-Left Layout'
summary: 'Right-to-left (RTL) layout mirrors a React Native interface for languages such as Arabic and Hebrew, controlled through the I18nManager API and start/end styles.'
aliases:
  - 'RTL'
  - 'I18nManager'
related:
  - 'Internationalization'
  - 'Flexbox'
  - 'Yoga'
  - 'Platform-Specific Code'
updated: 2026-11-13
---

Right-to-left (RTL) layout is the mirrored interface used for languages written from right to left, such as Arabic, Hebrew, Persian and Urdu. In React Native the whole layout flips: rows run from right to left, navigation moves to the other side, and text aligns to the right.

React Native handles most of this automatically when the app runs in RTL mode, because [Yoga](/react-native-glossary/yoga) resolves `flexDirection: 'row'` relative to the layout direction. You control the mode with `I18nManager`:

```ts
import { I18nManager } from 'react-native';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true); // for testing an RTL layout
const isRTL = I18nManager.isRTL;
```

The direction is applied when the app starts, so changing it requires a full app restart, not a Fast Refresh. On Android, the manifest must also declare `android:supportsRtl="true"`, which the default template already does.

How to write styles that mirror correctly:

- Use `start` and `end` instead of `left` and `right`, and `marginStart`, `paddingEnd`, `borderStartWidth` and similar instead of their left and right versions. Physical `left` and `right` stay where they are.
- Use `textAlign: 'auto'` or omit it rather than `'left'`.
- Mirror directional icons, such as back arrows, chevrons and progress indicators, for example with `transform: [{ scaleX: -1 }]` when `isRTL` is true. Do not mirror logos, media controls or clocks.
- Absolute positions written with `left` will not flip, so overlays and badges are a frequent source of bugs.

The common misconception is that translating strings into Arabic is enough. Without testing in RTL mode, screens built with physical left and right values end up half mirrored. Gesture direction in custom swipes and carousels is another one to check, since users expect "next" to move the other way.

Force RTL in a development build early in a project; retrofitting it later means touching nearly every stylesheet. See [internationalisation](/react-native-glossary/internationalization) for the wider work.
