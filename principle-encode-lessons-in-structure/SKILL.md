---
name: principle-encode-lessons-in-structure
description: "Apply when you catch yourself writing the same instruction a second time, or notice a recurring correction. Encode the rule as a lint, metadata flag, runtime check, or script instead of more text."
---


# Encode Lessons in Structure

Turn a recurring correction into the smallest durable mechanism that prevents or detects it, rather than adding another paragraph of advice.

1. Name the repeated failure and the invariant it violates. Check that the lesson generalizes beyond one incident.
2. Prefer eliminating the invalid state through a type, schema, boundary, or ownership change.
3. Otherwise add a focused test, lint, CI check, validation rule, or rerunnable script at the point that owns the invariant. Use existing tooling rather than introducing a framework.
4. Demonstrate that the guardrail catches a representative violation and accepts valid cases. Make failures actionable and avoid leaking secrets.
5. Remove redundant instructions only after their replacement is effective. Keep a short explanation of intent where future maintainers need it.

If the lesson requires judgment and cannot be reliably encoded, keep a concise instruction with a concrete failure example in the appropriate skill or repo guidance. Do not automate an ambiguous preference into a noisy rule.

Distinguish this from [Build the Lever](../principle-build-the-lever/SKILL.md): a lever makes today's work repeatable; this principle prevents a recurring class of mistakes.

---
Adapted from [pstack/principle-encode-lessons-in-structure](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/principle-encode-lessons-in-structure/SKILL.md), pinned to `d457567332aa6989e753ea289f30ea2bfbc80bc0`. See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
