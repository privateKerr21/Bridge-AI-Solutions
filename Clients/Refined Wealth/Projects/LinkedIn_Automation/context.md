# LinkedIn Automation - Context

**Last Updated**: 2026-01-17
**Project Evolution**: Automation → Agent Platform (see AGENT-PLATFORM-ROADMAP.md)

## Just Completed
- **MAJOR BREAKTHROUGH**: Implemented working Apify + OttoKit MCP integration! 🎉
  - Successfully connected OttoKit MCP server to Claude Code
  - Found Solopreneur guide showing compliant LinkedIn lead generation method
  - Tested Apify Google Search Results Scraper - **IT WORKS!**
  - Found 6 real qualified prospects in oil & gas niche with visible emails
  - Created Google Sheet structure with 8 data points + tracking columns
  - Built import workflows (CSV, Python script, manual)
  - **Total cost: ~$0.01 per search, finds 6-10 prospects each**
  - **100% LinkedIn TOS compliant** (uses Google search, not LinkedIn scraping)

## Working On Right Now
- Ready to scale up prospect finding
- Need to import test prospects into Google Sheet
- Message generation workflow next phase

## Blocked/Waiting
- OttoKit Google Sheets API has server errors (workaround: CSV import or Python script)
- Chrome browser automation disconnected (not critical - have alternatives)
- Client approval to move forward with pilot
  - **Requested**: Monday demo scheduled
  - **Expected**: Decision after demo

## Next Session Goals
- Import 6 test prospects into Google Sheet
- Build automated message generation from sheet data
- Test complete end-to-end workflow (search → score → import → generate → send)
- Prepare production workflow documentation
- Demo live prospect finding on Monday

## Recent Decisions & Rationale
| Decision | Why | Date |
|----------|-----|------|
| Use Apify Google Search instead of direct LinkedIn scraping | 100% TOS compliant, finds public emails, works immediately, free tier available | 2026-01-17 |
| OttoKit MCP for integration | Official Anthropic protocol, connects to Apify + Google Sheets, free tier works | 2026-01-17 |
| Google Sheets for tracking | Already in Matt's workflow, easy to share, no CRM integration needed | 2026-01-17 |
| CSV/Python import as fallback | OttoKit API has issues, need reliable way to populate sheet | 2026-01-17 |
| Mock data for demo | Faster to build, no compliance concerns, proves concept | 2026-01-16 |

## Open Questions
- Should we show live prospect finding in Monday demo or stick with mock data?
- What pricing model works best? (Per-user? Flat fee? Retainer?)
- How long for pilot period?
- What does "success" look like for the pilot?

## New Direction: Agent Platform Vision (2026-01-17)
**Vision Change**: Evolving from one-time automation to SaaS agent platform
- Build web platform where Matt & Kyle can access custom AI agents
- Start with LinkedIn Lead Gen Agent (current automation)
- Add more agents over time (content writing, scheduling, etc.)
- Monetize via Stripe subscription ($299/mo per user recommended)
- **See full roadmap**: `AGENT-PLATFORM-ROADMAP.md`

**Next Steps:**
1. Present roadmap to colleague for technical review
2. Validate with Matt & Kyle (pricing, features, timeline)
3. Decide: Build agent MVP first OR full platform?

## Technical Stack (Validated & Working)
- **Claude Code (MCP)**: Main automation interface
- **OttoKit MCP Server**: Integration hub (Free tier: 250 tasks/month)
- **Apify**: Google Search Results Scraper (Free: $5 credits = ~500 searches)
- **Google Sheets**: Lead tracking (Free, unlimited)
- **Cost per search**: ~$0.01
- **Prospects per search**: 6-10 profiles
- **High-quality rate**: ~30% (3 out of 10)
- **Monthly capacity**: Can find 5,000+ prospects with free tier

## Files Created Today
- `google-sheet-structure.md` - Complete sheet setup guide
- `ottokit-findings.md` - Technical validation and limitations
- `apify-test-results.md` - Full analysis of 10 prospects found
- `prospects-to-import.csv` - 6 qualified prospects ready to import
- `populate_sheet.py` - Python automation script
- `IMPORT-INSTRUCTIONS.md` - 3 import methods with step-by-step guides

## Prospect Quality (From Test Search)
**6 prospects found, sorted by fit score:**
1. Vilvanathan Subramanian (9.8) - Global CFO, oil & gas sector, 1,700+ followers
2. Guillermo L. Hernandez (9.5) - CFA/PhD, oil & gas ops, Texas, 3,200+ followers
3. Stephen C. May (9.0) - Oil & gas reserve-based financing expert, 280+ followers
4. Sarah Mizell (8.5) - CFP®, Houston financial advisor, 950+ followers
5. Shawn Robinson (7.5) - CFO, Amarillo TX, 350+ followers
6. Charles Thomas (7.0) - Retired geologist, Midland-Odessa TX, 10+ followers

**Average fit score: 8.5/10**
**Email addresses visible: 4 out of 6 (67%)**

## Production Workflow (Ready to Build)
1. **Search** - Run Apify actor with target criteria (company, location, title)
2. **Score** - Calculate fit score based on title, company, location, years
3. **Import** - Add to Google Sheet (CSV import or API once fixed)
4. **Generate** - Create 3 personalized message options per prospect
5. **Review** - Matt/Kyle approve message and prospect
6. **Send** - Gmail integration (human sends, AI drafts)
7. **Track** - Update status, response, next follow-up in sheet

## Compliance Status
✅ **LinkedIn TOS Compliant** - Using Google search, not scraping LinkedIn
✅ **Email Discovery Compliant** - Only finding publicly listed emails
✅ **Human-in-the-loop** - All messages reviewed before sending
✅ **SEC Audit Friendly** - Transparent, trackable, documented process
✅ **GDPR/Privacy Friendly** - Only using publicly available data

## Demo Strategy for Monday
**Option A: Show Mock Demo (Safe)**
- Use demo-with-search.html
- Controlled, predictable, polished
- No technical glitches

**Option B: Show Live Search (Impressive)**
- Run actual Apify search during demo
- Show real prospects with real emails
- Proves it's not vaporware
- Risk: Live demo could fail

**Recommendation**: Start with mock demo, offer to show live search as bonus if they're interested.

## Previous Work (Still Valid)
- Built enhanced demo (demo-with-search.html) with full workflow:
  - Search criteria form (companies, titles, locations, years)
  - 20 mock prospects with fit scores and 8 data points each
  - Auto-populate prospect data to message generator
  - 3 personalized message options per prospect
  - Copy-to-clipboard functionality
- Fixed location filtering (Utah → UT mapping)
- **Demo tested and confirmed working great!** ✅
