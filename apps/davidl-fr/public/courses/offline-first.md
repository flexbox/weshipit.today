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

Welcome to "Offline First Mobile Apps with React Native & Legend State"

One idea: the device owns the truth.

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
_01:45_

--

## It’s waiting for a server it can’t reach

--

It will wait forever.

--

You may be online but not online.

???

---

### Regional Trains

![](./images/offline-first/markus-winkler-3t3Tk-BYiA4-unsplash.jpg)

thanks to[Markus Winkler](https://unsplash.com/photos/silver-and-red-bullet-train-3t3Tk-BYiA4) - Available for hire.

???
The same infinite spinner could arrive when you are on a regional train

---

### DIY Store

![](./images/offline-first/tianlei-wu-sf6YUxvCoro-unsplash.jpg)

thanks to [Tianlei Wu](https://unsplash.com/photos/person-walks-down-aisle-of-stocked-warehouse-shelves-sf6YUxvCoro) - Available for hire.

???
DIY store with the list of items you need to buy to fix your bathroom

on a saturday

with wife and kids running around

---

###  Fancy Bar

![](./images/offline-first/qui-nguyen-S6atLH5Rf0U-unsplash.jpg)

thanks to [qui nguyen](https://unsplash.com/photos/empty-chairs-and-tables-inside-lighte-room-cnTdKzMOBns) - Available for hire.

---

### A conference with 6,000 attendees

![](./images/offline-first/nextapp-conf.jpg)

---

class: scene

## Classic

THE TRUTH LIVES ON THE SERVER · THE PHONE ASKS FOR IT

<object data="./images/offline-first/scene-1-classic.svg" type="image/svg+xml" aria-label="scene-1-classic"></object>

???
_02:15_

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
_02:40_

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
_02:55_

Offline is an error state we ship to every user, every day,
and we still design it last.

Thank you Vitaly I will hack your quote and change one word

Why don’t we design offline data first?

---

## We should

???
_03:35_

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
_04:05_

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
- React Query
- Jotai

???
Ten years in react, a new state library every time I updated my résumé

Most of them solved client state and treated the network as an afterthought — and the ones that got it right,

we only figured out around 2020.

A problem remained: offline and persistence across app kills

---

## Why Legend State

--

???
_04:30_

The key to building the fastest apps

is to minimize the amount of work that React do.

That means having smaller renders,

and rendering less often.

–Jay Meistrich

In the next session, he will talk about how desktop apps can benefit from the same principles.

in 2022 at `App.js` Catalin Miron pointed me to this library (That's why it's important to come to conferences to meet people and have random conversations).

---

## Why Legend State

### It just works

.it-works[![Slack feedback](./images/offline-first/legend-state-works.png)]

???
Even a human can write the code correctly, can you believe that?

The screenshot is in French. Translate it:

I asked to my friend:

"What are the three things you liked about Legend State for offline?"

"Second-hand: I handed it all to an intern, who turned out to be great and we hired him back.
My feeling is that it just works for local vs remote state."

---

## Why Legend State

.legend-shot[<object data="./images/offline-first/scene-state-benchmark.svg" type="image/svg+xml" data-play-on-show aria-label="Legend State benchmark"></object>]

???

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

export const games$ = observable(
  syncedSupabase({
    supabase,
    collection: 'games',
    // Persist data and pending changes locally
    persist: {
      name: 'games',
      plugin: ObservablePersistMMKV,
    },
    // ... 4 more lines are missing
  }),
);
```

???
_05:55_

This is the minimal config.

As you can see I rely on supabase for the remote sync.

But you can use `CRUD` operations with any backend.

I use MMKV for local persistence because it's fast and reliable.

The setup is deliberately incomplete — 4 lines are missing.

The rest of the talk is those 4 lines.

---

# Reads and writes

```js
const games = useValue(games$);
```

```js
games$[id].title.set('The Legend Of Zelda');
```

???

In Legend State you work with observable functions `get` and `set`,

it lives outside of the react world

The benefit is that you can use it anywhere, notifications, background tasks, tests.

No Provider, no Context.

--

This is the part everyone already gets right.

--

That write works on a plane.

--

It syncs when you land.

--

It is not why your app breaks.

???

**it syncs when you land**.

---

class: scene

## Offline-first · the write

THE TRUTH LIVES ON THE PHONE · THE NETWORK IS NOT INVITED

<object data="./images/offline-first/scene-2-offline-write.svg" type="image/svg+xml" aria-label="scene-2-offline-write"></object>

???
_07:05_

Same drawing as before, flipped: the truth now lives on the phone.

Follow the tap from top to bottom:

1. **The list.** I tick a box. The row re-renders right away, before
   anything is saved. Nothing waits.
2. **The local store** (MMKV). The change is saved on the phone.
   This is now the source of truth, not the server.
3. **The pending queue.** The change also waits here, to be sent later.

On the right, Supabase is grey on purpose: I'm offline. The NO SIGNAL
cross doesn't matter. The app never asked the network for anything.

Nothing in this picture waited for the network.

Every choice that follows is about what happens in that queue.

---

# 4 decisions

???
_07:40_

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

"Every one of these has a default. Every default is wrong for offline."

---

# 1. Who makes the id?

???
_09:10_

Story: you tap "add" in a basement. The new row needs an id right now.
Normally the database picks it (1, 2, 3…). The database is not there.

--

Offline, there is no server to ask.
**The phone creates the id.**

--

```js
// provide a function to generate ids locally
const generateId = () => uuidv4();
configureSyncedSupabase({
  generateId,
});
```

???
`uuidv7()` comes from the `uuid` package.
A UUID is a random-looking id like `0192f1c4-…`. Two phones will never make the same one.

--

Use **UUID v7**, not v4.

<small>v7 starts with the time, so new rows are stored in order.<br>
v4 is fully random, so the database index gets slower as the table grows.</small>

???
If asked: v4 inserts land on random pages of the index (page splits, bloat).
v7 always lands at the end, like an auto-increment. People thank me for this one.

--

The phone now chooses ids, so the database must check every write.

<small>In Supabase that is **Row Level Security** (RLS):
rules in Postgres that say which rows each user can read and write.</small>

???
Without those rules, any client can send any id, including someone else's row.

--

Decide this **before the first row**. Changing ids later means a migration.

???
Even on a new project, this is day-one: every foreign key, URL and analytics
event will carry these ids.

---

# 2. How do you delete?

???
Slow down here. This one breaks people's mental model.

--

Phone A deletes a row. Phone B was offline.

When B comes back, it asks: **"what changed since my last sync?"**

???
Story with two phones:
Phone A deletes "Zelda". Phone B was offline the whole time.

B comes back and asks the server for the changes since its last sync.

That is what `changesSince: 'last-sync'` does.

--

A deleted row is not in the answer. **B keeps it forever.**

???
The server answers with the rows that changed.
A deleted row is not a row anymore: it is simply missing from the answer.
And for B, "missing" looks exactly like "nothing changed".
So Zelda stays on phone B. Forever.

---

class: scene

## Deleting offline

HARD DELETE: PHONE B NEVER HEARS ABOUT IT · TOMBSTONE: IT DOES

<object data="./images/offline-first/scene-5-delete.svg" type="image/svg+xml" aria-label="scene-5-delete"></object>

???
_10:40_

The same story, played twice. It loops every 16 seconds.

1. Hard delete. Phone A deletes Zelda. Postgres removes the row.
   Phone B comes back and asks "what changed since my last sync?"
   The answer is empty. Phone B shows Zelda forever.
2. Tombstone. Same tap. The row stays with `deleted: true`.
   Phone B gets that change and removes Zelda.

Key line: "A missing row says nothing. A tombstone says: I was deleted."

---

# 2. How do you delete?

So you don't delete. You mark it: `deleted: true` 🪦

<small>This marker is called a **tombstone**: the row stays, and says "I was deleted".</small>

???
The row stays in the database with `deleted = true`.

That is just an update, and updates sync like any other change.

B receives it and removes Zelda from its list.

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
_11:55_

Tombstones fix sync, but they are not free. Three costs.

--

1. **Deleted rows stay in your database.**<br>
   <small>Add a cleanup job that really deletes old tombstones, e.g. after 30 days.</small>

???
Every delete is now an update, so the table only grows.
A scheduled job (a cron, or `pg_cron` in Supabase) removes tombstones older than 30 days.

_If asked: a phone offline for more than 30 days missed those tombstones.
When it comes back, do a full sync instead of "changes since last sync"._

--

1. **Every read must skip deleted rows.**<br>
   <small>Each query, each view, each Supabase access rule needs `deleted = false`.
   Forget it once, and deleted games come back in a list.</small>

???
This is the bug you will ship: one screen, one query without the filter,
and a game the user deleted last week shows up again.

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

# 3. Who wins?

???
_13:40_

Tell it as a story. One game, two phones, both offline.

--

Two phones edit the same game. Both offline.

```js
// on the server  { title: 'Zelda',      done: false }
// phone A        { title: 'Zelda TOTK', done: false }  renames it
// phone B        { title: 'Zelda',      done: true  }  ticks it
```

???
Phone A renames the game. Phone B ticks it as done.
Different fields. Nobody is in conflict. Both edits should survive.

--

**The last phone to sync wins.**
By default Legend State sends the **whole row**.

<small>B syncs last and sends `title: 'Zelda'` too: A's rename is gone. No error.</small>

???
Legend State has no conflict resolution, and does not pretend to.
The last write to reach the server replaces the row. That is "last write wins".

The trap is the default: an update sends the whole row,
so B also sends the old title it never touched, and erases A's rename.

--

```js
updatePartial: true, // send only the fields that changed
```

<small>A sends only `title`, B sends only `done`: both edits are kept.</small>

???
Same field on both phones? Still last to sync wins,
but on one field, not the whole row.

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
_14:40_

Last write wins rule is fine for most data. Not for these three.

--

1. **Counters and stock.**<br>
   <small>Two phones sell the last 10 tickets: both write 9. You sold 2, the server says 9.</small>

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
_15:05_

--

> "It syncs when you land."
>
> — me, eight minutes ago

--

Not with the config I showed you.

???
Own it. The callback is the point — let it sit for a beat.

Pending changes live in memory. Airplane mode, tap, swipe up, kill the app:
the write never existed. This is the bug that shipped to production for me.

---

# 4. Does it survive?

```js
persist: {
  name: 'games',
  plugin: ObservablePersistMMKV,
  retrySync: true,   // pending changes go to MMKV, not just memory
},
retry: {
  infinite: true,    // keep retrying until it saves
},
```

???
_16:20_

--

**The trap:** a change the server will _never_ accept
— RLS reject, deleted parent row — retries forever.

--

Infinite retry needs a poison-pill escape hatch.

???
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
_16:50_

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

Signal is back. Read the arrows once, left to right: the queue drains
as upserts, ids came from the phone so retries are safe. A delta comes back
with tombstones. Fields merge, last write wins. That is the four decisions
drawn as one picture. Next slide is the same thing as code.

---

# The whole thing

```js
configureSyncedSupabase({ generateId: () => uuidv7() }); // 1 id generation

export const games$ = observable(
  syncedSupabase({
    supabase,
    collection: 'games',
    changesSince: 'last-sync',
    fieldUpdatedAt: 'updated_at',
    fieldDeleted: 'deleted', // 2 deletions
    updatePartial: true, // 3 conflict resolution
    persist: {
      name: 'games',
      plugin: ObservablePersistMMKV,
      retrySync: true, // 4 offline-first persistence
    },
    retry: { infinite: true }, // 4 infinite retry
  }),
);
```

???
_17:40_

--

Four lines more than the minimal config. That is the whole talk.

???
Don't read it. Point at the four numbers, name each decision once.

"Ids. Deletes. Conflicts. Retries. Four lines. Everything else was already
in the minimal config."

---

# The trade-offs

???
_18:40_

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
This is where the abstract's "hard-won" claim gets paid.

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
_19:05_

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

Callback to the three spinners from the open. Don't narrate it, it
loops every 12 seconds: add, delete, force-quit, reopen, still there.
Let it run twice. Then the one line: no spinner, no error screen.

---

class: center, middle

# The device owns the truth

???
_19:25_

--

The server is just the **other** device — the one that syncs slowest.

???
This is the takeaway. Say it, stop talking, let it land.

If they remember one sentence from twenty minutes, it is this one.

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

???

---

# David Leuliette

Mobile Engineer @ sunday

`@flexbox_`

Slides: [**davidl.fr/courses/offline-first.html**](https://davidl.fr/courses)

French React Native podcast: [**Le Cross Platform Show**](https://weshipit.today/podcast)

???
_20:00_

I am David aka `@flexbox_` on the internet.

That was my talk.

Thank you.
