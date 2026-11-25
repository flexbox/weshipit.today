import {
  Button,
  ClientsListHomepage,
  Container,
  Faq,
  Section,
  Surface,
  Text,
} from '@weshipit/ui';

import { Customer, getVisibleClients } from '../utils/clients';
import Head from 'next/head';
import { Layout } from '../components/layout';
import { linksApi } from '../utils/links';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
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
    author: 'Ludovic Borie',
    quote:
      "Capacité d'adaptation à notre environnement de travail. Travailler avec des petites entreprises n'est pas toujours facile, mais David et Matthys ont su s'intégrer parfaitement à notre équipe.",
    role: 'CTO, Karnott',
  },
  {
    author: 'Clémentine Lourme',
    quote:
      "Énergie positive, envie d'avancer, proposer des solutions. Grâce à son coaching automation, je suis plus productive — merci !",
    role: 'Business developer, Retail Shake',
  },
  {
    author: 'Alice Jodra',
    quote:
      "Des connaissances pratiques et une expertise impressionnantes, avec beaucoup d'informations utiles pour se lancer dans le développement le plus facilement et efficacement possible.",
    role: 'Chef de projet IT, Saint-Gobain PAM Canalisation',
  },
];

const CTA_LABEL = 'Prendre un premier mois';

function HeroSection() {
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2016;

  return (
    <section className="relative overflow-hidden pt-32 pb-24">
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <Text variant="h1" as="h1" className="mb-6 text-balance">
            Si ton app React Native devient{' '}
            <Text as="span" variant="inherit" tone="muted">
              plus lente
            </Text>{' '}
            à chaque feature…{' '}
            <span className="text-accent">ce n’est pas normal.</span>
          </Text>

          <Text
            variant="lead"
            tone="muted"
            className="mx-auto mb-10 max-w-2xl text-pretty leading-relaxed"
          >
            Une bonne app devient plus rapide à faire évoluer avec le temps. La
            tienne te ralentit. Et ça te coûte déjà des users, du temps et du
            cash.
          </Text>

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
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <LiteYouTubeEmbed
              id="s3x1jFzSrZY"
              title="weshipit.today — VSL"
              poster="maxresdefault"
              webp
            />
          </div>
        </div>

        {/* Intro */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <Text
            variant="lead"
            tone="muted"
            className="text-pretty leading-relaxed"
          >
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
          </Text>
        </div>
      </Container>
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
    <Section id="probleme">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left */}
          <div>
            <Text variant="h3" as="h2" className="mb-8 text-balance">
              Le problème, ce n&apos;est pas ton équipe.{' '}
              <span className="text-accent">C&apos;est ton app.</span>
            </Text>
            <ul className="space-y-4">
              {problems.map((p, i) => (
                <Surface as="li" key={i} className="flex items-start gap-4 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <p.icon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                  </div>
                  <span className="pt-2 text-neutral-950 dark:text-neutral-200">
                    {p.text}
                  </span>
                </Surface>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div>
            <Text variant="h4" as="h3" className="mb-8">
              Ce que personne ne te dit
            </Text>
            <Text
              variant="inherit"
              tone="muted"
              className="mb-6 leading-relaxed"
            >
              Ton app ne ralentit pas par hasard. Tu accumules :
            </Text>
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
            <Surface tone="destructive">
              <p className="mb-4 font-medium text-destructive">
                Résultat : tu ne maîtrises plus rien.
              </p>
              <Text variant="small" tone="muted" className="leading-relaxed">
                Vendredi soir. Release prévue. Tout casse. Et tu n&apos;as plus
                que deux options : rebuild from scratch ou patcher en espérant
                que ça tienne.{' '}
                <span className="font-medium text-neutral-950 dark:text-neutral-200">
                  Dans les deux cas, tu brûles du cash.
                </span>
              </Text>
            </Surface>
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ─── STATS / AUTORITÉ ────────────────────────────────────────────────────────
function StatsSection() {
  const stats = [
    {
      description:
        'Architecture designée chez Mahalo Banking — onboarding rapide, coût technique réduit',
      label: 'de réutilisation de code',
      value: '90%',
    },
    {
      description: 'Shipping continu pendant 5 ans sur des projets complexes',
      label: 'des releases automatisées',
      value: '100%',
    },
    {
      description:
        'Des apps qui tournent dans des environnements hostiles, sans réseau',
      label: 'offline-first, apps complexes',
      value: 'IoT',
    },
  ];

  return (
    <Section>
      <Container>
        <div className="mb-16 text-center">
          <Text variant="eyebrow" className="mb-4">
            J&apos;ai vu ça des dizaines de fois.
          </Text>
          <Text variant="h3" as="h2" className="mx-auto max-w-2xl text-balance">
            Je ne fais pas du code.{' '}
            <Text as="span" variant="inherit" tone="muted">
              Je règle des problèmes de vélocité.
            </Text>
          </Text>
        </div>

        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col justify-between bg-card p-8">
              <div>
                <div className="font-display mb-2 text-5xl font-bold tracking-[-0.03em] text-neutral-950 dark:text-neutral-200 md:text-6xl">
                  {stat.value}
                </div>
                <div className="mb-4 text-lg font-medium text-neutral-950 dark:text-neutral-200">
                  {stat.label}
                </div>
              </div>
              <Text variant="small" tone="muted" className="leading-relaxed">
                {stat.description}
              </Text>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <Section id="testimonials">
      <Container>
        <div className="mb-16 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Ils ont transformé leur app avec nous
          </Text>
          <Text variant="inherit" tone="muted">
            Des apps lentes devenues des plateformes scalables. Des années de
            releases automatisées.
          </Text>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Surface
              interactive
              key={index}
              className="group relative flex flex-col"
            >
              <svg
                className="mb-4 h-8 w-8 text-accent opacity-50"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <Text
                variant="small"
                tone="muted"
                className="mb-6 flex-1 leading-relaxed"
              >
                {item.quote}
              </Text>
              <div className="border-t border-border pt-4">
                <div className="font-medium text-neutral-950 dark:text-neutral-200">
                  {item.author}
                </div>
                <Text as="div" variant="small" tone="muted">
                  {item.role}
                </Text>
              </div>
            </Surface>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── PROCESS ─────────────────────────────────────────────────────────────────
function ProcessSection() {
  const steps = [
    {
      description: 'On identifie ce qui bloque. On nettoie.',
      icon: MagnifyingGlassIcon,
      items: [
        "Audit des dépendances et de l'architecture",
        'Suppression du code mort et des librairies inutiles',
        'Mise à jour des versions critiques',
      ],
      number: '1',
      title: 'Fondations',
    },
    {
      description: 'On met en place les outils pour ship.',
      icon: CogIcon,
      items: [
        'Observabilité (crash reports, performance monitoring)',
        'Tests automatisés sur les chemins critiques',
        'CI/CD pour déployer sans stress',
      ],
      number: '2',
      title: 'Écosystème',
    },
    {
      description: 'On optimise perf, data, release.',
      icon: BoltIcon,
      items: [
        'Optimisation des performances (FPS, TTI, bundle size)',
        'Data layer propre (cache, offline, sync)',
        'Release pipeline automatisé',
      ],
      number: '3',
      title: 'Accélération',
    },
  ];

  return (
    <Section id="process">
      <Container>
        <div className="mb-16 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Je prends ton app et je la transforme en{' '}
            <span className="text-accent">machine à shipper.</span>
          </Text>
          <Text variant="inherit" tone="muted">
            Pas dans 6 mois.{' '}
            <span className="font-medium text-neutral-950 dark:text-neutral-200">
              Maintenant.
            </span>
          </Text>
        </div>

        <div className="mb-12 flex items-center justify-center gap-4 text-center">
          <Text
            as="span"
            variant="small"
            tone="muted"
            className="rounded-lg border border-border bg-card px-4 py-2 line-through"
          >
            &ldquo;on espère que ça passe&rdquo;
          </Text>
          <span className="text-2xl text-accent">&rarr;</span>
          <span className="rounded-lg border border-accent bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
            &ldquo;on ship aujourd&apos;hui&rdquo;
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <Surface interactive key={step.number} className="group relative">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-xl font-bold text-neutral-950 dark:text-neutral-200">
                  {step.number}
                </div>
                <step.icon className="h-6 w-6 text-accent" />
              </div>
              <Text variant="h4" as="h3" className="mb-2">
                {step.title}
              </Text>
              <Text variant="small" tone="muted" className="mb-4">
                {step.description}
              </Text>
              <ul className="space-y-2">
                {step.items.map((item, i) => (
                  <Text
                    as="li"
                    variant="small"
                    tone="muted"
                    key={i}
                    className="flex items-start gap-2"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </Text>
                ))}
              </ul>
            </Surface>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────
function PricingSection() {
  const features = [
    {
      description: 'Tu prends un mois. On ship. Tu continues si ça fonctionne.',
      positive: true,
      title: 'Pas de contrat long',
    },
    {
      description:
        "Pause ou annule quand tu veux. Le code t'appartient à 100%.",
      positive: true,
      title: "Pas d'engagement",
    },
    {
      description: 'Si ça ne fonctionne pas, tu arrêtes. Simple.',
      positive: false,
      title: 'Pas de remboursement',
    },
  ];

  return (
    <Section id="pricing">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Surface padding="none" radius="2xl" className="overflow-hidden">
            <div className="border-b border-border bg-secondary/30 px-8 py-12 text-center">
              <Text as="div" variant="eyebrow" className="mb-2">
                Tarif unique
              </Text>
              <div className="mb-4 flex items-baseline justify-center gap-2">
                <span className="font-display text-6xl font-bold tracking-[-0.03em] text-neutral-950 dark:text-neutral-200 md:text-7xl">
                  5k&euro;
                </span>
                <span className="text-xl text-neutral-500 dark:text-neutral-400">
                  /mois
                </span>
              </div>
              <Text variant="inherit" tone="muted">
                C&apos;est tout.
              </Text>
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
                    <Text as="div" variant="small" tone="muted">
                      {f.description}
                    </Text>
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
          </Surface>
        </div>
      </Container>
    </Section>
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
    <Section>
      <Container>
        <div className="mb-16 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Combien ça te coûte de continuer comme ça ?
          </Text>
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-accent">-50%</span>
              <Text as="span" variant="small" tone="muted">
                de temps de dev
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-accent">+35%</span>
              <Text as="span" variant="small" tone="muted">
                de rétention utilisateur
              </Text>
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
              <Text
                as="div"
                variant="small"
                tone="muted"
                className="flex items-center gap-2 border-l border-border bg-card p-4"
              >
                <XMarkIcon className="h-4 w-4 shrink-0 text-destructive" />
                {row.without}
              </Text>
              <div className="flex items-center gap-2 border-l border-border bg-accent/5 p-4 text-sm text-neutral-950 dark:text-neutral-200">
                <CheckIcon className="h-4 w-4 shrink-0 text-accent" />
                {row.withUs}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── URGENCY ─────────────────────────────────────────────────────────────────
function UrgencySection() {
  const items = [
    {
      icon: ArrowTrendingDownIcon,
      text: 'des users désinstallent une app instable chaque semaine',
      value: '40%',
    },
    {
      icon: BoltIcon,
      text: 'Tes concurrents shippent pendant que ton app vieillit',
      value: '+',
    },
    {
      icon: CurrencyDollarIcon,
      text: 'Ta dette technique augmente chaque jour',
      value: '$$$',
    },
  ];

  return (
    <Section>
      <Container>
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Chaque semaine sans agir te coûte
          </Text>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <Surface
              key={i}
              className="flex flex-col items-center p-8 text-center"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                <item.icon className="h-7 w-7 text-destructive" />
              </div>
              <div className="mb-2 text-3xl font-bold text-neutral-950 dark:text-neutral-200">
                {item.value}
              </div>
              <Text variant="small" tone="muted">
                {item.text}
              </Text>
            </Surface>
          ))}
        </div>

        <Surface tone="accent" className="p-8 text-center">
          <p className="text-xl font-bold text-neutral-950 dark:text-neutral-200">
            On prend <span className="text-accent">3 clients max</span>. Il
            reste une place.
          </p>
        </Surface>
      </Container>
    </Section>
  );
}

// ─── CTA FINAL ───────────────────────────────────────────────────────────────
function CtaFinalSection() {
  return (
    <Section>
      <Container>
        <Surface
          padding="none"
          radius="2xl"
          className="relative overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />
          </div>

          <div className="relative px-8 py-16 text-center md:py-24">
            <Text variant="h2" as="h2" className="mb-6 text-balance">
              Je ne promets pas du code.{' '}
              <span className="text-accent">Je promets du shipping.</span>
            </Text>
            <Text
              variant="lead"
              tone="muted"
              className="mx-auto mb-10 max-w-xl"
            >
              Prends un premier mois. Et vois par toi-même si ton app peut enfin
              ship.
            </Text>

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

            <Text
              as="div"
              variant="small"
              tone="muted"
              className="mt-8 flex flex-wrap items-center justify-center gap-6"
            >
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
            </Text>
          </div>
        </Surface>
      </Container>
    </Section>
  );
}

// ─── FAQ DATA ────────────────────────────────────────────────────────────────
const faqs = [
  {
    answer:
      "Développement React Native, audits de performance, mise à jour des dépendances, CI/CD, observabilité, tests, support Slack, calls hebdo. On s'occupe de tout ce qui bloque ton shipping.",
    id: 'faq-fr-1',
    question: "C'est quoi exactement qui est inclus dans les 5 000 €/mois ?",
  },
  {
    answer:
      "Tu arrêtes. Pas de pénalité, pas de préavis. Le code t'appartient à 100%. Tu peux reprendre le développement plus tard, ou le donner à une autre équipe.",
    id: 'faq-fr-2',
    question: 'Et si je veux arrêter après un mois ?',
  },
  {
    answer:
      "Un senior React Native coûte entre 60 000 € et 90 000 € par an, sans compter les charges, les avantages et les mois de recrutement. Et un dev seul ne résout pas un problème d'architecture ou de vélocité. Notre abonnement te donne accès à une équipe senior, immédiatement, sans engagement.",
    id: 'faq-fr-3',
    question: 'Pourquoi pas recruter un dev React Native senior ?',
  },
  {
    answer:
      "C'est exactement ce qu'on fait. On a déjà transformé des apps avec des centaines de dépendances obsolètes, zéro tests, et des releases manuelles en apps qui shippent tous les jours. L'étape 1 (Fondations) est faite pour ça.",
    id: 'faq-fr-4',
    question:
      'Mon app est vraiment en mauvais état. Vous pouvez quand même intervenir ?',
  },
  {
    answer:
      'Premier livrable en quelques jours, pas en quelques mois. Dès la première semaine, on identifie et corrige les blockers les plus critiques. En un mois, ton pipeline de release est en place.',
    id: 'faq-fr-5',
    question: 'Combien de temps avant de voir des résultats concrets ?',
  },
  {
    answer:
      "Parce que notre modèle est simple : si ça ne fonctionne pas, tu arrêtes. Pas de contrat qui te bloque. La qualité de notre travail parle d'elle-même.",
    id: 'faq-fr-6',
    question: 'Pourquoi pas de remboursement ?',
  },
  {
    answer:
      "Directement avec David et Matthys, les deux développeurs seniors de l'équipe. Pas d'account managers, pas de junior qui découvre React Native sur ton projet.",
    id: 'faq-fr-7',
    question: 'Avec qui je travaille concrètement ?',
  },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function BonjourPage({ clients }: BonjourPageProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ answer, question }) => ({
      '@type': 'Question',
      acceptedAnswer: { '@type': 'Answer', text: answer },
      name: question,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        item: 'https://weshipit.today',
        name: 'Accueil',
        position: 1,
      },
      {
        '@type': 'ListItem',
        item: 'https://weshipit.today/bonjour',
        name: 'Agence React Native',
        position: 2,
      },
    ],
  };

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    areaServed: { '@type': 'Country', name: 'France' },
    description:
      'Agence web sp\u00e9cialis\u00e9e dans le d\u00e9veloppement d\u2019applications mobiles React Native pour iOS et Android. Experts React Native depuis 2016.',
    foundingDate: '2016',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            description:
              'Cr\u00e9ation d\u2019applications iOS et Android avec React Native',
            name: 'D\u00e9veloppement application React Native',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            description:
              'Audit de performance et optimisation d\u2019applications React Native existantes',
            name: 'Audit et performance React Native',
          },
        },
      ],
      name: 'Services de d\u00e9veloppement React Native',
    },
    knowsAbout: [
      'React Native',
      'iOS',
      'Android',
      'applications mobiles',
      'd\u00e9veloppement cross-platform',
    ],
    name: 'weshipit.today \u2014 Agence Web React Native',
    serviceType: 'D\u00e9veloppement d\u2019applications mobiles React Native',
    url: 'https://weshipit.today/bonjour',
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
        seoTitle="Agence React Native : shippe plus vite"
        seoDescription="5k/mois, sans engagement. On prend ton app React Native et on la transforme : fondations, observabilité, CI/CD, performance. Tu ship tous les jours."
        ogImageTitle="Ton app React Native ralentit ? On la fixe."
        ogImageSubline="Experts React Native · 5k/mois · ship tous les jours"
        ogImageAlt="weshipit.today — Experts React Native. 5k/mois. Ship tous les jours."
        locale="fr_FR"
        withHeader
        withFooter
        callToActionButton={{
          href: linksApi.cal.ONBOARDING,
          isExternalLink: true,
          name: CTA_LABEL,
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
        <Section id="faq">
          <Container size="sm">
            <div className="mb-12 text-center">
              <Text variant="h3" as="h2" className="mb-4 text-balance">
                Questions fréquentes
              </Text>
            </div>
            <Faq faqs={faqs} title="" headingId="faq-fr-heading" />
          </Container>
        </Section>

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
