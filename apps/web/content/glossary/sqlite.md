---
title: 'SQLite'
summary: 'SQLite is an embedded relational database stored as a single file on the device; React Native apps use it through libraries such as expo-sqlite and op-sqlite.'
aliases:
  - 'expo-sqlite'
  - 'op-sqlite'
related:
  - 'Offline-First'
  - 'MMKV'
  - 'AsyncStorage'
  - 'State Management'
updated: 2026-11-13
---

SQLite is a full SQL database engine that runs inside your app and keeps everything in one file on the device. Both iOS and Android ship it, and React Native reaches it through a library: `expo-sqlite` in most Expo projects, or `op-sqlite`, a JSI-based library focused on raw speed.

You reach for SQLite when key-value storage stops being enough: you need to filter, sort, join or paginate thousands of records locally, which is the foundation of any [offline-first](/react-native-glossary/offline-first) app.

```ts
import * as SQLite from 'expo-sqlite';

const db = await SQLite.openDatabaseAsync('app.db');
await db.execAsync('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, title TEXT NOT NULL)');
await db.runAsync('INSERT INTO todos (title) VALUES (?)', 'Buy milk');
const todos = await db.getAllAsync<{ id: number; title: string }>('SELECT * FROM todos');
```

Many teams put a typed layer on top. Drizzle ORM supports both libraries and offers live queries that re-render a component when its rows change, and sync engines such as PowerSync use SQLite as their local store.

The mistakes that bite in production:

- **No migration plan.** The schema you ship in version 1 lives on users’ devices forever. Every later change needs a migration that runs on launch, typically tracked with `PRAGMA user_version` or an ORM’s migration system. Editing the `CREATE TABLE` statement does nothing for existing installs.
- **String-built SQL.** Interpolating user input into a query invites injection and quoting bugs. Always use `?` placeholders.
- **Large writes one row at a time.** Wrap bulk inserts in a transaction; the difference can be orders of magnitude.

SQLite data is not encrypted by default. If the database holds sensitive information, use an encrypted build such as SQLCipher, which both libraries can be configured for, and keep the key in [secure storage](/react-native-glossary/secure-storage). See the [expo-sqlite docs](https://docs.expo.dev/versions/latest/sdk/sqlite/).
