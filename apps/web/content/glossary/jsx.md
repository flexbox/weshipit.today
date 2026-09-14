---
title: 'JSX'
summary: 'JSX is a syntax extension for JavaScript that lets you write UI markup directly inside component code. React Native compiles it to plain function calls.'
aliases:
  - 'JavaScript XML'
related:
  - 'React Elements'
  - 'Core Components'
  - 'Props and State'
updated: 2026-09-12
---

JSX is a syntax extension for JavaScript that lets you describe a screen using tag syntax inside your component code. It looks like HTML, but it is neither HTML nor a template language — a compiler rewrites every tag into a plain function call that returns a [React element](https://react.dev/learn/writing-markup-with-jsx).

In React Native the tags are not DOM tags. `<View>` and `<Text>` are [core components](/react-native-glossary/core-components) that map to real native views, so `<View><Text>Hi</Text></View>` becomes a native `UIView` on iOS and a `ViewGroup` on Android.

Three rules trip up newcomers:

- Every expression goes in braces: `<Text>{user.name}</Text>`.
- A component returns one root element — wrap siblings in a `<View>` or a fragment (`<>…</>`).
- Attributes use camelCase, and styles are objects, not strings: `style={{ marginTop: 8 }}`.

You can write React Native without JSX by calling `React.createElement` yourself, but effectively nobody does.
