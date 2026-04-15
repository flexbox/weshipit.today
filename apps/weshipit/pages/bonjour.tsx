import {
  Card,
  Text,
  FadeIn,
  Button,
  Section,
  ClientsListHomepage,
  Faq,
} from '@weshipit/ui';

import { Customer, getVisibleClients } from './api/client';
import { getAllFeedback, FeedbackPrismicDocument } from './api/feedback';
import { motion } from 'framer-motion';
import {
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Head from 'next/head';
import { PrismicRichText, PrismicText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import { Layout } from '../components/layout';
import { linksApi } from './api/links';

interface BonjourPageProps {
  clients: Customer[];
  feedback: FeedbackPrismicDocument[];
}

const CTA_LABEL = 'Prendre un premier mois';

function StickyCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-3 px-4 sm:hidden">
      <Button
        href={linksApi.cal.ONBOARDING}
        as="a"
        size="xl"
        variant="primary"
        isExternalLink
        withExternalLinkIcon={false}
        className="w-full justify-center"
      >
        {CTA_LABEL} &rarr;
      </Button>
    </div>
  );
}

// SECTION 1: HOOK — ATTENTION
function HeroSection() {
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2016;

  return (
    <div className="mx-auto max-w-3xl text-center py-12 lg:py-24">
      <Text variant="h2" as="h1">
        Si ton app React Native devient plus lente à chaque feature… ce n'est
        pas normal.
      </Text>

      <div className="my-8 aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <p className="text-slate-400 text-lg">[Vidéo VSL — 16:9]</p>
      </div>

      <Text
        variant="p1"
        as="p"
        className="text-slate-600 dark:text-slate-400 mb-4 max-w-2xl mx-auto"
      >
        Une bonne app devient plus rapide à faire évoluer avec le temps. La
        tienne te ralentit. Et ça te coûte déjà des users, du temps et du cash.
      </Text>
      <Text
        variant="p2"
        as="p"
        className="text-slate-500 dark:text-slate-500 mb-8 max-w-xl mx-auto"
      >
        Je m'appelle David. Ça fait {yearsOfExperience} ans que je travaille
        uniquement sur React Native. Aujourd'hui, j'aide des scale-ups à faire
        une chose simple : shipper. Tous les jours.
      </Text>

      <Button
        href={linksApi.cal.ONBOARDING}
        as="a"
        size="xxl"
        variant="primary"
        isExternalLink
        withExternalLinkIcon={false}
        className="mx-auto justify-center"
      >
        {CTA_LABEL} &rarr;
      </Button>
    </div>
  );
}

// SECTION 2: PROBLÈME
function ProblemeSection() {
  const symptoms = [
    'Chaque feature prend plus de temps que la précédente',
    "Les bugs s'accumulent",
    'Personne ne sait vraiment pourquoi ça casse',
    "Tes devs n'ont même plus envie de travailler dessus",
  ];

  return (
    <div className="py-20 max-w-3xl mx-auto">
      <Text variant="h3" as="h2" className="mb-4 text-center">
        Le problème, ce n'est pas ton équipe. C'est ton app.
      </Text>
      <ul className="space-y-4 mt-8">
        {symptoms.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <XMarkIcon className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
            <Text variant="p1" as="span">
              {item}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}

// SECTION 3: POURQUOI
function PourquoiSection() {
  const causes = [
    'Des dépendances jamais mises à jour',
    'Des librairies incohérentes',
    'Zéro observabilité',
  ];

  return (
    <div className="py-20 max-w-3xl mx-auto">
      <Text variant="h3" as="h2" className="mb-4 text-center">
        Ce que personne ne te dit
      </Text>
      <Text
        variant="p1"
        as="p"
        className="text-slate-600 dark:text-slate-400 text-center mb-8"
      >
        Ton app ne ralentit pas par hasard. Tu accumules :
      </Text>
      <ul className="space-y-3 mb-8">
        {causes.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 shrink-0 mt-0.5" />
            <Text variant="p1" as="span">
              {item}
            </Text>
          </li>
        ))}
      </ul>
      <Card className="text-center">
        <Text variant="p1" as="p" className="font-semibold mb-2">
          Résultat : tu ne maîtrises plus rien.
        </Text>
        <Text
          variant="p2"
          as="p"
          className="text-slate-500 dark:text-slate-400"
        >
          Vendredi soir. Release prévue. Tout casse. Et tu n'as plus que deux
          options : rebuild from scratch ou patcher en espérant que ça tienne.
          Dans les deux cas, tu brûles du cash.
        </Text>
      </Card>
    </div>
  );
}

