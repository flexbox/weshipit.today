---
title: 'Over-the-Air Update'
summary: 'An over-the-air update ships new JavaScript and assets straight to installed apps, skipping app store review. Native code changes still require a new store build.'
aliases:
  - 'OTA update'
  - 'EAS Update'
  - 'CodePush'
  - 'Hot update'
related:
  - 'JavaScript Bundle'
  - 'EAS'
  - 'Native Module'
  - 'Metro'
updated: 2026-09-12
---

An over-the-air (OTA) update delivers a new [JavaScript bundle](/react-native-glossary/javascript-bundle) and its assets to apps already installed on devices, without going through App Store or Play review. The app downloads the new bundle and runs it on next launch.

The line that decides whether an OTA update is possible is exact:

| Change                                                         | Ships over the air?  |
| -------------------------------------------------------------- | -------------------- |
| Component, screen, business logic                              | Yes                  |
| Styles, copy, images bundled as assets                         | Yes                  |
| Adding a [native module](/react-native-glossary/native-module) | No — new store build |
| Upgrading the React Native version                             | No                   |
| Permissions, app icon, entitlements                            | No                   |

The main implementations are **EAS Update** (part of [EAS](/react-native-glossary/eas)) and, historically, Microsoft's CodePush, which was retired in 2025.

Two constraints newcomers should know: both Apple and Google permit OTA updates for bug fixes and content, but not to substantially change what the app does. And the update must match the installed binary's runtime version — shipping a bundle that calls a native module the binary lacks crashes the app.
