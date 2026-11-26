import type { Check, SelfAudit } from './types';

/** A Check not answered Yes. */
export type Gap = 'no' | 'unknown';

/** Quiz answer values: No, Unknown, Yes. */
export const ANSWER_VALUES = { no: 0, unknown: 0.5, yes: 1 } as const;

/** Longest answers string the subscribe API accepts (a meta value). */
export const ANSWERS_MAX_LENGTH = 200;

export function allChecks<P extends string>(audit: SelfAudit<P>): Check<P>[] {
  return audit.categories.flatMap((category) => category.checks);
}

/**
 * The Gaps as `r2:n,d3:u`, for the subscribe request. Yes answers are left
 * out and a Check with no answer counts as Unknown. The Report copy never
 * travels: the server rebuilds it from the ids (docs/adr/0001).
 */
export function encodeGaps(
  audit: SelfAudit,
  answers: Record<string, number>,
): string {
  return allChecks(audit)
    .filter((check) => answers[check.id] !== ANSWER_VALUES.yes)
    .map(
      (check) =>
        `${check.id}:${answers[check.id] === ANSWER_VALUES.no ? 'n' : 'u'}`,
    )
    .join(',');
}

/**
 * Reads what encodeGaps() wrote. Unknown codes are ignored; ids are kept
 * as-is and filtered against the Self-Audit when the plan is built.
 */
export function parseGaps(raw: unknown): Map<string, Gap> {
  const gaps = new Map<string, Gap>();
  if (typeof raw !== 'string') return gaps;
  for (const pair of raw.split(',')) {
    const [id, code] = pair.split(':');
    if (code === 'n') gaps.set(id, 'no');
    if (code === 'u') gaps.set(id, 'unknown');
  }
  return gaps;
}

export interface PlanStep<P extends string = string> extends Check<P> {
  gap: Gap;
}

/** Every Gap, grouped under its Priority, in the Self-Audit's order. */
export function buildPlan<P extends string>(
  audit: SelfAudit<P>,
  gaps: Map<string, Gap>,
): { priority: { key: P; label: string }; steps: PlanStep<P>[] }[] {
  const checks = allChecks(audit);
  return audit.priorities
    .map((priority) => ({
      priority,
      steps: checks
        .filter(
          (check) => check.priority === priority.key && gaps.has(check.id),
        )
        .map((check) => ({ ...check, gap: gaps.get(check.id) as Gap })),
    }))
    .filter((group) => group.steps.length > 0);
}
