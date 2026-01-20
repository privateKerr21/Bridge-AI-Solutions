# LinkedIn Automation - Plan

## Project Goal
Automate LinkedIn prospect discovery and outreach to reclaim 8-10 hours/week of manual work while maintaining compliance and human oversight.

## High-Level Decisions
- **Approach**: Human-in-the-loop automation (AI drafts, human sends)
  - **Reason**: LinkedIn TOS compliance, SEC compliance requirements
- **Data Layer**: Excel-based (enhanced)
  - **Reason**: CRM has no API; Excel is familiar to client
- **Phased Rollout**: Demo → Pilot → Full deployment
  - **Reason**: Prove ROI before larger investment

## Success Metrics
- 10+ qualified leads per month
- 8-10 hours/week reclaimed
- Zero warm leads falling through cracks
- 1+ new client per month (per advisor running the system)

## Non-Negotiables
- AI drafts messages, humans review and send
- All prospect data stays in client-controlled systems
- Compliance-safe messaging (no misleading claims)
- Must work for both Matt and Kyle

## Architecture Decisions
- **Prospect Search**: Simulated in demo; production will use LinkedIn Sales Navigator or similar
  - **Why**: Demo proves concept; real scraping needs compliance approval
  - **Alternatives considered**: Phantombuster (deferred to production phase)
- **Message Generation**: Template-based with AI personalization
  - **Why**: Fast, reliable, maintains Matt's voice
  - **Alternatives considered**: Full LLM generation (higher latency, less predictable)
- **Fit Scoring**: Rule-based (tenure, company, location, title)
  - **Why**: Transparent, explainable to client
  - **Alternatives considered**: ML-based scoring (overkill for this stage)

## Out of Scope (This Phase)
- Direct CRM integration
- Automated sending (always human-triggered)
- Drip campaign automation (Phase 2)
- SEO content system (Phase 3)

## Key Stakeholders
| Name | Role | Priority |
|------|------|----------|
| Matt Williams | Primary user, decision maker | Revenue generation, time savings |
| Kyle | Secondary user | Same workflow as Matt |
