---
title: 'Staged Rollout'
summary: 'A staged rollout releases a new app version to a growing percentage of users over time, so a crash or bug reaches a small group before everyone receives it.'
aliases:
  - 'Phased release'
  - 'Percentage rollout'
related:
  - 'Google Play Console'
  - 'App Store Connect'
  - 'Crash Reporting'
  - 'EAS Update'
updated: 2026-11-13
---

A staged rollout limits how many users get a new release, then widens it as confidence grows. Both stores support it for store builds, and over-the-air update services offer the same idea for JavaScript updates, but the three behave differently.

**Google Play staged rollout.** In [Google Play Console](/react-native-glossary/google-play-console) you release to production at a percentage you choose, say 5%, then raise it whenever you like. You can **halt** a rollout, which stops new users receiving it.

**Apple phased release.** In [App Store Connect](/react-native-glossary/app-store-connect) a phased release spreads an update over seven days on a fixed schedule, starting at 1% of users and ending at 100%. You can pause it, release to everyone early, but not pick the percentages. It only affects users with automatic updates turned on; anyone can still download the new version from the App Store at any time.

**Over-the-air updates.** Services such as [EAS Update](/react-native-glossary/eas-update) can roll out a new JavaScript bundle to a percentage of users and, unlike the stores, roll it back by pointing users to the previous update.

The misconception that causes trouble: halting is not rolling back. Users who already installed the faulty store version keep it. On both stores the only fix is a new build with a higher version number. That is why many React Native teams pair a slow store rollout with OTA updates for fast JavaScript fixes.

A rollout is only useful if someone is watching. Before widening, compare the new version’s crash-free sessions in your [crash reporting](/react-native-glossary/crash-reporting) tool and ANR rate in Android vitals against the previous release. A 1% rollout with no monitoring is just a slow release.
