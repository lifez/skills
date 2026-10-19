---
name: no-comments
description: "Audit and remove redundant code comments, commented-out code, and workaround narration; expose underlying design problems and offer enforceable replacements for important constraints. Use for /no-comments, comment cleanup, or requests to make code self-explanatory. Preserve legal notices, public contracts, required tooling directives, and proven external constraints."
---

# No Comments

Use a fresh reviewer to identify comments that duplicate the code or hide a design problem. Accept findings based on evidence, not a blanket preference for deletion.

## Scope

Use the caller's files or diff. Otherwise inspect the current branch against its configured base, defaulting to `main`, and include staged, unstaged, and relevant untracked work. Verify the base exists; if it cannot be determined, state the limitation and use an explicit available scope rather than pretending the audit is complete.

Record the scope and inspect existing changes before editing. Do not rebase, reset, or overwrite unrelated work. Audit code comments and suppressions, not prose documentation, generated files, or vendored code unless explicitly included.

## Workflow

1. **Get an independent audit.** Read [the reviewer contract](references/comment-reviewer.md) and pass its full contents plus the scope to an available read-only `general-purpose` subagent through the Agent tool. Require evidence and exact file/symbol references. It must not edit files. No custom `comment-sicko` agent or Cursor tool is required. If delegation is unavailable, apply the same checklist yourself and disclose that no independent review ran.
2. **Verify findings.** Inspect each proposed deletion and its surrounding code. Reject scope escapes, unsupported claims, protected-comment deletions, and refactor flags based only on dislike of comments. Investigate ambiguous constraint claims through code, tests, history, and authoritative external documentation; use the local `how` or `why` skills when available and useful. Unresolved uncertainty is open work, not permission to delete.
3. **Remove safe noise.** Delete narration, stale commented-out code, and redundant banners where they carry no protected meaning. Do not mechanically strip comment tokens: preserve strings, syntax, and tool directives. Do not shorten workaround essays into smaller essays.
4. **Fix accepted root causes.** For trivial in-scope fixes, remove a dead path, rename a misleading symbol, drop an unused parameter, or use the real API. If a fix needs design work, sketch the smallest coherent change before implementing; use an architecture skill only if available and compatible with the authorized task. Fix the cause, not a new symptom guard. Do not broaden the scope or reshape working code merely to eliminate a useful explanation.
5. **Encode constraints carefully.** For a real constraint such as “do not remove,” offer the cheapest appropriate type, runtime invariant, test, or lint. Obtain approval if this exceeds comment cleanup or changes behavior. Implement and verify an approved encoding before deleting its explanatory comment. Keep externally imposed constraints when code alone cannot express their rationale. If approval or evidence is missing, retain the comment and report the unenforced constraint.
6. **Verify the result.** Inspect the actual diff, search for missed in-scope suppressions, and run relevant formatting, lint, type, and behavior checks. Removing a correctness or safety suppression requires fixing and checking the underlying issue first. Do not erase an active suppression or warning just to satisfy a deletion target.

If a reviewer report violates the contract, reject it and request one corrected report naming the failure. If it still violates the contract, stop using it and report incomplete independent review; do not blindly apply its edits.

## Report

Name the scope, comments removed, protected or unresolved comments retained, accepted/rejected findings, root-cause fixes, proposed and completed encodings, reviewer reruns, checks run, and remaining work. Count comment blocks consistently and distinguish any application-code changes. Do not claim the absence of comments proves correctness. Do not commit or push unless requested.

---

Adapted from [pstack/no-comments](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/no-comments/SKILL.md) and its [comment-sicko agent](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/agents/comment-sicko.md), pinned to `d457567332aa6989e753ea289f30ea2bfbc80bc0`. See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
