import { AuthorDisclosure, Button, Faq, Text } from '@weshipit/ui';

import {
  ArrowRightIcon,
  BoltIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  CheckIcon,
  ClipboardDocumentCheckIcon,
  CommandLineIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '../components/layout';
import { linksApi } from './api/links';

const CTA_LABEL = 'Réserver ma place — 490 € HT';
const CTA_LABEL_SHORT = 'Réserver ma place';

const CTA_URL = linksApi.notion.AGENTIC_SPRINT_FORM;

const PRICE_FOUNDING = 490;
const PRICE_BATCH_2 = 690;
const SPOTS = 25;

const faqs = [
  {
    id: 'faq-as-1',
    question: "J'ai besoin de quel niveau en IA pour suivre le sprint ?",
    answer:
      "Aucun. Le prérequis, c'est React Native et Git : tu sais ouvrir une PR et lire un diff. Si tu n'as jamais lancé Claude Code ou un outil équivalent, le live 1 part de zéro et tu repars avec ton environnement configuré sur ton propre repo.",
  },
  {
    id: 'faq-as-2',
    question: 'Ça marche avec Expo ? Avec du bare React Native ?',
    answer:
      "Les deux. Les exemples des lives tournent sur Expo (builds EAS), et on couvre les différences du bare workflow quand elles comptent — notamment sur les builds natifs et l'upgrade de SDK.",
  },
  {
    id: 'faq-as-3',
    question: 'Combien coûtent les outils IA en plus du sprint ?',
    answer:
      "Compte environ 20 $/mois d'abonnement ou de crédits API pendant le sprint. C'est le seul coût en plus du prix d'inscription, et tu le sais avant de payer.",
  },
  {
    id: 'faq-as-4',
    question:
      "Je travaille sur l'app d'un client, je ne peux pas partager le code.",
    answer:
      'Prévu. Tous les exercices se font en local chez toi, et les reviews de repos en live se font uniquement sur les repos des volontaires. Tu ne partages que ce que tu choisis de montrer — une PR floutée suffit pour la démo finale.',
  },
  {
    id: 'faq-as-5',
    question: "Je n'ai pas d'app en production, juste un side project.",
    answer:
      "Ça marche si le projet est réel : du code, des écrans, un backlog. Tu profiteras moins de la semaine « triage de crashs Sentry », mais les agents de test, d'upgrade et de release s'appliquent à l'identique.",
  },
  {
    id: 'faq-as-6',
    question: 'Les lives sont à 12h30, je ne peux pas toujours être là.',
    answer:
      'Les 4 lives sont enregistrés et les replays sont disponibles le jour même, à vie. Le support async sur Discord couvre tes questions entre deux lives — tu peux suivre le sprint entier en décalé.',
  },
  {
    id: 'faq-as-7',
    question: "Et si l'IA me remplace ?",
    answer:
      "C'est la mauvaise question. Les développeurs React Native qui savent orchestrer des agents reviewent le travail de trois ; ceux qui ne savent pas seront reviewés. Ce sprint te met du bon côté de la review.",
  },
  {
    id: 'faq-as-8',
    question: "C'est remboursable si je change d'avis ?",
    answer:
      "Intégralement jusqu'au 11 septembre, veille du sprint. Après le début, c'est la garantie semaine 1 qui s'applique : si ton agent n'a pas ouvert sa première PR sur ton app à la fin de la semaine 1, en ayant fait les exercices, on te rembourse à 100 %.",
  },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
          <CalendarDaysIcon className="h-4 w-4" />
          Batch en ligne · 14 septembre – 9 octobre 2026 · {SPOTS} places
        </div>

        <Text variant="h1" as="h1" className="mb-6 text-balance">
          Agentic Sprint — <span className="text-accent">React Native</span>
        </Text>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-xl">
          Un batch d&apos;un mois pour développeurs React Native&nbsp;: tu
          montes des agents IA qui triagent tes crashs Sentry, écrivent tes
          tests Maestro et préparent tes releases EAS — sur ton app, pas sur un
          projet d&apos;exemple. Un live par semaine, des exercices sur ton
          repo, et ton premier agent qui ouvre une vraie PR dès la semaine 1.
          Garanti, ou remboursé.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href={CTA_URL}
            as="a"
            size="xl"
            variant="primary"
            isExternalLink
            withExternalLinkIcon={false}
          >
            {CTA_LABEL}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
          <Button as="a" href="#programme" size="xl" variant="outline">
            Voir le programme
          </Button>
        </div>

        <div className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
          Tarif founding batch 1 · paiement en une fois · passe à{' '}
          {PRICE_BATCH_2} € dès le batch 2
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />8 ans de React Native
            en production
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            49 outils référencés, 100+ termes de glossaire
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            Notre propre site tourne sur ce workflow
          </span>
        </div>
      </div>
    </section>
  );
}

