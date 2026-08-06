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

interface AuditCategory {
  key: string;
  label: string;
  questions: { id: string; text: string }[];
}

const CATEGORIES: AuditCategory[] = [
  {
    key: 'fondations',
    label: 'Fondations',
    questions: [
      {
        id: 'f1',
        text: 'Un Error Boundary global capture les crashs inattendus et affiche un fallback.',
      },
      {
        id: 'f2',
        text: "SafeAreaView est utilisé correctement sur tous les écrans (rien sous l'encoche ou la barre système).",
      },
      {
        id: 'f3',
        text: 'Vous avez une librairie de composants UI cohérente, pas un simple UI kit assemblé à la main.',
      },
      {
        id: 'f4',
        text: 'Toutes les modals passent par un seul système (bottom sheet unifié), pas 3 implémentations différentes.',
      },
      {
        id: 'f5',
        text: 'Vos listes longues sont virtualisées (FlatList/FlashList), pas un .map() dans un ScrollView.',
      },
      {
        id: 'f6',
        text: "Vous utilisez react-native-vision-camera plutôt qu'expo-camera pour les besoins performance (scan…), le cas échéant.",
      },
      {
        id: 'f7',
        text: 'Votre navigation repose sur un Native Stack (native-stack), pas un JS Navigator.',
      },
      {
        id: 'f8',
        text: 'Votre app tourne sur la New Architecture (Fabric + TurboModules), pas encore sur Paper et le Bridge historique.',
      },
      {
        id: 'f9',
        text: 'Vos images passent par expo-image (cache disque, placeholders, priorités), pas le composant Image de React Native.',
      },
      {
        id: 'f10',
        text: 'Vos animations et gestes complexes tournent via Reanimated sur le thread UI (transform/opacity), pas via Animated sur le thread JS.',
      },
    ],
  },
  {
    key: 'ecosystem',
    label: 'Écosystème',
    questions: [
      {
        id: 'e1',
        text: 'Vous avez Storybook (ou équivalent) pour développer vos composants isolément.',
      },
      {
        id: 'e2',
        text: "Les parties critiques de l'app sont couvertes par des tests unitaires.",
      },
      {
        id: 'e3',
        text: "Vous avez un logger centralisé pour l'observabilité, pas des console.log éparpillés.",
      },
      {
        id: 'e4',
        text: 'ESLint est configuré avec des règles spécifiques React Native, pas la config par défaut.',
      },
      {
        id: 'e5',
        text: 'Vous avez des tests E2E (Maestro ou équivalent) sur les parcours critiques.',
      },
      {
        id: 'e6',
        text: 'Sentry (ou équivalent) est centralisé dans un seul fichier, pas dispersé dans le code.',
      },
    ],
  },
  {
    key: 'data',
    label: 'Couche data',
    questions: [
      {
        id: 'd1',
        text: 'Vous utilisez TanStack Query (ou équivalent) plutôt que fetch + useState/isLoading maison.',
      },
      {
        id: 'd2',
        text: 'Vos hooks data maison (hors TanStack Query) exposent un statut typé, pas des booléens isLoading empilés.',
      },
      {
        id: 'd3',
        text: 'Votre client API est généré automatiquement depuis un schéma OpenAPI (Orval ou équivalent), zéro type manuel.',
      },
      {
        id: 'd4',
        text: 'Vous avez une vraie stratégie offline-first avec gestion de queue et retry.',
      },
      {
        id: 'd5',
        text: 'Votre state global (Context/store) ne provoque pas de re-renders en cascade sur toute l’app.',
      },
      {
        id: 'd6',
        text: 'Votre tracking GPS background (si applicable) adapte sa précision selon l’activité, pas un intervalle fixe.',
      },
      {
        id: 'd7',
        text: 'Votre stockage clé-valeur pour données non sensibles utilise MMKV (ou équivalent) plutôt qu’AsyncStorage, pour des accès synchrones et rapides.',
      },
      {
        id: 'd8',
        text: 'Vos tokens d’auth et secrets sont stockés dans expo-secure-store (Keychain/Keystore), jamais dans AsyncStorage ou MMKV en clair.',
      },
      {
        id: 'd9',
        text: 'Vos appels réseau vérifient response.ok, remontent des erreurs typées et gèrent les échecs (retry / backoff), pas juste un try/catch silencieux.',
      },
    ],
  },
  {
    key: 'devops',
    label: 'Devops',
    questions: [
      {
        id: 'o1',
        text: 'Votre bundle JS est mesuré et reste sous les 3MB minifié.',
      },
      {
        id: 'o2',
        text: 'Vous mesurez le Time To Interaction (Flashlight ou équivalent) plutôt que de deviner.',
      },
      {
        id: 'o3',
        text: "Vous êtes sur une version d'Expo SDK encore supportée (l'une des plus récentes), pas une version en fin de vie.",
      },
      {
        id: 'o4',
        text: "Vos variables d'environnement sont gérées par environnement EAS, pas de .env en dur commité.",
      },
      {
        id: 'o5',
        text: "La version de l'app est pilotée à distance (remote version source), pas bumpée à la main.",
      },
      {
        id: 'o6',
        text: 'Vous avez scanné votre app avec un outil de sécurité dédié (clés API en dur, secrets exposés…).',
      },
      {
        id: 'o7',
        text: 'Vous livrez vos correctifs JS via EAS Update (OTA) sans repasser systématiquement par une review des stores.',
      },
    ],
  },
];

