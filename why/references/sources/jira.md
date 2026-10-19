# Jira Tickets

## What this source contains

- Issues (stories, tasks, bugs) describing features, bugs, and their motivation
- Epics and parent/child hierarchy (initiative → epic → story → sub-task)
- Comments (clarifications, scope changes, "why we're doing this" rationale)
- Issue links (`blocks`, `is blocked by`, `relates to`, `duplicates`, `is caused by`) that connect the work to incidents and other tickets
- Labels, components, fix versions, and sprints that signal the type and timing of motivation
- The change history (status transitions, field edits, re-scoping)
- Remote links and the development panel (linked GitHub PRs, branches, commits, Confluence pages)

Jira is where the product/business context often lives: the "we're doing this because customer X asked" or "this is for the Q3 compliance initiative" layer.

## How to search it

Use the Jira / Atlassian MCP. Tool names vary by server. Inspect its schema first. The Atlassian Rovo MCP exposes tools like `getAccessibleAtlassianResources` (to get the `cloudId`), `getJiraIssue`, `searchJiraIssuesUsingJql`, `getJiraIssueRemoteIssueLinks`, and `search`. If authentication fails, stop and report the gap.

1. **Start with linked tickets.** Jira keys look like `PROJ-1234`. Look for them in commit subjects, PR titles and bodies, and branch names (`feature/PROJ-1234-retry-logic`). Fetch each with `getJiraIssue` and read the full issue, including comments and change history.
2. **Search with JQL.** Use `searchJiraIssuesUsingJql` with text and time bounds. Try multiple phrasings:

   ```
   text ~ "rate limit" AND created >= "2023-09-01" AND created <= "2023-12-01"
   summary ~ "retry" AND project = PAY ORDER BY created DESC
   assignee = "<author accountId>" AND updated >= "2023-10-01" AND updated <= "2023-11-15"
   labels in (incident-followup, compliance) AND text ~ "<symbol>"
   ```

   Resolve the PR author to an account ID with `lookupJiraAccountId` if needed.
3. **Walk the hierarchy.** If you land on a sub-task or story, fetch its parent and epic. Sub-tasks are tactical. Epics and initiatives often carry the "why."
4. **Follow issue links.** `is caused by` and `relates to` links often point to the bug or incident that motivated the change. Follow `duplicates` chains back to the canonical ticket.
5. **Read remote links and attachments.** `getJiraIssueRemoteIssueLinks` surfaces linked Confluence specs, PRs, and incident pages. Attached specs or screenshots may hold the rationale.
6. **Check labels, components, fix versions, and sprints.** Labels hint at the category of motivation (customer-request, incident-followup, compliance). Fix versions and sprints tie work to deadlines, which often reveal motivation.

## What good evidence looks like here

- An issue description stating the business problem: "Customer Acme needs X because of their SOC2 audit"
- A comment recording a decision: "We decided to go with approach B because approach A would require touching the billing service"
- An epic titled like an initiative: "Q3 Enterprise Readiness" or "Reduce Payment Failures"
- An `is caused by` link to a bug or incident ticket
- An attached or linked spec
- Labels like `customer-acme`, `incident-followup`, `compliance`, `perf-regression`

## Common pitfalls

- **Scope drift.** The ticket the PR references may have been re-scoped, or closed and reopened. Read the change history, not just the current description.
- **Mechanical templates.** Some teams require "Why" or "Acceptance criteria" sections but fill them with boilerplate. Generic text ("improve user experience") is probably not a real answer.
- **Stale tickets.** Old tickets often reflect a version of the plan that changed. Check dates and cross-reference with the code's ship date.
- **Wrong project.** Ticket keys can collide in shape across projects. Confirm the project matches the team that owns the code.
- **Closed-as-duplicate chains.** Follow the duplicate links back to the canonical ticket.
- **Restricted projects.** If you can't access an issue or project, note that as a gap rather than guessing.

## What to return

For each relevant ticket:
- Ticket key and title
- Issue type (epic / story / task / bug / sub-task)
- The problem/motivation quoted from the description or comments (not paraphrased. The synthesizer needs the exact text to cite)
- Labels, components, parent/epic, fix version, relevant issue links
- Reporter, assignee, created date, resolved date
- Link to the ticket (`https://<site>.atlassian.net/browse/<KEY>`)
