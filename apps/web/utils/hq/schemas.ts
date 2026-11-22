import { z } from 'zod';

export const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const SOURCE_PATTERN = /^[a-z0-9][a-z0-9:_-]{0,63}$/;

/** Trimmed text; an empty string becomes `undefined`. */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .nullish()
    .transform((value) => value || undefined);

/** Body of POST /api/lm/subscribe, sent as JSON by every capture form. */
export const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().max(254).pipe(z.email()),
  first_name: optionalText(80),
  /** Slug of a published magnet. Unknown slugs fall back to no magnet. */
  magnet: z.string().regex(SLUG_PATTERN).max(80).optional(),
  marketing_consent: z.boolean().default(false),
  source: z.string().regex(SOURCE_PATTERN).default('r-page'),
  /** Language of the consent sentence the visitor saw. */
  locale: z.enum(['fr', 'en']).default('fr'),
  meta: z
    .record(
      z.string().max(40),
      z.union([z.string().max(200), z.number(), z.boolean()]),
    )
    .refine((meta) => Object.keys(meta).length <= 10)
    .optional(),
  utm_campaign: optionalText(100),
  utm_medium: optionalText(100),
  utm_source: optionalText(100),
  /** Honeypot: hidden from people, filled in by naive bots. */
  website: z.string().max(200).nullish(),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;

/** Body of POST /api/hq/magnets, a urlencoded HTML form. */
export const magnetFormSchema = z.object({
  id: z
    .uuid()
    .optional()
    .or(z.literal('').transform(() => undefined)),
  pitch: z.string().trim().min(1).max(300),
  slug: z.string().trim().toLowerCase().max(80).regex(SLUG_PATTERN),
  title: z.string().trim().min(1).max(160),
  /** One bullet per line in the textarea. */
  bullets: z
    .string()
    .optional()
    .transform((value) =>
      (value ?? '')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean),
    )
    .pipe(z.array(z.string().max(200)).max(8)),
  content_md: z.string().trim().min(1).max(100_000),
  /** A checkbox posts "on" when ticked and nothing otherwise. */
  published: z
    .string()
    .optional()
    .transform((value) => value === 'on'),
});

export type MagnetFormInput = z.infer<typeof magnetFormSchema>;
