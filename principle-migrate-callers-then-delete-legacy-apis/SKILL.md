---
name: principle-migrate-callers-then-delete-legacy-apis
description: "Apply when introducing a new internal API while old callers still exist. Migrate callers and delete the old API in the same wave instead of preserving compatibility layers."
---


# Migrate Callers Then Delete Legacy APIs

For an internal API with no external compatibility obligation, migrate its consumers and remove the old surface in the same coordinated wave.

1. Inventory definitions, imports, call sites, tests, documentation, generated consumers, and persisted or wire representations. Confirm which consumers you control.
2. Define the replacement contract and map old behavior to it. Preserve required behavior, not old implementation accidents.
3. Migrate all owned callers. Update tests to assert the new contract; remove only tests that protect obsolete implementation details.
4. Delete the legacy API, unused adapters, aliases, flags, and dead documentation. Search for old names and verify any remaining matches are intentional.
5. Run type checks and behavior tests through the migrated callers, including error paths.

Do not apply a flag-day removal to public APIs, independently deployed clients, or persisted formats that require compatibility. Use an explicit staged migration with rollout, rollback, and deprecation criteria instead. Do not remove contractual behavior merely to simplify the diff.

---
Adapted from [pstack/principle-migrate-callers-then-delete-legacy-apis](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md), pinned to `d457567332aa6989e753ea289f30ea2bfbc80bc0`. See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
