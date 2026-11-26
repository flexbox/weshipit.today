# weshipit.today

The weshipit.today site sells React Native consulting. Its lead-capture side turns visitors into leads through free tools and resources.

## Lead capture

**Self-Audit**:
A free quiz on the site that a visitor fills in to score one area of their app (stack, security, SPM readiness). It ends with an email form that sends the Report.
_Avoid_: audit, quiz, checklist, survey

**Audit**:
The paid service where the team reviews a client's codebase in depth. A Self-Audit points to it at the end.
_Avoid_: full audit, deep audit

**Check**:
One statement in a Self-Audit that the visitor answers with No, Unknown or Yes.
_Avoid_: question, item

**Category**:
A themed set of Checks shown together as one step of a Self-Audit (e.g. "Secrets & storage").
_Avoid_: section, step

**Gap**:
A Check answered No or Unknown (a skipped Check counts as Unknown). An Unknown Gap is something to verify. A No Gap is confirmed.
_Avoid_: weak spot, blocker, failure, "check first" (for an Unknown Gap, say "verify")

**Priority**:
The ordered group a Gap falls into in a Report. Each Self-Audit defines its own Priorities: effort for SPM readiness, severity for security, impact and effort for the stack.
_Avoid_: category (a category groups Checks on the quiz page, not Gaps in a Report)

**Score**:
The share of Checks answered Yes, out of 100, with Unknown counting as half.

**Verdict**:
The named band a Score falls in, defined by each Self-Audit.
_Avoid_: grade, level

**Report**:
The email a visitor gets after a Self-Audit. It turns their Gaps into an ordered plan, with the fix for each one. A Score on its own is not a Report.
_Avoid_: results, plan email, score email

**Lead**:
A person who left their email through any capture form.
_Avoid_: contact, prospect
