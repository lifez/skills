---
name: why
description: "Use for 'why does X work this way', 'why we picked Y', design rationale, regressions, postmortems, or data-backed thresholds. Discovers available MCPs and queries each evidence category (source control, issue tracker, long-form docs, real-time chat, infrastructure observability, error tracking, product analytics warehouse) in parallel, then returns a cited read on decisions and tradeoffs. Use how for runtime behavior."
disable-model-invocation: true
---

# Why

Investigate the motivation and intent behind code. The companion `how` skill answers what the code does and how it works. `why` answers what forces led to its shape.

## Operating Posture

Operate as a **careful, cautious, and precise investigator**. Be honest about what you know vs what you're inferring. Read [the epistemics framework](references/epistemics.md) for the full confidence framework and phrasing guide. The synthesizer must follow it.

All bundled relative references resolve from this skill's directory, not the working directory.

All investigation and synthesis is read-only: no edits to project files, commits, deployments, messages, ticket updates, or other external mutations. Local scratch notes are allowed only if explicitly assigned. Never expose secrets or unnecessary personal data.

Use the available `Agent` tool with `general-purpose` delegates; inherit the parent's model by default. An override is optional only when explicitly requested and available. Do not require special agent types or fixed models. If `Agent` is absent, perform the same roles inline, preserving category ownership and coverage. Do not use `SubagentWorkflow` without explicit user opt-in.

## Step 1. Understand the Target and the Question

The **target** is usually a chunk of code, a pattern, a feature, or a named design decision. The **question** is usually a design rationale, a tradeoff, a motivating edge case, an external constraint, dead code, or a broad history sweep.

If the target is vague ("why do we do it this way?" with no clear referent), make your best guess from conversation context. State your interpretation briefly so the user can redirect if you're off, then proceed.

## Step 2. Establish the Code Anchor

Before spawning investigators, build the seed context inline: file paths and line ranges, key symbols (functions, classes, constants), the last few commits touching the target, PR numbers from merge commits (pattern `(#1234)` in the subject line), and any linked ticket IDs. Run `git blame -L <start>,<end> <file>` for last-touch commits, `git log --follow -p -- <file>` for full history with patches through renames, `git log --oneline -20 -- <file>` for recent commits with PR numbers visible, and `git log -1 --format=%B <commit>` to extract PR numbers. When `gh-axi` is installed, authenticated, and authorized for the repository, pull PR bodies and discussion for substantive commits: `gh-axi pr view <number> --full --comments --reviews` (use `gh-axi`, not `gh`). CLI presence does not guarantee access. If git history, the CLI, authentication, or remote records are unavailable, record the exact limitation and continue with accessible local source, comments, and tests. This anchor, including its gaps, goes to every investigator and to the synthesizer.

## Step 3. Spawn Parallel Investigators

**Default to the full parallel investigation.** The goal is a complete coverage map, not a minimal one. Document the null, don't skip the search.

### Discovery

Before spawning investigators, inspect the actual available MCP tool map and schemas. For deferred tools, use codemode `searchTools` and `describeTool` when available. Never invent tool names or assume a server provides a playbook's example operations. Record missing tools or denied access as gaps; do not configure integrations or initiate authentication changes.

Map available read-only tools to these evidence categories:

1. Source control history
2. Issue / ticket tracker
3. Long-form documents
4. Real-time team chat
5. Infrastructure observability
6. Error / exception tracking
7. Product analytics warehouse

Always assess source control/local source and local long-form documents, even with no MCP. Check repository-root `docs/`, README files, ADRs, and other local documentation locations; missing docs or unavailable git history are explicit gaps, not reasons to pretend a search happened. For the other five categories, investigate only when matching MCP read tools are available; otherwise record a gap. Classify by actual tool capabilities, server instructions, and resource descriptors. A server may support multiple categories; assign each operation according to its evidence, noting ambiguous cases.

Assign one investigator per evidence category, not per tool or server. Each may use all available read-only tools needed within its owned category, including multiple MCPs and local tools. Keep cross-category leads for the relevant investigator. Spawn independent investigators concurrently when `Agent` is available; otherwise run these roles inline.

