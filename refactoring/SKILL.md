---
name: refactoring
description: "Restructure existing code while preserving its behavior, using characterization tests and equivalence checks. Use when the user asks to refactor, simplify, reorganize, or clean up code without adding features or fixing bugs."
---

### Refactoring

**You own the contract. The structure changes. The behavior does not.** Distinct from Feature, which adds behavior, and Bug fix, which corrects it.

If the cleanup reveals a missing feature or a real bug, split it out and ship the structural change first against the pinned contract. A behavior-preserving redesign is allowed within scope; route new behavior to [Feature](../feature/SKILL.md) only when separately authorized. Large or cross-cutting structural work belongs to the [figure-it-out](../figure-it-out/SKILL.md) skill. This playbook is the focused-to-medium change.

Read linked skills before using them. Preserve scope and pre-existing work. Do not commit, push, rebase, or publish a PR without user authorization.

1. Pin the behavior contract first. Run the [how](../how/SKILL.md) skill over the affected subsystem to learn the contract, then write a characterization test, snapshot, or equivalence harness that captures current behavior before any structure moves. If the area has no coverage, write the pin before touching structure. Type check and lint are not a pin.
2. Name the structure the code is missing per [principle-model-the-domain](../principle-model-the-domain/SKILL.md). Boring code stays when the shape is already clear and local. The reshape must delete branches or invalid states, not add indirection.
3. Name the target shape. State what the module layout, types, and call graph should be if built today ([principle-foundational-thinking](../principle-foundational-thinking/SKILL.md), [principle-redesign-from-first-principles](../principle-redesign-from-first-principles/SKILL.md)). If the target crosses a function boundary, run the [architect](../architect/SKILL.md) skill for parallel design exploration of the shape before the move.
4. Subtract before you add. Delete dead code, collapse one-caller wrappers, drop redundant validators, and remove orphan references before introducing the new shape ([principle-subtract-before-you-add](../principle-subtract-before-you-add/SKILL.md)). The smallest change that reaches the target shape ships ([principle-laziness-protocol](../principle-laziness-protocol/SKILL.md)). Remove only your own speculative cleanup that lacks evidence; never broadly revert unrelated or pre-existing work.
5. Move in small behavior-preserving steps, each keeping the pin green. For internal API reshapes with all callers controlled, migrate every caller before deleting the old API ([principle-migrate-callers-then-delete-legacy-apis](../principle-migrate-callers-then-delete-legacy-apis/SKILL.md)). For external or unknown consumers, preserve compatibility and stage migration/deprecation with validation; remove legacy paths only when safe and authorized. Spot-check every rename against the actual files. Renames silently miss usages in strings, prose, and back-references. Implement inline, or delegate mechanical edits to Agent when available and permitted with explicit paths, names, and behavior to hold; inherit the session model by default.
6. Prove behavior is unchanged on the real artifact, not "it compiles" ([principle-prove-it-works](../principle-prove-it-works/SKILL.md)). For larger reshapes, run an equivalence check: a script that diffs old-vs-new outputs, a recorded baseline replayed against the new code, or a smoke run on the matching surface using available CLI, browser, or debugger tools targeting the affected surface. Report unavailable surfaces and verification gaps.
7. Confirm the change is worth keeping. The success measure is reduced reader load ([principle-minimize-reader-load](../principle-minimize-reader-load/SKILL.md)). If your diff does not lower reader load somewhere, remove only your own unhelpful changes.
8. Present small ordered units: subtraction, reshape, then follow-on cleanup. Use [principle-sequence-verifiable-units](../principle-sequence-verifiable-units/SKILL.md) so each slice stays green. Propose commit boundaries without committing or rebasing unless authorized. Use [opening-a-pr](../opening-a-pr/SKILL.md) for a draft, publishing only with authorization.

**Reply:** the structure that changed, the pin you held it against, the equivalence proof, the reader-load delta, what shipped and what got reverted. No new behavior.

---
Adapted from [pstack/refactoring](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/poteto-mode/playbooks/refactoring.md). See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
