---
name: bug-fix
description: "Diagnose and fix bugs or regressions using reproduction, runtime evidence, and verification on the affected system. Use when the user reports broken behavior, a failing workflow, or asks to fix a bug."
---

### Bug fix

**You own this task. Plan, review, verify.** If Agent is available and delegation is permitted, give it a bounded scope and inherit the session model by default; otherwise work inline. Review delegated diffs. Read linked skills before using them. Preserve pre-existing work and the requested scope; undo only your own disproven changes. Do not commit, push, rebase, or publish a PR without user authorization.

Be scientific. Every shipped line traces to runtime evidence. Belt-and-suspenders that "might help" is a hypothesis, not a fix. It does not ship. When evidence refutes a hypothesis, remove only the changes you made for it. The smallest change the evidence justifies ships, nothing more.

1. Reproduce it yourself on the matching surface with available CLI, browser, or debugger tools targeting the actual affected surface, even when a debug or instrumentation protocol says to ask the user to reproduce. Ask the user only with a stated, specific reason the control surface cannot reach the target, and only after driving it as far as it goes. If it won't reproduce directly, synthesize the trigger, tighten conditions, or instrument within the agreed scope. Report missing access/tools or a non-reproduction as a gap; never invent a passing repro.
2. Binary-search the cause. Form the candidate hypotheses, then rule them out until one survives. Seed them with [how](../how/SKILL.md) over the affected subsystem and the [why](../why/SKILL.md) skill for regression history. Each pass, take the split that cuts the most remaining problem space, get runtime evidence, eliminate. When program state is unclear, add instrumentation or logging and read it as the code runs. Don't guess. Drive a long or stubborn hunt. Confirm the surviving *mechanism* with runtime evidence before planning the fix.
3. Plan the fix. If it crosses a function boundary, [architect](../architect/SKILL.md) first. Implement inline or delegate a specific scope when available. For externally consumed interfaces, preserve compatibility or stage a migration with explicit deprecation and validation; do not break unknown consumers.
4. Verify on the same surface. The original repro now passes. "Inconclusive" or wrong-surface is not a pass. Flag it. Unit tests show branch behavior, not bug absence.
5. Keep the failing repro and fix as ordered, independently verifiable units; propose commit boundaries, creating commits only when authorized. See the [tdd-bug-fix](../tdd-bug-fix/SKILL.md) skill for the failing-test-first cadence when the bug has a cheap local test path. If automated TDD was explicitly requested, follow that skill's blocker/alternative rules; otherwise use a practical targeted check when the test path is expensive or unclear.
   This is the canonical [principle-sequence-verifiable-units](../principle-sequence-verifiable-units/SKILL.md) principle skill, the failing test first and the fix on top.
6. Use [opening-a-pr](../opening-a-pr/SKILL.md) for a review-ready draft; publish only with authorization.

**Reply:** what was broken, root cause, fix, how you verified. Include decisive failing-then-passing repro evidence, redacting secrets and personal data. If either observation is unavailable, state the gap instead of fabricating output.

---
Adapted from [pstack/bug-fix](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/poteto-mode/playbooks/bug-fix.md). See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
