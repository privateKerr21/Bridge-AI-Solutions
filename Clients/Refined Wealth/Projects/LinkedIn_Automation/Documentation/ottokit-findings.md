# OttoKit MCP Integration - Findings & Limitations

**Date:** 2026-01-17
**Testing Session:** Initial setup and validation

---

## ✅ What Works

### Connection & Authentication
- ✅ OttoKit MCP server connects successfully via `.mcp.json` configuration
- ✅ User profile retrieval working (h.kerr711@gmail.com)
- ✅ Account status: Free tier with 250 tasks available
- ✅ Google Sheets integration is connected and authorized

### Available Capabilities
- ✅ Can list Google Spreadsheets from Drive
- ✅ Can create new spreadsheets
- ✅ Can read spreadsheet structure (sheets, columns)
- ✅ Apify integration available for web scraping
- ✅ JSON parser available

---

## ⚠️ Current Limitations

### Google Sheets API Issues
- ❌ `google_sheet_add_user_data` returns "Server Error" when attempting to add rows
- ❌ Complex data structures in worksheet_row parameter cause failures
- ❌ Simplified single-row additions also fail

**Error Message:**
```
Streamable HTTP error: Error POSTing to endpoint: {
    "message": "Server Error"
}
```

### Free Tier Restrictions
- ❌ No delay functionality
- ❌ No conditions or filters
- ❌ No formatter tools
- ❌ No AI agent features
- ❌ No advanced workflow automation
- ❌ Logs only kept for 3 days
- ✅ Basic automations allowed (20 max)
- ✅ Multi-step automations allowed

### Integration Gaps
- Chrome browser automation disconnected (requires desktop extension)
- Gmail integration not yet tested
- No direct LinkedIn scraping tools available (expected - TOS compliance)

---

## 🎯 Recommended Alternative Approach

Given the OttoKit limitations, here's the proposed workflow:

### Option 1: Manual Data Entry + Automation (Immediate)
1. **Search:** Matt/Kyle manually search LinkedIn for prospects
2. **Extract:** Manually copy 8 data points from profiles
3. **Paste:** Add to Google Sheet we created
4. **Automate:** Use OttoKit to trigger message generation from sheet data
5. **Review:** Matt/Kyle review and send messages via Gmail

**Pros:**
- Works with current OttoKit free tier
- Compliant with LinkedIn TOS
- Immediate implementation

**Cons:**
- Still requires manual data entry (doesn't save the 8-10 hrs/week)
- Defeats purpose of automation

---

### Option 2: Apify + Manual Review (Recommended)
1. **Search:** Use Apify's LinkedIn scrapers to find prospects
2. **Extract:** Apify pulls the 8 data points automatically
3. **Review:** Results shown to Matt/Kyle for approval
4. **Import:** Approved prospects added to Google Sheet
5. **Generate:** AI creates personalized messages
6. **Send:** Matt/Kyle review and send via Gmail

**Pros:**
- Automates the data extraction (saves 6-8 hrs/week)
- Human review maintains compliance
- Uses OttoKit's Apify integration

**Cons:**
- Apify may have costs beyond free tier
- LinkedIn scraping still has TOS risks
- Requires Apify account setup

---

### Option 3: Commercial Data Enrichment APIs (Production-Ready)
1. **Search:** Use LinkedIn Sales Navigator or Google to find profile URLs
2. **Enrich:** Send URLs to Apollo.io, ZoomInfo, or Clearbit API
3. **Populate:** Commercial APIs return the 8 data points legally
4. **Track:** Auto-populate Google Sheet
5. **Generate:** AI creates messages
6. **Send:** Gmail integration with approval

**Pros:**
- Fully compliant (no TOS violations)
- Reliable data quality
- SEC audit-friendly for financial advisors
- Professional approach

**Cons:**
- Requires paid API subscriptions
- Higher monthly cost ($50-200/month typical)
- May need upgrade from OttoKit free tier

---

## 🔧 Technical Issues to Resolve

### Immediate
1. Debug OttoKit Google Sheets API error
   - Contact OttoKit support or check documentation
   - Try alternative sheet writing methods
   - Consider upgrading to paid tier

2. Reconnect Chrome browser automation
   - Restart Chrome completely
   - Verify extension is logged in
   - Test browser-based sheet editing

### Before Production
1. Test Apify LinkedIn scraping capabilities
2. Evaluate commercial data enrichment APIs
3. Set up Gmail integration for sending
4. Create message generation templates
5. Build approval workflow for Matt/Kyle

---

## 💰 Cost Analysis

### Current Setup (Free Tier)
- OttoKit: Free (250 tasks/month)
- Google Sheets: Free
- **Total:** $0/month
- **Limitation:** Can't auto-populate sheet data reliably

### Upgrade Option 1: OttoKit Pro
- OttoKit Pro: ~$29-49/month (estimated)
- Unlocks: Conditions, formatters, AI agent, more tasks
- **Total:** $29-49/month
- **Benefit:** May fix API issues, better automation

### Upgrade Option 2: Apify + OttoKit
- OttoKit: Free or Pro
- Apify: $49/month for 100 actor runs
- **Total:** $49-98/month
- **Benefit:** Automated prospect finding

### Production Option: Commercial APIs
- OttoKit Pro: $29-49/month
- Apollo.io or ZoomInfo: $99-199/month
- **Total:** $128-248/month
- **Benefit:** Fully compliant, reliable, professional

---

## 📋 Next Steps

### Immediate Testing
- [ ] Manually add 2-3 test prospects to Google Sheet
- [ ] Verify sheet structure works for Matt/Kyle's workflow
- [ ] Document manual process as fallback

### Decision Needed from Matt/Kyle
- [ ] Which approach to pursue? (Manual, Apify, or Commercial APIs)
- [ ] Budget approval for paid tools
- [ ] Acceptable LinkedIn compliance risk level
- [ ] Timeline expectations for demo vs. production

### Technical Investigation
- [ ] Research OttoKit documentation for sheet API issues
- [ ] Test Apify LinkedIn actors
- [ ] Evaluate Apollo.io and ZoomInfo APIs
- [ ] Build message generation logic

---

## 🎪 Demo Strategy for Monday

### What We CAN Demo
1. ✅ Google Sheet structure with proper tracking columns
2. ✅ Manual prospect entry workflow
3. ✅ (If working) Automated message generation from sheet data
4. ✅ Fit scoring logic
5. ✅ Template message variations

### What We Should MOCK
1. LinkedIn prospect search (show the existing demo-with-search.html)
2. Auto-population of sheet (explain it's in progress)
3. Gmail sending (show manual process for now)

### Honest Approach
- Show the working Google Sheet structure
- Demo the HTML prototype for search/messaging
- Explain the 3 implementation options with pros/cons
- Let Matt/Kyle choose their preferred path forward
- Set realistic timeline based on their choice

**Key Message:** "We've validated the approach and built the infrastructure. Now we need to choose between speed (riskier scraping) vs. compliance (commercial APIs)."
