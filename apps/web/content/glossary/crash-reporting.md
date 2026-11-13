---
title: 'Crash Reporting'
summary: 'Crash reporting captures errors and crashes from users’ devices with stack traces and context, so a React Native team can fix problems it never reproduced locally.'
aliases:
  - 'Sentry'
  - 'Crashlytics'
  - 'Crash reports'
related:
  - 'Source Maps'
  - 'Error Boundary'
  - 'R8 and ProGuard'
  - 'Release Build'
updated: 2026-11-13
---

Crash reporting means installing an SDK that records errors on users’ devices and sends them, with a stack trace, device details and recent breadcrumbs, to a dashboard. The common choices in React Native are Sentry (`@sentry/react-native`), Firebase Crashlytics through React Native Firebase, and Bugsnag.

React Native apps fail in two layers, and a useful tool covers both:

- **JavaScript errors**: an unhandled exception in your code. In a [release build](/react-native-glossary/release-build), a fatal JavaScript error closes the app, so it looks like a crash to the user.
- **Native crashes**: an exception or signal in Objective-C, Swift, Java, Kotlin or C++ code, often from a library or the framework itself, plus ANRs (frozen apps) on Android.

The step teams skip is **symbolication**. Production code is minified and compiled, so raw stack traces are unreadable. Each layer needs its own file uploaded for every build:

- JavaScript: [source maps](/react-native-glossary/source-maps), composed with Hermes’s own map when bytecode is used.
- iOS: dSYM files from the archive.
- Android: the `mapping.txt` from [R8](/react-native-glossary/r8-proguard).

Upload them automatically from CI or your build service, or you will receive thousands of reports reading `index.android.bundle:1:84721`.

Over-the-air updates add a twist: each update ships a new bundle, so it needs its own source maps and should be tagged as its own release. Otherwise errors from an update are attributed to the store version and mapped against the wrong code.

Tag reports with the release, the update id and the user’s app version, and wrap screens in an [error boundary](/react-native-glossary/error-boundary) that reports the error and shows a fallback instead of a blank screen. The crash-free sessions rate those tools compute is also the signal to watch during a staged rollout.
