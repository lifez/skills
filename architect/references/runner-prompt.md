# Candidate design prompt

Use this prompt for each independent candidate, inline or in a read-only design agent. Fill in the bracketed inputs; give every candidate the same facts and constraints but a different structural lens.

## Task

Design [change and intended outcome] within [authorized scope].

Grounding: [actual code paths and symbols, runtime flow, existing ownership, invariants, historical constraints, and explicit unknowns].
Requirements and non-goals: [requirements].
Structural lens: [for example: extend the current owner with a deep interface; or move coordination to a distinct owner with explicit lifecycle].
Output location: [separate candidate document path, or a labeled inline section].

Read the supplied grounding and relevant source before designing. Produce a design, not an implementation. Do not edit application code, tests, dependencies, configuration, or infrastructure; do not run migrations, deployments, or other state-changing commands. Write only your assigned design document if one is specified.

Include:

1. Desired caller usage, with a success and failure case.
2. Public types and signatures derived from the usage, with pseudocode or explicit `not implemented` bodies.
3. Module map, ownership, state lifecycle, and dependency direction.
4. End-to-end flow, invariants, errors, concurrency/resource cleanup where relevant.
5. Compatibility and migration strategy.
6. What complexity the interface hides, and what callers must still know.
7. Trade-offs, rejected alternatives, assumptions, and risks.
8. Proposed tests or experiments for later implementation; do not claim runtime verification.

Screen the proposal against the supplied design red flags. Explain any intentionally accepted red flag. Prefer the smallest coherent design that meets the real requirements; do not implement or synthesize other candidates.
