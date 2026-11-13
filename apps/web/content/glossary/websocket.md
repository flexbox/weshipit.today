---
title: 'WebSocket'
summary: 'WebSocket is a persistent two-way connection between app and server; React Native ships a built-in global WebSocket class used for chat, live data and realtime updates.'
aliases:
  - 'WebSockets'
  - 'Realtime'
related:
  - 'Fetch API'
  - 'AppState'
  - 'Supabase'
  - 'Firebase'
updated: 2026-11-13
---

A WebSocket is a long-lived connection over which client and server can both send messages at any time, instead of the app asking with a new HTTP request each time. React Native provides the same global `WebSocket` class as browsers, implemented natively on iOS and Android, so standard WebSocket client code works unchanged.

```ts
const ws = new WebSocket('wss://realtime.example.com/feed');

ws.onopen = () => ws.send(JSON.stringify({ subscribe: 'prices' }));
ws.onmessage = (event) => handle(JSON.parse(event.data));
ws.onclose = (event) => scheduleReconnect(event.code);
```

It powers chat, live scores, collaborative editing, delivery tracking and most hosted “realtime” features, including those of [Supabase](/react-native-glossary/supabase) and [Firebase](/react-native-glossary/firebase), which manage the connection for you.

The mobile reality is that connections drop constantly, and code written for a desktop browser does not expect it:

- **Backgrounding kills it.** When the app goes to the background, iOS suspends it within seconds and the socket dies. Listen to [AppState](/react-native-glossary/appstate) and reconnect when the app becomes active again.
- **Network changes kill it.** Moving from Wi-Fi to cellular or through a tunnel drops the connection, sometimes without a clean `onclose` for a while. Use heartbeats (ping messages with a timeout) to detect dead connections.
- **Reconnect with backoff.** Retrying instantly in a loop drains battery and can hammer your server when it comes back up. Increase the delay between attempts.
- **Resync after reconnecting.** Messages sent while the app was disconnected are gone. Fetch what you missed over HTTP when the socket reopens.

Two misconceptions: Socket.IO is its own protocol on top of WebSockets, so a plain `WebSocket` cannot talk to a Socket.IO server; and a WebSocket cannot keep running in the background to deliver messages. For reaching a user when the app is closed, use push notifications.
