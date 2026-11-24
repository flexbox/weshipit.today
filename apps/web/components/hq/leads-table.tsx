import { TrashIcon } from '@heroicons/react/20/solid';
import { Badge, Button, Text } from '@weshipit/ui';
import { useRouter } from 'next/router';
import type { FollowupStatus } from '../../utils/hq/emails';

export interface LeadRow {
  id: string;
  email: string;
  source: string;
  created_at: string;
  followup_status: string;
  first_name: string | null;
  utm_source: string | null;
  marketing_consent: boolean;
  unsubscribed_at: string | null;
  followup_sent_at: string | null;
  lead_magnets: { title: string } | null;
}

const dateFormat = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'Europe/Paris',
});

/** Columns the leads tables select; keep in sync with LeadRow. */
export const LEAD_ROW_COLUMNS =
  'id, email, first_name, source, marketing_consent, unsubscribed_at, utm_source, created_at, followup_status, followup_sent_at, lead_magnets(title)';

const FOLLOWUP_BADGES: Record<
  FollowupStatus,
  { label: string; variant: 'yellow' | 'blue' | 'green' }
> = {
  replied: { label: 'A répondu', variant: 'green' },
  sent: { label: 'Relance envoyée', variant: 'blue' },
  to_contact: { label: 'À contacter', variant: 'yellow' },
};

function FollowupCell({ lead, returnTo }: { lead: LeadRow; returnTo: string }) {
  const status = (lead.followup_status as FollowupStatus) ?? 'to_contact';
  const badge = FOLLOWUP_BADGES[status] ?? FOLLOWUP_BADGES.to_contact;
  const action =
    status === 'to_contact' && !lead.unsubscribed_at
      ? { label: 'Envoyer « Merci ! »', value: 'send' }
      : status === 'sent'
        ? { label: 'Marquer comme répondu', value: 'replied' }
        : null;
  return (
    <div className="flex items-center gap-2 whitespace-nowrap max-sm:flex-wrap">
      <Badge
        size="sm"
        variant={badge.variant}
        title={
          lead.followup_sent_at
            ? `Envoyée le ${dateFormat.format(new Date(lead.followup_sent_at))}`
            : undefined
        }
      >
        {badge.label}
      </Badge>
      {action && (
        <form method="post" action="/api/hq/followup">
          <input type="hidden" name="id" value={lead.id} />
          <input type="hidden" name="action" value={action.value} />
          <input type="hidden" name="returnTo" value={returnTo} />
          <Button as="button" size="sm" variant="outline">
            {action.label}
          </Button>
        </form>
      )}
    </div>
  );
}

function DeleteLeadButton({
  lead,
  returnTo,
}: {
  lead: LeadRow;
  returnTo: string;
}) {
  return (
    <form
      method="post"
      action="/api/hq/delete-lead"
      onSubmit={(event) => {
        if (!window.confirm(`Supprimer ${lead.email} ? C’est définitif.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={lead.id} />
      <input type="hidden" name="returnTo" value={returnTo} />
      <Button
        as="button"
        size="sm"
        variant="ghost"
        aria-label={`Supprimer ${lead.email}`}
        title="Supprimer"
        className="text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
      >
        <TrashIcon className="size-4" aria-hidden="true" />
      </Button>
    </form>
  );
}

/** Shared by /hq and /hq/leads. */
export function LeadsTable({ leads }: { leads: LeadRow[] }) {
  const { asPath, query } = useRouter();
  const error = typeof query.error === 'string' ? query.error : null;
  const returnUrl = new URL(asPath, 'http://hq');
  returnUrl.searchParams.delete('error');
  const returnTo = `${returnUrl.pathname}${returnUrl.search}`;

  return (
    <div>
      {/* Above the empty state: deleting the last lead can still fail. */}
      {error && (
        <p
          role="alert"
          className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-800 dark:bg-red-400/10 dark:text-red-300"
        >
          {error}
        </p>
      )}
      {leads.length === 0 ? (
        <Text variant="c1">
          Aucun lead pour l’instant. Ils arrivent dès qu’un visiteur remplit une
          page /r ou un quiz.
        </Text>
      ) : (
        <LeadsRows leads={leads} returnTo={returnTo} />
      )}
    </div>
  );
}

/**
 * Below sm, each row stacks (email, then follow-up, date and delete), so no
 * action hides past a scroll edge. Prénom, Origine and UTM show from xl up.
 */
function LeadsRows({
  leads,
  returnTo,
}: {
  leads: LeadRow[];
  returnTo: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm max-sm:block">
        <thead className="text-slate-500 max-sm:hidden dark:text-slate-400">
          <tr>
            <th className="py-2 pr-4 font-medium">Email</th>
            <th className="py-2 pr-4 font-medium max-xl:hidden">Prénom</th>
            <th className="py-2 pr-4 font-medium max-xl:hidden">Origine</th>
            <th className="py-2 pr-4 font-medium max-xl:hidden">UTM</th>
            <th className="py-2 pr-4 font-medium">Newsletter</th>
            <th className="py-2 pr-4 font-medium">Suivi</th>
            <th className="py-2 pr-4 font-medium">Date</th>
            <th className="py-2">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="text-slate-800 max-sm:block dark:text-slate-200">
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="hover:bg-slate-50 max-sm:flex max-sm:flex-wrap max-sm:items-center max-sm:gap-x-3 max-sm:gap-y-2 max-sm:py-3 dark:hover:bg-white/5"
            >
              <td className="py-2 pr-4 max-sm:w-full max-sm:p-0">
                <a
                  href={`mailto:${lead.email}`}
                  className="break-all underline decoration-slate-300 underline-offset-2 hover:decoration-current dark:decoration-slate-600"
                >
                  {lead.email}
                </a>
              </td>
              <td className="py-2 pr-4 max-xl:hidden">
                {lead.first_name ?? '—'}
              </td>
              <td className="py-2 pr-4 max-xl:hidden">
                {lead.lead_magnets?.title ?? lead.source}
              </td>
              <td className="py-2 pr-4 max-xl:hidden">
                {lead.utm_source ?? '—'}
              </td>
              <td className="py-2 pr-4 max-sm:hidden">
                {lead.unsubscribed_at ? (
                  <Badge size="sm" variant="red">
                    Désabonné
                  </Badge>
                ) : lead.marketing_consent ? (
                  <Badge size="sm" variant="green">
                    Oui
                  </Badge>
                ) : (
                  <Badge size="sm" variant="gray-light">
                    Non
                  </Badge>
                )}
              </td>
              <td className="py-2 pr-4 max-sm:p-0">
                <FollowupCell lead={lead} returnTo={returnTo} />
              </td>
              <td className="py-2 pr-4 tabular-nums max-sm:p-0 max-sm:text-slate-500 dark:max-sm:text-slate-400">
                {dateFormat.format(new Date(lead.created_at))}
              </td>
              <td className="py-2 text-right max-sm:ml-auto max-sm:p-0">
                <DeleteLeadButton lead={lead} returnTo={returnTo} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
