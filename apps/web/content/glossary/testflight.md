---
title: 'TestFlight'
summary: 'TestFlight is Apple’s beta testing service: builds uploaded to App Store Connect are installed by internal and external testers through the TestFlight app before release.'
aliases:
  - 'iOS beta testing'
related:
  - 'App Store Connect'
  - 'App Store Review'
  - 'Internal Testing Track'
  - 'EAS Submit'
updated: 2026-11-13
---

TestFlight is how iOS apps reach testers before the App Store. You upload a build to [App Store Connect](/react-native-glossary/app-store-connect), invite people, and they install it through Apple’s TestFlight app. It is the iOS counterpart of Google Play’s [testing tracks](/react-native-glossary/internal-testing-track).

There are two kinds of tester:

- **Internal testers** are members of your App Store Connect team, up to 100. Builds reach them as soon as processing finishes, with no review.
- **External testers** are anyone else, up to 10,000, invited by email or through a public link. The first build of each version goes through a lighter Beta App Review before they can install it.

Builds expire 90 days after upload, so a long-running beta needs fresh uploads.

What makes TestFlight valuable for React Native teams is that the build is the real thing: release-signed, with the JavaScript bundled into the app, not loaded from Metro. It is where you catch problems that only appear in a [release build](/react-native-glossary/release-build), such as a missing environment variable or a crash on startup that debug builds hide.

Common surprises:

- TestFlight builds use Apple’s **production** push notification environment. A backend still sending to the sandbox environment makes notifications silently fail in TestFlight even though they worked in development.
- Testers report feedback and screenshots from inside the TestFlight app, and crash reports appear in App Store Connect and Xcode’s Organizer.
- Uploading with [EAS Submit](/react-native-glossary/eas-submit) or fastlane still needs a unique build number every time.

For quick internal builds that do not need Apple processing at all, an ad hoc or internal-distribution development build is often faster; use TestFlight when you want the build your users will actually get.
