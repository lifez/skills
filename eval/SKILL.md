---
name: eval
description: "Design and run blinded evaluations of AI agent variants using isolated candidate environments, a shared rubric, and an independent judge. Use when comparing models, prompts, skills, or agent configurations and deciding whether to promote a variant."
---

### Eval

**You own the experiment design. Plan, blind, run, synthesize.**

**Non-negotiables for blinding:**

- Remove evaluation-specific labels and metadata from candidate-visible prompts, paths, and fixtures. Do not rename legitimate project tests or APIs just to hide ordinary words.
- The candidate prompt looks like an organic user request. State the goal, not the meta.
- No chain-eliciting cues. Don't ask the candidate to list which skills, principles, or files they applied. Ask for design notes generally and grade chain-following from code shape, not self-report.
- Sanitize directory and slug names. Use project-shaped names a user might pick.
- Don't tell the candidate other candidates exist.
- The judge can know it's judging but sees outputs by sanitized label only, never by model name.
- Comparing two variants: one judge scores both sets in a single pass on one scale, blind to which set each came from.

**Steps:**

1. **Frame.** State what variant is under test and what behavior counts as success. Write the rubric (3-6 concrete criteria) for the judge only. Hold it back from candidates.
2. **Set up sanitized environments.** Give each candidate an independent directory or worktree with project-shaped names and the same approved baseline, fixtures, tools, and limits; vary only the intended treatment. Do not share writable state or expose sibling outputs, judge artifacts, credentials, or unrelated user work. Include only task-relevant context and the skills the candidate would naturally read. Do not reset or overwrite the user's checkout.
3. **Author one organic prompt.** What a user would type. No leakage of what's being measured.
4. **Run independent implementation-capable candidates** using Agent only if available and permitted. Do not import arena's design-only contract. Give each the same organic task and permission to implement and verify inside its own environment, without publishing. Record the returned agent IDs. Inherit the session model unless the experiment specifies an available override; disclose unavailable treatments instead of silently substituting. Request fresh context (`inherit_context: false`) if supported, but do not claim this hides system prompts, injected skills, tools, or host metadata. Inspect controllable context and report residual leakage. If independent execution is unavailable, offer a clearly labeled exploratory inline comparison, not a blinded evaluation.
5. **Use one independent judge** if Agent is available, preferably on a different available model family; inherit the default if the other model is unavailable and disclose it. Judge all outputs together using sanitized labels and the same rubric, without model identities. Keep the identity map private from the judge; do not hide task-relevant evidence. If judging inline, disclose the non-independent review.
6. **Verify observable behavior, not self-report.** Retrieve transcripts only through `get_subagent_result` with verbose output, using IDs returned by this run's Agent calls. Do not assume a transcript directory or search unrelated sessions. Inspect tool/file access and code shape for evidence. If verbose retrieval or transcript detail is unavailable, report that gap; absence of evidence is not proof a skill was or was not followed.
7. **Read every candidate output yourself** end to end. Compare to the judge's verdict. Disagreement means a model is biased or the rubric is ambiguous. Synthesize.

**Reply:** variant under test, rubric, per-candidate notes, judge's verdict, your synthesis, and a recommendation for whether to promote the variant.

---
Adapted from [pstack/eval](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/poteto-mode/playbooks/eval.md). See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
