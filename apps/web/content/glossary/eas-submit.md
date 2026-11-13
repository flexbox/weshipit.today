---
title: 'EAS Submit'
summary: 'EAS Submit is Expo’s service for uploading a finished React Native binary to App Store Connect or Google Play from the command line or CI, without opening Xcode.'
aliases:
  - 'Store submission'
related:
  - 'EAS'
  - 'EAS Build'
  - 'App Store Connect'
  - 'Google Play Console'
  - 'TestFlight'
updated: 2026-11-13
---

EAS Submit is the part of [EAS](/react-native-glossary/eas) that takes a built `.ipa` or `.aab` and uploads it to the stores. It replaces dragging a file into Transporter or clicking through the Play Console upload form, and works with binaries from [EAS Build](/react-native-glossary/eas-build) or ones you built yourself.

```bash
eas submit --platform ios --latest
eas build --platform all --profile production --auto-submit
```

It authenticates differently on each store:

- **iOS** uses an App Store Connect API key, which EAS can generate and store for you. The binary lands in [App Store Connect](/react-native-glossary/app-store-connect), processes, and appears in [TestFlight](/react-native-glossary/testflight).
- **Android** uses a Google Cloud service account JSON key with access to your Play developer account. A `submit` profile in `eas.json` chooses the track (`internal`, `alpha`, `beta`, `production`) and release status.

Two misconceptions are worth clearing up. First, “submit” means upload, not review: on iOS you still pick the build, fill in release notes and press **Submit for Review** in App Store Connect, and on Android a `draft` release still has to be rolled out. Second, the very first Android upload for a new app cannot go through the API. Google requires one manual upload in the Play Console before any automated tool, EAS Submit included, can push to that package name.

Most teams end up chaining build and submit, either with `--auto-submit` or as two jobs in a pipeline, so a merge to `main` ends with a binary waiting in TestFlight and the Play internal testing track. See the [EAS Submit docs](https://docs.expo.dev/submit/introduction/).
