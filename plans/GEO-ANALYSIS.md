# GEO Analysis — React Native Glossary

**Scope:** `/react-native-glossary` and `/react-native-glossary/:id`
**Date:** 2026-09-12
**Audience target:** developers new to the React Native ecosystem

---

## 1. GEO Readiness Score: 84/100

| Criterion                 | Weight | Before     | After      |
| ------------------------- | ------ | ---------- | ---------- |
| Citability                | 25%    | 22         | 88         |
| Structural readability    | 20%    | 55         | 90         |
| Multi-modal content       | 15%    | 10         | 45         |
| Authority & brand signals | 20%    | 25         | 80         |
| Technical accessibility   | 20%    | 75         | 98         |
| **Weighted total**        |        | **37/100** | **84/100** |

The ceiling on the remaining 16 points is off-site (brand mentions) and
multi-modal (no diagrams or video). Both are called out in section 9.

---

## 2. Platform breakdown

| Platform            | Score | Reasoning                                                                                                                                                                                      |
| ------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Google AI Overviews | 88    | Server-rendered, `DefinedTerm` + `TechArticle` schema, question-shaped H2 on every page, 134–167 word answer blocks. Depends on the pages ranking top-10, which is a traditional-SEO question. |
| ChatGPT             | 72    | Strong entity structure and clean extraction, but ChatGPT leans on Wikipedia (47.9%) and Reddit (11.3%) — neither carries a weshipit.today mention today.                                      |
| Perplexity          | 68    | Same content strengths; Perplexity cites Reddit ~46.7% of the time, so off-site presence is the binding constraint.                                                                            |
| Bing Copilot        | 80    | Indexable, sitemapped, explicit crawler allowances. No IndexNow ping configured.                                                                                                               |

---

## 3. AI crawler access

`apps/web/public/robots.txt` is generated from `apps/web/next-sitemap.config.js`
(edit the config, not the output — `nx postbuild web` overwrites it).

| Crawler           | Status                                                           |
| ----------------- | ---------------------------------------------------------------- |
| GPTBot            | Allowed (explicit)                                               |
| OAI-SearchBot     | Allowed (explicit)                                               |
| ChatGPT-User      | Allowed (explicit)                                               |
| ClaudeBot         | Allowed (explicit)                                               |
| Claude-User       | Allowed (explicit)                                               |
| PerplexityBot     | Allowed (explicit)                                               |
| Perplexity-User   | Allowed (explicit)                                               |
| Google-Extended   | Allowed (explicit)                                               |
| Applebot-Extended | Allowed (explicit)                                               |
| CCBot             | Allowed via `*` (training crawler — block if that is the intent) |
| Bytespider        | Allowed via `*`                                                  |

A bare `User-agent: *` already permitted these, but several bots only honour
the block that names them, so the explicit entries are what actually guarantee
access.

---

## 4. llms.txt

Present at `/llms.txt`, and now carries a `## React Native Glossary` section
listing all 40 terms with their URL and one-line definition — so an agent can
answer from that single file without crawling 40 pages.

**Caveat:** the section is static. Adding a term to `apps/web/content/glossary`
does not update it. Regenerate when the term list changes.

---

## 5. Brand mention analysis

Brand mentions correlate ~3× more strongly with AI citation than backlinks
(Ahrefs, Dec 2025 — 75,000 brands). Current state:

| Surface              | Status        | Note                                                   |
| -------------------- | ------------- | ------------------------------------------------------ |
| Wikipedia / Wikidata | Absent        | No entity for weshipit.today or the author             |
| Reddit               | Not verified  | Highest-leverage gap for Perplexity and ChatGPT        |
| YouTube              | Not verified  | Strongest single correlation (~0.737)                  |
| LinkedIn             | Not in schema | No profile URL found in the repo, so none was invented |
| GitHub               | Present       | `github.com/flexbox`, linked via `sameAs`              |
| X                    | Present       | `x.com/flexbox_`, linked via `sameAs`                  |

This is the largest remaining lever and it is entirely off-site — no code
change moves it.

---

## 6. Passage-level citability

