# LinkedIn Lead Gen Agent Platform - Roadmap

**Client:** Matt Williams & Kyle - Refined Wealth Management
**Vision:** Build a custom agent platform where Matt & Kyle can access AI-powered lead generation agents
**Created:** 2026-01-17

---

## 🎯 Vision

Transform the LinkedIn_Automation project from a **one-time automation** into a **SaaS platform** where Refined Wealth can:
- Access custom AI agents for different tasks (lead gen, content writing, etc.)
- Pay monthly subscription for agent access
- Scale to multiple users and use cases

---

## 🤖 Agent #1: LinkedIn Lead Generation Agent

### Core Capabilities

**1. Scrape Google for LinkedIn Profiles (3 Target Companies)**
- User inputs: 3 company names (e.g., "Marathon Petroleum", "Chevron", "ConocoPhillips")
- Agent searches Google for: `[Company] CFO site:linkedin.com`
- Returns: 10-20 LinkedIn profile URLs per search

**2. Extract 8 Key Metrics & Generate List**
- For each LinkedIn URL found, extract:
  - Name
  - Title
  - Company
  - Location
  - Years of Experience
  - Email (if visible)
  - Phone (if visible)
  - LinkedIn URL
- Calculate Fit Score (0-10) based on:
  - Title relevance (CFO, Plant Manager = high score)
  - Location match (Texas, Utah = higher score)
  - Seniority (20+ years = higher score)
- Generate reasoning: "Senior CFO, Texas location, approaching retirement age"

**3. Craft Personalized Copy-Paste Messages**
- Generate 3 message variations per prospect
- Personalize based on:
  - Industry role (oil & gas specific)
  - Company (mention their employer)
  - Location (Utah connection, Texas oil country)
  - Career stage (retirement planning angle)
- Output: Ready-to-copy messages for LinkedIn outreach

---

## 📊 Data Tracking Requirements

### Track Who, When, and How Long

| Field | Purpose | Auto/Manual |
|-------|---------|-------------|
| **Prospect Name** | Identity | Auto |
| **Contact Info** | Email, Phone, LinkedIn URL | Auto |
| **Date Found** | When prospect was discovered | Auto |
| **Date Contacted** | First outreach sent | Manual |
| **Days Since Contact** | Auto-calculated field | Auto |
| **Status** | New → Contacted → Responded → Qualified → Client | Manual |
| **Message Sent** | Which of 3 variations was used | Manual |
| **Response Received** | Yes/No/Pending | Manual |
| **Next Follow-Up** | Scheduled touchpoint date | Manual |
| **Contacted By** | Matt or Kyle (multi-user tracking) | Manual |
| **Notes** | Additional context | Manual |

### Data Storage Options

**Phase 1 (MVP): Google Sheets**
- ✅ Already integrated
- ✅ Easy manual review
- ✅ OttoKit can write to it
- ❌ Not scalable beyond 500 leads
- ❌ Limited automation capabilities

**Phase 2 (Scale): PostgreSQL/Supabase**
- ✅ Scalable to thousands of leads
- ✅ Advanced features (auto follow-ups, analytics)
- ✅ Multi-user support (Matt + Kyle)
- ❌ More complex to build
- ❌ Requires backend infrastructure

**Recommendation:** Start with Google Sheets, migrate to database when scaling past 500 leads.

---

## 🌐 Platform Access Options

### Option 1: Web Dashboard (Recommended)

**User Flow:**
1. Matt logs in → Dashboard shows "LinkedIn Lead Gen Agent"
2. Clicks agent → Opens search form
3. Enters 3 target companies (e.g., "Marathon Petroleum, Chevron, BP")
4. Clicks "Find Prospects" → Agent runs (30-60 seconds)
5. Results appear: Table with 10-20 prospects, sorted by fit score
6. Clicks prospect → Opens detail view with 3 message variations
7. Copies message → Pastes into LinkedIn
8. Marks as "Contacted" → Tracking updates automatically
9. Calendar reminder set for follow-up

**Tech Stack:**
- **Frontend:** Next.js (React framework)
- **Backend:** Node.js API (handles agent orchestration)
- **Agent:** Claude API with custom prompts/tools
- **Integrations:** Apify (Google search), Google Sheets (data storage)
- **Auth:** NextAuth (email/password login)
- **Hosting:** Vercel (frontend), Railway (backend)

**Timeline:** 8-10 weeks to build MVP

---

### Option 2: Slack Bot (Faster to Build)