Each investigator's prompt is [the investigator template](references/investigator-prompt.md) filled in, plus:
- the category playbook linked in [the source index](references/source-playbook.md), including [analytics warehouse evidence](references/sources/analytics.md) for analytics
- [incident and postmortem context](references/sources/incident-postmortem.md) **if the target code looks defensive** (null checks, retry logic, timeout handling, rate limiting, feature flags, egress guards, OOM handlers)
- the code anchor and the user's original question

### Investigator roster, one per available evidence category

Each category below is uniquely positioned to surface one shape of "why", shown after "Best at". Use it to know what to expect back, to name a gap when a category returns empty, and, only in the rare provably-irrelevant case, to justify a skip.

1. **Source control** (git history, `gh-axi` for PRs, code comments, tests). Always assess; use accessible local evidence and report missing history or remote access. Best at *implementation-time rationale captured during review*.
2. **Issue / ticket tracker** (e.g. Jira MCP). Best at *the product or business forcing function*. Strongest when the why is external to engineering.
3. **Long-form documents** (the repository root `docs/` directory, searched locally with `rg` and `git`). Always assess, with no MCP required; include other local doc locations. Best at *long-form design rationale*, written out before it becomes code.
4. **Real-time team chat** (e.g. Slack, Discord, Microsoft Teams, Mattermost MCP). Best at *real-time deliberation that never reached a doc*. Especially important when the source control, ticket, and doc paper trail is thin.
5. **Infrastructure observability** (e.g. Datadog, New Relic, Honeycomb, Grafana, Splunk MCP). Best at *infrastructure and runtime reality that motivated the code*. Strongest when the target reacts to an infra signal (timeouts, retries, rate limits, circuit breakers).
6. **Error / exception tracking** (e.g. Sentry, Rollbar, Bugsnag, Airbrake MCP). Best at *the specific exceptions and error trajectories that motivated defensive or corrective code*. Strongest for catch blocks, null guards, type checks, retries, and other defenses.
7. **Product analytics warehouse** (e.g. Databricks, Snowflake, BigQuery, ClickHouse, dbt, Redshift MCP). Best at *product and data reality that shaped the code*. Strongest for flag-gated code, experiment-driven ships, data migrations, and "where did this number come from" questions.

### When to skip an investigator

Only with an **explicit, written justification** that goes in the final Sources Consulted. Two valid reasons:

- **No matching MCP read tools are available for one of the five MCP-dependent categories** in this environment. This does not apply to source control/local source or local documents, which must always be assessed. Flag it as a gap, not a choice: "Real-time team chat skipped. No matching MCP available, so the conversational record was not searchable."
- **The source is provably irrelevant**, not just "probably irrelevant." A high bar: "Error / exception tracking skipped. Target is a build-time script with no runtime code path."

For a trivial target, combine investigation and synthesis inline only after assessing local source/history and documents and recording coverage for all seven categories. Explain why further available searches are redundant. Inline execution is also the normal fallback when delegation is unavailable; it does not waive coverage or confidence requirements.

## Step 4. Synthesize

Use one `general-purpose` synthesizer via available `Agent`, inheriting the parent model unless an explicitly requested available override applies; otherwise synthesize inline. It gets:
1. The investigator findings, including any null results and any categories skipped with justification
2. The code anchor
3. The user's original question
4. [The epistemics framework](references/epistemics.md)
5. [The synthesizer template](references/synthesizer-prompt.md)

## Step 5. Present

Present the synthesizer's output to the user. You may lightly edit for clarity or add context from the conversation, but **do not rewrite the confidence language**.

## Output Format

The structure is the one in [the synthesizer template](references/synthesizer-prompt.md): The Question, The Code in Question, What We Found, What We Can Reasonably Infer, Competing Hypotheses, What We Don't Know, Sources Consulted, Confidence Summary. Adapt as needed, but keep the confidence separation intact, and keep Sources Consulted as one line per investigator, including the ones that returned nothing or were skipped, with the reason.

After Sources Consulted, if the user's `why` question is a precursor to changing this code, convert the lineage findings into a Preserve / Change / Avoid / Risk constraint set for planning the change.

## Common Failure Modes to Avoid

- **Recency bias**. Assuming the most recent commit is authoritative. The current shape is often the accretion of many earlier decisions. Trace back.

---
Adapted from [pstack/why](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/why/SKILL.md), pinned to `d457567332aa6989e753ea289f30ea2bfbc80bc0`; local safety and portability adaptations. See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).