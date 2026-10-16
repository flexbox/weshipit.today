# Scene spec: Offline-first, explained (45 s)

96 BPM, 1 beat = 0.625 s. All times come from `src/timeline.js`, the only source of truth.
Words: **Head** = the on-screen headline (≤ 8 words, one line). **Caption** = the narration line, burned in and shipped in `captions.srt`.

| ID  | Time        | Act      |
| --- | ----------- | -------- |
| S1  | 0.0–4.6     | Question |
| S2  | 4.6–9.6     | Model    |
| S3  | 9.6–13.8    | Model    |
| S4  | 13.8–17.4   | Model    |
| S5  | 17.4–25.35  | Proof    |
| S6  | 25.35–32.75 | Proof    |
| S7  | 32.75–38.95 | Turn     |
| S8  | 38.95–45.0  | Payoff   |

---

### S1 · 0.0–4.6 · Question

- **Teaches:** with no signal, this app stalls on a simple tap.
- **Frame:** 1) the phone, close: a field-service app, "Today's visits", three rows. 2) the status bar. Nothing else.
- **Motion:** opens on the phone. At 0.5 the signal bars drain to "No signal". At 1.25 Visit 1 "Done" is tapped (ring), the row spins, and at 3.75 it turns into ✕ "Not saved" with the toast "Couldn't save. Try again."
- **Words:** Head: none (the image is the question). Caption: "No signal in the basement. The technician taps Done."
- **Sound:** low drop at 0.5 (signal lost); soft click at 1.25; muted knock + two falling notes at 3.75.
- **Check:** "The app froze because there was no signal."

### S2 · 4.6–9.6 · Model

- **Teaches:** a server-first app sends the tap to the server; no signal, no save.
- **Frame:** 1) the wire from phone to SERVER. 2) the ✕ "NO SIGNAL" gap on the wire. 3) the phone, now pulled back to the left.
- **Motion:** the camera pulls back (1.1 s). The wire draws to the server. At 6.25 the same tap repeats, and a dot leaves the row, travels the wire and stops dead at the gap (7.5). The row turns ✕.
- **Words:** Head: "Server first." Caption: "Many apps send that tap to the server first. No signal, no save."
- **Sound:** air on the pull-back; click 6.25; knock + falling notes 7.5.
- **Check:** "The tap has to reach the server, and it can't."

### S3 · 9.6–13.8 · Model

- **Teaches:** offline-first saves in phone storage first, so the screen updates now.
- **Frame:** 1) the new PHONE STORAGE box, sitting on the same wire. 2) the dot landing in it as chip 1. 3) the ✓ on Visit 1.
- **Motion:** the box draws on the wire (no new wire, same object). At 10.625 tap; the dot travels one beat to phone storage and becomes chip 1 at 11.25, the moment the row's ✓ lands.
- **Words:** Head: "Offline-first: phone storage first." Caption: "Offline-first apps save it in phone storage first. No waiting."
- **Sound:** **motif** (D–F#–A) at 11.25; the bed opens slightly.
- **Check:** "It saves on the phone, so it works without signal."

### S4 · 13.8–17.4 · Model

- **Teaches:** each change also joins a queue for the server.
- **Frame:** 1) the QUEUE box with three numbered slots. 2) chip 1 copying into slot 1.
- **Motion:** the queue draws on the wire. A copy of chip 1 slides from phone storage to slot 1 (one beat).
- **Words:** Head: "Then a queue." Caption: "Each visit also joins a queue for the server."
- **Sound:** wooden tock at 15.0 when the chip lands.
- **Check:** "The change is also waiting in line for the server."

### S5 · 17.4–25.35 · Proof

- **Teaches:** more taps with no signal: all saved, all queued, nothing lost.
- **Frame:** 1) Visits 2 and 3 turning ✓. 2) phone storage and queue filling 1 2 3. 3) the gap, still open.
- **Motion:** tap 18.75 → saved 19.375 → queued 20.0; tap 20.625 → saved 21.25 → queued 21.875. Then everything holds still while the caption is read.
- **Words:** Head: "Saved without signal." Captions: "Visits two and three, still in the basement. Each saves instantly." / "The queue holds all three. Nothing is lost."
- **Sound:** click → short motif (2 notes) → tock, twice. Soft off-beat shaker keeps the tempo.
- **Check:** "Nothing is lost while offline; it's all on the phone and in the queue."

### S6 · 25.35–32.75 · Proof

- **Teaches:** when the signal returns the queue syncs to the server, in order.
- **Frame:** 1) the gap closing. 2) chips leaving the queue 1 → 2 → 3. 3) SERVER rows "Visit 1 ✓", "Visit 2 ✓", "Visit 3 ✓".
- **Motion:** at 26.25 the signal bars refill and the ✕ disappears. Flush on beats: chip 1 leaves at 27.5, chip 2 at 28.125, chip 3 at 28.75. Each chip lands one beat later as a server row (the chip becomes the row).
- **Words:** Head: "Signal back. Synced in order." Captions: "Signal's back. The queue sends each visit to the server…" / "…in the order they happened."
- **Sound:** rising swell + full bed at 26.25; three rising mallet notes on each landing; **motif returns a fourth higher** at 30.0.
- **Check:** "When the signal comes back, it catches up by itself, in order."

### S7 · 32.75–38.95 · Turn

- **Teaches:** flip one choice to server-first, and the same taps are lost.
- **Frame:** 1) the queue and phone storage folding into the wire. 2) three taps that each stall at the gap. 3) the server, empty again.
- **Motion:** at 33.05 the signal drops on its own (the S1–S5 condition returns; nothing else moves). At 33.75 the two boxes collapse into the wire (0.7 s): the one variable flips. Rows reset. Taps on beats 34.375 / 35.0 / 35.625, each dot stopping at the gap 1.25 s later; rows go ✕ "Not saved" one by one.
- **Words:** Head: "Same taps. Server first." Captions: "Signal gone again. Now save on the server first." / "Same three taps. Nothing saved."
- **Sound:** signal drop; bed closes; three clicks, three knocks.
- **Check:** "The only difference was where the app saves first."

### S8 · 38.95–45.0 · Payoff

- **Teaches:** the spinner was a design choice; ask where a tap saves first.
- **Frame:** 1) the opening image again: the phone, close, Visit 1 spinning. 2) the annotation "WAITING ON THE SERVER". 3) the cartouche WESHIPIT.TODAY.
- **Motion:** the camera pushes back in (1.1 s); the pipeline fades away. At 40.0 a leader line draws from the spinner to the annotation. The next-step line arrives at 41.25 and gets 3.75 s; the cartouche follows at 43.4. Hold.
- **Words:** Head: none. Annotation: "WAITING ON THE SERVER". Captions: "That spinner is a design choice." / "Ask your team: where does a tap save first?"
- **Sound:** air on the push-in; the bed resolves to D major; motif plays a final time at 41.25 with the next-step line; fade over the last 1.4 s.
- **Check:** "That spinner isn't bad luck; I'll ask my team where a tap saves first."
