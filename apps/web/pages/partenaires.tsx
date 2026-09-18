import { AuthorDisclosure, Button, CountUp, Faq, Text } from '@weshipit/ui';

import {
  ArrowRightIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  CheckIcon,
  CodeBracketIcon,
  CubeIcon,
  EnvelopeIcon,
  MegaphoneIcon,
  MicrophoneIcon,
  PlayCircleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '../components/layout';
import { PodcastPhonePreview } from '../components/podcast-phone-preview';
import { linksApi } from './api/links';

const CTA_LABEL = 'Réserver un appel de 20 min';
const CTA_URL = linksApi.cal.PARTNER;
const LINKEDIN_URL = 'https://www.linkedin.com/in/david-leuliette/';
const PAGE_URL = 'https://weshipit.today/partenaires';

const faqs = [
  {
    id: 'faq-partenaires-1',
    question: 'Combien ça coûte ?',
    answer:
      'Le tarif dépend du format et de la durée. Un épisode sponsorisé et un partenariat de 6 mois avec étude co-brandée ne se chiffrent pas de la même manière. On construit l’activation ensemble pendant l’appel, puis tu reçois une proposition écrite sous 48 h. Aucun engagement avant.',
  },
  {
    id: 'faq-partenaires-2',
    question: 'Votre audience est petite. Pourquoi payer pour la toucher ?',
    answer:
      'Parce qu’elle décide. 61 % des abonnés sont Senior ou plus, et un quart occupent des fonctions de direction ou de management. Un CTO qui intègre ton SDK dans une app en production devient client pour plusieurs années. C’est une audience qu’on ne cible pas avec de la pub classique, et personne d’autre ne lui parle de React Native en français.',
  },
  {
    id: 'faq-partenaires-3',
    question: 'Est-ce que je peux choisir ce qui est dit ?',
    answer:
      'Tu valides les faits (nom du produit, fonctionnalités, offre, lien). Le ton et l’angle restent les miens : je présente ton produit comme je l’utiliserais dans une vraie app. C’est ce qui fait qu’un message sponsor est écouté au lieu d’être zappé.',
  },
  {
    id: 'faq-partenaires-4',
    question: 'Un épisode avec un ingénieur de notre équipe, c’est un pitch ?',
    answer:
      'Non. C’est un épisode d’interview classique, sur un sujet de fond que ton équipe maîtrise : une migration, un incident, une architecture. Le produit apparaît parce qu’il fait partie de l’histoire, pas parce qu’il est le sujet. Les auditeurs le savent et c’est annoncé comme sponsorisé.',
  },
  {
    id: 'faq-partenaires-5',
    question: 'Comment je mesure les résultats ?',
    answer:
      'Chaque activation a un lien traçable (UTM ou code promo) qui reste en ligne dans les descriptions Spotify, YouTube et sur la page épisode. Tu reçois un récapitulatif avec les écoutes, les vues, les impressions LinkedIn et les clics. Les inscriptions et les essais, tu les vois de ton côté.',
  },
  {
    id: 'faq-partenaires-6',
    question: 'On n’est pas un outil pour développeurs. Ça marche quand même ?',
    answer:
      'Si ton client est un CTO, un lead dev ou une équipe qui recrute des développeurs React Native, oui. Agences mobile, plateformes de freelancing, cabinets de recrutement tech et conférences ont la même cible que ce podcast. Si ton client n’est ni un dev, ni quelqu’un qui en emploie, on te le dira pendant l’appel.',
  },
  {
    id: 'faq-partenaires-7',
    question: 'Quel est le délai entre l’appel et la première diffusion ?',
    answer:
      'Compte 3 à 4 semaines pour un message sponsor sur un épisode déjà planifié. Un live code ou un épisode co-produit demande 6 à 8 semaines, le temps de préparer le sujet et de caler l’invité.',
  },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-24 lg:py-28">
        {/* Same shape as the homepage hero: copy on the left, phone on the right. */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              <MicrophoneIcon strokeWidth={2.25} className="h-4 w-4" />
              Kit média · Le Cross Platform Show
            </div>

            <Text variant="h1" as="h1" className="mb-6 text-balance">
              Parle aux CTO qui choisissent{' '}
              <span className="text-accent">la stack mobile</span>
            </Text>

            <p className="mb-10 max-w-xl text-pretty text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
              Le Cross Platform Show est le seul podcast francophone sur React
              Native en production. Chaque épisode, une équipe qui fait tourner
              une app à des millions d&apos;utilisateurs raconte ses coulisses.
              Les personnes qui écoutent sont celles qui décident quel SDK, quel
              outil et quel prestataire entrent dans leur app.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                href={CTA_URL}
                as="a"
                size="xl"
                variant="primary"
                isExternalLink
                withExternalLinkIcon={false}
                className="min-h-11 justify-center"
              >
                {CTA_LABEL}
                <ArrowRightIcon strokeWidth={2.25} className="ml-2 h-4 w-4" />
              </Button>
              <Button
                as="a"
                href="#activations"
                size="xl"
                variant="outline"
                className="min-h-11 justify-center"
              >
                Voir les formats
              </Button>
            </div>

            <div className="mt-8 flex flex-col gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-2">
                <CheckIcon strokeWidth={2.25} className="h-4 w-4 text-accent" />
                Le co-créateur de React Native au micro
              </span>
              <span className="flex items-center gap-2">
                <CheckIcon strokeWidth={2.25} className="h-4 w-4 text-accent" />
                Animé par un Microsoft MVP
              </span>
              <span className="flex items-center gap-2">
                <CheckIcon strokeWidth={2.25} className="h-4 w-4 text-accent" />
                Media partner de React Native Connection
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <PodcastPhonePreview className="max-w-[570px] text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofSection() {
  // Numbers, not strings: CountUp animates the value and Intl puts the French
  // thousands separator back (a narrow no-break space, so a figure never wraps).
  const stats = [
    { value: 20000, label: 'abonnés LinkedIn', detail: '61 % Senior ou plus' },
    { value: 40, label: 'épisodes publiés', detail: 'format interview' },
    {
      value: 3500,
      label: 'écoutes audio cumulées',
      detail: 'Spotify, Apple, Deezer',
    },
    {
      value: 1100,
      label: 'abonnés YouTube',
      detail: 'plusieurs vidéos à 1k+ vues',
    },
  ];

  const guests = [
    { name: 'Christopher Chedeau', role: 'co-créateur de React Native' },
    { name: 'Doctolib', role: '50 millions d’utilisateurs' },
    { name: 'RevenueCat', role: 'paiements in-app' },
    { name: 'Alan', role: 'assurance santé' },
    { name: 'Swan', role: 'banking as a service' },
    { name: 'Cdiscount', role: 'e-commerce' },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h2" as="h2" className="mb-4 text-balance">
            Ce qu&apos;il faut savoir avant de continuer
          </Text>
          <p className="mx-auto max-w-2xl text-pretty text-neutral-500 dark:text-neutral-400">
            Pas des millions d&apos;écoutes. Une niche sans alternative
            francophone, et les personnes qu&apos;on n&apos;entend
            d&apos;habitude qu&apos;en anglais.
          </p>
        </div>

        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-5 text-center"
            >
              <div className="text-3xl font-bold tabular-nums text-neutral-950 dark:text-neutral-100">
                <CountUp end={stat.value} locale="fr-FR" />
              </div>
              <div className="mt-1 text-sm font-medium text-neutral-950 dark:text-neutral-200">
                {stat.label}
              </div>
              <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 text-sm font-medium text-neutral-950 dark:text-neutral-200">
            Ils sont passés au micro
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {guests.map((guest) => (
              <div key={guest.name} className="flex items-start gap-3">
                <MicrophoneIcon
                  strokeWidth={1.8}
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                />
                <div>
                  <div className="text-sm font-semibold text-neutral-950 dark:text-neutral-100">
                    {guest.name}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {guest.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 border-t border-border pt-4 text-sm text-neutral-500 dark:text-neutral-400">
            Tous les épisodes sont sur la{' '}
            <Link
              href="/podcast"
              className="font-medium text-accent underline-offset-2 hover:underline"
            >
              page du podcast
            </Link>
            , avec transcription et page permanente pour chacun.
          </p>
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  const profile = [
    {
      title: 'Qui écoute',
      items: [
        'Développeurs React Native confirmés',
        'Lead devs et CTO de scale-ups',
        'Indie hackers qui publient leurs apps',
      ],
    },
    {
      title: 'Où ils travaillent',
      items: [
        'Startups et scale-ups avec une app en production (santé, fintech, e-commerce, assurance)',
        'Agences et ESN mobile',
        'France en priorité, puis Belgique, Suisse, Canada',
      ],
    },
    {
      title: 'Ce qu’ils cherchent',
      items: [
        'Garder la vélocité une fois l’app en production',
        'Monter de version React Native sans casser la release',
        'Choisir la bonne stack, le bon SDK, le bon prestataire',
      ],
    },
  ];

  const tools = [
    'Expo / EAS',
    'CI/CD mobile',
    'Crash reporting',
    'Paiements in-app',
    'Tests E2E',
    'Backend et auth',
    'Analytics produit',
    'Outils IA pour devs',
    'Formations',
    'Conférences',
    'Recrutement React Native',
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h2" as="h2" className="mb-4 text-balance">
            Une audience qui arbitre des budgets
          </Text>
          <p className="mx-auto max-w-2xl text-pretty text-neutral-500 dark:text-neutral-400">
            Sur LinkedIn, 35 % des abonnés sont Senior et 26 % occupent une
            fonction de direction, de management ou de décision. Ce ne sont pas
            des débutants en quête de tutos.
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {profile.map((block) => (
            <div
              key={block.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <Text variant="h4" as="h3" className="mb-4">
                {block.title}
              </Text>
              <ul className="space-y-3">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-neutral-500 dark:text-neutral-400"
                  >
                    <CheckIcon
                      strokeWidth={1.8}
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
          <div className="mb-3 text-sm font-medium text-neutral-950 dark:text-neutral-200">
            Ce qu&apos;ils achètent ou évaluent en ce moment
          </div>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-neutral-950 dark:text-neutral-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChannelsSection() {
  const channels = [
    {
      icon: MegaphoneIcon,
      title: 'LinkedIn',
      metric: '20 000 abonnés',
      description:
        'Là où l’audience est la plus large. Un post sur un retour d’expérience React Native dépasse régulièrement les 30 000 impressions.',
    },
    {
      icon: MicrophoneIcon,
      title: 'Podcast audio',
      metric: '40 épisodes',
      description:
        'Spotify, Apple Podcasts, Deezer. Chaque épisode a sa page permanente sur weshipit.today, indexée par Google et les IA.',
    },
    {
      icon: PlayCircleIcon,
      title: 'YouTube',
      metric: '1 100 abonnés',
      description:
        'Version vidéo des épisodes, lives de code et shorts. Le format qui montre un produit au lieu d’en parler.',
    },
    {
      icon: EnvelopeIcon,
      title: 'Email et communauté',
      metric: '600 contacts',
      description:
        '40 % d’ouverture. Plus le Slack React Native Connection et la présence en conférence : App.js, React Native Connection, next.app Berlin.',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h2" as="h2" className="mb-4 text-balance">
            Quatre canaux, une même audience
          </Text>
          <p className="mx-auto max-w-2xl text-pretty text-neutral-500 dark:text-neutral-400">
            Un partenariat ne se limite pas à un message dans un épisode. La
            même personne croise ton produit dans son feed, dans ses écouteurs
            et dans une démo vidéo.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {channels.map((channel) => (
            <div
              key={channel.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <channel.icon
                    strokeWidth={1.8}
                    className="h-5 w-5 shrink-0 text-accent"
                  />
                  <Text variant="h4" as="h3">
                    {channel.title}
                  </Text>
                </div>
                <span className="shrink-0 text-sm font-semibold text-accent">
                  {channel.metric}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {channel.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyItWorksSection() {
  const reasons = [
    {
      icon: CodeBracketIcon,
      title: 'Ton produit, intégré dans une vraie app',
      description:
        'Je suis développeur React Native avant d’être animateur. J’audite et je maintiens des apps en production toute la semaine. Quand je parle d’un SDK, je l’ai installé.',
    },
    {
      icon: UserGroupIcon,
      title: 'Une niche qu’on ne touche pas en pub',
      description:
        'Les CTO mobile francophones ne cliquent pas sur les bannières. Ils écoutent leurs pairs raconter comment ils ont résolu un problème qu’ils ont aussi.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'La crédibilité de l’écosystème',
      description:
        'Microsoft MVP, speaker à next.app Berlin, invité de React Native Radio, media partner de React Native Connection. Relations directes avec les équipes Expo, Infinite Red et Callstack.',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h2" as="h2" className="mb-4 text-balance">
            Pourquoi ça marche mieux qu&apos;une campagne
          </Text>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <reason.icon
                  strokeWidth={1.8}
                  className="h-5 w-5 text-accent"
                />
              </div>
              <Text variant="h4" as="h3" className="mb-2">
                {reason.title}
              </Text>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ActivationsSection() {
  const activations = [
    {
      icon: MicrophoneIcon,
      title: 'Message sponsor dans un épisode',
      description:
        'Lu par l’hôte, en intro et en milieu d’épisode, à partir d’un usage réel du produit. Pas de script publicitaire. Lien permanent dans les descriptions Spotify, YouTube et sur la page épisode.',
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Épisode avec un expert de ta marque',
      description:
        'Ton ingénieur ou ton DevRel vient parler d’un sujet de fond : une migration, un incident, une architecture. Tu repars avec le transcript, des extraits vidéo et des shorts réutilisables.',
    },
    {
      icon: PlayCircleIcon,
      title: 'Live code YouTube',
      description:
        'J’intègre ton SDK dans une vraie app React Native, en direct. Les questions des développeurs arrivent en temps réel. Le replay reste en ligne.',
    },
    {
      icon: MegaphoneIcon,
      title: 'Posts LinkedIn',
      description:
        'Retour d’expérience « j’ai intégré X dans une app en production » ou carrousel technique co-écrit. Le format qui touche l’audience la plus large.',
    },
    {
      icon: CubeIcon,
      title: 'Étude co-brandée',
      description:
        '« L’état de React Native en France » : sondage de l’audience, résultats publiés avec ton logo. Un actif que tes concurrents n’ont pas.',
    },
    {
      icon: CalendarDaysIcon,
      title: 'Contenus en conférence',
      description:
        'Interviews tournées à React Native Connection ou App.js avec ta marque. Meetup ou afterwork sponsorisé à Lille, Paris ou Bordeaux.',
    },
  ];

  return (
    <section id="activations" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <Text variant="h2" as="h2" className="mb-4 text-balance">
            Les formats possibles
          </Text>
          <p className="mx-auto max-w-2xl text-pretty text-neutral-500 dark:text-neutral-400">
            Chaque collaboration combine plusieurs de ces formats selon ton
            objectif : essais de ton outil, notoriété dans l&apos;écosystème, ou
            recrutement de développeurs React Native.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activations.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <item.icon strokeWidth={1.8} className="h-5 w-5 text-accent" />
              </div>
              <Text variant="h4" as="h3" className="mb-2">
                {item.title}
              </Text>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OffersSection() {
  const offers = [
    {
      name: 'One shot',
      duration: '1 épisode',
      goal: 'Tester l’audience avec peu de risque.',
      items: [
        'Message sponsor dans 1 épisode',
        '1 post LinkedIn de lancement',
        'Lien traçable permanent',
      ],
      result: 'Clics, inscriptions et essais mesurés.',
    },
    {
      name: 'Trimestre',
      duration: '3 mois · exclusif',
      goal: 'Installer la marque par la répétition.',
      items: [
        'Sponsor exclusif de tous les épisodes du trimestre',
        '1 live code YouTube avec ton produit',
        '3 posts LinkedIn dont 1 retour d’expérience',
        '1 email dédié à la liste',
      ],
      result:
        'Aucun concurrent sur le podcast pendant 3 mois, et une démo en conditions réelles.',
      highlighted: true,
    },
    {
      name: 'Semestre',
      duration: '6 mois · exclusif',
      goal: 'Devenir la marque associée à React Native en France.',
      items: [
        'Tout le trimestre, sur 6 mois',
        '1 épisode co-produit avec ton équipe',
        'Étude « L’état de React Native en France » co-brandée',
        'Contenus tournés en conférence',
        'Logo partenaire sur la page podcast',
      ],
      result: 'Un actif réutilisable et des données d’audience exclusives.',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <Text variant="h2" as="h2" className="mb-4 text-balance">
            Trois niveaux d&apos;engagement
          </Text>
          <p className="mx-auto max-w-2xl text-pretty text-neutral-500 dark:text-neutral-400">
            Tester, s&apos;installer, s&apos;associer. Le tarif se définit avec
            toi selon le format retenu, pendant l&apos;appel.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.name}
              className={
                offer.highlighted
                  ? 'flex flex-col rounded-xl border border-accent/40 bg-accent/5 p-6'
                  : 'flex flex-col rounded-xl border border-border bg-card p-6'
              }
            >
              <div className="mb-1 text-sm font-medium text-accent">
                {offer.duration}
              </div>
              <Text variant="h3" as="h3" className="mb-2">
                {offer.name}
              </Text>
              <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
                {offer.goal}
              </p>
              <ul className="mb-6 space-y-3">
                {offer.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-neutral-950 dark:text-neutral-200"
                  >
                    <CheckIcon
                      strokeWidth={1.8}
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-auto border-t border-border pt-4 text-sm text-neutral-500 dark:text-neutral-400">
                {offer.result}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            href={CTA_URL}
            as="a"
            size="xl"
            variant="primary"
            isExternalLink
            withExternalLinkIcon={false}
            className="min-h-11"
          >
            {CTA_LABEL}
            <ArrowRightIcon strokeWidth={2.25} className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function AudienceFitSection() {
  const yes = [
    'Outils pour développeurs mobile : CI/CD, monitoring, paiements in-app, backend, OTA updates, tests.',
    'Agences et studios mobile qui vendent de la prestation à des CTO.',
    'Plateformes de freelancing et cabinets de recrutement tech qui placent des développeurs React Native.',
    'Conférences et formations tech francophones qui vendent des billets à cette audience.',
  ];

  const no = [
    'Ton client n’est ni un développeur, ni quelqu’un qui en emploie.',
    'Tu veux un script lu mot pour mot. Le ton reste le mien, les faits sont les tiens.',
    'Tu cherches du volume plutôt que de la qualification. Il existe de meilleurs canaux pour ça.',
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h2" as="h2" className="mb-4 text-balance">
            Pour qui c&apos;est fait
          </Text>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
            <Text
              variant="h4"
              as="h3"
              className="mb-4 flex items-center gap-2 text-accent"
            >
              ✅ On devrait se parler
            </Text>
            <ul className="space-y-3">
              {yes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-neutral-950 dark:text-neutral-200"
                >
                  <CheckIcon
                    strokeWidth={1.8}
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <Text
              variant="h4"
              as="h3"
              className="mb-4 flex items-center gap-2 text-neutral-500 dark:text-neutral-400"
            >
              ❌ Ce n&apos;est pas le bon média
            </Text>
            <ul className="space-y-3">
              {no.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-neutral-500 dark:text-neutral-400"
                >
                  <XMarkIcon
                    strokeWidth={1.8}
                    className="mt-0.5 h-5 w-5 shrink-0 text-destructive"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-border pt-4 text-sm text-neutral-500 dark:text-neutral-400">
              Indépendance éditoriale : je ne présente que des produits que
              j&apos;utiliserais dans une app cliente. Chaque contenu sponsorisé
              est annoncé comme tel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      step: '1',
      title: 'Un appel de 20 minutes',
      description:
        'Tu me dis qui tu veux toucher et ce que tu attends : essais, notoriété, candidatures. Je te dis franchement si l’audience correspond.',
    },
    {
      step: '2',
      title: 'Une proposition sous 48 h',
      description:
        'Formats, calendrier, livrables et tarif, par écrit. Tu ajustes, on signe. Pas de plaquette de 30 pages.',
    },
    {
      step: '3',
      title: 'Diffusion et récapitulatif',
      description:
        'Tu valides les faits avant chaque diffusion. À la fin, tu reçois les chiffres : écoutes, vues, impressions, clics sur ton lien.',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h2" as="h2" className="mb-4 text-balance">
            Comment ça se passe
          </Text>
        </div>

        <div className="space-y-4">
          {steps.map((item) => (
            <div
              key={item.step}
              className="grid gap-4 rounded-xl border border-border bg-card p-6 md:grid-cols-[40px_1fr]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-lg font-bold tabular-nums text-accent">
                {item.step}
              </div>
              <div>
                <Text variant="h4" as="h3" className="mb-2">
                  {item.title}
                </Text>
                <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AuthorSection() {
  return (
    <AuthorDisclosure
      title="Qui est derrière le micro"
      tagline="Développeur React Native, Microsoft MVP, fondateur de weshipit.today"
    >
      <p>
        Je suis David Leuliette. Depuis 2016, j&apos;audite, je répare et je
        ship des apps React Native pour des équipes qui ne peuvent pas se
        permettre un crash de plus. Le podcast est né de ce travail : les
        questions que je pose sont celles que je me pose en production.
      </p>
      <p>
        À côté du podcast, weshipit.today publie un{' '}
        <Link
          href="/react-native-tools"
          className="font-semibold text-accent underline-offset-2 hover:underline"
        >
          directory d&apos;outils React Native
        </Link>
        , un{' '}
        <Link
          href="/react-native-glossary"
          className="font-semibold text-accent underline-offset-2 hover:underline"
        >
          glossaire de 100+ termes
        </Link>{' '}
        et la liste des{' '}
        <Link
          href="/french-react-native-apps"
          className="font-semibold text-accent underline-offset-2 hover:underline"
        >
          apps React Native françaises
        </Link>
        . C&apos;est le même public, et il revient.
      </p>
      <p>
        Je suis aussi sur{' '}
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-accent underline-offset-2 hover:underline"
        >
          LinkedIn
        </a>{' '}
        si tu préfères un message à un appel.
      </p>
    </AuthorDisclosure>
  );
}

function FinalCtaSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />
          </div>

          <div className="relative px-8 py-16 text-center md:py-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              <BriefcaseIcon strokeWidth={2.25} className="h-4 w-4" />
              Un seul sponsor par trimestre
            </div>
            <Text variant="h2" as="h2" className="mb-6 text-balance">
              Construisons l&apos;activation{' '}
              <span className="text-accent">adaptée à ton objectif</span>
            </Text>
            <p className="mx-auto mb-10 max-w-xl text-pretty text-lg text-neutral-500 dark:text-neutral-400">
              Vingt minutes pour savoir si ton produit a sa place devant cette
              audience. Si ce n&apos;est pas le cas, je te le dirai.
            </p>

            <Button
              href={CTA_URL}
              as="a"
              size="xxl"
              variant="primary"
              isExternalLink
              withExternalLinkIcon={false}
              className="mx-auto justify-center"
            >
              {CTA_LABEL}
              <ArrowRightIcon strokeWidth={2.25} className="ml-2 h-4 w-4" />
            </Button>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Proposition écrite sous 48 h
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Lien traçable sur chaque activation
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Aucun engagement avant la proposition
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PartnersPage() {
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
        name: 'Podcast',
        item: 'https://weshipit.today/podcast',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Partenaires',
        item: PAGE_URL,
      },
    ],
  };

  return (
    <>
      <Head>
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="fr" href={PAGE_URL} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />
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
      </Head>
      <Layout
        seoTitle="Sponsoriser Le Cross Platform Show : parle aux CTO React Native francophones"
        seoDescription="Kit média du podcast Le Cross Platform Show. Le seul podcast francophone sur React Native en production : 20 000 abonnés LinkedIn, 40 épisodes, le co-créateur de React Native et Doctolib au micro. Message sponsor, épisode co-produit, live code, étude co-brandée. Réserve un appel de 20 min."
        ogImageTitle="Partenaires · Le Cross Platform Show"
        ogImageAlt="Kit média sponsoring du podcast Le Cross Platform Show, le podcast francophone React Native"
        locale="fr_FR"
        withHeader
        withFooter
        callToActionButton={{
          name: CTA_LABEL,
          href: CTA_URL,
          isExternalLink: true,
        }}
      >
        <HeroSection />
        <ProofSection />
        <AudienceSection />
        <ChannelsSection />
        <WhyItWorksSection />
        <ActivationsSection />
        <OffersSection />
        <AudienceFitSection />
        <ProcessSection />
        <section className="border-t border-border">
          <div className="mx-auto max-w-4xl px-6">
            <Faq
              faqs={faqs}
              title="Questions que posent les sponsors"
              headingId="faq"
            />
          </div>
        </section>
        <AuthorSection />
        <FinalCtaSection />
      </Layout>
    </>
  );
}
