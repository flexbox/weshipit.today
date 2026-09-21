/**
 * Oversized "Aa" drawn as an animated stroke behind the glossary search field.
 *
 * The two paths are the Space Grotesk Bold glyph outlines ("A" and "a",
 * extracted from the Google Fonts TTF with fontkit, 1000 units per em), so the
 * letterforms match the site's display font exactly and do not depend on the
 * webfont being loaded when the hero first paints. The glyphs are advanced by
 * their font advance widths (634 + 578) and flipped with `scale(1 -1)` because
 * font coordinates are y-up while SVG is y-down.
 *
 * `pathLength={1}` normalises both outlines so a dash of length 1 covers the
 * whole path; the `glyph-draw` keyframes then slide the dash offset from 1 to
 * 0, which reads as the letters being traced. Reduced-motion users get the
 * fully drawn outline straight away.
 */
const GLYPH_A =
  'M18 0L202 700L432 700L616 0L480 0L442 154L192 154L154 0ZM223 276L411 276L326 617L308 617Z';
const GLYPH_a =
  'M224 -14Q171 -14 129 4.5Q87 23 62.5 58.5Q38 94 38 145Q38 196 62.5 230.5Q87 265 130.5 282.5Q174 300 230 300L366 300L366 328Q366 363 344 385.5Q322 408 274 408Q227 408 204 386.5Q181 365 174 331L58 370Q70 408 96.5 439.5Q123 471 167.5 490.5Q212 510 276 510Q374 510 431 461Q488 412 488 319L488 134Q488 104 516 104L556 104L556 0L472 0Q435 0 411 18Q387 36 387 66L387 67L368 67Q364 55 350 35.5Q336 16 306 1Q276 -14 224 -14ZM246 88Q299 88 332.5 117.5Q366 147 366 196L366 206L239 206Q204 206 184 191Q164 176 164 149Q164 122 185 105Q206 88 246 88Z';

const STROKE_CLASS =
  'animate-glyph-draw [stroke-dasharray:1] [stroke-dashoffset:0] motion-reduce:animate-none';

interface GlossaryHeroGlyphsProps {
  className?: string;
}

export function GlossaryHeroGlyphs({ className }: GlossaryHeroGlyphsProps) {
  return (
    <svg
      aria-hidden="true"
      /* Glyph box is 1212 × 714 (y from -14 to 700); padded for the stroke. */
      viewBox="-12 -712 1236 738"
      fill="none"
      stroke="currentColor"
      strokeWidth={11}
      strokeLinejoin="round"
      className={className}
    >
      <g transform="scale(1 -1)">
        <path d={GLYPH_A} pathLength={1} className={STROKE_CLASS} />
        <path
          d={GLYPH_a}
          pathLength={1}
          transform="translate(634 0)"
          className={`${STROKE_CLASS} [animation-delay:700ms]`}
        />
      </g>
    </svg>
  );
}
