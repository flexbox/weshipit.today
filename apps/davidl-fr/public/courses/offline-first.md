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
Guten Tag. 30 minutes. One idea: the device owns the truth.

---

class: center, bsod

# Who remembers this?

--

## The Blue Screen of Death

.crash-shot[![Windows 9x blue screen of death](./images/offline-first/Windows_9X_BSOD.png)]

--

Microsoft

--

???
~25s. Hands up. Wait for it.

---

class: center, rrod

# And this one?

--

## The Red Ring of Death

.crash-shot[![Xbox 360 red ring of death](./images/offline-first/Xbox360-ringofdeath.jpg)]

--

Xbox 360

--

???

---

class: center

# And this one?

--

## The White Screen of Hell

--

David Leuliette — Microsoft MVP

???
~30s. Deadpan. If no hands go up, that's the joke — say so.

---

class: center

.phone-shot[![White screen of hell on iPhone](./images/offline-first/white-screen-of-hell-iphone-shadow.png)]

???
~10s. Say nothing. Let them look.

---

# This app didn’t crash

--

## It’s waiting for a server it can't reach

--

It will wait forever.

???
~10s. Grocery store. Basement. Regional train.

---

class: center, middle

> Why don’t we design something as seemingly obvious
> and trivial as error messages first?

Vitaly Friedman — founder, Smashing Magazine

???
~15s. "I learned this job from Smashing Magazine books.
This quote is basically my whole career." That's all — save the rest for the hallway.

---

class: center, middle

> Why don’t we design something as seemingly obvious
> and trivial as offline data first?

David Leuliette

???
~20s. Through-line. Call back once per decision.

---

> because "Milliseconds Matter"

???

for me the answer is clear: optimize for latency.
The Amazon Benchmark: a famous study showing that every 100ms of added latency costs 1% in sales.

---

- useState (or setState)
- Context
- Redux
- MobX-State-tree
- Immer
- Unstated
- Recoil
- xState
- Jotai
- zustand

<https://github.com/GantMan/ReactStateMuseum>

???

I am in the react ecosystem since 10+ years. I have seen many state management libraries come and go, but the core challenges of offline-first and latency optimization remain the same.

---

## One day, I landed on this

--

.legend-state-brenchmark[![Legendapp State on iPhone](./images/offline-first/legendapp-state.png)]

???

an extremely fast, lightweight (4kb) state management and sync library for and React

---

## And then, one day I got in

--

.legend-state-brenchmark[![Legendapp State on iPhone](./images/offline-first/appjs-2022.png)]

The moment I realized the power of offline-first state management was when I could make changes on my phone without worrying about network connectivity.

???

it's important to come to conferences and hang out with the community.

I hanged out with Catalin Miron, and he shared with me some input on using legend-state.

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

---

# Reads and writes

```js
const todos = use$(todos$);

todos$[id].text.set('Buy milk');
```

--

That write works on a plane. It syncs when you land.

--

This is the part everyone already gets right.
It is not why your app breaks.

???
~45s. The pivot. Four decisions come after this.

---

## YOU

--

- Inspired to learn offline-first patterns?
- Inspired to contribute to talk to your neighbors about offline-first state management?

--

- because Milliseconds Matter

---

David Leuliette

Mobile Engineer @ sunday

<!-- weshipit.today -->

???

I am David aka @flexbox on the internet.

That was my talk. Thanks you.
