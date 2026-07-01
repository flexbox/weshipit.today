import { Button, Faq, Text } from '@weshipit/ui';

import {
  ArrowRightIcon,
  CheckCircleIcon,
  CheckIcon,
  ClipboardDocumentCheckIcon,
  CurrencyEuroIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TagIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Head from 'next/head';
import { Layout } from '../components/layout';
import { linksApi } from './api/links';

const CTA_LABEL = 'Activer mon code réduction (-910 €)';
const CTA_LABEL_SHORT = 'Activer le code réduction';

const PRICE_PUBLIC = 2400;
const PRICE_AFFILIATE = 1490;

const AFFILIATE_URL = linksApi.affiliate.INCUBATEUR_SOLOPRENEUR;

const faqs = [
  {
    id: 'faq-cr-1',
    question: 'Comment obtenir le code réduction Solopreneur ?',
    answer:
      "Le code réduction le plus avantageux pour l'Incubateur Solopreneur de Flavie Prevot est appliqué automatiquement quand tu passes par le lien d'affilié d'un incubé actif. Tu paies 1 490 € HT au lieu de 2 400 € HT, soit 910 € d'économie sur la première année. Aucun code à saisir, la remise est appliquée à l'inscription.",
  },
  {
    id: 'faq-cr-2',
    question: 'Est-ce que le code réduction Solopreneur est officiel ?',
    answer:
      "Oui. Flavie Prevot a mis en place un programme d'affiliation officiel pour ses incubés actifs. Le tarif affilié à 1 490 € HT est le prix le plus bas du marché : aucune remise publique, soldes ou code promo Black Friday ne descend en dessous de ce prix. C'est la condition imposée par la fondatrice pour récompenser ses ambassadeurs.",
  },
  {
    id: 'faq-cr-3',
    question:
      "Quel est le prix de l'Incubateur Solopreneur sans code de réduction ?",
    answer:
      "Le prix public sur la page de vente (VSL) est de 2 400 € HT pour un an d'accompagnement. Une remise de 500 € est proposée pendant 3-4 jours après le visionnage de la vidéo, ramenant le tarif à 1 900 € HT. Le code réduction d'affiliation reste plus avantageux à 1 490 € HT.",
  },
  {
    id: 'faq-cr-4',
    question: "Combien d'économies avec le code réduction Solopreneur ?",
    answer:
      "Tu économises 910 € HT par rapport au tarif public de 2 400 € HT, et 410 € HT par rapport à la remise VSL temporaire de 1 900 € HT. C'est l'équivalent d'un Sprint mensuel (990 € HT) presque offert.",
  },
  {
    id: 'faq-cr-5',
    question: "Qu'est-ce qui est inclus dans l'Incubateur Solopreneur ?",
    answer:
      "12 mois d'accès à la communauté de 300+ solopreneurs, un Sprint thématique chaque mois (IA, automation, podcasting, sponsoring, offre, design…), des lives pratico-pratiques chaque vendredi, l'accès aux replays, des office hours avec des experts invités, et un canal #mes-réussites pour partager tes wins. L'Incubateur est orienté passage à l'action et construction d'actifs, pas formation passive.",
  },
  {
    id: 'faq-cr-6',
    question:
      'Le code réduction Solopreneur fonctionne aussi sur le Sprint mensuel ?',
    answer:
      "Le Sprint seul (un mois, 990 € HT) avec 4 corrections offertes peut aussi être réservé via un lien d'affilié. La remise est proportionnellement plus faible. Pour maximiser l'économie, le tarif annuel à 1 490 € HT reste le meilleur rapport qualité-prix : pour 500 € de plus qu'un sprint isolé tu obtiens l'année complète.",
  },
  {
    id: 'faq-cr-7',
    question: "L'Incubateur Solopreneur, c'est pour qui ?",
    answer:
      "Pour les solopreneurs qui ont déjà consommé du contenu (formations, bootcamps, livres) sans passer à l'action. Pour ceux qui veulent une heure par semaine vraiment dédiée à leur business plutôt qu'à leurs clients. Et pour celles et ceux qui veulent construire des actifs (newsletter, podcast, offre, SaaS, sponsoring) brique après brique, dans une communauté qui pousse au shipping.",
  },
  {
    id: 'faq-cr-8',
    question: 'Y a-t-il un risque à utiliser le lien de réduction ?',
    answer:
      "Aucun. Le paiement passe par Systeme.io, la plateforme officielle de Flavie. Tu obtiens exactement le même accès (mêmes lives, mêmes Sprints, même Slack/Mighty, mêmes experts) qu'un client direct, simplement à un meilleur prix. Le seul effet : un incubé existant touche une commission d'apporteur d'affaires, ce qui permet à la communauté de grandir.",
  },
  {
    id: 'faq-cr-9',
    question:
      "Quand l'augmentation de prix de l'Incubateur Solopreneur a-t-elle eu lieu ?",
    answer:
      "Flavie a progressivement augmenté les prix : 90 €, 200 €, 400 €, 800 € puis 2 400 € HT pour la cohorte actuelle. La logique : attirer des solopreneurs investis, qui se présentent aux lives et passent vraiment à l'action. Le tarif est verrouillé sur la première année, sans engagement de reconduction.",
  },
  {
    id: 'faq-cr-10',
    question: 'Puis-je avoir un essai ou un remboursement ?',
    answer:
      "Il n'y a pas de période d'essai. Pour réduire le risque, Flavie propose désormais le format Sprint mensuel (990 € HT) qui permet de tester un mois complet avant de basculer en Incubateur annuel. Le code réduction couvre uniquement la formule annuelle.",
  },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
          <TagIcon className="h-4 w-4" />
          Mis à jour pour 2026 — Tarif affilié vérifié
        </div>

        <Text variant="h1" as="h1" className="mb-6 text-balance">
          Code réduction <span className="text-accent">Solopreneur</span>&nbsp;:
          1&nbsp;490 € au lieu de 2&nbsp;400 €
        </Text>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-xl">
          Le tarif le plus bas disponible sur l&apos;Incubateur Solopreneur de
          Flavie Prevot. 910 € d&apos;économie sur la première année, aucun code
          à saisir, remise appliquée automatiquement via le lien d&apos;affilié
          officiel.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href={AFFILIATE_URL}
            as="a"
            size="xl"
            variant="primary"
            isExternalLink
            withExternalLinkIcon={false}
          >
            {CTA_LABEL}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
          <Button as="a" href="#comparatif" size="xl" variant="outline">
            Voir le comparatif des prix
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            300+ solopreneurs déjà incubés
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            Avis Trustpilot vérifiés
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            Paiement Systeme.io officiel
          </span>
        </div>
      </div>
    </section>
  );
}

