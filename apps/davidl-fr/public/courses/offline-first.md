name: inverse
layout: true
class: center, middle, inverse

---

layout: false

# Offline First Mobile Apps

## with React Native & Legend State

📍 reactCon · next.app devCon - Berlin

🗓️ _8 October 2026_

<small class="text-hint">`C` to clone a display; `P` to switch to presenter mode.</small>

???
_00:15_

Guten Tag.

Welcome to my talk "Offline First Mobile Apps with React Native & Legend State"

One idea: where is the truth?

---

class: center, bsod

# Who remembers this?

???
_00:40_

Hands up.

Wait for it.

--

### The Blue Screen of Death

.crash-shot[![Windows 9x blue screen of death](./images/offline-first/Windows_9X_BSOD.png)]

--

Microsoft Windows

???

I am officially at the same level as Bill Gates, because I had a blue screen of death on stage.

---

class: center, rrod

# And this one?

???
_00:55_

--

### The Red Ring of Death

.crash-shot[![Xbox 360 red ring of death](./images/offline-first/Xbox360-ringofdeath.jpg)]

--

Microsoft Xbox 360

???
The Red Ring was a hardware failure indicator on the Microsoft Xbox 360.

---

class: center

# And this one?

???
_01:20_

--

### The White Screen of Hell

.phone-shot[![White screen of hell on iPhone](./images/offline-first/white-screen-of-hell-iphone-shadow.png)]

--

David Leuliette Microsoft MVP

???
As a Microsoft MVP, I have seen my fair share of device failures.

I can officially name the "White Screen of Hell" as one of them.

---

class: center

### Spinners that never stop

.phone-shot[![Mighty spinner on iPhone](./images/offline-first/mighty.gif)]
.phone-shot[![Pennylane spinner on iPhone](./images/offline-first/pennylane.gif)]
.phone-shot[![Vinted spinner on iPhone](./images/offline-first/vinted.gif)]

???
_01:35_

If you are lucky you will have an infinite spinner

---

# This app didn’t crash

???
_01:50_

--

## It’s waiting for a server it can’t reach

--

It will wait forever.

--

You may be online but not online.

---

class: photo

### Regional Trains

![](./images/offline-first/markus-winkler-3t3Tk-BYiA4-unsplash.jpg)

