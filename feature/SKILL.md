---
name: feature
description: "Implement new behavior with scoped design, safe decomposition, and verification. Use when adding a feature or extending an existing capability."
---

# Feature

Own the design, implementation review, and evidence. Read linked skills before using them.

1. Ground the affected subsystem with [how](../how/SKILL.md). State acceptance criteria, non-goals, existing behavior to preserve, and the actual surface to verify. Inspect current user changes before editing; preserve unrelated work.
2. For meaningful boundary or architecture choices, use [architect](../architect/SKILL.md). Keep design exploration separate from implementation: arena is design-only, never an implementation runner.
3. Write a Markdown throughput checklist, retaining non-applicable entries with a reason:
   - [ ] Blocking first steps and gates before fan-out.
   - [ ] Independent workstreams with disjoint write scopes.
   - [ ] Shared mutable state to split or serialize.
   - [ ] Smallest safe decomposition, including why one worker may suffice.
4. Choose the organizing data shape before adding logic; read [principle-model-the-domain](../principle-model-the-domain/SKILL.md). Implement inline, or delegate to Agent only when available and permitted. Inherit the session model unless an available override is explicitly requested. Give each delegate paths, contracts, acceptance criteria, and a verification command; isolate concurrent writes and review the actual diff. Lack of delegation never blocks implementation.
5. Make surgical changes within scope. Validate all controlled consumers of a changed shared primitive. For external or unknown consumers, retain compatibility or stage migration and deprecation explicitly; do not delete an interface just because local callers moved.
6. Verify acceptance criteria and regression behavior on the actual affected surface using available CLI, browser, or debugger tools. Read [principle-prove-it-works](../principle-prove-it-works/SKILL.md). Report tool/access gaps and inconclusive results; compilation alone is not runtime proof. Use [tdd-bug-fix](../tdd-bug-fix/SKILL.md) when a cheap failing-first regression test is appropriate.
7. Review the diff against scope and existing work. Use [principle-sequence-verifiable-units](../principle-sequence-verifiable-units/SKILL.md) to propose small verified units. Remove only your own rejected changes. Do not commit, push, rebase, or publish without user authorization.
8. Read [opening-a-pr](../opening-a-pr/SKILL.md) to prepare a review-ready draft; perform publication only when authorized.

Reply with what changed, key choices and reasons, the throughput checklist, verification evidence, and open decisions.

Adapted from [pstack Feature](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/poteto-mode/playbooks/feature.md) (MIT; [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE)).
