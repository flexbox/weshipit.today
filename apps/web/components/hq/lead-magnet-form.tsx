import { Button, FieldError, Input, Label, LabelHint } from '@weshipit/ui';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MARKETING_CONSENT_LABELS } from '../../utils/hq/consent';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const;

interface LeadMagnetFormValues {
  first_name: string;
  email: string;
  marketing_consent: boolean;
  /** Honeypot, sent to the API as `website`. */
  hp: string;
}

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
  submitLabel = 'Unlock content for free',
}: LeadMagnetFormProps) {
  const router = useRouter();
  const [emailed, setEmailed] = useState(false);
  const {
    formState: { errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    register,
    setError,
  } = useForm<LeadMagnetFormValues>({
    defaultValues: {
      email: '',
      first_name: '',
      hp: '',
      marketing_consent: false,
    },
  });

  async function onSubmit(values: LeadMagnetFormValues) {
    const params = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries(
      UTM_KEYS.map((key) => [key, params.get(key) ?? undefined]),
    );
    try {
      const response = await fetch('/api/lm/subscribe', {
        body: JSON.stringify({
          ...utm,
          email: values.email,
          first_name: values.first_name,
          locale: 'en',
          magnet: slug,
          marketing_consent: values.marketing_consent,
          source: 'r-page',
          website: values.hp,
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError('root.server', {
          message:
            response.status === 400
              ? 'Please check your email address and try again.'
              : 'Something went wrong. Please try again in a moment.',
        });
        return;
      }
      if (result.token) {
        await router.push(`/r/${slug}/${result.token}`);
      } else {
        // No token to open here: the link still goes out by email.
        setEmailed(true);
      }
    } catch {
      setError('root.server', {
        message: 'Network error. Check your connection and try again.',
      });
    }
  }

  const redirecting = isSubmitSuccessful && !errors.root && !emailed;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Enter your email to unlock this content for free and download it as PDF.
      </p>
      <div>
        <Label htmlFor="lm-first-name" className="mb-2">
          First name <LabelHint>(optional)</LabelHint>
        </Label>
        <Input
          id="lm-first-name"
          type="text"
          autoComplete="given-name"
          aria-invalid={errors.first_name ? true : undefined}
          aria-describedby={
            errors.first_name ? 'lm-first-name-error' : undefined
          }
          size="lg"
          {...register('first_name', {
            maxLength: {
              message: 'Keep it under 80 characters.',
              value: 80,
            },
          })}
        />
        {errors.first_name && (
          <FieldError id="lm-first-name-error">
            {errors.first_name.message}
          </FieldError>
        )}
      </div>
      <div>
        <Label htmlFor="lm-email" className="mb-2">
          Email
        </Label>
        <Input
          id="lm-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'lm-email-error' : undefined}
          size="lg"
          {...register('email', {
            maxLength: { message: 'This email is too long.', value: 254 },
            pattern: {
              message: 'Enter a valid email, like you@example.com.',
              value: EMAIL_PATTERN,
            },
            required: 'Enter your email to unlock the content.',
            setValueAs: (value: string) => value.trim(),
          })}
        />
        {errors.email && (
          <FieldError id="lm-email-error">{errors.email.message}</FieldError>
        )}
      </div>
      {/*
        Honeypot: off-screen for people, tempting for bots. The name and the
        ignore attributes keep browser and password-manager autofill out of
        it, otherwise real visitors get silently treated as bots.
      */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="lm-hp">Leave this field empty</label>
        <input
          id="lm-hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
          data-bwignore
          data-form-type="other"
          {...register('hp')}
        />
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
          <input
            type="checkbox"
            aria-invalid={errors.marketing_consent ? true : undefined}
            aria-describedby={
              errors.marketing_consent ? 'lm-consent-error' : undefined
            }
            className="mt-0.5 size-4 rounded border-slate-300"
            {...register('marketing_consent', {
              required: 'Please tick this box to unlock the content.',
            })}
          />
          <span>{MARKETING_CONSENT_LABELS.en}</span>
        </label>
        {errors.marketing_consent && (
          <FieldError id="lm-consent-error">
            {errors.marketing_consent.message}
          </FieldError>
        )}
      </div>
      <Button
        as="button"
        variant="primary"
        size="xl"
        className="w-full justify-center"
        disabled={isSubmitting || redirecting}
      >
        {isSubmitting || redirecting ? 'Unlocking…' : submitLabel}
      </Button>
      <p
        role="status"
        aria-live="polite"
        className={
          errors.root?.server
            ? 'text-sm text-red-600 dark:text-red-400'
            : 'text-sm text-slate-600 dark:text-slate-400'
        }
      >
        {errors.root?.server?.message ??
          (emailed
            ? 'Check your inbox: we just sent you the link to the content.'
            : redirecting
              ? 'Done! Opening the content…'
              : '')}
      </p>
    </form>
  );
}
