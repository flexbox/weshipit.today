---
title: 'App Store Connect'
summary: 'App Store Connect is Apple’s web portal for publishing iOS apps: you create the app record, upload builds, run TestFlight, write the listing and submit for review.'
aliases:
  - 'ASC'
  - 'iTunes Connect'
related:
  - 'TestFlight'
  - 'App Store Review'
  - 'EAS Submit'
  - 'Bundle Identifier'
updated: 2026-11-13
---

App Store Connect is where an iOS build becomes an App Store app. It was called iTunes Connect until 2018, which is why older guides and some error messages still use that name. Using it requires a paid Apple Developer Program membership.

A React Native release passes through it in a fixed order:

1. Register the [bundle identifier](/react-native-glossary/bundle-identifier) in the developer portal, then create an **app record** in App Store Connect that uses it.
2. Upload a signed [IPA](/react-native-glossary/ipa) from Xcode, Apple’s Transporter app, fastlane or [EAS Submit](/react-native-glossary/eas-submit). The build then spends some minutes "processing" before it appears.
3. Distribute it to testers through [TestFlight](/react-native-glossary/testflight).
4. Fill in the version’s metadata: screenshots, description, keywords, privacy details, age rating.
5. Attach the build and submit it for review.

It also holds sales, crash and usage analytics, pricing, in-app purchase products and team roles.

For automation, create an **App Store Connect API key** (a `.p8` file with a key ID and issuer ID). EAS, fastlane and CI pipelines use it to upload builds without anyone’s Apple ID or two-factor code. Keep it out of the repository; anyone holding it can act on your apps.

Gotchas that slow first releases:

- Every upload needs a build number higher than the last one for that version, or it is rejected.
- Builds can sit as "Missing Compliance" until you answer the encryption question. Setting `ITSAppUsesNonExemptEncryption` in Info.plist answers it once for every build.
- The app record’s name is reserved globally, so a name another developer already uses is unavailable.
