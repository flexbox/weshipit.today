---
title: 'Google Play Console'
summary: 'Google Play Console is Google’s web dashboard for publishing Android apps: it holds the store listing, release tracks, app signing, policy forms and Android vitals.'
aliases:
  - 'Play Console'
related:
  - 'Internal Testing Track'
  - 'Android App Bundle'
  - 'Staged Rollout'
  - 'EAS Submit'
updated: 2026-11-13
---

Google Play Console is where an Android build becomes a Play Store app. A developer account costs a one-time registration fee, and from there each app gets its own section for releases, listing, policy and quality data.

What a React Native developer does there:

- **Uploads releases** as [Android App Bundles](/react-native-glossary/android-app-bundle) to a track: internal, closed, open testing or production. See [internal testing track](/react-native-glossary/internal-testing-track).
- **Manages Play App Signing**, where Google holds the key that signs what users install and you sign uploads with a separate upload key.
- **Completes policy declarations**: the Data safety form, content rating questionnaire, target audience and, depending on the app, permission justifications.
- **Watches Android vitals**: crash rate, ANR rate and startup time from real devices. Crossing Google’s bad-behaviour thresholds can reduce the app’s visibility in the store.
- **Controls rollout** of production releases by percentage, the Android form of a [staged rollout](/react-native-glossary/staged-rollout).

Gotchas specific to Play:

- **The first upload must be manual.** The Play Developer API, which [EAS Submit](/react-native-glossary/eas-submit) and fastlane use, cannot upload until the app exists and has had a release in the console.
- **New personal developer accounts must run a closed test** with a minimum number of opted-in testers for a set period before they can apply for production access. Plan for this weeks before launch.
- Google requires apps to target a recent Android API level. When the deadline passes, you cannot publish updates until you raise `targetSdkVersion`, which in React Native usually means upgrading React Native or the Expo SDK.
- A rejected or suspended release blocks every track, so read policy emails promptly.

To automate uploads, create a Google Cloud service account, grant it access in Play Console and give its JSON key to your CI or EAS.
