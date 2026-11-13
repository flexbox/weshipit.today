---
title: 'App Versioning'
summary: 'App versioning is managing the two numbers each store build carries: a user-facing version such as 1.4.0 and a build number that must increase with every upload.'
aliases:
  - 'versionCode'
  - 'buildNumber'
  - 'CFBundleVersion'
  - 'Version number'
related:
  - 'Runtime Version'
  - 'App Config'
  - 'Internal Testing Track'
  - 'App Store Connect'
updated: 2026-11-13
---

Every native build of a React Native app carries two separate numbers per platform, and the stores enforce rules on both:

| Purpose        | iOS                          | Android                    |
| -------------- | ---------------------------- | -------------------------- |
| Shown to users | `CFBundleShortVersionString` | `versionName`              |
| Build number   | `CFBundleVersion`            | `versionCode` (an integer) |

The **user-facing version** is up to you; most teams follow semantic versioning. The **build number** is what the stores actually compare. Google Play rejects any `versionCode` it has seen before, on any track. App Store Connect requires each upload to have a build number higher than the previous one for that version.

In an Expo project they live in the [app config](/react-native-glossary/app-config):

```json
{
  "expo": {
    "version": "1.4.0",
    "ios": { "buildNumber": "27" },
    "android": { "versionCode": 27 }
  }
}
```

In a bare project they are Xcode’s `MARKETING_VERSION` and `CURRENT_PROJECT_VERSION` build settings and the `defaultConfig` block of `android/app/build.gradle`. If you use Continuous Native Generation, edit the config, not the generated native files, or your change is overwritten.

The usual pain is remembering to bump the build number. Let tooling do it: EAS can store versions remotely (`appVersionSource: "remote"`) and increment them on each build with `autoIncrement`, and fastlane has actions for both platforms. Read build numbers from CI rather than from a developer’s machine so two people never upload the same number.

The common misconception is that an [over-the-air update](/react-native-glossary/over-the-air-update) changes the version. It does not; the binary keeps its numbers. What links updates to binaries is the [runtime version](/react-native-glossary/runtime-version), so keep the store version for native releases and track update versions separately.
