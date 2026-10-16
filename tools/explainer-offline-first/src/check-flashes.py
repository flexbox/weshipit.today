# Flash check (WCAG 2.3.1 general flash threshold, simplified):
# reads per-frame average luma from a rendered MP4 and counts flash pairs, i.e. opposing
# luminance swings of >= 10% of full range, within any 1-second window. Fails above 3.
import subprocess, sys, re

path = sys.argv[1]
out = subprocess.run(['ffmpeg', '-hide_banner', '-i', path, '-vf', 'signalstats,metadata=print:key=lavfi.signalstats.YAVG', '-an', '-f', 'null', '-'],
                     capture_output=True, text=True).stderr
y = [float(v) for v in re.findall(r'YAVG=([\d.]+)', out)]
fps = 60
swings = []  # (frame, sign) of every frame-to-frame move >= 10% of the 0-255 range, summed over up to 6 frames
i = 0
while i < len(y) - 1:
    for span in range(1, 7):
        if i + span < len(y) and abs(y[i + span] - y[i]) >= 25.5:
            swings.append((i, 1 if y[i + span] > y[i] else -1))
            i += span
            break
    else:
        i += 1
worst = 0
for k, (f, _) in enumerate(swings):
    window = [s for s in swings[k:] if s[0] - f < fps]
    flashes = sum(1 for a, b in zip(window, window[1:]) if a[1] != b[1])
    worst = max(worst, flashes)
print(f'{path}: {len(y)} frames, luma {min(y):.1f}–{max(y):.1f}, large swings {len(swings)}, worst flash pairs per second {worst} -> {"PASS" if worst <= 3 else "FAIL"}')
