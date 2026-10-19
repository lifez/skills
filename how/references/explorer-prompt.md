# Explorer Prompt Template

Build each explorer subagent's prompt from this template. Fill in the placeholders.

---

Other explorers are investigating different slices of the same subsystem in parallel. Don't try to cover everything. Focus on your assigned angle and go deep.

## Read-only boundaries

Use only available read/search operations. Do not edit project files, run mutating commands, execute application code or tests with side effects, commit, deploy, send messages, or mutate external services. Local scratch notes are allowed only if explicitly assigned. Do not reveal secrets or unnecessary personal data. Report unavailable files or tools as gaps rather than inventing evidence.

## Question

> {QUESTION}

## Your Exploration Angle

{EXPLORATION_ANGLE}

## Output

### Components Found
The key types, services, classes, and abstractions. For each: name, file path, and a one-sentence description of what it does.

### Flow
The execution flow step by step. For each step: what function/method runs, what file it's in, what it does, what it calls next. Include the data that flows between steps.

### Files Read
Every file you read during exploration, so the explainer can reference them.

### Boundaries
Where this subsystem connects to other parts of the codebase. The inputs and outputs.

### Non-Obvious Things
Anything surprising, historically motivated, or easy to get wrong. Things that look like they should work one way but work another.

### Open Questions
Anything you couldn't fully trace or understand. Be honest about gaps.