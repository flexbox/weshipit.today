import {
  Button,
  Card,
  FadeIn,
  FadeInStagger,
  LinkButton,
  Text,
} from '@weshipit/ui';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { FormEvent, useState } from 'react';

// MailerLite → Forms → Embedded form → HTML code → action URL
// https://assets.mailerlite.com/jsonp/ACCOUNT_ID/forms/FORM_ID/subscribe
const MAILERLITE_FORM_ACTION =
  'https://assets.mailerlite.com/jsonp/ACCOUNT_ID/forms/FORM_ID/subscribe';

const ANSWER_OPTIONS = [
  { label: 'Oui', value: 1 },
  { label: 'Incertain', value: 0.5 },
  { label: 'Non', value: 0 },
] as const;

export interface AuditCategory {
  key: string;
  label: string;
  questions: { id: string; text: string }[];
}

export interface AuditVerdict {
  label: string;
  text: string;
}

export interface SelfAuditConfig {
  /** Prefix for DOM ids, unique per page. */
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  categories: AuditCategory[];
  getVerdict: (scorePct: number) => AuditVerdict;
  resetLabel: string;
  report: { title: string; text: string; bullets: string[] };
  /** MailerLite custom field receiving the score. */
  scoreField: string;
  cta: { text: string; href: string; label: string };
}

interface SelfAuditQuizProps {
  config: SelfAuditConfig;
  headingAs?: 'h1' | 'h2';
}

