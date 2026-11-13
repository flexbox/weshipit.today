---
title: 'App Store Review'
summary: 'App Store Review is Apple’s check of every app version against the App Store Review Guidelines before release; failing it means a rejection you must fix and resubmit.'
aliases:
  - 'App review'
  - 'Review guidelines'
  - 'App rejection'
related:
  - 'App Store Connect'
  - 'TestFlight'
  - 'Over-the-Air Update'
  - 'Privacy Manifest'
updated: 2026-11-13
---

App Store Review is the step between submitting a version in [App Store Connect](/react-native-glossary/app-store-connect) and its release. Apple combines automated checks with a human reviewer who installs the build and tests it against the App Store Review Guidelines. Most reviews finish within a day or two.

Being a React Native app is not a problem in itself. Rejections come from the same places as for native apps, and a few appear again and again:

- **App completeness (2.1)**: crashes, placeholder content, broken links, or a login wall with no demo account in the review notes. Always provide working credentials.
- **Minimum functionality (4.2)**: an app that is mostly a website in a [WebView](/react-native-glossary/webview) is often rejected as offering nothing an app should.
- **Account deletion**: if users can create an account in the app, they must be able to delete it from within the app.
- **Payments (3.1.1)**: digital goods and subscriptions unlocked in the app generally have to use in-app purchase.
- **Privacy**: purpose strings for every permission, an accurate privacy label, and a valid [privacy manifest](/react-native-glossary/privacy-manifest) for the SDKs you ship.
- **Login services (4.8)**: offering only third-party social login can trigger a request to add a privacy-focused alternative such as Sign in with Apple.

React Native teams should also know where [over-the-air updates](/react-native-glossary/over-the-air-update) stand: Apple tolerates JavaScript updates that fix bugs or adjust content, but using them to change the app’s main purpose after review breaks the rules and risks removal.

When rejected, the reviewer’s message in the Resolution Center cites the guideline. You can reply, fix and resubmit, or appeal to the App Review Board. Replying calmly with a screen recording often resolves misunderstandings faster than a new build.

Google Play has its own review, mostly automated and policy-driven, so passing one store says little about the other. See the [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/).
