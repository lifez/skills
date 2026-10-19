---
name: principle-redesign-from-first-principles
description: "Apply when integrating a new requirement into an existing design."
---

# Redesign From First Principles

When integrating a change, don't bolt it onto the existing design. Redesign as if the requirement had been a foundational assumption from the start.

- Read all affected files and understand the current design
- Ask: "if we were writing this from scratch with this new requirement, what would we build?"
- Propagate the authorized change through its affected types, docs, examples, and rationale. Preserve unrelated work and required compatibility. Report out-of-scope consequences and seek approval before expanding the task.
- Think about the whole redesign, then deliver it incrementally

This is the method for preserving option value when integrating changes into an existing design.

---
Adapted from [pstack/principle-redesign-from-first-principles](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/principle-redesign-from-first-principles/SKILL.md), pinned to `d457567332aa6989e753ea289f30ea2bfbc80bc0`. See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
