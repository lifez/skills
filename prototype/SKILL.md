---
name: prototype
description: "Build isolated throwaway prototypes to choose between visual designs, interactions, or behavioral approaches. Use when the user asks for a prototype, mockup, proof of concept, or a comparison of alternatives before production implementation."
---

### Prototype

**You own the design decision, not the code. The prototype is a throwaway instrument. The real build follows Feature.**

The one playbook where [principle-laziness-protocol](../principle-laziness-protocol/SKILL.md)'s "smallest change" and the verification bar invert. Speed over polish, code quality does not matter, no planning. The rigor is in picking the right design cheaply. Propose variations the user didn't ask for, throw an approach away and try another.

Read linked skills before using them. Preserve production source and pre-existing work; do not commit, push, rebase, or publish without authorization. Keep experiments within the agreed scope and avoid credentials or real external side effects.

1. Scope the decision the prototype exists to make: which layout, which interaction, which density, or for an empirical fork which behavior, timing, or approach. No decision means no prototype. Route to [feature](../feature/SKILL.md).
2. Gather references when the design space is open. Search for prior art, summarize a moodboard of themes, palettes, and layouts, let the user pick directions before building. Skip when the direction is set.
3. Build throwaway in an isolated scratch dir, separate from production source. For a visual decision, vanilla HTML/CSS/JS or the lightest stack that renders the idea, CDN deps, a dev server with hot reload. For a behavioral or timing decision, the smallest script that exercises the question. No production framework, no tests, no abstractions.
4. When comparing alternatives, build them behind one switcher (buttons or a keypress), each variant labeled. This is the [principle-exhaust-the-design-space](../principle-exhaust-the-design-space/SKILL.md) principle skill made cheap.
5. Verify on the matching surface. For a visual decision, screenshot each variant using available browser tools and drive the interaction. Report unavailable tools or surfaces as verification gaps. For a behavioral or timing decision, observe the thing you are deciding by logging the timing, printing the output, or watching the render. The observation is the test here, not an assertion.
6. Present alternatives, tradeoffs, and a recommendation. The output is the decision plus the throwaway artifact, not shippable code. Hand the chosen direction to [feature](../feature/SKILL.md) (or [architect](../architect/SKILL.md) for the shape) for the real build.

**Reply:** the variants explored, the evidence (screenshots for a visual decision, the observed output or timing for a behavioral one), tradeoffs, your recommendation, and the scratch path. Say plainly that the prototype is throwaway.

---
Adapted from [pstack/prototype](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/poteto-mode/playbooks/prototype.md). See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
