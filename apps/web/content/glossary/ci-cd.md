---
title: 'CI/CD'
summary: 'CI/CD for React Native means automatically testing every change and building, signing and delivering iOS and Android binaries or OTA updates without manual steps.'
aliases:
  - 'Continuous integration'
  - 'Continuous delivery'
related:
  - 'EAS Workflows'
  - 'Fastlane'
  - 'Code Signing'
  - 'EAS Build'
  - 'End-to-End Testing'
updated: 2026-11-13
---

Continuous integration (CI) runs checks on every pull request; continuous delivery (CD) turns merged code into something users or testers can install. In React Native the CI half looks like any JavaScript project. The CD half is where mobile gets hard, because it involves two native toolchains, signing and two app stores.

A typical pipeline:

- **On each pull request**: install dependencies, run TypeScript, ESLint and Jest, and optionally build the app and run end-to-end tests on a simulator or emulator.
- **On merge**: build signed binaries, upload them to TestFlight and a Play testing track, and tag the release.
- **For JavaScript-only changes**: publish an over-the-air update to a channel instead of a store build.

Deciding between those last two automatically is the React Native-specific trick. Tools that hash the native parts of a project, such as Expo’s fingerprint, tell the pipeline whether native code changed and a new binary is needed.

Common runners are GitHub Actions, Bitrise, CircleCI and [EAS Workflows](/react-native-glossary/eas-workflows), which runs builds on Expo’s infrastructure. Mix and match: many teams run tests on GitHub Actions and hand builds to [EAS Build](/react-native-glossary/eas-build).

The gotchas:

- **iOS builds need macOS.** macOS runners are slower to start and cost several times more per minute than Linux ones, so run iOS builds only when needed.
- **Signing is the hardest part.** Certificates, provisioning profiles, the Android keystore and store API keys must live in CI secrets, never in the repository. [Fastlane](/react-native-glossary/fastlane) match and EAS managed credentials exist to solve exactly this; see [code signing](/react-native-glossary/code-signing).
- **Cache aggressively**: package manager cache, CocoaPods and Gradle. Uncached native builds are where most pipeline time goes.
- Pin Node, Xcode and Java versions so a runner image update does not break a release day.
