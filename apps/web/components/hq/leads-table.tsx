import { Badge, Text } from '@weshipit/ui';

export interface LeadRow {
  id: string;
  email: string;
  source: string;
  created_at: string;
  first_name: string | null;
  utm_source: string | null;
  marketing_consent: boolean;
  unsubscribed_at: string | null;
  lead_magnets: { title: string } | null;
}

const dateFormat = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'Europe/Paris',
});

/** Shared by /hq and /hq/leads. */
export function LeadsTable({ leads }: { leads: LeadRow[] }) {
  if (leads.length === 0) {
    return <Text variant="c1">Aucun lead.</Text>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-slate-500">
          <tr>
            <th className="py-2 pr-4 font-medium">Email</th>
            <th className="py-2 pr-4 font-medium">Prénom</th>
            <th className="py-2 pr-4 font-medium">Origine</th>
            <th className="py-2 pr-4 font-medium">UTM</th>
            <th className="py-2 pr-4 font-medium">Emails</th>
            <th className="py-2 font-medium">Date</th>
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
              <td className="py-2 tabular-nums">
                {dateFormat.format(new Date(lead.created_at))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
