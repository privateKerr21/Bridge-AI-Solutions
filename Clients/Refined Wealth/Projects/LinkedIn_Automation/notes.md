# LinkedIn Follow-Up Automation - Working Notes

**Last Updated:** 2026-02-10

---

## Actual Requirement (Corrected Jan 23)

Matt doesn't need help **finding** prospects. He needs help **managing follow-ups** after initial contact.

**Pain point:** After sending initial LinkedIn messages, there's no system for tracking who responded, who didn't, and when to follow up. Prospects fall through the cracks. 8-10 hrs/week wasted on manual Excel tracking.

**Key quote from Matt:**
> "The thing that is taking the most time on LinkedIn are the *follow-ups* and knowing *when* to follow up."

---

## System Design

### Two-Track System
1. **No Response Track** (automated via Expandi): Day 3 → Day 8 → Day 17 → Day 32+ monthly
2. **Active Engagement Track** (manual in Google Sheet): For prospects who reply -- Matt/Kyle manage personally

### Data Flow
```
Matt connects on LinkedIn
  → Adds prospect to Expandi campaign
  → Expandi sends pre-approved follow-up messages on schedule
  → If reply detected: sequence pauses, prospect moves to Active Engagement
  → If no reply: sequence continues through all steps
  → Google Sheet reflects full pipeline status
```

### Make.com Role (Optional)
Make.com's one useful job: **sync Expandi data to Google Sheets automatically.**
- Without it: manual CSV export from Expandi weekly
- With it ($9-16/mo): Sheet stays current automatically
- Best added Week 3-4 once core system is stable
- Not a core dependency

---

## Compliance Notes

- **No AI in the pipeline.** Expandi is automation, not AI. Sends exactly what Matt/Kyle wrote.
- **Human-in-the-loop:** All templates pre-approved. Matt/Kyle decide who enters sequences.
- **Fallback:** If auto-sending is too aggressive for compliance, Expandi can do tracking + reply detection only while Matt sends manually.
- **Audit trail:** Expandi logs every message (who, what, when). Sheet version history tracks all edits.

---

## Open Items for Compliance Call

- Walk through `Documentation/compliance-response.md`
- Confirm Matt is comfortable with Expandi auto-sending pre-approved templates
- Discuss Google Vault for email archiving
- Draft service agreement addendum
- Create vendor security packet (Google + Expandi compliance links)

---

## Lessons Learned (From Pivot)

1. Ask "walk me through your exact process step by step"
2. Identify where the breakdown actually happens
3. Validate: "the pain point is X, not Y -- correct?"
4. Don't assume the pain point from surface-level descriptions
