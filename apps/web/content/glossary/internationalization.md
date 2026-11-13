---
title: 'Internationalization'
summary: 'Internationalisation (i18n) is preparing a React Native app to support several languages and regions, and localisation (l10n) is adding the translations and formats.'
aliases:
  - 'i18n'
  - 'Localization'
  - 'l10n'
related:
  - 'Right-to-Left Layout'
  - 'Font Scaling'
  - 'App Config'
  - 'Info.plist'
updated: 2026-11-13
---

Internationalisation (i18n) is the work of making a React Native app adaptable to any language and region: no hard-coded strings, dates, numbers or layout assumptions. Localisation (l10n) is the follow-up of supplying translations and regional formats for each market you ship to.

React Native has no built-in translation system, so teams pick a library. Common choices are i18next with react-i18next, FormatJS (react-intl) and Lingui. To detect the user’s preferred languages and region, use `expo-localization` or `react-native-localize`. For formatting, the standard `Intl` API (`Intl.NumberFormat`, `Intl.DateTimeFormat` and others) is available in [Hermes](/react-native-glossary/hermes), although coverage of the newer Intl features can lag behind browsers, so check before relying on one.

```ts
const price = new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: 'EUR',
}).format(19.9);
```

Mobile adds work that web i18n guides miss:

- **Native strings.** Permission prompts in [Info.plist](/react-native-glossary/info-plist), the app name and notification text live outside JavaScript and must be localised natively, or through the `locales` field in Expo’s [app config](/react-native-glossary/app-config).
- **Store listings** in App Store Connect and Google Play are localised separately.
- **Per-app language.** iOS and recent Android versions let users pick a language for one app, so read the locale from the device instead of assuming the system language.
- **Locale changes at runtime** when the user switches settings while the app is in the background.

The most common mistakes are building sentences by concatenation ("You have " + n + " messages"), which breaks word order and plurals in other languages, and designing layouts that only fit English. German and French text often runs noticeably longer, and Arabic or Hebrew need a [right-to-left layout](/react-native-glossary/right-to-left). Use message formats with placeholders and plural rules, and test with a long pseudo-locale early.
