---
name: arena
description: "Explore N design proposals in parallel, pick a base, and synthesize the strongest ideas into one design without implementing it. Use for /arena, 'arena this', 'throw it in the arena', or when a design decision needs competing approaches before implementation."
disable-model-invocation: true
---

# Arena

## Design-only boundary

Produce a design, not a working implementation. Apply this boundary to the parent, every candidate, and the cross-judge.

- Read existing code and documentation for grounding, but do not modify application code, tests, dependencies, configuration, or infrastructure.
- Write only design documents in the assigned output locations. Include diagrams, API sketches, or pseudocode inside those documents when useful; do not create executable prototypes or patches.
- Do not run builds, tests, migrations, deployments, or commands that change application or external state. Verification here is a design review, not proof of a working implementation.
- Even if the task asks to build or fix something, scope the arena to designing that change. Stop after delivering the synthesized design; implementation requires a separate user request outside this skill.

Track Frame, Fan out, Cross-judge, Pick, Graft, and Verify in a Markdown checklist. Read linked skills before using them; apply only design-relevant guidance, never implementation steps.

## Phase A: Frame

Every candidate gets the same prompt, so the prompt is the contract.

1. State the design question and the design document each candidate is producing. Include goals, non-goals, constraints, proposed architecture or flow, interfaces, trade-offs, risks, and a proposed implementation/validation plan. Keep plans as future work, not instructions to execute during the arena.
2. Derive the rubric, 3-6 concrete gradeable criteria for what success looks like on *this* task. It is the picker's tool in Phase D. Candidates only see the task.
3. Use Agent delegation only when available and permitted. Omit the model override to inherit the session default unless the user requests an available model. If a requested model is unavailable, disclose the fallback and inherit the default. Otherwise generate distinct proposals sequentially inline and disclose the loss of independent agents. Choose N to cover distinct design directions, not to imply model diversity.
4. Give each candidate its own document output location, such as `/tmp/arena-<slug>/candidate-<n>/design.md`, per the [principle-separate-before-serializing-shared-state](../principle-separate-before-serializing-shared-state/SKILL.md) principle skill. Keep the source repository read-only; no implementation worktree is needed.

## Phase B: Fan out

When Agent is available, launch independent candidates (in the background only if supported), each with the design question, the path to the shared grounding, its own output path, and the full design-only boundary above. Instruct each to produce a design document and a short rationale naming the alternatives it considered and what it rejected. Do not ask candidates to implement or prove their designs by building them.

If a candidate produces no output, proceed with the remaining candidates and note the dropout. If none complete, report the failure or use the disclosed inline fallback; do not invent a winner.

## Phase C: Cross-judge

After all Phase B candidates complete, use one read-only Agent judge if available. Prefer a different model family only if available; otherwise inherit the default and disclose the limitation. Without Agent, perform a separate inline review and label it non-independent. It sees the rubric and the candidates by path label, scores each criterion, and recommends a base with rationale. An available background judge may run in parallel with your reading in Phase D; inline review is sequential. Don't spawn it while candidates are still writing.

## Phase D: Pick a base

Read every candidate end to end before picking. Score each against the rubric criterion by criterion, not on holistic feel, and compare with the cross-judge. Agreement on the base confirms the pick. Disagreement means one of you is biased or the rubric was ambiguous. Read both rationales before deciding.

Pick the base a future maintainer can extend most easily without breaking invariants. When two feel tied, prefer the cleaner boundary or smaller API, per [principle-laziness-protocol](../principle-laziness-protocol/SKILL.md).

## Phase E: Graft

Walk each losing proposal once more for design ideas worth incorporating into the base document, usually one or two things per candidate, not most of it. Reconcile boundaries, interfaces, and assumptions by hand, per the [principle-redesign-from-first-principles](../principle-redesign-from-first-principles/SKILL.md) principle skill, so the result stays coherent under one mental model. Don't paste mechanically or implement the grafts in code.

If the candidates converge on one shape, that is strong agreement. Note it and document the consensus design. No graft is needed. If they wildly diverge, Phase A was under-specified. Reframe and re-run rather than averaging the divergence.

## Phase F: Verify

Review the synthesized design against the rubric and the grounded code/documentation. Check requirement coverage, internal consistency, interface compatibility, invariants, failure modes, and feasibility. Walk through representative scenarios on paper; explicitly label assumptions and unverified claims. Record proposed tests and experiments as future validation work—do not execute them or invoke implementation-oriented verification skills.

If review finds a problem the arena missed, either Phase A was wrong (re-frame and re-run) or a candidate caught it and you missed the graft (go back to Phase E). Don't paper over it or claim the design has been runtime-verified.

## Outputs

One synthesized design document, with a short synthesis note alongside naming the base and why, the cross-judge's verdict, each graft with its source candidate, what was rejected and why, any convergence or dropouts, and the design-review result. Include open questions and a proposed implementation/validation plan for a later task. End with an explicit handoff: design only; no implementation performed. Stop and wait for the user to review or request implementation separately.

---
Adapted from [pstack/arena](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/arena/SKILL.md). See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