<small>thanks to [Markus Winkler](https://unsplash.com/photos/silver-and-red-bullet-train-3t3Tk-BYiA4) - Available for hire.</small>

???
_02:05_

The same infinite spinner could arrive when you are on a regional train

---

class: photo

### DIY Store

![](./images/offline-first/tianlei-wu-sf6YUxvCoro-unsplash.jpg)

<small>thanks to [Tianlei Wu](https://unsplash.com/photos/person-walks-down-aisle-of-stocked-warehouse-shelves-sf6YUxvCoro) - Available for hire.</small>

???
_02:25_

DIY store with the list of items you need to buy to fix your bathroom

on a saturday

with wife and kids running around

---

class: photo

###  Fancy Bar

![](./images/offline-first/qui-nguyen-S6atLH5Rf0U-unsplash.jpg)

<small>thanks to [qui nguyen](https://unsplash.com/photos/empty-chairs-and-tables-inside-lighte-room-cnTdKzMOBns) - Available for hire.</small>

???
_02:35_

---

class: photo

### A conference with 6,000 attendees

![](./images/offline-first/nextapp-conf.jpg)

???
_02:45_

---

class: scene

## Classic

THE TRUTH LIVES ON THE SERVER · THE PHONE ASKS FOR IT

<object data="./images/offline-first/scene-1-classic.svg" type="image/svg+xml" aria-label="scene-1-classic"></object>

???
_03:15_

Here is a classic situation: like most of the apps in the room.

The truth lives on the server, the phone asks for it,

and when the phone can't ask, it has nothing.

`isPending: forever` is the whole problem in two words.

The server is fine.

The phone is not, and it has no data of its own to fall back on.

---

class: center, middle

> Why don’t we design<br />
> something as seemingly obvious and trivial<br />
> as error messages first?

Vitaly Friedman — co-founder, Smashing Magazine

???
_03:40_

People from Berlin, today I am so happy to give this talk here.

For the ones who don't know, Smashing Magazine is a popular online resource for web designers and developers, from Germany.

That's how I learned my job, by reading Smashing Magazine books.

This quote is basically my whole career.

Why don’t we design error messages first?

Design for failure seems obvious, right?

---

class: center, middle

> Why don’t we design<br />
> something as seemingly obvious and trivial<br />
> as **offline data first**?

David Leuliette

???
_03:55_

Offline is an error state we ship to every user, every day,
and we still design it last.

Thank you Vitaly I will hack your quote and change one word

Why don’t we design offline data first?

---

## We should

???
_04:30_

--

## Because milliseconds matter

???
Offline-first is not a feature for people with no signal.

It is the fastest possible app for everyone, because nothing awaits the network.

--

.phone-shot[![Instagram on iPhone](./images/offline-first/instagram.webp)]

???
Instagram, first version: the upload started in the background as soon as
you picked a filter.

While you were still writing the caption, the upload was already done.

Tap "Share": instant.

That is the same trick.

Local first, network later.

---

## 10+ years of React state

???
_05:00_

I have been working with React state for over 3 600 days.

--

- `setState`
- Redux
- MobX-State-Tree
- Context API (React 16.3)
- Easy Peasy
- `useState` / `useReducer` (16.8)
- XState
- Zustand
- Redux Toolkit
- TanStack Query
- Jotai

???
Ten years in react, a new state library every time I updated my résumé

Most of them solved client state and treated the network as an afterthought — and the ones that got it right,

we only figured out around 2020.

A problem remained: offline and persistence across app kills

---

## Why Legend State

???
_05:30_

--

???
The key to building the fastest apps

is to minimize the amount of work that React and React Native do.

That means having **smaller renders**,

and **rendering less often**.

–Jay Meistrich

In the next session, he will talk about how desktop apps can benefit from the same principles.

in 2022, I was in another conference called `App.js` Catalin Miron pointed me to this library (That's why it's important to come to conferences to meet people and have random conversations).

---

## Why Legend State

### It just works

.it-works[![Slack feedback](./images/offline-first/legend-state-works.png)]

???
_05:55_

Even a human can write the code correctly, can you believe that?

The screenshot is in French. Translate it:

I asked to my friend:

"What are the three things you liked about Legend State for offline?"

"I handed it all to an intern,

who turned out to be great and we hired him back.

My feeling is that it just works for local vs remote state."

---

## Why Legend State

.legend-shot[<object data="./images/offline-first/scene-state-benchmark.svg" type="image/svg+xml" data-play-on-show aria-label="Legend State benchmark"></object>]

???
_06:25_

The lib is tiny and fast (only `4kb`)

and the persistance layer with the sync engine is built in.

I will not talk about one global state versus multiple atoms because you can do whatever you want.

It's pure JavaScript.

---

# Let's define the observable state

```js
import { observable } from '@legendapp/state';
import { syncedSupabase } from '@legendapp/state/sync-plugins/supabase';
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv';

export const items$ = observable(
  syncedSupabase({
    supabase,
    collection: 'items',
    // Persist data and pending changes locally
    persist: {
      name: 'items',
      plugin: ObservablePersistMMKV,
    },
    // ... 4 more lines are missing
  }),
);
```

???
_07:10_

This is the minimal config.

As you can see I rely on supabase for the remote sync.

But you can use `CRUD` operations with any backend.

I use MMKV for local persistence because it's fast and reliable. But you can use AsyncStorage or SQLite as well.

The setup is deliberately incomplete — 4 lines are missing.

The rest of the talk is those 4 lines.

---

# Reads and writes

```js
const items = useValue(items$);
```

```js
items$[id].bought.set(true); // in the cart
```

???
_07:55_

In Legend State you work with observable functions `get` and `set`,

it lives outside of the react world

The benefit is that you can use it anywhere, notifications, background tasks, tests.

No Provider, no Context.

--

This is the part everyone already gets right.

--

That write works in the store basement.

--

It syncs when you walk out of the store.

???

**it syncs when you walk out of the store**.

---

class: scene

## Offline-first · the write

THE TRUTH LIVES ON THE PHONE · THE NETWORK IS NOT INVITED

<object data="./images/offline-first/scene-2-offline-write.svg" type="image/svg+xml" aria-label="scene-2-offline-write"></object>

???
_08:25_

Same drawing as before, flipped: the truth now lives on the phone.

Follow the tap from top to bottom:

1. **The list.** I tick a box. The row re-renders right away, before
   anything is saved. Nothing waits.
2. **The local store** (MMKV). The change is saved on the phone.
   This is now the source of truth, not the server.
3. **The pending queue.** The change also waits here, to be sent later.

On the right, Supabase is grey on purpose:

I'm offline.

The NO SIGNAL cross doesn't matter.

The app never asked the network for anything.

Nothing in this picture waited for the network.

Every choice that follows is about what happens in that queue.

---

# 4 decisions

???
_09:00_

That is the extent of the library pitch.

The rest of the talk is not about Legend State.

It is about the 4 things Legend State can't decide for you.

--

1. **Who makes the id?**<br>
   <small>Offline, there is no server to number the new row.</small>

???

Ids: "Offline, nobody is there to bump the row number."

--

1. **How do you delete a row?**<br>
   <small>A phone that was offline must still learn the row is gone.</small>

???

Deletes: "A phone that was offline still has to learn the row is gone."

--

1. **Who wins?**<br>
   <small>Two phones edit the same row offline. Both sync. Which edit stays?</small>

???

Conflicts: "Two phones, same row, both offline. When they both sync, one edit replaces the other. Which one?"

--

1. **Does it survive a force-quit?**<br>
   <small>Changes wait in the queue. The user kills the app. Are they still there?</small>

???

Force-quit: "Changes are waiting in the queue. The user kills the app.
Are they still there?"

Every one of these has a default.

Every default is wrong for offline.

---

# 1. Who makes the id?

???
_10:20_

Story:

you tap "add" in a basement.

The new row needs an id right now.

Normally the database picks it (1, 2, 3…).

The database is not there.

--

Offline, there is no server to ask.
**The phone creates the id.**

--

```js
// provide a function to generate ids locally
const generateId = () => uuidv7();
configureSyncedSupabase({
  generateId,
});
```

???
Use the `uuid` package.
A UUID is a random-looking id like `0192f1c4-…`. Two phones will never make the same one.

--

Use **UUID v7**, not v4.

<small>v4 is fully random, so the database index gets slower as the table grows.<br>
v7 starts with the time, so new rows are stored in order.</small>

???
v4 inserts random indexes.

v7 puts a millisecond timestamp in the high bits, then random bits. New rows always lands at the end, like an auto-increment.

--

The phone now chooses ids, so the database must check every write.

<small>In Supabase that is **Row Level Security** (RLS):
rules in Postgres that say which rows each user can read and write.</small>

???
Without those rules, any client can send any id, including someone else's row.

--

Decide this **before the first row**. Changing ids later means a migration.

???
On a new project, this is day-one: every foreign key, URL and analytics
event will carry these ids.

---

# 2. How do you delete?

???
_11:05_

Slow down here. This one breaks people's mental model.

--

Phone A deletes a row. Phone B was offline.

When B comes back, it asks: **"what changed since my last sync?"**

A deleted row is not in the answer. **B keeps it forever.**

???
Story with two phones, same shopping list:

At home, I remove the mirror cabinet: we changed our mind.

My partner is in the store basement, phone B, offline the whole time.

B comes back and asks the server for the changes since its last sync.

That is what `changesSince: 'last-sync'` does.

---

class: scene

## Deleting offline

HARD DELETE: PHONE B NEVER HEARS ABOUT IT · TOMBSTONE: IT DOES

<object data="./images/offline-first/scene-5-delete.svg" type="image/svg+xml" aria-label="scene-5-delete"></object>

???
_11:35_

The same story, played twice.

1. Hard delete. Phone A removes the mirror cabinet. Postgres deletes the row.
   Phone B comes back and asks "what changed since my last sync?"
   The answer is empty. Phone B shows the cabinet forever, and buys it.
2. Tombstone. Same tap. The row stays with `deleted: true`.
   Phone B gets that change and removes the cabinet.

A missing row says nothing.

A tombstone says: I was deleted.

---

# 2. How do you delete?

So you don't delete. You mark it: `deleted: true` 🪦

<small>This marker is called a **tombstone**: the row stays, and says "I was deleted".</small>

???
_12:10_

The row stays in the database with `deleted = true`.

That is just an update, and updates sync like any other change.

B receives it and removes the mirror cabinet from the list.

The tombstone IS the message.

--

```js
syncedSupabase({
  // ...
  changesSince: 'last-sync',
  fieldDeleted: 'deleted', // delete = set deleted to true
}),
```

???
`fieldDeleted` tells Legend State: when the app deletes a row,
send `deleted: true` instead of a real DELETE.

Your table needs a `deleted` boolean column, default false.

---

# 2. How do you delete?

## What it costs

???
_13:20_

Tombstones fix sync, but they are not free. Three costs.

--

1. **Deleted rows stay in your database.**<br>
   <small>Add a cleanup job that really deletes old tombstones, e.g. after 30 days.</small>

???
Every delete is now an update, so the table only grows.
A scheduled job (a cron, or `pg_cron` in Supabase) removes tombstones older than 30 days.

_a phone is offline for more than 30 days?.
When it comes back, do a full sync instead of "changes since last sync"._

--

1. **Every read must skip deleted rows.**<br>
   <small>Each query, each view, each Supabase access rule needs `deleted = false`.
   Forget it once, and removed items come back in a list.</small>

???
This is the bug you will ship: one screen, one query without the filter,
and the cabinet you removed last week shows up again.

"Access rules" = Row Level Security policies in Supabase.
Put the filter there or in a view, so nobody has to remember it.

--

1. **A tombstone is not a legal delete.**<br>
   <small>With `deleted: true`, the data is still there.
   "Delete my account" (GDPR) needs a real erase.</small>

???
Berlin audience: this one lands. Do not rush it.

GDPR (Article 17, the "right to be forgotten"): when a user asks,
their personal data must actually be erased.
A tombstone only hides it: the name, the email, everything is still in the row.

So for "delete my account": wipe every personal field,
and keep only the id with `deleted: true`.
The phones still learn the row is gone, and the data is really erased.

---

class: scene

## 3. Who wins?

TWO PHONES · SAME ITEM · BOTH OFFLINE

<object data="./images/offline-first/scene-3b-who-wins.svg" type="image/svg+xml" data-play-on-show aria-label="Whole row versus only the fields that changed"></object>

???
_14:50_

Tell it as a story. One shopping list, two phones, both offline.

1. At home, I realise we need two shower heads: quantity 2.
   In the store, my partner puts one in the cart: bought.
   Different fields. Nobody is in conflict. Both edits should survive.
2. By default, each phone sends the **whole row**.
   B syncs last, so it also sends the old quantity it never touched,
   and erases mine. No error. We go home with one shower head.
   Legend State has no conflict resolution, and does not pretend to: last write wins.
3. With `updatePartial: true`, A sends only `qty`, B sends only `bought`.
   Both edits are kept.

---

# 3. Who wins?

```js
updatePartial: true, // send only the fields that changed
```

<small>Same field on both phones? The last to sync still wins, but on one field, not the whole row.</small>

--

**The server stamps the time, never the phone:** a Postgres trigger sets `updated_at`.

???
`changesSince: 'last-sync'` uses `updated_at` to find what changed.
If the phone set it, a wrong phone clock (set by hand, wrong time zone)
would hide changes from the other phones.
So a trigger sets it in Postgres. Legend's Supabase docs give you the SQL.

---

# 3. Who wins?

## Keep these on the server

???
_15:45_

Last write wins rule is fine for most data. Not for these three.

--

1. **Counters and stock.**<br>
   <small>Two customers take the last mirror cabinet: both phones write stock 0. Two sold, one on the shelf.</small>

--

1. **Text that two people edit at the same time.**<br>
   <small>That needs a CRDT: a data type that merges edits, like Google Docs.</small>

--

1. **Money.**<br>
   <small>Balances, payments, refunds. Being wrong is too expensive.</small>

--

For these: ask the server, and show a spinner.
**Everything else lives on the phone.**

???
The most useful thing I can tell you today.

Offline-first is not "everything offline". It is "everything offline
**except** the things where being wrong is expensive".
Stock, balances, seat reservations: the server decides, and the UI
is allowed to wait for it.

One spinner in the whole app, on purpose, is a design decision.

Forty accidental ones is a bug.

---

# 4. Does it survive?

???
_16:20_

--

> "It syncs when you walk out of the store."
>
> — me, eight minutes ago

--

Store basement. Tick the silicone. Swipe up, kill the app. Walk out.<br>
**The silicone never reaches the server.**

<small>The list of changes waiting to be sent lived in memory. Killing the app erased it.</small>

???
_slowly, one action at a time_.

The tick itself is saved on the phone: MMKV has it.

But the "still has to be sent" list was only in memory.

Kill the app, and the phone forgets it owes the server anything.

The server never hears about it.

---

class: scene

## 4. Does it survive?

TICK · KILL THE APP · WALK OUT · NOTHING ARRIVES

<object data="./images/offline-first/scene-4b-force-quit.svg" type="image/svg+xml" data-play-on-show aria-label="The tick survives the kill, the waiting list does not"></object>

???
Let it play. Point at the two lines.

1. I tick the silicone. Two things leave the phone's screen:
   the tick itself, and a note "still has to be sent".
2. Swipe up, kill. The top line is on disk: it goes straight through.
   The bottom line lived in memory: it's gone.
3. I walk out. Signal is back. The phone looks for something to send…
   and finds nothing.

The silicone is ticked on my phone, and not bought in Postgres. Forever.

---

# 4. Does it survive?

```js
persist: {
  name: 'items',
  plugin: ObservablePersistMMKV,
  retrySync: true, // 1. save the waiting changes on the phone
},
retry: {
  infinite: true,  // 2. keep trying until the server says yes
},
```

???
_17:20_

Two settings.

--

1. The waiting changes are saved in MMKV: **they survive a kill.**
2. The phone retries until the change is saved.

???
`retrySync` is two words that separate a demo from a product.
Without it, everything you did offline can vanish on a swipe up.

--

**The trap:** some changes the server will **never** accept.

<small>An access rule blocks it, or the parent row was deleted. Infinite means forever, in silence.</small>

???
I have watched a phone retry the same rejected insert for days,
because the shopping list it belonged to was gone.

Offline-first, and wrong forever, without anyone knowing.

--

So count the failures. After a few, **tell the user, or drop the change.**

???
Pick one. Both are fine. Silence is the one option that is always wrong.

Legend's sync options have an `onError` callback. Start digging there.

---

class: scene

## The store basement

TICK · REMOVE · KILL THE APP · REOPEN · WALK OUT · NOTHING IS LOST

<object data="./images/offline-first/scene-4-airplane-mode.svg" type="image/svg+xml" aria-label="scene-4-airplane-mode"></object>

???
_17:45_

Here is the entire scenario, in the store basement with no signal

1. I tick the silicone and remove the mirror cabinet.
   The list changes at once: no spinner, nothing waits for the network.
2. Both changes go into the "waiting to send" queue, saved on the phone
   (that is `retrySync: true`).
3. Swipe up, kill the app, reopen it. Both changes are still waiting.
4. I walk out of the store. The queue sends itself: the silicone is bought
   and the cabinet is deleted in Postgres. Nothing was lost.

No spinner.

No error screen.

Two changes waiting for a signal that can take its time.

---

# The whole thing

```js
configureSyncedSupabase({ generateId: () => uuidv7() }); // 1 id generation

export const items$ = observable(
  syncedSupabase({
    supabase,
    collection: 'items',
    changesSince: 'last-sync',
    fieldUpdatedAt: 'updated_at',
    fieldDeleted: 'deleted', // 2 deletions
    updatePartial: true, // 3 conflict resolution
    persist: {
      name: 'items',
      plugin: ObservablePersistMMKV,
      retrySync: true, // 4 offline-first persistence
    },
    retry: { infinite: true }, // 4 infinite retry
  }),
);
```

???
_18:20_

--

Four lines more than the minimal config. That is the whole talk.

???

1. Ids created on the client.
2. Deletes with a tombstone.
3. Conflicts resolution
4. Retries

---

# The trade-offs

???
_19:05_

--

.pull-left[

### ✅ We win

- **Instant** UI on every tap
- Works with **no signal**
- **Nothing lost** on a force-quit
- Only **changes** travel
  ]

???
For the user: speed and resilience.

The app never waits for the network, and offline is just another day.

--

.pull-right[

### ⚠️ We lose

- **Two sources of truth**
- **Last write wins**
- **Database rules**: UUIDs, tombstones, triggers
- **Harder debugging**
  ]

???
For the developer: complexity.

Every phone holds a copy, and they can disagree for a while.

Bugs depend on one phone's state: build a "dump the local store" screen on day one.

We win speed for the user.

We pay with complexity for the dev.

---

class: center, middle

# The device owns the truth

???
_19:25_

This is the takeaway.

--

The server is just the **other device** and the one that syncs slowest.

---

## Your mission today

???
_19:50_

--

- Open your app. Turn on airplane mode. Tap something. **Today.**

--

- Identify the "White Screens of Hell" in your app and fix them.

--

- Talk to random people about how their app behaves offline and make new friends.

--

- Because milliseconds matter — and so does the basement of a
  DIY store with no signal.

---

class: outro

<object data="./images/offline-first/scene-6-thanks.svg" type="image/svg+xml" data-play-on-show aria-label="Thank you · weshipit.today"></object>

???
_20:00_

I am David, `@flexbox_` on the internet.

If you speak French: Le Cross Platform Show, the podcast.

That was my talk.

Thank you.
