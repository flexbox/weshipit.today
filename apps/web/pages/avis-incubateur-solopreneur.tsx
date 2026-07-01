import { Button, Faq, Text } from '@weshipit/ui';

import {
  ArrowRightIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  CheckIcon,
  ClipboardDocumentCheckIcon,
  CurrencyEuroIcon,
  ExclamationTriangleIcon,
  RocketLaunchIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  StarIcon,
  TagIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Head from 'next/head';
import { Layout } from '../components/layout';
import { linksApi } from './api/links';

const CTA_LABEL = 'Activer mon code réduction (-910 €)';
const CTA_LABEL_SHORT = 'Activer le code réduction';
const SECONDARY_CTA = 'Lire l’avis complet';

const AFFILIATE_URL = linksApi.affiliate.INCUBATEUR_SOLOPRENEUR;
const CODE_REDUCTION_URL = '/code-reduction-solopreneur';

const RATING_VALUE = 4.6;
const RATING_BEST = 5;
const MONTHS_INCUBATED = 6;
const DATE_PUBLISHED = '2026-06-30';

const faqs = [
  {
    id: 'faq-avis-1',
    question: 'L’Incubateur Solopreneur, ça vaut le coup en 2026 ?',
    answer:
      'Oui, à condition d’avoir 1h à 2h par semaine à investir et de venir construire un actif concret (newsletter, podcast, offre productisée, sponsoring, SaaS). Au tarif affilié (1 490 € HT), le rapport qualité-prix est très bon : c’est moins cher qu’un coach individuel sur un mois et tu accèdes à une communauté de 300+ solopreneurs investis. Au tarif public (2 400 € HT), le verdict est plus nuancé — voir la section « Rapport qualité-prix » plus bas.',
  },
  {
    id: 'faq-avis-2',
    question:
      'Quelle différence entre l’Incubateur Solopreneur et le Bootcamp de Marketing Mania ?',
    answer:
      'Marketing Mania (Stan Leloup) est principalement un format formation : 6 à 8 semaines, vidéos structurées, focus copywriting / marketing direct. L’Incubateur Solopreneur de Flavie Prevot est un format communauté + sprints mensuels : 12 mois, lives hebdomadaires, focus passage à l’action et construction d’actifs durables (newsletter, podcast, sponsoring, IA). Si tu veux apprendre la persuasion écrite, Marketing Mania. Si tu veux te mettre en mouvement dans la durée avec un cercle de pairs, l’Incubateur.',
  },
  {
    id: 'faq-avis-3',
    question: 'Combien de temps faut-il consacrer par semaine ?',
    answer:
      'Le format est conçu autour d’une heure le vendredi (le live « atelier ») et d’un Sprint mensuel qui demande 2 à 4 heures réparties dans le mois. À l’aise avec 1h à 3h par semaine, tu es dans le rythme. En-dessous, tu auras du mal à finir les Sprints. Au-dessus, tu peux aussi consommer les replays, les office hours et les canaux thématiques.',
  },
  {
    id: 'faq-avis-4',
    question: 'Quels résultats peut-on espérer en 6 mois ?',
    answer:
      'Concrètement, sur 6 mois, j’ai relancé mon podcast vidéo, structuré une offre productisée, identifié 3 pistes de sponsoring pour ma newsletter, et automatisé une partie de ma prospection. La promesse n’est pas « tu vas faire 10k MRR » — c’est « tu vas shipper des actifs et tu seras dans un cercle qui te tient le rythme ». Les résultats financiers dépendent de ce que tu construis, pas du programme.',
  },
  {
    id: 'faq-avis-5',
    question: 'Est-ce que Flavie Prevot est sérieuse ? Quel est son parcours ?',
    answer:
      'Flavie Prevot a construit plusieurs business avant l’Incubateur. Elle a une newsletter qui dépasse les 30 000 abonnés, un podcast écouté, et anime la communauté de manière très présente (lives chaque vendredi, office hours, réponses dans les canaux). Le contenu n’est pas délégué : c’est elle qui orchestre les Sprints et qui anime. Aucun signal d’arnaque ni de promesse irréaliste dans ses contenus publics. Pour un profil détaillé de son parcours, de son écosystème et de sa réputation publique, voir la page dédiée /flavie-prevot-avis sur ce site.',
  },
  {
    id: 'faq-avis-6',
    question: 'Faut-il être déjà solopreneur pour rejoindre ?',
    answer:
      'Pas obligatoirement, mais c’est mieux. L’Incubateur n’apprend pas « comment devenir solopreneur partant de zéro ». Il aide les solopreneurs déjà en activité (freelance, consultant, créateur, SaaS solo) à construire des actifs et à sortir du modèle 100 % temps facturé. Si tu es salarié sans aucune activité side, commence par poser ton premier projet avant de rejoindre.',
  },
  {
    id: 'faq-avis-7',
    question: 'L’Incubateur est-il adapté aux développeurs / SaaS solo ?',
    answer:
      'Oui, et c’est même un angle sous-exploité de la communauté. Plusieurs incubés sont sur des SaaS solo ou des micro-produits. Les Sprints IA, automation et offre s’y prêtent bien. La communauté est cependant plus orientée création de contenu / business creator que dev pur — il faut traduire certains conseils dans ton contexte technique.',
  },
  {
    id: 'faq-avis-8',
    question: 'Comment résilier ou ne pas reconduire ?',
    answer:
      'Le tarif est verrouillé sur 12 mois sans engagement de reconduction tacite. En fin d’année, tu décides simplement de repartir ou non pour un nouveau cycle. Il n’y a pas de période d’essai et pas de remboursement après inscription — c’est l’une des limites à connaître avant d’acheter (voir « Points faibles »).',
  },
  {
    id: 'faq-avis-9',
    question: 'Combien d’incubés sont vraiment actifs ?',
    answer:
      'Sur 300+ incubés affichés, j’estime à environ un tiers ceux qui se présentent régulièrement aux lives et postent des wins dans la communauté. C’est cohérent avec la plupart des communautés payantes. Le noyau actif (50 à 80 personnes) crée la vraie valeur : entraide, échanges asynchrones, retours sur les actifs en construction.',
  },
  {
    id: 'faq-avis-10',
    question: 'Existe-t-il un Trustpilot Incubateur Solopreneur ?',
    answer:
      'Oui, Flavie Prevot a une fiche Trustpilot avec des avis vérifiés positifs (note moyenne supérieure à 4,5/5). Les avis pointent surtout la qualité de l’animation et la dynamique communautaire. Pour un retour plus détaillé que les avis Trustpilot, cette page synthétise mon expérience après 6 mois d’incubation.',
  },
];

function RatingStars({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  return (
    <div className="flex items-center gap-1">
      {stars.map((filled, i) => (
        <StarIcon
          key={i}
          className={`h-5 w-5 ${
            filled
              ? 'fill-accent text-accent'
              : 'text-neutral-300 dark:text-neutral-700'
          }`}
        />
      ))}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
          <ShieldCheckIcon className="h-4 w-4" />
          Avis vérifié — Incubé depuis 2025
        </div>

        <Text variant="h1" as="h1" className="mb-6 text-balance">
          Avis <span className="text-accent">Incubateur Solopreneur</span> 2026
          &nbsp;: mon retour honnête après {MONTHS_INCUBATED} mois
        </Text>

        <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-xl">
          12 mois d’incubation avec Flavie Prevot, 300+ solopreneurs, un Sprint
          par mois, des lives le vendredi. Mon verdict après 6 mois&nbsp;:
          recommandé, sous conditions précises que je détaille plus bas.
        </p>

        <div className="mb-10 flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-3">
            <RatingStars rating={RATING_VALUE} />
            <span className="text-2xl font-bold text-neutral-950 dark:text-neutral-100">
              {RATING_VALUE.toString().replace('.', ',')}&nbsp;/&nbsp;5
            </span>
          </div>
          <span className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Note globale sur 6 critères détaillés
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            as="a"
            href={`${CODE_REDUCTION_URL}#comparatif`}
            size="xl"
            variant="primary"
          >
            Voir le code réduction (-910 €)
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
          <Button as="a" href="#verdict" size="xl" variant="outline">
            {SECONDARY_CTA}
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />6 mois d’incubation
            effectifs
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />5 Sprints terminés
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            Avis sans bonus secret
          </span>
        </div>
      </div>
    </section>
  );
}

function VerdictSection() {
  const points = [
    {
      icon: CheckCircleIcon,
      positive: true,
      text: 'Communauté très active, vraiment composée de solopreneurs investis (pas de touristes).',
    },
    {
      icon: CheckCircleIcon,
      positive: true,
      text: 'Format « atelier » du vendredi qui force le passage à l’action — tu repars avec un livrable.',
    },
    {
      icon: CheckCircleIcon,
      positive: true,
      text: 'Les Sprints mensuels (IA, sponsoring, podcast, offre) sont concrets et bien cadrés.',
    },
    {
      icon: ExclamationTriangleIcon,
      positive: false,
      text: 'Rythme intense : si tu n’as pas 1h/semaine garantie, tu décrocheras au bout de 6 semaines.',
    },
    {
      icon: ExclamationTriangleIcon,
      positive: false,
      text: 'Pas de période d’essai, pas de remboursement. Le format Sprint mensuel (990 € HT) reste l’alternative pour tester.',
    },
    {
      icon: ExclamationTriangleIcon,
      positive: false,
      text: 'Communauté hébergée sur Mighty Networks (pas Slack) — UX moyenne, à laquelle on s’habitue.',
    },
  ];

  return (
    <section id="verdict" className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Le verdict en 30 secondes
          </Text>
          <p className="text-neutral-500 dark:text-neutral-400">
            Ce que tu dois savoir avant d’acheter — le résumé qui m’aurait fait
            gagner du temps.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 md:p-8">
          <ul className="space-y-4">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-3">
                <p.icon
                  className={`mt-0.5 h-5 w-5 shrink-0 ${
                    p.positive ? 'text-accent' : 'text-destructive'
                  }`}
                />
                <span className="text-pretty text-sm leading-relaxed text-neutral-950 dark:text-neutral-200 md:text-base">
                  {p.text}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-lg border border-accent/30 bg-accent/10 p-4 text-sm leading-relaxed text-neutral-950 dark:text-neutral-200">
            <span className="font-semibold">Recommandé</span> si tu es déjà
            solopreneur actif, que tu veux construire un actif (newsletter,
            podcast, offre, SaaS, sponsoring) et que tu as 1 à 3 heures par
            semaine. <span className="font-semibold">À éviter</span> si tu
            cherches un cours vidéo passif ou si tu n’as pas le temps d’assister
            aux lives.
          </div>
        </div>
      </div>
    </section>
  );
}

function NotesParCriteresSection() {
  const criteria = [
    {
      label: 'Qualité de la communauté',
      score: 4.8,
      justification:
        '300+ incubés, noyau actif de 50–80 personnes très engagées. Bienveillance et exigence cohabitent.',
    },
    {
      label: 'Pertinence des Sprints',
      score: 4.7,
      justification:
        'Sprints mensuels concrets : IA & Claude, podcasting vidéo, sponsoring, offre, automation. Aucun Sprint gadget.',
    },
    {
      label: 'Animation des lives',
      score: 4.9,
      justification:
        'Format atelier exigeant. Flavie anime elle-même. Replays disponibles, peu de no-shows côté experts invités.',
    },
    {
      label: 'Rapport qualité-prix (tarif affilié)',
      score: 4.6,
      justification:
        '1 490 € HT pour 12 mois = ~125 €/mois. Excellent à ce tarif. Au prix public (2 400 €), la note descend à 3,8.',
    },
    {
      label: 'Passage à l’action / résultats',
      score: 4.4,
      justification:
        'Les résultats dépendent de toi, pas du programme. Le format pousse au shipping mais ne le garantit pas.',
    },
    {
      label: 'Support et accessibilité de Flavie',
      score: 4.5,
      justification:
        'Présente en live et dans la communauté. Réponses asynchrones rapides. Pas de mentorat 1:1 inclus.',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Notes par critères
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Mon évaluation sur les 6 dimensions qui pèsent vraiment dans la
            décision d’acheter. Notes sur 5, basées sur 6 mois d’incubation.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          {criteria.map((c, i) => (
            <div
              key={c.label}
              className={`grid grid-cols-1 gap-2 p-5 md:grid-cols-12 md:items-center md:gap-4 ${
                i !== criteria.length - 1 ? 'border-b border-border' : ''
              } bg-card`}
            >
              <div className="md:col-span-4">
                <Text
                  as="h3"
                  variant="p1"
                  className="font-semibold text-neutral-950 dark:text-neutral-100"
                >
                  {c.label}
                </Text>
              </div>
              <div className="flex items-center gap-3 md:col-span-3">
                <RatingStars rating={c.score} />
                <span className="text-base font-bold text-accent">
                  {c.score.toString().replace('.', ',')}/5
                </span>
              </div>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 md:col-span-5">
                {c.justification}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PointsFortsSection() {
  const items = [
    {
      icon: UsersIcon,
      title: 'Une communauté qui pousse vraiment au shipping',
      description:
        'Ce qui change, c’est le canal #mes-réussites : tu vois des incubés poster des livrables concrets chaque semaine. L’effet de pair pression rend ton propre report de tâche socialement coûteux.',
    },
    {
      icon: SparklesIcon,
      title: 'Des Sprints orientés actifs, pas formation passive',
      description:
        'Le Sprint Sponsoring m’a fait passer de 0 à 3 conversations sérieuses avec des sponsors en 4 semaines. Pas une heure de théorie : un cadre, des templates, des deadlines.',
    },
    {
      icon: RocketLaunchIcon,
      title: 'Lives du vendredi, format atelier',
      description:
        '« On monte un meuble Ikea ensemble. » Pas de live magistral, pas de blabla. Tu arrives avec ton projet, tu repars avec un livrable. C’est rare dans le paysage français.',
    },
    {
      icon: ScaleIcon,
      title: 'Rapport qualité-prix imbattable au tarif affilié',
      description:
        'À 1 490 € HT sur 12 mois, c’est ~125 €/mois. Aucun coach individuel sérieux n’est sous 800 €/mois. Et ici tu as la communauté en plus.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Experts invités vraiment expérimentés',
      description:
        'Sur 6 mois j’ai croisé des experts Notion, sponsoring, podcasting vidéo, IA appliquée. Pas des « gourous » : des praticiens qui montrent comment ils font, fichiers à l’appui.',
    },
    {
      icon: ClipboardDocumentCheckIcon,
      title: 'Pas de pression à l’upsell',
      description:
        'Aucun module premium caché, aucun mastermind à 5 000 € en option. Tu paies une fois, tu as accès à tout pendant un an. Rare, et appréciable.',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Ce qui marche vraiment
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Six points forts vérifiés sur 6 mois d’incubation, avec des exemples
            concrets de ce que ça a produit pour moi.
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

function PointsFaiblesSection() {
  const items = [
    {
      title: 'Pas de période d’essai, pas de remboursement',
      reality:
        'Tu paies les 12 mois en une fois (ou en mensualités), sans clause de retour. Si tu changes d’avis au bout de 2 semaines, tu perds la totalité.',
      mitigation:
        'Le Sprint mensuel à 990 € HT (1 mois) est l’alternative pour tester avant de basculer en formule annuelle. Demande à Flavie si la bascule est possible.',
    },
    {
      title: 'Rythme exigeant, décrochage rapide si tu manques 3 lives',
      reality:
        'Sans 1 à 3h par semaine, tu accumules le retard et la culpabilité. J’ai vu des incubés disparaître au bout de 2 mois.',
      mitigation:
        'Bloquer le vendredi 12h-13h dans ton agenda dès l’inscription. Si tu sais que tu n’as pas ce créneau, ne rejoins pas — repousse à la prochaine fenêtre.',
    },
    {
      title: 'Hébergement sur Mighty Networks (pas Slack)',
      reality:
        'UX correcte mais en-dessous de Slack ou Discord. Notifications parfois capricieuses, recherche médiocre, app mobile passable.',
      mitigation:
        'On s’y habitue en 2-3 semaines. Activer les notifs uniquement sur les canaux clés. Beaucoup d’échanges importants se font aussi en direct dans les lives.',
    },
    {
      title: 'Pas de mentorat 1:1 inclus',
      reality:
        'Flavie n’est pas dispo pour des sessions individuelles. Si tu cherches du coaching personnalisé, ce n’est pas le bon produit.',
      mitigation:
        'Les office hours et le canal #aide remplacent partiellement. Pour du 1:1, prévoir un budget complémentaire (coach externe).',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Ce qui peut décevoir
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Les quatre limites qu’on ne te dit pas sur la page de vente. Si
            elles sont rédhibitoires pour toi, passe ton chemin.
          </p>
        </div>

        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-3 flex items-start gap-3">
                <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <Text
                  variant="h4"
                  as="h3"
                  className="text-neutral-950 dark:text-neutral-100"
                >
                  {item.title}
                </Text>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                <span className="font-semibold text-neutral-950 dark:text-neutral-200">
                  La réalité&nbsp;:
                </span>{' '}
                {item.reality}
              </p>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                <span className="font-semibold text-accent">
                  Comment je gère&nbsp;:
                </span>{' '}
                {item.mitigation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceMoisParMoisSection() {
  const milestones = [
    {
      month: 'Mois 1',
      title: 'Onboarding et premier Sprint « Offre »',
      shipped:
        'Cartographie de mes offres actuelles, identification d’une offre productisée à tester.',
      learned:
        'La discipline du cadre Sprint (objectif clair, deadline, livrable) vaut 10 fois un cours sur la productivité.',
    },
    {
      month: 'Mois 2',
      title: 'Sprint IA & Claude',
      shipped:
        'Un agent IA documenté pour automatiser la préparation de mes podcasts.',
      learned:
        'Les promesses « IA pour solopreneur » sont souvent creuses. Ici, le cadre est utilitaire, pas hype.',
    },
    {
      month: 'Mois 3',
      title: 'Sprint Podcasting vidéo',
      shipped:
        'Relance de mon podcast au format vidéo, premier épisode publié après 18 mois de pause.',
      learned:
        'L’effet communauté est décisif. Annoncer son objectif dans #mes-réussites force à finir.',
    },
    {
      month: 'Mois 4',
      title: 'Sprint Sponsoring (« Sugar Daddy »)',
      shipped:
        '3 conversations sérieuses lancées avec des sponsors potentiels pour la newsletter.',
      learned:
        'Les templates et les retours d’expérience d’autres incubés font gagner des mois de tâtonnement.',
    },
    {
      month: 'Mois 5',
      title: 'Sprint Automation',
      shipped: 'Automatisation de mon pipeline de leads avec n8n + Notion.',
      learned:
        'Un Sprint en « binôme » avec un autre incubé multiplie la qualité du livrable.',
    },
    {
      month: 'Mois 6',
      title: 'Consolidation et préparation du prochain trimestre',
      shipped: 'Audit de mes actifs, planification des 6 mois suivants.',
      learned:
        'Le rythme mensuel finit par s’installer. Le risque, c’est de ne plus savoir ralentir.',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Mon expérience mois par mois
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Journal de bord des 6 premiers mois d’incubation. Ce que j’ai
            shippé, ce que j’ai appris. Pour que tu saches à quoi t’attendre.
          </p>
        </div>

        <div className="space-y-4">
          {milestones.map((m, i) => (
            <div
              key={m.month}
              className="relative rounded-xl border border-border bg-card p-6 md:pl-20"
            >
              <div className="mb-2 flex items-center gap-3 md:absolute md:left-6 md:top-6 md:mb-0 md:flex-col md:items-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-neutral-950 dark:text-neutral-200">
                  {i + 1}
                </div>
                <CalendarDaysIcon className="hidden h-5 w-5 text-accent md:block" />
              </div>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">
                {m.month}
              </div>
              <Text variant="h4" as="h3" className="mb-3">
                {m.title}
              </Text>
              <p className="mb-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                <span className="font-semibold text-neutral-950 dark:text-neutral-200">
                  Shippé&nbsp;:
                </span>{' '}
                {m.shipped}
              </p>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                <span className="font-semibold text-accent">Appris&nbsp;:</span>{' '}
                {m.learned}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparatifAlternativesSection() {
  const rows = [
    {
      name: 'Incubateur Solopreneur',
      prix: '1 490 € HT (affilié) / 2 400 € HT (public)',
      format: 'Communauté + Sprints mensuels',
      engagement: '1 à 3h / semaine sur 12 mois',
      verdict: 'Construire des actifs dans la durée avec un cercle de pairs',
      best: true,
    },
    {
      name: 'Bootcamp Marketing Mania',
      prix: '~1 000 à 1 500 € HT',
      format: 'Formation vidéo + cohorte limitée',
      engagement: '6 à 8 semaines intensives',
      verdict: 'Apprendre la persuasion écrite et le copywriting',
      best: false,
    },
    {
      name: 'Indé Hacker / communautés gratuites',
      prix: '0 €',
      format: 'Forums asynchrones',
      engagement: 'À la demande',
      verdict: 'Tester sans budget, mais sans cadre ni discipline',
      best: false,
    },
    {
      name: 'Suivre Flavie en gratuit (newsletter + podcast)',
      prix: '0 €',
      format: 'Contenus publics',
      engagement: 'Quelques heures / mois',
      verdict: 'Comprendre l’approche avant de payer, sans accès communauté',
      best: false,
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Comparatif avec les alternatives
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Les principales options si tu hésites entre l’Incubateur et un autre
            format. Comparatif honnête, sans straw-man.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b border-border bg-secondary">
              <tr>
                <th className="p-4 text-left font-medium text-neutral-950 dark:text-neutral-200">
                  Solution
                </th>
                <th className="p-4 text-left font-medium text-neutral-950 dark:text-neutral-200">
                  Prix
                </th>
                <th className="p-4 text-left font-medium text-neutral-950 dark:text-neutral-200">
                  Format
                </th>
                <th className="p-4 text-left font-medium text-neutral-950 dark:text-neutral-200">
                  Engagement
                </th>
                <th className="p-4 text-left font-medium text-neutral-950 dark:text-neutral-200">
                  Pour quoi
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.name}
                  className={`border-b border-border last:border-b-0 ${
                    r.best ? 'bg-accent/10' : 'bg-card'
                  }`}
                >
                  <td className="p-4 font-semibold text-neutral-950 dark:text-neutral-200">
                    {r.best && (
                      <CheckCircleIcon className="mr-2 inline h-4 w-4 text-accent" />
                    )}
                    {r.name}
                  </td>
                  <td className="p-4 text-neutral-500 dark:text-neutral-400">
                    {r.prix}
                  </td>
                  <td className="p-4 text-neutral-500 dark:text-neutral-400">
                    {r.format}
                  </td>
                  <td className="p-4 text-neutral-500 dark:text-neutral-400">
                    {r.engagement}
                  </td>
                  <td className="p-4 text-neutral-500 dark:text-neutral-400">
                    {r.verdict}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function AvisExternesSection() {
  const proofs = [
    {
      title: 'Marion — 2ᵉ année d’incubation',
      quote:
        "C'est ma deuxième année et avec le concept des Sprints mensuels, ma marge de progression est encore plus impressionnante.",
      source: 'Trustpilot',
    },
    {
      title: 'Incubée anonyme — post LinkedIn',
      quote:
        "Le live du vendredi est devenu mon rendez-vous business le plus utile de la semaine. Je n'aurais jamais structuré mon offre sans ça.",
      source: 'LinkedIn',
    },
    {
      title: 'Anne-Marie — call ambassadeur',
      quote:
        "À 1 200 € je le prends. Le lien d'affilié m'a fait gagner encore 200 € — c'est ce qui a déclenché l'achat.",
      source: 'Témoignage prospect',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Avis externes sur l’Incubateur Solopreneur
          </Text>
          <p className="text-neutral-500 dark:text-neutral-400">
            Témoignages publics extraits de Trustpilot, LinkedIn et des calls
            ambassadeurs.
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PourQuiSection() {
  const yes = [
    'Tu es déjà solopreneur en activité (freelance, créateur, SaaS solo, consultant).',
    'Tu veux construire un actif durable (newsletter, podcast, offre, sponsoring).',
    'Tu peux bloquer 1h le vendredi midi sans négociation possible.',
    'Tu cherches un cercle qui tient le rythme et qui te tire vers le haut.',
    'Tu veux un programme qui pousse au shipping, pas une formation vidéo de plus.',
  ];

  const no = [
    'Tu n’as encore aucune activité indépendante lancée.',
    'Tu veux un programme à consommer le dimanche en passif.',
    'Tu attends un coach personnel qui te tient la main 1:1.',
    'Tu refuses Mighty Networks et veux absolument du Slack/Discord.',
    'Tu cherches un raccourci pour faire 10 000 €/mois en 90 jours.',
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            L’Incubateur Solopreneur, c’est pour toi si…
          </Text>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
            <Text variant="h4" as="h3" className="mb-4 text-accent">
              ✓ Achète sans hésiter
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

function PrixEtCodeReductionSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Prix et code réduction
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Trois tarifs possibles selon comment tu rejoins l’Incubateur. Le
            tarif affilié est le plus bas verrouillé par Flavie.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-3 border-b border-border bg-secondary p-4 text-sm font-medium text-neutral-950 dark:text-neutral-200">
            <div>Tarif public</div>
            <div className="text-center">Remise VSL</div>
            <div className="text-center">Tarif affilié</div>
          </div>
          <div className="grid grid-cols-3 items-center bg-card p-6 text-center">
            <div>
              <div className="text-lg font-semibold text-neutral-500 line-through dark:text-neutral-400">
                2 400 € HT
              </div>
              <div className="mt-1 text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Page de vente
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold text-neutral-500 line-through dark:text-neutral-400">
                1 900 € HT
              </div>
              <div className="mt-1 text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Après VSL (3–4 jours)
              </div>
            </div>
            <div className="rounded-lg bg-accent/10 px-2 py-3">
              <div className="text-xl font-bold text-accent">1 490 € HT</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">
                Lien affilié
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            href={AFFILIATE_URL}
            as="a"
            size="lg"
            variant="primary"
            isExternalLink
            withExternalLinkIcon={false}
          >
            {CTA_LABEL}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
          <Button
            as="a"
            href={`${CODE_REDUCTION_URL}#comparatif`}
            size="lg"
            variant="outline"
          >
            Voir tous les tarifs
          </Button>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
          Divulgation&nbsp;: lien d’affiliation. Tu paies exactement le même
          prix (le plus bas du marché) qu’un client direct. Je touche une
          commission d’apporteur d’affaires, sans coût supplémentaire pour toi.
        </p>
      </div>
    </section>
  );
}

function DisclosureSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Text variant="h3" as="h2" className="mb-6 text-balance">
          Pourquoi je publie cet avis
        </Text>

        <div className="space-y-4 text-pretty leading-relaxed text-neutral-500 dark:text-neutral-400">
          <p>
            Je m’appelle David Leuliette, je suis solopreneur depuis 2016 et
            incubé chez{' '}
            <a
              href="/flavie-prevot-avis"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              Flavie Prevot
            </a>{' '}
            depuis 2025. J’ai payé l’Incubateur de ma poche, au tarif public en
            vigueur à l’époque. Personne ne m’a payé pour écrire cet avis.
          </p>
          <p>
            Après 6 mois, j’ai été invité à devenir ambassadeur — concrètement,
            je touche une commission d’apporteur d’affaires si tu rejoins via{' '}
            <a
              href={CODE_REDUCTION_URL}
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              mon lien d’affilié
            </a>
            . En contrepartie, tu paies le tarif le plus bas du marché (1 490 €
            HT au lieu de 2 400 € HT).
          </p>
          <p>
            Cet avis est volontairement structuré autour des{' '}
            <span className="font-semibold text-neutral-950 dark:text-neutral-200">
              points faibles autant que des points forts
            </span>
            . Si je trouve un sujet décevant dans les 6 prochains mois, je le
            mettrai à jour ici — la page est datée, les modifications visibles
            dans le commit history du site.
          </p>
          <p className="text-sm">
            Tu peux aussi acheter l’Incubateur au tarif public directement sur
            leboard.systeme.io. Le contenu et l’accès sont strictement
            identiques. Le seul intérêt de passer par cette page&nbsp;: 910 €
            d’économie immédiate.
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
              Verdict&nbsp;: recommandé, sous conditions
            </div>
            <Text variant="h2" as="h2" className="mb-6 text-balance">
              Prêt à rejoindre l’
              <span className="text-accent">Incubateur Solopreneur</span>
              &nbsp;?
            </Text>
            <p className="mx-auto mb-10 max-w-xl text-lg text-neutral-500 dark:text-neutral-400">
              Active le tarif affilié à 1&nbsp;490&nbsp;€ HT. Le prix le plus
              bas du marché, sans code à saisir.
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
                <CurrencyEuroIcon className="h-4 w-4 text-accent" />
                910&nbsp;€ d’économie immédiate
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheckIcon className="h-4 w-4 text-accent" />
                Paiement Systeme.io officiel
              </span>
              <span className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4 text-accent" />
                12 mois d’accès complet
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AvisIncubateurSolopreneurPage() {
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
        name: 'Avis Incubateur Solopreneur',
        item: 'https://weshipit.today/avis-incubateur-solopreneur',
      },
    ],
  };

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: 'Incubateur Solopreneur',
      brand: { '@type': 'Brand', name: 'Flavie Prevot' },
    },
    author: {
      '@type': 'Person',
      name: 'David Leuliette',
      url: 'https://weshipit.today',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(RATING_VALUE),
      bestRating: String(RATING_BEST),
      worstRating: '1',
    },
    reviewBody:
      "Avis vérifié sur l'Incubateur Solopreneur de Flavie Prevot après 6 mois d'incubation. Communauté très active, Sprints mensuels concrets, format atelier du vendredi exigeant. Recommandé pour les solopreneurs déjà en activité qui veulent construire des actifs durables — à éviter si tu cherches un cours vidéo passif ou si tu n'as pas 1h/semaine garantie.",
    datePublished: DATE_PUBLISHED,
  };

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href="https://weshipit.today/avis-incubateur-solopreneur"
        />
        <link
          rel="alternate"
          hrefLang="fr"
          href="https://weshipit.today/avis-incubateur-solopreneur"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://weshipit.today/avis-incubateur-solopreneur"
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      </Head>
      <Layout
        seoTitle="Avis Incubateur Solopreneur 2026 : mon retour honnête après 6 mois (4,6/5)"
        seoDescription="Avis vérifié sur l'Incubateur Solopreneur de Flavie Prevot après 6 mois d'incubation : points forts, limites, résultats concrets, comparatif avec les alternatives et code réduction à 1 490 € HT."
        ogImageTitle="Avis Incubateur Solopreneur 2026"
        ogImageAlt="Avis vérifié sur l'Incubateur Solopreneur de Flavie Prevot — 4,6/5"
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
        <VerdictSection />
        <NotesParCriteresSection />
        <PointsFortsSection />
        <PointsFaiblesSection />
        <ExperienceMoisParMoisSection />
        <ComparatifAlternativesSection />
        <AvisExternesSection />
        <PourQuiSection />
        <PrixEtCodeReductionSection />
        <DisclosureSection />

        <section id="faq" className="border-t border-border py-24">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-12 text-center">
              <Text variant="h3" as="h2" className="mb-4 text-balance">
                FAQ — Avis Incubateur Solopreneur
              </Text>
              <p className="text-neutral-500 dark:text-neutral-400">
                Les questions qu’on me pose le plus souvent avant de rejoindre.
              </p>
            </div>
            <Faq faqs={faqs} title="" headingId="faq-avis-heading" />
          </div>
        </section>

        <CtaFinalSection />
      </Layout>
    </>
  );
}
