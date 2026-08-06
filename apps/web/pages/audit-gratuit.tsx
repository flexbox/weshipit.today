import { Card, LinkButton, Prose, Text } from '@weshipit/ui';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '../components/layout';
import { StackAudit } from '../components/stack-audit';

const FAQ_ITEMS = [
  {
    question: "Combien de temps prend l'audit gratuit ?",
    answer:
      '3 minutes environ. 32 questions réparties en 4 catégories : fondations, écosystème, couche data et devops. Vous répondez par Oui, Incertain ou Non.',
  },
  {
    question: 'Dois-je donner mon email pour voir mon score ?',
    answer:
      "Non. Votre score sur 100 et le détail par catégorie s'affichent immédiatement. L'email sert uniquement à recevoir le rapport détaillé avec les recommandations priorisées.",
  },
  {
    question: "D'où viennent les 32 questions ?",
    answer:
      "C'est la grille utilisée lors de nos audits d'architecture React Native pour des apps qui gèrent des millions d'utilisateurs (Alan, Cdiscount, Swan). Nous l'avons transformée en checklist auto-administrée.",
  },
  {
    question: 'Que faire si mon score est faible ?',
    answer:
      'Un score sous 70 signale de la dette technique à traiter avant de scaler. Le rapport email priorise vos points faibles par impact et effort, et notre équipe peut réaliser un audit complet de votre codebase en 2 semaines.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
};

export default function AuditGratuit() {
  return (
    <>
      <Head>
        <link
          rel="alternate"
          hrefLang="fr"
          href="https://weshipit.today/audit-gratuit"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://weshipit.today/audit-gratuit"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <Layout
        seoTitle="Audit React Native Gratuit : Scorez votre Stack en 3 Minutes"
        seoDescription="32 questions pour auditer votre stack React Native : fondations, écosystème, couche data, devops. Score sur 100 immédiat + rapport détaillé par email. Gratuit."
        ogImageTitle="Audit React Native Gratuit"
        locale="fr_FR"
        withHeader
        withFooter
        withContainer
      >
        <div className="mt-12">
          <StackAudit headingAs="h1" />
        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-2">
          <Prose>
            <h2>Pourquoi auditer votre stack React Native ?</h2>
            <p>
              La dette technique React Native ne se voit pas dans les démos.
              Elle se voit 6 mois plus tard : des upgrades Expo impossibles, des
              listes qui rament sur Android, une équipe qui passe plus de temps
              à contourner l'architecture qu'à livrer des features.
            </p>
            <p>
              Ces 32 questions couvrent les points que nous vérifions en premier
              lors d'un audit d'architecture : error boundaries, virtualisation
              des listes, data fetching, tests E2E, gestion des versions et des
              secrets. Si vous répondez « Non » ou « Incertain » à plus d'un
              tiers d'entre elles, vous payez déjà cette dette en vélocité.
            </p>
          </Prose>
          <Prose>
            <h2>Comment fonctionne le score ?</h2>
            <p>
              Chaque réponse vaut 1 point (Oui), 0,5 point (Incertain) ou 0
              point (Non). Le score final est ramené sur 100, avec un détail par
              catégorie pour identifier où concentrer vos efforts :
            </p>
            <ul>
              <li>
                <strong>70+</strong> — stack bien tenue, optimisations
                marginales
              </li>
              <li>
                <strong>40 à 69</strong> — bases solides, dette à surveiller
                avant de scaler
              </li>
              <li>
                <strong>moins de 40</strong> — fondations à consolider en
                priorité
              </li>
            </ul>
            <p>
              Pour aller plus loin, écoutez les architectures décortiquées dans
              notre <Link href="/podcast">podcast React Native</Link> ou
              découvrez notre{' '}
              <Link href="/audit">audit de codebase complet</Link>.
            </p>
          </Prose>
        </div>

        <div className="mt-24 mb-12">
          <Prose>
            <h2>Questions fréquentes</h2>
          </Prose>
          <dl className="mt-6 divide-y divide-gray-200 dark:divide-gray-800">
            {FAQ_ITEMS.map(({ question, answer }) => (
              <div key={question} className="py-6">
                <dt className="text-balance text-base font-semibold text-gray-900 dark:text-gray-100">
                  {question}
                </dt>
                <dd className="mt-2 text-pretty text-base text-gray-600 dark:text-gray-400">
                  {answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto mb-24 max-w-4xl">
          <Card
            size="xl"
            className="flex flex-col items-center justify-center gap-6 text-center"
            variant="gradient-blue"
          >
            <Text as="h2" variant="h4" className="text-white">
              Besoin d'un regard extérieur sur votre codebase ?
            </Text>
            <Text as="p" variant="p1" className="max-w-xl text-white">
              Nous réalisons le même audit en profondeur sur votre application,
              avec un backlog priorisé et un plan d'upgrade en 2 semaines.
            </Text>
            <LinkButton href="/audit" variant="outline" size="xl">
              Découvrir l'audit complet
            </LinkButton>
          </Card>
        </div>
      </Layout>
    </>
  );
}