function ProblemeSection() {
  const pains = [
    {
      icon: WrenchScrewdriverIcon,
      title: 'Tes crashs Sentry s’empilent',
      description:
        'Et c’est toujours toi qui les triages, un par un, le lundi matin.',
    },
    {
      icon: ClipboardDocumentCheckIcon,
      title: 'Tes tests E2E n’existent pas',
      description:
        'Ou plus personne ne les maintient depuis le dernier upgrade d’Expo.',
    },
    {
      icon: RocketLaunchIcon,
      title: 'Chaque release est une demi-journée',
      description:
        'Changelog, builds EAS, screenshots stores — à la main, à chaque fois.',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <Text variant="h2" as="h2" className="mb-6 text-balance text-center">
          Tu utilises l&apos;IA. Mais elle ne travaille pas pour toi.
        </Text>
        <p className="mx-auto mb-12 max-w-2xl text-center text-pretty leading-relaxed text-neutral-500 dark:text-neutral-400">
          Copier-coller du code dans ChatGPT, accepter trois suggestions de
          Copilot — ce n&apos;est pas ça, l&apos;IA en 2026. Pendant que tu fais
          ça&nbsp;:
        </p>

        <div className="mb-12 grid gap-4 md:grid-cols-3">
          {pains.map((pain) => (
            <div
              key={pain.title}
              className="rounded-xl border border-border bg-card p-5"
            >
              <pain.icon className="mb-3 h-6 w-6 text-accent" />
              <div className="mb-1 text-sm font-semibold text-neutral-950 dark:text-neutral-100">
                {pain.title}
              </div>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {pain.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto max-w-2xl text-pretty leading-relaxed text-neutral-500 dark:text-neutral-400">
          Le vrai saut, ce n&apos;est pas un meilleur autocomplete. C&apos;est
          un{' '}
          <strong className="text-neutral-950 dark:text-neutral-100">
            agent
          </strong>
          &nbsp;: un process qui lit ton code, ouvre une branche, écrit le fix
          ou le test, et te soumet une PR que tu n&apos;as plus qu&apos;à
          reviewer. Ça existe, ça tourne, on l&apos;utilise tous les jours —
          mais personne ne montre comment le faire marcher sur une app React
          Native en production, avec ses builds natifs, son Metro, ses stores et
          ses SDK qui bougent tous les 6 mois.
        </p>
        <p className="mx-auto mt-4 max-w-2xl font-medium text-neutral-950 dark:text-neutral-100">
          C&apos;est exactement ce que couvre ce sprint. Rien d&apos;autre.
        </p>
      </div>
    </section>
  );
}

function ProgrammeSection() {
  const weeks = [
    {
      week: 'Semaine 1',
      date: 'Live mardi 15 septembre · 12h30–14h',
      title: 'Ton repo, lisible par un agent',
      description:
        'Les 4 actifs IA appliqués à React Native : le CLAUDE.md de ton projet, tes skills, ton design system, tes tâches programmées. Le scaffolding se fait sur ton repo, en live. Objectif de la semaine — et condition de la garantie : ton agent ouvre sa première PR avant le vendredi 18.',
      icon: CommandLineIcon,
    },
    {
      week: 'Semaine 2',
      date: 'Live mardi 22 septembre · 12h30–14h',
      title: "L'agent qui répare",
      description:
        'Pipeline crash → fix : Sentry en entrée, PR de correctif en sortie. Tu configures le triage automatique sur tes vrais crashs et tu apprends à cadrer ce que l’agent a le droit de toucher.',
      icon: WrenchScrewdriverIcon,
    },
    {
      week: 'Semaine 3',
      date: 'Live mardi 29 septembre · 12h30–14h',
      title: "L'agent qui teste",
      description:
        'L’agent Maestro : chaque bug corrigé génère son test E2E de non-régression. Ta suite de tests arrête de pourrir — elle grandit toute seule, à chaque fix.',
      icon: ClipboardDocumentCheckIcon,
    },
    {
      week: 'Semaine 4',
      date: 'Live mardi 6 octobre · 12h30–14h',
      title: "L'agent qui release",
      description:
        'Upgrade Expo SDK assisté par agent, builds EAS, changelog et notes de version générés. Démo finale le vendredi 9 octobre : chaque participant montre une PR d’agent mergée sur son app.',
      icon: RocketLaunchIcon,
    },
  ];

  return (
    <section id="programme" className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16 text-center">
          <Text variant="h2" as="h2" className="mb-4 text-balance">
            1 mois, 4 lives, une PR d&apos;agent mergée sur ton app
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Un live par semaine, le mardi midi. Entre les lives&nbsp;: exercices
            guidés sur ton repo et review de repos en groupe — c&apos;est pour
            ça qu&apos;il y a {SPOTS} places, pas 250. Tous les lives sont
            enregistrés, replays à vie.
          </p>
        </div>

        <div className="space-y-4">
          {weeks.map((item) => (
            <div
              key={item.week}
              className="grid gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50 md:grid-cols-[180px_1fr]"
            >
              <div>
                <div className="mb-1 font-semibold text-accent">
                  {item.week}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {item.date}
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <item.icon className="h-5 w-5 shrink-0 text-accent" />
                  <Text variant="h4" as="h3">
                    {item.title}
                  </Text>
                </div>
                <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Charge de travail : 2 à 3 h par semaine (1 live + exercices), pendant
          4 semaines.
        </p>
      </div>
    </section>
  );
}

function RecusSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <Text variant="h2" as="h2" className="mb-6 text-balance text-center">
          On ne te vend pas une démo. C&apos;est notre outillage interne.
        </Text>
        <p className="mx-auto mb-10 max-w-2xl text-center text-pretty leading-relaxed text-neutral-500 dark:text-neutral-400">
          Ce workflow n&apos;est pas une théorie de conférence&nbsp;: c&apos;est
          celui qui fait tourner weshipit.today. En juin 2026, nos agents ont
          produit 8 plans d&apos;audit SEO et les ont menés jusqu&apos;au merge
          en 2 semaines — pendant qu&apos;on livrait pour nos clients. Le site
          que tu es en train de lire est maintenu comme ça.
        </p>
        <p className="mx-auto max-w-2xl text-center text-pretty leading-relaxed text-neutral-500 dark:text-neutral-400">
          Ce qu&apos;on enseigne dans ce sprint, c&apos;est cet outillage,
          nettoyé et documenté pour tenir dans 4 semaines. Pas un condensé de
          threads Twitter.
        </p>
      </div>
    </section>
  );
}

function PourQuiSection() {
  const yes = [
    'Tu es développeur·se React Native (freelance ou en poste) avec une app sur laquelle tu as les droits — en prod idéalement, un side project sérieux sinon.',
    'Tu sais ouvrir une PR et lire un diff. C’est le seul prérequis technique.',
    'Tu peux consacrer 2 à 3 h par semaine pendant 4 semaines.',
    'Tu veux un workflow qui continue de tourner après le sprint, pas une démo.',
  ];

  const no = [
    'Tu n’as aucune app React Native à disposition — tu regarderais les autres construire.',
    'Tu cherches une formation « prompt engineering » généraliste. Ici on ne parle que de React Native.',
    'Tu veux qu’on le fasse à ta place — ça existe aussi, mais c’est notre offre d’audit, pas ce sprint.',
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h2" as="h2" className="mb-4 text-balance">
            L&apos;Agentic Sprint, c&apos;est pour toi si…
          </Text>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
            <Text variant="h4" as="h3" className="mb-4 text-accent">
              ✅ Oui, fonce
            </Text>
            <ul className="space-y-3">
              {yes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-neutral-950 dark:text-neutral-200"
                >
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <Text
              variant="h4"
              as="h3"
              className="mb-4 text-neutral-500 dark:text-neutral-400"
            >
              ❌ Passe ton chemin
            </Text>
            <ul className="space-y-3">
              {no.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-neutral-500 dark:text-neutral-400"
                >
                  <XMarkIcon className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-border pt-4 text-sm text-neutral-500 dark:text-neutral-400">
              Besoin de done-for-you ? On installe ces agents pour ton équipe
              dans le cadre de{' '}
              <Link
                href="/audit"
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                notre audit React Native
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function InclusSection() {
  const items = [
    {
      icon: CalendarDaysIcon,
      title: 'Le sprint complet',
      description:
        '4 lives de 1h30 (replays à vie), exercices guidés sur ton repo, review de repos en groupe, démo finale le 9 octobre.',
    },
    {
      icon: BoltIcon,
      title: 'Bonus 1 — 10 skills & agents RN prêts à l’emploi',
      description:
        'Triage Sentry, tests Maestro, upgrade Expo, release EAS, revue de PR RN, et 5 autres. À installer tels quels, puis à adapter à ton app.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Bonus 2 — La Stability Checklist, version guidée',
      description:
        'On score ton app ensemble en live : tu sais quoi automatiser en premier, et quoi laisser tranquille.',
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Bonus 3 — 30 jours de support async',
      description:
        'Discord privé du batch, réponses de David & Matthys jusqu’au 9 novembre — le temps que tes agents tournent sans nous.',
    },
    {
      icon: BookOpenIcon,
      title: 'Bonus 4 — Le livre inclus',
      description:
        'Notre livre React Native en version numérique, dès ton inscription. Pour consolider les bases pendant que les agents font le reste.',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <Text variant="h2" as="h2" className="mb-4 text-balance">
            Le sprint, plus tout ce qu&apos;il faut pour continuer sans nous
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Pas de «&nbsp;valeur totale&nbsp;: 4&nbsp;997&nbsp;€&nbsp;». Les
            bonus sont là pour lever tes objections, pas pour gonfler une
            addition.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <item.icon className="h-5 w-5 text-accent" />
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

        <p className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Non inclus, dit franchement&nbsp;: pas de 1:1, pas de code écrit à ta
          place, et les outils IA sont à ta charge (~20&nbsp;$/mois pendant le
          sprint).
        </p>
      </div>
    </section>
  );
}

function GarantieSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center md:p-12">
          <ShieldCheckIcon className="mx-auto mb-6 h-12 w-12 text-accent" />
          <Text variant="h2" as="h2" className="mb-6 text-balance">
            Une PR en semaine 1, ou remboursé
          </Text>
          <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-neutral-950 dark:text-neutral-100">
            Si à la fin de la semaine 1, en ayant fait les exercices, ton agent
            n&apos;a pas ouvert sa première PR sur ton app&nbsp;: on te
            rembourse intégralement. Sans discussion, sans formulaire de
            rétention.
          </p>
          <p className="mx-auto max-w-2xl text-sm text-neutral-500 dark:text-neutral-400">
            On peut se le permettre parce que le programme est construit pour
            ça&nbsp;: le first-win de la semaine 1 est le cœur du sprint, pas sa
            conclusion.
          </p>
        </div>
      </div>
    </section>
  );
}

function PrixSection() {
  const included = [
    '4 lives + replays à vie',
    '10 skills & agents RN prêts à l’emploi',
    'Stability Checklist guidée sur ton app',
    '30 jours de support async (Discord)',
    'Le livre React Native inclus',
    'Garantie : une PR d’agent en semaine 1 ou remboursé',
  ];

  return (
    <section id="prix" className="border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h2" as="h2" className="mb-4 text-balance">
            {PRICE_FOUNDING} € HT — tarif founding du batch 1
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Le batch 2 sera à {PRICE_BATCH_2} € HT. Ce n&apos;est pas une menace
            marketing&nbsp;: c&apos;est le mécanisme de toutes les premiers
            batchs — le tarif founding paie l&apos;absence de témoignages.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid md:grid-cols-2">
            <div className="border-b border-border p-8 md:border-b-0 md:border-r">
              <div className="mb-2 text-sm font-medium text-accent">
                Batch 1 · 14 septembre – 9 octobre 2026
              </div>
              <div className="mb-1 text-4xl font-bold text-neutral-950 dark:text-neutral-100">
                {PRICE_FOUNDING} €{' '}
                <span className="text-lg font-normal">HT</span>
              </div>
              <div className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
                paiement en une fois · facture fournie (frais de formation pour
                la plupart des freelances)
              </div>
              <Button
                href={CTA_URL}
                as="a"
                size="lg"
                variant="primary"
                isExternalLink
                withExternalLinkIcon={false}
                className="w-full justify-center"
              >
                {CTA_LABEL_SHORT}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
              <div className="mt-4 space-y-1 text-sm text-neutral-500 dark:text-neutral-400">
                <div>
                  <strong className="text-neutral-950 dark:text-neutral-200">
                    {SPOTS} places.
                  </strong>{' '}
                  Vraie contrainte&nbsp;: on review les repos des participants
                  en live.
                </div>
                <div>
                  Inscriptions closes le <strong>vendredi 11 septembre</strong>{' '}
                  — ou avant, si c&apos;est complet.
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="mb-4 text-sm font-medium text-neutral-950 dark:text-neutral-200">
                Inclus&nbsp;:
              </div>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-neutral-500 dark:text-neutral-400"
                  >
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuiSection() {
  return (
    <AuthorDisclosure title="Qui est derrière l'Agentic Sprint">
      <p>
        On est David Leuliette et Matthys — weshipit.today, un studio React
        Native de deux personnes. Depuis 2016, on répare, teste et ship des apps
        React Native pour des équipes qui ne peuvent pas se permettre un crash
        de plus. Et depuis deux ans, on le fait avec des agents IA dans la
        boucle, tous les jours.
      </p>
      <p>
        Notre travail public&nbsp;: un{' '}
        <Link
          href="/react-native-tools"
          className="font-semibold text-accent underline-offset-2 hover:underline"
        >
          directory de 49 outils React Native
        </Link>
        , un{' '}
        <Link
          href="/react-native-glossary"
          className="font-semibold text-accent underline-offset-2 hover:underline"
        >
          glossaire de 100+ termes
        </Link>{' '}
        et un{' '}
        <Link
          href="/podcast"
          className="font-semibold text-accent underline-offset-2 hover:underline"
        >
          podcast
        </Link>{' '}
        avec les équipes React Native d&apos;Alan, Cdiscount ou Swan au micro.
      </p>
      <p>
        Ce qu&apos;on enseigne dans ce sprint, c&apos;est notre outillage
        interne, nettoyé et documenté pour tenir dans 4 semaines. Pas un
        condensé de threads Twitter.
      </p>
    </AuthorDisclosure>
  );
}

function CtaFinalSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />
          </div>

          <div className="relative px-8 py-16 text-center md:py-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              <CalendarDaysIcon className="h-4 w-4" />
              {SPOTS} places · inscriptions closes le 11 septembre
            </div>
            <Text variant="h2" as="h2" className="mb-6 text-balance">
              Le 14 septembre, ton app a son premier agent.{' '}
              <span className="text-accent">Ou pas.</span>
            </Text>
            <p className="mx-auto mb-10 max-w-xl text-lg text-neutral-500 dark:text-neutral-400">
              Dans les deux cas, les crashs de lundi prochain arriveront. La
              seule question, c&apos;est qui les triage&nbsp;: toi, ou une PR
              qui t&apos;attend au réveil.
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
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Un live par semaine pendant 1 mois
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Une PR d&apos;agent en semaine 1 ou remboursé
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Replays à vie
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AgenticSprintPage() {
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
        name: 'Agentic Sprint — React Native',
        item: 'https://weshipit.today/agentic-sprint',
      },
    ],
  };

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Agentic Sprint — React Native',
    description:
      "Batch en ligne d'un mois pour développeurs React Native : montez des agents IA qui triagent vos crashs Sentry, écrivent vos tests Maestro et préparent vos releases EAS. Un live par semaine, exercices sur votre propre app.",
    provider: {
      '@type': 'Organization',
      name: 'weshipit.today',
      sameAs: 'https://weshipit.today',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT3H',
      startDate: '2026-09-14',
      endDate: '2026-10-09',
      inLanguage: 'fr',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://weshipit.today/agentic-sprint',
      priceCurrency: 'EUR',
      price: String(PRICE_FOUNDING),
      priceValidUntil: '2026-09-11',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://weshipit.today/agentic-sprint" />
        <link
          rel="alternate"
          hrefLang="fr"
          href="https://weshipit.today/agentic-sprint"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://weshipit.today/agentic-sprint"
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
        />
      </Head>
      <Layout
        seoTitle="Agentic Sprint — React Native : fais coder, tester et release ton app par des agents IA"
        seoDescription="Batch en ligne d'un mois pour développeurs React Native : monte des agents IA qui triagent tes crashs Sentry, écrivent tes tests Maestro et préparent tes releases EAS — sur ta propre app. Un live par semaine, du 14 septembre au 9 octobre 2026. 25 places, 490 € HT."
        ogImageTitle="Agentic Sprint — React Native"
        ogImageAlt="Agentic Sprint — batch d'un mois pour développeurs React Native : des agents IA sur ta propre app"
        locale="fr_FR"
        withHeader
        withFooter
        callToActionButton={{
          name: CTA_LABEL_SHORT,
          href: CTA_URL,
          isExternalLink: true,
        }}
      >
        <HeroSection />
        <ProblemeSection />
        <ProgrammeSection />
        <RecusSection />
        <PourQuiSection />
        <InclusSection />
        <GarantieSection />
        <PrixSection />

        <section id="faq" className="border-t border-border py-24">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-12 text-center">
              <Text variant="h3" as="h2" className="mb-4 text-balance">
                FAQ — Agentic Sprint
              </Text>
              <p className="text-neutral-500 dark:text-neutral-400">
                Tout ce qu&apos;il faut savoir avant de réserver ta place.
              </p>
            </div>
            <Faq faqs={faqs} title="" headingId="faq-as-heading" />
          </div>
        </section>

        <QuiSection />
        <CtaFinalSection />
      </Layout>
    </>
  );
}