const TOTAL_QUESTIONS = CATEGORIES.reduce(
  (sum, cat) => sum + cat.questions.length,
  0,
);

function getVerdict(scorePct: number) {
  if (scorePct < 40) {
    return {
      label: 'Fondations à consolider',
      text: "Plusieurs bases structurantes manquent encore — c'est le moment de prioriser avant que la dette technique ne ralentisse l'équipe.",
    };
  }
  if (scorePct < 70) {
    return {
      label: 'Bases solides, dette à surveiller',
      text: "L'essentiel est en place, mais quelques zones méritent une revue avant de scaler l'équipe ou le produit.",
    };
  }
  return {
    label: 'Stack bien tenue',
    text: 'Votre architecture tient la route sur la majorité des points. Les optimisations restantes sont surtout marginales.',
  };
}

interface StackAuditProps {
  headingAs?: 'h1' | 'h2';
}

export function StackAudit({ headingAs = 'h2' }: StackAuditProps) {
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
  const verdict = getVerdict(scorePct);

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
      <section aria-labelledby="stack-audit-title">
        <Button variant="outline" size="lg" onClick={handleReset}>
          <ArrowLeftIcon className="-ml-0.5 mr-2 size-4" aria-hidden="true" />
          Recommencer l'audit
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
                  Recevez votre rapport d'audit complet
                </Text>
                <Text
                  as="p"
                  variant="p2"
                  className="mt-4 text-slate-600 dark:text-slate-300"
                >
                  Le détail de vos réponses, priorisé par impact et effort
                  (comme un vrai audit d'architecture), envoyé directement dans
                  votre boîte mail.
                </Text>
                <ul className="mt-6 space-y-3">
                  {[
                    'Vos points faibles classés par priorité (impact / effort)',
                    'Des recommandations concrètes par item, pas de généralités',
                    'Le même format utilisé pour les audits clients',
                  ].map((bullet) => (
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
                      htmlFor="stack-audit-name"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="stack-audit-name"
                      name="fields[name]"
                      placeholder="Ton prénom"
                      autoComplete="given-name"
                      className="w-full rounded-md border-0 bg-white px-3.5 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-white/5 dark:text-white dark:ring-white/10"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="stack-audit-email"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Email pro
                    </label>
                    <input
                      type="email"
                      id="stack-audit-email"
                      name="fields[email]"
                      placeholder="toi@entreprise.com"
                      required
                      autoComplete="email"
                      className="w-full rounded-md border-0 bg-white px-3.5 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-white/5 dark:text-white dark:ring-white/10"
                    />
                  </div>

                  <input
                    type="hidden"
                    name="fields[audit_score]"
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
                Score en dessous de 70 ? Notre équipe réalise le même audit en
                profondeur sur votre codebase, avec un plan d'action priorisé.
              </Text>
              <LinkButton
                href="/audit"
                variant="outline"
                size="xl"
                className="group mt-4"
              >
                Découvrir l'audit complet
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
    <section aria-labelledby="stack-audit-title">
      <Text
        as="p"
        variant="c2"
        className="uppercase tracking-wide text-blue-600 dark:text-blue-400"
      >
        Outil gratuit
      </Text>
      <Text as={headingAs} variant="h3" className="mt-2" id="stack-audit-title">
        Auditez vous-même votre stack React Native
      </Text>
      <Text
        as="p"
        variant="p2"
        className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300"
      >
        32 questions, 4 catégories, un score en 3 minutes. La même grille
        utilisée pour challenger l'architecture d'apps qui gèrent des millions
        d'utilisateurs — transformée en checklist que vous pouvez faire passer à
        votre propre codebase.
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

export default StackAudit;
