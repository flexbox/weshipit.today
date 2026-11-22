import { Text } from '@weshipit/ui';
import Link from 'next/link';
import { Layout } from '../components/layout';

/** Where the unsubscribe link in HQ emails lands. */
export default function UnsubscribedPage() {
  return (
    <Layout
      seoTitle="Désabonnement confirmé"
      seoDescription="Tu ne recevras plus d’emails de weshipit.today."
      locale="fr_FR"
      noindex
      withHeader
      withFooter
      withContainer
    >
      <div className="mx-auto max-w-xl py-20 text-center">
        <Text as="h1" variant="h3" className="text-slate-900 dark:text-white">
          C’est fait, tu es désabonné.
        </Text>
        <Text
          as="p"
          variant="p1"
          className="mt-4 text-slate-600 dark:text-slate-300"
        >
          Tu ne recevras plus d’emails de weshipit.today. Les ressources que tu
          as déjà reçues restent accessibles.
        </Text>
        <Link
          href="/"
          className="mt-8 inline-block text-blue-600 hover:underline"
        >
          Retour au site
        </Link>
      </div>
    </Layout>
  );
}
