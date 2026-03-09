# LinkedIn Follow-Up Automation

**Client:** Matt Williams & Kyle - Refined Wealth Management
**Status:** Approved -- waiting on compliance sign-off
**Last Updated:** 2026-02-10

---

## Project Overview

Automated LinkedIn follow-up system that ensures no prospect falls through the cracks after initial outreach. Matt and Kyle connect with oil & gas industry professionals on LinkedIn; this system handles the follow-up sequences automatically using pre-approved templates.

### The Problem
Matt spends 8-10 hours/week manually tracking follow-ups in Excel. Prospects slip through the cracks. No system tells him who needs a message and when.

### The Solution
- **Expandi** sends automated follow-up sequences (Day 3, 8, 17, 32+ monthly)
- **Reply detection** auto-pauses sequences when someone responds
- **Google Sheets** tracks the full pipeline and manages active conversations
- **Two-track system:** automated sequences for non-responders, personal management for responders

---

## Project Structure

```
LinkedIn_Automation/
├── README.md                    <- You are here
├── RESUME-HERE.md              <- Quick start for next session
├── REQUIREMENTS.md             <- What Matt actually needs
├── PIVOT-EXPLANATION.md        <- Why we pivoted from lead gen
├── context.md                  <- Current project status
├── tasks.md                    <- Task checklist
├── notes.md                    <- Working notes
│
├── Deliverables/               <- Client-facing outputs
│   ├── proposal.html           <- Main proposal (follow-up automation)
│   ├── proposal-one-sheet.html <- One-page summary
│   └── meeting-outline.html    <- Meeting prep
│
├── Documentation/              <- Technical docs and guides
│   ├── compliance-response.md  <- Answers to Matt's compliance concerns
│   ├── month-1-enhanced-implementation-guide.md <- Week-by-week build plan
│   ├── 12-month-ai-hq-roadmap.md <- Long-term partnership roadmap
│   ├── linkedin-automation-research.md <- Tool evaluation
│   └── proposal-changes-summary.md <- What changed in proposal
│
├── Code/                       <- Implementation code (when we build)
│
└── Archives/                   <- Old lead gen work (preserved for reference)
    └── LeadGeneration/         <- Apify/Google Search approach (wrong solution)
```

---

## Tech Stack

| Tool | Role | Cost |
|------|------|------|
| **Expandi** | Follow-up automation, reply detection, message delivery | $198/mo (2 users) |
| **Google Sheets** | Tracking hub, Active Engagement, reporting | Free |
| **Make.com** (optional) | Expandi → Sheet sync for live dashboard | $9-16/mo |

**Not in the stack:** No AI/LLMs, no Zapier, no Apify, no OttoKit. This is automation, not AI.

---

## Pricing

| Tier | Price | Scope |
|------|-------|-------|
| **Foundation** (Month 1-3) | $520/mo + $2,500 setup | Follow-up automation system |
| **Growth** (Month 4-12) | $900/mo + $3,500 setup | Full AI Agent HQ |

---

## Key Documents

| Document | Purpose |
|----------|---------|
| `RESUME-HERE.md` | Quick context for starting a session |
| `context.md` | Full current state, decisions, blockers |
| `tasks.md` | What's done, what's next |
| `REQUIREMENTS.md` | Matt's actual requirements |
| `Documentation/compliance-response.md` | Compliance answers for Matt |
| `Documentation/month-1-enhanced-implementation-guide.md` | How to build Month 1 |

---

## Compliance

- SEC/FINRA compliant: human-in-the-loop, audit trails, no investment advice in automation
- No AI/LLMs: eliminates hallucination and training-data concerns
- Data lives in Matt's accounts (Google Workspace + Expandi)
- Full details in `Documentation/compliance-response.md`

---

## Project History

- **Jan 16-17:** Built LinkedIn lead generation system (Apify + Google Search). Wrong solution.
- **Jan 23:** Discovered actual pain point is follow-up tracking, not finding prospects. Pivoted.
- **Jan 23-Feb 9:** Rebuilt proposal, researched Expandi, created compliance response.
- **Feb 9:** Matt confirmed approval. Waiting on compliance call.
- **Feb 10:** Updated all project documentation to reflect current state.
