---
name: investigation
description: "Investigate a codebase and produce a cited explanation or recommendation without changing code. Use for read-only technical investigations, architecture questions, or decisions between implementation alternatives. Use how for runtime behavior and why for design rationale."
---

### Investigation

**You own the answer. Plan, route, write.**

Investigation requests are read-only. They produce a cited explanation or a recommendation, not a code change. Read linked skills before using them. Do not run mutating commands, commit, push, rebase, or open a PR. Preserve pre-existing work.

1. Route through the [how](../how/SKILL.md) skill. For motivation questions, also route through the [why](../why/SKILL.md) skill.
2. Throughput checkpoint stays one line: `throughput checkpoint: n/a, read-only investigation`.
3. Produce the [how](../how/SKILL.md)-shaped output (Overview / Key Concepts / How It Works / Where Things Live / Gotchas), or a recommendation with a tradeoffs table if the request is a decision between alternatives.
4. Apply the [unslop](../unslop/SKILL.md) skill to the reply.

No PR or babysitting. If implementation is needed, hand back to the user; use [bug-fix](../bug-fix/SKILL.md) or [feature](../feature/SKILL.md) only after implementation is authorized.

**Reply:** the investigation output. For "are we sure?" answers, include your real judgment with reasons. Push back if the premise is wrong, with evidence.

---
Adapted from [pstack/investigation](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/poteto-mode/playbooks/investigation.md). See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
