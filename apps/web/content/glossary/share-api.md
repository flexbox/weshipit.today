---
title: 'Share API'
summary: 'Share is the React Native API that opens the native share sheet so users can send a message or link to other apps, returning a promise that reports the outcome.'
aliases:
  - 'Share sheet'
related:
  - 'Linking API'
  - 'Expo'
  - 'Deep Linking'
  - 'Platform-Specific Code'
updated: 2026-11-13
---

`Share` is the core API that opens the system share sheet: the `UIActivityViewController` on iOS and the Android share chooser. One call lets the user send content to Messages, WhatsApp, email, notes or any app that accepts shares.

```js
const result = await Share.share({
  message: 'Join me on the app',
  url: 'https://example.com/invite/abc', // iOS only
  title: 'Invite', // Android only
});
if (result.action === Share.sharedAction) track('invite_shared');
```

The content object is less portable than it looks:

- `message` works on both platforms and is the safe default.
- `url` is **iOS only**. On Android it is ignored, so put the link inside `message` if it must appear everywhere.
- `title` is Android only and sets the chooser’s title; `subject` is used by email targets.
- iOS-specific options include `excludedActivityTypes` to hide targets such as “Add to Reading List”.

The returned promise resolves with `sharedAction` or `dismissedAction`. That result is **not reliable analytics** on Android, where the promise always resolves with `sharedAction`, whether or not the user actually sent anything. iOS can also tell you which activity was chosen.

The biggest limitation is files. The core API shares text and links, not images, PDFs or videos from local storage on Android. For that, use `expo-sharing` from [Expo](/react-native-glossary/expo), which shares a local file URI on both platforms, or the community library react-native-share for richer options.

Shared links are only useful if they open the right screen. Pair the share sheet with proper [deep linking](/react-native-glossary/deep-linking), ideally verified https links, so a recipient who taps an invite lands inside the app, or on a web page when it is not installed, rather than on a dead custom scheme.
