---
title: 'React Native Directory'
summary: 'React Native Directory is a searchable catalogue of React Native libraries showing platform support, New Architecture compatibility, maintenance activity and popularity.'
aliases:
  - 'reactnative.directory'
related:
  - 'Expo Doctor'
  - 'Native Module'
  - 'Legacy vs New Architecture'
  - 'Expo Go'
  - 'Peer Dependencies'
updated: 2026-11-13
---

React Native Directory is a community-run website, at reactnative.directory, that lists React Native libraries with the details you need before adding one to a project. It is the closest thing the ecosystem has to an official package index.

Each entry shows:

- **Platforms** supported: iOS, Android, web, and others such as Windows, macOS or TV.
- **New Architecture** compatibility.
- Whether it works in **[Expo Go](/react-native-glossary/expo-go)** or needs a development build.
- **Maintenance signals**: last release, recent commits, open issues and download counts, combined into a quality score.

It matters because choosing a library is one of the riskiest decisions in a React Native project. A package with native code that stops being maintained can block a React Native upgrade years later. Since the New Architecture became the default, compatibility with it is the first thing to check, and the directory shows it at a glance alongside alternatives.

[Expo Doctor](/react-native-glossary/expo-doctor) uses the same data to warn about dependencies that are unmaintained or untested on the New Architecture.

How it works: libraries are added by pull request to the directory’s GitHub repository, and most metadata is then fetched automatically from npm and GitHub. Maintainers can add details such as supported platforms themselves.

The common misconception is treating the directory as a guarantee. Some fields come from the library’s own maintainers, popularity does not equal quality, and "unmaintained" sometimes means "finished". Before adopting a [native module](/react-native-glossary/native-module), still open its repository, read recent issues, check it supports your React Native version and, ideally, try it in a throwaway project. Absence from the directory does not mean a library is bad either; it may simply never have been submitted.
