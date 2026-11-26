import {
  Button,
  Card,
  FadeIn,
  FadeInStagger,
  LinkButton,
  Text,
} from '@weshipit/ui';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid';
import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { FormEvent, useState } from 'react';
import { track } from '../utils/analytics';
import {
  ANSWER_VALUES,
  ANSWERS_MAX_LENGTH,
  encodeGaps,
} from '../utils/audits/answers';
import type {
  Category,
  SelfAudit,
  SelfAuditLocale,
} from '../utils/audits/types';
import { AUDIT_NOTICE_LABELS, AUDIT_SOURCE_PREFIX } from '../utils/hq/consent';

export interface SelfAuditLabels {
  step: string;
  next: string;
  error: string;
  /** Shown when the lead was saved but the report email failed. */
  emailError: string;
  submit: string;
  answered: string;
  previous: string;
  seeScore: string;
  nameLabel: string;
  emailLabel: string;
  submitting: string;
  successText: string;
  successTitle: string;
  reportEyebrow: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  answers: { no: string; unknown: string; yes: string };
}

const FR_LABELS: SelfAuditLabels = {
  answered: 'répondues',
  answers: { no: 'Non', unknown: 'Incertain', yes: 'Oui' },
  emailLabel: 'Email pro',
  emailPlaceholder: 'toi@entreprise.com',
  error: 'Une erreur est survenue. Réessaie, ou écris-nous directement.',
  emailError:
    'Le rapport n’a pas pu être envoyé. Réessaie dans une minute, ou écris à david@weshipit.today.',
  nameLabel: 'Prénom',
  namePlaceholder: 'Ton prénom',
  next: 'Suivant :',
  previous: 'Précédent',
  reportEyebrow: 'Rapport détaillé',
  seeScore: 'Voir mon score',
  step: 'Étape',
  submit: 'Recevoir mon rapport',
  submitting: 'Envoi en cours…',
  successText:
    'Vérifie ta boîte mail (et le dossier spam) dans les prochaines minutes.',
  successTitle: 'Rapport en route',
};

const EN_LABELS: SelfAuditLabels = {
  answered: 'answered',
  answers: { no: 'No', unknown: 'Unknown', yes: 'Yes' },
  emailLabel: 'Work email',
  emailPlaceholder: 'you@company.com',
  error: 'Something went wrong. Try again, or email us directly.',
  emailError:
    'Your report could not be sent. Try again in a minute, or write to david@weshipit.today.',
  nameLabel: 'First name',
  namePlaceholder: 'Your first name',
  next: 'Next:',
  previous: 'Previous',
  reportEyebrow: 'Detailed report',
  seeScore: 'See my score',
  step: 'Step',
  submit: 'Get my report',
  submitting: 'Sending…',
  successText: 'Check your inbox (and spam folder) in the next few minutes.',
  successTitle: 'Report on its way',
};

const LABELS: Record<SelfAuditLocale, SelfAuditLabels> = {
  en: EN_LABELS,
  fr: FR_LABELS,
};

interface SelfAuditQuizProps {
  audit: SelfAudit;
  headingAs?: 'h1' | 'h2';
}

/**
 * The quiz page of any Self-Audit: Categories one step at a time, the Score
 * and Verdict, then the form that sends the Report. Everything it shows
 * comes from the Self-Audit's file in utils/audits.
 */
