name: inverse
layout: true
class: center, middle, inverse

---

layout: false

# Offline First Mobile Apps

## with React Native & LegendState

📍 react nativeCon 3 - Berlin

🗓️ _8 October 2026_

<small class="text-hint">`C` to clone a display; `P` to switch to presenter mode.</small>

???
Guten Tag. 20 minutes. One idea: the device owns the truth.

---

class: center, bsod

# Who remembers this?

--

### The Blue Screen of Death

.crash-shot[![Windows 9x blue screen of death](./images/offline-first/Windows_9X_BSOD.png)]

--

Microsoft Windows

???
~25s. Hands up. Wait for it.

---

class: center, rrod

# And this one?

--

### The Red Ring of Death

.crash-shot[![Xbox 360 red ring of death](./images/offline-first/Xbox360-ringofdeath.jpg)]

--

Microsoft Xbox 360

???

---

class: center

# And this one?

--

### The White Screen of Hell

--

.phone-shot[![White screen of hell on iPhone](./images/offline-first/white-screen-of-hell-iphone-shadow.png)]

David Leuliette Microsoft MVP

???
~30s. Deadpan. If no hands go up, that's the joke — say so.

---

class: center

# Spinners that never stops

.phone-shot[![Mighty spinner on iPhone](./images/offline-first/mighty.gif)]
.phone-shot[![Pennylane spinner on iPhone](./images/offline-first/pennylane.gif)]
.phone-shot[![Vinted spinner on iPhone](./images/offline-first/vinted.gif)]

???
and if you are lucky you have a spinner

---

# This app didn’t crash

--

## It’s waiting for a server it can’t reach

--

It will wait forever.

???
~10s. Grocery store. Basement. Regional train.

---

class: scene

## Classic

THE TRUTH LIVES ON THE SERVER · THE PHONE ASKS FOR IT

<object data="./images/offline-first/scene-1-classic.svg" type="image/svg+xml" aria-label="scene-1-classic"></object>

???
Say it, don't show it: "The server is fine. The phone is not, and it has no data of its own to fall back on."

On screen (Classic: server holds the truth):

- API
- POSTGRES
- NO SIGNAL
- SOURCE OF TRUTH
- EVERY TAP WAITS HERE
- reads and writes
- isPending: true
- isPending: forever

~30s. This is every app in the room. The truth lives on the server,
the phone asks for it, and when the phone can't ask, it has nothing.
`isPending: forever` is the whole problem in two words.

---

class: center, middle

> Why don’t we design something as seemingly obvious
> and trivial as error messages first?

Vitaly Friedman — founder, Smashing Magazine

???
~15s. "I learned this job from Smashing Magazine books.

I am so happy to give this talk in Berlin today.

For the people who don't know Smashing Magazine, it is a popular online resource for web designers and developers, from Germany.

This quote is basically my whole career. Design for failure seems obvious, right?

---

class: center, middle

> Why don’t we design something as seemingly obvious
> and trivial as offline data first?

David Leuliette

???
~15s. Same sentence, one word changed. Offline is an error state we ship
to every user, every day, and we still design it last.

---

## We should. Because milliseconds matter

--

.phone-shot[![Instagram on iPhone](./images/offline-first/instagram.webp)]

???
~45s. Offline-first is not a feature for people with no signal.
It is the fastest possible app for everyone, because nothing awaits the network.

Instagram, first version: the upload started the moment you picked the photo,
in the background. While you were writing the caption and picking a filter,
the upload was already done. Tap "Share": instant. That is the same trick.
Local first, network later.

---

## 10 years of React state

--

`setState` · Context · Redux · MobX-State-Tree · Apollo · Recoil · xState · Jotai · zustand

--

.legend-shot[![Legendapp State benchmark](./images/offline-first/legendapp-state.png)]

???
~40s. Ten years in the ecosystem, a new state library every eighteen months.
None of them cared about the network. Then this one: 4kb, fast, and the
sync engine is built in. Catalin Miron pointed me at it at App.js 2022.
That is the extent of the library pitch. The rest of the talk is not about
Legend State. It is about the four things Legend State can't decide for you.

