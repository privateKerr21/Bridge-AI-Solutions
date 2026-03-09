# CLAUDE.md - LinkedIn Automation Project

## Project: LinkedIn Outreach & Lead Tracking System
**Client**: Refined Wealth Management
**Status**: Demo Ready / Awaiting Approval
**Start Date**: 2026-01

## Project Goal
Build an AI-powered LinkedIn outreach system that automates prospect discovery, data extraction, and personalized message generation - reclaiming 8-10 hours/week of manual work.

## Key Deliverables
1. Prospect search/discovery tool
2. Auto-extraction of 8 data points per prospect
3. Fit scoring with reasoning
4. Personalized message generator (3 options per prospect)
5. Follow-up sequencing logic

## The 8 Data Points
1. Name
2. Email
3. Phone number
4. Years of service
5. Location
6. Company (Marathon, HF Sinclair, Chevron)
7. Job Title
8. LinkedIn URL

## Target Audience
- Oil & gas industry employees
- Companies: Marathon Petroleum, HF Sinclair, Chevron
- Location: Utah (primarily), expanding nationally
- Tenure: 10+ years (ideal: 15-30 years, approaching retirement)

## Technical Constraints
- LinkedIn TOS: AI drafts only, human sends
- No CRM API available - work with Excel
- Compliance review required before sending

## Folder Structure
```
LinkedIn_Automation/
├── CLAUDE.md           ← This file
├── plan.md             ← Strategy & decisions
├── context.md          ← Current state
├── tasks.md            ← Task checklist
└── Deliverables/       → Demo files, proposals
    ├── demo-with-search.html  ← Main demo (search + messages)
    ├── demo.html              ← Original message-only demo
    ├── index.html             ← Proposal landing page
    └── final-proposal.html    ← Combined proposal (WIP)
```

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
