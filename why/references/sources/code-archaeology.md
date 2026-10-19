# Code Archaeology (git + in-repo)

## What this source contains

- Commit history (messages, dates, authors, diffs)
- PR descriptions, review comments, and discussion threads (via `gh-axi`)
- Inline code comments, TODOs, FIXMEs, deprecation notes
- ADRs (architectural decision records) if the repo keeps them
- Tests, whose names and assertions often encode the edge cases that motivated a change
- Related files modified in the same commits (co-change signal)
- CHANGELOG entries and release notes in the repo
- Issue/ticket IDs in commit messages and PR bodies

The most trustworthy source, tied directly to the code, and the most complete. Everything that went through the repo should be here.

## How to search it

Expand the seed commit list:

```bash
# History through renames
git log --follow --oneline -- <file>

# Pickaxe: commits that added or removed this exact text
git log -S '<exact_string_from_code>' -- <file>

# Or for patterns:
git log -G '<regex>' -- <file>

# Who wrote each line and when
git blame -L <start>,<end> <file>

# One commit's full diff
git show <hash>

# Commits between two points affecting this file
git log <old>..<new> -p -- <file>
```

Pull the PR record with `gh-axi` (not `gh`). It returns compact, truncated output by default. Add `--full` when the rationale may be deep in a body or diff:

```bash
# Find the PR that merged a commit (squash/rebase merges hide the PR number)
gh-axi api /repos/{owner}/{repo}/commits/<hash>/pulls --jq '.[] | {number, title}'

# PR body, discussion, and review threads (inline review comments hold most rationale)
gh-axi pr view <number> --full --comments --reviews

# The PR's diff as reviewed
gh-axi pr diff <number> --full

# Issues the PR closes or references
gh-axi issue view <number> --full --comments

# PRs and commits mentioning a symbol, error string, or ticket key
gh-axi search prs '<term>' --repo {owner}/{repo} --state all
gh-axi search commits '<term>' --repo {owner}/{repo}

# Other PRs by the same author around the change
gh-axi pr list --state all --author <login> --limit 50
```

Look for out-of-band docs:

```bash
# ADRs often live in docs/adr/ or similar
rg -l -i 'architecture.decision' --glob '*.md'

# TODOs and FIXMEs near the target
rg -n -C2 '(TODO|FIXME|HACK|XXX|NOTE)' <target_file>

# Related tests
rg -l '<symbol>' --glob '*test*'
```