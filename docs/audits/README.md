# Self-Audits

A Self-Audit is a free quiz on weshipit.today. The visitor answers each Check with No, Unknown or Yes, sees a Score and a Verdict, and leaves their email to get a Report: their Gaps as an ordered plan, with the fix for each one. Terms are defined in [../GLOSSARY.md](../GLOSSARY.md).

| Self-Audit    | Page                                            | File                            | Language | Priorities                                                    |
| ------------- | ----------------------------------------------- | ------------------------------- | -------- | ------------------------------------------------------------- |
| Stack         | `/audit-gratuit`                                | `utils/audits/stack.ts`         | fr (tu)  | Gains rapides, Chantiers structurants, Améliorations          |
| Security      | `/react-native-security-audit`                  | `utils/audits/security.ts`      | en       | Critical, High, Moderate                                      |
| SPM readiness | `/react-native-swift-package-manager-migration` | `utils/audits/spm-readiness.ts` | en       | Start here, Quick fixes, Library changes, Waiting on upstream |

Paths are relative to `apps/web/`.

## How it works

1. The page renders `<SelfAuditQuiz audit={…} />` (`components/self-audit-quiz.tsx`) with the Self-Audit's file.
2. The form posts to `/api/lm/subscribe` with `source: audit:<id>`, the Score and the Gaps as `s1:n,n2:u`. Yes answers are left out.
3. The server finds the Self-Audit in `utils/audits/registry.ts`, builds the Report with `selfAuditReportEmail` (`utils/hq/emails.ts`) and sends it through Shipmail. The browser never sends Report text ([ADR 0001](../adr/0001-reports-built-server-side-from-check-ids.md)).
4. Sending the form is the opt-in: the lead joins the Shipmail **Leads** audience, and a Slack message names the Self-Audit.

If the email fails, the form says so and Slack gets an alert. A page cached before its Self-Audit was registered gets the score-only email.

## Every Report has the same skeleton

1. Subject: `<report.subject>: 62/100, 5 fixes in order` (or `nothing to fix`).
2. `62/100. <Verdict label>.` then `7 of 12 checks already pass. Here are the other 5, in the order to tackle them.`
3. The Gaps, numbered across the whole email, under each Priority in the order the Self-Audit defines. An Unknown Gap is titled `Verify: …` (`À vérifier : …`). Each one shows its fix and, when there is one, its command.
4. The closing step: a command to run, or a page to come back to.
5. The offer line, followed by the link to `/audit`.
6. `Stuck on one fix? Reply with its number.`
7. Unsubscribe.

Plain text, one language per Self-Audit, no greeting and no signature.

## Add a Self-Audit

1. **Write `utils/audits/<id>.ts`** exporting a `SelfAudit` (`utils/audits/types.ts`):
   - `id`: kebab-case. It ends up in lead sources (`audit:<id>`), so never rename it.
   - `name`: what Slack and HQ show.
   - `locale`: `fr` or `en`. In French, use tu everywhere: page, Checks, fixes, Report.
   - `priorities`: the ordered groups of the Report. Pick the axis the form promises (effort, severity, impact × effort).
   - `categories`, each with its `checks`. A Check needs:
     - `id`: short and unique. Never reuse or rename one ([ADR 0001](../adr/0001-reports-built-server-side-from-check-ids.md)).
     - `text`: a statement that a Yes answer confirms.
     - `label`: a short imperative step title, e.g. "Block plain HTTP traffic".
     - `priority`
     - `fix`: what to do, in 1 or 2 sentences.
     - `command`: optional, only when there is one obvious command to run.
   - `getVerdict`: three Score bands.
   - `page`: the quiz copy. `page.form.bullets` must only promise what the Report contains.
   - `report`: the subject start, the `closing` step and the `offer` line.
2. **Register it** in `utils/audits/registry.ts`.
3. **Add a component** in `components/<id>.tsx` that renders `<SelfAuditQuiz audit={…} />`, and put it on its page.
4. **Run the tests**: `npx nx test web -u` writes the new Report snapshot in `utils/hq/__snapshots__/`. Read it as the visitor would. The definition tests fail on a duplicate Check id, an unknown Priority, or answers too long for the API (about 35 Checks at most).
5. **Take it once** with your own address after deploy, and check the Report and the Slack message.

## Words to keep straight

- **Audit** is the paid service at `/audit`. The free quiz is always a **Self-Audit**.
- A **Category** groups Checks on the quiz page. A **Priority** groups Gaps in the Report. A Check has one of each, and they are unrelated.
- The **Report** is the email with the plan. A Score alone is not a Report.
