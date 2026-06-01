We're in apps/banner-preview, which previews one banner across LinkedIn, YouTube, and Twitter/X for cross-platform consistency. I want the banner to match the visual identity of my YouTube channel (David Leuliette / @flexbox\_, React Native, "Cross Platform Show").

Step 0 — Reference. I've put 3–4 of my actual YouTube thumbnails in ./refs/thumbnails/.
Analyze them and produce a short STYLE SPEC before anything else:

- Color palette as hex values (background, primary, accent, text), ranked by dominance
- Typography: font family/feel, weights, casing, how headlines are treated
- Recurring motifs (face crop, bold outlined text, arrows/circles, code snippets, emoji, logos, textures)
- Overall vibe in one sentence
  Show me the STYLE SPEC and wait for my OK before coding.

Step 1 — Investigate the app. Report:

- Does it feed ONE shared source image into all three previews, or render three per-platform?
- Exact dimensions/crop each preview frame simulates; are avatar-overlap and mobile-crop safe zones drawn?
- Where brand tokens, fonts, and logo assets live; which component/route to mirror.
- How a final image exports, if at all.
  Then propose a plan.

Step 2 — Design the banner using the STYLE SPEC, matching the thumbnail vibe.
Target specs:

- LinkedIn 1584x396 | YouTube 2560x1440 (centered safe area 1546x423) | Twitter/X 1500x500
  Design rules:
- Put name/logo/tagline in a CENTERED safe band (~1546x423 proportions) so it's visible on every platform/device.
- Keep critical content OUT of the lower-left (avatar overlap on all three) and off the far edges (mobile crop). Mind the X action-button area.
- Let the thumbnail-style background (color/pattern/texture) bleed to fill each full canvas.
- Reuse the thumbnail palette + type feel; pull fonts/logo from the repo if present, otherwise match closely.
- Content:
  Name: "David Leuliette / @flexbox\_"
  Tagline: "<YOUR ONE-LINER — e.g. React Native, every day>"
  Optional: "weshipit.today"

Step 3 — Preview and verify.

- Render through all three platform previews. Confirm nothing critical is clipped by avatar overlap, mobile crop, or the X action button, and that all three read as the same identity AND visibly match the thumbnail style.
- If the app exports, output each platform PNG at native size and confirm pixel dimensions (YouTube under 6MB, X under 5MB).

Constraints: follow the monorepo's lint/format and yarn-workspace conventions; don't add heavy deps if a renderer exists.

- Render through all three platform previews. Confirm nothing critical is clipped by avatar overlap, mobile crop, or the X action button, and that all three read as the same identity AND visibly match the thumbnail style.
- If the app exports, output each platform PNG at native size and confirm pixel dimensions (YouTube under 6MB, X under 5MB).

Constraints: follow the monorepo's lint/format and yarn-workspace conventions; don't add heavy deps if a renderer exists.
