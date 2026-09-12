---
title: 'React Elements'
summary: 'A React element is a lightweight plain-object description of what should appear on screen. React compares elements between renders to work out the smallest native update.'
aliases:
  - 'Elements'
  - 'Virtual DOM node'
related:
  - 'JSX'
  - 'Props and State'
  - 'Keys'
  - 'Fabric Renderer'
updated: 2026-09-12
---

A React element is a plain JavaScript object describing what you want on screen — a type, some props, and children. It is a description, not the thing itself: creating an element costs almost nothing and touches no native view.

`<Text>Hello</Text>` compiles to roughly:

```js
{ type: Text, props: { children: 'Hello' } }
```

On each render React builds a fresh tree of these objects and diffs it against the previous one. Only the differences are turned into real native operations, which is why re-rendering a component is cheap and re-creating a native `UIView` is not.

Two distinctions newcomers conflate: a **component** is the function you write, an **element** is what calling it produces, and an **instance** is the native view the [Fabric renderer](/react-native-glossary/fabric-renderer) eventually mounts. [Keys](/react-native-glossary/keys) are what let React match elements across renders inside a list.

See [createElement](https://react.dev/reference/react/createElement) for the underlying API.
