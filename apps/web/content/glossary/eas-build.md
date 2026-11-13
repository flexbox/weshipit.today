---
title: 'EAS Build'
summary: 'EAS Build is Expo’s cloud build service: it compiles and signs your React Native app into an installable .ipa, .apk or .aab on hosted macOS and Linux machines.'
aliases:
  - 'Cloud build'
related:
  - 'EAS'
  - 'Code Signing'
  - 'Development Build'
  - 'EAS Submit'
  - 'Environment Variables'
updated: 2026-11-13
---

EAS Build is the part of [EAS](/react-native-glossary/eas) that turns a React Native project into a signed binary. You run one command, the CLI uploads your project, and a hosted machine (macOS for iOS, Linux for Android) installs dependencies, generates native folders if needed, compiles, signs and hands you back an artefact.

```bash
eas build --platform ios --profile production
eas build --platform android --profile preview --local
```

What it takes off your plate is mostly [code signing](/react-native-glossary/code-signing). EAS can create and store iOS distribution certificates, provisioning profiles and the Android upload keystore, so a new teammate or a CI job builds without anyone emailing a `.p12` file around. `eas credentials` lets you inspect or replace them.

How a build behaves is set per profile in `eas.json`:

- **`distribution: "internal"`** gives an ad hoc iOS build or an `.apk` you can install from a link. On iOS each test device must be registered first (`eas device:create`).
- **`developmentClient: true`** produces a [development build](/react-native-glossary/development-build).
- **`autoIncrement`** bumps the build number for you, so store uploads stop failing on a duplicate version code.

The gotcha that catches most teams: the build server only sees what is uploaded, and by default that follows your `.gitignore`. A local `.env` file, a generated config or a secret JSON file that is ignored by git simply does not exist on the build machine, so the build succeeds locally and fails (or silently misbehaves) in the cloud. Declare those values as EAS [environment variables](/react-native-glossary/environment-variables) or secret files instead.

The `--local` flag runs the same build pipeline on your own machine, which is the fastest way to debug a cloud-only failure. See the [EAS Build docs](https://docs.expo.dev/build/introduction/).
