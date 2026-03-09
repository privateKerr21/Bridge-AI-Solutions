# Month 1 Implementation Guide - Automated Follow-Up System

**Client:** Matt Williams & Kyle - Refined Wealth Management
**Objective:** Fully automated LinkedIn follow-up sequences with reply detection
**Timeline:** 4 weeks
**Your Time Investment:** ~20 hours
**Client Investment:** $2,500 setup + $520/month management + Expandi ($198/month for 2 users)

---

## Overview: What We're Building

### The Problem We're Solving
Matt's follow-ups are falling through the cracks. Manual tracking in Excel doesn't scale, and there's no system to remind him who needs a message and when.

### The Solution
**Automated follow-up system from day one:**
- Matt/Kyle approve message templates and prospect lists upfront
- Expandi sends follow-ups automatically on the approved schedule (3d → 5d → 9d → 15d → monthly)
- Reply detection auto-pauses sequences when someone responds
- Google Sheets serves as the central tracking/reporting hub
- Matt/Kyle review the Expandi dashboard and Sheet -- not manually sending every message

### The Stack
1. **Expandi** - LinkedIn follow-up automation, reply detection, message delivery
2. **Google Sheets** - Central tracking hub, reporting, Active Engagement management
3. **Total tool cost:** Expandi at $99/user x 2 = $198/month

---

## Week 1: Build the Foundation (7-8 hours)

### Day 1: Expandi Account Setup (2-3 hours)

