import { Button } from '@weshipit/ui';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HqShell } from '../../../components/hq/hq-shell';
import { MagnetMarkdown } from '../../../components/hq/magnet-markdown';
import type { LeadMagnet } from '../../../utils/hq/types';
import { requireOwnerPage } from '../../../utils/hq/require-owner';
import { getHqAdmin } from '../../../utils/hq/supabase';

type EditableMagnet = Pick<
  LeadMagnet,
  'id' | 'slug' | 'title' | 'pitch' | 'bullets' | 'content_md' | 'published'
>;

interface MagnetPageProps {
  magnet: EditableMagnet | null;
}

const fieldClass =
  'w-full rounded-md border-0 px-3 py-2 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-blue-600 dark:bg-white/5 dark:text-white dark:ring-white/10';
const labelClass =
  'mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300';

const STARTER = `## Avant de commencer

- [ ] Première étape
- [ ] Deuxième étape
`;

export default function MagnetPage({ magnet }: MagnetPageProps) {
  const { query } = useRouter();
  const error = typeof query.error === 'string' ? query.error : null;

  return (
    <HqShell title={magnet ? magnet.title : 'Nouveau magnet'}>
      {query.saved === '1' && (
        <p
          role="status"
          className="mb-6 rounded bg-green-50 px-3 py-2 text-sm text-green-800"
        >
          Enregistré.
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="mb-6 rounded bg-red-50 px-3 py-2 text-sm text-red-800"
        >
          {error}
        </p>
      )}

      <form
        method="post"
        action="/api/hq/magnets"
        className="grid max-w-3xl gap-5"
      >
        <input type="hidden" name="id" value={magnet?.id ?? ''} />
        <div>
          <label htmlFor="title" className={labelClass}>
            Titre
          </label>
          <input
            id="title"
            name="title"
            required
            maxLength={160}
            defaultValue={magnet?.title}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug{' '}
            <span className="font-normal text-slate-400">
              (l’adresse : /r/slug)
            </span>
          </label>
          <input
            id="slug"
            name="slug"
            required
            maxLength={80}
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            defaultValue={magnet?.slug}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="pitch" className={labelClass}>
            Promesse{' '}
            <span className="font-normal text-slate-400">(une phrase)</span>
          </label>
          <input
            id="pitch"
            name="pitch"
            required
            maxLength={300}
            defaultValue={magnet?.pitch}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="bullets" className={labelClass}>
            Ce que la personne reçoit{' '}
            <span className="font-normal text-slate-400">
              (une ligne par point, 8 max)
            </span>
          </label>
          <textarea
            id="bullets"
            name="bullets"
            rows={4}
            defaultValue={magnet?.bullets.join('\n')}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="content_md" className={labelClass}>
            Contenu en markdown{' '}
            <span className="font-normal text-slate-400">
              (- [ ] pour une checklist)
            </span>
          </label>
          <textarea
            id="content_md"
            name="content_md"
            required
            rows={18}
            defaultValue={magnet?.content_md ?? STARTER}
            className={`${fieldClass} font-mono text-sm`}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            name="published"
            defaultChecked={magnet?.published}
            className="size-4"
          />
          En ligne
        </label>
        <div className="flex items-center gap-4">
          <Button as="button" variant="primary" size="lg">
            Enregistrer
          </Button>
          {magnet && (
            <Link
              href={`/r/${magnet.slug}`}
              className="text-sm text-blue-600 hover:underline"
            >
              Voir la page /r/{magnet.slug}
            </Link>
          )}
        </div>
      </form>

      {magnet && (
        <section className="mt-16 max-w-3xl">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Aperçu du contenu enregistré
          </h2>
          <div className="rounded-lg p-6 ring-1 ring-slate-200 dark:ring-white/10">
            <MagnetMarkdown content={magnet.content_md} />
          </div>
        </section>
      )}
    </HqShell>
  );
}

export const getServerSideProps: GetServerSideProps<MagnetPageProps> = async (
  ctx,
) => {
  const redirect = await requireOwnerPage(ctx);
  if (redirect) return redirect;

  const id = String(ctx.params?.id ?? '');
  if (id === 'new') return { props: { magnet: null } };
  if (!/^[0-9a-f-]{36}$/i.test(id)) return { notFound: true };

  const { data: magnet } = await getHqAdmin()
    .from('lead_magnets')
    .select('id, slug, title, pitch, bullets, content_md, published')
    .eq('id', id)
    .maybeSingle();
  if (!magnet) return { notFound: true };
  return { props: { magnet } };
};
