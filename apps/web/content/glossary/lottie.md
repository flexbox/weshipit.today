---
title: 'Lottie'
summary: 'Lottie is a format for vector animations exported from After Effects as JSON; lottie-react-native plays them in React Native apps using the native Lottie players.'
aliases:
  - 'lottie-react-native'
related:
  - 'Reanimated'
  - 'Skia'
  - 'Bundle Size'
  - 'Splash Screen'
updated: 2026-11-13
---

Lottie is an animation format created at Airbnb: a designer builds an animation in Adobe After Effects, exports it as JSON with the Bodymovin plugin (or as a compressed `.lottie` file), and the app plays it back as resolution-independent vectors. `lottie-react-native` renders these in React Native by wrapping the official native players on iOS and Android.

```tsx
import LottieView from 'lottie-react-native';

<LottieView source={require('./assets/success.json')} autoPlay loop={false} style={{ width: 160, height: 160 }} />;
```

Lottie is the right tool for illustrative motion that a designer owns: onboarding illustrations, empty states, success checkmarks, loading characters. The animation is authored once and runs identically on both platforms, and replacing the file changes the animation without a developer touching code.

You can control playback through a ref (`play`, `pause`, `reset`) or by passing a `progress` value, which lets you scrub the animation from a gesture or scroll position.

Where it fits against other tools: interactive, state-driven UI motion (a button press, a sheet sliding up) belongs in [Reanimated](/react-native-glossary/reanimated), because it responds to input and data. Lottie plays pre-authored timelines. Custom drawn graphics that react to data are better in [Skia](/react-native-glossary/skia).

Gotchas worth knowing:

- **Not every After Effects feature is supported.** Expressions, some effects and certain masks or blend modes render differently or not at all. Designers should check the Lottie feature support list and preview on real devices, not only in a web preview.
- **File size.** A complex animation can be hundreds of kilobytes of JSON, and embedded raster images inflate it further. Keep image layers out of the export, and prefer `.lottie` files, which are compressed.
- **Android rendering cost.** Very complex animations can drop frames on low-end Android devices; test there, and simplify layers if needed.

See the [lottie-react-native repository](https://github.com/lottie-react-native/lottie-react-native).
