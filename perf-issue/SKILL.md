---
name: perf-issue
description: "Diagnose and fix performance problems using baseline measurements, traces, and verified before-and-after comparisons. Use when the user reports slow execution, high latency, excessive resource usage, or asks to optimize a measured performance issue."
---

### Perf issue

**You own the measurement story. Plan, review, verify the numbers.** Tie every fix to a measurement, don't read source instead of measuring.

Read linked skills before using them. Preserve scope and pre-existing work; discard only your own rejected changes. Do not commit, push, rebase, or publish a PR without user authorization. Preserve externally consumed interfaces or stage compatibility migrations with explicit deprecation and validation.

1. Capture a baseline trace using available CLI, browser, profiler, or debugger tools targeting the actual affected surface. Report access/tool gaps rather than inventing evidence. Vet the baseline, and each later number, with the [benchmark-checklist](../benchmark-checklist/SKILL.md) skill.
2. [how](../how/SKILL.md) to ground hypotheses. Don't claim a perf ceiling without running it first.
   Try the performance mantras in order, cheapest first:
   1. Don't do it. Stop work whose result nothing uses rather than cheapening it.
   2. Do it, but don't do it again.
   3. Do it less.
   4. Do it later.
   5. Do it when they're not looking.
   6. Do it concurrently.
   7. Do it cheaper.

   When an earlier mantra meets the target, stop.
3. Plan the fix from the trace. If it crosses a function boundary, [architect](../architect/SKILL.md) first. Implement inline, or delegate a bounded scope to Agent when available and permitted, inheriting the session model by default. Review the diff. Capture a post-fix trace.
   Apply the [principle-sequence-verifiable-units](../principle-sequence-verifiable-units/SKILL.md) principle skill, verifying each attempt before trying the next.
4. Parse and compare the artifacts (JSON to sqlite, diff). "Inconclusive" or wrong-surface is not a pass. Flag it.
5. Cite the measurement in the review summary or PR draft.
6. Use [opening-a-pr](../opening-a-pr/SKILL.md); publish only with authorization.

For sustained improvement against a metric rather than a one-off fix, read and use [Hillclimb](references/hillclimb.md).

**Reply:** baseline number, post-fix number, delta, artifact path.

---
Adapted from [pstack/perf-issue](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/poteto-mode/playbooks/perf-issue.md). See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
