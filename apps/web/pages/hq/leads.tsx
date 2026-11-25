import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import { Button, Input, Select } from '@weshipit/ui';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { HqShell } from '../../components/hq/hq-shell';
import {
  LEAD_ROW_COLUMNS,
  LeadsTable,
  type LeadRow,
} from '../../components/hq/leads-table';
import { FOLLOWUP_STATUSES } from '../../utils/hq/emails';
import { requireOwnerPage } from '../../utils/hq/require-owner';
import { getHqAdmin } from '../../utils/hq/supabase';

interface HqLeadsProps {
  total: number;
  leads: LeadRow[];
  magnets: { id: string; title: string }[];
  filter: { magnet: string; source: string; followup: string };
}

const LIMIT = 500;

export default function HqLeads({
  filter,
  leads,
  magnets,
  total,
}: HqLeadsProps) {
  const exportQuery = new URLSearchParams(
    Object.entries(filter).filter(([, value]) => value),
  ).toString();

  return (
    <HqShell title="Leads">
      <form
        method="get"
        className="mb-6 flex flex-wrap items-end gap-4 text-sm"
      >
        <label className="flex flex-col gap-1 text-slate-600 dark:text-slate-400">
          Magnet
          <Select name="magnet" defaultValue={filter.magnet} size="sm">
            <option value="">Tous</option>
            {magnets.map((magnet) => (
              <option key={magnet.id} value={magnet.id}>
                {magnet.title}
              </option>
            ))}
          </Select>
        </label>
        <label className="flex flex-col gap-1 text-slate-600 dark:text-slate-400">
          Source
          <Input
            name="source"
            defaultValue={filter.source}
            placeholder="r-page, audit:security…"
            size="sm"
          />
        </label>
        <label className="flex flex-col gap-1 text-slate-600 dark:text-slate-400">
          Suivi
          <Select name="followup" defaultValue={filter.followup} size="sm">
            <option value="">Tous</option>
            <option value="to_contact">À contacter</option>
            <option value="sent">Relance envoyée</option>
            <option value="replied">A répondu</option>
          </Select>
        </label>
        <Button as="button" variant="outline">
          Filtrer
        </Button>
        {/* A plain <a>: next/link must not open an API route as a page. */}
        <Button
          as="a"
          href={`/api/hq/leads-csv${exportQuery ? `?${exportQuery}` : ''}`}
          variant="outline"
          className="ml-auto gap-1.5"
        >
          <ArrowDownTrayIcon className="size-4" aria-hidden="true" />
          Exporter en CSV
        </Button>
      </form>
      <p className="mb-4 text-sm text-slate-500">
        {total} lead{total > 1 ? 's' : ''}
        {total > LIMIT ? `, ${LIMIT} affichés (l’export contient tout)` : ''}
        {filter.magnet || filter.source || filter.followup ? (
          <>
            {' · '}
            <Link href="/hq/leads" className="hover:underline">
              Enlever les filtres
            </Link>
          </>
        ) : null}
      </p>
      <LeadsTable leads={leads} />
    </HqShell>
  );
}

export const getServerSideProps: GetServerSideProps<HqLeadsProps> = async (
  ctx,
) => {
  const redirect = await requireOwnerPage(ctx);
  if (redirect) return redirect;

  const filter = {
    followup: FOLLOWUP_STATUSES.find((status) => status === ctx.query.followup)
      ? (ctx.query.followup as string)
      : '',
    magnet:
      typeof ctx.query.magnet === 'string' &&
      /^[0-9a-f-]{36}$/i.test(ctx.query.magnet)
        ? ctx.query.magnet
        : '',
    source: typeof ctx.query.source === 'string' ? ctx.query.source.trim() : '',
  };

  const db = getHqAdmin();
  let query = db
    .from('leads')
    .select(LEAD_ROW_COLUMNS, { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(LIMIT);
  if (filter.magnet) query = query.eq('lead_magnet_id', filter.magnet);
  if (filter.source) query = query.eq('source', filter.source);
  if (filter.followup) query = query.eq('followup_status', filter.followup);

  const [leadsResult, magnetsResult] = await Promise.all([
    query,
    db
      .from('lead_magnets')
      .select('id, title')
      .order('created_at', { ascending: false }),
  ]);
  if (leadsResult.error) throw leadsResult.error;
  if (magnetsResult.error) throw magnetsResult.error;

  return {
    props: {
      filter,
      leads: leadsResult.data,
      magnets: magnetsResult.data,
      total: leadsResult.count ?? leadsResult.data.length,
    },
  };
};
