---
name: figure-it-out
description: "Design and execute a bounded, auditable workflow for a large migration or multi-part change when no narrower skill fits. Use for /skill:figure-it-out, 'figure it out', or an ambitious task needing explicit phases, verification gates, and a decision trail."
---

# Figure It Out

Design the workflow before changing the system. Scale rigor to risk, not to ceremony.

## Frame

Read repository guidance, inspect existing changes, and ground the current system. State the goal as a falsifiable predicate, authorized scope, non-goals, constraints, unknowns, and verification plan. Clarify consequential ambiguity; proceed with stated assumptions for reversible in-scope work. Ask before expanding scope, spending substantial resources, making irreversible changes, or beginning a long unattended run.

Track phases with an available task-list tool or a Markdown checklist. Do not require poteto-mode, fixed models, or custom tools.

## Design the workflow

- Break work into small units with explicit input, owner, output, and check. Resolve risky unknowns early.
- Capture a pre-change baseline and build the smallest reusable verification harness. Preserve existing failures as baseline evidence.
- For uncertain structure, use [Architect](../architect/SKILL.md); respect design-only and checkpoint requests. Do not repeat a design contest once a shape is settled.
- Use deterministic scripts for mechanical repetitions and available general-purpose agents for independent judgment-heavy work. Default to the session model; if agents are unavailable, execute sequentially.
- Isolate concurrent writes by ownership or worktrees. Worktree isolation does not isolate remote services.
- Use workflow orchestration only if the user explicitly opts in. This skill invocation is not such permission.

Write the phase list before execution. Keep the decision trail in a task-owned notes path; use repository conventions, or a scratch path if no persistent artifact is needed.

## Run one verifiable unit at a time

For each unit, record the hypothesis, smallest change, observed result, and verdict: VERIFIED, NOT VERIFIED, or INCONCLUSIVE. Check the real artifact, not only a delegate's claim. Review delegated diffs yourself and run the relevant checks.

If an attempt fails, remove only its own changes, preserving pre-existing and accepted work. Do not reset, stash, or discard user work. Revisit a faulty gate explicitly rather than weakening it to fit the implementation. If repeated attempts share a failed premise, test that premise before trying again.

Keep a decision log with unit, evidence, decision, changed paths, checks, and remaining risk. No separate logging skill is required. Do not include secrets or raw personal data. Preserve useful artifacts for review; commit, rebase, push, and open PRs only when authorized.

## Verify and hand back

Check the complete result against the original predicate, including integration boundaries. Encode recurring mistakes in a focused check when worthwhile. Stop when done, blocked by required access/approval, or beyond the agreed budget; never invent ongoing background monitoring.

Report the workflow, rigor level, completed units, actual verification, decision-trail location, and unresolved risks. For authorized GitHub publication use [Opening a PR](../opening-a-pr/SKILL.md); otherwise deliver the local changes without publishing.


---
Adapted from [pstack/figure-it-out](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/figure-it-out/SKILL.md), pinned to `d457567332aa6989e753ea289f30ea2bfbc80bc0`. See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
