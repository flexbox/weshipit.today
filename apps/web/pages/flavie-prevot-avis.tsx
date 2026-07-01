import { Button, Faq, Text } from '@weshipit/ui';

import {
  ArrowRightIcon,
  BookOpenIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
  CheckIcon,
  MicrophoneIcon,
  NewspaperIcon,
  RocketLaunchIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import Head from 'next/head';
import { Layout } from '../components/layout';
import { linksApi } from './api/links';

const AFFILIATE_URL = linksApi.affiliate.INCUBATEUR_SOLOPRENEUR;
const AVIS_URL = '/avis-incubateur-solopreneur';
const CODE_REDUCTION_URL = '/code-reduction-solopreneur';

const CTA_LABEL_SHORT = 'Lire l’avis Incubateur';

const faqs = [
  {
    id: 'faq-flavie-1',
    question: 'Qui est Flavie Prevot ?',
    answer:
      "Flavie Prevot est une entrepreneure française spécialisée dans l'accompagnement des solopreneurs. Elle a construit plusieurs business avant de lancer l'Incubateur Solopreneur en 2023. Son écosystème actuel repose sur trois piliers : une newsletter hebdomadaire (30 000+ abonnés), un podcast interviewant des solopreneurs francophones, et l'Incubateur Solopreneur (communauté payante + Sprints mensuels).",
  },
  {
    id: 'faq-flavie-2',
    question: 'Flavie Prevot, arnaque ou pas ?',
    answer:
      "Non. Rien dans son parcours public ne pointe vers une arnaque : aucune promesse de revenus irréalistes, aucun upsell caché à 5 000 €, aucun avis Trustpilot négatif significatif, paiements gérés par Systeme.io (plateforme officielle et traçable). Le terme « arnaque » revient dans les recherches simplement parce que le tarif de l'Incubateur (2 400 € HT) déclenche une vérification réflexe — c'est sain. Ma propre expérience après 6 mois d'incubation confirme : le programme livre ce qu'il annonce.",
  },
  {
    id: 'faq-flavie-3',
    question: 'Quel est le parcours de Flavie Prevot avant l’Incubateur ?',
    answer:
      "Flavie a occupé des postes dans le retail et le marketing digital avant de basculer dans l'entrepreneuriat. Elle a lancé et développé plusieurs activités (conseil, formation, communauté) avant de structurer l'Incubateur Solopreneur en 2023. Sa légitimité vient à la fois de son expérience personnelle (elle a été solopreneur avant d'accompagner d'autres solopreneurs) et de la traction de sa newsletter et de son podcast.",
  },
  {
    id: 'faq-flavie-4',
    question: 'Que propose Flavie Prevot en gratuit ?',
    answer:
      "Trois canaux gratuits pour découvrir son approche avant de payer : (1) sa newsletter hebdomadaire (études de cas de solopreneurs, tactiques concrètes), (2) son podcast (interviews longues de solopreneurs francophones), (3) ses posts LinkedIn (réflexions courtes, format hebdo). C'est le meilleur point d'entrée si tu hésites à rejoindre l'Incubateur payant.",
  },
  {
    id: 'faq-flavie-5',
    question: 'Combien coûtent les programmes de Flavie Prevot ?',
    answer:
      "Deux formules payantes principales. Le Sprint mensuel : 990 € HT pour 1 mois (bon pour tester). L'Incubateur Solopreneur annuel : 2 400 € HT au tarif public, 1 900 € HT en remise VSL (3-4 jours après la vidéo), 1 490 € HT via lien affilié (le tarif plancher). Le tarif affilié à 1 490 € HT est verrouillé par Flavie : aucune promo publique ne descend en-dessous.",
  },
  {
    id: 'faq-flavie-6',
    question: 'L’Incubateur Solopreneur de Flavie Prevot, ça vaut le coup ?',
    answer:
      "Oui pour les solopreneurs déjà en activité qui veulent construire des actifs (newsletter, podcast, offre, sponsoring, SaaS solo) avec un cercle de pairs. Le format « atelier » du vendredi et les Sprints mensuels poussent au shipping. À éviter si tu cherches un cours vidéo passif ou si tu n'as pas 1h/semaine garantie. Mon avis détaillé après 6 mois d'incubation est disponible sur la page dédiée.",
  },
  {
    id: 'faq-flavie-7',
    question: 'Où trouver Flavie Prevot sur les réseaux ?',
    answer:
      "LinkedIn est son canal principal (posts hebdomadaires, threads sur le solopreneuriat). Elle publie aussi sur Instagram et sa newsletter est le point d'entrée le plus dense en valeur. Son podcast est disponible sur toutes les plateformes (Spotify, Apple Podcasts, YouTube). Elle est peu active sur X/Twitter.",
  },
  {
    id: 'faq-flavie-8',
    question: 'Faut-il rejoindre la communauté payante ou suivre en gratuit ?',
    answer:
      "Suivre en gratuit d'abord : newsletter + podcast pendant 2-3 mois. Ça te donne une vraie idée de son style et de son approche. Rejoindre la communauté payante si tu veux passer du contenu passif à la construction active d'actifs avec un cercle de pairs. La bascule gratuit → payant est plus efficace que l'inverse.",
  },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
          <UserCircleIcon className="h-4 w-4" />
          Profil vérifié — Fondatrice de l’Incubateur Solopreneur
        </div>

        <Text variant="h1" as="h1" className="mb-6 text-balance">
          <span className="text-accent">Flavie Prevot</span>&nbsp;: avis,
          parcours et projets (2026)
        </Text>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-xl">
          Entrepreneure française, fondatrice de l’Incubateur Solopreneur, hôte
          d’un podcast à forte traction et d’une newsletter de 30&nbsp;000+
          abonnés. Résumé neutre de son parcours, de sa réputation et de son
          écosystème pour décider si son approche te correspond.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button as="a" href="#en-bref" size="xl" variant="primary">
            Le profil en 30 secondes
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
          <Button as="a" href="#reputation" size="xl" variant="outline">
            Avis et réputation
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            Analyse par un incubé actif
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            Sources publiques uniquement
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            Mise à jour 2026
          </span>
        </div>
      </div>
    </section>
  );
}

