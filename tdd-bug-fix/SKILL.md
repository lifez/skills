---
name: tdd-bug-fix
description: "Fix bugs test-first with a focused failing-before, passing-after regression check. Use when the user asks for TDD, a failing test, a regression test, or red-green-refactor, or when a bug has an obvious cheap local test target. Avoid inventing expensive test infrastructure for an otherwise small fix."
---

# TDD Bug Fix

Make the broken behavior executable before changing production code. Prefer a focused regression test that fails before the fix and passes after it.

## Workflow

1. **Understand the bug.** Identify intended behavior, actual behavior, the affected path, and the smallest observable reproduction. Inspect existing changes and preserve unrelated work.
2. **Choose the narrowest executable check.** Prefer the existing unit, component, integration, or regression harness nearest the code. Do not invent a broad harness merely to satisfy this workflow.
3. **Write the failing test first.** Encode the intended observable behavior, not private helpers or current implementation details. Derive the expected result from the requirement, not from the code under test.
4. **Run it before fixing.** Confirm it fails for the intended reason. A missing dependency, broken fixture, or unrelated baseline failure is not a demonstrated red. If it passes, correct the reproduction before changing the implementation.
5. **Fix the bug.** Make the smallest root-cause production change while preserving nearby contracts.
6. **Rerun the regression test.** Confirm it passes, then run relevant nearby tests and static checks.
7. **Refactor only while green.** Simplify changed code if useful, keeping the regression check passing. Do not broaden the task into an unrelated cleanup.

## If a Failing Test Is Impractical

Do not force a brittle test that mostly tests mocks, relies on timing or unrelated global state, requires production-only state, or needs large unrelated fixture churn.

Use the closest useful executable check: a targeted script, reproduction command, browser automation, snapshot comparison, log assertion, or focused integration check. Keep inputs, commands, and observed results reproducible. Use safe local fixtures or a sandbox; test-first does not authorize production mutations.

If the user explicitly requested an automated test and the required harness or access is unavailable, state the blocker and proposed alternative. Do not silently substitute a manual check or claim TDD without observing the red-to-green transition.

## Guardrails

- Do not change tests merely to match a wrong implementation or weaken assertions to get green.
- Keep the test focused on the bug; avoid unrelated fixture churn and coverage expansion.
- Make flaky failures deterministic where possible and explain the signal being locked down. Do not hide failures with arbitrary sleeps or retries.
- If the bug suggests sibling failures, first prove the focused regression, then assess additional coverage within the authorized scope.
- If implementation already changed, be honest about missing failing-before evidence. Demonstrate it only with a safe isolated baseline; never reset or overwrite existing work to recreate red.
- Commit or push only when requested. A deliberately failing intermediate check is not a passing deliverable.

## Final Response

Report the failing-before check and observed failure, the passing-after run, nearby validation, and anything not run. If red could not be demonstrated, say why and describe the alternative evidence.

---

Adapted from [pstack/tdd](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/tdd/SKILL.md), pinned to `d457567332aa6989e753ea289f30ea2bfbc80bc0`. See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
