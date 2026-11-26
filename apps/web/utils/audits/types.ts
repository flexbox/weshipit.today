/**
 * The shape every Self-Audit follows. One file per Self-Audit fills it in
 * (see docs/audits/README.md); the quiz page and the Report email both read
 * that same file. Words used here are defined in docs/GLOSSARY.md.
 */

export type SelfAuditLocale = 'fr' | 'en';

export interface Check<P extends string = string> {
  id: string;
  /** The statement shown in the quiz, answered No, Unknown or Yes. */
  text: string;
  /** Short name of the fix, used as the step title in the Report. */
  label: string;
  /** The Priority the Gap goes under in the Report. */
  priority: P;
  /** What to do when the answer isn't Yes. */
  fix: string;
  /** Command to run, when there is one. */
  command?: string;
}

export interface Category<P extends string = string> {
  key: string;
  label: string;
  checks: Check<P>[];
}

export interface Verdict {
  label: string;
  text: string;
}

export interface SelfAudit<P extends string = string> {
  /** Used in the lead source (`audit:<id>`) and as a DOM id prefix. */
  id: string;
  /** Shown in Slack and HQ. */
  name: string;
  /** One language per Self-Audit: the quiz page and the Report use it. */
  locale: SelfAuditLocale;
  /** The Report lists Gaps in this order. */
  priorities: { key: P; label: string }[];
  categories: Category<P>[];
  getVerdict: (score: number) => Verdict;
  /** The quiz page copy. */
  page: {
    eyebrow: string;
    title: string;
    intro: string;
    resetLabel: string;
    /** The block next to the email form: it must describe the Report. */
    form: { title: string; text: string; bullets: string[] };
    /** Link to the paid Audit under the results. */
    cta: { text: string; href: string; label: string };
  };
  report: {
    /** Start of the subject line, before the Score. */
    subject: string;
    /**
     * Comes after the Gaps, for every visitor: a command to run, or a
     * page to come back to. A path is turned into a full URL.
     */
    closing: { text: string; command?: string; path?: string };
    /** One line pointing to the paid Audit; the link is added after it. */
    offer: string;
  };
}
