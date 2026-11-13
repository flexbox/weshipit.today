---
title: 'Fabric Native Component'
summary: 'A Fabric Native Component is a platform view, such as a map or video player, exposed to React Native as a component through a Codegen spec and the Fabric renderer.'
aliases:
  - 'Native component'
  - 'requireNativeComponent'
related:
  - 'Fabric Renderer'
  - 'Codegen'
  - 'Interop Layer'
  - 'Native Module'
  - 'Expo Modules API'
updated: 2026-11-13
---

A Fabric Native Component is a native view — a `UIView` subclass on iOS, an Android `View` — that you render from JavaScript like any other component. It is how libraries ship maps, video players, camera previews and charts that cannot be built from React Native’s core components. Where a [native module](/react-native-glossary/native-module) exposes functions, a native component exposes a view with props and events.

Under the New Architecture you describe it in a TypeScript spec file whose name ends in `NativeComponent`:

```ts
// CustomWebViewNativeComponent.ts
import type { ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

interface NativeProps extends ViewProps {
  sourceURL?: string;
}

export default codegenNativeComponent<NativeProps>('CustomWebView');
```

[Codegen](/react-native-glossary/codegen) generates the C++ props, event emitter and shadow node, plus the platform interfaces your Objective-C++ or Kotlin view implements. The [Fabric renderer](/react-native-glossary/fabric-renderer) then creates and updates the real view as part of its normal render pipeline, including layout through Yoga.

The legacy equivalent was `requireNativeComponent('CustomWebView')` with view managers registered over the bridge. That still appears in older libraries and runs through the [interop layer](/react-native-glossary/interop-layer), but new components should use a Codegen spec.

Gotchas that catch first-time authors:

- **A spec change needs a native rebuild.** Adding a prop means Codegen has to run again; Fast Refresh cannot pick it up.
- **Props are typed for Codegen, not for TypeScript in general.** Only a subset is understood: no `any` or arbitrary unions, and numbers are declared with Codegen types such as `Int32` and `Double`, events with `DirectEventHandler`.
- **Sizing.** Native views without an intrinsic size from the layout system get zero height. Give them an explicit size or `flex` in style.
- **Commands need declaring.** Imperative calls such as `play()` are declared with `codegenNativeCommands`, not by calling methods on a ref.

In Expo projects the Expo Modules API offers an alternative way to write native views with less boilerplate.