**User Flow:**
1. Matt types: `/findleads Marathon Petroleum, Chevron, BP`
2. Bot responds: "Finding prospects... this will take ~1 minute"
3. Bot returns: "Found 15 prospects. Top 5:"
   - Robert Thompson (9.8/10) - CFO, Marathon
   - [Click to see messages]
4. Matt clicks prospect → Bot DMs him 3 message variations
5. Matt copies message, sends on LinkedIn
6. Matt types: `/contacted Robert Thompson`
7. Bot updates tracking sheet

**Tech Stack:**
- Slack Bot API
- Node.js backend
- Claude API
- Apify
- Google Sheets

**Timeline:** 3-4 weeks to build MVP

**Pros:** Faster, familiar interface, no separate login
**Cons:** Less polished, harder to scale to other agents

---

## 💰 Billing Strategy with Stripe

### Pricing Models

**Model 1: Monthly Subscription Tiers (Recommended)**
```
Pilot Tier - $299/month per user
- Unlimited searches (realistically 20/day max)
- Up to 500 prospects/month
- 3 message variations per prospect
- Email support

Pro Tier - $199/month per user
- 200 prospects/month
- All core features

Growth Tier - $499/month per user
- 1000 prospects/month
- Priority support
- Custom message templates

Enterprise - Custom pricing
- Unlimited prospects
- Multi-user workspace
- Custom agent development
```

**Model 2: Usage-Based Billing**
```
Pay per search:
- $5 per search (finds 10-20 prospects)
- $0.50 per message generated
- Monthly invoice via Stripe
```

**Model 3: Hybrid (Best of Both)**
```
$299/month base subscription
- Includes 300 prospects/month
- $1 per additional prospect over limit
```

### Stripe Integration Steps

1. **Create Stripe Account**
2. **Create Products in Dashboard:**
   - Product: "LinkedIn Lead Gen Agent"
   - Prices: $199/mo, $299/mo, $499/mo
3. **Implement Stripe Checkout:**
   - User signs up → Redirected to Stripe Checkout
   - Payment successful → Account activated
4. **Set Up Webhooks:**
   - `customer.subscription.created` → Activate agent access
   - `customer.subscription.deleted` → Revoke access
   - `invoice.payment_failed` → Send dunning email
5. **Add Customer Portal:**
   - Users can upgrade/downgrade plans
   - Update payment methods
   - View invoices

### Revenue Projections (Matt & Kyle Only)

**Scenario 1: Both users at $299/mo**
- Monthly: $598
- Annual: $7,176

**Scenario 2: Add 5 more advisors at Refined Wealth**
- 7 users × $299/mo = $2,093/mo
- Annual: $25,116

**Cost Structure:**
- Apify: ~$0.01 per search
- Claude API: ~$0.03 per agent run
- Hosting: ~$50/mo
- **Gross margin: 95%+**

---

## 🏗️ Technical Architecture

```
┌─────────────────────────────────────────────────────┐
│  FRONTEND (Next.js Web App)                         │
│  - Login page (email/password)                      │
│  - Dashboard (shows available agents)               │
│  - Agent interface (search form + results)          │
│  - Prospect detail view (messages + tracking)       │
│  - Billing portal (Stripe integration)              │
└──────────────────┬──────────────────────────────────┘
                   │ HTTPS/JSON
                   ▼
┌─────────────────────────────────────────────────────┐
│  BACKEND API (Node.js/Express)                      │
│  - Auth middleware (verify subscription)            │
│  - Agent orchestration (queue searches)             │
│  - Claude API integration (agent brain)             │
│  - Apify API integration (Google search)            │
│  - Google Sheets API (data persistence)             │
│  - Stripe webhooks (handle billing events)          │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│  EXTERNAL SERVICES                                  │
│  - Claude API (agent prompts + tools)               │
│  - Apify (Google Search Results Scraper)            │
│  - Google Sheets (lead tracking database)           │
│  - Stripe (subscription billing)                    │
│  - SendGrid (email notifications - optional)        │
└─────────────────────────────────────────────────────┘
```

---

## 📅 Implementation Roadmap

### **Phase 1: Agent Development (Weeks 1-2)**
**Goal:** Get the agent working locally, validate quality

- [ ] Build agent prompt that accepts 3 company names
- [ ] Integrate Apify API for Google search
- [ ] Parse LinkedIn URLs from search results
- [ ] Extract 8 data points from profiles
- [ ] Calculate fit score algorithm
- [ ] Generate 3 message variations per prospect
- [ ] Test with Matt's actual target companies
- [ ] Validate output quality (fit scores accurate? messages good?)

