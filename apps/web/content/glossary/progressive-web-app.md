---
title: 'Progressive Web App'
summary: 'A Progressive Web App (PWA) is a website that can be installed to the home screen and work offline, using a web app manifest and a service worker instead of a store.'
aliases:
  - 'PWA'
related:
  - 'React Native Web'
  - 'Hybrid App'
  - 'Offline-First'
  - 'Native App'
updated: 2026-11-13
---

A Progressive Web App (PWA) is a website built to behave like an installed app. A web app manifest gives it a name, icon and full-screen display mode so users can add it to their home screen, and a service worker caches assets and data so it can load offline and, where supported, receive push notifications.

For a React Native team, PWAs come up in two ways.

First, as an alternative. A PWA skips App Store and Google Play review, updates instantly, and is reachable through a URL. In exchange it runs in the browser, has limited or no access to many device APIs (Bluetooth, background tasks, widgets and deeper system integration vary by browser), and is less discoverable for people who look for apps in a store. Support is notably uneven on iOS, where installation and web push have historically arrived later and with more restrictions than on Android.

Second, as an extra target. With [React Native Web](/react-native-glossary/react-native-web), often through Expo’s web support, the same components can run in the browser. Turning that web build into a PWA is a separate step: you add the manifest and a service worker yourself, just as for any web app. Shared code makes this practical, but it is not automatic.

The common misconception is that a PWA is a cheaper version of the same product. It is a different distribution model with different limits. It suits tools people open from a link, internal apps and content sites. It suits less well apps that depend on reliable push, background work, payments through store billing, or deep OS features.

Many products ship both: a PWA for reach and a React Native app for engaged users. Design the [offline-first](/react-native-glossary/offline-first) data layer once and both benefit.
