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