// SECTION 4: AUTORITÉ
function AutoriteSection() {
  const results = [
    {
      metric: '90%',
      label: 'de réutilisation de code',
      detail:
        'Architecture designée chez Malo — onboarding rapide, coût technique réduit',
    },
    {
      metric: '100%',
      label: 'des releases automatisées',
      detail: 'Shipping continu pendant 5 ans sur des projets complexes',
    },
    {
      metric: 'IoT',
      label: 'offline-first, apps complexes',
      detail:
        'Des apps qui tournent dans des environnements hostiles, sans réseau',
    },
  ];

  return (
    <div className="py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Text variant="h3" as="h2" className="mb-4">
          J'ai vu ça des dizaines de fois.
        </Text>
        <Text
          variant="p1"
          as="p"
          className="text-slate-600 dark:text-slate-400"
        >
          Je ne fais pas du code. Je règle des problèmes de vélocité.
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {results.map((item) => (
          <FadeIn key={item.label}>
            <Card className="h-full text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">
                {item.metric}
              </p>
              <Text variant="p1" as="p" className="font-semibold mb-2">
                {item.label}
              </Text>
              <Text
                variant="p2"
                as="p"
                className="text-slate-500 dark:text-slate-400"
              >
                {item.detail}
              </Text>
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

// SECTION 5: SOLUTION + MÉTHODE
function MethodeSection() {
  const steps = [
    {
      number: 1,
      title: 'Fondations',
      description: 'On identifie ce qui bloque. On nettoie.',
      items: [
        "Audit des dépendances et de l'architecture",
        'Suppression du code mort et des librairies inutiles',
        'Mise à jour des versions critiques',
      ],
    },
    {
      number: 2,
      title: 'Écosystème',
      description: 'On met en place les outils pour ship.',
      items: [
        'Observabilité (crash reports, performance monitoring)',
        'Tests automatisés sur les chemins critiques',
        'CI/CD pour déployer sans stress',
      ],
    },
    {
      number: 3,
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
    <div className="py-20">
      <div className="text-center max-w-3xl mx-auto mb-4">
        <Text variant="h3" as="h2" className="mb-4">
          Je prends ton app et je la transforme en machine à shipper.
        </Text>
        <Text
          variant="p1"
          as="p"
          className="text-slate-600 dark:text-slate-400"
        >
          Pas dans 6 mois. Maintenant.
        </Text>
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-4 text-lg">
          <span className="text-slate-400 line-through">
            "on espère que ça passe"
          </span>
          <span className="text-2xl">&rarr;</span>
          <span className="font-bold text-blue-600">"on ship aujourd'hui"</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step) => (
          <FadeIn key={step.number}>
            <Card className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">
                  {step.number}
                </span>
                <Text variant="p1" as="h3" className="font-bold">
                  {step.title}
                </Text>
              </div>
              <Text
                variant="p2"
                as="p"
                className="text-slate-600 dark:text-slate-400 mb-4"
              >
                {step.description}
              </Text>
              <ul className="space-y-2 flex-grow">
                {step.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

// SECTION 6: OFFRE + GARANTIE
function OffreSection() {
  return (
    <div className="py-20 max-w-3xl mx-auto text-center">
      <Text variant="h3" as="h2" className="mb-4">
        5k par mois. C'est tout.
      </Text>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8 text-left">
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <CheckIcon className="h-5 w-5 text-green-500" />
            <span className="font-semibold">Pas de contrat long</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Tu prends un mois. On ship. Tu continues si ça fonctionne.
          </p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <CheckIcon className="h-5 w-5 text-green-500" />
            <span className="font-semibold">Pas d'engagement</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Pause ou annule quand tu veux. Le code t'appartient à 100%.
          </p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <CheckIcon className="h-5 w-5 text-green-500" />
            <span className="font-semibold">Pas de remboursement</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Si ça ne fonctionne pas, tu arrêtes. Simple.
          </p>
        </Card>
      </div>

      <Button
        href={linksApi.stripe.MONTHLY_PLAN}
        as="a"
        size="xxl"
        variant="primary"
        isExternalLink
        withExternalLinkIcon={false}
        className="mx-auto justify-center"
      >
        {CTA_LABEL} &rarr;
      </Button>
    </div>
  );
}

// SECTION 7: LOGIQUE
function LogiqueSection() {
  const rows = [
    {
      label: 'Coût',
      sans: 'Dev senior en CDI : 60-90k €/an + charges',
      avec: '5 000 €/mois, sans engagement',
    },
    {
      label: 'Délai premier impact',
      sans: '3-6 mois de recrutement + onboarding',
      avec: 'Première semaine',
    },
    {
      label: 'Risque',
      sans: 'Mauvais recrutement = 6 mois perdus',
      avec: 'Tu arrêtes si ça ne marche pas',
    },
    {
      label: 'Résultat',
      sans: 'Un dev de plus dans une app qui ralentit',
      avec: 'Une app qui ship tous les jours',
    },
  ];

  return (
    <div className="py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Text variant="h3" as="h2" className="mb-4">
          Combien ça te coûte de continuer comme ça ?
        </Text>
        <div className="flex flex-col sm:flex-row justify-center gap-8 mt-8 mb-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600">-50%</p>
            <p className="text-sm text-slate-500 mt-1">de temps de dev</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600">+35%</p>
            <p className="text-sm text-slate-500 mt-1">
              de rétention utilisateur
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="py-4 px-4 font-medium text-slate-500"></th>
              <th className="py-4 px-4 text-center font-medium text-slate-500">
                Sans nous
              </th>
              <th className="py-4 px-4 text-center font-semibold text-blue-600">
                Avec weshipit.today
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-slate-100 dark:border-slate-800"
              >
                <td className="py-4 px-4 font-medium text-slate-900 dark:text-white">
                  {row.label}
                </td>
                <td className="py-4 px-4 text-center text-slate-600 dark:text-slate-400">
                  {row.sans}
                </td>
                <td className="py-4 px-4 text-center font-semibold text-slate-900 dark:text-white bg-blue-50/50 dark:bg-blue-900/10">
                  {row.avec}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// SECTION 8: URGENCE + RARETÉ
function UrgenceSection() {
  return (
    <div className="py-20 max-w-3xl mx-auto text-center">
      <Text variant="h3" as="h2" className="mb-8">
        Chaque semaine sans agir te coûte
      </Text>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Card>
          <p className="text-3xl font-bold text-red-500 mb-2">40%</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            des users désinstallent une app instable chaque semaine
          </p>
        </Card>
        <Card>
          <p className="text-3xl font-bold text-red-500 mb-2">+</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Tes concurrents shippent pendant que ton app vieillit
          </p>
        </Card>
        <Card>
          <p className="text-3xl font-bold text-red-500 mb-2">$$$</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Ta dette technique augmente chaque jour
          </p>
        </Card>
      </div>
      <Card className="inline-block">
        <Text variant="p1" as="p" className="font-bold">
          On prend 3 clients max. Il reste une place.
        </Text>
      </Card>
    </div>
  );
}

// SECTION 9: TÉMOIGNAGES
function Reassurance({ feedback }: { feedback: FeedbackPrismicDocument[] }) {
  return (
    <section id="testimonials" className="py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Text variant="h3" as="h2" className="mb-4">
          Ils ont transformé leur app avec nous
        </Text>
        <Text
          variant="p1"
          as="p"
          className="text-slate-600 dark:text-slate-400"
        >
          Des apps lentes devenues des plateformes scalables. Des années de
          releases automatisées. Des projets complexes livrés sans ralentir.
        </Text>
      </div>

      <div className="flex overflow-x-auto gap-8 pb-4 justify-start">
        {feedback.map((item) => (
          <Card key={item.id} className="border-none max-w-md min-w-[350px]">
            <div className="pt-6 flex flex-col h-full">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIconSolid key={i} className="h-5 w-5 text-yellow-500" />
                ))}
              </div>
              <div className="prose prose-slate dark:prose-invert text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                <PrismicRichText field={item.data.review} />
              </div>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
                <PrismicNextImage
                  field={item.data.avatar}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 object-cover"
                  imgixParams={{ fit: 'crop', ar: '1:1' }}
                />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    <PrismicText field={item.data.full_name} />
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <PrismicText field={item.data.job_title} />,{' '}
                    <PrismicText field={item.data.company} />
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

// CTA FINAL
function CtaFinal() {
  return (
    <div className="mx-auto max-w-4xl py-16 mb-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Card
          className="flex flex-col items-center justify-center gap-6 overflow-hidden relative text-center"
          variant="gradient-blue"
        >
          <motion.div
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-600/30 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: 'easeInOut',
            }}
          />

          <Text
            variant="h4"
            as="h2"
            className="bg-gradient-to-b from-white to-white/75 bg-clip-text font-bold tracking-tight text-transparent drop-shadow"
          >
            Je ne promets pas du code. Je promets du shipping.
          </Text>
          <Text
            variant="p1"
            as="p"
            className="bg-gradient-to-b from-white to-white/75 bg-clip-text tracking-tight text-transparent drop-shadow max-w-xl"
          >
            Prends un premier mois. Et vois par toi-même si ton app peut enfin
            ship.
          </Text>

          <Button
            href={linksApi.stripe.MONTHLY_PLAN}
            size="xxl"
            variant="outline"
            as="a"
            isExternalLink
            withExternalLinkIcon={false}
            className="mx-auto"
          >
            {CTA_LABEL} &rarr;
          </Button>

          <div className="flex flex-col sm:flex-row gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1">
              <CheckIcon className="h-4 w-4" /> Sans engagement
            </span>
            <span className="flex items-center gap-1">
              <CheckIcon className="h-4 w-4" /> 3 clients max
            </span>
            <span className="flex items-center gap-1">
              <CheckIcon className="h-4 w-4" /> Le code t'appartient
            </span>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

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

export default function BonjourPage({ clients, feedback }: BonjourPageProps) {
  /** @type {import('schema-dts').FAQPage} */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
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
        <StickyCta />

        {/* HOOK — ATTENTION */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <HeroSection />
          </FadeIn>
        </div>

        {/* PROBLÈME */}
        <Section variant="transparent" className="py-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ProblemeSection />
          </div>
        </Section>

        {/* POURQUOI */}
        <div className="bg-slate-50 dark:bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <PourquoiSection />
          </div>
        </div>

        {/* AUTORITÉ */}
        <Section variant="transparent" className="py-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <AutoriteSection />
          </div>
        </Section>

        {/* TÉMOIGNAGES + CLIENTS */}
        <div className="bg-slate-50 dark:bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reassurance feedback={feedback} />
          </div>
        </div>
        <div className="py-16 dark:bg-slate-900">
          <ClientsListHomepage clients={clients} />
        </div>

        {/* SOLUTION + MÉTHODE */}
        <Section variant="transparent" className="py-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <MethodeSection />
          </div>
        </Section>

        {/* OFFRE + GARANTIE */}
        <div className="bg-slate-50 dark:bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <OffreSection />
          </div>
        </div>

        {/* LOGIQUE — Comparaison */}
        <Section variant="transparent" className="py-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <LogiqueSection />
          </div>
        </Section>

        {/* URGENCE + RARETÉ */}
        <div className="bg-slate-50 dark:bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <UrgenceSection />
          </div>
        </div>

        {/* FAQ */}
        <Section variant="transparent" className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <section
              id="faq"
              className="my-0 py-8"
              aria-labelledby="faq-fr-heading"
            >
              <div className="max-w-4xl mx-auto">
                <Faq
                  faqs={faqs}
                  title="Questions fréquentes"
                  headingId="faq-fr-heading"
                />
              </div>
            </section>
          </div>
        </Section>

        {/* CTA FINAL */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <CtaFinal />
        </div>

        {/* Bottom padding for sticky CTA on mobile */}
        <div className="h-20 sm:hidden" />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const [{ clients }, { feedback }] = await Promise.all([
    getVisibleClients(),
    getAllFeedback(),
  ]);

  return {
    props: {
      clients: clients ?? [],
      feedback: feedback ?? [],
    },
  };
}
