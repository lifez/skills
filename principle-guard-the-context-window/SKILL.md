---
name: principle-guard-the-context-window
description: "Apply when context is filling up: large outputs, long files, repeated reads, fan-out planning. Route bulk to subagents; keep summaries in the main thread, not raw payloads."
---


# Guard the Context Window

Keep the main conversation focused on decisions, evidence, and next actions rather than raw payloads. Context overflow degrades reasoning and loses useful constraints.

- Search narrowly, then read the relevant files. Paginate large outputs; save full logs to a file and extract the decisive passages.
- Delegate bulk discovery or independent reading to an appropriate available subagent. Give it a clear question, scope, read-only boundary, and a bounded report containing paths, line references, evidence, and unresolved questions.
- Keep synthesis and consequential decisions in the parent. Read the decisive source yourself; a subagent's summary is not proof that a change works.
- Do not repeat a delegated search in the parent. Continue independent work while a background agent runs and wait for its completion notification rather than polling.
- Size phases by evidence needed and files touched. Report bounded or sampled coverage instead of implying completeness.
- Before a long phase, record a compact handoff: goal, constraints, decisions, changed files, checks run, failures, and next step. Keep secrets and raw personal data out.
- Use direct tools for known small targets. Do not spawn agents merely to save a handful of lines, and use workflow orchestration only with explicit user opt-in.

Finish with actionable findings and source pointers, not a dump of everything read.

---
Adapted from [pstack/principle-guard-the-context-window](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/principle-guard-the-context-window/SKILL.md), pinned to `d457567332aa6989e753ea289f30ea2bfbc80bc0`. See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
