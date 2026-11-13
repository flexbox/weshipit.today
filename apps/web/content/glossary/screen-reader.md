---
title: 'Screen Reader'
summary: 'A screen reader is assistive software, VoiceOver on iOS and TalkBack on Android, that speaks the interface aloud and lets people navigate an app by swipes and taps.'
aliases:
  - 'VoiceOver'
  - 'TalkBack'
related:
  - 'Accessibility Label'
  - 'Accessibility Role'
  - 'Font Scaling'
  - 'Modal'
updated: 2026-11-13
---

A screen reader is assistive software that reads the interface aloud for blind and low-vision users. On iOS it is VoiceOver; on Android it is TalkBack. Users move focus from element to element with swipes, hear each one’s label, role and state, and double-tap anywhere to activate the focused item.

React Native has no screen reader logic of its own: because it renders native views, it maps your accessibility props onto each platform’s accessibility APIs. That is good news, but it means the reader only knows what you tell it. An [accessibility label](/react-native-glossary/accessibility-label), an [accessibility role](/react-native-glossary/accessibility-role) and state such as `accessibilityState={{ selected: true }}` are what turn a tree of views into something navigable.

The `AccessibilityInfo` API lets your code react to the screen reader:

```ts
import { AccessibilityInfo } from 'react-native';

const enabled = await AccessibilityInfo.isScreenReaderEnabled();
AccessibilityInfo.announceForAccessibility('Message sent');
```

Use announcements for changes that happen without focus moving, such as a toast or a saved form. On Android, `accessibilityLiveRegion` on a view does the same job for content that updates.

Behaviour that surprises developers:

- **Gestures change.** With the reader on, a single tap selects rather than activates, and custom swipe gestures may never fire. Offer an alternative, for example with `accessibilityActions`.
- **Focus order follows the view tree,** which is not always visual order. Absolutely positioned overlays can be read in the wrong place.
- **Custom modals can leak focus** to the screen behind them; on iOS `accessibilityViewIsModal` helps contain it.

The biggest mistake is never testing with the real thing. VoiceOver is not available in the iOS Simulator, so test on a device (Xcode’s Accessibility Inspector helps for a quick check), and turn TalkBack on an Android device or a Google Play emulator image. Ten minutes navigating your main flow eyes-closed finds most issues.