---

# The easy part

```js
import { observable } from '@legendapp/state';
import { syncedSupabase } from '@legendapp/state/sync-plugins/supabase';
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv';

export const todos$ = observable(
  syncedSupabase({
    supabase,
    collection: 'todos',
    persist: { name: 'todos', plugin: ObservablePersistMMKV },
    changesSince: 'last-sync',
    fieldUpdatedAt: 'updated_at',
    fieldDeleted: 'deleted',
  }),
);
```

???
~60s. One pass, don't explain every option.
Point at fieldDeleted: "remember this line" — pays off in decision 2.

This is the README config. It is deliberately incomplete — four lines are
missing and the rest of the talk is those four lines.
Do NOT call this production-ready.

---

# Reads and writes

```js
const todos = useValue(todos$);

todos$[id].text.set('Buy milk');
```

--

That write works on a plane. It syncs when you land.

--

This is the part everyone already gets right.
It is not why your app breaks.

???
~45s. The pivot. Four decisions come after this.

If asked: `useValue` replaced `useSelector` and `use$` in v3 —
`use$` still works but is not React Compiler compatible.

Say "it syncs when you land" with full confidence.
Decision 4 is where I admit I lied.

---

class: scene

## Offline-first · the write

THE TRUTH LIVES ON THE PHONE · THE NETWORK IS NOT INVITED

<object data="./images/offline-first/scene-2-offline-write.svg" type="image/svg+xml" aria-label="scene-2-offline-write"></object>

???
Say it, don't show it: "Three hops, all on the device. Nothing in this picture awaited anything."

On screen (Offline-first: the write):

- RE-RENDERED AT ~0 MS
- listeners fire before disk
- LOCAL STORE · SOURCE OF TRUTH
- persisted on device
- PENDING QUEUE
- waits for signal
- API
- POSTGRES
- NO SIGNAL

~30s. Same drawing, flipped. The truth lives on the phone. Tap, re-render,
queue. Nothing in this picture awaited the network. The cloud is grey on
purpose. Every choice that follows is about what happens in that queue.

---

# Four decisions

--

1. Who makes the id?

--

1. How do you delete a row?

--

1. Who wins?

--

1. Does it survive a force-quit?

--

Nobody makes these on purpose.
You inherit them from the defaults.

???
~40s. This is the map. Say the four out loud, they are the spine of the talk.
"Every one of these has a default. Every default is wrong for offline."

---

# 1. Who makes the id?

--

Offline, there is no server to ask.

--

```js
configureSyncedSupabase({
  generateId: () => uuidv7(),
});
```

--

Your primary key is now a guess made by the client.

- `bigint generated always as identity` — gone
- UUID **v4** is random: it shreds your Postgres index. Use **v7**, it sorts by time
- a client picks its own ids now, so RLS is not optional anymore

--

You can't flip a live table from identity to UUID. That is a migration, with users on it.

???
~1m45.

The last line is the point of the whole talk: this is a one-way door.
Every foreign key, every URL, every analytics event carries the old id.
Decide before the first row, or pay for it with a migration and a maintenance window.

Start with the obvious: you tap "add", you are in a basement, the row needs
a primary key right now. The server is not there to give you one.

The v4 vs v7 point is the one people thank me for afterwards. v4 is random, so
every insert lands on a random B-tree page: page splits, bloated index. v7 is
time-ordered, inserts go to the right-hand edge like a serial does.

The RLS line is the scary one. An id is no longer something the server controls.
A hostile client can send any id it wants, including one that already exists.
Your row-level security policy is the only thing standing there.

---

# 2. How do you delete?

--

```js
fieldDeleted: 'deleted',
```

_(you were told to remember this one)_

--

A hard `DELETE` is **invisible** to a device that was offline.

--

A device cannot sync the absence of a row.
It has no way to tell "deleted" from "never existed".

--

So you don't delete. You tombstone.

--

The rows you already hard-deleted? Gone. No device will ever learn about them.

???
~1m45.

This one breaks people's mental model, so slow down here.

`changesSince: 'last-sync'` asks the server: what changed since Tuesday?
Postgres answers with rows. A deleted row is not a row. It is nothing.
And nothing is exactly what an empty response looks like.

