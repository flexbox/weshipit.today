import { NotFoundError } from 'shipmail';
import { getShipmail } from './shipmail';

/**
 * The newsletter list lives in one Shipmail audience (SHIPMAIL_AUDIENCE_ID).
 * HQ adds every lead that opted in, and removes them when they unsubscribe
 * through an HQ link. Shipmail handles its own unsubscribes and bounces, and
 * never re-adds someone who left the audience. Without the env vars (local
 * dev) both calls do nothing.
 */
function audience() {
  const shipmail = getShipmail();
  const audienceId = process.env.SHIPMAIL_AUDIENCE_ID;
  if ((!shipmail || !audienceId) && process.env.NODE_ENV === 'production') {
    throw new Error(
      'Shipmail audience is not configured (SHIPMAIL_API_KEY, SHIPMAIL_AUDIENCE_ID)',
    );
  }
  return shipmail && audienceId ? { audienceId, shipmail } : null;
}

export async function addToAudience(input: {
  email: string;
  firstName?: string | null;
  source: string;
}): Promise<void> {
  const target = audience();
  if (!target) return;
  await target.shipmail.audiences.subscribers.add(target.audienceId, {
    consent_source: `weshipit-hq:${input.source}`,
    display_name: input.firstName ?? undefined,
    email_address: input.email,
  });
}

export async function unsubscribeFromAudience(email: string): Promise<void> {
  const target = audience();
  if (!target) return;
  const { audienceId, shipmail } = target;
  let subscriber;
  try {
    subscriber = await shipmail.audiences.subscribers.getByEmail(
      audienceId,
      email,
    );
  } catch (error) {
    if (error instanceof NotFoundError) return; // Not in the audience.
    throw error;
  }
  if (subscriber.status === 'subscribed' || subscriber.status === 'pending') {
    await shipmail.audiences.subscribers.unsubscribe(audienceId, subscriber.id);
  }
}
