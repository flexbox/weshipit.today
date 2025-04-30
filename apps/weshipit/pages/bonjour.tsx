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
} from '@weshipit/ui';
import { linksApi } from './api/links';
import { Layout } from '../components/layout';
import { Customer, getVisibleClients } from './api/client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface BonjourPageProps {
  clients: Customer[];
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
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
            <h3 className="mt-0 text-xl font-bold">Accessibilité maximale</h3>
            <p>
              Les utilisateurs consultent leur smartphone en moyenne 150 fois
              par jour. Votre présence sur cet appareil personnel est vitale
              pour rester connecté avec votre audience.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
            <h3 className="mt-0 text-xl font-bold">
              Expérience utilisateur dédiée
            </h3>
            <p>
              Une application native offre des performances supérieures et une
              expérience parfaitement adaptée aux appareils mobiles,
              contrairement aux sites web responsive.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
            <h3 className="mt-0 text-xl font-bold">Engagement accru</h3>
            <p>
              Les notifications push, l'accès hors ligne et les fonctionnalités
              spécifiques aux mobiles permettent de créer des interactions plus
              riches avec vos utilisateurs.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
            <h3 className="mt-0 text-xl font-bold">Avantage concurrentiel</h3>
            <p>
              Dans un marché saturé, ne pas avoir d'application mobile risque de
              vous faire perdre du terrain face à des concurrents plus
              innovants.
            </p>
          </div>
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

export default function BonjourPage({ clients }: BonjourPageProps) {
  return (
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="m-auto max-w-4xl py-12">
          <Card
            className="my-12 flex flex-col items-center justify-center gap-8"
            variant="gradient-blue"
          >
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
              Avec 4,88 milliards d'utilisateurs de smartphones dans le monde,
              chaque jour sans application mobile est une opportunité manquée
              pour votre entreprise.
            </Text>
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
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { clients } = await getVisibleClients();

  return {
    props: {
      clients,
    },
  };
}
