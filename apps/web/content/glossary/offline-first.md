---
title: 'Offline-First'
summary: 'Offline-first is an architecture where a React Native app reads and writes a local database first and syncs in the background, so it works without a connection.'
aliases:
  - 'Offline support'
  - 'Local-first'
  - 'Sync'
related:
  - 'SQLite'
  - 'TanStack Query'
  - 'State Management'
  - 'Supabase'
updated: 2026-11-13
---

Offline-first means the app treats data on the device as its primary source of truth. Screens read from a local database and writes go there immediately; a sync process then exchanges changes with the server whenever a connection is available. The network becomes an optimisation rather than a requirement.

It matters more on mobile than anywhere else. Phones spend real time in lifts, underground, on planes and on weak signal, and an app that shows a spinner or an error in those moments feels broken. Offline-first apps also feel faster online, because every screen renders from local data with no wait.

There is a spectrum of approaches:

- **Cached reads.** Persist your [TanStack Query](/react-native-glossary/tanstack-query) cache so the last data shows offline, and queue mutations until the network returns. Cheap, and enough for many apps.
- **Local database plus sync.** Store data in [SQLite](/react-native-glossary/sqlite) and run a sync engine such as PowerSync, WatermelonDB’s sync protocol, or a custom one. This is true offline-first.
- **Local-first with CRDTs.** Data structures that merge concurrent edits automatically, suited to collaborative apps.

The hard part is never storage; it is conflicts. If two devices edit the same record offline, something has to decide the result: last write wins, field-level merging, or asking the user. Decide this per data type before writing code, because retrofitting conflict rules onto a shipped schema is painful.

The common technical gotcha is trusting the connectivity flag. Libraries such as NetInfo report `isConnected` when the device is attached to a network, which is not the same as being able to reach your server (captive portal Wi-Fi is the classic case). Check `isInternetReachable`, and design sync so a failed request is simply retried later rather than surfaced as an error.
