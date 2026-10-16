// Procedural soundtrack, rendered offline with Web Audio and locked to TIMELINE (96 BPM).
// Bed: a soft pad following the arc, a quiet pulse while the model is running.
// Motif: three rising mallet notes (D–F#–A). It plays when phone storage saves the first tap,
// returns softly on each later save, rises a fourth when everything has synced, and resolves at the end.
// "Underground" (no signal) is heard as a closed low-pass on the bed. It opens when the signal returns.
// Returns a base64 32-bit float WAV, 48 kHz stereo. Loudness is normalised later by render.mjs (-16 LUFS).
window.renderAudio = async function () {
  const TL = window.TIMELINE,
    E = TL.ev,
    BEAT = TL.beat,
    LEN = TL.duration,
    SR = 48000;
  const ctx = new OfflineAudioContext(2, Math.round(SR * LEN), SR);
  let seed = TL.seed;
  const rnd = () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const gain = (v = 1) => {
    const g = ctx.createGain();
    g.gain.value = v;
    return g;
  };
  const bq = (type, f, q = 0.7) => {
    const b = ctx.createBiquadFilter();
    b.type = type;
    b.frequency.value = f;
    b.Q.value = q;
    return b;
  };
  const chain = (...n) => {
    for (let i = 0; i < n.length - 1; i++) n[i].connect(n[i + 1]);
    return n[n.length - 1];
  };
  const pan = (v) => {
    const p = ctx.createStereoPanner();
    p.pan.value = v;
    return p;
  };
  const osc = (type, f, t, dur) => {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = f;
    o.start(t);
    o.stop(t + dur);
    return o;
  };
  const env = (g, t, peak, a, d) => {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  };
  const noiseBuf = ctx.createBuffer(1, SR * 2, SR);
  {
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = rnd() * 2 - 1;
  }
  const noise = (t, dur) => {
    const s = ctx.createBufferSource();
    s.buffer = noiseBuf;
    s.loop = true;
    s.start(t, rnd() * 1.5, dur);
    return s;
  };

  // ---- master: gentle glue, fade out at the end
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -20;
  comp.ratio.value = 2.5;
  comp.attack.value = 0.02;
  comp.release.value = 0.3;
  comp.knee.value = 8;
  const master = gain(1);
  master.gain.setValueAtTime(1, LEN - 1.4);
  master.gain.linearRampToValueAtTime(0.0001, LEN);
  chain(master, comp, ctx.destination);

  // small room: seeded noise impulse
  const verb = ctx.createConvolver();
  {
    const len = Math.round(SR * 1.8),
      ir = ctx.createBuffer(2, len, SR);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++)
        d[i] = (rnd() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
    verb.buffer = ir;
  }
  const verbIn = gain(1);
  chain(verbIn, verb, gain(0.28), master);

  // ---- bed: low-pass that closes underground and opens with the signal
  const bed = gain(0.9);
  const under = bq('lowpass', 900, 0.5);
  under.frequency.setValueAtTime(5200, 0);
  under.frequency.exponentialRampToValueAtTime(950, E.signalDrop + 0.6);
  under.frequency.setValueAtTime(950, E.savePhone - 0.05);
  under.frequency.exponentialRampToValueAtTime(1500, E.savePhone + 1.5); // a little light once the save works
  under.frequency.setValueAtTime(1500, E.online - 0.6);
  under.frequency.exponentialRampToValueAtTime(6500, E.online + 0.2);
  under.frequency.setValueAtTime(6500, E.turnReset);
  under.frequency.exponentialRampToValueAtTime(800, E.turnReset + 0.5);
  under.frequency.setValueAtTime(800, E.nextStep - 0.4);
  under.frequency.exponentialRampToValueAtTime(3600, E.nextStep + 0.8);
  chain(bed, under, master);
  bed.connect(verbIn);

  // pad chords follow the arc: tension → light → open → tension → resolve
  const CHORDS = [
    [0, 4.6, [47, 54, 59, 61, 62, 66]], // Bm(add9): the spinner
    [4.6, 9.6, [43, 50, 54, 59, 62]], // Gmaj7: server first
    [9.6, 17.4, [38, 45, 52, 54, 57, 61]], // Dmaj9: phone storage first
    [17.4, 22.0, [38, 45, 52, 54, 57, 61]],
    [22.0, 25.35, [45, 52, 57, 59, 61, 64]], // A(add9)
    [25.35, 29.35, [43, 50, 54, 57, 59, 62]], // Gmaj9: signal back
    [29.35, 32.75, [42, 50, 54, 57, 62]], // D/F#
    [32.75, 35.85, [47, 54, 57, 59, 62]], // Bm7: the turn
    [35.85, 38.95, [40, 47, 54, 55, 59, 62]], // Em9
    [38.95, 41.25, [43, 50, 54, 57, 59, 62]], // Gmaj9
    [41.25, 45.0, [38, 45, 50, 54, 57, 61, 64]], // Dmaj9: resolve
  ];
  for (const [t0, t1, notes] of CHORDS) {
    notes.forEach((m, k) => {
      for (const det of [-6, 6]) {
        const o = osc(
          k === 0 ? 'sine' : 'triangle',
          mtof(m),
          Math.max(0, t0 - 0.05),
          t1 - t0 + 1.0,
        );
        o.detune.value = det + (rnd() - 0.5) * 3;
        const g = gain(0);
        const peak = (k === 0 ? 0.05 : 0.022) * (det < 0 ? 1 : 0.9);
        g.gain.setValueAtTime(0, Math.max(0, t0 - 0.05));
        g.gain.linearRampToValueAtTime(peak, t0 + 0.6);
        g.gain.setValueAtTime(peak, t1 - 0.05);
        g.gain.linearRampToValueAtTime(0, t1 + 0.9);
        chain(o, g, pan(det < 0 ? -0.25 : 0.25), bed);
      }
    });
  }
  // pulse: a soft low thump on beats 1 and 3, only while offline-first is running (S3 → S6)
  for (let t = E.savePhone; t < E.turnReset - 0.01; t += BEAT * 2) {
    const o = osc('sine', 62, t, 0.4);
    o.frequency.setValueAtTime(95, t);
    o.frequency.exponentialRampToValueAtTime(52, t + 0.12);
    const g = gain(0);
    env(g, t, 0.16, 0.005, 0.3);
    chain(o, g, bed);
  }
  // soft shaker on off-beats through the proof, so the tempo is felt
  for (let t = 17.4 + BEAT / 2; t < E.turnReset; t += BEAT) {
    const g = gain(0);
    env(g, t, 0.022, 0.004, 0.07);
    chain(noise(t, 0.1), bq('highpass', 6500), g, pan(0.3), bed);
  }

  // ---- cues: dry, close, on the actions that carry meaning
  const fx = gain(1);
  chain(fx, master);
  fx.connect(verbIn);
  const mallet = (t, m, peak = 0.16, p = 0, ring = 0.9) => {
    for (const [mult, amp, dec] of [
      [1, 1, ring],
      [4, 0.18, 0.18],
    ]) {
      const g = gain(0);
      env(g, t, peak * amp, 0.004, dec);
      chain(osc('sine', mtof(m) * mult, t, dec + 0.1), g, pan(p), fx);
    }
  };
  const S = BEAT / 4; // a sixteenth
  const CUE = {
    tap: (t) => {
      const g = gain(0);
      env(g, t, 0.22, 0.002, 0.035);
      chain(noise(t, 0.06), bq('bandpass', 2600, 1.2), g, fx);
    },
    error: (t) => {
      // a muted knock, then two low notes stepping down: the save did not happen
      {
        const g = gain(0);
        env(g, t, 0.18, 0.002, 0.05);
        chain(noise(t, 0.08), bq('bandpass', 1600, 2), g, fx);
      }
      [
        [57, 0],
        [53, 0.16],
      ].forEach(([m, dt]) => {
        const g = gain(0);
        env(g, t + dt, 0.13, 0.01, 0.35);
        chain(osc('triangle', mtof(m), t + dt, 0.5), bq('lowpass', 900), g, fx);
      });
    },
    signalLost: (t) => {
      const o = osc('sine', 220, t, 0.6);
      o.frequency.exponentialRampToValueAtTime(70, t + 0.5);
      const g = gain(0);
      env(g, t, 0.1, 0.02, 0.45);
      chain(o, g, fx);
    },
    air: (t) => {
      const g = gain(0);
      g.gain.setValueAtTime(0.0001, t - 0.2);
      g.gain.exponentialRampToValueAtTime(0.05, t + 0.5);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
      const f = bq('bandpass', 700, 0.8);
      f.frequency.setValueAtTime(500, t);
      f.frequency.exponentialRampToValueAtTime(1800, t + 1.0);
      chain(noise(t - 0.2, 1.4), f, g, fx);
    },
    tock: (t) => {
      const g = gain(0);
      env(g, t, 0.45, 0.002, 0.07);
      chain(noise(t, 0.12), bq('bandpass', 1900, 5), g, fx);
      mallet(t, 69, 0.06, 0, 0.25);
    },
    save: (t) => {
      mallet(t, 74, 0.1, -0.1, 0.4);
      mallet(t + S, 78, 0.08, 0.1, 0.4);
    },
    motif: (t) => {
      mallet(t, 74, 0.17, -0.15);
      mallet(t + S, 78, 0.15, 0);
      mallet(t + 2 * S, 81, 0.15, 0.15);
    },
    motifUp: (t) => {
      mallet(t, 79, 0.15, -0.15);
      mallet(t + S, 83, 0.14, 0);
      mallet(t + 2 * S, 86, 0.14, 0.15);
      mallet(t + 4 * S, 86, 0.08, 0);
    },
    motifEnd: (t) => {
      mallet(t, 74, 0.13, -0.15);
      mallet(t + S, 78, 0.12, 0);
      mallet(t + 2 * S, 81, 0.12, 0.15);
      mallet(t + 4 * S, 86, 0.1, 0);
    },
    online: (t) => {
      // the bed opens; a short rising swell
      const g = gain(0);
      g.gain.setValueAtTime(0.0001, t - 0.6);
      g.gain.exponentialRampToValueAtTime(0.06, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
      const f = bq('bandpass', 400, 1);
      f.frequency.setValueAtTime(400, t - 0.6);
      f.frequency.exponentialRampToValueAtTime(4000, t);
      chain(noise(t - 0.6, 1.3), f, g, fx);
    },
    land: (t, c) => mallet(t, [81, 83, 85][c.i], 0.09, [-0.2, 0, 0.2][c.i]),
  };
  for (const c of TL.cues) CUE[c.type](c.t, c);

  const buf = await ctx.startRendering();
  // 32-bit float WAV
  const n = buf.length,
    ch = 2,
    bytes = 44 + n * ch * 4;
  const out = new DataView(new ArrayBuffer(bytes));
  const str = (o, s) => {
    for (let i = 0; i < s.length; i++) out.setUint8(o + i, s.charCodeAt(i));
  };
  str(0, 'RIFF');
  out.setUint32(4, bytes - 8, true);
  str(8, 'WAVE');
  str(12, 'fmt ');
  out.setUint32(16, 16, true);
  out.setUint16(20, 3, true);
  out.setUint16(22, ch, true);
  out.setUint32(24, SR, true);
  out.setUint32(28, SR * ch * 4, true);
  out.setUint16(32, ch * 4, true);
  out.setUint16(34, 32, true);
  str(36, 'data');
  out.setUint32(40, n * ch * 4, true);
  const L0 = buf.getChannelData(0),
    L1 = buf.getChannelData(1);
  for (let i = 0, o = 44; i < n; i++, o += 8) {
    out.setFloat32(o, L0[i], true);
    out.setFloat32(o + 4, L1[i], true);
  }
  const u8 = new Uint8Array(out.buffer);
  let s = '';
  for (let i = 0; i < u8.length; i += 0x8000)
    s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
  return btoa(s);
};
