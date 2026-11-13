---
title: 'Alert'
summary: 'Alert is the React Native API that shows a native system dialog with a title, message and up to a few buttons, using UIAlertController on iOS and AlertDialog on Android.'
aliases:
  - 'Alert.alert'
  - 'Native dialog'
related:
  - 'Modal'
  - 'Platform-Specific Code'
  - 'React Native Web'
  - 'Appearance'
updated: 2026-11-13
---

`Alert` is the core API for native dialogs. `Alert.alert(title, message, buttons, options)` shows the platform’s own dialog, `UIAlertController` on iOS and an `AlertDialog` on Android, so it matches system styling and dark mode without any work.

```js
Alert.alert('Delete project?', 'This cannot be undone.', [
  { text: 'Cancel', style: 'cancel' },
  { text: 'Delete', style: 'destructive', onPress: deleteProject },
]);
```

Behaviour differs per platform more than the one-line API suggests:

- **Button styles** `cancel` and `destructive` affect presentation on iOS (bold, red). Android ignores them.
- **Button count**: Android shows at most three buttons (neutral, negative, positive). Extra ones are dropped.
- **Dismissal**: on Android the user can tap outside or press back if you pass `{ cancelable: true }`, and `onDismiss` tells you it happened. iOS alerts can only be closed with a button.
- **`Alert.prompt`**, which asks for text input, exists on **iOS only**.

`Alert.alert` is fire-and-forget: it returns immediately rather than waiting for the user. If you want `await confirm()`, wrap it in a Promise that resolves from each button’s `onPress`.

```js
const confirm = (title) =>
  new Promise((resolve) =>
    Alert.alert(title, undefined, [
      { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
      { text: 'OK', onPress: () => resolve(true) },
    ]),
  );
```

The common gotcha is cross-platform reach. On [React Native Web](/react-native-glossary/react-native-web), `Alert` does nothing at all, so a confirmation that guards a destructive action silently disappears. Wrap it in your own helper with a web fallback.

For anything beyond a short question, such as custom layout, images, forms or branded styling, build a [Modal](/react-native-glossary/modal) or bottom sheet instead. Alerts work best when they are rare, short and native.
