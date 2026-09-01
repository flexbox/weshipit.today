name: inverse
layout: true
class: center, middle, inverse

---

layout: false

<!-- TODO: replace location + date -->
<!-- 15 min. Cut candidates if running late, in order: "The honest cost", "Under the hood". -->

# Fighting Legacy Codebase

## to improve velocity

🗓️ _September 2026_

<small class="text-hint">`C` to clone a display; `P` to switch to presenter mode.</small>

???
15 minutes. Two patterns. Go.

---

## The patient

```console
repo age    : 3 years, 5 months
active on   : 649 days
```

--

Not an abandoned repo. **People are shipping right now.**

???
649 active days. Last push 72 minutes ago.

---

> Legacy code is not old code.

--

> Legacy code is **code you are afraid to change**.

???
Feathers says "code without tests". I prefer this one — it's what the team actually feels on Monday.

---

## The constraint

You cannot stop the train to change the rails.

--

So: **hot paths only**, incremental, merged on `main`. Mangrove migration with `@deprecated` tag.

---

## Two hot paths today

--

### 🎨 `StyleSheet` → Unistyles

--

### 📡 `if (!data)` → explicit query states

???
Both touch every screen. Both migrate file by file.

---

template: inverse

# 1. Styling

---

class: compact

## The symptom

<!-- prettier-ignore -->
```javascript
<View
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
  }}
>
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    }}
  >
    <Text>Challenge</Text>
    <Text>€10</Text>
  </View>
</View>
```

--

Nine lines of style. To draw **one row inside one column**.

???
Real component from the app. Ask the room: who has written this? Everybody, me included.

---

## What is wrong

--

- 🔁 Every component repeats `display: 'flex'` and picks its own `flexDirection`

--

- 🎨 `'#FFFFFF'` and `gap: 16` written by hand, everywhere

--

- 🚫 No type safety on colors or spacing

--

- 🕶️ A `View` never says whether it is a row or a stack

--

**Flexbox was never the problem.** Every component rebuilding the same layout decisions was.

???
A theme change means finding and updating many components by hand.

And it is trivial for an AI to copy the pattern into the 41st file — your legacy patterns are now your autocomplete's training data.

---

class: compact

## We already had a wrapper

<!-- prettier-ignore -->
```javascript
export const SFSColumn = (props: SFSColumnStyle) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: props.spacing ?? props.gap,
    ...(props as object),
  };

  return <View style={style}>{props.children}</View>;
};
```

--

```javascript
<SFSColumn spacing={16} padding={16} backgroundColor="#FFFFFF" />
```

--

It fixed `flexDirection`. It still accepted **any value on earth**.

???
This is the beat that matters. We _had_ an abstraction — it just wasn't connected to the design system.

A wrapper around View is not a design system. It is a shorter way to write the same mistake.

---

class: compact

## Before / after

.row[
.left-column[

### Before

<!-- prettier-ignore -->
```javascript
<View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    gap: 12,
  }}
>
  <Text>Challenge</Text>
  <Text>€10</Text>
</View>
```

]
.right-column[

### After

<!-- prettier-ignore -->
```javascript
<Row
  alignItems="center"
  backgroundColor="secondary"
  borderRadius="md"
  gap={12}
>
  <Text>Challenge</Text>
  <Text>€10</Text>
</Row>
```

]
]

--

`Row` says horizontal. `"secondary"` and `"md"` are **tokens** — and TypeScript knows them.

???
Read the right side out loud: it describes intent, not pixels.

The migration is mechanical: SFSRow → Row, SFSColumn → Column, `spacing` → `gap`.

---

## ⚡ And it is free at runtime

--

