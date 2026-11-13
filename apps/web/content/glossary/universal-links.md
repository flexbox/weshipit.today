---
title: 'Universal Links'
summary: 'Universal Links are Apple’s verified https links that open your iOS app when installed and your website when not, proven by an apple-app-site-association file.'
aliases:
  - 'iOS universal links'
  - 'apple-app-site-association'
related:
  - 'Deep Linking'
  - 'Android App Links'
  - 'Entitlements'
  - 'Bundle Identifier'
updated: 2026-11-13
---

Universal Links are ordinary `https://` URLs that iOS routes to your app instead of Safari, once Apple has verified that you control both the domain and the app. They are the iOS half of public [deep linking](/react-native-glossary/deep-linking); the Android equivalent is [Android App Links](/react-native-glossary/android-app-links).

Verification needs two pieces that point at each other:

- An **Associated Domains** [entitlement](/react-native-glossary/entitlements) in the app, such as `applinks:example.com`. In Expo this is `ios.associatedDomains` in the app config.
- An **apple-app-site-association** (AASA) file on the domain at `/.well-known/apple-app-site-association`, served over HTTPS with no redirects and a JSON content type, with no `.json` extension.

```json
{
  "applinks": {
    "details": [{ "appIDs": ["ABCDE12345.com.example.app"], "components": [{ "/": "/post/*" }] }]
  }
}
```

The app ID is your Team ID followed by the [bundle identifier](/react-native-glossary/bundle-identifier). A typo in either fails silently.

Once the link reaches the app, React Native handles it like any other deep link, through the same navigation `linking` config.

The gotchas that make Universal Links feel broken when they are not:

- **Apple caches the AASA file** through its own CDN, so a fixed file can take a while to be picked up. Changes are not instant.
- **Typing or pasting the URL into Safari’s address bar** does not open the app. Neither does tapping a link to the same domain while already on that site. Test from Notes or Messages.
- If the user long-presses and chooses to open in Safari, iOS remembers that choice for the domain.
- A wildcard path that also matches your login or password-reset pages will hijack them into the app.

Keep a working web page at every linked path: users without the app installed will land there.
