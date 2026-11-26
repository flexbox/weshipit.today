# Self-Audit Reports are built on the server from Check ids

When a visitor asks for their Report, the quiz sends only the ids of their Gaps (`s1:n,n2:u`) and the Score. The server looks up the Self-Audit by id and writes the Report from the copy in `apps/web/utils/audits/<id>.ts`. We chose this over sending the Report text from the browser for two reasons. Anything the browser sends can be edited, so the email we put our name on would carry text we never wrote. And the copy stays in one place that is easy to test.

## Consequences

- The answers string must fit the 200-character meta limit of `/api/lm/subscribe`. `utils/audits/answers.spec.ts` fails when a Self-Audit's worst case (every Check answered No) goes over it. A Self-Audit with around 40 Checks needs a shorter encoding first.
- Check ids are a contract between the quiz page and the server. Pages cached by visitors still send the old ids, so renaming or reusing an id sends the wrong fixes. Add new ids instead.
- A page cached before a Self-Audit was registered sends no answers, and gets the score-only email rather than an empty Report that would say "nothing to fix".
- The quiz page imports the same file, so the fix copy also ships in that page's JavaScript. It is public advice, so this is accepted.
