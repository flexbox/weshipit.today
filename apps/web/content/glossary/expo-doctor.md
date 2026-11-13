---
title: 'Expo Doctor'
summary: 'Expo Doctor is a command-line check, run with npx expo-doctor, that finds dependency, config and native setup problems in an Expo project before they break a build.'
aliases:
  - 'npx expo-doctor'
related:
  - 'Expo SDK Version'
  - 'React Native Directory'
  - 'App Config'
  - 'Peer Dependencies'
  - 'EAS Build'
updated: 2026-11-13
---

Expo Doctor is a diagnostic tool for Expo projects. Running `npx expo-doctor` in the project folder performs a series of checks and prints each problem it finds with a suggested fix. It needs no install and no configuration.

```bash
npx expo-doctor
```

What it looks for:

- **Version mismatches.** Libraries whose versions do not match what your [Expo SDK version](/react-native-glossary/expo-sdk-version) expects, the most common cause of native build failures after an upgrade. `npx expo install --fix` usually resolves them.
- **Duplicate native modules.** Two copies of the same native package in `node_modules`, often from a nested dependency, which breaks builds or crashes at runtime.
- **Configuration conflicts.** For example, native fields in [app config](/react-native-glossary/app-config) that will be ignored because the project commits its own `ios/` and `android/` folders.
- **Library health.** Packages that [React Native Directory](/react-native-glossary/react-native-directory) marks as unmaintained, untested on the New Architecture or unknown.

It matters because these problems often surface far from their cause: a cryptic Gradle error, a crash on launch, or an [EAS Build](/react-native-glossary/eas-build) that fails after twenty minutes. Doctor finds them in seconds on your own machine.

Practical habits:

- Run it after every SDK upgrade and after adding a native dependency.
- Add it to CI. It exits with a failing status when a check fails, so it can block a merge before a broken build reaches the queue.
- When a warning is a deliberate choice, such as a library you know works despite its directory status, exclude it in your project configuration rather than learning to ignore the output.

The common mistake is reading a clean result as proof that the app works. Doctor checks setup and versions, not behaviour. A project can pass every check and still crash, so it complements testing on a device rather than replacing it.