function ComparatifSection() {
  const rows = [
    {
      label: 'Prix public sur la page de vente (VSL)',
      price: '2 400 € HT',
      saving: '0 €',
      best: false,
    },
    {
      label: 'Remise VSL (3-4 jours après la vidéo)',
      price: '1 900 € HT',
      saving: '500 €',
      best: false,
    },
    {
      label: 'Code réduction Solopreneur (lien affilié)',
      price: '1 490 € HT',
      saving: '910 €',
      best: true,
    },
  ];

  return (
    <section id="comparatif" className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Comparatif des tarifs de l&apos;Incubateur Solopreneur
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Les 3 manières de payer l&apos;Incubateur Solopreneur en 2026, du
            plus cher au plus avantageux. Le code réduction via lien affilié est
            le tarif plancher imposé par Flavie : aucune promo publique ne
            descend en dessous.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-3 border-b border-border bg-secondary">
            <div className="p-4 text-sm font-medium text-neutral-950 dark:text-neutral-200">
              Type d&apos;accès
            </div>
            <div className="border-l border-border p-4 text-center text-sm font-medium text-neutral-950 dark:text-neutral-200">
              Prix HT
            </div>
            <div className="border-l border-border p-4 text-center text-sm font-medium text-neutral-950 dark:text-neutral-200">
              Économie
            </div>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 ${
                i !== rows.length - 1 ? 'border-b border-border' : ''
              } ${row.best ? 'bg-accent/10' : 'bg-card'}`}
            >
              <div className="flex items-center gap-2 p-4 text-sm text-neutral-950 dark:text-neutral-200">
                {row.best && (
                  <CheckCircleIcon className="h-5 w-5 shrink-0 text-accent" />
                )}
                <span className={row.best ? 'font-semibold' : ''}>
                  {row.label}
                </span>
              </div>
              <div
                className={`border-l border-border p-4 text-center ${
                  row.best
                    ? 'text-lg font-bold text-accent'
                    : 'text-sm text-neutral-500 dark:text-neutral-400 line-through'
                }`}
              >
                {row.price}
              </div>
              <div
                className={`border-l border-border p-4 text-center ${
                  row.best
                    ? 'font-semibold text-accent'
                    : 'text-sm text-neutral-500 dark:text-neutral-400'
                }`}
              >
                {row.saving}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            href={AFFILIATE_URL}
            as="a"
            size="lg"
            variant="primary"
            isExternalLink
            withExternalLinkIcon={false}
          >
            {CTA_LABEL_SHORT}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function CommentCaMarcheSection() {
  const steps = [
    {
      number: '1',
      icon: TagIcon,
      title: 'Clique sur le lien affilié',
      description:
        "Tu arrives directement sur la page de vente officielle de l'Incubateur Solopreneur. Le tarif réduit à 1 490 € HT est déjà appliqué — pas besoin de saisir un code promo.",
    },
    {
      number: '2',
      icon: ClipboardDocumentCheckIcon,
      title: 'Remplis ton inscription',
      description:
        'Paiement sécurisé via Systeme.io, la plateforme officielle de Flavie. Tu choisis paiement en une fois ou en plusieurs mensualités selon les options affichées.',
    },
    {
      number: '3',
      icon: RocketLaunchIcon,
      title: 'Accède à la communauté',
      description:
        'Tu rejoins immédiatement les 300+ solopreneurs incubés, les replays, les lives du vendredi, le Sprint en cours et la roadmap des Sprints à venir.',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Comment activer le code réduction en 3 étapes
          </Text>
          <p className="text-neutral-500 dark:text-neutral-400">
            Aucun code à recopier. La remise est appliquée automatiquement.
          </p>
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
              <Text variant="h4" as="h3" className="mb-2">
                {step.title}
              </Text>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CeQuiEstInclusSection() {
  const items = [
    {
      icon: UsersIcon,
      title: 'Communauté de 300+ solopreneurs',
      description:
        "Sur Mighty Networks : Slack, canaux thématiques, café d'accueil, partages de wins. Les vrais clients de tes futurs services sont déjà dedans.",
    },
    {
      icon: SparklesIcon,
      title: 'Un Sprint thématique chaque mois',
      description:
        "IA & Claude, Cloud Designer, Bye Bye TJM, Sugar Daddy (sponsoring), Glow Up, podcasting vidéo, automation, SaaS solo… Tous orientés construction d'actifs.",
    },
    {
      icon: RocketLaunchIcon,
      title: 'Lives pratico-pratiques chaque vendredi',
      description:
        '« On monte un meuble Ikea ensemble. » Format atelier : tu repars avec un livrable. Replay disponible si tu rates le live.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Experts invités sur tes problématiques',
      description:
        "Spécialistes Notion, IA, design, vente, copywriting, podcasting. Tu peux les recruter en dehors si besoin, mais tu les rencontres d'abord en live.",
    },
    {
      icon: ClipboardDocumentCheckIcon,
      title: "Construction d'actifs concrets",
      description:
        'Newsletter, podcast vidéo, agent IA documenté, offre productisée, sponsors trouvés, SaaS lancé. Sortir avec un truc concret, pas un PDF de plus.',
    },
    {
      icon: CurrencyEuroIcon,
      title: 'Tarif verrouillé un an',
      description:
        "Le prix de 1 490 € HT couvre 12 mois pleins. Pas d'engagement de reconduction. À toi de décider en fin d'année si tu repars pour un tour.",
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Ce que tu obtiens avec le tarif réduit
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Exactement le même accès qu&apos;un client au prix public. Aucune
            limitation, aucune brique en moins. Seul le prix change.
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
      </div>
    </section>
  );
}

function PourQuiSection() {
  const yes = [
    "Tu as déjà consommé des formations sans jamais passer à l'action.",
    'Tu veux une heure par semaine dédiée à TON business, pas à tes clients.',
    'Tu veux construire des actifs (newsletter, podcast, SaaS, offre).',
    'Tu veux un cercle de solopreneurs qui shippent vraiment.',
    'Tu cherches des sponsors pour ton podcast, ta newsletter ou ta chaîne YouTube.',
  ];

  const no = [
    'Tu cherches un cours vidéo passif à regarder le dimanche.',
    'Tu préfères travailler seul dans ton coin, sans communauté.',
    "Tu n'as pas 1 h/semaine à investir pour avancer.",
    "Tu attends qu'on te livre une activité clé en main.",
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            L&apos;Incubateur Solopreneur, c&apos;est pour toi si…
          </Text>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
            <Text variant="h4" as="h3" className="mb-4 text-accent">
              ✓ Oui, fonce
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
              ✗ Passe ton chemin
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
          </div>
        </div>
      </div>
    </section>
  );
}

function PreuvesSection() {
  const proofs = [
    {
      title: "Marion — 2e année d'incubation",
      quote:
        "C'est ma deuxième année et avec le concept des Sprints mensuels, ma marge de progression est encore plus impressionnante.",
      source: 'Trustpilot',
    },
    {
      title: 'Anne-Marie — vente conclue en vocal',
      quote:
        "À 1 200 € je le prends. Le lien d'affilié m'a fait gagner encore 200 € — c'est ce qui a déclenché l'achat.",
      source: 'Témoignage prospect',
    },
    {
      title: 'David Leuliette — incubé & ambassadeur',
      quote:
        "Je passe une heure le vendredi avec une vingtaine de solopreneurs. En 6 mois j'ai relancé mon podcast vidéo et structuré mon offre. Le tarif affilié rembourse l'investissement dès le premier Sprint.",
      source: 'weshipit.today',
      link: {
        href: '/avis-incubateur-solopreneur',
        label: 'Lire mon avis détaillé après 6 mois d’incubation →',
      },
    },
  ];

  return (
    <section id="avis" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Ils sont passés à l&apos;action avec l&apos;Incubateur Solopreneur
          </Text>
          <p className="text-neutral-500 dark:text-neutral-400">
            Témoignages publics extraits de Trustpilot, LinkedIn et des calls
            ambassadeurs de Flavie.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {proofs.map((p) => (
            <div
              key={p.title}
              className="flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <svg
                className="mb-4 h-8 w-8 text-accent opacity-50"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {p.quote}
              </p>
              <div className="border-t border-border pt-4">
                <div className="font-medium text-neutral-950 dark:text-neutral-200">
                  {p.title}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  {p.source}
                </div>
                {p.link && (
                  <a
                    href={p.link.href}
                    className="mt-2 inline-block text-sm font-medium text-accent underline-offset-2 hover:underline"
                  >
                    {p.link.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PourquoiCettePageSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Text variant="h3" as="h2" className="mb-6 text-balance">
          Pourquoi je publie ce code réduction Solopreneur
        </Text>

        <div className="space-y-4 text-pretty leading-relaxed text-neutral-500 dark:text-neutral-400">
          <p>
            Je m&apos;appelle David Leuliette, je suis solopreneur depuis 2016
            et incubé chez{' '}
            <a
              href="/flavie-prevot-avis"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              Flavie Prevot
            </a>
            . L&apos;Incubateur m&apos;a aidé à relancer mon podcast, structurer
            mon offre et trouver des sponsors — donc Flavie m&apos;a proposé de
            devenir ambassadeur.
          </p>
          <p>
            En passant par mon lien d&apos;affilié, tu paies{' '}
            <span className="font-semibold text-neutral-950 dark:text-neutral-200">
              le prix le plus bas du marché ({PRICE_AFFILIATE} € HT au lieu de{' '}
              {PRICE_PUBLIC} € HT)
            </span>
            . Tu n&apos;as accès à aucune fonctionnalité bonus secrète —
            simplement la meilleure remise possible, car Flavie a verrouillé son
            programme d&apos;affiliation : aucune promo publique ne descend en
            dessous de ce tarif.
          </p>
          <p>
            En contrepartie, je touche une commission d&apos;apporteur
            d&apos;affaires. C&apos;est gagnant-gagnant : tu paies moins,
            l&apos;Incubateur recrute des solopreneurs investis (recommandés par
            leurs pairs), et la communauté grandit avec des profils qualifiés.
          </p>
          <p className="text-sm">
            Si tu préfères payer le tarif public, la page officielle reste
            accessible directement sur leboard.systeme.io. Le contenu et
            l&apos;accès sont strictement identiques.
          </p>
        </div>
      </div>
    </section>
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
              <TagIcon className="h-4 w-4" />
              Tarif plancher — 910 € d&apos;économie
            </div>
            <Text variant="h2" as="h2" className="mb-6 text-balance">
              Active ton code réduction{' '}
              <span className="text-accent">Solopreneur</span> en 1 clic
            </Text>
            <p className="mx-auto mb-10 max-w-xl text-lg text-neutral-500 dark:text-neutral-400">
              1 490 € HT pour 12 mois d&apos;incubation. Le prix le plus bas
              disponible. Aucun code à saisir.
            </p>

            <Button
              href={AFFILIATE_URL}
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
                Paiement Systeme.io officiel
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                12 mois d&apos;accès complet
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Communauté de 300+ solopreneurs
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CodeReductionSolopreneurPage() {
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
        name: 'Code réduction Solopreneur',
        item: 'https://weshipit.today/code-reduction-solopreneur',
      },
    ],
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Incubateur Solopreneur — Code réduction (tarif affilié)',
    description:
      "Tarif affilié pour l'Incubateur Solopreneur de Flavie Prevot. 12 mois d'incubation avec Sprints mensuels, lives, communauté de 300+ solopreneurs et experts invités. Prix le plus bas du marché : 1 490 € HT au lieu de 2 400 € HT.",
    brand: {
      '@type': 'Brand',
      name: 'Incubateur Solopreneur',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://weshipit.today/code-reduction-solopreneur',
      priceCurrency: 'EUR',
      price: String(PRICE_AFFILIATE),
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href="https://weshipit.today/code-reduction-solopreneur"
        />
        <link
          rel="alternate"
          hrefLang="fr"
          href="https://weshipit.today/code-reduction-solopreneur"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://weshipit.today/code-reduction-solopreneur"
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </Head>
      <Layout
        seoTitle="Code Réduction Solopreneur 2026 : 1 490 € au lieu de 2 400 € (-910 €)"
        seoDescription="Code réduction Incubateur Solopreneur de Flavie Prevot : 1 490 € HT au lieu de 2 400 €. Le tarif le plus bas du marché via le lien affilié officiel. 910 € d'économie sur 12 mois d'incubation."
        ogImageTitle="Code Réduction Solopreneur : -910 €"
        ogImageAlt="Code réduction Incubateur Solopreneur — 1 490 € HT au lieu de 2 400 €"
        locale="fr_FR"
        withHeader
        withFooter
        callToActionButton={{
          name: CTA_LABEL_SHORT,
          href: AFFILIATE_URL,
          isExternalLink: true,
        }}
      >
        <HeroSection />
        <ComparatifSection />
        <CommentCaMarcheSection />
        <CeQuiEstInclusSection />
        <PourQuiSection />
        <PreuvesSection />
        <PourquoiCettePageSection />

        <section id="faq" className="border-t border-border py-24">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-12 text-center">
              <Text variant="h3" as="h2" className="mb-4 text-balance">
                FAQ — Code réduction Solopreneur
              </Text>
              <p className="text-neutral-500 dark:text-neutral-400">
                Tout ce qu&apos;il faut savoir avant d&apos;activer ta remise.
              </p>
            </div>
            <Faq faqs={faqs} title="" headingId="faq-cr-heading" />
          </div>
        </section>

        <CtaFinalSection />
      </Layout>
    </>
  );
}
