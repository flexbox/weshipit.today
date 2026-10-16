// TIMELINE: every beat, move, line and cue in the film. Times are in seconds.
// 96 BPM: one beat = 0.625 s. State changes land on beats so picture and sound lock.
// film.js paints from this object, audio.js schedules from it and render.mjs writes captions.srt from it.
(function () {
  const BEAT = 60 / 96;
  const b = (n) => +(n * BEAT).toFixed(4); // beat n → seconds

  const ev = {
    // S1 Question: the tap that spins
    signalDrop: 0.5,
    tapOpen: b(2), // 1.25
    errOpen: b(6), // 3.75
    // S2 Model: server first
    pullBack: 4.6,
    serverDraw: 5.0,
    tapServer: b(10), // 6.25
    hitGap: b(12), // 7.5
    // S3 Model: phone storage first
    storageDraw: 9.8,
    tapPhone: b(17), // 10.625
    savePhone: b(18), // 11.25: the key idea, motif plays
    // S4 Model: then a queue
    queueDraw: 13.9,
    copy1: b(23), // 14.375 → lands 15.0
    // S5 Proof: two more taps, still no signal
    tap2: b(30), // 18.75
    tap3: b(33), // 20.625
    // S6 Proof: signal back, queue syncs in order
    online: b(42), // 26.25
    flush: [b(44), b(45), b(46)], // 27.5, 28.125, 28.75 → each lands one beat later
    allSynced: b(48), // 30.0: motif returns
    // S7 Turn: the signal drops on its own beat, then the one variable flips
    turnReset: 33.05, // signal lost again (same as S1–S5)
    turnFold: 33.75, // phone storage and queue fold into the wire: server first
    turnTaps: [b(55), b(56), b(57)], // 34.375, 35.0, 35.625
    travel: b(2), // 1.25 s for a tap to reach the gap
    // S8 Payoff
    pushIn: 38.95,
    annotate: b(64), // 40.0
    nextStep: b(66), // 41.25
    cart: 43.4, // sign-off, after the last line has been read
    end: 45,
  };
  ev.saves = [ev.savePhone, b(31), b(34)]; // dot lands in phone storage: 11.25, 19.375, 21.25
  // storage → queue copies leave at these times and land one beat later: 15.0, 20.0, 21.875
  ev.copies = [ev.copy1, ev.saves[1], ev.saves[2]];
  ev.turnErrors = ev.turnTaps.map((t) => t + ev.travel);

  window.TIMELINE = {
    fps: 60,
    duration: 45,
    bpm: 96,
    beat: BEAT,
    seed: 20261012,
    ev,
    scenes: [
      {
        id: 'S1',
        t0: 0,
        t1: 4.6,
        act: 'Question',
        teaches: 'With no signal, this app stalls on a simple tap.',
      },
      {
        id: 'S2',
        t0: 4.6,
        t1: 9.6,
        act: 'Model',
        teaches:
          'A server-first app sends the tap to the server; no signal, no save.',
      },
      {
        id: 'S3',
        t0: 9.6,
        t1: 13.8,
        act: 'Model',
        teaches:
          'Offline-first saves in phone storage first; the screen updates now.',
      },
      {
        id: 'S4',
        t0: 13.8,
        t1: 17.4,
        act: 'Model',
        teaches: 'Each visit also joins a queue for the server.',
      },
      {
        id: 'S5',
        t0: 17.4,
        t1: 25.35,
        act: 'Proof',
        teaches:
          'More taps with no signal: all saved, all queued, nothing lost.',
      },
      {
        id: 'S6',
        t0: 25.35,
        t1: 32.75,
        act: 'Proof',
        teaches:
          'When the signal returns the queue syncs to the server, in order.',
      },
      {
        id: 'S7',
        t0: 32.75,
        t1: 38.95,
        act: 'Turn',
        teaches: 'Flip one choice to server-first: the same taps are lost.',
      },
      {
        id: 'S8',
        t0: 38.95,
        t1: 45.0,
        act: 'Payoff',
        teaches:
          'The spinner was a design choice; ask where a tap saves first.',
      },
    ],
    // On-screen headline: one line, max 8 words, never the full caption.
    heads: [
      { text: 'Server first.', t0: 5.2, t1: 9.4 },
      { text: 'Offline-first: phone storage first.', t0: 9.9, t1: 13.6 },
      { text: 'Then a queue.', t0: 14.0, t1: 17.2 },
      { text: 'Saved without signal.', t0: 17.6, t1: 25.15 },
      { text: 'Signal back. Synced in order.', t0: 26.35, t1: 32.55 },
      { text: 'Same taps. Server first.', t0: 33.75, t1: 38.75 },
    ],
    // Captions = the narration (voice line). Burned in and shipped as captions.srt.
    captions: [
      {
        text: 'No signal in the basement. The technician taps Done.',
        t0: 0.4,
        t1: 4.4,
      },
      {
        text: 'Many apps send that tap to the server first. No signal, no save.',
        t0: 4.7,
        t1: 9.4,
      },
      {
        text: 'Offline-first apps save it in phone storage first. No waiting.',
        t0: 9.7,
        t1: 13.6,
      },
      {
        text: 'Each visit also joins a queue for the server.',
        t0: 13.9,
        t1: 17.3,
      },
      {
        text: 'Visits two and three, still in the basement. Each saves instantly.',
        t0: 17.6,
        t1: 21.9,
      },
      {
        text: 'The queue holds all three. Nothing is lost.',
        t0: 22.0,
        t1: 25.15,
      },
      {
        text: 'Signal’s back. The queue sends each visit to the server…',
        t0: 25.55,
        t1: 29.15,
      },
      { text: '…in the order they happened.', t0: 29.25, t1: 32.55 },
      {
        text: 'Signal gone again. Now save on the server first.',
        t0: 32.95,
        t1: 35.95,
      },
      { text: 'Same three taps. Nothing saved.', t0: 36.05, t1: 38.75 },
      { text: 'That spinner is a design choice.', t0: 39.05, t1: 41.05 },
      {
        text: 'Ask your team: where does a tap save first?',
        t0: 41.25,
        t1: 45.0,
      },
    ],
    // Sound cues: only on actions that carry meaning.
    cues: [
      { t: ev.signalDrop, type: 'signalLost' },
      { t: ev.tapOpen, type: 'tap' },
      { t: ev.errOpen, type: 'error' },
      { t: ev.pullBack, type: 'air' },
      { t: ev.tapServer, type: 'tap' },
      { t: ev.hitGap, type: 'error' },
      { t: ev.tapPhone, type: 'tap' },
      { t: ev.savePhone, type: 'motif' },
      { t: ev.copies[0] + BEAT, type: 'tock' },
      { t: ev.tap2, type: 'tap' },
      { t: ev.saves[1], type: 'save' },
      { t: ev.copies[1] + BEAT, type: 'tock' },
      { t: ev.tap3, type: 'tap' },
      { t: ev.saves[2], type: 'save' },
      { t: ev.copies[2] + BEAT, type: 'tock' },
      { t: ev.online, type: 'online' },
      ...ev.flush.map((t, i) => ({ t: t + BEAT, type: 'land', i })),
      { t: ev.allSynced, type: 'motifUp' },
      { t: ev.turnReset, type: 'signalLost' },
      ...ev.turnTaps.map((t) => ({ t, type: 'tap' })),
      ...ev.turnErrors.map((t) => ({ t, type: 'error' })),
      { t: ev.pushIn, type: 'air' },
      { t: ev.nextStep, type: 'motifEnd' },
    ],
  };
})();
