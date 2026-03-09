# CLAUDE.md

## Client: [Client Name]
**Industry**: [e.g., SaaS, Healthcare, E-commerce]
**Engagement Type**: [e.g., Consulting, Development, Strategy]
**Start Date**: [YYYY-MM-DD]
**Primary Contact**: [Name, Role]

## Client Overview
[One paragraph describing the client, their business, and what they do]

## Pain Points & Goals
- [Key challenge #1 the client is facing]
- [Key challenge #2]
- [Primary goal they want to achieve]

## Project Scope
[Brief description of what we're doing for this client]

## Output Standards
- **Documents**: [Format preferences, length requirements]
- **Communications**: [Tone, formality level, preferred channels]
- **Deliverables**: [Quality standards, review process]

## Client Communication Style
- [How they prefer to receive information]
- [Decision-making style]
- [Key stakeholders and their priorities]

## Guardrails
- [Things to avoid or never do with this client]
- [Confidentiality requirements]
- [Approval processes needed]

## Folder Structure
```
[Client Name]/
├── CLAUDE.md           ← This file (permanent client context)
├── plan.md             ← Strategy & decisions (WHY we're doing things)
├── context.md          ← Current state (WHAT's happening now)
├── tasks.md            ← Checklist (WHAT to do next)
├── Projects/           → Individual project folders
├── Communications/     → Meeting notes, emails, correspondence
├── Deliverables/       → Final outputs sent to client
├── Knowledge Sources/  → Client-provided docs, research, data
└── Assets/             → Client logos, brand materials
```

## Session Start Instructions
When starting a new session with this client, Claude should:
1. Read `CLAUDE.md` for permanent client context
2. Read `context.md` for current state and recent work
3. Read `tasks.md` for what needs to be done
4. Reference `plan.md` when making strategic decisions

## Key Links & Resources
- [Link to client website]
- [Link to shared drive/portal if applicable]
- [Other relevant resources]

---

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules that prevent the same mistake from recurring
- Review `tasks/lessons.md` at session start for relevant context

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Ask: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: implement the elegant solution instead
- Skip this for simple, obvious fixes — don't over-engineer

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it — don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Fix failing tests without being told how

### Task Management
- **Plan First**: Write plan to `tasks/todo.md` with checkable items
- **Verify Plan**: Check in before starting implementation
- **Track Progress**: Mark items complete as you go
- **Explain Changes**: High-level summary at each step
- **Document Results**: Add review section to `tasks/todo.md`
- **Capture Lessons**: Update `tasks/lessons.md` after corrections

### Core Principles
- **Simplicity First**: Make every change as simple as possible. Minimal code impact.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Only touch what's necessary to complete the task.
