import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { HqShell } from '../../components/hq/hq-shell';
import { LeadsTable, type LeadRow } from '../../components/hq/leads-table';
import { requireOwnerPage } from '../../utils/hq/require-owner';
import { getHqAdmin } from '../../utils/hq/supabase';

interface MagnetStats {
  id: string;
  slug: string;
  title: string;
  views: number;
  leads: number;
  published: boolean;
}

interface HqHomeProps {
  magnets: MagnetStats[];
  recentLeads: LeadRow[];
}

const rate = (leads: number, views: number) =>
  views > 0 ? `${Math.round((leads / views) * 1000) / 10} %` : '—';

export default function HqHome({ magnets, recentLeads }: HqHomeProps) {
  return (
    <HqShell title="Magnets">
      {magnets.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-400">
          Aucun magnet pour l’instant.{' '}
          <Link
            href="/hq/magnets/new"
            className="text-blue-600 hover:underline"
          >
            Créer le premier
          </Link>
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="py-2 pr-4 font-medium">Magnet</th>
                <th className="py-2 pr-4 font-medium">Statut</th>
                <th className="py-2 pr-4 text-right font-medium">Vues</th>
                <th className="py-2 pr-4 text-right font-medium">Leads</th>
                <th className="py-2 pr-4 text-right font-medium">Conversion</th>
                <th className="py-2 font-medium">Lien</th>
              </tr>
            </thead>
            <tbody className="text-slate-800 dark:text-slate-200">
              {magnets.map((magnet) => (
                <tr
                  key={magnet.id}
                  className="hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  <td className="py-2 pr-4">
                    <Link
                      href={`/hq/magnets/${magnet.id}`}
                      className="font-medium hover:underline"
                    >
                      {magnet.title}
                    </Link>
                  </td>
                  <td className="py-2 pr-4">
                    {magnet.published ? 'En ligne' : 'Brouillon'}
                  </td>
                  <td className="py-2 pr-4 text-right tabular-nums">
                    {magnet.views}
                  </td>
                  <td className="py-2 pr-4 text-right tabular-nums">
                    <Link
                      href={`/hq/leads?magnet=${magnet.id}`}
                      className="hover:underline"
                    >
                      {magnet.leads}
                    </Link>
                  </td>
                  <td className="py-2 pr-4 text-right tabular-nums">
                    {rate(magnet.leads, magnet.views)}
                  </td>
                  <td className="py-2">
                    <Link
                      href={`/r/${magnet.slug}`}
                      className="text-blue-600 hover:underline"
                    >
                      /r/{magnet.slug}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="mb-4 mt-12 text-lg font-semibold text-slate-900 dark:text-white">
        Derniers leads
      </h2>
      <LeadsTable leads={recentLeads} />
    </HqShell>
  );
}

export const getServerSideProps: GetServerSideProps<HqHomeProps> = async (
  ctx,
) => {
  const redirect = await requireOwnerPage(ctx);
  if (redirect) return redirect;

  const db = getHqAdmin();
  const [magnetsResult, leadsResult] = await Promise.all([
    db
      .from('lead_magnets')
      .select('id, slug, title, published, views, leads(count)')
      .order('created_at', { ascending: false }),
    db
      .from('leads')
      .select(
        'id, email, first_name, source, marketing_consent, unsubscribed_at, utm_source, created_at, lead_magnets(title)',
      )
      .order('created_at', { ascending: false })
      .limit(20),
  ]);
  if (magnetsResult.error) throw magnetsResult.error;
  if (leadsResult.error) throw leadsResult.error;

  return {
    props: {
      magnets: magnetsResult.data.map(({ leads, ...magnet }) => ({
        ...magnet,
        leads: leads[0]?.count ?? 0,
      })),
      recentLeads: leadsResult.data,
    },
  };
};
