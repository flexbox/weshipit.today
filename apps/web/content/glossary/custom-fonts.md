---
title: 'Custom Fonts'
summary: 'Custom fonts are typeface files you bundle with a React Native app, either embedded at build time or loaded at runtime with expo-font, then used through fontFamily.'
aliases:
  - 'expo-font'
  - 'Font loading'
related:
  - 'Text Component'
  - 'Splash Screen'
  - 'Config Plugin'
  - 'Font Scaling'
updated: 2026-11-13
---

Custom fonts are `.ttf` or `.otf` files you ship with your React Native app so [Text](/react-native-glossary/text-component) can use a typeface other than the system font. Once registered, you reference one through the `fontFamily` style.

There are two ways to get the file into the app:

- **Embed at build time.** The font is copied into the native project and registered with the OS. With Expo this is the `expo-font` [config plugin](/react-native-glossary/config-plugin); in a bare project you list asset folders in `react-native.config.js` and run `npx react-native-asset`. Fonts are available instantly at launch.
- **Load at runtime** with `useFonts` or `Font.loadAsync` from `expo-font`. Nothing native changes, which suits Expo Go and quick experiments, but you must wait for loading before rendering text, usually behind the [splash screen](/react-native-glossary/splash-screen).

```tsx
const [loaded] = useFonts({
  'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
  'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
});
```

The classic gotchas:

- **`fontWeight` does not pick a weight from a custom family reliably**, especially on Android. Register each weight as its own family name and switch `fontFamily` instead, often via a typography component.
- **Names differ by platform when embedding.** iOS looks the font up by its internal PostScript or family name, while Android uses the file name. Rename files to match the PostScript name to avoid "font not found" on one platform only.
- **Variable fonts** have patchy support across platforms; static files per weight are the safe choice.
- Rendering text before a runtime font loads causes a visible jump from the system font.

Remember that users can scale text up for accessibility. A custom font does not change that, so test layouts with large [font scaling](/react-native-glossary/font-scaling).
