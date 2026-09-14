---
title: 'Core Components'
summary: 'Core components are the built-in building blocks React Native ships with — View, Text, Image, ScrollView, TextInput — each backed by a real native view on iOS and Android.'
aliases:
  - 'Built-in components'
related:
  - 'View Component'
  - 'JSX'
  - 'Host Platform'
  - 'FlatList'
updated: 2026-09-12
---

Core components are the ready-made components React Native ships with, each one wrapping a real platform widget rather than a web element. They are the vocabulary you build every screen from.

The [core set](https://reactnative.dev/docs/intro-react-native-components) is small on purpose:

| Component      | Renders on iOS | Renders on Android | Web equivalent     |
| -------------- | -------------- | ------------------ | ------------------ |
| `<View>`       | `UIView`       | `android.view`     | `<div>`            |
| `<Text>`       | `UITextView`   | `TextView`         | `<p>`              |
| `<Image>`      | `UIImageView`  | `ImageView`        | `<img>`            |
| `<ScrollView>` | `UIScrollView` | `ScrollView`       | scrollable `<div>` |
| `<TextInput>`  | `UITextField`  | `EditText`         | `<input>`          |

Two habits matter for newcomers. Text only renders inside `<Text>` — a bare string inside a `<View>` throws. And `<ScrollView>` renders all of its children at once, so for long lists reach for [FlatList](/react-native-glossary/flatlist) instead.

Everything else — buttons, sliders, switches, navigation — is either composed from these or installed from the ecosystem.