So the row stays, with a `deleted` boolean, and it syncs like any other change.
The tombstone IS the message.

---

# 2. How do you delete?

## What it costs

--

- Rows never actually leave. You need a reaper job.

--

- Every query, every view, every RLS policy filters `deleted = false`.
  Forget once and deleted data reappears in a list.

--

- "Delete my account" now means two different things.
  Your GDPR erasure path is **not** `fieldDeleted`.

???
~1m30. Berlin audience: the GDPR line lands. Do not rush it.

Soft delete is a sync primitive. It is not a legal delete.
The day someone exercises Article 17 you need a real `DELETE` that also tells
every device the row is gone — and a tombstone is the only way to tell them,
so you keep a stub with the payload stripped.

If I get one question after this talk, it is this one.

---

# 3. Who wins?

--

Two devices. Same row. Both offline.

--

Nothing detects anything. **Last write wins.**

--

And by default LegendState sends the **whole object**:

--

```js
updatePartial: true, // send only the fields that changed
```

--

Without it, device B reverts a field it never touched.

--

And "last" is decided by `updated_at`. **The phone never writes that column.**
A Postgres trigger does.

???
~2m.

The clock line: `changesSince: 'last-sync'` and last-write-wins both read
`updated_at`. If the device stamps it, you are trusting a clock the user can
set by hand, that drifts, that crosses time zones. Server trigger, always.
This is a schema decision, not a config flag.

The honest framing: LegendState has no conflict resolution. It does not
pretend to. It is a sync engine, not a CRDT.

`updatePartial` defaults to false, so an update ships the full row. Two people,
same row, different fields, both offline: the second one to reconnect writes
all of its fields over all of yours. Your edit is gone and nobody saw an error.

`updatePartial: true` narrows the blast radius to the fields that actually
changed. It is still last-write-wins. It is just last-write-wins on one field
instead of twelve.

---

# 3. Who wins?

## So don't put these in the sync layer

--

- Counters and stock levels — `n = n + 1` is not a value, it's an operation
- Anything two people edit at once — that is a CRDT's job
- Money

--

Move the contested value to the server.
Let the device own everything else.

???
~1m15.

The real trade-off slide, and the most useful thing I can tell you.

Offline-first is not "everything offline". It is "everything offline
**except** the things where being wrong is expensive". Inventory, balances,
seat reservations: those stay server-authoritative, and the UI is allowed
to show a spinner for them.

One spinner in the whole app, on purpose, is a design decision.
Forty accidental ones is a bug.

---

# 4. Does it survive?

--

> "It syncs when you land."
>
> — me, eight minutes ago

--

Not with the config I showed you.

???
~30s. Own it. The callback is the point — let it sit for a beat.

Pending changes live in memory. Airplane mode, tap, swipe up, kill the app:
the write never existed. This is the bug that shipped to production for me.

---

# 4. Does it survive?

```js
persist: {
  name: 'todos',
  plugin: ObservablePersistMMKV,
  retrySync: true,   // pending changes go to MMKV, not just memory
},
retry: {
  infinite: true,    // keep retrying until it saves
},
```

--

**The trap:** a change the server will _never_ accept
— RLS reject, deleted parent row — retries forever.

--

Infinite retry needs a poison-pill escape hatch.

???
~1m30.

`retrySync` is two words that separate a demo from a product.

Then the honest part: `infinite: true` means infinite. I have watched a queue
retry the same rejected insert for days because the parent row was gone. The
device is offline-first and also permanently wrong, quietly, forever.

Count the retries, and after N failures surface it or drop it — but decide
which. Silence is the one option that is always wrong.

---

class: scene

## Reconciliation

SIGNAL RETURNS · THE QUEUE DRAINS · A DELTA COMES BACK

<object data="./images/offline-first/scene-3-reconciliation.svg" type="image/svg+xml" aria-label="scene-3-reconciliation"></object>

???
Say it, don't show it: "A change the server will never accept retries forever. Count the failures, then decide."

On screen (Reconciliation):

