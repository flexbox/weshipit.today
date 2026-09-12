---
title: 'View Component'
summary: 'View is the most basic layout container in React Native — the equivalent of a div on the web, a UIView on iOS and an android.view on Android.'
aliases:
  - 'View'
related:
  - 'Core Components'
  - 'Flexbox'
  - 'StyleSheet'
  - 'Yoga'
updated: 2026-09-12
---

`View` is the fundamental layout container in React Native. It draws nothing by itself; it exists to group children, apply layout, and carry styling such as background colour, padding, and borders. It maps to `UIView` on iOS, `android.view` on Android, and behaves roughly like a `<div>` on the web.

Every `View` is a [flexbox](/react-native-glossary/flexbox) container by default, and unlike the web the default `flexDirection` is `column`, not `row`. Views nest freely, and nesting is how you build layout:

```jsx
<View style={{ flex: 1, padding: 16 }}>
  <View style={{ flexDirection: 'row', gap: 8 }}>
    <Text>Left</Text>
    <Text>Right</Text>
  </View>
</View>
```

Deeply nested views used to cost real performance on the old architecture. With the [Fabric renderer](/react-native-glossary/fabric-renderer) the cost is far lower, but a flatter tree is still easier to reason about.

See the [View documentation](https://reactnative.dev/docs/view) for the full prop list.
