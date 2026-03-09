# Compliance Response: Refined Wealth Management

**From:** Bridge AI Solutions (Kerr)
**For:** Matt Williams & Kyle - Refined Wealth Management
**Date:** 2026-02-09
**Re:** AI Vendor Compliance Concerns

---

## Overview

Matt -- appreciate you sending these over. These are the right questions to be asking, especially given the SEC/FINRA landscape right now. I went through all 9 of the resources you linked and put together responses to each concern below.

The short version: our build doesn't use any AI/language models. It's Google Sheets for tracking and reporting, and Expandi (a LinkedIn automation platform) for follow-up sequencing and reply detection. Your prospect data sits in your own Google Workspace the entire time -- we just wire up the connections. That said, I want to address each point properly so you've got it documented.

---

## 1. Data Governance & Privacy

### PII Masking & Redaction

**The concern:** Does the tool redact PII before processing?

**Where we land:** The system only touches publicly available LinkedIn data -- names, titles, companies, locations, and LinkedIn URLs. We're not pulling in anything sensitive. No financial data, no SSNs, no client portfolio info, nothing like that.

Here's the full picture:
- **What we collect:** Name, job title, company, location, years of experience, LinkedIn profile URL, and publicly listed email/phone if they have it visible on their profile
- **What we don't touch:** Financial account info, SSNs, investment data, client portfolios, AUM -- none of that enters the system
- We're only capturing what's needed to know who to follow up with and when
- Prospect tracking data lives in your Google Sheet, which you own and control access to

**Worth discussing on our call:** We could put together a short data classification doc that spells out exactly what we collect, why, and how long it sticks around. Good to have on file.

---

### No Third-Party LLM Training

**The concern:** Is our data being used to train public LLMs?

**Short answer:** No. And there's no AI involved in this system at all.

Here's what each tool does with your data:

| Tool | Trains on Your Data? | What It Actually Does |
|------|---------------------|----------------------|
| **Google Sheets** | No | It's a spreadsheet. Your data stays in your Google account. |
| **Expandi** | No | LinkedIn automation tool. Sends pre-approved messages on a schedule. Works with data you already have access to on LinkedIn. |

To be clear -- there's no ChatGPT, no Claude, no language model anywhere in the pipeline. Expandi is an automation platform, not an AI. It sends messages you've already written and approved, on a schedule you define. It's closer to an email drip tool than anything "AI."

If we bring in actual AI tools down the road (like for drafting message suggestions), we'd:
1. Only use API-level access where your data is explicitly excluded from training
2. Get your sign-off in writing before connecting anything
3. Document exactly what's being used and how

We'll put a non-training clause in our service agreement to lock this in.

---

### Data Residency

**The concern:** Where does the data actually live? Does it leave our environment?

Here's where everything sits:

| Data | Where It Lives | Who Controls It |
|------|---------------|----------------|
| Prospect profiles & tracking | Your Google Sheet (Google Cloud, US servers) | You |
| Follow-up sequences & message logs | Expandi (cloud-based, encrypted) | You (your Expandi account) |
| Message templates | Expandi + your Google Sheet (backup copy) | You |
| Reporting & dashboards | Your Google Sheet | You |

The data flow:
```
LinkedIn (public profiles) → Expandi (manages sequences, logs messages) → Your Google Sheet (central tracking hub)
```

**The important part:** We don't host, store, or keep a copy of your prospect data. We configure the system; the data lives in your accounts. If we stopped working together tomorrow, your data doesn't go anywhere -- it's already in your house.

---

## 2. Security & Technical Standards

### Certifications

**The concern:** SOC 2 Type II or ISO 27001?

Since we're building on top of established platforms (not custom infrastructure), the certifications come from those platforms:

| Platform | Certifications |
|----------|---------------|
| **Google Workspace** (Sheets, Gmail) | SOC 1/2/3, ISO 27001, ISO 27017, ISO 27018, FedRAMP, HIPAA-capable |
| **Expandi** | GDPR compliant, encrypted data storage, cloud-based infrastructure |

Expandi doesn't carry the same enterprise-grade certifications as Google, which is typical for LinkedIn automation tools in this space. That said, they're cloud-based (not a browser extension), invest in safety infrastructure, and are GDPR compliant. Your most sensitive data (the full prospect tracking sheet) lives in Google, which has the heavy certifications.

We're the integrator -- we don't run our own servers or databases. We get Editor access to your specific Google Sheets and admin access to configure your Expandi account. You grant it, you can revoke it anytime.

