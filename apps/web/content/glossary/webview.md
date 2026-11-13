---
title: 'WebView'
summary: 'A WebView is a native component that renders web content inside an app; in React Native it is provided by the community package react-native-webview, not by core.'
aliases:
  - 'react-native-webview'
related:
  - 'Hybrid App'
  - 'Expo DOM Components'
  - 'Deep Linking'
  - 'Core Components'
updated: 2026-11-13
---

A WebView is an embedded browser view that loads HTML, CSS and JavaScript inside a native screen. In React Native you get one from `react-native-webview`, a community-maintained package that wraps `WKWebView` on iOS and `android.webkit.WebView` on Android. It used to ship in core but was moved out, so it is not one of the [core components](/react-native-glossary/core-components) today.

Typical uses are pages you do not want to rebuild natively: payment and identity flows, help centres, terms of service, rich articles or an existing web dashboard.

```tsx
import { WebView } from 'react-native-webview';

<WebView source={{ uri: 'https://example.com/help' }} onMessage={(event) => console.log(event.nativeEvent.data)} />;
```

The page and the app talk through messages. Inside the page, `window.ReactNativeWebView.postMessage()` sends data to `onMessage`; in the other direction you can inject JavaScript with `injectedJavaScript` or a ref’s `injectJavaScript()`.

Gotchas that catch most teams:

- **Messages are strings.** Pass objects through `JSON.stringify` and parse them on the other side.
- **Cookies and storage are separate** from your app’s networking, so a user logged in through `fetch` is not automatically logged in inside the WebView.
- **Navigation escapes.** Links can leave your site unless you filter them with `onShouldStartLoadWithRequest`; hand external links and custom schemes to the system with the Linking API.
- **Each WebView is a full browser engine**, with its own memory cost and start-up delay. Do not render one per list row.

A WebView screen will not feel like the rest of the app: scrolling, text selection and the keyboard behave like a browser. If you want web code inside an Expo app with a simpler model, [Expo DOM components](/react-native-glossary/expo-dom-components) build on the same package. When a whole app is a WebView, it becomes a [hybrid app](/react-native-glossary/hybrid-app).
