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

class: center, middle

# Who remembers this?

--

## The blue screen of death

--

Microsoft

???
~25s. Hands up. Wait for it.

---

class: center, middle

# And this one?

--

## The red ring of death

--

Xbox 360

???
~25s. "Red ring", not "red light".

---

class: center, middle

# And this one?

--

## The white screen of death

--

David Leuliette — Microsoft MVP

???
~30s. Deadpan. If no hands go up, that's the joke — say so.
This is your whole intro. No bio slide.

---

class: center, middle

![White screen](img/white-screen-of-hell-iphone.png)

???
~10s. Say nothing. Let them look.

---

class: middle

# This app didn't crash

--

## It's waiting for a server it can't reach

--

It will wait forever.

???
~10s. Grocery store. Basement. Regional train.

---

class: center, middle

> Why don't we design something as seemingly obvious
> and trivial as error messages first?

Vitaly Friedman — founder, Smashing Magazine

???
~15s. "I learned this job from Smashing Magazine books.
This quote is basically my whole career." That's all — save the rest for the hallway.

---

class: center, middle

> Why don't we design something as seemingly obvious
> and trivial as offline data first?

David Leuliette

???
~20s. Through-line. Call back once per decision.

---

class: middle

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

class: middle

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
