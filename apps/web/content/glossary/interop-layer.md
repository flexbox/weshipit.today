---
title: 'Interop Layer'
summary: 'The interop layer lets native modules and view components written for the legacy architecture run unchanged inside a New Architecture React Native app.'
aliases:
  - 'New Architecture interop'
related:
  - 'Legacy vs New Architecture'
  - 'Bridgeless Mode'
  - 'TurboModules'
  - 'Fabric Native Component'
  - 'React Native Directory'
updated: 2026-11-13
---

The interop layer is compatibility code inside React Native that runs libraries built for the legacy architecture on top of the New Architecture. A native module written against the old bridge API, or a view component registered for the old Paper renderer, is wrapped so that [TurboModules](/react-native-glossary/turbomodules) and Fabric can call it without the library author changing a line.

It exists because the ecosystem could not migrate overnight. Thousands of packages expose native code, and many are maintained by one person or not at all. Without the interop layer, turning on the New Architecture would have required every dependency to ship a rewrite first. With it, apps could switch and migrate dependencies one at a time. It has been enabled automatically for both modules and components since the New Architecture became the default.

What you should expect from it:

- **Most legacy modules and components just work**, including events and props.
- **No New Architecture benefits for those libraries.** A wrapped module does not get [Codegen](/react-native-glossary/codegen) type checking, and a wrapped view does not take part in Fabric features the way a real [Fabric Native Component](/react-native-glossary/fabric-native-component) does.
- **Edge cases fail.** Code that reaches into the bridge directly, relies on synchronous `UIManager` calls, or manipulates the native view hierarchy behind React’s back is the usual source of crashes, missing views or layout glitches.

The common mistake is treating "it works through interop" as the end state. It is a transition aid, and React Native has been steadily removing legacy code paths. When you audit dependencies before an upgrade, prefer packages that implement the New Architecture natively — [React Native Directory](/react-native-glossary/react-native-directory) shows this for each library — and treat interop-only packages as candidates for replacement or a contribution upstream.
