import { Text, Button, ClientsListHomepage, Faq } from '@weshipit/ui';

import { Customer, getVisibleClients } from './api/client';
import Head from 'next/head';
import { Layout } from '../components/layout';
import { linksApi } from './api/links';
import {
  ClockIcon,
  BugAntIcon,
  ExclamationTriangleIcon,
  UsersIcon,
  CubeIcon,
  EyeSlashIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  CogIcon,
  BoltIcon,
  CheckIcon,
  ArrowRightIcon,
  PlayIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

interface BonjourPageProps {
  clients: Customer[];
}

const testimonials = [
  {
    quote:
      "Capacité d'adaptation à notre environnement de travail. Travailler avec des petites entreprises n'est pas toujours facile, mais David et Matthys ont su s'intégrer parfaitement à notre équipe.",
    author: 'Ludovic Borie',
    role: 'CTO, Karnott',
  },
  {
    quote:
      "Énergie positive, envie d'avancer, proposer des solutions. Grâce à son coaching automation, je suis plus productive — merci !",
    author: 'Clémentine Lourme',
    role: 'Business developer, Retail Shake',
  },
  {
    quote:
      "Des connaissances pratiques et une expertise impressionnantes, avec beaucoup d'informations utiles pour se lancer dans le développement le plus facilement et efficacement possible.",
    author: 'Alice Jodra',
    role: 'Chef de projet IT, Saint-Gobain PAM Canalisation',
  },
];

const CTA_LABEL = 'Prendre un premier mois';

function HeroSection() {
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2016;

  return (
    <section className="relative overflow-hidden pt-32 pb-24">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Text variant="h1" as="h1" className="mb-6 text-balance">
            Si ton app React Native devient{' '}
            <span className="text-neutral-500 dark:text-neutral-400">
              plus lente
            </span>{' '}
            à chaque feature…{' '}
            <span className="text-accent">ce n’est pas normal.</span>
          </Text>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-xl">
            Une bonne app devient plus rapide à faire évoluer avec le temps. La
            tienne te ralentit. Et ça te coûte déjà des users, du temps et du
            cash.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href={linksApi.cal.ONBOARDING}
              as="a"
              size="lg"
              variant="primary"
              isExternalLink
              withExternalLinkIcon={false}
            >
              {CTA_LABEL}
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button as="a" href="#video" size="lg" variant="outline">
              <PlayIcon className="mr-2 h-4 w-4" />
              Voir la vidéo
            </Button>
          </div>
        </div>

        {/* Video */}
        <div id="video" className="mx-auto mt-16 max-w-4xl">
          <div className="aspect-video overflow-hidden rounded-xl border border-border bg-card">
            <iframe
              src="https://player.vimeo.com/video/1183545111?badge=0&autopause=0&title=0&byline=0&portrait=0&sidedock=0&controls=1&color=22c55e&transparent=0"
              allow="autoplay; fullscreen; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              title="weshipit.today — VSL"
              className="h-full w-full border-0"
            />
          </div>
        </div>

        {/* Intro */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
            Je m&apos;appelle{' '}
            <span className="font-medium text-neutral-950 dark:text-neutral-200">
              David
            </span>
            . Ça fait{' '}
            <span className="font-medium text-neutral-950 dark:text-neutral-200">
              {yearsOfExperience} ans
            </span>{' '}
            que je travaille uniquement sur React Native. Aujourd&apos;hui,
            j&apos;aide des scale-ups à faire une chose simple :{' '}
            <span className="font-semibold text-accent">
              shipper. Tous les jours.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── PROBLEMS ────────────────────────────────────────────────────────────────
function ProblemsSection() {
  const problems = [
    {
      icon: ClockIcon,
      text: 'Chaque feature prend plus de temps que la précédente',
    },
    { icon: BugAntIcon, text: "Les bugs s'accumulent" },
    {
      icon: ExclamationTriangleIcon,
      text: 'Personne ne sait vraiment pourquoi ça casse',
    },
    {
      icon: UsersIcon,
      text: "Tes devs n'ont même plus envie de travailler dessus",
    },
  ];

  const hiddenProblems = [
    { icon: CubeIcon, text: 'Des dépendances jamais mises à jour' },
    { icon: XMarkIcon, text: 'Des librairies incohérentes' },
    { icon: EyeSlashIcon, text: 'Zéro observabilité' },
  ];

  return (
    <section id="probleme" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left */}
          <div>
            <Text variant="h3" as="h2" className="mb-8">
              Le problème, ce n&apos;est pas ton équipe.{' '}
              <span className="text-accent">C&apos;est ton app.</span>
            </Text>
            <ul className="space-y-4">
              {problems.map((p, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary">
                    <p.icon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                  </div>
                  <span className="pt-2 text-neutral-950 dark:text-neutral-200">
                    {p.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div>
            <Text variant="h4" as="h3" className="mb-8">
              Ce que personne ne te dit
            </Text>
            <p className="mb-6 leading-relaxed text-neutral-500 dark:text-neutral-400">
              Ton app ne ralentit pas par hasard. Tu accumules :
            </p>
            <ul className="mb-8 space-y-3">
              {hiddenProblems.map((p, i) => (
                <li key={i} className="flex items-center gap-3">
                  <p.icon className="h-5 w-5 text-destructive" />
                  <span className="text-neutral-950 dark:text-neutral-200">
                    {p.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
              <p className="mb-4 font-medium text-destructive">
                Résultat : tu ne maîtrises plus rien.
              </p>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                Vendredi soir. Release prévue. Tout casse. Et tu n&apos;as plus
                que deux options : rebuild from scratch ou patcher en espérant
                que ça tienne.{' '}
                <span className="font-medium text-neutral-950 dark:text-neutral-200">
                  Dans les deux cas, tu brûles du cash.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── STATS / AUTORITÉ ────────────────────────────────────────────────────────
function StatsSection() {
  const stats = [
    {
      value: '90%',
      label: 'de réutilisation de code',
      description:
        'Architecture designée chez Mahalo Banking — onboarding rapide, coût technique réduit',
    },
    {
      value: '100%',
      label: 'des releases automatisées',
      description: 'Shipping continu pendant 5 ans sur des projets complexes',
    },
    {
      value: 'IoT',
      label: 'offline-first, apps complexes',
      description:
        'Des apps qui tournent dans des environnements hostiles, sans réseau',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-accent">
            J&apos;ai vu ça des dizaines de fois.
          </p>
          <Text variant="h3" as="h2" className="mx-auto max-w-2xl">
            Je ne fais pas du code.{' '}
            <span className="text-neutral-500 dark:text-neutral-400">
              Je règle des problèmes de vélocité.
            </span>
          </Text>
        </div>

        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col justify-between bg-card p-8">
              <div>
                <div className="mb-2 text-5xl font-bold tracking-tight text-neutral-950 dark:text-neutral-200 md:text-6xl">
                  {stat.value}
                </div>
                <div className="mb-4 text-lg font-medium text-neutral-950 dark:text-neutral-200">
                  {stat.label}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section id="testimonials" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <Text variant="h3" as="h2" className="mb-4">
            Ils ont transformé leur app avec nous
          </Text>
          <p className="text-neutral-500 dark:text-neutral-400">
            Des apps lentes devenues des plateformes scalables. Des années de
            releases automatisées.
          </p>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
            >
              <svg
                className="mb-4 h-8 w-8 text-accent opacity-50"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {item.quote}
              </p>
              <div className="border-t border-border pt-4">
                <div className="font-medium text-neutral-950 dark:text-neutral-200">
                  {item.author}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  {item.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ─────────────────────────────────────────────────────────────────
function ProcessSection() {
  const steps = [
    {
      number: '1',
      icon: MagnifyingGlassIcon,
      title: 'Fondations',
      description: 'On identifie ce qui bloque. On nettoie.',
      items: [
        "Audit des dépendances et de l'architecture",
        'Suppression du code mort et des librairies inutiles',
        'Mise à jour des versions critiques',
      ],
    },
    {
      number: '2',
      icon: CogIcon,
      title: 'Écosystème',
      description: 'On met en place les outils pour ship.',
      items: [
        'Observabilité (crash reports, performance monitoring)',
        'Tests automatisés sur les chemins critiques',
        'CI/CD pour déployer sans stress',
      ],
    },
    {
      number: '3',
      icon: BoltIcon,
      title: 'Accélération',
      description: 'On optimise perf, data, release.',
      items: [
        'Optimisation des performances (FPS, TTI, bundle size)',
        'Data layer propre (cache, offline, sync)',
        'Release pipeline automatisé',
      ],
    },
  ];

  return (
    <section id="process" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <Text variant="h3" as="h2" className="mb-4">
            Je prends ton app et je la transforme en{' '}
            <span className="text-accent">machine à shipper.</span>
          </Text>
          <p className="text-neutral-500 dark:text-neutral-400">
            Pas dans 6 mois.{' '}
            <span className="font-medium text-neutral-950 dark:text-neutral-200">
              Maintenant.
            </span>
          </p>
        </div>

        <div className="mb-12 flex items-center justify-center gap-4 text-center">
          <span className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-neutral-500 dark:text-neutral-400 line-through">
            &ldquo;on espère que ça passe&rdquo;
          </span>
          <span className="text-2xl text-accent">&rarr;</span>
          <span className="rounded-lg border border-accent bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
            &ldquo;on ship aujourd&apos;hui&rdquo;
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-xl font-bold text-neutral-950 dark:text-neutral-200">
                  {step.number}
                </div>
                <step.icon className="h-6 w-6 text-accent" />
              </div>
              <Text variant="s2" as="h3" className="mb-2 font-bold">
                {step.title}
              </Text>
              <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
                {step.description}
              </p>
              <ul className="space-y-2">
                {step.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-neutral-500 dark:text-neutral-400"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────
function PricingSection() {
  const features = [
    {
      positive: true,
      title: 'Pas de contrat long',
      description: 'Tu prends un mois. On ship. Tu continues si ça fonctionne.',
    },
    {
      positive: true,
      title: "Pas d'engagement",
      description:
        "Pause ou annule quand tu veux. Le code t'appartient à 100%.",
    },
    {
      positive: false,
      title: 'Pas de remboursement',
      description: 'Si ça ne fonctionne pas, tu arrêtes. Simple.',
    },
  ];

  return (
    <section id="pricing" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="border-b border-border bg-secondary/30 px-8 py-12 text-center">
              <div className="mb-2 text-sm font-medium uppercase tracking-wider text-accent">
                Tarif unique
              </div>
              <div className="mb-4 flex items-baseline justify-center gap-2">
                <span className="text-6xl font-bold tracking-tight text-neutral-950 dark:text-neutral-200 md:text-7xl">
                  5k&euro;
                </span>
                <span className="text-xl text-neutral-500 dark:text-neutral-400">
                  /mois
                </span>
              </div>
              <p className="text-neutral-500 dark:text-neutral-400">
                C&apos;est tout.
              </p>
            </div>

            <div className="p-8">
              <div className="mb-8 grid gap-6 md:grid-cols-3">
                {features.map((f, i) => (
                  <div key={i} className="text-center">
                    <div
                      className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full ${
                        f.positive
                          ? 'bg-accent/20 text-accent'
                          : 'bg-secondary text-neutral-500 dark:text-neutral-400'
                      }`}
                    >
                      {f.positive ? (
                        <CheckIcon className="h-5 w-5" />
                      ) : (
                        <XMarkIcon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="mb-1 font-medium text-neutral-950 dark:text-neutral-200">
                      {f.title}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      {f.description}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                href={linksApi.stripe.MONTHLY_PLAN}
                as="a"
                size="xl"
                variant="primary"
                isExternalLink
                withExternalLinkIcon={false}
                className="w-full justify-center"
              >
                {CTA_LABEL}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── COMPARISON ──────────────────────────────────────────────────────────────
function ComparisonSection() {
  const rows = [
    {
      category: 'Coût',
      without: 'Dev senior en CDI : 60-90k €/an + charges',
      withUs: '5 000 €/mois, sans engagement',
    },
    {
      category: 'Délai premier impact',
      without: '3-6 mois de recrutement + onboarding',
      withUs: 'Première semaine',
    },
    {
      category: 'Risque',
      without: 'Mauvais recrutement = 6 mois perdus',
      withUs: 'Tu arrêtes si ça ne marche pas',
    },
    {
      category: 'Résultat',
      without: 'Un dev de plus dans une app qui ralentit',
      withUs: 'Une app qui ship tous les jours',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <Text variant="h3" as="h2" className="mb-4">
            Combien ça te coûte de continuer comme ça ?
          </Text>
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-accent">-50%</span>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                de temps de dev
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-accent">+35%</span>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                de rétention utilisateur
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-3 border-b border-border bg-secondary">
            <div className="p-4" />
            <div className="border-l border-border p-4 text-center font-medium text-neutral-950 dark:text-neutral-200">
              Sans nous
            </div>
            <div className="border-l border-border bg-accent/10 p-4 text-center font-medium text-accent">
              Avec weshipit.today
            </div>
          </div>
          {rows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 ${
                i !== rows.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="flex items-center p-4 font-medium text-neutral-950 dark:text-neutral-200">
                {row.category}
              </div>
              <div className="flex items-center gap-2 border-l border-border bg-card p-4 text-sm text-neutral-500 dark:text-neutral-400">
                <XMarkIcon className="h-4 w-4 shrink-0 text-destructive" />
                {row.without}
              </div>
              <div className="flex items-center gap-2 border-l border-border bg-accent/5 p-4 text-sm text-neutral-950 dark:text-neutral-200">
                <CheckIcon className="h-4 w-4 shrink-0 text-accent" />
                {row.withUs}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── URGENCY ─────────────────────────────────────────────────────────────────
function UrgencySection() {
  const items = [
    {
      icon: ArrowTrendingDownIcon,
      value: '40%',
      text: 'des users désinstallent une app instable chaque semaine',
    },
    {
      icon: BoltIcon,
      value: '+',
      text: 'Tes concurrents shippent pendant que ton app vieillit',
    },
    {
      icon: CurrencyDollarIcon,
      value: '$$$',
      text: 'Ta dette technique augmente chaque jour',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4">
            Chaque semaine sans agir te coûte
          </Text>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                <item.icon className="h-7 w-7 text-destructive" />
              </div>
              <div className="mb-2 text-3xl font-bold text-neutral-950 dark:text-neutral-200">
                {item.value}
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-accent bg-accent/10 p-8 text-center">
          <p className="text-xl font-bold text-neutral-950 dark:text-neutral-200">
            On prend <span className="text-accent">3 clients max</span>. Il
            reste une place.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── CTA FINAL ───────────────────────────────────────────────────────────────
function CtaFinalSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />
          </div>

          <div className="relative px-8 py-16 text-center md:py-24">
            <Text variant="h2" as="h2" className="mb-6">
              Je ne promets pas du code.{' '}
              <span className="text-accent">Je promets du shipping.</span>
            </Text>
            <p className="mx-auto mb-10 max-w-xl text-lg text-neutral-500 dark:text-neutral-400">
              Prends un premier mois. Et vois par toi-même si ton app peut enfin
              ship.
            </p>

            <Button
              href={linksApi.stripe.MONTHLY_PLAN}
              as="a"
              size="xxl"
              variant="primary"
              isExternalLink
              withExternalLinkIcon={false}
              className="mx-auto justify-center"
            >
              {CTA_LABEL}
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Sans engagement
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />3 clients
                max
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Le code t&apos;appartient
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ DATA ────────────────────────────────────────────────────────────────
const faqs = [
  {
    id: 'faq-fr-1',
    question: "C'est quoi exactement qui est inclus dans les 5 000 €/mois ?",
    answer:
      "Développement React Native, audits de performance, mise à jour des dépendances, CI/CD, observabilité, tests, support Slack, calls hebdo. On s'occupe de tout ce qui bloque ton shipping.",
  },
  {
    id: 'faq-fr-2',
    question: 'Et si je veux arrêter après un mois ?',
    answer:
      "Tu arrêtes. Pas de pénalité, pas de préavis. Le code t'appartient à 100%. Tu peux reprendre le développement plus tard, ou le donner à une autre équipe.",
  },
  {
    id: 'faq-fr-3',
    question: 'Pourquoi pas recruter un dev React Native senior ?',
    answer:
      "Un senior React Native coûte entre 60 000 € et 90 000 € par an, sans compter les charges, les avantages et les mois de recrutement. Et un dev seul ne résout pas un problème d'architecture ou de vélocité. Notre abonnement te donne accès à une équipe senior, immédiatement, sans engagement.",
  },
  {
    id: 'faq-fr-4',
    question:
      'Mon app est vraiment en mauvais état. Vous pouvez quand même intervenir ?',
    answer:
      "C'est exactement ce qu'on fait. On a déjà transformé des apps avec des centaines de dépendances obsolètes, zéro tests, et des releases manuelles en apps qui shippent tous les jours. L'étape 1 (Fondations) est faite pour ça.",
  },
  {
    id: 'faq-fr-5',
    question: 'Combien de temps avant de voir des résultats concrets ?',
    answer:
      'Premier livrable en quelques jours, pas en quelques mois. Dès la première semaine, on identifie et corrige les blockers les plus critiques. En un mois, ton pipeline de release est en place.',
  },
  {
    id: 'faq-fr-6',
    question: 'Pourquoi pas de remboursement ?',
    answer:
      "Parce que notre modèle est simple : si ça ne fonctionne pas, tu arrêtes. Pas de contrat qui te bloque. La qualité de notre travail parle d'elle-même.",
  },
  {
    id: 'faq-fr-7',
    question: 'Avec qui je travaille concrètement ?',
    answer:
      "Directement avec David et Matthys, les deux développeurs seniors de l'équipe. Pas d'account managers, pas de junior qui découvre React Native sur ton projet.",
  },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function BonjourPage({ clients }: BonjourPageProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://weshipit.today',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Agence React Native',
        item: 'https://weshipit.today/bonjour',
      },
    ],
  };

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'weshipit.today \u2014 Agence Web React Native',
    description:
      'Agence web sp\u00e9cialis\u00e9e dans le d\u00e9veloppement d\u2019applications mobiles React Native pour iOS et Android. Experts React Native depuis 2016.',
    url: 'https://weshipit.today/bonjour',
    foundingDate: '2016',
    knowsAbout: [
      'React Native',
      'iOS',
      'Android',
      'applications mobiles',
      'd\u00e9veloppement cross-platform',
    ],
    serviceType: 'D\u00e9veloppement d\u2019applications mobiles React Native',
    areaServed: { '@type': 'Country', name: 'France' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services de d\u00e9veloppement React Native',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'D\u00e9veloppement application React Native',
            description:
              'Cr\u00e9ation d\u2019applications iOS et Android avec React Native',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Audit et performance React Native',
            description:
              'Audit de performance et optimisation d\u2019applications React Native existantes',
          },
        },
      ],
    },
  };

  return (
    <>
      <Head>
        <link
          rel="alternate"
          hrefLang="fr"
          href="https://weshipit.today/bonjour"
        />
        <link rel="alternate" hrefLang="en" href="https://weshipit.today/" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://weshipit.today/"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />
      </Head>
      <Layout
        seoTitle="Ton app React Native ralentit ? On la transforme en machine à shipper | weshipit.today"
        seoDescription="5k/mois, sans engagement. On prend ton app React Native et on la transforme : fondations, observabilité, CI/CD, performance. Tu ship tous les jours."
        ogImageTitle="Ton app React Native ralentit ? On la fixe."
        ogImageAlt="weshipit.today — Experts React Native. 5k/mois. Ship tous les jours."
        locale="fr_FR"
        withHeader
        withFooter
        callToActionButton={{
          name: CTA_LABEL,
          href: linksApi.cal.ONBOARDING,
          isExternalLink: true,
        }}
      >
        <HeroSection />
        <ProblemsSection />
        <StatsSection />
        <TestimonialsSection />
        <ProcessSection />
        <PricingSection />
        <ComparisonSection />
        <UrgencySection />

        {/* FAQ */}
        <section id="faq" className="border-t border-border py-24">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-12 text-center">
              <Text variant="h3" as="h2" className="mb-4">
                Questions fréquentes
              </Text>
            </div>
            <Faq faqs={faqs} title="" headingId="faq-fr-heading" />
          </div>
        </section>

        <CtaFinalSection />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { clients } = await getVisibleClients();

  return {
    props: {
      clients: clients ?? [],
    },
  };
}
