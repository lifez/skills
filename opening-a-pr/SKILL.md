---
name: opening-a-pr
description: "Prepare a concise, verified pull-request draft and publish only with explicit user authorization. Use when preparing a change for review or when the user asks to open a PR."
---

# Opening a PR

## Authorization and workspace

An implementation request is not publication authorization. Without explicit authorization, inspect local evidence and return a proposed title and body; do not commit, push, rebase, create a PR, or change remote state. Ask separately for missing permissions; permission to open a PR is not blanket permission to rewrite history or merge.

Inspect the branch, status, diff, and intended base. Preserve pre-existing changes. Do not reset hard, broadly revert, stash unrelated work, force-push, or automatically repair a dirty checkout. If isolation is needed, propose a fresh branch/worktree from an agreed base without moving the user's work. Stop if the intended diff cannot be separated safely.

## Review and draft

1. Read linked skills before using them. Review only the intended diff for scope, correctness, compatibility, and accidental secrets. Use [no-comments](../no-comments/SKILL.md) and [unslop](../unslop/SKILL.md) when applicable; do not remove useful documentation mechanically.
2. Record actual verification commands and outcomes, including gaps. Propose small ordered commits with [principle-sequence-verifiable-units](../principle-sequence-verifiable-units/SKILL.md); create or rewrite them only with authorization and explicit paths, never blanket staging.
3. Use a short imperative Conventional Commit title: `type(scope): subject`, with no trailing period.
4. Write a one-minute reviewer briefing using these headings in order. Keep Scope; omit other empty sections:
   - `## Why`: problem and approach, 1–3 sentences.
   - `## What changed`: 1–3 bullets; name both ends of important renames.
   - `## Scope`: what is included and deliberately excluded.
   - `## Tradeoffs`: meaningful rejected alternatives.
   - `## Blast Radius`: affected consumers and compatibility risk.
   - `## Verification`: real run paths and results; for performance, a primary number with units, before → after, and an artifact link.
   Attach screenshots or recordings only when they prove a claim. Link detailed logs instead of pasting a lab notebook. Never claim unrun checks passed.

## Authorized GitHub stage

Only when actually performing a GitHub operation, locate and read the installed external **gh-axi** skill and follow its current CLI/auth guidance. It is not a repo-relative dependency and is not needed merely to write a local PR draft. If unavailable or unauthenticated, report the blocker and return the draft; do not improvise credentials or alternate publication tooling.

Confirm repository, remote branch, base branch, intended diff, and draft/ready status before creation. Prefer a draft when verification is incomplete; follow an explicit user readiness choice. Push only an authorized branch and create or update only the intended PR. Inspect the resulting URL, base, and status before reporting success. For stacks, confirm each parent/base explicitly; do not automatically rebase or retarget children.

Return the title/body when unpublished, or the verified PR URL and status when published. Do not automatically merge, start a monitoring loop, or treat failed checks as permission for unrelated edits.

Adapted from [pstack Opening a PR](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/poteto-mode/playbooks/opening-a-pr.md) (MIT; [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE)).
