import {
  ANSWER_VALUES,
  ANSWERS_MAX_LENGTH,
  allChecks,
  buildPlan,
  encodeGaps,
  parseGaps,
} from './answers';
import { SELF_AUDITS } from './registry';
import { SECURITY_AUDIT } from './security';

const audits = Object.values(SELF_AUDITS);

describe('Self-Audit definitions', () => {
  it.each(audits)('$id fits its worst case in the answers limit', (audit) => {
    // Every Check answered No is the longest string the quiz can send.
    expect(encodeGaps(audit, {}).length).toBeLessThanOrEqual(
      ANSWERS_MAX_LENGTH,
    );
  });

  it.each(audits)('$id has unique Check ids', (audit) => {
    const ids = allChecks(audit).map((check) => check.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(audits)('$id puts every Check under a known Priority', (audit) => {
    const keys = audit.priorities.map((priority) => priority.key);
    for (const check of allChecks(audit)) {
      expect(keys).toContain(check.priority);
    }
  });

  it.each(audits)('$id is registered under its own id', (audit) => {
    expect(SELF_AUDITS[audit.id]).toBe(audit);
  });
});

describe('encodeGaps', () => {
  it('sends No and Unknown, leaves out Yes, counts skipped as Unknown', () => {
    const answers: Record<string, number> = Object.fromEntries(
      allChecks(SECURITY_AUDIT).map((check) => [check.id, ANSWER_VALUES.yes]),
    );
    answers.s1 = ANSWER_VALUES.no;
    answers.n2 = ANSWER_VALUES.unknown;
    delete answers.b3;
    expect(encodeGaps(SECURITY_AUDIT, answers)).toBe('s1:n,n2:u,b3:u');
  });

  it('round-trips through parseGaps', () => {
    const gaps = parseGaps(
      encodeGaps(SECURITY_AUDIT, { s1: ANSWER_VALUES.no }),
    );
    expect(gaps.get('s1')).toBe('no');
    expect(gaps.get('s2')).toBe('unknown');
  });
});

describe('buildPlan', () => {
  it('orders Gaps by Priority and drops empty Priorities', () => {
    const plan = buildPlan(SECURITY_AUDIT, parseGaps('b2:n,s1:n,p1:u'));
    expect(
      plan.map(({ priority, steps }) => [
        priority.key,
        steps.map((step) => `${step.id}:${step.gap}`),
      ]),
    ).toEqual([
      ['critical', ['s1:no']],
      ['high', ['p1:unknown']],
      ['moderate', ['b2:no']],
    ]);
  });
});
