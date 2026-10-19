---
name: principle-sequence-verifiable-units
description: "Apply to multi-step work (sweeps, migrations, runs of similar edits) and to how you stack commits and PRs. Break work into small units that each end in a verifiable state, check each before the next, and order delivery so the sequence proves itself to a reviewer."
---

# Sequence work into verifiable units

Order work as a sequence of small units, each ending in a state you can check, and don't advance until the current one is green.

**Why:** A break caught at the unit that caused it is cheap to localize. A break caught after a batch is buried, and you have already built further on a broken base. Sequencing those same units into a delivery a reviewer can replay turns "trust me" into "watch it go red, then green."

**Execution.** In a sweep, migration, or any run of similar edits, verify each change before starting the next. Each unit is a before/after bracket: known-good state, one change, run the check, then proceed. Inspect the current branch and working tree and capture the baseline first. Preserve pre-existing changes; do not rebase, reset, stash, or switch branches without authorization. Distinguish baseline failures from regressions. When a lever does the edits, the per-unit check is nearly free. Run it anyway.

**Delivery.** Stack commits and PRs in the order that proves the work. The canonical shape is the failing test first, then the fix on top. Other story orders are a subtraction before the reshape, a baseline capture before the treatment, the scaffold before the feature. Choose boundaries that make the progression clear. A deliberately red test is a recorded intermediate check, not a passing deliverable; follow repository policy before putting it in a commit or PR. Commit, push, or open PRs only when requested.

For a planned migration that cannot stay green at every edit, define a small reversible verification boundary in advance, keep unaffected checks green, and restore the full relevant checks before delivery.

The sequencing complement to the **prove-it-works** principle skill, which keeps each check real, and the **build-the-lever** principle skill, which makes the per-unit check cheap.

---
Adapted from [pstack/principle-sequence-verifiable-units](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/principle-sequence-verifiable-units/SKILL.md), pinned to `d457567332aa6989e753ea289f30ea2bfbc80bc0`. See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
