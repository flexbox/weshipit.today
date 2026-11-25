import { PlusIcon } from '@heroicons/react/20/solid';
import { Badge, Card, LinkButton, Text } from '@weshipit/ui';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { HqShell } from '../../components/hq/hq-shell';
import {
  LEAD_ROW_COLUMNS,
  LeadsTable,
  type LeadRow,
} from '../../components/hq/leads-table';
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
  totalLeads: number;
  leadsLastWeek: number;
  magnets: MagnetStats[];
  recentLeads: LeadRow[];
}

const number = new Intl.NumberFormat('fr-FR');
const percent = new Intl.NumberFormat('fr-FR', {
  maximumFractionDigits: 1,
  style: 'percent',
});

const rate = (leads: number, views: number) =>
  views > 0 ? percent.format(leads / views) : '—';

export default function HqHome({
  leadsLastWeek,
  magnets,
  recentLeads,
  totalLeads,
}: HqHomeProps) {
  const views = magnets.reduce((sum, magnet) => sum + magnet.views, 0);
  const magnetLeads = magnets.reduce((sum, magnet) => sum + magnet.leads, 0);
  const stats = [
    {
      hint: 'Magnets et quiz',
      label: 'Leads',
      value: number.format(totalLeads),
    },
    { label: 'Leads, 7 derniers jours', value: number.format(leadsLastWeek) },
    {
      hint: 'Une par visiteur et par session',
      label: 'Vues des pages /r',
      value: number.format(views),
    },
    {
      hint: 'Leads des magnets ÷ vues',
      label: 'Conversion /r',
      value: rate(magnetLeads, views),
    },
  ];

  return (
    <HqShell
      title="Tableau de bord"
      actions={
        <LinkButton href="/hq/magnets/new" size="lg" className="gap-1.5">
          <PlusIcon className="size-4" aria-hidden="true" />
          Nouveau magnet
        </LinkButton>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} size="sm">
            <Text tone="muted" variant="c2">
              {stat.label}
            </Text>
            <Text as="p" variant="h5" className="mt-2 tabular-nums">
              {stat.value}
            </Text>
            {stat.hint && (
              <Text variant="caption" tone="muted" className="mt-2">
                {stat.hint}
              </Text>
            )}
          </Card>
        ))}
      </div>

      <Text as="h2" variant="h6" className="mt-14">
        Magnets
      </Text>
      {magnets.length === 0 ? (
        <Text variant="c1" className="mt-4">
          Aucun magnet pour l’instant.{' '}
          <Link
            href="/hq/magnets/new"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Créer le premier
          </Link>
        </Text>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500 dark:text-slate-400">
              <tr>
                <th className="py-2 pr-4 font-medium">Magnet</th>
                <th className="py-2 pr-4 font-medium">Statut</th>
                <th className="py-2 pr-4 text-right font-medium">Vues</th>
                <th className="py-2 pr-4 text-right font-medium">Leads</th>
                <th className="py-2 pr-4 text-right font-medium max-sm:hidden">
                  Conversion
                </th>
                <th className="py-2 font-medium max-sm:hidden">Page</th>
              </tr>
            </thead>
            <tbody className="text-slate-800 dark:text-slate-200">
              {magnets.map((magnet) => (
                <tr
                  key={magnet.id}
                  className="hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  <td className="py-3 pr-4">
                    <Link
                      href={`/hq/magnets/${magnet.id}`}
                      className="font-medium underline decoration-slate-300 underline-offset-2 hover:decoration-current dark:decoration-slate-600"
                    >
                      {magnet.title}
                    </Link>
                  </td>
                  <td className="py-3 pr-4">
                    {magnet.published ? (
                      <Badge size="sm" variant="green">
                        En ligne
                      </Badge>
                    ) : (
                      <Badge size="sm" variant="gray-light">
                        Brouillon
                      </Badge>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums">
                    {number.format(magnet.views)}
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums">
                    <Link
                      href={`/hq/leads?magnet=${magnet.id}`}
                      className="underline decoration-slate-300 underline-offset-2 hover:decoration-current dark:decoration-slate-600"
                    >
                      {number.format(magnet.leads)}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums max-sm:hidden">
                    {rate(magnet.leads, magnet.views)}
                  </td>
                  <td className="py-3 max-sm:hidden">
                    <Link
                      href={`/r/${magnet.slug}`}
                      className="text-blue-600 hover:underline dark:text-blue-400"
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

      <div className="mt-14 flex items-end justify-between gap-4">
        <Text as="h2" variant="h6">
          Derniers leads
        </Text>
        <LinkButton href="/hq/leads" variant="ghost">
          Voir tous les leads
        </LinkButton>
      </div>
      <div className="mt-4">
        <LeadsTable leads={recentLeads} />
      </div>
    </HqShell>
  );
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export const getServerSideProps: GetServerSideProps<HqHomeProps> = async (
  ctx,
) => {
  const redirect = await requireOwnerPage(ctx);
  if (redirect) return redirect;

  const db = getHqAdmin();
  const weekAgo = new Date(Date.now() - WEEK_MS).toISOString();
  const [magnetsResult, leadsResult, totalResult, weekResult] =
    await Promise.all([
      db
        .from('lead_magnets')
        .select('id, slug, title, published, views, leads(count)')
        .order('created_at', { ascending: false }),
      db
        .from('leads')
        .select(LEAD_ROW_COLUMNS)
        .order('created_at', { ascending: false })
        .limit(10),
      db.from('leads').select('id', { count: 'exact', head: true }),
      db
        .from('leads')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', weekAgo),
    ]);
  if (magnetsResult.error) throw magnetsResult.error;
  if (leadsResult.error) throw leadsResult.error;
  if (totalResult.error) throw totalResult.error;
  if (weekResult.error) throw weekResult.error;

  return {
    props: {
      leadsLastWeek: weekResult.count ?? 0,
      magnets: magnetsResult.data.map(({ leads, ...magnet }) => ({
        ...magnet,
        leads: leads[0]?.count ?? 0,
      })),
      recentLeads: leadsResult.data,
      totalLeads: totalResult.count ?? 0,
    },
  };
};
