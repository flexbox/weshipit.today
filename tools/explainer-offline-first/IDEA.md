# Offline-first, explained in 45 seconds

## The one idea

In an offline-first app, a tap saves to phone storage first and syncs to the server later, so nobody waits on the network.

## Audience, and what they already believe

Founders and CTOs who buy or approve mobile apps, but don't build them every day.
They believe: _"When there's no signal, the app can't save. That's just how phones work."_

## The question the film answers, in their words

> "Why does our app just spin when my team loses signal, and what would 'offline-first' actually change?"

## Outcome

After 45 s the viewer can say: _"Our app saves to the server first, so no signal means no save. Offline-first saves in phone storage first and syncs a queue in order later. So I'll ask my team where a tap saves first."_

## Hook: the belief that turns out to be wrong

The spinner looks like the network's fault. It's really an architecture choice: where the app saves first.

## Must-know (in the film)

1. A server-first app needs the network to save each tap.
2. An offline-first app saves in phone storage first, so the screen updates right away.
3. Every change also joins a queue.
4. When the signal comes back, the queue syncs to the server in the order things happened.
5. Flip that one choice and the same taps are lost.

## Cut list (stays out)

- Conflict resolution, CRDTs, last-write-wins: true, but this film is about where data is saved first.
- Library names in the body of the film. Legend State and Supabase go in the README and SOURCES only.
- MMKV / SQLite / IndexedDB storage engines.
- Fine-grained reactivity (the earlier `legend-state.html` spot covers it for developers).
- Any percentage or "X% of users are offline" stat. We don't have a sourced number, so it goes.
- Auth, retries/backoff, partial sync, schema migrations.

## Metaphor?

None. A metaphor (a post office, a notebook) would be less accurate than the real path, which is easy to see: phone storage → queue → server. We show that path.

## Does it need a name?

The pattern gets one name, used every time: **offline-first**. The parts are named **phone storage**, **queue** and **server**, and those words never change. The library stays out of the film.