The optimal citable block is 134–167 words. Definitions were rewritten to sit
in that band.

| Metric                            | Before    | After         |
| --------------------------------- | --------- | ------------- |
| Terms                             | 17        | 40            |
| Median body length                | ~20 words | **149 words** |
| Shortest / longest                | 10 / 128  | 118 / 175     |
| Terms under 120 words             | 16 of 17  | 0 of 40       |
| Terms with a comparison table     | 1         | 4             |
| Terms with a code example         | 0         | 15            |
| Internal glossary links in bodies | 0         | 101           |
| Citations to official docs        | 17        | 25            |
| Alternate names (`aliases`)       | 0         | 67            |
| `related` graph edges             | 0         | 156           |

Every term page now opens with the answer restated as a bold lede, so a quote
taken from the first 40 words is self-contained.

---

## 7. Server-side rendering

Verified against the production build, not the dev server:

- 40 term pages + the index prerender to static HTML (`fallback: false`, no ISR)
- Definition text is present in the HTML with JavaScript disabled
- 121 JSON-LD blocks across the section, all parsing as valid JSON
- No client-only content on either template

AI crawlers do not execute JavaScript, so this was already the section's
strongest axis and remains so.

---

## 8. Schema

Per term page, three blocks:

- **`DefinedTerm`** — `@id`, `alternateName` (aliases), `description`,
  `inDefinedTermSet`, `dateModified`, `author`, `publisher`
- **`TechArticle`** — `headline` ("What is X in React Native?"), `articleBody`,
  `wordCount`, `datePublished`/`dateModified`, `about` → the DefinedTerm,
  `isPartOf` → the collection. `DefinedTerm` alone carries no article body;
  this is what exposes the full definition text to a crawler.
- **`BreadcrumbList`**

On the index, `DefinedTermSet` now embeds every term's `description` and
`alternateName`, making it a single-fetch answer source.

`Person` and `Organization` live in `apps/web/utils/schema.ts` with `sameAs`
pointing at real, verifiable profiles.

**Deliberately omitted:** `FAQPage`. Google retired FAQ rich results for most
sites in 2023; the FAQ is shipped as real content with question-shaped
headings instead, which is what AI extraction actually reads.

---

## 9. Top 5 highest-impact remaining changes

1. **Build Reddit and YouTube presence.** The single biggest lever for ChatGPT
   and Perplexity citation, and the only one not addressable in this repo.
2. **Add diagrams.** Multi-modal content sees ~156% higher selection rates.
   The thread model (JS thread vs UI thread), the render pipeline, and the
   legacy-vs-new architecture comparison are all natural diagrams. Currently
   the section has zero images — the weakest scoring axis at 45.
3. **Automate the llms.txt glossary section** so it cannot drift from
   `content/glossary`.
4. **Publish original data.** Unique, quotable statistics are the strongest
   citability signal, and the glossary currently cites only official docs. A
   small annual "state of the React Native stack" survey would be citable in a
   way definitions never are.
5. **Add IndexNow** for Bing/Copilot freshness on content updates.

---

## 10. Content gaps closed

23 terms were added, chosen for what a newcomer meets in week one and cannot
find defined in one place:

**Toolchain** — Expo, Expo Router, EAS, Metro, Development Build, Fast Refresh,
Continuous Native Generation, Over-the-Air Update, JavaScript Bundle

**Architecture** — JSI, Bridge, TurboModules, Codegen, Hermes, Native Module,
Yoga

**UI and layout** — Flexbox, StyleSheet, FlatList, Reanimated, Safe Area,
React Navigation, Platform-Specific Code

Also fixed: the index meta description previously promised "Flexbox" and
"Turbo Modules", neither of which existed as a term. Both now do.

---

## 11. Verification

- `tsc --noEmit` clean
- `nx build web` prerenders 40 term pages + index
- `nx postbuild web` regenerates sitemap with 40 term URLs
- All 121 JSON-LD blocks parse
- Every internal glossary link and `related` entry resolves to a real term
  (checked programmatically; zero dangling)
- Index and term pages checked in-browser in light and dark mode
