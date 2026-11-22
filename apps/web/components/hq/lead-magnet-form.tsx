import { Button } from '@weshipit/ui';
import { useRouter } from 'next/router';
import { type FormEvent, useState } from 'react';
import { MARKETING_CONSENT_LABEL } from '../../utils/hq/consent';

const inputClass =
  'w-full rounded-md border-0 bg-white px-3.5 py-2.5 text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-white/5 dark:text-white dark:ring-white/10';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const;

interface LeadMagnetFormProps {
  slug: string;
  submitLabel?: string;
}

/**
 * Capture form for /r/[slug]. On success it opens the resource right away;
 * the same link also goes out by email.
 */
export function LeadMagnetForm({
  slug,
  submitLabel = 'Recevoir la ressource',
}: LeadMagnetFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    const form = new FormData(event.currentTarget);
    const params = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries(
      UTM_KEYS.map((key) => [key, params.get(key) ?? undefined]),
    );
    try {
      const response = await fetch('/api/lm/subscribe', {
        body: JSON.stringify({
          ...utm,
          email: form.get('email'),
          first_name: form.get('first_name'),
          magnet: slug,
          marketing_consent: form.get('marketing_consent') === 'on',
          source: 'r-page',
          website: form.get('website'),
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      if (result.token) {
        await router.push(`/r/${slug}/${result.token}`);
      } else {
        setStatus('idle');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="lm-first-name"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Prénom{' '}
          <span className="font-normal text-slate-400">(facultatif)</span>
        </label>
        <input
          id="lm-first-name"
          name="first_name"
          type="text"
          autoComplete="given-name"
          maxLength={80}
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor="lm-email"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Email
        </label>
        <input
          id="lm-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={254}
          placeholder="toi@exemple.com"
          className={inputClass}
        />
      </div>
      {/* Honeypot: off-screen for people, tempting for bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="lm-website">Site web</label>
        <input
          id="lm-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <label className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
        <input
          name="marketing_consent"
          type="checkbox"
          className="mt-0.5 size-4 rounded border-slate-300"
        />
        <span>{MARKETING_CONSENT_LABEL}</span>
      </label>
      <Button
        as="button"
        variant="primary"
        size="xl"
        className="w-full justify-center"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Envoi…' : submitLabel}
      </Button>
      <p
        role="status"
        aria-live="polite"
        className="text-sm text-red-600 dark:text-red-400"
      >
        {status === 'error'
          ? 'L’envoi n’a pas marché. Réessaie dans un instant.'
          : ''}
      </p>
    </form>
  );
}
