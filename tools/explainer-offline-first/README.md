# Offline-first, explained (45 s)

An explainer film for founders and CTOs. The one idea: **in an offline-first app a tap saves to phone storage first and syncs to the server later, so nobody waits on the network.** IDEA.md has the brief, SCRIPT.md the scene spec, DECISIONS.md every call made along the way, SOURCES.md the claims, and TRANSCRIPT.md the descriptive transcript.

## Deliverables

| File                                                                               | What                                                                                       |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `out/master_16x9.mp4`                                                              | 1920×1080 master                                                                           |
| `out/cut_9x16.mp4`                                                                 | 1080×1920 recomposition; use this one on phones                                            |
| `out/cut_1x1.mp4`                                                                  | 1080×1080 recomposition                                                                    |
| `out/master_16x9_reduced-motion.mp4`                                               | reduced-motion cut: same ideas, no travel, no camera moves, spinner held still             |
| `captions.srt`                                                                     | the narration as captions (also burned into every cut); ship it as an off-by-default track |
| `TRANSCRIPT.md`                                                                    | descriptive transcript for screen-reader users                                             |
| `contact.png`, `contact_9x16.png`, `contact_1x1.png`, `contact_reduced-motion.png` | storyboards: 20 beats each, labelled with scene and time                                   |
| `directions.html` / `out/directions.png`                                           | the four directions considered, with the decision                                          |
| `fixes/`                                                                           | before/after evidence for every fix                                                        |

## Rebuild

```sh
cd tools/explainer-offline-first
node render.mjs audio                          # out/score.wav (-16 LUFS / -2 dBTP)
node render.mjs video --fmt 16x9               # also: --fmt 9x16, --fmt 1x1, --reduced
node render.mjs srt                            # captions.srt from TIMELINE
node render.mjs contact [--fmt 9x16] [--reduced]
node render.mjs stills --fmt 9x16 --t 12,24 --width 390
node render.mjs determinism --fmt 16x9 --t 23.4
node render.mjs audio --vo voice.wav           # mix a recorded voice-over, bed ducked under each caption
```

Preview in a browser: `film.html?fmt=9x16&t=12.5`, or `&play=1` to play it, or `&reduced=1` for the reduced cut. All timing lives in `src/timeline.js` (one `TIMELINE` object). `window.seek(t)` paints frame t. The renderer steps t = n/60 in headless Chromium and pipes PNGs to ffmpeg (libx264, crf 16, yuv420p). Fonts are vendored (OFL), so renders never hit the network. Uses the repo's Playwright and a system ffmpeg.

## Tested (each result below was measured, not assumed)

- **Delivered files** (`ffprobe`): every cut is h264 yuv420p at 60 fps, with exactly 2,700 frames (45.000 s) and AAC audio. Sizes are 1920×1080, 1080×1920 and 1080×1080.
- **Loudness on each delivered MP4** (`ebur128`): −16.0 LUFS integrated and −2.0 dBTP true peak, in all four files.
- **Determinism:** the same t rendered twice in one page, and again from a fresh browser, gives byte-identical PNGs. Checked in 16:9 (t 23.4), 9:16 (29.69) and 1:1 (41.6), after the last code change.
- **Flashes** (`src/check-flashes.py` on each MP4): 0 large luminance swings; average luma stays between 202 and 222 in every cut. This is a whole-frame check, a simplification of WCAG 2.3.1.
- **Audio-only** (`src/check-audio.py` on the master's audio): every meaningful cue (taps, saves, errors, queue tocks, sync landings, motif) starts ≥ +8.6 dB above the 250 ms before it.
- **Voice-over ducking** (tested with a throwaway scratch voice, not shipped): −10.2 dB under the voice; that mix measured −16.5 LUFS / −2.0 dBTP.
- **Muted:** 16 frames pulled from the delivered 9:16 MP4 at 390 px wide (`out/muted-9x16-390w.png`). The story reads from headlines and captions alone.
- **Captions:** at most 8 words per line and 2 lines; reading speed ≤ 16 cps; SRT times match `TIMELINE`. Checked by the accessibility pass.
- **Contrast** (computed from tokens): text ≥ 6.25:1 everywhere (ink 14.7, captions 14.7, muted 6.25, white on accent 5.7); state graphics ≥ 3:1.
- **Reviews:** a design-review subagent asked Meaghan Choi's questions (who is it for, what are we communicating, does it need a name, restraint), and an accessibility pass followed. Their fixes and a frame pair for each are in `fixes/` and DECISIONS.md.

## Not done, or known limits

- **No voice-over** (WCAG 1.2.5 AA stays open). The only voice available here is macOS `say`, licensed for non-commercial use. Record the captions as a human VO and run `render.mjs audio --vo`. TRANSCRIPT.md covers 1.2.3 (A) until then.
- **Audio is not bit-identical between renders.** Web Audio rendering varies by ≤ −114 dBFS run to run (inaudible). Visual frames are byte-identical.
- **16:9 on phones:** captions are ~10 px at 390 px wide; use the 9:16 cut there.
- Nobody has watched it in real time with headphones; the audio checks above are measurements.
