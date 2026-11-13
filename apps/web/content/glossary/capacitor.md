---
title: 'Capacitor'
summary: 'Capacitor is Ionic’s open-source runtime that packages a web app inside a native iOS or Android shell and exposes device features to it through plugins.'
aliases:
  - 'Ionic'
  - 'Ionic Capacitor'
related:
  - 'Hybrid App'
  - 'WebView'
  - 'Progressive Web App'
  - 'Cross-Platform Development'
updated: 2026-11-13
---

Capacitor is an open-source native runtime from the Ionic team. It takes a web app built with any framework (React, Vue, Angular, Svelte or plain HTML) and runs it inside a native iOS or Android project, rendering the UI in the system [WebView](/react-native-glossary/webview) and bridging to native APIs through plugins.

It is the modern successor to Apache Cordova and the usual way to build a [hybrid app](/react-native-glossary/hybrid-app) today. Ionic Framework, a separate UI component library, is often used with it but is optional.

How it compares with React Native, factually:

- **Rendering.** Capacitor renders HTML and CSS in a browser engine. React Native renders platform-native views; there is no DOM.
- **Reuse.** Capacitor can wrap an existing web app almost unchanged, so the same code serves the browser and the stores. React Native shares React knowledge and logic with the web, but UI components must use React Native primitives (or [React Native Web](/react-native-glossary/react-native-web) in the other direction).
- **Native projects.** Capacitor commits real Xcode and Android Studio projects to your repo, and you edit them directly when needed.
- **Native features.** Both reach camera, files, push and so on through plugins written in Swift and Kotlin.

Capacitor is a strong fit when you already have a solid web app, or when the app is mostly content and forms. It is a weaker fit for interfaces that depend on native gestures, heavy animation or very long lists, where WebView performance and platform feel become noticeable.

A frequent mistake is assuming an app will pass store review just because it is wrapped. Apple’s guidelines reject apps that are little more than a repackaged website, so a Capacitor app still needs to offer an app-like experience.
