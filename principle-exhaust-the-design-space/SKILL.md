---
name: principle-exhaust-the-design-space
description: "Apply when facing a novel UI interaction or architectural decision with no precedent in the codebase. Build 2-3 competing prototypes and compare side by side before committing."
---


# Exhaust the Design Space

Compare two or three genuinely different approaches before committing to a novel interaction or architecture. Do not generate cosmetic variations of one idea.

1. Ground the question in the current code, user workflow, constraints, and relevant precedents. Use an existing proven pattern when it fits.
2. Define a small rubric: user outcome, complexity, correctness, operational cost, and reversibility as appropriate.
3. Sketch alternatives with different boundaries or interaction models. State each one's assumptions and trade-offs.
4. If implementation is in scope, build the smallest disposable prototypes needed to resolve uncertainty. Give each its own output directory; isolate concurrent code changes in separate worktrees. For design-only requests, use sketches and scenario walkthroughs instead; do not implement.
5. Compare against the same representative scenarios. Inspect UI feel in a real browser when a runnable prototype is available; label anything not actually tested.
6. Select a base, explain rejected alternatives, and incorporate only compatible ideas. Delete disposable artifacts only within this task's owned scope.

Use the available Agent tool for a few independent candidates when useful. Use multi-agent workflow orchestration only when the user explicitly opts in. Never treat this principle as permission to expand the task into a rewrite or to run costly experiments without authorization.

---
Adapted from [pstack/principle-exhaust-the-design-space](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/principle-exhaust-the-design-space/SKILL.md), pinned to `d457567332aa6989e753ea289f30ea2bfbc80bc0`. See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