#### Set Up Accounts
- Create Expandi accounts for Matt and Kyle
- Connect their LinkedIn profiles (cloud-based -- no browser extension needed)
- Configure safety settings:
  - Daily connection request limit: 20/day (well under LinkedIn's 100/week cap)
  - Daily message limit: 50/day (conservative)
  - Active hours: 8 AM - 6 PM Mountain Time (mimics human behavior)
  - Random delays between actions (30-120 seconds)

#### Configure Follow-Up Sequences

**Sequence: "No Response" Track**

| Step | Timing | Template | Action |
|------|--------|----------|--------|
| 1 | Day 0 (after connection accepted) | Initial outreach | Auto-send |
| 2 | Day 3 (if no reply) | Follow-up #1 | Auto-send |
| 3 | Day 8 (if no reply) | Follow-up #2 | Auto-send |
| 4 | Day 17 (if no reply) | Follow-up #3 | Auto-send |
| 5 | Day 32+ (if no reply) | Monthly check-in | Auto-send |

**Reply detection:** If prospect replies at any step, sequence stops automatically. Prospect moves to "Active Engagement" in the Sheet.

#### Safety & Compliance Settings
- **Blacklist:** Add existing clients, competitors, and anyone Matt/Kyle don't want contacted
- **Working hours only:** Messages only send during business hours
- **Rate limiting:** Stay well under LinkedIn's daily/weekly thresholds
- **Cloud-based execution:** Runs on Expandi's servers, not Matt's browser -- much harder for LinkedIn to detect

---

### Day 1-2: Google Sheet Build (3 hours)

The Sheet is now the **reporting and Active Engagement hub** rather than the primary automation driver. Expandi handles the "No Response" sequences automatically.

#### Tab 1: "Prospect Pipeline" (synced from Expandi)
```
Column A: Name
Column B: LinkedIn Profile URL
Column C: Company
Column D: Title
Column E: Location
Column F: Connection Date
Column G: Current Sequence Step
Column H: Last Message Sent Date
Column I: Status (In Sequence | Replied | Converted | Dead)
Column J: Notes
```

**Purpose:** Overview of all prospects. Data syncs from Expandi (manual sync weekly, or automated if we add a connector later).

---

#### Tab 2: "Active Engagement"
```
Column A: Name
Column B: LinkedIn Profile URL
Column C: Company
Column D: Title
Column E: Connection Date
Column F: First Response Date
Column G: Last Contact Date
Column H: Next Follow-Up Date (manual -- Matt sets this per conversation)
Column I: Engagement Level (Dropdown: Warm | Hot | Meeting Scheduled | Client)
Column J: Notes
```

**Purpose:** Once someone replies, their sequence stops in Expandi and they move here. These are real conversations that Matt/Kyle manage personally.

**Conditional Formatting:**
- Row turns RED if: Next Follow-Up Date <= TODAY AND Engagement Level != "Client"
- Row turns YELLOW if: Next Follow-Up Date <= TODAY+2
- Row turns GREEN if: Engagement Level = "Meeting Scheduled" or "Client"

---

#### Tab 3: "Reporting Dashboard"
```
Row 1: Headers
Row 2: This Week | This Month | All Time
Row 3: New Connections Added
Row 4: Messages Sent (auto)
Row 5: Replies Received
Row 6: Reply Rate %
Row 7: Meetings Scheduled
Row 8: Conversion Rate %
Row 9: Active Sequences Running
Row 10: Active Engagements
```

**Purpose:** Weekly performance snapshot. Data pulled from Expandi exports + Active Engagement tab.

---

### Day 2-3: Message Template Development (2 hours)

These templates get loaded into Expandi and must be approved by Matt/Kyle before going live.

**⚠️ COMPLIANCE NOTE: All templates below require Matt/Kyle review and written approval before activation. Templates must not contain financial advice, performance claims, or investment recommendations.**

**Template 1: Initial Outreach (after connection accepted)**
```
Hi {{firstName}},

I noticed you work at {{company}} as a {{title}}. I specialize in financial planning for professionals in the oil & gas industry, particularly those at [Marathon/Chevron/HF Sinclair].

I'd love to share insights on retirement planning strategies that have worked well for others in your industry.

Best,
Matt Williams
Refined Wealth Management
```

**Template 2: Follow-Up #1 (Day 3 - No Response)**
```
Hi {{firstName}},

Just wanted to follow up on my message. I work specifically with {{company}} employees on retirement and wealth management.

Would you be open to a brief conversation about your financial goals?

Best,
Matt
```

**Template 3: Follow-Up #2 (Day 8 - No Response)**
```
Hi {{firstName}},

I realize you're probably busy, but I wanted to share a quick resource. I recently wrote about retirement planning strategies specific to energy industry professionals.

[Link to blog post or resource]

No pressure - just thought it might be valuable. Happy to chat if you ever have questions.

Cheers,
Matt
```

**Template 4: Follow-Up #3 (Day 17 - No Response)**
```
{{firstName}},

Last message from me - I know LinkedIn can get overwhelming!

If you're ever curious about optimizing your 401(k), retirement strategy, or financial planning, I'm here. We've helped professionals at companies like {{company}}.

All the best,
Matt Williams
```

**Template 5: Monthly Check-In (Day 32+)**
```
Hi {{firstName}},

Hope you're doing well. Just wanted to stay in touch.

If financial planning is ever a priority, I'd love to help. In the meantime, here's a helpful article: [Link]

Best,
Matt
```

**Personalization tokens:** Expandi auto-fills {{firstName}}, {{company}}, {{title}} from LinkedIn profile data. No manual data entry needed.

---

## Week 2: Training & Launch (4 hours)

### Day 1: Create Training Materials (2 hours)

#### Quick Reference Guide (1 page PDF)

```markdown
# LinkedIn Follow-Up System - Quick Reference
**Refined Wealth Management**

## Your Daily Routine (2-3 minutes)

1. Check Expandi dashboard: See who replied overnight
2. Check Google Sheet "Active Engagement" tab: See who needs personal follow-up
3. Respond to warm leads personally on LinkedIn
4. Update the Sheet with notes and next follow-up dates

## What's Automated (You Don't Touch This)

- Follow-up messages to non-responders (Expandi handles it)
- Reply detection and sequence pausing
- Message timing and scheduling
- Connection data logging

## What You Manage Manually

- Active conversations (people who replied)
- Meeting scheduling
- Moving people from "Active Engagement" to "Client"
- Adding notes about conversations

## Adding New Prospects to Sequences

1. Connect with someone on LinkedIn
2. Once they accept, add them to the Expandi campaign
3. The sequence starts automatically

## Pausing or Removing Someone

- In Expandi: Click on the prospect → "Remove from campaign"
- They'll stop receiving automated messages immediately

## Follow-Up Timing (Automatic)

- Connection accepted → Initial message
- No reply after 3 days → Follow-up #1
- No reply after 8 days → Follow-up #2
- No reply after 17 days → Follow-up #3
- No reply after 32 days → Monthly check-ins

Questions? Call Hayden: [your number]
```

---

#### Video Walkthrough (1 hour to create)

**Record 10-minute Loom video showing:**

**Part 1: Expandi Dashboard Overview (3 min)**
- How to see who's in each sequence
- How to check who replied
- How to add/remove prospects

**Part 2: Daily Routine (3 min)**
- Check replies in Expandi
- Move responders to Active Engagement in Sheet
- Respond personally on LinkedIn
- Update notes

**Part 3: Google Sheet Overview (2 min)**
- Pipeline tab for the big picture
- Active Engagement tab for warm leads
- Dashboard tab for performance metrics

**Part 4: Common Tasks (2 min)**
- How to add a new prospect to a sequence
- How to pause messaging for someone
- How to update a template (requires approval)

---

### Day 2: Training Session with Matt & Kyle (2 hours)

**Session Agenda:**

**1. System Overview (15 min)**
- Show Expandi dashboard and explain automated sequences
- Show Google Sheet tabs and how they connect
- Explain what's automated vs. what they manage

**2. Live Demo: Walk Through a Sequence (15 min)**
- Show a prospect entering the sequence
- Show what messages they'd receive and when
- Show what happens when someone replies (sequence stops)

**3. Live Demo: Daily Routine (15 min)**
- Check Expandi for new replies
- Move a replier to Active Engagement
- Respond personally on LinkedIn
- Update the Sheet

**4. Template Review & Approval (30 min)**
- Walk through each message template
- Get Matt/Kyle feedback and approval
- Make any edits they want
- Document approval for compliance records

**5. Practice Exercise (30 min)**
- Matt & Kyle navigate Expandi themselves
- Add a test prospect to a sequence
- Check the dashboard
- Practice the daily routine

**6. Q&A (15 min)**
- Answer questions
- Walk through edge cases
- Confirm they're comfortable before going live

---

## Week 3: Go Live & Monitor (3 hours)

### Day 1-2: Launch Sequences (1 hour)
- Activate approved sequences with initial batch of prospects
- Start conservative (10-20 prospects each for Matt and Kyle)
- Monitor first 24-48 hours for any issues

### Day 3: Mid-Week Check-In (1 hour)
- Review Expandi logs: Are messages sending correctly?
- Check reply rates: Any early responses?
- Verify Google Sheet sync is working
- Address any questions from Matt/Kyle

### Day 4-5: End-of-Week Review Call (1 hour)
- How did the first week of automation feel?
- Any messages they want to tweak?
- Ramp up prospect volume if comfortable
- Adjust timing or templates based on early data

---

## Week 4: Optimize & Report (3 hours)

### Day 1-2: Create Month 1 Performance Report (2 hours)

```markdown
# LinkedIn Follow-Up System - Month 1 Results
**Client:** Refined Wealth Management
**Period:** [Start Date] - [End Date]

## Executive Summary

- **System Status:** Fully automated sequences running
- **Follow-Up Coverage:** 100% (zero prospects fell through cracks)
- **Daily Time Investment:** 2-3 min/day (down from 8-10 hrs/week manual)

---

## Key Metrics

### Outreach Activity
- **Prospects in sequences:** [X]
- **Messages sent (automated):** [X]
- **Replies received:** [X]
- **Reply rate:** [X]%

### Conversions
- **Active conversations:** [X]
- **Meetings scheduled:** [X]
- **Conversion rate (connection → meeting):** [X]%

### Time Savings
- **Previous manual time:** ~8-10 hrs/week
- **Current time investment:** ~15-20 min/week (checking dashboard + managing replies)
- **Time saved:** ~7-9 hrs/week

---

## What's Working Well

- Automated sequences running smoothly
- Reply detection pausing conversations correctly
- Template personalization working (names, companies)
- Two-track system clear (automated vs. personal)

## Areas to Optimize (Month 2)

- A/B test message templates (which gets better reply rates?)
- Adjust timing if data suggests different cadence works better
- Expand prospect volume if capacity allows
- Add reporting automations for less manual Sheet updates

---

## Month 2 Recommendation

Focus on optimization:
- A/B test message templates
- Refine targeting criteria
- Scale prospect volume
- Improve Sheet reporting with formulas/automation
```

---

### Day 3: Month 2 Planning Call (1 hour)

**Agenda:**

1. **Review Month 1 Results**
   - Walk through performance report
   - Celebrate wins
   - Discuss what to optimize

2. **Month 2 Plan**
   - A/B testing templates
   - Scaling prospect volume
   - Any new sequence ideas (industry-specific, etc.)
   - Reporting improvements

3. **Set Month 2 Goals**
   - Target reply rates
   - Target meetings/month
   - Template optimization plan

---

## Deliverables Checklist

At end of Month 1, Matt receives:

- Working Expandi accounts for Matt + Kyle with approved sequences
- Google Sheet with 3 tabs (Pipeline, Active Engagement, Dashboard)
- 5 compliance-approved message templates loaded in Expandi
- Quick Reference Guide (PDF)
- Video walkthrough (Loom link)
- Month 1 Performance Report
- 4 weekly check-in calls completed
- Month 2 optimization plan

---

## Your Time Breakdown

**Week 1: Build (7-8 hours)**
- Expandi setup + sequences: 2-3 hours
- Google Sheet: 3 hours
- Template development: 2 hours

**Week 2: Training & Launch (4 hours)**
- Create materials: 2 hours
- Training session: 2 hours

**Week 3: Monitoring (3 hours)**
- Launch + first 48 hrs: 1 hour
- Mid-week check-in: 1 hour
- End-of-week review: 1 hour

**Week 4: Reporting (3 hours)**
- Performance report: 2 hours
- Month 2 planning call: 1 hour

**Total: 17-18 hours**

---

## Pricing Justification

**Your time:** 17-18 hours @ $150/hr = $2,550-2,700
**Your pricing:** $2,500 setup + $520/month management = $3,020 Month 1
**Your margin:** ~$320-470

**Tools cost (Matt pays):**
- Expandi: $99/user x 2 = $198/month

---

## Technical Notes & Troubleshooting

### Common Issues You Might Encounter:

**Issue 1: Expandi connection issues**
- LinkedIn occasionally requires re-authentication
- **Fix:** Matt/Kyle re-authenticate in Expandi settings (takes 30 seconds)

**Issue 2: Message not personalizing correctly**
- LinkedIn profile missing data Expandi tries to pull
- **Fix:** Add fallback text in templates (e.g., "your company" instead of blank {{company}})

**Issue 3: Reply detection missed a response**
- Rare, but possible if reply is very short or unusual format
- **Fix:** Manual check of Expandi inbox weekly; move to Active Engagement if missed

**Issue 4: Prospect in wrong sequence**
- Added to sequence they shouldn't be in
- **Fix:** Remove from campaign in Expandi immediately; add to blacklist if needed

**Issue 5: LinkedIn rate limit warning**
- Sending too many messages/connections per day
- **Fix:** Lower daily limits in Expandi safety settings

---

## Month 2 Preview: Optimization

**What we focus on:**
- A/B testing message templates (which wording gets better reply rates?)
- Adjusting sequence timing based on Month 1 data
- Scaling prospect volume up if capacity allows
- Industry-specific sequences (separate templates for Marathon vs. Chevron vs. HF Sinclair)
- Improved Google Sheet reporting and dashboards

**What stays the same:**
- Same Expandi + Google Sheet architecture
- Same two-track system (automated + active engagement)
- Matt/Kyle still approve all templates before use
- Human-managed conversations for anyone who replies

---

**Document created:** 2026-01-23
**Last updated:** 2026-02-09
**Status:** Updated for Expandi-first approach
