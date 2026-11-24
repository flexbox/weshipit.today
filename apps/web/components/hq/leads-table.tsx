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
        ? { label: 'A répondu', value: 'replied' }
        : null;
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
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
        className="text-slate-400 hover:text-red-600 dark:hover:text-red-400"
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

  if (leads.length === 0) {
    return <Text variant="c1">Aucun lead.</Text>;
  }
  return (
    <div className="overflow-x-auto">
      {error && (
        <p
          role="alert"
          className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-800"
        >
          {error}
        </p>
      )}
      <table className="w-full text-left text-sm">
        <thead className="text-slate-500">
          <tr>
            <th className="py-2 pr-4 font-medium">Email</th>
            <th className="py-2 pr-4 font-medium">Prénom</th>
            <th className="py-2 pr-4 font-medium">Origine</th>
            <th className="py-2 pr-4 font-medium">UTM</th>
            <th className="py-2 pr-4 font-medium">Emails</th>
            <th className="py-2 pr-4 font-medium">Suivi</th>
            <th className="py-2 pr-4 font-medium">Date</th>
            <th className="py-2">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="text-slate-800 dark:text-slate-200">
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="hover:bg-slate-50 dark:hover:bg-white/5"
            >
              <td className="py-2 pr-4">
                <a href={`mailto:${lead.email}`} className="hover:underline">
                  {lead.email}
                </a>
              </td>
              <td className="py-2 pr-4">{lead.first_name ?? '—'}</td>
              <td className="py-2 pr-4">
                {lead.lead_magnets?.title ?? lead.source}
              </td>
              <td className="py-2 pr-4">{lead.utm_source ?? '—'}</td>
              <td className="py-2 pr-4">
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
              <td className="py-2 pr-4">
                <FollowupCell lead={lead} returnTo={returnTo} />
              </td>
              <td className="py-2 pr-4 tabular-nums">
                {dateFormat.format(new Date(lead.created_at))}
              </td>
              <td className="py-2 text-right">
                <DeleteLeadButton lead={lead} returnTo={returnTo} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
