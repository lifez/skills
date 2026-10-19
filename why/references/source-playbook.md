# Source playbooks

Assign one investigator per evidence category, using all needed read-only tools within it. Always assess local source/history and local documents; MCP-dependent categories need matching available read tools or an explicit gap. Tool names are examples, not guarantees: discover the actual tool map and schemas first. Resolve this index from the why skill directory; Markdown links below are relative to this file.

| Category | Playbook | Example MCP it documents |
|---|---|---|
| Source control history | [`code-archaeology.md`](sources/code-archaeology.md) | git, `gh-axi` |
| Issue / ticket tracker | [`jira.md`](sources/jira.md) | Jira / Atlassian |
| Long-form documents | [`docs.md`](sources/docs.md) | Local `docs/` at repo root (`rg`, `git`), no MCP needed |
| Real-time team chat | [`slack.md`](sources/slack.md) | Slack (adapt for Discord, Microsoft Teams, Mattermost) |
| Infrastructure observability | [`datadog.md`](sources/datadog.md) | Datadog (adapt for New Relic, Honeycomb, Grafana, Splunk) |
| Error / exception tracking | [`datadog.md`](sources/datadog.md) | Datadog Error Tracking |
| Product analytics warehouse | [analytics.md](sources/analytics.md) | Available warehouse MCP read tools |

Cross-cutting:

- [`incident-postmortem.md`](sources/incident-postmortem.md). Add this if the target code looks defensive (null checks, retry, timeout, rate limit, feature flag, egress guard, OOM handler).