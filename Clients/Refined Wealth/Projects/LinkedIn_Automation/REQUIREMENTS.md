# LinkedIn Follow-Up Automation - Requirements

**Client:** Matt Williams & Kyle - Refined Wealth Management
**Last Updated:** 2026-02-10
**Status:** Requirements finalized, implementation approach decided (Expandi from Month 1)

---

## Executive Summary

Matt doesn't need help **finding** LinkedIn prospects. He needs help **managing follow-ups** after initial contact. The current manual tracking system causes prospects to fall through the cracks, resulting in missed opportunities.

---

## The Problem

### Current Manual Workflow (What's Working)

```
1. Matt searches LinkedIn for target prospects ✅
   └─> Oil & gas industry (Marathon, Chevron, HF Sinclair)
   └─> Specific titles (CFO, financial planners, etc.)
   └─> Geographic focus (Texas, Utah)

2. Matt sends connection request ✅
   └─> Personalized message

3. Prospect accepts connection ✅

4. Matt sends initial message ✅
   └─> Introduces Refined Wealth services
   └─> Tailored to their industry/company

5. ❌ BREAKDOWN HAPPENS HERE ❌
   └─> No system for tracking responses
   └─> No reminders for when to follow up
   └─> Manual Excel tracking feels "clunky"
   └─> People fall through the cracks
   └─> Missed opportunities from inactivity
```

### Primary Pain Point

**Matt's Quote:**
> "The thing that is taking the most time on LinkedIn are the *follow-ups* and knowing *when* to follow up. People followed up on XYZ day should have been followed up with today. There's being missed opportunity by inactivity happening."

### Current Time Waste
- **8-10 hours per week** on manual tracking and follow-up management
- Manually checking Excel to see who needs follow-up
- Trying to remember who responded vs. who didn't
- Calculating when next follow-up should happen
- Clunky data entry of connection information

---

## The Solution Required

### Core Automation Needs

#### 1. Connection Data Extraction (Secondary Priority)

**When:** Someone accepts Matt's LinkedIn connection request
**What to extract:** ~8 data points
- Name
- Email (if publicly visible)
- Phone number (if publicly visible)
- Years of service / experience
- Current company
- Job title
- Location
- LinkedIn profile URL

**Where to store:** Auto-populate Google Sheet

**Current pain:** "Clunky" manual data entry, "bottom of the totem pole" priority

---

#### 2. Follow-Up Tracking System (Primary Priority)

**Purpose:** Ensure no prospect falls through the cracks

**Two-Track System:**

##### Track 1: "No Response" Sequence
*For prospects who haven't responded to messages*

Automated reminder/prompt schedule:
- **Day 3** after 1st message (no response)
- **Day 5** after 2nd message (no response)
- **Day 9** after 3rd message (no response)
- **Day 15** after 4th message (no response)
- **Monthly thereafter** (eternal nurture until they respond)

##### Track 2: "Active Engagement"
*For prospects who ARE responding*

Separate tracking and handling:
- Different follow-up cadence
- Separate status/category
- Different messaging approach

---

#### 3. Background Automation

**Key requirement:** System must run in the background

**What this means:**
- No manual checking required
- Automatic tracking of message send dates
- Automatic detection of responses vs. no responses
- Automatic prompts/reminders when action needed
- Zero prospects slip through without follow-up

---

## Implementation Constraints

### Technical Requirements

1. **LinkedIn TOS Compliance**
   - Must not violate LinkedIn's automation policies
   - Human-in-loop for actual message sending
   - No spam or aggressive automation

2. **Integration Points**
   - LinkedIn (connection/message data)
   - Google Sheets (data storage)
   - Notification system (follow-up reminders)
   - Possibly: Email, Slack, or calendar integration

3. **Data Points to Track**
   - Connection date
   - Initial message send date
   - Each follow-up message date
   - Response status (responded / no response)
   - Current track (No Response / Active Engagement)
   - Last contact date
   - Next follow-up due date

### Business Requirements

1. **Phased Approach**
   - 3-month benchmarks with expense ranges
   - Quarterly milestones
   - Path toward "AI Agent HQ" vision (future state)

2. **Documentation & Adoption**
   - "Can it be adopted by someone else?"
   - "Is there documentation?"
   - System must be transferable, not just custom code

3. **Commitment Structure**
   - "What's the commitment look like?"
   - Clear expectations on both sides
   - Defined scope and deliverables

4. **Multi-User Support**
   - Matt AND Kyle both need access
   - Separate tracking per user
   - Shared or individual dashboards

