---
title: 'Flipper'
summary: 'Flipper is Meta’s desktop debugging platform for mobile apps, once bundled with every React Native project and removed from the default template in 0.74.'
aliases:
  - 'Flipper debugger'
related:
  - 'React Native DevTools'
  - 'Reactotron'
  - 'React DevTools'
  - 'CocoaPods'
updated: 2026-11-13
---

Flipper is a desktop app from Meta for inspecting and debugging iOS and Android apps through plugins. For several years every new React Native project shipped with it preinstalled, giving developers a network inspector, layout viewer, log viewer, database browser and crash reporter in one window.

React Native removed Flipper from the default project template in version 0.74, and [React Native DevTools](/react-native-glossary/react-native-devtools) became the official debugger in 0.76. If you start a project today, you will not meet Flipper unless you add it yourself.

Why it was dropped:

- It added native dependencies to every app, which slowed iOS builds and caused frequent [CocoaPods](/react-native-glossary/cocoapods) and build failures after Xcode updates.
- Meta moved its investment to a debugger built into React Native itself, connected directly to Hermes.
- Plugin quality varied and many React Native plugins went unmaintained.

You still meet it in two places. Older codebases may contain Flipper setup in the Podfile, `AppDelegate` or Android debug sources, which often breaks during upgrades. Removing it, following the diff in the Upgrade Helper, is usually the simplest fix. And years of blog posts and Stack Overflow answers say "open Flipper" for tasks that now belong elsewhere.

The common misconception is that removing Flipper means losing network inspection or state viewing. The replacements are React Native DevTools for console, breakpoints, memory and components, [Reactotron](/react-native-glossary/reactotron) for state and custom logging, and the network tooling built into recent DevTools versions or into Expo’s dev tools plugins.

Flipper itself continues as a general mobile debugging tool, but it is no longer part of the React Native story.
