import { Button, Input, Label, LabelHint, Textarea } from '@weshipit/ui';
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
          <Label htmlFor="title" className="mb-1">
            Titre
          </Label>
          <Input
            id="title"
            name="title"
            required
            maxLength={160}
            defaultValue={magnet?.title}
          />
        </div>
        <div>
          <Label htmlFor="slug" className="mb-1">
            Slug <LabelHint>(l’adresse : /r/slug)</LabelHint>
          </Label>
          <Input
            id="slug"
            name="slug"
            required
            maxLength={80}
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            defaultValue={magnet?.slug}
          />
        </div>
        <div>
          <Label htmlFor="pitch" className="mb-1">
            Promesse <LabelHint>(une phrase)</LabelHint>
          </Label>
          <Input
            id="pitch"
            name="pitch"
            required
            maxLength={300}
            defaultValue={magnet?.pitch}
          />
        </div>
        <div>
          <Label htmlFor="bullets" className="mb-1">
            Ce que la personne reçoit{' '}
            <LabelHint>(une ligne par point, 8 max)</LabelHint>
          </Label>
          <Textarea
            id="bullets"
            name="bullets"
            rows={4}
            defaultValue={magnet?.bullets.join('\n')}
          />
        </div>
        <div>
          <Label htmlFor="content_md" className="mb-1">
            Contenu en markdown{' '}
            <LabelHint>(- [ ] pour une checklist)</LabelHint>
          </Label>
          <Textarea
            id="content_md"
            name="content_md"
            required
            rows={18}
            defaultValue={magnet?.content_md ?? STARTER}
            className="font-mono text-sm"
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