**For the call:** Happy to pull together links to each platform's security pages so you've got everything in one place for your files.

---

### Access Controls (RBAC & MFA)

**The concern:** Role-based access and multi-factor auth?

**Google Workspace (where your tracking data lives):**
- You set permissions on each Sheet -- Viewer, Commenter, or Editor per person
- MFA is available through your Google admin (strongly recommend turning it on if it's not already)
- Google logs who accessed or edited each file and when

**Expandi:**
- Separate accounts for Matt and Kyle
- Cloud-based (runs on their servers, not your browser -- safer from LinkedIn detection)
- Credentials stored encrypted
- Accounts set up under your ownership so you retain full control

**What we get access to:**
- Editor access to the specific Google Sheet(s) for this project
- Admin access to configure your Expandi sequences and templates (during setup and optimization)
- We don't touch your Gmail, Orion, or LinkedIn passwords
- You grant access, you revoke access

---

### Incident Response

**The concern:** Do you have a written incident response plan? Will you notify us within 72 hours of a breach?

Yes. We'll include this in our service agreement:

1. **72-hour notification** -- If we find out about any unauthorized access to your data through systems we manage, we'll let you know within 72 hours. We'd tell you what happened, what data might be affected, what we're doing about it, and what you should do on your end.

2. **Platform-side:** Google has incident response baked into their SOC 2 and GDPR commitments. Expandi has incident response per their GDPR obligations.

3. **To be upfront about scope:** Since your data lives in your own Google and Expandi accounts, if someone compromises *your* accounts, that's outside our control. But we'd absolutely help you respond and lock down the connections.

**For the call:** Let's plan on drafting a simple 1-page incident response addendum for the service agreement. Shouldn't be complicated.

---

## 3. Compliance & Accountability

### Auditability & SEC Recordkeeping

**The concern:** Can the system produce tamper-proof logs for SEC recordkeeping?

Yes -- through multiple layers.

**Google Sheets version history:**
- Tracks every single edit -- who changed what cell, when, and what it was before
- Accessible through File > Version History
- Editors can't alter or delete the version history
- This gives you a built-in audit trail for every prospect data change, status update, and follow-up record

**Expandi logs:**
- Logs every message sent -- who it went to, which template was used, exact timestamp
- Logs every reply received and when sequences were paused
- Campaign performance data (sent, opened, replied, etc.)
- Exportable for compliance records

**Email trail:**
- If you use Google Vault or another archiver, all automation-related emails get captured automatically
- If you don't have an archiver set up, I'd recommend adding Google Vault as part of setup -- it's built for exactly this

**What an auditor would see:**
- Full edit history of every prospect record in the Sheet
- Complete message log from Expandi (who received what, when)
- Enough to reconstruct the full timeline of any prospect interaction

**For the call:** Do you currently use Google Vault or another email archiver? If not, we should get that set up early.

---

### Model "Temperature" Control

**The concern:** Can you control temperature settings to reduce hallucination risk?

This one doesn't apply to our system, since there's no AI in it. It's automation rules, pre-written templates, and spreadsheet formulas. There's literally nothing that can hallucinate -- Expandi sends the exact message you wrote, word for word.

If we add AI-assisted message drafting later:
- Temperature is fully configurable through the API -- we'd keep it low (0.0-0.3) for anything factual or compliance-related
- Everything AI generates would go through Matt/Kyle for review before it goes anywhere
- We could add a flag or confidence indicator on AI suggestions so you know what to scrutinize

**The takeaway:** Zero hallucination risk. No AI in the system. If AI enters the picture later, it'll be tightly controlled and always human-reviewed.

---

### Human-in-the-Loop

**The concern:** Can we review and approve before anything gets published or sent?

This is central to how we built the system. I want to be straightforward about what's automated and what isn't, because Expandi does send follow-up messages automatically -- but only using templates you've already approved.

Here's how human oversight works:

| What | Human Role | Automated Part |
|------|-----------|----------------|
| Message templates | Matt/Kyle write and approve every template before it goes live | Expandi sends the approved template at the scheduled time |
| Sequence rules | Matt/Kyle define the cadence (3d, 5d, 9d, 15d) and approve the logic | Expandi executes the sequence on schedule |
| Who enters the sequence | Matt/Kyle review and approve which prospects get added | Expandi handles timing and delivery |
| Reply detection | -- | Expandi detects replies and stops the sequence automatically |
| Opt-outs / removals | Matt/Kyle can pull anyone out at any time | Expandi respects stop rules |
| Connection data tracking | -- | Expandi logs connection data, syncs to your Google Sheet |
| Reporting | Matt/Kyle review weekly | Google Sheet formulas calculate metrics |

**The key idea:** Human-in-the-loop here means "approve the templates, rules, and prospect list -- then the system executes." Think of it like setting up an email drip campaign: you write the emails, you define who gets them and when, then the platform handles delivery.

**Why this works for compliance:**
- Nothing goes out that Matt/Kyle haven't reviewed and approved as a template
- They control which prospects enter each sequence
- They can pause or kill any sequence at any time
- Expandi logs every message sent (who, what, when) for audit purposes
- Reply detection stops sequences automatically -- no one gets a follow-up after they've already responded

**What it doesn't do:**
- It won't compose original messages on its own (no AI)
- It won't reach out to people Matt/Kyle haven't approved
- It won't send anything using a template they haven't signed off on

**This is worth discussing on our call.** If automated sending feels like too much from a compliance standpoint, we can use Expandi only for tracking and reply detection while Matt/Kyle send every message manually. There's a spectrum here, and you should be comfortable with where we land.

---

## 4. Legal & Contractual

### Ownership

**The concern:** Does the contract confirm we own everything?

Yes. The service agreement will state:

- **Your data is yours.** Prospect info, follow-up records, message templates, tracking data -- all of it belongs to Refined Wealth.
- **The stuff we build is yours too.** Sheet templates, Expandi sequence configs, documentation -- you keep it all, even after our engagement ends.
- **We don't get to reuse it.** We won't use your data for our own marketing, other clients, or case studies unless you specifically say that's okay in writing.
- **The SaaS tools** (Google, Expandi) have their own standard terms, but neither claims ownership over your data. They're processors.

---

### Termination & Data Deletion

**The concern:** Can we get our data and have yours deleted if we end the relationship?

Yes, and honestly this is pretty simple because of how the system is set up:

1. **Your Google Sheet** -- It's already yours. If we stop working together, nothing changes. Keep using it, archive it, delete it. Your call.
2. **Your Expandi account** -- Set up under your name. You keep the sequences running or shut them off. Export any data you need.
3. **Our access** -- You remove our permissions from the Sheet and Expandi account. Done.
4. **Our files** -- We'll delete any copies of your data from our local systems within 30 days and confirm in writing that it's done.

There's no lock-in here. Everything runs on standard tools you can manage without us. We're not a dependency.

We'll put termination and deletion rights in the service agreement.

---

## Summary

| Concern | How We Handle It |
|---------|-----------------|
| PII exposure | Only collect public LinkedIn info. No financial data enters the system. |
| Third-party training | No AI in the system. Non-training clause in contract. |
| Data residency | Tracking data in your Google Workspace (US). Sequences in your Expandi account. |
| Security certs | Google (SOC 1/2/3, ISO 27001). Expandi (GDPR compliant, encrypted). |
| Access controls | Google permissions + MFA. Expandi accounts under your ownership. |
| Incident response | 72-hour notification in service agreement. |
| SEC auditability | Sheet version history + Expandi message logs + Gmail archive. |
| Hallucination risk | None. No AI in the system. |
| Human-in-the-loop | Pre-approved templates only. Matt/Kyle control who gets messaged and what they receive. |
| Data ownership | You own everything. Spelled out in the contract. |
| Termination | Full data portability. No lock-in. 30-day deletion on our end. |

---

## Next Steps

1. **Schedule a 30-min call** to walk through these and address anything else that comes up
2. **Draft a service agreement addendum** covering data ownership, incident response, termination, and non-training clauses
3. **Put together a vendor security packet** with compliance links for Google and Expandi
4. **Check on email archiving** -- confirm whether you're using Google Vault or similar
5. **Consider a firm-wide AI policy** -- even a one-pager covers you well. FINRA recommends it regardless of which vendor you use.

---

## Resources

I reviewed all 9 links you sent. The key frameworks that shaped this response:

- SEC proposed vendor due diligence rule for RIAs
- FINRA's GenAI guidance and Rule 3110 on supervisory obligations
- SOC 2 / ISO 27001 certification standards
- NIST AI Risk Management Framework
- Industry vendor assessment best practices for regulated firms

---

*This is meant as a starting point for our compliance conversation, not legal advice. I'd recommend having your compliance counsel look over the final service agreement once we draft it.*
