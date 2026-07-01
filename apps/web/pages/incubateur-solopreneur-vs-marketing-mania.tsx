import { Button, Faq, Text } from '@weshipit/ui';

import {
  AcademicCapIcon,
  ArrowRightIcon,
  BoltIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  CurrencyEuroIcon,
  FireIcon,
  PencilSquareIcon,
  ScaleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import Head from 'next/head';
import { Layout } from '../components/layout';
import { linksApi } from './api/links';

const AFFILIATE_URL = linksApi.affiliate.INCUBATEUR_SOLOPRENEUR;
const AVIS_URL = '/avis-incubateur-solopreneur';
const CODE_REDUCTION_URL = '/code-reduction-solopreneur';
const FLAVIE_URL = '/flavie-prevot-avis';

const CTA_LABEL_SHORT = 'Voir le code réduction Incubateur';

const faqs = [
  {
    id: 'faq-vs-1',
    question:
      'Marketing Mania ou Incubateur Solopreneur : lequel choisir en 2026 ?',
    answer:
      'Si tu veux apprendre la persuasion écrite, le copywriting et les mécaniques marketing pointues (VSL, funnels, YouTube) : Marketing Mania de Stan Leloup. Si tu es déjà solopreneur en activité et que tu veux construire des actifs (newsletter, podcast, offre, sponsoring, SaaS solo) dans la durée avec un cercle de pairs qui pousse au shipping : Incubateur Solopreneur de Flavie Prevot. Les deux sont sérieux — le bon choix dépend de ton objectif, pas du prix.',
  },
  {
    id: 'faq-vs-2',
    question: 'Quelle est la différence principale entre les deux ?',
    answer:
      "Marketing Mania est un format formation (contenus structurés, cohorte intensive de quelques semaines, focus tactique marketing). L'Incubateur Solopreneur est un format communauté + Sprints mensuels sur 12 mois (rythme long, format atelier, focus construction d'actifs et passage à l'action). L'un t'apprend, l'autre te met en mouvement.",
  },
  {
    id: 'faq-vs-3',
    question: 'Combien coûte Marketing Mania ?',
    answer:
      'Le Bootcamp Marketing Mania est historiquement positionné autour de 1 000 à 1 500 € HT selon les éditions, avec des variantes en fonction des modules inclus (copywriting, YouTube, offres). Le tarif exact évolue à chaque nouvelle cohorte — vérifier sur la page officielle avant achat. Stan Leloup propose aussi des formations plus courtes et des ressources gratuites (chaîne YouTube).',
  },
  {
    id: 'faq-vs-4',
    question: "Combien coûte l'Incubateur Solopreneur ?",
    answer:
      "2 400 € HT au tarif public sur la page de vente, 1 900 € HT en remise VSL (3–4 jours après la vidéo), 1 490 € HT via lien affilié (le tarif plancher verrouillé par Flavie). Le tarif couvre 12 mois d'accès complet à la communauté, aux Sprints mensuels, aux lives et aux experts invités. Aucun upsell caché.",
  },
  {
    id: 'faq-vs-5',
    question: 'Combien de temps chaque programme prend-il ?',
    answer:
      "Marketing Mania : format bootcamp intensif, généralement 6 à 8 semaines avec un rythme dense (plusieurs heures par semaine). L'Incubateur Solopreneur : 12 mois avec un rythme modéré (1 à 3 heures par semaine, un live le vendredi, un Sprint par mois). Marketing Mania demande un sprint d'effort concentré, l'Incubateur demande de la régularité dans la durée.",
  },
  {
    id: 'faq-vs-6',
    question: 'Peut-on faire les deux ?',
    answer:
      "Oui, et c'est cohérent. Beaucoup d'incubés Solopreneur ont fait Marketing Mania avant (ou l'envisagent après). L'ordre logique : Marketing Mania d'abord pour poser les fondamentaux marketing (copywriting, persuasion, funnels), puis l'Incubateur pour appliquer ces fondamentaux à un actif construit dans la durée. Compte 3 000 à 4 000 € HT cumulés — investissement significatif mais pas déraisonnable si tu es solopreneur à temps plein.",
  },
  {
    id: 'faq-vs-7',
    question: 'Marketing Mania est-il adapté aux solopreneurs ?',
    answer:
      "Oui, mais pas seulement. Le Bootcamp attire des solopreneurs, des marketers en entreprise, des indépendants du service (agences, freelances) et des créateurs. Le focus reste sur la mécanique marketing / persuasion — moins sur le business creator complet. Si tu cherches un cadre solopreneur global (offre, sponsoring, communauté, positionnement), l'Incubateur est plus adapté.",
  },
  {
    id: 'faq-vs-8',
    question: 'L’Incubateur Solopreneur est-il adapté aux marketers ?',
    answer:
      "Partiellement. La communauté est composée majoritairement de solopreneurs en activité (créateurs, freelances, consultants, SaaS solo), pas de marketers en poste. Si tu es marketer employé qui prépare une transition, l'Incubateur reste utile pour la partie business / positionnement. Mais Marketing Mania sera plus dense sur les compétences techniques marketing.",
  },
  {
    id: 'faq-vs-8b',
    question:
      'Je suis développeur / builder — lequel choisir pour un effet levier ?',
    answer:
      "L'Incubateur Solopreneur, sans hésiter. Le programme contient des Sprints IA/Claude, Custom GPT’s, automation et SaaS solo — le tech est déjà dans le format, tu n'as qu'à l'appliquer. Un dev qui rejoint l'Incubateur obtient un effet 10x sur ces Sprints : ce qui prend 3 semaines à un non-dev te prend l'après-midi (mise en place d'un agent, déploiement d'un mini-SaaS, automation d'une chaîne d'outils). Marketing Mania reste utile pour la persuasion et le copywriting, mais son terrain n'est pas la construction tech.",
  },
  {
    id: 'faq-vs-9',
    question: 'Y a-t-il des alternatives à ces deux programmes ?',
    answer:
      "Oui : Livementor (formations multi-thématiques), Le Board (communauté leaders femmes), Solopreneur.fr (communauté gratuite), Copywriting Mafia et autres formations copywriting spécialisées. Chaque programme cible un profil légèrement différent. Marketing Mania et l'Incubateur Solopreneur restent parmi les plus reconnus du paysage FR pour leur qualité d'exécution.",
  },
  {
    id: 'faq-vs-10',
    question: 'Stan Leloup vs Flavie Prevot : quelle différence de style ?',
    answer:
      "Stan Leloup (Marketing Mania) : profil intellectuel, référence Cialdini, ton analytique, YouTube long-format, focus mécaniques de persuasion. Flavie Prevot (Incubateur Solopreneur) : profil entrepreneure-praticienne, ton direct et pragmatique, LinkedIn + podcast + lives, focus passage à l'action. Deux excellents opérateurs avec des styles très différents. La question n'est pas « qui est meilleur » mais « à quel style tu adhères ».",
  },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
          <ScaleIcon className="h-4 w-4" />
          Comparaison indépendante — Mise à jour 2026
        </div>

        <Text variant="h1" as="h1" className="mb-6 text-balance">
          <span className="text-accent">Incubateur Solopreneur</span> vs{' '}
          <span className="text-accent">Marketing Mania</span>&nbsp;: quelle
          formation solopreneur choisir en 2026&nbsp;?
        </Text>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-xl">
          Deux programmes phares du paysage francophone. L’Incubateur de{' '}
          <a
            href={FLAVIE_URL}
            className="font-semibold text-neutral-950 underline-offset-2 hover:underline dark:text-neutral-100"
          >
            Flavie Prevot
          </a>{' '}
          (communauté + Sprints sur 12 mois) et le Bootcamp de Stan Leloup
          (formation intensive marketing/copywriting). Comparaison honnête,
          critère par critère, sans straw-man.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button as="a" href="#verdict" size="xl" variant="primary">
            Le verdict en 30 secondes
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
          <Button as="a" href="#criteres" size="xl" variant="outline">
            Comparaison détaillée
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            Écrit par un incubé Solopreneur actif
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            Divulgation d’affiliation en clair
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            Aucun straw-man sur Marketing Mania
          </span>
        </div>
      </div>
    </section>
  );
}

