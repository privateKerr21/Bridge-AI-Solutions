# Make.com Integration Spec: Expandi → Google Sheets

**Created:** 2026-02-10
**Status:** Researched, ready to build (Week 3 of Month 1)
**Cost:** Make.com Core plan $9/mo (10,000 ops/month)

---

## Overview

Expandi has no native Make.com module. Connection uses Make.com's **Custom Webhook** trigger to receive Expandi webhook events, then routes data to Google Sheets.

---

## Setup Steps

### 1. Create Make.com Scenario
- Add **Custom Webhook** trigger module → Make generates a unique URL
- Add **Router** module for event-type branching
- Add **Google Sheets** modules on each route

### 2. Configure Expandi Webhooks
- In Expandi: LinkedIn Settings → Webhooks → Add Webhook
- Paste Make.com webhook URL
- Select trigger event (one webhook per event type)
- Activate

### 3. Test & Map Fields
- Click "Test" in Make.com to capture Expandi's payload structure
- Map fields to Sheet columns

---

## Scenario Architecture

```
[Custom Webhook: Expandi event]
  → [Router]
    → Route 1 (filter: event = connection_accepted)
        → [Google Sheets: Add Row to Pipeline tab]
    → Route 2 (filter: event = message_sent)
        → [Google Sheets: Search Row by LinkedIn URL → Update Row]
    → Route 3 (filter: event = contact_replied)
        → [Google Sheets: Update Pipeline row status → "Replied"]
        → [Google Sheets: Add Row to Active Engagement tab]
```

---

## Expandi Webhook Events (Relevant to This Project)

| Event | Use Case |
|-------|----------|
| Connection request accepted | Add new prospect to Pipeline tab |
| Message sent | Update row with message date + sequence step |
| Contact replied | Update status, copy to Active Engagement tab |
| Campaign finished | Mark prospect as sequence complete |

---

## Webhook Payload Fields

Expandi sends JSON POST with:
- `first_name`, `last_name`
- `email`, `phone`
- `company_name`, `job_title`
- `profile_link` (LinkedIn URL)
- `tags`
- `hook.event` (which event triggered)
- `messenger.contact_status`, `messenger.conversation_status`

---

## Important Gotchas

1. **Not real-time.** Events fire during Expandi's configured active hours when it syncs with LinkedIn. Expect a few hours of delay for reply detection.

2. **No automatic retry.** Failed webhooks must be manually resent from Expandi's webhook history page (has a "Resend" button).

3. **Forward-only.** Webhooks only fire for events after activation. Backfill existing data via one-time CSV export.

4. **Batching.** Expandi can batch events at 1/4/8/12/24-hour intervals. Recommend **1-hour batching** for this project.

5. **Google Sheets direct integration is deprecated.** Expandi has an old Apps Script method but explicitly warns it's unmaintained. Use Make.com instead.

---

## Capacity Estimate

- Matt's volume: ~20 prospects/day = ~400/month
- Each prospect triggers 3-5 webhook events over their sequence lifecycle
- Monthly operations: ~1,200-2,000
- Make.com Core plan (10,000 ops/month): plenty of headroom

---

## Reversed Webhooks (Bonus -- Inbound to Expandi)

Expandi also supports sending data INTO campaigns via reversed webhooks:
- **Add people to a campaign** (requires `profile_link` in JSON payload)
- **Pause/Resume leads** (requires `campaign_contact_id`)

This could be useful later if Matt wants to trigger campaign additions from the Google Sheet.

---

## Sources

- [Expandi Webhook Events](https://help.expandi.io/en/articles/5405651-webhook-events)
- [Expandi Reversed Webhooks](https://help.expandi.io/en/articles/5405654-reversed-webhooks-api)
- [Expandi Webhook Timing](https://help.expandi.io/en/articles/9737106-when-webhooks-trigger-and-how-to-manage-them-on-expandi)
- [Make Community: Expandi + Pipedrive via Webhook](https://community.make.com/t/web-hook-between-expandi-io-and-pipedrive-crm/82424)
