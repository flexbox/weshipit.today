---
title: 'Hybrid App'
summary: 'A hybrid app is a web app written in HTML, CSS and JavaScript that runs inside a WebView in a native shell, distributed through the app stores like any other app.'
aliases:
  - 'WebView app'
related:
  - 'WebView'
  - 'Capacitor'
  - 'Native App'
  - 'Progressive Web App'
updated: 2026-11-13
---

A hybrid app is a mobile app whose interface is a web page. The code is HTML, CSS and JavaScript, rendered by the system [WebView](/react-native-glossary/webview) inside a thin native container that is installed from the App Store or Google Play. A plugin layer gives the web code access to device features.

Apache Cordova (and PhoneGap, built on it) popularised the approach; [Capacitor](/react-native-glossary/capacitor) is the main modern option.

React Native is not a hybrid app in this sense, even though both use JavaScript. The distinction is where the UI is drawn:

- **Hybrid:** JavaScript builds a DOM, and a browser engine lays out and paints it.
- **React Native:** JavaScript describes a tree of components, and React Native creates real platform views. There is no DOM, no CSS engine and no WebView involved unless you add one.

That difference explains the typical trade-offs. Hybrid apps reuse web skills and often an entire existing web app, and one codebase can also serve the browser. In return, scrolling physics, gestures, text inputs and transitions are web imitations of platform behaviour, and complex screens can feel less responsive than native ones, especially on low-end Android devices.

Some people also call React Native apps "hybrid" simply because they are not fully native. That usage is loose and best avoided, since it blurs the meaningful difference above.

The line also blurs in practice: many [native apps](/react-native-glossary/native-app) and React Native apps embed WebViews for a help centre, checkout flow or legal pages. That makes them partly web-based, not hybrid apps. The useful question is not the label but which screens need native feel and which are fine as web content.
