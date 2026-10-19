# Incident & Postmortem Context

Add this playbook for defensive code; search only within the investigator's owned evidence category using available read-only tools. Do not create incidents, update tickets, or send messages.

- **Issue tracker (e.g. Jira or Linear)**: search accessible tickets labeled `incident`, `sev-*`, `postmortem-action-item`, or `reliability`, near the change date. Follow incident and remediation links within the category.
- **Team chat**: search accessible `#sev-*` and `#incident-*` channels around the dates the code was introduced. Read full threads; record retention and access limits.
- **Git/local source**: inspect commits mentioning "fix for incident", "add defensive check", or "revert" followed by "re-apply with...". These are leads, not proof of motivation.
- **Local documents**: inspect postmortems, incident timelines, and runbooks, including historical or superseded versions. No MCP is required for local documents.
- **Observability/error tracking**: inspect accessible incident records and bounded telemetry around the change. Record time zones, retention windows, and missing access.

Return incident ID/path, dates, exact rationale quotes, affected symbols, remediation links, and contradictions. Pass cross-category links as Additional Leads rather than duplicating another investigator's search. Distinguish a documented causal link from temporal correlation. Missing records or permissions are gaps, not evidence that no incident occurred.

---
Adapted from [pstack/why incident-postmortem](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/why/references/sources/incident-postmortem.md), pinned to `d457567332aa6989e753ea289f30ea2bfbc80bc0`; expanded local read-only guidance. See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