export function SelfAuditQuiz({
  config,
  headingAs = 'h2',
}: SelfAuditQuizProps) {
  const { categories: CATEGORIES } = config;
  const TOTAL_QUESTIONS = CATEGORIES.reduce(
    (sum, cat) => sum + cat.questions.length,
    0,
  );
  const titleId = `${config.id}-title`;
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [formStatus, setFormStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const categoryScore = (category: AuditCategory) => {
    let sum = 0;
    let answered = 0;
    for (const question of category.questions) {
      const value = answers[question.id];
      if (value !== undefined) {
        sum += value;
        answered += 1;
      }
    }
    return { answered, sum, total: category.questions.length };
  };

  const currentCategory = CATEGORIES[currentStep];
  const currentScore = categoryScore(currentCategory);
  const isLastStep = currentStep === CATEGORIES.length - 1;

  const totalSum = Object.values(answers).reduce(
    (sum, value) => sum + value,
    0,
  );
  const scorePct = Math.round((totalSum / TOTAL_QUESTIONS) * 100);
  const verdict = config.getVerdict(scorePct);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
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

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('submitting');
    try {
      const response = await fetch(MAILERLITE_FORM_ACTION, {
        method: 'POST',
        body: new FormData(event.currentTarget),
      });
      const result = await response.json();
      setFormStatus(result.success ? 'success' : 'error');
    } catch {
      setFormStatus('error');
    }
  };

  if (showResults) {
    return (
      <section aria-labelledby={titleId}>
        <Button variant="outline" size="lg" onClick={handleReset}>
          <ArrowLeftIcon className="-ml-0.5 mr-2 size-4" aria-hidden="true" />
          {config.resetLabel}
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
                  <Text
                    as="h3"
                    variant="c2"
                    className="uppercase tracking-wide text-blue-600 dark:text-blue-400"
                  >
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
                    <Text
                      as="p"
                      variant="c2"
                      className="uppercase tracking-wide text-slate-500 dark:text-slate-400"
                    >
                      {category.label}
                    </Text>
                    <Text
                      as="p"
                      variant="h5"
                      className="mt-2 text-blue-600 dark:text-blue-400"
                    >
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
                  Rapport détaillé
                </Text>
                <Text as="h3" variant="h4" className="mt-3">
                  {config.report.title}
                </Text>
                <Text
                  as="p"
                  variant="p2"
                  className="mt-4 text-slate-600 dark:text-slate-300"
                >
                  {config.report.text}
                </Text>
                <ul className="mt-6 space-y-3">
                  {config.report.bullets.map((bullet) => (
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

              {formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center">
                  <Text
                    as="p"
                    variant="h4"
                    className="text-green-600 dark:text-green-400"
                  >
                    Rapport en route ✓
                  </Text>
                  <Text
                    as="p"
                    variant="p2"
                    className="mt-3 text-slate-600 dark:text-slate-300"
                  >
                    Vérifiez votre boîte mail (et le dossier spam) dans les
                    prochaines minutes.
                  </Text>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col justify-center"
                >
                  <div className="mb-4">
                    <label
                      htmlFor={`${config.id}-name`}
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Prénom
                    </label>
                    <input
                      type="text"
                      id={`${config.id}-name`}
                      name="fields[name]"
                      placeholder="Ton prénom"
                      autoComplete="given-name"
                      className="w-full rounded-md border-0 bg-white px-3.5 py-2.5 text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-white/5 dark:text-white dark:ring-white/10"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor={`${config.id}-email`}
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Email pro
                    </label>
                    <input
                      type="email"
                      id={`${config.id}-email`}
                      name="fields[email]"
                      placeholder="toi@entreprise.com"
                      required
                      autoComplete="email"
                      className="w-full rounded-md border-0 bg-white px-3.5 py-2.5 text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-white/5 dark:text-white dark:ring-white/10"
                    />
                  </div>

                  <input
                    type="hidden"
                    name={`fields[${config.scoreField}]`}
                    value={scorePct}
                  />
                  <input type="hidden" name="ml-submit" value="1" />

                  <Button
                    as="button"
                    variant="primary"
                    size="xl"
                    className="w-full justify-center"
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting'
                      ? 'Envoi en cours…'
                      : 'Recevoir mon rapport'}
                  </Button>

                  {formStatus === 'error' && (
                    <Text
                      as="p"
                      variant="c1"
                      className="mt-4 text-red-600 dark:text-red-400"
                    >
                      Une erreur est survenue. Réessayez, ou écrivez-nous
                      directement.
                    </Text>
                  )}

                  <Text
                    as="p"
                    variant="c2"
                    className="mt-4 text-slate-400 dark:text-slate-500"
                  >
                    Un email, zéro spam. Désinscription possible à tout moment
                    via chaque email envoyé.
                  </Text>
                </form>
              )}
            </Card>
          </FadeIn>

          <FadeIn>
            <div className="mt-10 text-center">
              <Text
                as="p"
                variant="p2"
                className="text-slate-600 dark:text-slate-300"
              >
                {config.cta.text}
              </Text>
              <LinkButton
                href={config.cta.href}
                variant="outline"
                size="xl"
                className="group mt-4"
              >
                {config.cta.label}
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
      <Text
        as="p"
        variant="c2"
        className="uppercase tracking-wide text-blue-600 dark:text-blue-400"
      >
        {config.eyebrow}
      </Text>
      <Text as={headingAs} variant="h3" className="mt-2" id={titleId}>
        {config.title}
      </Text>
      <Text
        as="p"
        variant="p2"
        className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300"
      >
        {config.intro}
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
          Étape {currentStep + 1}/{CATEGORIES.length} · {currentCategory.label}
        </span>
        <span className="hidden tabular-nums sm:block">
          {currentScore.answered} / {currentScore.total} répondues
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

        {currentCategory.questions.map((question) => (
          <div
            key={question.id}
            className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-5 last:border-b-0 dark:border-slate-800"
          >
            <p className="m-0 max-w-xl text-sm text-slate-700 dark:text-slate-300">
              {question.text}
            </p>
            <div className="flex shrink-0 gap-2">
              {ANSWER_OPTIONS.map((option) => {
                const isActive = answers[question.id] === option.value;
                return (
                  <button
                    key={option.label}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleAnswer(question.id, option.value)}
                    className={clsx(
                      'min-h-11 rounded-md px-3.5 py-2 text-xs font-semibold uppercase tracking-wide transition-[color,background-color,box-shadow,transform] duration-150 ease-out active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
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
          Précédent
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="group"
          disabled={currentScore.answered < currentScore.total}
          onClick={handleNext}
        >
          {isLastStep ? (
            'Voir mon score'
          ) : (
            <>
              Suivant : {CATEGORIES[currentStep + 1].label}
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
