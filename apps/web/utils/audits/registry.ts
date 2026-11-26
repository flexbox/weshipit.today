import { SECURITY_AUDIT } from './security';
import { SPM_READINESS } from './spm-readiness';
import { STACK_AUDIT } from './stack';
import type { SelfAudit } from './types';
import { AUDIT_SOURCE_PREFIX } from '../hq/consent';

/**
 * Every Self-Audit the server knows, by id. A new Self-Audit must be added
 * here, or its leads get the score-only email (docs/audits/README.md).
 * Server only: the quiz pages import their own file, not this one.
 */
export const SELF_AUDITS: Record<string, SelfAudit> = Object.fromEntries(
  [SECURITY_AUDIT, SPM_READINESS, STACK_AUDIT].map((audit) => [
    audit.id,
    audit as SelfAudit,
  ]),
);

/** The id in a Self-Audit source (`audit:<id>`), or null for any other form. */
export function selfAuditIdFrom(source: string): string | null {
  return source.startsWith(AUDIT_SOURCE_PREFIX)
    ? source.slice(AUDIT_SOURCE_PREFIX.length)
    : null;
}