- API
- POSTGRES
- UPSERTS, OLDEST FIRST
- ids came from the phone, so a retry is idempotent
- DELTA SINCE last_sync
- changed rows + tombstones (deleted: true)
- a hard DELETE would have arrived as nothing
- LOCAL STORE · STILL THE TRUTH
- server rows merge in per field
- last write wins, updatePartial: true
- DURABLE REPLICA

~30s. Signal is back. Read the arrows once, left to right: the queue drains
as upserts, ids came from the phone so retries are safe. A delta comes back
with tombstones. Fields merge, last write wins. That is the four decisions
drawn as one picture. Next slide is the same thing as code.

---

# The whole thing

```js
configureSyncedSupabase({ generateId: () => uuidv7() }); // 1

export const todos$ = observable(
  syncedSupabase({
    supabase,
    collection: 'todos',
    changesSince: 'last-sync',
    fieldUpdatedAt: 'updated_at',
    fieldDeleted: 'deleted', // 2
    updatePartial: true, // 3
    persist: {
      name: 'todos',
      plugin: ObservablePersistMMKV,
      retrySync: true, // 4
    },
    retry: { infinite: true }, // 4
  }),
);
```

--

Four lines more than the README. That is the whole talk.

???
~1m. Don't read it. Point at the four numbers, name each decision once.

"Ids. Deletes. Conflicts. Retries. Four lines. Everything else in this config,
the README gave you."

---

# The trade-offs

--

- You now run a **distributed system**. Two sources of truth, permanently.

--

- Bugs reproduce on one device, in one sync state.
  Build a "dump the local store" screen on **day one**.

--

- Read-mostly app? You don't need this. React Query plus a persister is enough.

--

- Two people editing the same text? You don't need this either. You need a CRDT.

???
~1m15. This is where the abstract's "hard-won" claim gets paid.

The store-dump screen is not optional. The first bug report you get will be
"it works on my phone". You need to see their queue, their last-sync, their
tombstones. If you can't, you are debugging blind.

Then the honest part: most apps in this room are read-mostly. A feed with a
like button does not need a sync engine. Cache it, persist the cache, ship.
And if it is Google Docs, this is the wrong tool. LWW is not a merge.

---

class: scene

## Airplane mode

SAME APP · SAME BASEMENT · THE TRUTH IS ALREADY ON THE PHONE

<object data="./images/offline-first/scene-4-airplane-mode.svg" type="image/svg+xml" aria-label="scene-4-airplane-mode"></object>

???
Say it, don't show it: "No spinner. No error screen. Two changes waiting for a signal that can take its time."

On screen (Airplane mode: same app, it just works):

- deleted: true
- SWIPE UP · KILLED
- AIRPLANE MODE
- no signal, on purpose
- ADD · RE-RENDERED AT ~0 MS
- no spinner, nothing awaited
- DELETE · TOMBSTONE
- the row stays, flagged
- PENDING QUEUE
- on disk · retrySync: true
- FORCE-QUIT · REOPEN
- still there. all of it.
- API
- POSTGRES
- NO SIGNAL

~30s. Callback to the three spinners from the open. Don't narrate it, it
loops every 12 seconds: add, delete, force-quit, reopen, still there.
Let it run twice. Then the one line: no spinner, no error screen.

---

class: center, middle

# The device owns the truth

--

The server is just the **other** device — the one that syncs slowest.

???
~30s. This is the takeaway. Say it, stop talking, let it land.

If they remember one sentence from twenty minutes, it is this one.

---

## YOU

--

- Open your app. Turn on airplane mode. Tap something. **Today.**

--

- Then answer the four questions _before_ your first `observable()`.

--

- Because milliseconds matter — and so does the basement of a
  grocery store with no signal.

???
~45s. Make the airplane-mode thing feel like a dare.
Most of them have never done it once.

---

# David Leuliette

Mobile Engineer @ sunday

`@flexbox_`

Slides: [**davidl.fr/courses/offline-first.html**](https://davidl.fr/courses/offline-first.html)

French React Native podcast: **Le Cross Platform Show**

???

I am David aka @flexbox on the internet.

That was my talk. Thank you.
