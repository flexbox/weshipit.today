import {
  Button,
  Card,
  FadeIn,
  Hero,
  Prose,
  Text,
  Avatar,
  Hyperlink,
  Section,
  ClientsListHomepage,
} from '@weshipit/ui';
import { linksApi } from './api/links';
import { Layout } from '../components/layout';
import { Customer, getVisibleClients } from './api/client';
import { getAllFeedback, FeedbackPrismicDocument } from './api/feedback';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PhoneIcon,
  DevicePhoneMobileIcon,
  RocketLaunchIcon,
  UserIcon,
  ChartBarIcon,
  PaintBrushIcon,
  StarIcon as StarIconSolid,
} from '@heroicons/react/24/outline';
import Head from 'next/head';
import { PrismicRichText, PrismicText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';

interface BonjourPageProps {
  clients: Customer[];
  feedback: FeedbackPrismicDocument[];
}

function useGetLocalTimeInFrance() {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateLocalTime = () => {
      const timeInFrance = new Intl.DateTimeFormat('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Paris',
        hour12: false,
      }).format(new Date());

      setLocalTime(timeInFrance);
    };

    updateLocalTime();
    const intervalId = setInterval(updateLocalTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return localTime;
}

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}</span>;
}

function ProblemAgitation() {
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2016;
  const localTimeInFrance = useGetLocalTimeInFrance();

  return (
    <>
      <p>
        <strong>99% des applications</strong> ont 1000 utilisateurs ou moins et{' '}
        <strong>ne se démarqueront jamais</strong> en raison d'un{' '}
        <strong>design et d'une UX défaillants</strong>. Les utilisateurs
        décident généralement en 5 secondes s'ils désinstallent une application.
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
        Matthys, nous transformons les applications en difficulté en expériences
        qui convertissent les utilisateurs et se démarquent sur le marché.
      </p>
      <p>
        Nous sommes basés en France, parlons anglais pour toutes nos
        communications et utilisons des claviers <code>qwerty</code>. Il est{' '}
        {localTimeInFrance} pour nous en ce moment,{' '}
        <Hyperlink href={linksApi.cal.ONBOARDING}>
          réservez un appel pour voir si nous pouvons vous aider
        </Hyperlink>
        .
      </p>
      <p>
        Contrairement aux contrats de longue durée qui vous lient pendant des
        mois et nécessitent un processus administratif en six étapes,{' '}
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
        <h2>L'explosion des smartphones : une opportunité à saisir</h2>
        <p>
          En 2024, on compte environ{' '}
          <strong>4,88 milliards d'utilisateurs de smartphones</strong> dans le
          monde, soit 60,42% de la population mondiale. Cette tendance ne fait
          que s'accélérer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <motion.div
            className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <DevicePhoneMobileIcon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <div className="text-3xl font-bold mb-2">
              <CountUp end={4880} /> millions
            </div>
            <p>utilisateurs de smartphones dans le monde</p>
          </motion.div>

          <motion.div
            className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <UserIcon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <div className="text-3xl font-bold mb-2">
              <CountUp end={150} />+
            </div>
            <p>consultations du smartphone par jour et par utilisateur</p>
          </motion.div>

          <motion.div
            className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <ChartBarIcon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <div className="text-3xl font-bold mb-2">
              <CountUp end={5} />
            </div>
            <p>secondes pour convaincre un utilisateur</p>
          </motion.div>
        </div>

        <div className="relative aspect-video rounded-xl mt-8 mx-auto">
          <Image
            src="/images/smartphone-users-growth.jpg"
            alt="Graphique montrant la croissance des utilisateurs de smartphones dans le monde"
            width={800}
            height={450}
            className="object-contain bg-slate-100 dark:bg-slate-800 p-4 rounded-xl mx-auto"
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
            comment capter et retenir l'attention de ces utilisateurs ?
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <motion.div
            className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <DevicePhoneMobileIcon className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="mt-0 text-xl font-bold">Accessibilité maximale</h3>
            <p>
              Les utilisateurs consultent leur smartphone en moyenne 150 fois
              par jour. Votre présence sur cet appareil personnel est vitale
              pour rester connecté avec votre audience.
            </p>
          </motion.div>

          <motion.div
            className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <PaintBrushIcon className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="mt-0 text-xl font-bold">
              Expérience utilisateur dédiée
            </h3>
            <p>
              Une application native offre des performances supérieures et une
              expérience parfaitement adaptée aux appareils mobiles,
              contrairement aux sites web responsive.
            </p>
          </motion.div>

          <motion.div
            className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <RocketLaunchIcon className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="mt-0 text-xl font-bold">Engagement accru</h3>
            <p>
              Les notifications push, l'accès hors ligne et les fonctionnalités
              spécifiques aux mobiles permettent de créer des interactions plus
              riches avec vos utilisateurs.
            </p>
          </motion.div>

          <motion.div
            className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ChartBarIcon className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="mt-0 text-xl font-bold">Avantage concurrentiel</h3>
            <p>
              Dans un marché saturé, ne pas avoir d'application mobile risque de
              vous faire perdre du terrain face à des concurrents plus
              innovants.
            </p>
          </motion.div>
        </div>

        <p>
          <strong>Ne perdez pas vos utilisateurs potentiels</strong> à cause
          d'une présence mobile insuffisante. Dans le monde hyperconnecté
          d'aujourd'hui, une application mobile n'est plus un luxe mais une
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
        <h2>Notre approche : des applications qui convertissent</h2>
        <p>
          Chez weshipit.today, nous développons des applications React Native
          qui respectent les trois piliers essentiels du succès mobile :
        </p>

        <ol className="flex flex-col mx-auto max-w-lg">
          <li>
            <strong>Design intuitif et attrayant</strong> - Une interface qui
            séduit dès les 5 premières secondes d'utilisation, cruciales pour
            l'adoption.
          </li>
          <li>
            <strong>Performance technique irréprochable</strong> - Des
            applications fluides et réactives qui fonctionnent parfaitement sur
            iOS et Android.
          </li>
          <li>
            <strong>Stratégie d'engagement</strong> - Des fonctionnalités qui
            encouragent l'utilisation répétée et la fidélisation des
            utilisateurs.
          </li>
        </ol>

        <p>
          Notre équipe d'experts React Native vous accompagne de la conception à
          la publication sur les stores, en garantissant une qualité qui place
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
        <h2 className="text-base/7 font-semibold text-blue-600">
          Témoignages clients
        </h2>
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

function Faq() {
  const faqData = [
    {
      question:
        'Combien de temps faut-il pour développer une application mobile ?',
      answer:
        "Le délai de développement dépend de la complexité du projet. Une application simple peut être développée en 2-3 mois, tandis qu'une application plus complexe peut prendre 4-6 mois. Nous travaillons en cycles courts pour vous livrer des versions fonctionnelles rapidement.",
    },
    {
      question:
        'Pourquoi choisir React Native plutôt que le développement natif ?',
      answer:
        'React Native permet de développer une application qui fonctionne à la fois sur iOS et Android, tout en offrant des performances proches du natif. Cela réduit considérablement les coûts et les délais de développement, tout en maintenant une excellente expérience utilisateur.',
    },
    {
      question: 'Comment assurez-vous la qualité de vos applications ?',
      answer:
        "Nous suivons un processus rigoureux de tests à chaque étape du développement. Cela inclut des tests unitaires, des tests d'intégration, et des tests utilisateurs réels. Nous utilisons également des outils de monitoring pour détecter et résoudre les problèmes rapidement.",
    },
    {
      question: "Que se passe-t-il après le lancement de l'application ?",
      answer:
        "Nous proposons des services de maintenance et d'évolution pour garantir que votre application reste performante et à jour. Nous pouvons également vous aider à analyser les données d'utilisation pour optimiser l'expérience utilisateur et augmenter l'engagement.",
    },
  ];

  return (
    <section id="faq" className="my-0 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-base/7 font-semibold text-blue-600">FAQ</h2>
        <Text
          variant="h2"
          as="h2"
          className="mb-4 text-slate-900 dark:text-white"
        >
          Questions fréquentes
        </Text>
        <Text
          variant="p1"
          as="p"
          className="text-slate-600 dark:text-slate-400"
        >
          Tout ce que vous devez savoir sur notre service de développement
          d'applications mobiles
        </Text>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {faqData.map((faq, index) => (
          <Card key={index} shadow="light" className="border-none">
            <div className="pt-6">
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                {faq.question}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default function BonjourPage({ clients, feedback }: BonjourPageProps) {
  const faqData = [
    {
      question:
        'Combien de temps faut-il pour développer une application mobile ?',
      answer:
        "Le délai de développement dépend de la complexité du projet. Une application simple peut être développée en 2-3 mois, tandis qu'une application plus complexe peut prendre 4-6 mois. Nous travaillons en cycles courts pour vous livrer des versions fonctionnelles rapidement.",
    },
    {
      question:
        'Pourquoi choisir React Native plutôt que le développement natif ?',
      answer:
        'React Native permet de développer une application qui fonctionne à la fois sur iOS et Android, tout en offrant des performances proches du natif. Cela réduit considérablement les coûts et les délais de développement, tout en maintenant une excellente expérience utilisateur.',
    },
    {
      question: 'Comment assurez-vous la qualité de vos applications ?',
      answer:
        "Nous suivons un processus rigoureux de tests à chaque étape du développement. Cela inclut des tests unitaires, des tests d'intégration, et des tests utilisateurs réels. Nous utilisons également des outils de monitoring pour détecter et résoudre les problèmes rapidement.",
    },
    {
      question: "Que se passe-t-il après le lancement de l'application ?",
      answer:
        "Nous proposons des services de maintenance et d'évolution pour garantir que votre application reste performante et à jour. Nous pouvons également vous aider à analyser les données d'utilisation pour optimiser l'expérience utilisateur et augmenter l'engagement.",
    },
  ];

  /** @type {import('schema-dts').FAQPage} */
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <Layout
        seoTitle="Applications Mobiles React Native pour Votre Entreprise | weshipit.today"
        seoDescription="Dans un monde avec 4,88 milliards d'utilisateurs de smartphones, ne perdez pas vos clients potentiels. Créez une application mobile performante avec notre expertise React Native."
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
              <Hero
                title="L'ère mobile est là. Êtes-vous prêt?"
                description="Dans un monde dominé par les smartphones, la qualité de votre application mobile détermine le succès de votre entreprise."
              />
            </div>
          </FadeIn>

          <div className="m-auto max-w-2xl my-12">
            <FadeIn>
              <Prose className="mb-12 mx-auto" size="2xl">
                <ProblemAgitation />
              </Prose>
            </FadeIn>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center justify-center">
                <PhoneIcon className="mr-2 h-5 w-5" />
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
            </motion.div>
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
            <Faq />
          </div>
        </Section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="m-auto max-w-4xl py-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card
                className="my-12 flex flex-col items-center justify-center gap-8 overflow-hidden relative"
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
                  Ne laissez pas passer l'opportunité mobile
                </Text>
                <Text
                  variant="p1"
                  as="p"
                  className="bg-gradient-to-b from-white to-white/75 bg-clip-text tracking-tight text-transparent drop-shadow"
                >
                  Avec 4,88 milliards d'utilisateurs de smartphones dans le
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