**Deliverable:** Working agent script (Python/Node.js) that produces CSV output

---

### **Phase 2: Basic Web Platform (Weeks 3-4)**
**Goal:** Make agent accessible via web browser

- [ ] Set up Next.js project
- [ ] Build login system (NextAuth)
- [ ] Create dashboard page (list of agents)
- [ ] Build search form (3 company inputs)
- [ ] Wire up backend API to run agent
- [ ] Display results in table (sortable by fit score)
- [ ] Show 3 message variations per prospect
- [ ] Add "Copy to Clipboard" buttons
- [ ] Deploy to Vercel (frontend) + Railway (backend)

**Deliverable:** Working web app (beta version, no billing yet)

---

### **Phase 3: Data Tracking & CRM (Weeks 5-6)**
**Goal:** Track outreach history and prevent duplicate contacts

- [ ] Connect to Google Sheet via API
- [ ] Write prospects to sheet after each search
- [ ] Add "Mark as Contacted" button
- [ ] Track: Date Contacted, Message Sent, Status
- [ ] Auto-calculate "Days Since Contact"
- [ ] Add filtering (by Status, Date, Fit Score)
- [ ] Build prospect history view (who contacted, when, response)
- [ ] Add "Next Follow-Up" date picker
- [ ] Multi-user support (track if Matt or Kyle contacted)

**Deliverable:** Full CRM functionality integrated with agent

---

### **Phase 4: Billing Integration (Weeks 7-8)**
**Goal:** Make it a paid product with Stripe

- [ ] Create Stripe account
- [ ] Define subscription plans in Stripe Dashboard
- [ ] Implement Stripe Checkout flow
- [ ] Add subscription check (block access if unpaid)
- [ ] Set up webhooks (activate/deactivate on payment events)
- [ ] Build Stripe Customer Portal integration
- [ ] Add usage metering (track searches per month)
- [ ] Send email receipts after payment
- [ ] Handle failed payments (dunning emails)

**Deliverable:** Production-ready billing system

---

### **Phase 5: Polish & Launch (Weeks 9-10)**
**Goal:** Production-ready, scalable platform

- [ ] Add email notifications (new prospects found)
- [ ] Error handling (what if Apify fails? Claude API down?)
- [ ] Build usage analytics dashboard
- [ ] Create onboarding tutorial/walkthrough
- [ ] Add "Report Issue" button for bad data
- [ ] Security audit (SQL injection, XSS, etc.)
- [ ] Performance testing (can it handle 100 concurrent searches?)
- [ ] Documentation (user guide, API docs)
- [ ] Launch to Matt & Kyle as beta users
- [ ] Collect feedback for iteration

**Deliverable:** Production launch, ready to scale

---

## 🚨 Critical Considerations (Refined Wealth Context)

### **1. Compliance First**
- ✅ Already using Google search (LinkedIn TOS compliant)
- ✅ Human-in-the-loop (Matt/Kyle approve all messages)
- ⚠️ **FINRA/SEC Rules:** Financial advisors have strict messaging rules
  - Solution: Add compliance review step (messages reviewed before sending)
  - Consider: Legal review of message templates
- ⚠️ **Data Privacy:** Storing prospect data securely
  - Solution: HTTPS only, encrypted data at rest, GDPR-compliant

### **2. Multi-User Workspace**
- Matt AND Kyle need separate logins
- They should see the SAME prospect list (shared workspace)
- Track WHO contacted each prospect (avoid duplicate outreach)
- **Solution:** Add "Workspace" concept (Refined Wealth workspace with 2 users)

### **3. Message Template Customization**
- They'll want to tweak message tone/structure over time
- Different message templates for different prospect types
- **Solution:** Admin panel to edit message templates

### **4. Integration with Existing CRM (Future)**
- If they use Salesforce, HubSpot, or other CRM
- Eventually need export/sync functionality
- **For now:** Google Sheets is sufficient

### **5. Cost Management**
- Apify: $0.01 per search
- Claude API: $0.03 per agent run
- **Total cost per search:** ~$0.04
- **Their volume:** 20 searches/day = $0.80/day = $24/mo
- **Your pricing:** $299/mo per user = 12.5x margin

### **6. Quality Control & Feedback Loop**
- Not all prospects will have visible emails (67% rate from testing)
- Some fit scores might be inaccurate (algorithm needs tuning)
- **Solution:** Add feedback buttons ("Good prospect", "Bad prospect")
- Use feedback to improve fit score algorithm over time