### Success Metrics

**Primary:**
- Zero prospects fall through cracks (100% follow-up coverage)
- Automatic tracking of all connection/message activity
- Timely follow-up reminders (no missed windows)
- 8-10 hours/week time savings

**Secondary:**
- Automated connection data extraction
- Clean Google Sheet population
- Two-track separation working correctly
- System "runs in background" without manual checks

---

## What We're NOT Building

❌ **Lead generation / prospect finding system**
- Matt already finds prospects successfully
- Don't need to scrape or search for new people
- Don't need to score/qualify prospects

❌ **Automated message sending**
- Matt wants to review/approve messages (compliance)
- Human-in-loop required
- Just need reminders, not auto-send

❌ **CRM replacement**
- Matt has existing CRM (Orion - not API-friendly)
- Not trying to replace it
- Just supplementing with follow-up tracking

---

## Technical Questions (Resolved)

| Question | Answer | Date |
|----------|--------|------|
| LinkedIn API access? | Official API requires partner approval, not feasible. Use Expandi instead. | 2026-01-23 |
| Response detection? | Expandi has built-in reply detection. Auto-pauses sequences. | 2026-01-23 |
| Which automation tool? | Expandi -- cloud-based, reply detection, safety features, $99/user/mo | 2026-02-09 |
| Notification system? | Expandi dashboard + Google Sheet conditional formatting | 2026-02-09 |
| Data storage? | Google Sheets sufficient. No database needed. | 2026-01-17 |
| Make.com role? | Optional -- Expandi→Sheet sync for live dashboard ($9-16/mo) | 2026-02-10 |

---

## Implementation Approach (Finalized)

### Month 1: Full Automation from Day One
**Goal:** Automated follow-up system running with pre-approved templates

**Stack:** Expandi ($198/mo for 2 users) + Google Sheets (free)

- Week 1: Expandi setup, sequence configuration, Google Sheet build, template development
- Week 2: Training materials, 2-hour training session with Matt & Kyle
- Week 3: Go live with conservative batch, monitor, optional Make.com sync
- Week 4: Performance report, Month 2 planning

**Deliverables:**
- Working Expandi accounts with approved sequences
- Google Sheet (Pipeline, Active Engagement, Dashboard tabs)
- 5 compliance-approved message templates
- Quick reference guide + video walkthrough
- Month 1 performance report

### Month 2-3: Optimization
**Goal:** Improve performance based on data

- A/B test message templates
- Industry-specific sequences (Marathon vs. Chevron vs. HF Sinclair)
- Scale prospect volume
- Enhanced reporting
- Prevent duplicate outreach between Matt + Kyle

**Full details:** `Documentation/month-1-enhanced-implementation-guide.md`

---

## Client-Specific Context

### Industry: Financial Advisory
- Highly regulated (SEC compliance required)
- Cannot spam or appear aggressive
- Relationship-based business (not transactional)
- Long sales cycles (months to years)

### Target Audience: Oil & Gas Industry
- **Companies:** Marathon Petroleum, HF Sinclair, Chevron
- **Titles:** CFO, financial planners, financial advisors, retirement specialists
- **Geography:** Texas (oil country), Utah (refineries), some national
- **Goal:** 20 introductions/day → 1 client/month per advisor

### Current Tools
- **CRM:** Orion (not API-friendly, compliance-focused)
- **Tracking:** Excel (manual, clunky)
- **LinkedIn:** Manual search and outreach
- **Previous tool:** Hummingbird ($500+/mo, "mild results")

---

## Success Definition

### From Matt's Perspective

**"Working" means:**
- Matt never wonders "Did I follow up with that person?"
- System tells him exactly who needs follow-up TODAY
- No one falls through the cracks
- Saves 8-10 hours/week
- Can scale to 20 daily introductions sustainably

**"Not working" means:**
- Still manually checking Excel to see who needs follow-up
- Still forgetting to follow up with people
- Still "clunky" data entry
- Missing opportunities due to lost tracking

---

## Next Steps

1. ✅ Document requirements (this file)
2. ✅ Research LinkedIn automation tools/APIs
3. ✅ Draft technical approach (Expandi from Month 1)
4. ✅ Create 3-month benchmark plan with costs
5. ✅ Build revised proposal
6. ✅ Get client approval on approach
7. ⏳ Compliance sign-off (waiting on call)
8. ⏳ Begin Month 1 build

---

*Requirements finalized: 2026-01-23*
*Implementation approach finalized: 2026-02-09*
*Documentation updated: 2026-02-10*
