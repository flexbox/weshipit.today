---
title: 'Splash Screen'
summary: 'A splash screen is the static native image the OS shows while a React Native app launches, covering the gap until JavaScript loads and the first screen renders.'
aliases:
  - 'Launch screen'
  - 'expo-splash-screen'
related:
  - 'Startup Time'
  - 'App Icon'
  - 'Custom Fonts'
  - 'Config Plugin'
updated: 2026-11-13
---

A splash screen, called a launch screen on iOS, is the static image the operating system displays the instant a user taps your app icon. In React Native it hides the time spent starting the native app, loading the [JavaScript bundle](/react-native-glossary/javascript-bundle) and rendering the first React screen.

It is native, not React. On iOS it is a storyboard compiled into the app; on Android 12 and later it uses the system SplashScreen API, which shows a centred icon on a solid background and does not allow a full-screen image. You cannot animate it with JavaScript or change it with an over-the-air update, because it is shown before any JavaScript exists.

The useful trick is to **keep it visible** until the app is truly ready, rather than letting it disappear onto a blank screen while fonts and stored data load:

```tsx
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({ Inter: require('./Inter.ttf') });
  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);
  if (!fontsLoaded) return null;
  return <Root />;
}
```

With Expo you configure the image and colours through the `expo-splash-screen` [config plugin](/react-native-glossary/config-plugin); bare apps often use `react-native-bootsplash`, which generates the native assets for you.

Common gotchas:

- A white or black flash between splash and first screen means the background colours of the splash and your root view do not match, or you hid it too early.
- Changes need a new native build; reloading Metro shows nothing new.
- A long splash is a symptom, not a fix. If users stare at it for seconds, work on [startup time](/react-native-glossary/startup-time).
