import {
  Card,
  Prose,
  Text,
  Avatar,
  Hyperlink,
  StatisticsGrid,
  FeatureGrid,
  FadeIn,
  Hero,
  Button,
  Section,
  ClientsListHomepage,
  Faq,
} from '@weshipit/ui';

import { Customer, getVisibleClients } from './api/client';
import { getAllFeedback, FeedbackPrismicDocument } from './api/feedback';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  DevicePhoneMobileIcon,
  RocketLaunchIcon,
  UserIcon,
  ChartBarIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Head from 'next/head';
import { PrismicRichText, PrismicText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import { useRouter } from 'next/router';
import { Layout } from '../components/layout';
import { linksApi } from './api/links';

interface BonjourPageProps {
  clients: Customer[];
  feedback: FeedbackPrismicDocument[];
}

function ProblemAgitation() {
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2016;

  return (
    <>
      <p>
        <strong>99% des applications</strong> ont 1000 utilisateurs ou moins et{' '}
        <strong>ne se démarqueront jamais</strong> en raison d'un{' '}
        <strong>design et d'une UX défaillants</strong>. Les utilisateurs
        décident généralement en 5 secondes s’ils désinstallent une application.
      </p>

      <div className="relative flex h-[164px] w-[124px] flex-row items-center mx-auto sm:h-[124px]">
        <Avatar
          className="rounded-full border-4 border-white bg-slate-300 dark:bg-slate-700"
          size={64}
          email="ducrocq.matthys@gmail.com"
        />
        <Avatar
          className="-ml-4 mr-4 rounded-full border-4 border-white bg-slate-300 dark:bg-slate-700"
          size={64}
          email="dleuliette@gmail.com"
        />
      </div>

      <Text as="h2" variant="h4">
        Rejoignez le top 1% des applications mobiles qui réussissent vraiment.
      </Text>
      <p>
        Je suis David, un{' '}
        <Hyperlink href={'https://x.com/flexbox_/status/1801588179687936329'}>
          contributeur top 20 sur Stack Overflow
        </Hyperlink>{' '}
        avec {yearsOfExperience}+ années d'
        <strong>expérience ciblée en React Native</strong>. Avec mon bras droit
        Matthys, notre <strong>agence web React Native</strong> transforme les
        applications en difficulté en expériences qui convertissent les
        utilisateurs et se démarquent sur le marché.
      </p>
      <p>
        Contrairement aux agences web traditionnelles avec des contrats de
        longue durée qui vous lient pendant des mois,{' '}
        <strong>notre service est disponible quand vous en avez besoin</strong>.
        Vous avez la liberté de mettre en pause ou d'annuler à tout moment et de
        redémarrer quand cela vous convient.
      </p>
    </>
  );
}

function StatistiquesMobiles() {
  return (
    <div className="mx-auto flex flex-col gap-4 mt-12">
      <Prose size="xl" className="mx-auto">
        <h2>L’explosion des smartphones : une opportunité à saisir</h2>
        <p>
          En 2024, on compte environ{' '}
          <strong>4,88 milliards d'utilisateurs de smartphones</strong> dans le
          monde, soit 60,42% de la population mondiale. Cette tendance ne fait
          que s’accélérer.
        </p>

        <StatisticsGrid
          className="mx-2"
          items={[
            {
              icon: <DevicePhoneMobileIcon className="h-12 w-12" />,
              value: 4880,
              suffix: ' millions',
              label: 'utilisateurs de smartphones dans le monde',
            },
            {
              icon: <UserIcon className="h-12 w-12" />,
              value: 150,
              suffix: '+',
              label: 'consultations du smartphone par jour et par utilisateur',
            },
            {
              icon: <ChartBarIcon className="h-12 w-12" />,
              value: 5,
              label: 'secondes pour convaincre un utilisateur',
            },
          ]}
        />

        <div className="relative aspect-video rounded-xl mt-8">
          <Image
            src="/images/smartphone-users-growth.jpg"
            alt="Graphique montrant la croissance des utilisateurs de smartphones dans le monde"
            width={800}
            height={450}
            className="object-contain bg-slate-200 dark:bg-slate-800 p-4 rounded-xl mx-auto"
          />
          <div className="text-sm text-slate-500 text-center">
            La croissance des utilisateurs de smartphones de 2014 à 2029
            (projection)
          </div>
        </div>

        <p>
          Cette croissance représente une opportunité sans précédent pour les
          entreprises, mais aussi un défi considérable :{' '}
          <strong>
            comment capter et retenir l’attention de ces utilisateurs ?
          </strong>
        </p>
      </Prose>
    </div>
  );
}

function ImportanceAppMobile() {
  return (
    <div className="mx-auto flex flex-col gap-4 mt-12">
      <Prose size="xl" className="mx-auto">
        <h2>Pourquoi votre projet a besoin d'une application mobile</h2>

        <FeatureGrid
          items={[
            {
              icon: <DevicePhoneMobileIcon className="h-8 w-8" />,
              title: 'Accessibilité maximale',
              description:
                'Les utilisateurs consultent leur smartphone en moyenne 150 fois par jour. Votre présence sur cet appareil personnel est vitale pour rester connecté avec votre audience.',
              animationDirection: 'left',
            },
            {
              icon: <PaintBrushIcon className="h-8 w-8" />,
              title: 'Expérience utilisateur dédiée',
              description:
                'Une application native offre des performances supérieures et une expérience parfaitement adaptée aux appareils mobiles, contrairement aux sites web responsive.',
              animationDirection: 'right',
            },
            {
              icon: <RocketLaunchIcon className="h-8 w-8" />,
              title: 'Engagement accru',
              description:
                'Les notifications push, l’accès hors ligne et les fonctionnalités spécifiques aux mobiles permettent de créer des interactions plus riches avec vos utilisateurs.',
              animationDirection: 'left',
            },
            {
              icon: <ChartBarIcon className="h-8 w-8" />,
              title: 'Avantage concurrentiel',
              description:
                "Dans un marché saturé, ne pas avoir d'application mobile risque de vous faire perdre du terrain face à des concurrents plus innovants.",
              animationDirection: 'right',
            },
          ]}
        />

        <p>
          <strong>Ne perdez pas vos utilisateurs potentiels</strong> à cause
          d’une présence mobile insuffisante. Dans le monde hyperconnecté
          d’aujourd’hui, une application mobile n'est plus un luxe mais une
          nécessité.
        </p>
      </Prose>
    </div>
  );
}

function NotreSolution() {
  return (
    <div className="mx-auto flex flex-col gap-4 mt-12">
      <Prose size="xl" className="mx-auto">
        <h2>
          Notre agence web React Native : des applications qui convertissent
        </h2>
        <p>
          Chez weshipit.today, agence web spécialisée React Native, nous
          développons des applications qui respectent les trois piliers
          essentiels du succès mobile :
        </p>

        <ol className="flex flex-col mx-auto max-w-lg">
          <li>
            <strong>Design intuitif et attrayant</strong> - Une interface qui
            séduit dès les 5 premières secondes d’utilisation, cruciales pour
            l’adoption.
          </li>
          <li>
            <strong>Performance technique irréprochable</strong> - Des
            applications fluides et réactives qui fonctionnent parfaitement sur
            iOS et Android.
          </li>
          <li>
            <strong>Stratégie d’engagement</strong> - Des fonctionnalités qui
            encouragent l’utilisation répétée et la fidélisation des
            utilisateurs.
          </li>
        </ol>

        <p>
          Notre agence web React Native vous accompagne de la conception à la
          publication sur les stores, en garantissant une qualité qui place
          votre application dans le top 1% des applications mobiles.
        </p>
      </Prose>
    </div>
  );
}

function NosRealisations({
  feedback,
}: {
  feedback: FeedbackPrismicDocument[];
}) {
  return (
    <section id="testimonials" className="my-0 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-base/7 font-semibold text-blue-600">
          Témoignages clients
        </p>
        <Text
          variant="h2"
          as="h2"
          className="mb-4 text-slate-900 dark:text-white"
        >
          Ce que disent nos clients
        </Text>
        <Text
          variant="p1"
          as="p"
          className="text-slate-600 dark:text-slate-400"
        >
          Découvrez comment nous avons aidé nos clients à transformer leur
          vision en applications mobiles performantes
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

const faqs = [
  {
    id: 'faq-fr-1',
    question: 'Combien de temps avant de voir les premiers résultats ?',
    answer:
      'Vous recevez votre premier livrable en quelques jours, pas en quelques mois. On travaille en cycles courts : une tâche à la fois, livrée en production dès qu’elle est prête.',
  },
  {
    id: 'faq-fr-2',
    question:
      'Pourquoi pas recruter un développeur React Native à plein temps ?',
    answer:
      'Un senior React Native coûte entre 60 000 € et 90 000 € par an, sans compter les charges, les avantages et les mois de recrutement. Notre abonnement vous donne accès à une équipe senior immédiatement, sans engagement long terme.',
  },
  {
    id: 'faq-fr-3',
    question: 'Est-ce qu’on peut mettre en pause le service ?',
    answer:
      'Oui. Vous n’avez pas toujours des tâches à nous confier. Mettez en pause votre abonnement et reprenez quand vous êtes prêt. Vous ne payez que pour ce dont vous avez besoin.',
  },
  {
    id: 'faq-fr-4',
    question: 'Avec qui allons-nous travailler concrètement ?',
    answer:
      'Directement avec David et Matthys, les deux développeurs seniors de l’équipe. Pas d’account managers, pas de junior qui découvre React Native sur votre projet.',
  },
  {
    id: 'faq-fr-5',
    question: 'Comment se passe la collaboration au quotidien ?',
    answer:
      'Vous ajoutez des tâches dans votre backlog GitHub, on les traite une par une. Vous êtes notifié sur Slack quand une pull request est prête pour review. Pas de réunions quotidiennes, pas de reporting interminable.',
  },
  {
    id: 'faq-fr-6',
    question: 'Peut-on voir du code avant de s’abonner ?',
    answer:
      'Bien sûr. Explorez notre travail open source sur GitHub. Vous verrez exactement comment on code, comment on documente et comment on collabore en équipe.',
  },
  {
    id: 'faq-fr-7',
    question: 'Quels types de tâches pouvez-vous traiter ?',
    answer:
      'Features, bugs, migrations de bibliothèques, audits de performance, refactoring, mise en place de CI/CD, soumission App Store… Si ça concerne votre application React Native, on s’en occupe.',
  },
  {
    id: 'faq-fr-8',
    question: 'Est-ce qu’il y a des remboursements ?',
    answer:
      'Non. La qualité de notre travail parle d’elle-même — c’est pourquoi nous ne proposons pas de remboursements. En revanche, vous pouvez annuler à tout moment.',
  },
  {
    id: 'faq-fr-9',
    question:
      'Pourquoi choisir une agence web React Native plutôt qu’une agence mobile classique ?',
    answer:
      'Une agence web React Native comme weshipit.today développe une seule base de code qui fonctionne sur iOS et Android, ce qui réduit les coûts de 40 à 60 % par rapport à deux applications natives séparées. React Native permet aussi de partager la logique avec une application web, ce qui accélère encore les développements futurs.',
  },
  {
    id: 'faq-fr-10',
    question: 'Qu’est-ce qu’une agence web React Native ?',
    answer:
      'Une agence web React Native est une agence spécialisée dans le développement d’applications mobiles cross-platform avec le framework React Native de Meta. Elle maîtrise à la fois le développement iOS, Android et web avec une seule équipe, ce qui la distingue des agences mobiles natives ou des agences web généralistes.',
  },
];

export default function BonjourPage({ clients, feedback }: BonjourPageProps) {
  const router = useRouter();
  const { name } = router.query;

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
    name: 'weshipit.today — Agence Web React Native',
    description:
      'Agence web spécialisée dans le développement d’applications mobiles React Native pour iOS et Android. Experts React Native depuis 2016.',
    url: 'https://weshipit.today/bonjour',
    foundingDate: '2016',
    knowsAbout: [
      'React Native',
      'iOS',
      'Android',
      'applications mobiles',
      'développement cross-platform',
    ],
    serviceType: 'Développement d’applications mobiles React Native',
    areaServed: { '@type': 'Country', name: 'France' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services de développement React Native',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Développement application React Native',
            description:
              'Création d’applications iOS et Android avec React Native',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Audit et performance React Native',
            description:
              'Audit de performance et optimisation d’applications React Native existantes',
          },
        },
      ],
    },
  };

  const heroTitle = name
    ? `${name}, transformez votre idée en application iOS & Android en 14 jours`
    : 'Transformez votre idée en application iOS & Android en 14 jours';

  const heroDescription = name
    ? `${name}, 99% des apps échouent à cause d'un mauvais design. Nos experts React Native livrent votre application — en jours, pas en mois.`
    : '99% des apps échouent à cause d’un mauvais design. Nos experts React Native livrent votre application — en jours, pas en mois.';

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
        seoTitle="Votre Application Mobile iOS & Android en 14 Jours | weshipit.today"
        seoDescription="Transformez votre idée en application iOS et Android performante en 14 jours. Experts React Native depuis 2016, nous livrons des apps qui convertissent — sans exploser votre budget."
        ogImageTitle="Votre application mobile iOS & Android en 14 jours"
        ogImageAlt="weshipit.today — Agence web spécialisée React Native pour iOS et Android"
        locale="fr_FR"
        withHeader
        withFooter
        callToActionButton={{
          name: 'Réserver un appel',
          href: linksApi.cal.ONBOARDING,
          isExternalLink: true,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <div className="mx-auto max-w-4xl">
              <Hero title={heroTitle} description={heroDescription} />
            </div>
          </FadeIn>

          <div className="m-auto max-w-2xl my-12">
            <FadeIn>
              <Prose className="mb-12 mx-auto" size="2xl">
                <ProblemAgitation />
              </Prose>
            </FadeIn>
            <Button
              href={linksApi.cal.ONBOARDING}
              as="a"
              size="xxl"
              variant="outline"
              isExternalLink
              withExternalLinkIcon={false}
              className="mb-24 flex w-full justify-center mx-auto"
            >
              Discutez de votre projet avec nous
            </Button>
          </div>
        </div>

        <Section variant="transparent" className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <StatistiquesMobiles />
            <ImportanceAppMobile />
            <NotreSolution />
          </div>
        </Section>

        <div className="py-16 dark:bg-slate-900">
          <ClientsListHomepage clients={clients} />
        </div>

        <Section variant="transparent" className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <NosRealisations feedback={feedback} />

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

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="m-auto max-w-4xl py-2 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card
                className="my-2 flex flex-col items-center justify-center gap-8 overflow-hidden relative"
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
                  Ne laissez pas passer l’opportunité mobile
                </Text>
                <Text
                  variant="p1"
                  as="p"
                  className="bg-gradient-to-b from-white to-white/75 bg-clip-text tracking-tight text-transparent drop-shadow"
                >
                  Avec 4,88 milliards d’utilisateurs de smartphones dans le
                  monde, chaque jour sans application mobile est une opportunité
                  manquée pour votre entreprise.
                </Text>
                <div className="flex items-center">
                  <Button
                    href={linksApi.cal.ONBOARDING}
                    size="xxl"
                    variant="outline"
                    as="a"
                    isExternalLink
                    className="mx-auto"
                  >
                    Réserver un appel stratégique
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
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
