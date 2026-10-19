---
name: principle-prove-it-works
description: "Apply after completing a task, before declaring done. Verify against the real artifact (run the feature, read the actual value, inspect the diff), not a proxy, self-report, or 'it compiles.'"
---

# Prove It Works

Verify every task output by checking the real thing directly. Do not infer from proxies, self-reports, or "it compiles."

**Why:** Unverified work has unknown correctness. Indirect verification (file mtimes, output freshness, agent self-reports, cached screenshots) feels cheaper than direct observation. Acting on a wrong inference costs far more than checking the source.

Check the real thing, not a proxy:
- Check process liveness directly, not indirectly through derived state
- Read the actual value, not a cached or derived representation
- When verification fails, check both the observation method and the system against direct evidence. Do not dismiss a failing check because you expected success.

## Script the check when you can

The strongest proof is a deterministic script that re-runs the same comparison, not a one-time eyeball. Write the script, run it, and keep its output as an artifact a reviewer can re-run instead of trusting your word.

Keep commands, inputs, expected results, and observed results visible for review. For UI work inspect the actual flow in a real browser when available; for data changes read back the resulting state; for delegated edits inspect the actual diff and run relevant checks. Use a sandbox or non-destructive fixture for mutating checks.

Report checks not run and their blockers separately from passing checks. Do not deploy, send messages, mutate production, or commit merely to obtain proof without the required authorization. Retain reusable verification scripts in the repo when appropriate; commit only on request.

---
Adapted from [pstack/principle-prove-it-works](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/principle-prove-it-works/SKILL.md), pinned to `d457567332aa6989e753ea289f30ea2bfbc80bc0`. See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
