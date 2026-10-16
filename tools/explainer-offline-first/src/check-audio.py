# Audio-only check: is every TIMELINE cue audible as an onset where the picture expects it?
# Compares RMS of the 1.5 kHz+ band just after each cue with the 250 ms before it.
import json, subprocess, sys, numpy as np
cues = json.loads(sys.argv[1])
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', sys.argv[2], '-ac', '1', '-ar', '48000', '-af', 'highpass=f=1500', '-f', 'f32le', '-'], capture_output=True).stdout
x = np.frombuffer(raw, dtype=np.float32); SR = 48000
rms = lambda a, b: float(np.sqrt(np.mean(x[int(a * SR):int(b * SR)] ** 2)) + 1e-9)
worst = 99
for c in cues:
    t = c['t']; before = rms(max(0, t - 0.3), t - 0.05); after = rms(t, t + 0.15)
    db = 20 * np.log10(after / before); worst = min(worst, db)
    print(f"{t:7.3f}s {c['type']:<10} {db:+6.1f} dB {'OK' if db >= 3 else 'WEAK'}")
print(f'weakest cue: {worst:+.1f} dB')
