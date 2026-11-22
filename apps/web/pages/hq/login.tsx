import { Button, Card } from '@weshipit/ui';
import { useRouter } from 'next/router';
import { Layout } from '../../components/layout';

/** Magic-link sign-in for the one HQ user. */
export default function HqLoginPage() {
  const { query } = useRouter();
  const sent = query.sent === '1';
  const failed = query.error === '1';

  return (
    <Layout seoTitle="Connexion · HQ" seoDescription="HQ" noindex withContainer>
      <div className="mx-auto max-w-sm py-24">
        <Card size="lg">
          <h1 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
            HQ
          </h1>
          {sent ? (
            <p className="text-slate-700 dark:text-slate-300">
              Si cette adresse est la bonne, le lien de connexion vient de
              partir. Ouvre-le dans ce navigateur.
            </p>
          ) : (
            <form method="post" action="/api/hq/login" className="space-y-4">
              <label
                htmlFor="hq-email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Email
              </label>
              <input
                id="hq-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-md border-0 px-3.5 py-2.5 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-blue-600 dark:bg-white/5 dark:text-white dark:ring-white/10"
              />
              <Button
                as="button"
                variant="primary"
                size="lg"
                className="w-full justify-center"
              >
                Recevoir le lien
              </Button>
              {failed && (
                <p className="text-sm text-red-600">
                  Lien invalide ou expiré. Recommence.
                </p>
              )}
            </form>
          )}
        </Card>
      </div>
    </Layout>
  );
}
