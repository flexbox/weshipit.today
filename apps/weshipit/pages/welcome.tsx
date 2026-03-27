import { Layout } from '../components/layout';

import { Prose } from '@weshipit/ui';

export function Welcome() {
  return (
    <Layout
      seoTitle="Bienvenue sur Kid GO"
      seoDescription="Compte Kid GO validé — votre compagnon mobile pour trouver des expériences locales adaptées aux familles."
      withHeader
      noindex
    >
      <div className="mx-auto max-w-2xl p-3">
        <Prose size="lg">
          <h1 className="mt-8">Compte Kid GO validé 🙌</h1>
          <p>
            Kid GO est votre compagnon mobile de référence pour les parents à la
            recherche d'expériences amusantes, locales et adaptées aux familles.
          </p>
        </Prose>
      </div>
    </Layout>
  );
}

export default Welcome;
