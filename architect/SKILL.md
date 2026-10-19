---
name: architect
description: "Sketch caller usage, types, signatures, and module boundaries before implementation, compare competing designs, then implement against the chosen sketch. Use when explicitly asked to architect or design a non-trivial change, or via /skill:architect."
disable-model-invocation: true
---

# Architect

Design the shape before filling in the code. Start from caller usage, compare at least two structurally different designs, synthesize a contract, then implement within the user's authorized scope.

## Start and Pi conventions

Track Ground → Sketch → Agree → Implement → Scrap (only if needed). Use a task-list tool if available; otherwise keep a short Markdown checklist in the working notes. Do not depend on an installed task-list extension.

- Resolve bundled references relative to this skill directory.
- Use Pi's available read/search tools to inspect code and edit/write tools for changes. Read repository instructions first and preserve unrelated work.
- Subagents are optional extensions, not a requirement. If `Agent` is available, use read-only `Plan` or general-purpose agents for candidate designs; use `Explore` only for locating code. Otherwise generate and compare both candidates inline.
- Inherit the session model by default. Use a model override only when the user requests one and it is available. Never depend on fixed provider IDs or external model-routing rules.
- Use `SubagentWorkflow` only if available and the user explicitly requests workflow orchestration; invoking this skill alone is not that permission.
- Do not assume companion skills exist. The steps below are self-contained. If `how` or `why` is available, it may help produce grounding evidence; read it before using it and respect the user's scope.

## A. Ground

Build a working mental model of the affected system before proposing its replacement. Skip only for genuinely greenfield work with no surrounding integration.

Read actual implementations, callers, tests, repository guidance, and relevant architecture documents. Record:

1. Current behavior and a representative end-to-end runtime flow.
2. Ownership: modules, public boundaries, dependency direction, and state lifecycle.
3. Invariants, compatibility requirements, failure modes, and operational constraints.
4. Relevant paths and symbols supporting the explanation; distinguish observed facts from assumptions.

When changing ownership or layering, inspect history and recorded decisions to understand why the existing shape exists. Turn the evidence into **Preserve / Change / Avoid / Risk** constraints. Do not invent historical intent when evidence is missing.

Clarify blocking ambiguities; state reasonable assumptions for non-blocking ones. Naming files without explaining their interaction is not grounding.

## B. Sketch

Read [the candidate prompt](references/runner-prompt.md), [design red flags](references/design-red-flags.md), and [the rationale template](references/rationale-template.md).

1. Write the desired caller usage first, including a failure case. Derive the public types and signatures from it.
2. Define 3–6 task-specific criteria: requirement coverage, invariant preservation, interface depth, local reasoning, migration risk, or operational cost as appropriate.
3. Produce **at least two structurally distinct candidates** before synthesis. Change ownership, data flow, lifecycle, or module boundaries—not just names or helper functions. Do not force a novel framework where a simpler extension of the current design is viable.
4. Give each candidate the same grounded facts, requirements, and constraints. Use the bundled prompt. For agents, assign separate design-document paths and prohibit application edits. Launch independent agents together when supported; wait for actual completion notifications before synthesis. Inline work must still keep the two proposals separate until comparison.
5. Read every completed candidate, screen each against the red flags, and compare criterion by criterion. If fewer than two viable shapes remain, develop a replacement or revise the framing. Report agent dropouts; never treat missing output as a reviewed proposal.
6. Select a base and graft only ideas that fit its mental model. Prefer a deep interface: a small public surface hiding substantial complexity, not many shallow layers. Record what was rejected and why. The parent owns the synthesis; a candidate's recommendation is not the decision.

Keep sketches in Markdown code fences by default: types, function signatures, class shapes, module maps, and pseudocode or explicit `not implemented` bodies. Do not insert throwing stubs into production paths merely to document a design. Put rationale beside the sketch using the bundled template.

Assume the next contributor sees only a few files, copies the nearest example, and takes the shortest path that compiles. Prefer a design where a locally reasonable change preserves repo-wide invariants.

## C. Agree

By default, continue into implementation **when the user's request authorizes building the change**. If the request is design-only, stop after delivering the synthesized sketch and rationale; this skill does not expand permission.

If the user asks for a checkpoint, such as `/skill:architect with checkpoint` or “show me before implementing,” present the synthesized design and pause for sign-off. Do not modify application code before approval.

A scaffold-first commit is optional, not automatic: commit only when requested, keep scope explicit, and do not leave the working tree broken by default. Use a read-only adversarial design review if requested or warranted by risk.

If the user rejects the shape, treat the feedback as new grounding evidence. Revisit A and B rather than patching the rejected design in place.

## D. Implement

Replace placeholders and pseudocode with real behavior. Keep the selected sketch as the contract and work in small, verifiable slices.

- Add or update tests for caller behavior, invariants, and failure paths; run relevant tests, type checks, and lint/build commands supported by the repository.
- Surface material deviations: new required parameters, shifted ownership, changed invariants, or added public concepts. Decide whether the sketch was wrong, a requirement was missed, or the implementation is overreaching. Update the contract and rationale deliberately; pause again for material changes if a checkpoint was requested.
- Distinguish design review from runtime verification. Report what actually ran, its result, and any validation gaps.

## E. Scrap when the shape is wrong

Look for a pattern, not a single difficult edge case:

- The same workaround repeated across unrelated callers.
- Unrelated edge cases requiring the same special-case branch.
- Escape hatches such as `any`, casts, or optional fields that are always required in practice.
- New locking needs despite a claim that state is not shared.
- Callers needing internal knowledge to use the abstraction correctly.
- Two independent implementation deviations with the same underlying cause.

When the pattern appears:

1. Stop layering fixes onto it and explain the evidence.
2. Re-ground in what implementation revealed.
3. Redesign with the new constraints treated as day-one assumptions.
4. Subtract unnecessary concepts before adding new ones; aim for a smaller core, not a smaller line count at the cost of hidden complexity.
5. Return to B and compare fresh candidates. Remove only this task's obsolete scaffolding; preserve unrelated work. Ask before discarding substantial implementation or expanding scope.

## Deliverables

For a small change, use one design document containing caller usage, the type/signature sketch, and rationale. For a larger change, add a module map and explicit ownership/dependency boundaries. Keep artifact locations aligned with repository conventions.

Finish with the chosen shape, synthesis decision, implemented changes (if authorized), actual validation results, and remaining risks. For design-only or checkpoint work, explicitly state that implementation has not started.
