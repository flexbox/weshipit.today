---
title: 'Modal'
summary: 'Modal is React Native’s core component for presenting content above the rest of the app in a separate native window, with slide or fade animations and iOS sheet styles.'
aliases:
  - 'Modal component'
related:
  - 'Stack Navigator'
  - 'BackHandler'
  - 'StatusBar'
  - 'Safe Area'
updated: 2026-11-13
---

`Modal` is the core component that presents content on top of everything else in the app. It is controlled by a `visible` prop and renders its children in a **separate native layer**: a presented view controller on iOS and a dialog window on Android.

```jsx
<Modal visible={open} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setOpen(false)}>
  <EditProfile onDone={() => setOpen(false)} />
</Modal>
```

The props that matter:

- `animationType` — `none`, `slide` or `fade`.
- `transparent` — draws a see-through backdrop so you can build your own dimmed overlay.
- `presentationStyle` (iOS) — `fullScreen`, `pageSheet`, `formSheet` or `overFullScreen`. Page sheets give the native card look with swipe-to-dismiss.
- `onRequestClose` — called when the user presses the Android back button, and when an iOS page sheet is swiped down. If you ignore it, the modal state and what is on screen drift apart.

Because a Modal lives in its own native layer, a few things surprise people. Toasts, snackbars and portals rendered in your root view appear **behind** an open modal. On iOS, opening a second modal while one is animating closed can silently fail. The [status bar](/react-native-glossary/statusbar) and [safe area](/react-native-glossary/safe-area) also need handling inside the modal, since the modal does not inherit your screen’s layout.

For full screens that are part of a flow, such as a checkout or a compose screen, a modal route in your [stack navigator](/react-native-glossary/stack-navigator) or Expo Router is often better. It participates in navigation state, deep links and the back stack. Keep the core `Modal` for self-contained overlays: a picker, a confirmation, a short form.
