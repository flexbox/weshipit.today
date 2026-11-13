---
title: 'Fetch API'
summary: 'The Fetch API is React Native’s built-in global fetch() for HTTP requests, implemented over the native networking stacks of iOS and Android rather than a browser.'
aliases:
  - 'fetch'
  - 'Networking'
  - 'HTTP requests'
related:
  - 'TanStack Query'
  - 'WebSocket'
  - 'SSL Pinning'
  - 'Android Emulator'
updated: 2026-11-13
---

`fetch()` is the global function React Native provides for HTTP requests, with the same promise-based API as in browsers. Underneath, it is not a browser: requests are handed to the platform’s native networking stack on iOS and Android, which explains most of the ways it behaves differently from the web.

```ts
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 10_000);

const res = await fetch('https://api.example.com/orders', { signal: controller.signal });
clearTimeout(timer);
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const orders = await res.json();
```

Differences that matter on mobile:

- **No CORS on native.** CORS is a browser rule, so native requests ignore it. The same code may fail on web, which is a server configuration problem, not a React Native one.
- **Plain HTTP is blocked by default.** iOS App Transport Security and Android (since Android 9) refuse cleartext `http://` traffic unless you add an exception. A local API that works in the browser often fails on a device for this reason.
- **`localhost` is the device, not your computer.** From the [Android emulator](/react-native-glossary/android-emulator), your machine is `10.0.2.2`; from a physical phone, use your machine’s LAN address.
- **Streaming is limited.** React Native’s built-in fetch does not expose response bodies as streams. Expo provides `expo/fetch` with streaming support for cases such as reading an LLM response token by token.

The mistakes that show up in production are about the network, not the API. `fetch` only rejects on network failure; a 401 or 500 resolves normally, so always check `res.ok`. And there is no default timeout, so on a weak mobile connection a request can hang far longer than any user will wait; abort it yourself as above.

For caching, retries and refetching, wrap `fetch` with [TanStack Query](/react-native-glossary/tanstack-query) rather than calling it directly from effects. For connections that must stay open, use a [WebSocket](/react-native-glossary/websocket). See [networking](https://reactnative.dev/docs/network).
