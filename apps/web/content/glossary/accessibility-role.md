---
title: 'Accessibility Role'
summary: 'An accessibility role tells screen readers what kind of element something is, such as a button, header or link, set with the accessibilityRole or role prop.'
aliases:
  - 'accessibilityRole'
  - 'role'
related:
  - 'Accessibility Label'
  - 'Screen Reader'
  - 'Pressable'
  - 'Switch'
updated: 2026-11-13
---

An accessibility role tells assistive technology what an element is and how it can be used. In React Native you set it with `accessibilityRole` or the web-style `role` prop, and the [screen reader](/react-native-glossary/screen-reader) announces it after the label: "Settings, button" or "Notifications, heading".

Roles matter because React Native builds most controls from generic views. A [Pressable](/react-native-glossary/pressable) is just a touchable view with no role by default, so without one VoiceOver and TalkBack read only its text and give no hint that it can be activated. The built-in `Button` sets the button role for you; custom buttons must set it themselves.

Commonly used values include `button`, `link`, `header`, `image`, `text`, `search`, `checkbox`, `switch`, `tab`, `tablist`, `adjustable` and `none`. The `role` prop accepts web-style names, such as `heading` and `img`, and takes precedence over `accessibilityRole` when both are set.

```tsx
<Text accessibilityRole="header">Account</Text>

<Pressable
  role="checkbox"
  accessibilityState={{ checked: isOn }}
  onPress={toggle}
>
  <Text>Email updates</Text>
</Pressable>
```

A role usually needs a state to be complete. Checkboxes, switches and tabs should pass `accessibilityState` (or the matching `aria-checked`, `aria-selected`, `aria-disabled` props) so the reader says "checked" or "selected" and updates when it changes.

Headers deserve a special mention. Screen reader users jump between headings to skim a screen, so marking section titles as `header` is one of the cheapest, highest-impact accessibility fixes in any app.

The common mistake is choosing a role for its look rather than its behaviour. Something that navigates to another screen is a `button` in most apps, while `link` is better reserved for text that opens a URL. A row that toggles a setting is a `switch`, not a `button`. Match the role to what happens on activation.