### **7. Scalability Concerns**
- Google Sheets works for <500 leads
- Beyond that, need to migrate to database (PostgreSQL/Supabase)
- **Plan migration path now**, even if not implementing yet

---

## 🎯 Future Agent Ideas (Beyond Lead Gen)

Once the platform is built, adding new agents is easier:

**Agent #2: Content Writing Agent**
- Input: Topic, tone, length
- Output: LinkedIn posts, blog articles, newsletters
- Pricing: $199/mo for unlimited content generation

**Agent #3: Email Follow-Up Sequencer**
- Input: Prospect data, initial message sent
- Output: 3-email follow-up sequence personalized to prospect
- Pricing: Included in Growth tier

**Agent #4: Meeting Scheduler**
- Input: Prospect responded, wants to meet
- Output: Calendar link, pre-meeting brief, talking points
- Pricing: Enterprise tier only

**Platform Vision:** One login, access to all agents, pay for what you use

---

## 📋 Pre-Build Validation Questions

Before investing 10 weeks building this, validate with Matt & Kyle:

1. **Do they want self-service or done-for-you?**
   - Self-service = build platform (they log in, run agent)
   - Done-for-you = simpler (you run agent weekly, send them results)

2. **How many searches per week do they realistically need?**
   - Affects pricing model and infrastructure scaling

3. **Do they want historical tracking of ALL past outreach, or just current pipeline?**
   - Affects database complexity (archive old leads or keep forever?)

4. **Will they send messages via LinkedIn directly, or want automated sending?**
   - Automated sending = much more complex (LinkedIn API restrictions)

5. **Do they want this JUST for LinkedIn, or also email outreach?**
   - Email = need email sending integration (SendGrid, Gmail API)

6. **Are they willing to pay $299/mo per user?**
   - If not, what's their budget?

7. **Do they want other agents (content, scheduling) or just lead gen for now?**
   - Affects platform architecture (single-agent vs multi-agent)

---

## 💡 Recommended Next Steps

### **Option A: Validate with Matt & Kyle First (Recommended)**
1. Show them this roadmap
2. Walk through the web dashboard mockup (use Figma or draw it out)
3. Ask the 7 validation questions above
4. Get their commitment to pilot at $299/mo
5. **THEN** start building

**Why:** Don't build a platform they won't use or pay for

---

### **Option B: Build Agent MVP First**
1. Build the agent logic locally (no web platform yet)
2. Test with real companies they target
3. Show them results via Google Sheet
4. Get feedback on quality (fit scores, messages)
5. **THEN** build platform around validated agent

**Why:** Validate agent quality before investing in infrastructure

---

### **Option C: Present to Colleague for Technical Review**
1. Share this roadmap document
2. Get feedback on:
   - Technical architecture (any red flags?)
   - Timeline realistic? (10 weeks achievable?)
   - Pricing model (too high? too low?)
   - Scalability concerns (database choice, hosting, etc.)
3. Iterate on roadmap based on feedback
4. **THEN** validate with Matt & Kyle

**Why:** Get expert opinion before committing to approach

---

## 📞 Contact & Resources

**Client:** Matt Williams & Kyle
**Company:** Refined Wealth Management
**Industry:** Financial advisory (oil & gas specialists)
**Location:** Utah (clients in TX oil country)

**Existing Project:**
- Google Sheet: [Matt-Kyle-LinkedIn-Leads-2026](https://docs.google.com/spreadsheets/d/1A-uhmnRHsTyyPDqNH2r5EPdxO1O_ZqiofHiFFE9ifRI/edit)
- Demo: `Deliverables/demo-with-search.html`
- Test Data: `Data/prospects-to-import.csv`

**Tech Stack Resources:**
- Claude API: https://docs.anthropic.com/
- Apify: https://console.apify.com/
- Next.js: https://nextjs.org/
- Stripe: https://stripe.com/docs
- OttoKit MCP: Already configured and working

---

## ✅ Success Metrics

**For Matt & Kyle:**
- Find 20 qualified prospects/day (vs 8-10 hours manual work)
- Cost <$300/month (vs $500+ for Hummingbird)
- Time investment <1 hour/week (vs 8-10 hours)
- Higher quality leads (8+ fit score avg)

**For Platform Business:**
- 2 paying users by Month 1 (Matt & Kyle)
- 10 paying users by Month 6 (other financial advisors)
- 50 paying users by Month 12 (expand to other industries)
- $15k MRR by Month 12

---

**Status:** 📋 Planning & Validation Phase
**Next Action:** Present to colleague for technical review, then validate with Matt & Kyle
**Last Updated:** 2026-01-17
