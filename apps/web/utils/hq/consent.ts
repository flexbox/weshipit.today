/**
 * Wording of the optional opt-in shown under every capture form. The server
 * stores the exact string in `leads.consent_text` when the box is ticked, so
 * change it here only, and existing leads keep the version they agreed to.
 */
export const MARKETING_CONSENT_LABELS = {
  en: 'I also agree to receive emails from David (weshipit.today). Unsubscribe in one click.',
  fr: 'J’accepte aussi de recevoir les emails de David (weshipit.today). Désabonnement en 1 clic.',
} as const;

export type ConsentLocale = keyof typeof MARKETING_CONSENT_LABELS;

/**
 * Forms where signing up is itself the opt-in, with no checkbox. Their
 * consent text describes the form instead of quoting a checkbox.
 */
export const FORM_CONSENT_LABELS: Record<string, string> = {
  'davidl-newsletter':
    'Subscribed through the davidl.fr newsletter form (“Subscribe?”): signing up is the opt-in.',
};

/**
 * Notice shown under the self-audit forms instead of a checkbox: getting
 * the report also adds you to the Leads audience (B2B soft opt-in, decided
 * 2026-11-26). Stored as the consent text, so change it here only.
 */
export const AUDIT_NOTICE_LABELS: Record<ConsentLocale, string> = {
  en: 'You’ll get the report, then occasional emails from David (weshipit.today). Unsubscribe in one click.',
  fr: 'Le rapport, puis des emails de David (weshipit.today) de temps en temps. Désabonnement en 1 clic.',
};

export const AUDIT_SOURCE_PREFIX = 'audit:';

/** The consent text stored for a lead that opted in. */
export function consentLabelFor(source: string, locale: ConsentLocale): string {
  if (source.startsWith(AUDIT_SOURCE_PREFIX)) {
    return `Self-audit form, notice under the submit button: “${AUDIT_NOTICE_LABELS[locale]}”`;
  }
  return FORM_CONSENT_LABELS[source] ?? MARKETING_CONSENT_LABELS[locale];
}
