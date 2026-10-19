# Design red flags

Screen every candidate before synthesis. A flag is a question to resolve, not an automatic rejection.

## Ownership and invariants

- One invariant depends on several callers remembering the same undocumented sequence.
- State has multiple owners, or no clear creation, mutation, and disposal lifecycle.
- A new layer reverses the existing dependency direction or creates a cycle.
- Cross-boundary writes assume atomicity that the storage or transport cannot provide.
- Locks, retries, deduplication, or transactions are deferred despite shared state or partial failure.

## Interface depth and local reasoning

- A public wrapper merely forwards arguments while adding no meaningful boundary.
- Callers must know internal ordering, storage details, or sentinel values.
- One ordinary action requires navigating many objects or coordinating several shallow APIs.
- Parallel representations of the same fact require manual synchronization.
- A locally plausible edit can silently violate a distant module's invariant.
- The nearest example encourages bypassing the intended boundary.

## Types and scope

- Optional fields encode mandatory states, or boolean combinations allow impossible states.
- Casts, `any`, or stringly typed dispatch hide a missing domain distinction.
- A generic framework or plugin system serves only one concrete use case.
- Speculative extension points cost more than the requirements justify.
- The sketch lacks failure contracts, compatibility rules, or a migration path.
- The public surface grows while the caller's job stays equally complex.

## Synthesis questions

Can the interface hide more implementation detail without losing needed capability?
Can one owner enforce the invariant instead of every caller?
Can an existing concept replace a new abstraction?
Can the normal path and failure path both be explained from the public contract?
Which flags remain, why are they acceptable, and what would cause reconsideration?
