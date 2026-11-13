---
title: 'Switch'
summary: 'Switch is React Native’s core on/off toggle, rendering UISwitch on iOS and a Material switch on Android, driven by a value prop and an onValueChange callback.'
aliases:
  - 'Toggle'
related:
  - 'Controlled Component'
  - 'Accessibility Role'
  - 'Core Components'
  - 'Platform-Specific Code'
updated: 2026-11-13
---

`Switch` is the core component for a boolean toggle. It renders the native control, `UISwitch` on iOS and a Material switch on Android, so it gets the platform’s look, haptics and accessibility behaviour for free.

It is a [controlled component](/react-native-glossary/controlled-component): it displays whatever `value` you pass and reports taps through `onValueChange`.

```jsx
<Switch value={notificationsOn} onValueChange={setNotificationsOn} trackColor={{ false: '#d4d4d8', true: '#22c55e' }} thumbColor="#ffffff" ios_backgroundColor="#d4d4d8" />
```

If you forget to update state in `onValueChange`, the switch animates across and then **snaps back**, because the next render still says `false`. That snap-back is the classic sign of a missing state update, and also what users see when an optimistic toggle is reverted after a failed API call.

Styling is limited on purpose:

- `trackColor` takes separate `false` and `true` colours.
- `thumbColor` sets the knob.
- `ios_backgroundColor` fills the track on iOS when it is off, which `trackColor.false` alone does not fully cover.
- Size is fixed by the platform; scaling with `transform` is the usual workaround, and is a hint that a custom component may fit the design better.

Because the native controls differ in size and shape, a row that lines up perfectly on iOS can look off on Android. Test both, and use [platform-specific code](/react-native-glossary/platform-specific-code) for spacing if needed.

For accessibility, the native control already announces itself as a switch with its on/off state. Give it a label, either through `accessibilityLabel` or by making the whole row pressable with an [accessibility role](/react-native-glossary/accessibility-role) of `switch`, so the tap target is larger than the small knob.
