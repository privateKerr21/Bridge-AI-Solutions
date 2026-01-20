# Next Steps: Refined Wealth Demo Enhancement

## Status: Ready for Weekend Build

**Current State:**
- ✅ Proposal landing page complete (`index.html`)
- ✅ Google Colab message generator working (9 cells)
- ✅ Interactive HTML demo created (`demo.html`)
- ✅ Meeting transcript analyzed
- ✅ Client priorities identified (LinkedIn automation #1)

**Next Build:** LinkedIn Search + Auto-populate Demo

---

## Weekend Build Plan: LinkedIn Search Feature

### Goal
Add prospect search capability to `demo.html` that:
1. Shows search criteria form (companies, titles, location, years)
2. "Finds" 20 realistic prospects (AI-generated mock data)
3. Displays scored/prioritized prospect list
4. Click prospect → auto-fills message generator
5. Complete end-to-end workflow in one page

### Time Estimate
**Option A (Simple Mock):** 30 minutes
**Option B (AI-Generated Mock):** 45 minutes
**Option C (Full Featured - RECOMMENDED):** 1-2 hours

---

## Option C Build Checklist (Full Featured)

### Part 1: UI Structure (20 min)
- [ ] Add tabbed interface (Find Prospects | Generate Messages)
- [ ] Create search criteria form with checkboxes
- [ ] Design prospect results table layout
- [ ] Style priority indicators (green/yellow/white for scores)

### Part 2: Mock Data Generation (25 min)
- [ ] Create function to generate realistic prospect profiles
- [ ] Use Claude API to generate 20 prospects based on criteria
- [ ] Include: name, title, company, location, years, score, reasoning
- [ ] Store in JavaScript array for quick access

### Part 3: Search Functionality (15 min)
- [ ] "Find Prospects" button triggers generation
- [ ] Show loading state while generating
- [ ] Display results in scored/prioritized groups
- [ ] Add filtering/sorting options (optional)

### Part 4: Auto-populate Integration (15 min)
- [ ] Add "Generate Message" button to each prospect
- [ ] Click → switch to Messages tab
- [ ] Auto-fill form with prospect data
- [ ] Highlight that fields were auto-populated

### Part 5: Polish & Test (15 min)
- [ ] Add smooth transitions between tabs
- [ ] Test full workflow end-to-end
- [ ] Mobile responsive check
- [ ] Add helpful hints/tooltips
- [ ] Final styling pass

---

## Code Structure Preview

```html
<!-- demo-with-search.html -->

<body>
  <!-- Tab Navigation -->
  <div class="tabs">
    <button class="tab active">Find Prospects</button>
    <button class="tab">Generate Messages</button>
  </div>

  <!-- Tab 1: Find Prospects -->
  <div class="tab-content active">
    <form id="searchCriteria">
      <h3>Search Criteria</h3>

      <div class="checkbox-group">
        <label><input type="checkbox" value="Chevron"> Chevron</label>
        <label><input type="checkbox" value="Marathon"> Marathon Petroleum</label>
        <label><input type="checkbox" value="HF Sinclair"> HF Sinclair</label>
      </div>

      <div class="checkbox-group">
        <label><input type="checkbox" value="Engineer"> Engineer</label>
        <label><input type="checkbox" value="Manager"> Manager</label>
        <label><input type="checkbox" value="Supervisor"> Supervisor</label>
      </div>

      <button type="submit">🔍 Find 20 Prospects</button>
    </form>

    <div id="results" class="hidden">
      <!-- Prospect list gets generated here -->
    </div>
  </div>

  <!-- Tab 2: Generate Messages -->
  <div class="tab-content">
    <!-- Existing message form from demo.html -->
  </div>

  <script>
    // Tab switching logic
    // Search functionality
    // Prospect generation (AI or mock)
    // Auto-populate message form
  </script>
</body>
```

---

## Sample Prospect Data Structure

```javascript
const prospects = [
  {
    name: "Sarah Johnson",
    title: "Senior Process Engineer",
    company: "Chevron",
    location: "Salt Lake City, UT",
    years: 18,
    score: 9.5,
    reasoning: "Perfect company match, senior role, Utah location, excellent tenure",
    linkedinUrl: "linkedin.com/in/sarah-johnson-chevron"
  },
  // ... 19 more
];
```

---

## Mock vs. Real Data Decision

### Use Mock Data If:
- ✅ Demo is Monday (2 days away)
- ✅ Want zero technical risk
- ✅ Focus is on showing the workflow/concept
- ✅ LinkedIn scraping compliance is a concern

### Use Real LinkedIn Scraping If:
- ✅ Have 1+ week before demo
- ✅ Client specifically asks for "real data"
- ✅ Willing to manage API keys/tools (Phantombuster, etc.)
- ✅ Have compliance approval for scraping

**Recommendation for Monday demo: MOCK DATA**

---

## Alternative: Two-File Approach

Instead of one complex file, create:

1. **demo.html** (current - message generator only)
2. **demo-search.html** (new - search + message generator combined)

**Benefit:** Keep simple demo intact as backup if complex version has issues

---

## Files to Create

When ready to build, you'll create:

```
clients/Refined Wealth/
  demo-with-search.html    # Full featured version
  demo.html                # Original (keep as backup)
  mock-prospects.json      # Optional: Pre-generated prospect data
```

---

## Demo Script for Monday

**If you build the search feature:**

```
"Matt, let me show you the complete workflow.

[Tab 1: Find Prospects]
Here's where you'd set your search criteria. Your target companies,
roles you're looking for, location preferences, minimum tenure.

[Click Find Prospects]
The system searches LinkedIn—well, in this demo it's generating
mock data, but the real system would scrape LinkedIn—and returns
20 prospects scored by fit.

[Results appear]
See how they're prioritized? Sarah Johnson scores 9.5 because she's
senior role, Chevron, Utah location, 18 years tenure. Robert Thompson
is 9.8—plant manager, approaching retirement age.

[Click 'Generate Message' on Sarah]
When you click on a prospect, it auto-fills the message generator.

[Tab switches, form populates]
Now you're in the message tab with Sarah's info already loaded.

[Click Generate]
Five seconds later, you have 3 personalized messages ready to send.

Total time: Less than a minute to go from 'I need prospects' to
'I have messages ready to send.'

Compare that to your current process: 1-2 hours searching LinkedIn,
then 10 minutes per message crafting. This is 50-100x faster."
```

---

## Monday Presentation Strategy

**If you DON'T build the search feature:**

Show existing demo.html and explain:
> "This is the message generator working. The full Phase 1 system
> would also include the prospect search and auto-population I showed
> in the mockup. But I wanted you to see the AI actually working first."

**If you DO build the search feature:**

Lead with the complete workflow:
> "I built a prototype of the complete workflow this weekend. Let me
> show you prospect search to message generation in under a minute."

---

## Resources You'll Need

**For Mock Data:**
- Claude API key (already have)
- 30-60 minutes of build time
- Sample prospect names/companies (can generate)

**For Real Data (future):**
- Phantombuster account (~$30/mo)
- LinkedIn Sales Navigator (optional, $80/mo)
- 2-3 hours setup + testing
- Compliance review

---

## Decision Point

**Before you start building, decide:**

**Path A: Ship What You Have**
- Use existing demo.html
- Explain search feature verbally with mockup
- Build it after Matt approves pilot

**Path B: Build Search Feature (Recommended)**
- Invest 1-2 hours this weekend
- Show complete end-to-end workflow
- Much higher demo impact
- Slight risk of technical issues

**My recommendation: Path B if you have 1-2 hours Saturday or Sunday**

---

## When to Build

**Saturday Afternoon (Recommended):**
- Build core functionality (1 hour)
- Test thoroughly (30 min)
- Polish (30 min)
- **Sunday:** Practice demo, relax

**Sunday (If Saturday busy):**
- Morning: Build (1.5 hours)
- Afternoon: Test & polish (30 min)
- Evening: Practice demo

**Monday Morning (Not Recommended):**
- Too risky
- Use existing demo.html instead

---

## Post-Meeting: Next Iteration

After Monday's meeting with Matt:

**If he approves pilot:**
- [ ] Finalize pricing based on his feedback
- [ ] Create detailed SOW with milestones
- [ ] Build out final-proposal.html with pricing
- [ ] Send proposal within 3-5 days

**For the real system (Phase 1 build):**
- [ ] Set up production API keys (not demo keys)
- [ ] Build backend to hide API keys
- [ ] Integrate with actual LinkedIn (compliance-safe approach)
- [ ] Connect to their CRM (Advyzon or Excel)
- [ ] Add follow-up sequencing logic
- [ ] Build compliance review workflow
- [ ] User testing with Matt & Kyle
- [ ] Training sessions
- [ ] Go live

---

## Quick Wins to Mention

Even without building the search feature, you can describe these in the proposal:

**Phase 1 Enhancements (after pilot approved):**
- Real-time LinkedIn connection monitoring
- Auto-extract 8 data points when connections accept
- Smart prospect scoring (AI analyzes fit)
- Automated follow-up reminders by stage
- Integration with existing Excel tracking
- Daily digest emails: "5 prospects need attention today"
- Compliance-safe message templates
- Multi-user support (Matt + Kyle)

**Phase 2 (Future):**
- Drip campaign sequences (6 month aggressive → long-term nurture)
- Content generation for newsletters
- SEO content system
- Website optimization
- Employer-specific landing pages
- Video script generation

---

## Contact Before Building

**If you want help with any of these:**
- Code review before demo
- Debugging if you get stuck
- Pricing strategy refinement
- Demo script practice
- Post-meeting proposal writing

Just ask. I'm invested in this working out for you.

---

**Good luck with Monday! You've got this. 🚀**

*Last updated: January 18, 2026*