export function SelfAuditQuiz({ audit, headingAs = 'h2' }: SelfAuditQuizProps) {
  const { categories: CATEGORIES, page } = audit;
  const TOTAL_CHECKS = CATEGORIES.reduce(
    (sum, category) => sum + category.checks.length,
    0,
  );
  const titleId = `${audit.id}-title`;
  const labels = LABELS[audit.locale];
  const answerOptions = [
    { label: labels.answers.no, value: ANSWER_VALUES.no },
    { label: labels.answers.unknown, value: ANSWER_VALUES.unknown },
    { label: labels.answers.yes, value: ANSWER_VALUES.yes },
  ];
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [formStatus, setFormStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error' | 'emailError'
  >('idle');

  const isSent = formStatus === 'success';

  const categoryScore = (category: Category) => {
    let sum = 0;
    let answered = 0;
    for (const check of category.checks) {
      const value = answers[check.id];
      if (value !== undefined) {
        sum += value;
        answered += 1;
      }
    }
    return { answered, sum, total: category.checks.length };
  };

  const currentCategory = CATEGORIES[currentStep];
  const currentScore = categoryScore(currentCategory);
  const isLastStep = currentStep === CATEGORIES.length - 1;

  const totalSum = Object.values(answers).reduce(
    (sum, value) => sum + value,
    0,
  );
  const scorePct = Math.round((totalSum / TOTAL_CHECKS) * 100);
  const verdict = audit.getVerdict(scorePct);

  const handleAnswer = (checkId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [checkId]: value }));
  };

  const handleNext = () => {
    if (isLastStep) {
      setShowResults(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
    setFormStatus('idle');
  };

  /**
   * The Gaps, so the server can build the Report. Dropped if they would not
   * fit the meta limit; a unit test keeps every Self-Audit under it.
   */
  const gapsMeta = (): { answers?: string } => {
    const encoded = encodeGaps(audit, answers);
    return encoded.length <= ANSWERS_MAX_LENGTH ? { answers: encoded } : {};
  };

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSent) return;
    setFormStatus('submitting');
    track('audit_requested', { audit: audit.id, score: String(scorePct) });
    const form = new FormData(event.currentTarget);
    const params = new URLSearchParams(window.location.search);
    try {
      const response = await fetch('/api/lm/subscribe', {
        body: JSON.stringify({
          email: form.get('email'),
          first_name: form.get('name'),
          locale: audit.locale,
          // Sending the form is the opt-in: the notice under the button says
          // the report comes with occasional emails.
          marketing_consent: true,
          meta: { score: scorePct, ...gapsMeta() },
          source: `${AUDIT_SOURCE_PREFIX}${audit.id}`,
          utm_campaign: params.get('utm_campaign') ?? undefined,
          utm_medium: params.get('utm_medium') ?? undefined,
          utm_source: params.get('utm_source') ?? undefined,
          website: form.get('hp'),
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });
      if (response.ok) {
        setFormStatus('success');
      } else {
        const body = await response.json().catch(() => null);
        setFormStatus(body?.code === 'email_failed' ? 'emailError' : 'error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  if (showResults) {
    return (
      <section aria-labelledby={titleId}>
        <Button variant="outline" size="lg" onClick={handleReset}>
          <ArrowLeftIcon className="-ml-0.5 mr-2 size-4" aria-hidden="true" />
          {page.resetLabel}
        </Button>

        <FadeInStagger faster>
          <FadeIn>
            <Card size="lg" className="mt-6">
              <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
                <Text
                  as="p"
                  variant="h2"
                  className="whitespace-nowrap text-green-600 dark:text-green-400"
                >
                  {scorePct}
                  <span className="text-2xl text-slate-400">/100</span>
                </Text>
                <div>
                  <Text tone="primary" as="h3" variant="eyebrow">
                    {verdict.label}
                  </Text>
                  <Text
                    as="p"
                    variant="p2"
                    className="mt-2 text-slate-600 dark:text-slate-300"
                  >
                    {verdict.text}
                  </Text>
                </div>
              </div>
            </Card>
          </FadeIn>

          <FadeIn>
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {CATEGORIES.map((category) => {
                const score = categoryScore(category);
                const catPct = Math.round((score.sum / score.total) * 100);
                return (
                  <Card key={category.key} size="md">
                    <Text tone="muted" as="p" variant="eyebrow">
                      {category.label}
                    </Text>
                    <Text tone="primary" as="p" variant="h5" className="mt-2">
                      {catPct}%
                    </Text>
                    <div className="mt-3 h-1 rounded-full bg-slate-200 dark:bg-slate-700">
                      <div
                        className="h-1 rounded-full bg-green-500"
                        style={{ width: `${catPct}%` }}
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          </FadeIn>

          <FadeIn>
            <Card size="lg" className="mt-8 grid gap-10 md:grid-cols-2">
              <div>
                <Text
                  as="p"
                  variant="c2"
                  className="uppercase tracking-wide text-green-600 dark:text-green-400"
                >
                  {labels.reportEyebrow}
                </Text>
                <Text as="h3" variant="h4" className="mt-3">
                  {page.form.title}
                </Text>
                <Text
                  as="p"
                  variant="p2"
                  className="mt-4 text-slate-600 dark:text-slate-300"
                >
                  {page.form.text}
                </Text>
                <ul className="mt-6 space-y-3">
                  {page.form.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <span
                        aria-hidden="true"
                        className="text-blue-600 dark:text-blue-400"
                      >
                        →
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col justify-center"
              >
                <div className="mb-4">
                  <label
                    htmlFor={`${audit.id}-name`}
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {labels.nameLabel}
                  </label>
                  <input
                    type="text"
                    id={`${audit.id}-name`}
                    name="name"
                    placeholder={labels.namePlaceholder}
                    autoComplete="given-name"
                    readOnly={isSent}
                    className="w-full rounded-md border border-transparent bg-white px-3.5 py-2.5 text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-white/5 dark:text-white dark:ring-white/10"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor={`${audit.id}-email`}
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {labels.emailLabel}
                  </label>
                  <input
                    type="email"
                    id={`${audit.id}-email`}
                    name="email"
                    placeholder={labels.emailPlaceholder}
                    required
                    autoComplete="email"
                    readOnly={isSent}
                    className="w-full rounded-md border border-transparent bg-white px-3.5 py-2.5 text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-white/5 dark:text-white dark:ring-white/10"
                  />
                </div>

                {/* Honeypot: off-screen for people, tempting for bots. */}
                <div aria-hidden="true" className="absolute -left-[9999px]">
                  <input
                    type="text"
                    name="hp"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <Button
                  as="button"
                  variant={isSent ? 'success' : 'primary'}
                  size="xl"
                  className="w-full justify-center"
                  disabled={formStatus === 'submitting'}
                  aria-disabled={isSent || undefined}
                  accessoryRight={
                    isSent ? (
                      <PaperAirplaneIcon
                        aria-hidden="true"
                        className="-mr-0.5 ml-2 size-5"
                      />
                    ) : undefined
                  }
                >
                  {isSent
                    ? labels.successTitle
                    : formStatus === 'submitting'
                      ? labels.submitting
                      : labels.submit}
                </Button>

                {(formStatus === 'error' || formStatus === 'emailError') && (
                  <Text
                    as="p"
                    variant="c1"
                    role="alert"
                    className="mt-4 text-red-600 dark:text-red-400"
                  >
                    {formStatus === 'emailError'
                      ? labels.emailError
                      : labels.error}
                  </Text>
                )}

                <Text
                  as="p"
                  variant="c2"
                  role="status"
                  className={clsx(
                    'mt-4',
                    isSent
                      ? 'text-green-700 dark:text-green-400'
                      : 'text-slate-600 dark:text-slate-400',
                  )}
                >
                  {isSent
                    ? labels.successText
                    : AUDIT_NOTICE_LABELS[audit.locale]}
                </Text>
              </form>
            </Card>
          </FadeIn>

          <FadeIn>
            <div className="mt-10 text-center">
              <Text
                as="p"
                variant="p2"
                className="text-slate-600 dark:text-slate-300"
              >
                {page.cta.text}
              </Text>
              <LinkButton
                href={page.cta.href}
                variant="outline"
                size="xl"
                className="group mt-4"
              >
                {page.cta.label}
                <ArrowRightIcon
                  className="-mr-0.5 ml-2 size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </LinkButton>
            </div>
          </FadeIn>
        </FadeInStagger>
      </section>
    );
  }

  return (
    <section aria-labelledby={titleId}>
      <Text tone="primary" as="p" variant="eyebrow">
        {page.eyebrow}
      </Text>
      <Text as={headingAs} variant="h3" className="mt-2" id={titleId}>
        {page.title}
      </Text>
      <Text
        as="p"
        variant="p2"
        className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300"
      >
        {page.intro}
      </Text>

      <div className="mt-8 flex gap-1.5" aria-hidden="true">
        {CATEGORIES.map((category, index) => (
          <div
            key={category.key}
            className={clsx(
              'h-1 flex-1 rounded-full transition-colors duration-300 ease-out',
              index < currentStep && 'bg-green-500',
              index === currentStep && 'bg-blue-600',
              index > currentStep && 'bg-slate-200 dark:bg-slate-700',
            )}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between text-xs font-medium uppercase tracking-wide text-slate-400">
        <span className="tabular-nums">
          {labels.step} {currentStep + 1}/{CATEGORIES.length} ·{' '}
          {currentCategory.label}
        </span>
        <span className="hidden tabular-nums sm:block">
          {currentScore.answered} / {currentScore.total} {labels.answered}
        </span>
      </div>

      <Card className="mt-6 !p-0" size="sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <Text as="h3" variant="h6">
            <span className="mr-3 text-blue-600 dark:text-blue-400">
              0{currentStep + 1}
            </span>
            {currentCategory.label}
          </Text>
          <Text as="span" variant="c2" className="text-slate-400 tabular-nums">
            {currentScore.sum % 1 === 0
              ? currentScore.sum
              : currentScore.sum.toFixed(1)}
            /{currentScore.total}
          </Text>
        </div>

        {currentCategory.checks.map((check) => (
          <div
            key={check.id}
            className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-5 last:border-b-0 dark:border-slate-800"
          >
            <p className="m-0 max-w-xl text-sm text-slate-700 dark:text-slate-300">
              {check.text}
            </p>
            <div className="flex shrink-0 gap-2">
              {answerOptions.map((option) => {
                const isActive = answers[check.id] === option.value;
                return (
                  <button
                    key={option.label}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleAnswer(check.id, option.value)}
                    className={clsx(
                      'min-h-11 rounded-md border border-transparent px-3.5 py-2 text-xs font-semibold uppercase tracking-wide transition-[color,background-color,box-shadow,transform] duration-150 ease-out active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
                      !isActive &&
                        'text-slate-500 ring-1 ring-inset ring-slate-300 hover:ring-blue-500 dark:text-slate-400 dark:ring-slate-700',
                      isActive &&
                        option.value === 1 &&
                        'bg-green-600 text-white',
                      isActive &&
                        option.value === 0.5 &&
                        'bg-blue-600 text-white',
                      isActive && option.value === 0 && 'bg-red-600 text-white',
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </Card>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <Button
          variant="outline"
          size="lg"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          <ArrowLeftIcon className="-ml-0.5 mr-2 size-4" aria-hidden="true" />
          {labels.previous}
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="group"
          disabled={currentScore.answered < currentScore.total}
          onClick={handleNext}
        >
          {isLastStep ? (
            labels.seeScore
          ) : (
            <>
              {labels.next} {CATEGORIES[currentStep + 1].label}
              <ArrowRightIcon
                className="-mr-0.5 ml-2 size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </>
          )}
        </Button>
      </div>
    </section>
  );
}

export default SelfAuditQuiz;
