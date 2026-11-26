import { NotFoundError } from 'shipmail';
import { NEWSLETTER_SOURCE } from './emails';
import { getShipmail } from './shipmail';

/**
 * Opted-in leads go to one of two Shipmail audiences:
 * - Newsletter (SHIPMAIL_NEWSLETTER_AUDIENCE_ID): the davidl.fr newsletter form.
 * - Leads (SHIPMAIL_LEADS_AUDIENCE_ID): lead magnets (/r/) and self-audits.
 * An HQ unsubscribe link removes them from both. Shipmail handles its own
 * unsubscribes and bounces, and never re-adds someone who left an audience.
 * Without the env vars (local dev) the calls do nothing.
 */
export type AudienceName = 'newsletter' | 'leads';

const ENV: Record<AudienceName, string> = {
  leads: 'SHIPMAIL_LEADS_AUDIENCE_ID',
  newsletter: 'SHIPMAIL_NEWSLETTER_AUDIENCE_ID',
};

/** Which audience a signup belongs to, from the form it came from. */
export function audienceFor(source: string): AudienceName {
  return source === NEWSLETTER_SOURCE ? 'newsletter' : 'leads';
}

function audienceId(name: AudienceName): string | undefined {
  return process.env[ENV[name]] || undefined;
}

function target(name: AudienceName) {
  const shipmail = getShipmail();
  const id = audienceId(name);
  if ((!shipmail || !id) && process.env.NODE_ENV === 'production') {
    throw new Error(
      `Shipmail ${name} audience is not configured (SHIPMAIL_API_KEY, ${ENV[name]})`,
    );
  }
  return shipmail && id ? { id, shipmail } : null;
}

export async function addToAudience(input: {
  email: string;
  firstName?: string | null;
  source: string;
}): Promise<void> {
  const audience = target(audienceFor(input.source));
  if (!audience) return;
  await audience.shipmail.audiences.subscribers.add(audience.id, {
    consent_source: `weshipit-hq:${input.source}`,
    display_name: input.firstName ?? undefined,
    email_address: input.email,
  });
}

async function findSubscriber(name: AudienceName, email: string) {
  const audience = target(name);
  if (!audience) return null;
  const { id, shipmail } = audience;
  try {
    const subscriber = await shipmail.audiences.subscribers.getByEmail(
      id,
      email,
    );
    return { id, shipmail, subscriber };
  } catch (error) {
    if (error instanceof NotFoundError) return null; // Not in this audience.
    throw error;
  }
}

async function unsubscribeFrom(name: AudienceName, email: string) {
  const found = await findSubscriber(name, email);
  if (!found) return;
  const { id, shipmail, subscriber } = found;
  if (subscriber.status === 'subscribed' || subscriber.status === 'pending') {
    await shipmail.audiences.subscribers.unsubscribe(id, subscriber.id);
  }
}

async function removeFrom(name: AudienceName, email: string) {
  const found = await findSubscriber(name, email);
  if (!found) return;
  await found.shipmail.audiences.subscribers.remove(
    found.id,
    found.subscriber.id,
  );
}

async function forBoth(
  run: (name: AudienceName, email: string) => Promise<void>,
  email: string,
) {
  const results = await Promise.allSettled([
    run('newsletter', email),
    run('leads', email),
  ]);
  const failed = results.find((result) => result.status === 'rejected');
  if (failed) throw (failed as PromiseRejectedResult).reason;
}

/** An HQ unsubscribe link means "no more emails": leave both audiences. */
export function unsubscribeFromAudiences(email: string): Promise<void> {
  return forBoth(unsubscribeFrom, email);
}

/**
 * Deleting a lead in HQ (my own test signups) removes the address from both
 * audiences. Unlike an unsubscribe, a removed address can sign up again.
 */
export function removeFromAudiences(email: string): Promise<void> {
  return forBoth(removeFrom, email);
}
