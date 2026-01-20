# Refined Wealth Management - Plan

## Project Goal
Implement AI-powered marketing automation to reclaim 15-20 hours/week of manual work and create predictable lead flow for Matt and Kyle's financial advisory practice.

## High-Level Decisions
- **Approach**: Phased rollout starting with LinkedIn automation
  - **Reason**: Marketing generates revenue to justify expense; quick wins build trust before larger implementations
- **Timeline**: Ongoing engagement, starting with LinkedIn workflow
  - **Reason**: Need to prove ROI before expanding to nurture campaigns and SEO
- **Success Metrics**:
  - 10+ qualified leads per month
  - 2-3 new clients per month
  - 15-20 hours/week reclaimed from manual work

## Non-Negotiables
- LinkedIn automation must respect platform TOS (AI drafts, human sends)
- All client communications require human review (compliance requirement)
- Cannot integrate with RIA CRM (no API, SEC audit requirements)
- Cannot disrupt existing client service during implementation

## Architecture/Strategy Decisions
- **Start with LinkedIn outreach automation**
  - **Why**: Highest time drain (8-10 hrs/week), clear ROI potential, both Matt and Kyle want it
  - **Alternatives considered**: Starting with SEO (rejected: longer payback period), starting with nurture (rejected: need leads first)
- **Use Excel as data layer initially**
  - **Why**: CRM has no API; Excel is already in use and can be enhanced
  - **Alternatives considered**: New CRM (rejected: compliance concerns, learning curve)
- **Human-in-the-loop for all outreach**
  - **Why**: LinkedIn TOS compliance, compliance requirements, quality control
  - **Alternatives considered**: Full automation (rejected: platform risk, compliance risk)

## Out of Scope
- CRM replacement or direct integration
- Fully automated LinkedIn messaging (TOS risk)
- Operations automation (phase 2+)
- Client-facing AI tools (phase 2+)

## Key Stakeholders
| Name | Role | What They Care About |
|------|------|---------------------|
| Matt Williams | Principal/Advisor | Revenue generation, staying ahead of AI curve, reclaiming time for client work |
| Kyle | Partner/Advisor | Same LinkedIn workflow, scaling without overhead |

## Budget & Resources
- **Budget**: TBD - must demonstrate ROI to justify ongoing expense
- **Resources allocated**: Rocket AI consulting
- **Dependencies**:
  - Access to current Excel tracking sheet
  - Understanding of LinkedIn search criteria/niche targeting
  - Sample outreach messaging and follow-up cadences
