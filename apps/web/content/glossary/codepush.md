---
title: 'CodePush'
summary: 'CodePush was Microsoft’s over-the-air update service for React Native, part of App Center, pushing new JavaScript to installed apps until its retirement in March 2025.'
aliases:
  - 'Microsoft CodePush'
  - 'App Center'
related:
  - 'Over-the-Air Update'
  - 'EAS Update'
  - 'Runtime Version'
  - 'JavaScript Bundle'
updated: 2026-11-13
---

CodePush was the service that made [over-the-air updates](/react-native-glossary/over-the-air-update) mainstream in React Native. Developers released a new [JavaScript bundle](/react-native-glossary/javascript-bundle) with a CLI command, and the `react-native-code-push` library inside the app downloaded it and applied it on the next restart or immediately. It ran as part of Microsoft’s **App Center**, which was retired on **31 March 2025**, taking the hosted CodePush service with it.

Its vocabulary still shows up in older codebases and job descriptions:

- **Deployments** such as Staging and Production, each with its own key baked into the binary.
- **Target binary version**: the store version an update was compatible with, the same idea Expo calls a [runtime version](/react-native-glossary/runtime-version).
- **Mandatory updates**, rollout percentages, and **automatic rollback** if an update crashed before signalling success.
- `codePush.sync()`, the call that checked for, downloaded and installed an update.

Why it still matters: apps released before the shutdown may still contain the SDK, calling a service that no longer answers. Nothing visibly breaks, but those apps can no longer receive hotfixes, which a team usually discovers on the day it urgently needs one. If you inherit such an app, plan the migration before the next incident.

The common replacements:

- **[EAS Update](/react-native-glossary/eas-update)**, Expo’s hosted service, which works in bare React Native projects as well as Expo ones.
- **Self-hosting** a CodePush-compatible server, including the server code Microsoft published as open source ahead of the retirement, or one of several third-party services built to accept existing CodePush clients.

Whichever you choose, switching requires a new store build, because the update client lives in native code. Users stay on the old client until they install it.
