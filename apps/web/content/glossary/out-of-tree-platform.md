---
title: 'Out-of-Tree Platform'
summary: 'An out-of-tree platform is a React Native target maintained outside the core repository, such as React Native Windows, React Native macOS or react-native-tvos.'
aliases:
  - 'React Native Windows'
  - 'React Native macOS'
  - 'react-native-tvos'
related:
  - 'Host Platform'
  - 'Platform-Specific Code'
  - 'Cross-Platform Development'
  - 'React Native Web'
updated: 2026-11-13
---

An out-of-tree platform is a React Native target that lives outside the main `facebook/react-native` repository. Core React Native ships iOS and Android; other targets are built and released separately by companies or the community, reusing React and the core renderer while supplying their own [host platform](/react-native-glossary/host-platform) implementation.

The best-known examples:

- **React Native Windows** and **React Native macOS**, maintained by Microsoft for desktop apps.
- **react-native-tvos**, a community-maintained fork that adds Apple TV and Android TV support, including focus-based navigation for remotes.
- **React Native visionOS**, a community project for Apple Vision Pro.

[React Native Web](/react-native-glossary/react-native-web) is related but different: it reimplements React Native’s components on top of the DOM rather than plugging a native platform into the core renderer.

In practice an out-of-tree platform behaves much like iOS and Android from your code’s point of view. `Platform.OS` reports values such as `'windows'` or `'macos'`, and [Metro](/react-native-glossary/metro) can resolve platform extensions like `Button.windows.tsx`, so [platform-specific code](/react-native-glossary/platform-specific-code) works the same way.

The gotchas are about timing and libraries:

- Out-of-tree platforms follow core releases, so a new React Native version may take a while to be supported there. Check before upgrading.
- Third-party native libraries only work on a platform if their authors added native code for it. A package that supports iOS and Android often has no Windows or macOS implementation.
- react-native-tvos is installed in place of `react-native`, usually through a package alias in `package.json`, rather than alongside it.

Check each library’s supported platforms before committing to a desktop or TV target.