function EnBrefSection() {
  const facts = [
    {
      label: 'Rôle actuel',
      value: 'Fondatrice de l’Incubateur Solopreneur',
    },
    {
      label: 'Nationalité',
      value: 'Française',
    },
    {
      label: 'Newsletter',
      value: '30 000+ abonnés (hebdomadaire)',
    },
    {
      label: 'Podcast',
      value: 'Interviews de solopreneurs francophones',
    },
    {
      label: 'Communauté payante',
      value: '300+ incubés actifs (Mighty Networks)',
    },
    {
      label: 'Prix Incubateur',
      value: '1 490 € HT (affilié) / 2 400 € HT (public)',
    },
  ];

  return (
    <section id="en-bref" className="border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Flavie Prevot en 30 secondes
          </Text>
          <p className="text-neutral-500 dark:text-neutral-400">
            Les faits vérifiables sur son écosystème actuel.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={`grid grid-cols-1 gap-1 p-5 md:grid-cols-3 md:gap-4 ${
                i !== facts.length - 1 ? 'border-b border-border' : ''
              } bg-card`}
            >
              <div className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                {f.label}
              </div>
              <div className="text-sm text-neutral-950 dark:text-neutral-100 md:col-span-2">
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParcoursSection() {
  const stages = [
    {
      period: 'Avant 2020',
      title: 'Retail, marketing digital et premiers business',
      description:
        'Postes en entreprise dans le retail et le marketing digital. Premières activités entrepreneuriales en parallèle : conseil, formation, communauté. C’est là qu’elle construit son terrain de jeu autour de l’indépendance et du business creator.',
    },
    {
      period: '2020–2022',
      title: 'Lancement newsletter + podcast',
      description:
        'Structuration de sa présence publique via une newsletter hebdomadaire et un podcast d’interviews de solopreneurs francophones. La ligne éditoriale se précise : études de cas concrètes, tactiques applicables, pas de blabla motivationnel.',
    },
    {
      period: '2023',
      title: 'Fondation de l’Incubateur Solopreneur',
      description:
        'Passage de la communauté gratuite à un format payant structuré. Prix initial très bas (90 € puis 200 €), montées progressives jusqu’à 2 400 € HT pour la cohorte 2026. Logique : filtrer les solopreneurs investis, améliorer le rythme d’action des cohortes.',
    },
    {
      period: '2024–2025',
      title: 'Consolidation et affiliation',
      description:
        'Format Sprints mensuels installé (IA, sponsoring, offre, podcast vidéo, automation). Programme d’affiliation ouvert aux incubés actifs pour recruter des solopreneurs recommandés par leurs pairs. Tarif affilié verrouillé à 1 490 € HT.',
    },
    {
      period: '2026',
      title: 'Écosystème mature',
      description:
        'Newsletter et podcast toujours actifs. Incubateur en régime de croisière avec 300+ incubés. Focus sur la qualité communautaire (cercle actif, pair pression, construction d’actifs) plutôt que la course au volume.',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Parcours de Flavie Prevot
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Reconstitution à partir de sources publiques (LinkedIn, newsletter,
            podcast, contenus de vente).
          </p>
        </div>

        <div className="space-y-4">
          {stages.map((s, i) => (
            <div
              key={s.period}
              className="relative rounded-xl border border-border bg-card p-6 md:pl-24"
            >
              <div className="mb-2 flex items-center gap-3 md:absolute md:left-6 md:top-6 md:mb-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-neutral-950 dark:text-neutral-200">
                  {i + 1}
                </div>
              </div>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">
                {s.period}
              </div>
              <Text variant="h4" as="h3" className="mb-3">
                {s.title}
              </Text>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemeSection() {
  const pillars = [
    {
      icon: NewspaperIcon,
      title: 'Newsletter hebdomadaire',
      description:
        'Le canal éditorial principal : 30 000+ abonnés, un envoi par semaine, format études de cas et tactiques. C’est le meilleur point d’entrée pour goûter à son style avant de payer quoi que ce soit.',
      access: 'Gratuit',
    },
    {
      icon: MicrophoneIcon,
      title: 'Podcast solopreneurs',
      description:
        'Interviews longues de solopreneurs francophones. Format conversation, pas format promo. Idéal pour comprendre la diversité des modèles couverts par sa communauté.',
      access: 'Gratuit',
    },
    {
      icon: SparklesIcon,
      title: 'Sprint mensuel',
      description:
        'Format d’essai : 1 mois d’accès à un Sprint thématique (IA, sponsoring, podcast, offre…) avec corrections. Pour tester sans s’engager sur 12 mois.',
      access: '990 € HT',
    },
    {
      icon: UsersIcon,
      title: 'Incubateur Solopreneur (annuel)',
      description:
        'Programme phare : 12 mois d’incubation, communauté de 300+ solopreneurs, Sprint chaque mois, lives du vendredi, experts invités. C’est le cœur de son business.',
      access: '1 490 € HT (affilié)',
    },
    {
      icon: BookOpenIcon,
      title: 'LinkedIn',
      description:
        'Canal social principal. Posts hebdomadaires sur le solopreneuriat, threads sur les mécaniques business. Rythme régulier, ton direct.',
      access: 'Gratuit',
    },
    {
      icon: BuildingOffice2Icon,
      title: 'Événements et partenariats',
      description:
        'Interventions ponctuelles sur des événements solopreneurs francophones (conférences, retreats). Partenariats occasionnels avec d’autres créateurs FR.',
      access: 'Variable',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            L’écosystème Flavie Prevot en 2026
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Six points d’entrée pour découvrir son travail, du gratuit au
            payant. Aucune obligation de passer par la formule annuelle.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <p.icon className="h-5 w-5 text-accent" />
                </div>
                <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {p.access}
                </span>
              </div>
              <Text variant="h4" as="h3" className="mb-2">
                {p.title}
              </Text>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReputationSection() {
  const signals = [
    {
      source: 'Trustpilot',
      note: '4,5+ / 5',
      summary:
        'Avis vérifiés majoritairement positifs. Les points cités : qualité de l’animation, dynamique de la communauté, format Sprint concret.',
    },
    {
      source: 'LinkedIn',
      note: 'Engagement soutenu',
      summary:
        'Posts hebdomadaires avec des commentaires nombreux et argumentés. Peu de trolls, communauté qualitative.',
    },
    {
      source: 'Podcast',
      note: 'Écoutes régulières',
      summary:
        'Invités sérieux, format long, pas de promo déguisée. Bon signal sur la ligne éditoriale.',
    },
    {
      source: 'Communauté (Mighty Networks)',
      note: 'Activité soutenue',
      summary:
        'Noyau de 50 à 80 incubés très actifs sur ~300 membres. Ratio cohérent avec les communautés payantes qui fonctionnent.',
    },
  ];

  return (
    <section id="reputation" className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Réputation et avis publics
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Signaux vérifiables sur les canaux publics — sans reprendre les
            arguments de sa propre page de vente.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {signals.map((s) => (
            <div
              key={s.source}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-3 flex items-center justify-between">
                <Text
                  variant="h4"
                  as="h3"
                  className="text-neutral-950 dark:text-neutral-100"
                >
                  {s.source}
                </Text>
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  {s.note}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {s.summary}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-6">
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheckIcon className="h-5 w-5 text-accent" />
            <Text variant="h4" as="h3" className="text-accent">
              Verdict sur la réputation
            </Text>
          </div>
          <p className="text-pretty text-sm leading-relaxed text-neutral-950 dark:text-neutral-200">
            Aucun signal d’arnaque. Pas de promesse irréaliste, pas d’upsell
            caché, paiement via Systeme.io (plateforme officielle française),
            avis Trustpilot cohérents avec l’expérience réelle en incubation.
            Flavie Prevot est un profil sérieux du paysage solopreneur FR. Reste
            à savoir si son approche te correspond — c’est l’objet des sections
            ci-dessous.
          </p>
        </div>
      </div>
    </section>
  );
}

function PourAllerPlusLoinSection() {
  const routes = [
    {
      icon: NewspaperIcon,
      title: 'Découvrir en gratuit',
      description:
        'Sa newsletter et son podcast sont les meilleurs points d’entrée. Compte 2 à 3 mois de lecture pour te faire un avis solide avant de payer quoi que ce soit.',
      cta: null,
    },
    {
      icon: SparklesIcon,
      title: 'Lire mon avis détaillé sur l’Incubateur',
      description:
        'Retour d’expérience de 6 mois en tant qu’incubé actif : points forts, points faibles, résultats concrets. Utile si tu veux savoir à quoi t’attendre avant de rejoindre.',
      cta: {
        href: AVIS_URL,
        label: 'Lire l’avis Incubateur Solopreneur',
      },
    },
    {
      icon: RocketLaunchIcon,
      title: 'Rejoindre avec le code réduction (-910 €)',
      description:
        'Si tu es déjà convaincu, le tarif affilié à 1 490 € HT (au lieu de 2 400 €) est le prix le plus bas verrouillé par Flavie. 910 € d’économie immédiate.',
      cta: {
        href: CODE_REDUCTION_URL,
        label: 'Voir le code réduction Solopreneur',
      },
    },
    {
      icon: ScaleIcon,
      title: 'Comparer avec Marketing Mania',
      description:
        'Comparaison indépendante entre l’Incubateur Solopreneur de Flavie et le Bootcamp Marketing Mania de Stan Leloup. Recommandation par cas d’usage — utile si tu hésites.',
      cta: {
        href: '/incubateur-solopreneur-vs-marketing-mania',
        label: 'Lire le comparatif',
      },
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Pour aller plus loin
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Quatre chemins possibles selon où tu en es dans ta réflexion.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {routes.map((r) => (
            <div
              key={r.title}
              className="flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <r.icon className="h-5 w-5 text-accent" />
              </div>
              <Text variant="h4" as="h3" className="mb-2">
                {r.title}
              </Text>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {r.description}
              </p>
              {r.cta && (
                <Button as="a" href={r.cta.href} size="md" variant="outline">
                  {r.cta.label}
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DisclosureSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Text variant="h3" as="h2" className="mb-6 text-balance">
          Pourquoi je publie ce profil
        </Text>

        <div className="space-y-4 text-pretty leading-relaxed text-neutral-500 dark:text-neutral-400">
          <p>
            Je m’appelle David Leuliette, je suis solopreneur depuis 2016 et
            incubé chez Flavie Prevot depuis 2025. Cette page synthétise mon
            observation directe et les sources publiques disponibles sur elle
            (newsletter, podcast, LinkedIn, pages de vente, avis Trustpilot).
          </p>
          <p>
            Je suis{' '}
            <span className="font-semibold text-neutral-950 dark:text-neutral-200">
              ambassadeur affilié
            </span>{' '}
            de son Incubateur. Concrètement&nbsp;: si tu rejoins l’Incubateur
            via{' '}
            <a
              href={CODE_REDUCTION_URL}
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              mon lien
            </a>{' '}
            (au tarif plancher de 1 490 € HT), je touche une commission — sans
            coût supplémentaire pour toi, tu paies le prix le plus bas du
            marché.
          </p>
          <p>
            Cette page n’est pas une vitrine promotionnelle&nbsp;: j’ai
            volontairement inclus les canaux gratuits (newsletter, podcast) en
            premier, et j’encourage la découverte en gratuit avant tout
            engagement payant. L’objectif&nbsp;: te donner une base factuelle
            pour décider, pas te pousser à acheter.
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
              <CheckCircleIcon className="h-4 w-4" />
              Profil sérieux, approche vérifiée
            </div>
            <Text variant="h2" as="h2" className="mb-6 text-balance">
              L’étape suivante&nbsp;: lire mon avis complet sur son
              <span className="text-accent"> Incubateur</span>
            </Text>
            <p className="mx-auto mb-10 max-w-xl text-lg text-neutral-500 dark:text-neutral-400">
              6 mois d’incubation, notes par critères, points forts, limites,
              comparatif avec les alternatives françaises. Pour décider en
              connaissance de cause.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button as="a" href={AVIS_URL} size="xxl" variant="primary">
                {CTA_LABEL_SHORT}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
              <Button
                as="a"
                href={CODE_REDUCTION_URL}
                size="xxl"
                variant="outline"
              >
                Voir le code réduction
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FlaviePrevotAvisPage() {
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
        name: 'Flavie Prevot — avis et parcours',
        item: 'https://weshipit.today/flavie-prevot-avis',
      },
    ],
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Flavie Prevot',
    jobTitle: 'Fondatrice de l’Incubateur Solopreneur',
    nationality: 'French',
    description:
      'Entrepreneure française, fondatrice de l’Incubateur Solopreneur. Newsletter hebdomadaire (30 000+ abonnés), podcast d’interviews de solopreneurs francophones et communauté payante de 300+ incubés.',
    knowsAbout: [
      'Solopreneuriat',
      'Marketing digital',
      'Newsletter',
      'Podcasting',
      'Communautés payantes',
      'Sponsoring',
      'Offres productisées',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Incubateur Solopreneur',
    },
  };

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href="https://weshipit.today/flavie-prevot-avis"
        />
        <link
          rel="alternate"
          hrefLang="fr"
          href="https://weshipit.today/flavie-prevot-avis"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://weshipit.today/flavie-prevot-avis"
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </Head>
      <Layout
        seoTitle="Flavie Prevot : avis, parcours et Incubateur Solopreneur (2026)"
        seoDescription="Qui est Flavie Prevot ? Parcours, écosystème (newsletter 30k+ abonnés, podcast, Incubateur Solopreneur), avis publics, réputation Trustpilot et LinkedIn. Analyse neutre par un incubé actif."
        ogImageTitle="Flavie Prevot : avis et parcours"
        ogImageAlt="Profil de Flavie Prevot, fondatrice de l’Incubateur Solopreneur"
        locale="fr_FR"
        withHeader
        withFooter
        callToActionButton={{
          name: CTA_LABEL_SHORT,
          href: AVIS_URL,
        }}
      >
        <HeroSection />
        <EnBrefSection />
        <ParcoursSection />
        <EcosystemeSection />
        <ReputationSection />
        <PourAllerPlusLoinSection />
        <DisclosureSection />

        <section id="faq" className="border-t border-border py-24">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-12 text-center">
              <Text variant="h3" as="h2" className="mb-4 text-balance">
                FAQ — Flavie Prevot
              </Text>
              <p className="text-neutral-500 dark:text-neutral-400">
                Les questions qui reviennent le plus souvent la concernant.
              </p>
            </div>
            <Faq faqs={faqs} title="" headingId="faq-flavie-heading" />
          </div>
        </section>

        <CtaFinalSection />
      </Layout>
    </>
  );
}
