# CLAUDE.md

## Client: Refined Wealth Management
**Industry**: Financial Services, Wealth Management, RIA
**Engagement Type**: AI Strategy & Automation Implementation
**Primary Contact**: Matt Williams (Financial Advisor / Principal)
**Secondary Contact**: Kyle (Partner/Co-Advisor)

## Client Overview
Refined Wealth Management is a Registered Investment Advisory (RIA) firm based on the Wasatch Front in Utah. They specialize in financial planning and wealth management, with approximately 85% of their business coming from the oil and gas industry—specifically employees of Marathon Petroleum, HF Sinclair, and Chevron. They manage 401(k)s and provide comprehensive financial planning services.

## Pain Points & Goals
- **Manual LinkedIn outreach**: ~20 daily introductions tracked in Excel, highly time-consuming
- **Prospect follow-up breakdown**: Fatigue and data overload cause warm leads to fall through cracks
- **No nurture infrastructure**: No drip campaigns or automated follow-up sequences
- **SEO neglected**: Website (GoDaddy) not driving inbound leads
- **CRM limitations**: Industry-specific RIA CRM with no public API (compliance-focused, SEC audit requirements)

### Goals
- 10+ qualified leads per month
- 2-3 new clients per month
- Reclaim 15-20 hours/week from manual work
- Scale business while maintaining lower human overhead
- Build national brand presence in oil & gas niche

## Project Scope
AI-powered marketing automation starting with:
1. **LinkedIn Outreach Tracker** - Automate activity logging, prospect data extraction
2. **Follow-Up Orchestrator** - Smart sequencing based on prospect stage
3. **Nurture Engine** - Drip campaigns for long-term engagement
4. **SEO Content System** - Automated blog/content generation (future phase)

## Output Standards
- **Proposals**: Visual landing pages with clear value propositions
- **Technical docs**: Clear implementation steps with expected impact
- **Communications**: Professional but approachable tone

## Client Communication Style
- **Revenue-focused**: Justify expense with revenue generation potential
- **Practical**: Want working solutions, not theoretical frameworks
- **Compliance-aware**: SEC audit requirements, data integrity matters
- **Early adopter mindset**: Wants to get ahead of AI curve, not play catch-up

## Compliance Requirements (STRICT)

**Refined Wealth is an SEC-registered RIA. ALL work for this client MUST comply with the following. These are non-negotiable.**

### SEC / FINRA Compliance
- **Human-in-the-loop is MANDATORY**: All message templates must be reviewed and approved by Matt/Kyle before activation. Automated delivery of pre-approved templates via Expandi is permitted. No AI-generated or unapproved content may be sent to prospects.
- **Auditability**: Every automation must produce a traceable audit trail (timestamps, who did what, when). Google Sheets version history + Make.com logs serve this purpose.
- **Recordkeeping**: All AI prompts, outputs, and automation actions must be archivable for SEC inspection. Recommend Google Vault for email archiving.
- **No investment advice in automation**: Automated messages must never contain financial advice, performance claims, or investment recommendations.

### Data Governance
- **No LLM training**: Client data must NEVER be sent to any AI service that uses it for model training. Use API-tier access only (not consumer products). Include non-training clauses in all agreements.
- **Minimal PII**: Only collect publicly available LinkedIn profile data needed for follow-up tracking (name, title, company, location, LinkedIn URL). Never collect SSNs, financial account numbers, or sensitive client data.
- **Data residency**: All client data must reside in their Google Workspace (US data centers). Bridge AI does not host or store copies of client data.
- **No data sharing**: Client prospect data must never be shared with other clients, used for marketing, or referenced in case studies without explicit written consent.

### Platform & Tool Security
- **Approved tools only**: Google Sheets, Expandi, Make.com, Google Apps Script, Gmail. Any new tool requires client approval and compliance review before adoption.
- **Access control**: Bridge AI receives only the minimum permissions needed (Editor on specific Sheets). Access is client-granted and client-revocable.
- **MFA required**: Recommend MFA on all accounts connected to automation.
- **Incident response**: 72-hour breach notification commitment in service agreement.

### LinkedIn TOS
- LinkedIn automation must respect platform TOS and stay within daily/weekly rate limits
- Automated follow-up messaging allowed ONLY through pre-approved templates via Expandi (cloud-based, mimics human behavior)
- No automated connection requests -- connections are manual
- No scraping LinkedIn directly
- All message templates require Matt/Kyle written approval before activation
- Expandi safety settings must stay conservative (daily limits well under LinkedIn thresholds)

### Contractual
- Client owns ALL data and work product (inputs, outputs, templates, configurations)
- Full data portability -- no vendor lock-in
- 30-day data deletion commitment upon termination
- Non-training clause required in service agreement

### Working Rules for Claude
- Before adding ANY new tool, API, or data flow to this project, document its compliance implications
- Before generating ANY client-facing message template, add a note that it requires human review before use
- Never store or log Refined Wealth prospect data in Bridge AI's own files or systems
- When in doubt about compliance, flag it -- don't assume it's fine

## Other Guardrails
- CRM has no API - work around it, don't promise integration
- Proprietary client information must remain confidential

## Key Context
- Previously used Hummingbird for LinkedIn automation (expensive, mild results)
- Excel is current tracking system (feels "clunky" but functional)
- Both Matt and Kyle would run LinkedIn outreach strategy
- Target: Oil & gas industry employees (Marathon, HF Sinclair, Chevron)
- Niche focus: Retirement planning, 401(k) management

## Folder Structure
```
Refined Wealth/
├── CLAUDE.md           ← This file
├── Projects/           → Individual project folders
├── Communications/     → Meeting transcripts, chat logs
├── Deliverables/       → Proposals, demos, final outputs
├── Knowledge Sources/  → Strategic roadmap, client research
└── Assets/             → Logos, brand materials
```

## Key Files
- [Strategic AI Roadmap](./Knowledge%20Sources/Strategic%20AI%20Roadmap%20-%20Matt%20Williams%20-%20Refined%20Wealth%20Management.md) - Full workflow analysis
- [Meeting Transcript](./Communications/Matt%20Williams%20and%20Hayden%20Kerr_otter_ai.txt) - Discovery call notes
- [Proposal Demo](./Deliverables/final-proposal.html) - Visual proposal

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
