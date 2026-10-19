# Repository Docs (`docs/`)

## What this source contains

The `docs/` directory at the repository root. Depending on the repo, it may hold:

- PRDs (product requirement documents)
- Technical specs and RFCs
- Architectural decision records (ADRs), often under `docs/adr/` or `docs/decisions/`
- Design review notes
- Domain and glossary pages
- Postmortems from incidents
- Runbooks that may explain defensive code
- Strategy or roadmap documents that set priorities

`docs/` is where "why" often lives in long-form before it becomes code. Because it is versioned with the code, its git history also shows when a decision was written, revised, or superseded.

## How to search it

Use local search (`rg`, `git`) from the repository root. If `docs/` does not exist, stop and report the gap.

1. **Map the tree first.**

   ```bash
   # Layout and doc count
   find docs -type f \( -name '*.md' -o -name '*.mdx' -o -name '*.rst' -o -name '*.txt' \) | sort

   # Index pages that link the rest
   ls docs/README.md docs/index.md docs/SUMMARY.md 2>/dev/null
   ```

2. **Keyword searches.** Try several phrasings:
   - The feature name
   - Key symbols / class names / constants from the target code
   - The target's file path or module name
   - Error strings or user-visible terms
   - Ticket keys and PR numbers from the code anchor

   ```bash
   rg -n -i -C3 '<feature|symbol|error string>' docs/
   rg -l -i '<term1>' docs/ | xargs rg -l -i '<term2>'   # docs mentioning both
   rg -n 'PROJ-1234|#1234' docs/
   ```

3. **Read candidate docs in full.** Not just the matching lines. Rationale is often buried mid-document, in "Context", "Motivation", "Alternatives considered", or "Consequences" sections.
4. **Follow links.** Docs link each other with relative Markdown links. Follow links to alternatives, appendices, and superseding docs.

   ```bash
   rg -o '\]\([^)]*\.md[^)]*\)' <doc>
   rg -l '<doc filename>' docs/   # backlinks: what links to this doc
   ```

5. **Use git history on the docs.** Dates and authorship tell you whether the doc preceded the code, was written alongside it, or was backfilled.

   ```bash
   # Who wrote the doc and when; how it evolved
   git log --follow --format='%h %ad %an %s' --date=short -- <doc>

   # Docs that added or removed a term
   git log -S '<term>' --format='%h %ad %an %s' --date=short -- docs/

   # Docs changed around the code's ship date
   git log --since=<date-60d> --until=<date+30d> --name-only --format='%h %ad %an %s' --date=short -- docs/

   # Docs changed in the same commit/PR as the target code
   git show --stat <commit> -- docs/
   ```

6. **Check doc status.** Look at front matter or headers (`status: accepted`, `Status: Superseded by ADR-0012`, `Draft`) and deleted docs (`git log --diff-filter=D --name-only -- docs/`). A deleted or superseded doc can still be the original "why."

## What good evidence looks like here

- A PRD with a "Problem statement" or "Motivation" section that matches the target code's purpose
- An "Alternatives considered" or "Rejected approaches" section
- A postmortem that names the target code as the fix for a specific incident
- Design review notes that record "we decided X because Y" and tie to the same author/date range as the PR
- An ADR filled out non-trivially (status, context, decision, consequences)
- A doc added or edited in the same commit or PR as the target code

## Common pitfalls

- **Outdated docs.** Specs are often written before implementation and not updated. The doc may describe a plan that changed. Cross-check against the actual PR.
- **Doc vs. reality drift.** A spec may say "we'll do X" but the code actually does Y. Flag the divergence. The synthesizer will surface the contradiction.
- **Boilerplate templates.** Some repos require a "Why" section that gets filled with fluff. Look for specificity.
- **Unlinked docs.** The most relevant doc may not be linked from anywhere. Broad keyword searches help.
- **Multiple drafts.** If a topic has multiple docs, find the one that was finalized or most recently updated. Check status fields and git dates.
- **Backfilled docs.** A doc committed long after the code may be a reconstruction, not a contemporaneous record. Note the gap between doc date and code date.
- **Generated or vendored content.** Skip API reference output, built sites, and copied third-party docs. They carry no team rationale.

## What to return

For each relevant doc:
- Title and repo-relative path (e.g., `docs/adr/0007-retry-policy.md`)
- Authors and first/last commit dates (from `git log`)
- The motivation text (verbatim quote), with section heading and line numbers
- Relevant linked docs (so the synthesizer can cite them)
- Status: finalized, draft, superseded, or deleted (with the commit that removed it)