function VerdictSection() {
  return (
    <section id="verdict" className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Le verdict en 30 secondes
          </Text>
          <p className="text-neutral-500 dark:text-neutral-400">
            La recommandation en trois lignes selon ton objectif.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
            <div className="mb-2 flex items-center gap-2">
              <PencilSquareIcon className="h-5 w-5 text-accent" />
              <Text variant="h4" as="h3" className="text-accent">
                Tu veux apprendre le marketing / copywriting → Marketing Mania
              </Text>
            </div>
            <p className="text-sm leading-relaxed text-neutral-950 dark:text-neutral-200">
              Le Bootcamp de Stan Leloup est un format concentré sur les
              mécaniques de persuasion, le copywriting, les funnels et YouTube.
              Idéal si tu veux monter en compétence technique sur ces sujets en
              6–8 semaines intensives.
            </p>
          </div>

          <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
            <div className="mb-2 flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-accent" />
              <Text variant="h4" as="h3" className="text-accent">
                Tu es déjà solopreneur et tu veux shipper → Incubateur
                Solopreneur
              </Text>
            </div>
            <p className="text-sm leading-relaxed text-neutral-950 dark:text-neutral-200">
              L’Incubateur de Flavie Prevot est un format communauté + Sprints
              mensuels sur 12 mois. Contenu tech dense (IA/Claude, Custom GPT’s,
              automation, SaaS solo) en plus des actifs classiques (newsletter,
              podcast, offre, sponsoring). Chaque vendredi, un actif construit
              en live avec un cercle de pairs qui te tient le rythme.
            </p>
          </div>

          <div className="rounded-xl border border-accent/40 bg-accent/5 p-6">
            <div className="mb-2 flex items-center gap-2">
              <BoltIcon className="h-5 w-5 text-accent" />
              <Text variant="h4" as="h3" className="text-accent">
                Tu es dev / builder → Incubateur, effet 10x
              </Text>
            </div>
            <p className="text-sm leading-relaxed text-neutral-950 dark:text-neutral-200">
              Marketing Mania est excellent mais reste axé
              marketing/copywriting. L’Incubateur, lui, contient des Sprints
              Custom GPT’s, IA, automation et SaaS solo — terrain où un dev
              applique immédiatement ce que les autres découvrent. Ton skill
              tech compose avec le programme : l’édition d’un agent IA ou d’un
              mini-SaaS te prend l’après-midi alors qu’elle prend 3 semaines à
              un non-dev.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-2 flex items-center gap-2">
              <FireIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
              <Text
                variant="h4"
                as="h3"
                className="text-neutral-950 dark:text-neutral-100"
              >
                Budget confortable ? Fais les deux dans le bon ordre
              </Text>
            </div>
            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              Marketing Mania d’abord pour poser les fondamentaux marketing,
              l’Incubateur ensuite pour les appliquer à un actif construit dans
              la durée. Compte 3 000 à 4 000 € HT cumulés.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function VueDensembleSection() {
  const products = [
    {
      name: 'Incubateur Solopreneur',
      by: 'Flavie Prevot',
      tagline: 'Communauté + Sprints mensuels sur 12 mois',
      format: 'Programme long, format atelier',
      price: '1 490 € HT (affilié) / 2 400 € HT (public)',
      duration: '12 mois',
      rythme: '1 à 3h / semaine',
      focus:
        'IA (Custom GPT’s, Claude), automation, SaaS solo, actifs (podcast, newsletter, sponsoring, offre)',
      icon: UsersIcon,
      accent: true,
    },
    {
      name: 'Bootcamp Marketing Mania',
      by: 'Stan Leloup',
      tagline: 'Formation intensive marketing / copywriting',
      format: 'Cohorte structurée, contenus vidéo',
      price: '~1 000 à 1 500 € HT (variable selon édition)',
      duration: '6 à 8 semaines',
      rythme: 'Intensif, plusieurs heures / semaine',
      focus: 'Copywriting, persuasion, funnels, YouTube',
      icon: AcademicCapIcon,
      accent: false,
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Les deux programmes en un coup d’œil
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Côte à côte, les faits essentiels avant d’entrer dans le détail
            critère par critère.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {products.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-2xl border p-6 md:p-8 ${
                p.accent
                  ? 'border-accent/40 bg-accent/5'
                  : 'border-border bg-card'
              }`}
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                  <p.icon className="h-6 w-6 text-accent" />
                </div>
                {p.accent && (
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                    Mon avis&nbsp;: recommandé pour les solopreneurs actifs
                  </span>
                )}
              </div>

              <Text variant="h4" as="h3" className="mb-1">
                {p.name}
              </Text>
              <div className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
                par {p.by}
              </div>
              <p className="mb-6 text-pretty text-sm leading-relaxed text-neutral-950 dark:text-neutral-200">
                {p.tagline}
              </p>

              <dl className="space-y-3 border-t border-border pt-6 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <dt className="font-medium text-neutral-500 dark:text-neutral-400">
                    Format
                  </dt>
                  <dd className="text-right text-neutral-950 dark:text-neutral-200">
                    {p.format}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="font-medium text-neutral-500 dark:text-neutral-400">
                    Prix
                  </dt>
                  <dd className="text-right text-neutral-950 dark:text-neutral-200">
                    {p.price}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="font-medium text-neutral-500 dark:text-neutral-400">
                    Durée
                  </dt>
                  <dd className="text-right text-neutral-950 dark:text-neutral-200">
                    {p.duration}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="font-medium text-neutral-500 dark:text-neutral-400">
                    Rythme
                  </dt>
                  <dd className="text-right text-neutral-950 dark:text-neutral-200">
                    {p.rythme}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="font-medium text-neutral-500 dark:text-neutral-400">
                    Focus
                  </dt>
                  <dd className="text-right text-neutral-950 dark:text-neutral-200">
                    {p.focus}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparaisonCriteresSection() {
  const criteria = [
    {
      icon: AcademicCapIcon,
      label: 'Objectif principal',
      incubateur:
        'Construire des actifs (newsletter, podcast, offre, sponsoring, SaaS) dans la durée.',
      marketingMania:
        'Monter en compétence sur les mécaniques marketing et le copywriting.',
    },
    {
      icon: ClockIcon,
      label: 'Format et rythme',
      incubateur: '12 mois, 1 à 3h/semaine, format atelier hebdomadaire.',
      marketingMania:
        '6 à 8 semaines, rythme intensif, cohorte structurée avec deadlines.',
    },
    {
      icon: UsersIcon,
      label: 'Communauté',
      incubateur:
        '300+ solopreneurs actifs, Mighty Networks, lives réguliers, canaux thématiques.',
      marketingMania:
        'Cohorte fermée pendant le Bootcamp, échanges asynchrones. Moins d’accès long terme.',
    },
    {
      icon: CurrencyEuroIcon,
      label: 'Prix',
      incubateur: '1 490 € HT (affilié) à 2 400 € HT (public) pour 12 mois.',
      marketingMania:
        '~1 000 à 1 500 € HT pour le Bootcamp, variable selon édition et modules.',
    },
    {
      icon: BoltIcon,
      label: 'Prise en charge (support)',
      incubateur:
        'Flavie anime elle-même, office hours, experts invités récurrents.',
      marketingMania:
        'Stan Leloup + équipe pédagogique pendant la cohorte, contenu vidéo structuré.',
    },
    {
      icon: ChartBarIcon,
      label: 'Résultats attendus',
      incubateur:
        'Actifs concrets construits sur 12 mois (podcast lancé, offre productisée, sponsors, etc.).',
      marketingMania:
        'Compétences marketing solides et applicables (copywriting, VSL, YouTube, funnels).',
    },
  ];

  return (
    <section id="criteres" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Comparaison détaillée, critère par critère
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Six dimensions qui font la différence dans la décision d’achat.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b border-border bg-secondary">
              <tr>
                <th className="p-4 text-left font-medium text-neutral-950 dark:text-neutral-200">
                  Critère
                </th>
                <th className="p-4 text-left font-medium text-neutral-950 dark:text-neutral-200">
                  Incubateur Solopreneur
                </th>
                <th className="p-4 text-left font-medium text-neutral-950 dark:text-neutral-200">
                  Marketing Mania
                </th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((c, i) => (
                <tr
                  key={c.label}
                  className={`border-b border-border last:border-b-0 bg-card`}
                >
                  <td className="p-4 align-top">
                    <div className="flex items-center gap-2">
                      <c.icon className="h-5 w-5 shrink-0 text-accent" />
                      <span className="font-semibold text-neutral-950 dark:text-neutral-200">
                        {c.label}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 align-top text-neutral-950 dark:text-neutral-200">
                    {c.incubateur}
                  </td>
                  <td className="p-4 align-top text-neutral-500 dark:text-neutral-400">
                    {c.marketingMania}
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

function CasDUsageSection() {
  const cases = [
    {
      persona: 'Dev solopreneur / builder (SaaS solo, agents IA, automation)',
      recommend: 'Incubateur Solopreneur (effet 10x)',
      why: 'Les Sprints IA/Claude, Custom GPT’s, automation et SaaS solo sont ton terrain de jeu. Là où les autres galèrent à comprendre l’outil, tu ships. Marketing Mania t’apprendra la persuasion, mais l’Incubateur te donne le contexte pour appliquer ton edge tech — et le format « un actif par vendredi » colle exactement à la façon dont un dev construit.',
      accent: true,
    },
    {
      persona: 'Freelance senior qui veut productiser',
      recommend: 'Incubateur Solopreneur',
      why: 'Le format Sprint « Offre » + la communauté de solopreneurs qui ont déjà productisé accélère la décision. Marketing Mania t’apprendra les tactiques, mais pas comment bâtir la brique.',
      accent: true,
    },
    {
      persona: 'Créateur YouTube ou copywriter en devenir',
      recommend: 'Marketing Mania',
      why: 'Le Bootcamp couvre exactement ces compétences avec un niveau technique élevé. L’Incubateur ne traite pas YouTube à ce niveau de profondeur.',
      accent: false,
    },
    {
      persona: 'Solopreneur avec podcast ou newsletter à lancer / relancer',
      recommend: 'Incubateur Solopreneur',
      why: 'Les Sprints Podcasting vidéo, Sponsoring et Newsletter sont explicitement conçus pour ce cas. La communauté ajoute la pair pression qui fait passer à l’action.',
      accent: true,
    },
    {
      persona: 'Marketer employé qui prépare une transition freelance',
      recommend: 'Marketing Mania (puis Incubateur)',
      why: 'Consolide d’abord tes compétences marketing avec le Bootcamp, puis rejoins l’Incubateur une fois freelance pour l’aspect construction de business creator.',
      accent: false,
    },
    {
      persona: 'Consultant / agence qui veut lever la tête du guidon',
      recommend: 'Incubateur Solopreneur',
      why: 'Le format « 1h le vendredi » forcée dans l’agenda, la communauté et le focus « sortir du modèle 100% TJM » collent exactement à ce cas.',
      accent: true,
    },
    {
      persona: 'Curieux qui veut tester avant de s’engager',
      recommend: 'Ni l’un ni l’autre — canaux gratuits d’abord',
      why: 'Newsletter et podcast de Flavie (gratuit) + chaîne YouTube de Stan (gratuit) pendant 2–3 mois. Ça te donne une vraie base pour décider. Voir aussi mon avis détaillé après 6 mois d’incubation.',
      accent: false,
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Six cas d’usage concrets
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Selon ton profil, la recommandation ne sera pas la même. Voici les
            cas les plus fréquents.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {cases.map((c) => (
            <div
              key={c.persona}
              className={`rounded-xl border p-6 ${
                c.accent
                  ? 'border-accent/30 bg-accent/5'
                  : 'border-border bg-card'
              }`}
            >
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                {c.persona}
              </div>
              <div className="mb-3 flex items-center gap-2">
                <CheckCircleIcon
                  className={`h-5 w-5 ${
                    c.accent
                      ? 'text-accent'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                />
                <Text
                  variant="h4"
                  as="h3"
                  className={c.accent ? 'text-accent' : ''}
                >
                  {c.recommend}
                </Text>
              </div>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {c.why}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PointsCommunsSection() {
  const commons = [
    'Créés par des opérateurs sérieux avec traction publique vérifiable (newsletter, podcast, YouTube).',
    'Prix positionnés dans une fourchette compatible avec un investissement solopreneur (1 000 à 2 500 € HT).',
    'Contenu enseigné directement par le fondateur, pas délégué à une équipe anonyme.',
    'Aucune promesse irréaliste de revenus. Focus sur les compétences et la méthode, pas sur les résultats magiques.',
    'Programmes d’affiliation ou partenariats propres et transparents.',
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Ce qu’ils ont en commun
          </Text>
          <p className="text-neutral-500 dark:text-neutral-400">
            Les points d’alignement des deux programmes — utiles à retenir avant
            de comparer.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 md:p-8">
          <ul className="space-y-4">
            {commons.map((c, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm leading-relaxed text-neutral-950 dark:text-neutral-200 md:text-base">
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function LesDeuxSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Peut-on faire les deux&nbsp;?
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Oui, et c’est même un enchaînement logique — si tu as le budget.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
              Étape 1
            </div>
            <Text variant="h4" as="h3" className="mb-2">
              Marketing Mania
            </Text>
            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              Fondamentaux marketing solides en 6–8 semaines. Copywriting,
              persuasion, funnels. Compétence transférable à tout actif que tu
              construiras ensuite.
            </p>
          </div>
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
              Étape 2
            </div>
            <Text variant="h4" as="h3" className="mb-2">
              Incubateur Solopreneur
            </Text>
            <p className="text-sm leading-relaxed text-neutral-950 dark:text-neutral-200">
              Application dans la durée sur 12 mois. Communauté, Sprints,
              lives-ateliers. Là où tu poses les briques d’un actif réel avec
              une pair pression positive.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
              Budget total
            </div>
            <Text variant="h4" as="h3" className="mb-2">
              ~3 000 à 4 000 € HT
            </Text>
            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              Avec le tarif affilié Incubateur (1 490 € HT), le combo devient
              nettement plus digeste. Reste un investissement sérieux — à caler
              avec ton chiffre d’affaires actuel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecommandationSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Text variant="h3" as="h2" className="mb-6 text-balance">
          Ma recommandation finale
        </Text>

        <div className="space-y-4 text-pretty leading-relaxed text-neutral-500 dark:text-neutral-400">
          <p>
            Les deux programmes sont sérieux. Ils ne s’adressent simplement pas
            au même besoin.
          </p>
          <p>
            <span className="font-semibold text-neutral-950 dark:text-neutral-200">
              Si tu es déjà solopreneur en activité et que ton problème n’est
              pas « je ne sais pas écrire une bonne page de vente » mais « je
              n’avance pas sur mes actifs »
            </span>{' '}
            → l’Incubateur Solopreneur de{' '}
            <a
              href={FLAVIE_URL}
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              Flavie Prevot
            </a>{' '}
            est plus adapté. C’est mon cas, et c’est ce que j’ai choisi. Tu peux
            lire mon{' '}
            <a
              href={AVIS_URL}
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              avis détaillé après 6 mois d’incubation
            </a>{' '}
            avant de te décider.
          </p>
          <p>
            <span className="font-semibold text-neutral-950 dark:text-neutral-200">
              Si ton problème est technique et marketing (copywriting, VSL,
              YouTube, funnels)
            </span>{' '}
            → Marketing Mania de Stan Leloup te fera gagner plus de temps. C’est
            un excellent produit dans son créneau, avec une base gratuite (sa
            chaîne YouTube) qui te permet de goûter au style avant d’acheter.
          </p>
          <p>
            <span className="font-semibold text-neutral-950 dark:text-neutral-200">
              Si tu as le budget et l’envie
            </span>{' '}
            → fais les deux dans cet ordre : Marketing Mania d’abord (sprint
            court, tu poses les fondamentaux), Incubateur ensuite (durée longue,
            tu appliques). C’est l’enchaînement qui rentabilise le mieux
            l’investissement.
          </p>
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
          Pourquoi et comment j’ai écrit ce comparatif
        </Text>

        <div className="space-y-4 text-pretty leading-relaxed text-neutral-500 dark:text-neutral-400">
          <p>
            Je m’appelle David Leuliette, solopreneur depuis 2016 et incubé chez{' '}
            <a
              href={FLAVIE_URL}
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              Flavie Prevot
            </a>{' '}
            depuis 2025. J’ai également suivi les contenus gratuits de Stan
            Leloup pendant plusieurs années (YouTube, podcast, articles). Je
            n’ai pas fait le Bootcamp Marketing Mania — le comparatif s’appuie
            sur ses contenus publics, le programme officiel et les retours
            d’anciens élèves recueillis dans les communautés francophones.
          </p>
          <p>
            <span className="font-semibold text-neutral-950 dark:text-neutral-200">
              Divulgation d’affiliation.
            </span>{' '}
            Je suis ambassadeur affilié de l’Incubateur Solopreneur. Si tu
            rejoins via{' '}
            <a
              href={CODE_REDUCTION_URL}
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              mon lien
            </a>
            , je touche une commission — sans surcoût pour toi (au contraire, tu
            paies le tarif plancher). Je ne suis pas affilié Marketing Mania ni
            Stan Leloup — aucun lien financier, aucune commission.
          </p>
          <p>
            Cela crée un biais potentiel en faveur de l’Incubateur. J’ai
            volontairement structuré le comparatif pour recommander Marketing
            Mania à chaque fois qu’il est objectivement mieux adapté (voir la
            section « Cas d’usage »). Si un point te semble unfair, dis-le moi —
            je mets à jour la page.
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
              <ScaleIcon className="h-4 w-4" />
              Décision facilitée
            </div>
            <Text variant="h2" as="h2" className="mb-6 text-balance">
              Ton choix est fait&nbsp;? Prochaine étape.
            </Text>
            <p className="mx-auto mb-10 max-w-xl text-lg text-neutral-500 dark:text-neutral-400">
              Si tu penches pour l’Incubateur Solopreneur, active le tarif
              affilié à 1&nbsp;490&nbsp;€ HT (910&nbsp;€ d’économie).
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                as="a"
                href={CODE_REDUCTION_URL}
                size="xxl"
                variant="primary"
              >
                {CTA_LABEL_SHORT}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
              <Button as="a" href={AVIS_URL} size="xxl" variant="outline">
                Lire l’avis Incubateur (6 mois)
              </Button>
            </div>

            <p className="mt-8 text-xs text-neutral-500 dark:text-neutral-400">
              Pas encore décidé ? Regarde la chaîne YouTube de Stan Leloup et la
              newsletter de Flavie Prevot pendant 2–3 mois. Meilleur test.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function IncubateurVsMarketingManiaPage() {
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
        name: 'Incubateur Solopreneur vs Marketing Mania',
        item: 'https://weshipit.today/incubateur-solopreneur-vs-marketing-mania',
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Incubateur Solopreneur vs Marketing Mania : quelle formation solopreneur choisir en 2026 ?',
    author: {
      '@type': 'Person',
      name: 'David Leuliette',
      url: 'https://weshipit.today',
    },
    datePublished: '2026-07-01',
    dateModified: '2026-07-01',
    description:
      "Comparaison indépendante entre l'Incubateur Solopreneur de Flavie Prevot et le Bootcamp Marketing Mania de Stan Leloup : format, prix, rythme, communauté, résultats attendus. Recommandation par cas d'usage.",
    about: [
      { '@type': 'Thing', name: 'Incubateur Solopreneur' },
      { '@type': 'Thing', name: 'Marketing Mania' },
      { '@type': 'Thing', name: 'Formation solopreneur' },
    ],
  };

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href="https://weshipit.today/incubateur-solopreneur-vs-marketing-mania"
        />
        <link
          rel="alternate"
          hrefLang="fr"
          href="https://weshipit.today/incubateur-solopreneur-vs-marketing-mania"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://weshipit.today/incubateur-solopreneur-vs-marketing-mania"
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>
      <Layout
        seoTitle="Incubateur Solopreneur vs Marketing Mania : quelle formation choisir en 2026 ?"
        seoDescription="Comparaison indépendante entre l'Incubateur Solopreneur (Flavie Prevot) et le Bootcamp Marketing Mania (Stan Leloup) : format, prix, rythme, communauté, résultats. Recommandation par cas d'usage."
        ogImageTitle="Incubateur Solopreneur vs Marketing Mania"
        ogImageAlt="Comparaison Incubateur Solopreneur vs Bootcamp Marketing Mania — quelle formation choisir en 2026 ?"
        locale="fr_FR"
        withHeader
        withFooter
        callToActionButton={{
          name: CTA_LABEL_SHORT,
          href: CODE_REDUCTION_URL,
        }}
      >
        <HeroSection />
        <VerdictSection />
        <VueDensembleSection />
        <ComparaisonCriteresSection />
        <CasDUsageSection />
        <PointsCommunsSection />
        <LesDeuxSection />
        <RecommandationSection />
        <DisclosureSection />

        <section id="faq" className="border-t border-border py-24">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-12 text-center">
              <Text variant="h3" as="h2" className="mb-4 text-balance">
                FAQ — Incubateur Solopreneur vs Marketing Mania
              </Text>
              <p className="text-neutral-500 dark:text-neutral-400">
                Les questions qu’on me pose le plus souvent entre ces deux
                programmes.
              </p>
            </div>
            <Faq faqs={faqs} title="" headingId="faq-vs-heading" />
          </div>
        </section>

        <CtaFinalSection />
      </Layout>
    </>
  );
}
