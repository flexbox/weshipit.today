import { Card, Hyperlink, LinkButton, Prose, Text } from '@weshipit/ui';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '../components/layout';
import { SecurityAudit } from '../components/security-audit';

const PAGE_URL = 'https://weshipit.today/audit-securite-react-native';

const FAQ_ITEMS = [
  {
    question: "Combien de temps prend l'audit sécurité gratuit ?",
    answer:
      '3 minutes environ. 28 contrôles répartis en 4 catégories : secrets et stockage, réseau et API, plateforme (Android, iOS, WebView, deep links), build et dépendances. Vous répondez par Oui, Incertain ou Non.',
  },
  {
    question:
      'Une clé API dans une app React Native est-elle vraiment exposée ?',
    answer:
      "Oui. Le bundle JavaScript (même compilé en bytecode Hermes) et les fichiers de configuration sont extraits d'un APK ou d'un IPA en quelques minutes. Toute valeur embarquée dans l'app, y compris les variables EXPO_PUBLIC_*, doit être considérée comme publique. Les secrets restent côté serveur.",
  },
  {
    question: 'Quelle différence avec un scanner comme rnsec ?',
    answer:
      'rnsec analyse automatiquement votre code et votre configuration native (secrets en dur, cleartext traffic, WebView, stockage non chiffré…). Cette checklist couvre aussi ce qu’un scanner statique ne voit pas : vos règles Supabase ou Firebase, le contrôle d’accès côté backend, la révocation des tokens ou la signature des mises à jour OTA. Les deux sont complémentaires.',
  },
  {
    question: 'Dois-je donner mon email pour voir mon score ?',
    answer:
      "Non. Votre score sur 100 et le détail par catégorie s'affichent immédiatement. L'email sert uniquement à recevoir le rapport détaillé avec les correctifs priorisés par gravité.",
  },
  {
    question: 'Cet audit remplace-t-il un test d’intrusion ?',
    answer:
      'Non. Il vérifie les contrôles de base qui évitent la majorité des incidents. Pour une app bancaire, de santé ou qui manipule des données sensibles, il prépare un test d’intrusion ou une revue OWASP MASVS complète, sans la remplacer.',
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

const CHECKED_AREAS = [
  {
    title: 'Secrets & stockage',
    masvs: 'MASVS-STORAGE · MASVS-AUTH',
    text: 'Clés API embarquées, variables EXPO_PUBLIC_*, tokens hors du Keychain/Keystore, logs qui fuient des données personnelles, déconnexion incomplète.',
  },
  {
    title: 'Réseau & API',
    masvs: 'MASVS-NETWORK · MASVS-AUTH',
    text: 'Trafic en clair, contrôle d’accès uniquement côté app, règles Supabase/Firebase en mode test, tokens à durée de vie trop longue, API non protégées.',
  },
  {
    title: 'Plateforme',
    masvs: 'MASVS-PLATFORM · MASVS-RESILIENCE',
    text: 'Deep links non validés, WebViews trop permissives, backups Android, permissions excessives, biométrie contournable, écrans sensibles capturables.',
  },
  {
    title: 'Build & dépendances',
    masvs: 'MASVS-CODE · MASVS-PRIVACY',
    text: 'Artefacts de debug en production, dépendances vulnérables, SDK tiers non audités, credentials de signature commités, mises à jour OTA non signées.',
  },
];

export default function AuditSecuriteReactNative() {
  return (
    <>
      <Head>
        <link rel="alternate" hrefLang="fr" href={PAGE_URL} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <Layout
        seoTitle="Audit Sécurité React Native Gratuit : 28 Contrôles en 3 Minutes"
        seoDescription="Checklist sécurité pour apps React Native et Expo : secrets, stockage, API, deep links, WebView, dépendances. Score sur 100 immédiat + rapport détaillé par email. Gratuit."
        ogImageTitle="Audit Sécurité React Native Gratuit"
        locale="fr_FR"
        withHeader
        withFooter
        withContainer
      >
        <div className="mt-12">
          <SecurityAudit headingAs="h1" />
        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-2">
          <Prose>
            <h2>Pourquoi auditer la sécurité de votre app React Native ?</h2>
            <p>
              Une app mobile est un client que vous distribuez à tout le monde,
              attaquants compris. Le bundle JavaScript, le manifest Android et
              l'Info.plist s'extraient d'un APK ou d'un IPA en quelques minutes.
              Une clé API embarquée, un token stocké en clair ou une table
              Supabase sans Row Level Security, et vos données utilisateurs sont
              exposées.
            </p>
            <p>
              React Native ajoute ses propres pièges : des variables{' '}
              <code>EXPO_PUBLIC_*</code> qui finissent dans le bundle, des
              WebViews qui exécutent du contenu distant, des deep links qui
              déclenchent des actions sans validation, des mises à jour OTA qui
              contournent la review des stores. Ces 28 contrôles ciblent
              exactement ces failles.
            </p>
          </Prose>
          <Prose>
            <h2>Comment fonctionne le score ?</h2>
            <p>
              Chaque réponse vaut 1 point (Oui), 0,5 point (Incertain) ou 0
              point (Non). Le score est ramené sur 100, avec un détail par
              catégorie. Les seuils sont plus exigeants que pour notre{' '}
              <Link href="/audit-gratuit">audit de stack gratuit</Link> : en
              sécurité, une seule faille suffit.
            </p>
            <ul>
              <li>
                <strong>80+</strong> — posture solide, prête pour un test
                d'intrusion
              </li>
              <li>
                <strong>50 à 79</strong> — bonnes bases, angles morts à fermer
              </li>
              <li>
                <strong>moins de 50</strong> — exposition élevée, à traiter
                avant la prochaine release
              </li>
            </ul>
            <p>
              « Incertain » compte à moitié : si vous ne savez pas, c'est
              souvent qu'aucun garde-fou ne le vérifie.
            </p>
          </Prose>
        </div>

        <div className="mt-24">
          <Prose>
            <h2>Ce que l'audit vérifie</h2>
            <p>
              Les 4 catégories s'appuient sur l'
              <Hyperlink href="https://mas.owasp.org/MASVS/">
                OWASP MASVS
              </Hyperlink>
              , le standard de référence pour la sécurité des apps mobiles,
              ramené aux cas concrets d'une app React Native ou Expo.
            </p>
          </Prose>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {CHECKED_AREAS.map((area) => (
              <Card key={area.title} size="md">
                <Text
                  as="p"
                  variant="c2"
                  className="uppercase tracking-wide text-blue-600 dark:text-blue-400"
                >
                  {area.masvs}
                </Text>
                <Text as="h3" variant="h6" className="mt-2">
                  {area.title}
                </Text>
                <Text
                  as="p"
                  variant="p2"
                  className="mt-3 text-slate-600 dark:text-slate-300"
                >
                  {area.text}
                </Text>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-2">
          <Prose>
            <h2>Automatisez le scan avec rnsec</h2>
            <p>
              Une checklist se remplit une fois ; une faille s'introduit à
              chaque pull request. Pour la partie détectable dans le code, nous
              utilisons{' '}
              <Hyperlink href="https://www.rnsec.dev/">rnsec</Hyperlink>, un
              scanner open source (MIT) dédié à React Native et Expo : secrets
              en dur, stockage non chiffré, WebView, cleartext traffic,
              artefacts de debug, configuration Android et iOS.
            </p>
            <p>
              Lancez-le en local pour obtenir un rapport HTML, puis branchez-le
              en CI pour bloquer les régressions (contrôle b7 de l'audit).
            </p>
          </Prose>
          <Card className="!bg-slate-900 !text-slate-100 font-mono text-sm leading-relaxed ring-slate-800">
            <pre className="overflow-x-auto">
              <code>
                <span className="text-slate-400">
                  # Scan local + rapport HTML
                </span>
                {'\n'}npx rnsec scan
                {'\n'}open rnsec-report.html
                {'\n\n'}
                <span className="text-slate-400">
                  # En CI : uniquement les fichiers modifiés
                </span>
                {'\n'}npx rnsec scan --changed-files main --silent \{'\n'}
                {'  '}--output rnsec-results.json
              </code>
            </pre>
          </Card>
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
              Besoin d'un regard extérieur sur la sécurité de votre app ?
            </Text>
            <Text as="p" variant="p1" className="max-w-xl text-white">
              Nous auditons votre codebase React Native et votre configuration
              native, et livrons un plan de remédiation priorisé par gravité.
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
