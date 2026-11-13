---
title: 'EAS Update'
summary: 'EAS Update is Expo’s hosted over-the-air update service: the expo-updates library in your app downloads new JavaScript and assets published with eas update.'
aliases:
  - 'expo-updates'
related:
  - 'Over-the-Air Update'
  - 'Runtime Version'
  - 'Update Channel'
  - 'EAS'
  - 'Staged Rollout'
updated: 2026-11-13
---

EAS Update is Expo’s implementation of an [over-the-air update](/react-native-glossary/over-the-air-update). It has two halves: the `expo-updates` library compiled into your app, and the hosted service you publish to with `eas update`. This entry is about how that particular service behaves.

```bash
eas update --channel production --message "Fix checkout total"
```

Every update is tagged with a [runtime version](/react-native-glossary/runtime-version), and a build only ever downloads updates whose runtime version matches its own. Builds find their updates through an [update channel](/react-native-glossary/update-channel), which points at a branch of published updates.

The default loading behaviour surprises people. On launch, `expo-updates` checks for a newer update and downloads it in the background, but the app keeps running the bundle it already has. The new code only runs on the **next cold start**. So a user who opens the app once after you publish sees the old version, and closing it from the app switcher is what picks up the fix. To apply critical fixes sooner, check yourself and reload:

```ts
import * as Updates from 'expo-updates';

const { isAvailable } = await Updates.checkForUpdateAsync();
if (isAvailable) {
  await Updates.fetchUpdateAsync();
  await Updates.reloadAsync();
}
```

Other things that work differently from a plain bundle swap:

- Updates are disabled in development, so test them with a preview or production build.
- You can roll an update out to a percentage of users, and `eas update:rollback` points devices back to the previous update or the embedded bundle.
- The bundle shipped inside the binary is itself an update, which is what devices fall back to.

See the [EAS Update docs](https://docs.expo.dev/eas-update/introduction/).