- ⚙️ C++ parser on [Nitro Modules](https://nitro.margelo.com/) — **no hooks, no context**

--

- 🔌 A Babel plugin binds each component's **ShadowNode** at compile time

--

- 🎯 A theme change recomputes only the affected styles and updates the **ShadowTree from C++**

--

**"your components are never re-rendered"** — [the docs](https://www.unistyl.es/v3/start/how-unistyles-works/)

???
Contrast with a ThemeProvider: a context change re-renders every consumer, on the JS thread, while the user watches.

Here the theme switch never reaches React at all.

---

template: inverse

# 2. Data layer

---

## Ship it? 🚢

```javascript
const { data } = useChallenges(storeId);

if (!data) {
  return <LoadingIndicator />;
}

return <ChallengeList challenges={data} />;
```

???
Let them look for three seconds. It looks completely reasonable.

---

## Real review, real PR

> Using `!data` as a loading check is unreliable with `react-query`.

--

_AI keeps doing this cr4p so our jobs are safe until the next week 🤣_

???
Private repo — screenshot the comment before the talk, don't link it.

The joke has a point: the pattern is so common in public code that models emit it by default.

---

## `!data` conflates four states

--

- ⏳ initial loading
- ❌ error
- 🕳️ empty result
- 👻 missing data

--

And hides **initial load** vs **background refetch**.

???
Error → infinite spinner instead of a retry button.
Empty → infinite spinner instead of "no challenges yet".
Refetch → the whole screen is destroyed and rebuilt.

---

## Explicit flags

| flag         | meaning                                             |
| ------------ | --------------------------------------------------- |
| `isPending`  | no data yet → render a `<Skeleton />`               |
| `isFetching` | a request is running, **including** background ones |
| `isError`    | the request failed                                  |
| `data`       | the result, **even while refetching**               |

???
Last row is the whole point: data stays available during a refetch.

---

class: compact

## Before / after

.row[
.left-column[

### Before

```javascript
const { data } = useChallenges(storeId);

if (!data) {
  return <LoadingIndicator />;
}

return <ChallengeList challenges={data} />;
```

]
.right-column[

### After

<!-- prettier-ignore -->
```javascript
const {
  data, isPending, isError, isFetching, refetch
} = useChallenges(storeId);

if (isPending) return <ChallengeListSkeleton />;
if (isError) return <ErrorState onRetry={refetch} />;
if (data.length === 0) return <NoChallengesYet />;

return (
  <>
    {isFetching && <InlineRefreshBar />}
    <ChallengeList challenges={data} />
  </>
);
```

]
]

--

Same query. Four states the user can understand.

???
Bonus: after the guards, TypeScript narrows `data` to defined. Free.

---

## ⚠️ The v5 trap

| v4                     | v5                                      |
| ---------------------- | --------------------------------------- |
| `status === 'loading'` | `status === 'pending'`                  |
| `isLoading`            | `isPending`                             |
| `isInitialLoading`     | `isLoading` (`isPending && isFetching`) |

--

`isLoading` still compiles in v5 — with a **different meaning**.

???
Grep for `isLoading` _before_ you upgrade, not after.

---

## Then stop loading the whole screen

--

```javascript
const DashboardScreen = () => (
  <ScrollView>
    <ChallengeProgress storeId={storeId} /> {/* own query, own skeleton */}
    <ChallengeList storeId={storeId} /> {/* own query, own skeleton */}
    <LeaderboardPanel storeId={storeId} /> {/* own query, own skeleton */}
  </ScrollView>
);
```

--

The progress bar renders in 40ms. The leaderboard skeletons on its own.

???
Colocate the query with the component that needs it.

A skeleton is a promise; a spinner is an apology.

---

class: center, middle

# TL;DR

--

## When you don't see the `<LoadingSpinner />` anymore

--

## everything **feels** faster

???
Land on "feels". The API is not faster. The p95 is identical.

We changed what the user looks at while they wait.

---

## Recap

--

🎨 Semantic layout primitives bound to theme tokens — not another `View` wrapper

--

📡 Four explicit states, colocated queries, skeletons over spinners

--

📝 Then write the rule in `CLAUDE.md` / lint — or file 31 brings it back

???
Codify it or it dies when you leave. That's the actual job.

---

class: center, middle

# Q&A

## [`@flexbox_`](https://twitter.com/flexbox_)

[unistyl.es](https://www.unistyl.es/) · [tanstack.com/query](https://tanstack.com/query/latest) · [davidl.fr/courses](https://davidl.fr/courses)

![QR code](https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://davidl.fr/courses)
