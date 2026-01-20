# Google Sheet Structure for LinkedIn Lead Tracking

**Spreadsheet Name:** Matt-Kyle-LinkedIn-Leads-2026
**Spreadsheet URL:** https://docs.google.com/spreadsheets/d/1A-uhmnRHsTyyPDqNH2r5EPdxO1O_ZqiofHiFFE9ifRI/edit
**Spreadsheet ID:** 1A-uhmnRHsTyyPDqNH2r5EPdxO1O_ZqiofHiFFE9ifRI

---

## 8 Core Data Points (From Matt & Kyle's Demo)

These are the key fields extracted from LinkedIn profiles:

| Column | Header | Description | Example |
|--------|---------|-------------|---------|
| A | **Name** | Full name of prospect | Robert Thompson |
| B | **Title** | Current job title/position | Plant Manager |
| C | **Company** | Current employer | Marathon Petroleum |
| D | **Location** | Geographic location | Salt Lake City, UT |
| E | **Years** | Years of service in industry | 28 |
| F | **Email** | Contact email address | rthompson@marathonpetroleum.com |
| G | **Phone** | Phone number | (801) 555-0142 |
| H | **LinkedIn URL** | LinkedIn profile link | linkedin.com/in/robert-thompson-marathon |

---

## Additional Tracking Columns (Recommended)

Add these columns to track outreach and qualification:

| Column | Header | Description | Example Values |
|--------|---------|-------------|----------------|
| I | **Fit Score** | AI-calculated fit score (0-10) | 9.8 |
| J | **Reasoning** | Why this prospect is a good fit | "Senior leadership, approaching retirement, Utah location" |
| K | **Status** | Current lead status | New, Contacted, Responded, Qualified, Client, Not Interested |
| L | **Date Found** | When prospect was discovered | 2026-01-17 |
| M | **Date Contacted** | When first outreach was sent | 2026-01-18 |
| N | **Message Sent** | Which message variation was used | Option 1, Option 2, Option 3 |
| O | **Response Received** | Did they respond? | Yes, No, Pending |
| P | **Next Follow-Up** | Date for next touchpoint | 2026-01-21 |
| Q | **Notes** | Additional context or observations | "Mentioned retiring in 2 years" |

---

## Setup Instructions

1. Open the spreadsheet: https://docs.google.com/spreadsheets/d/1A-uhmnRHsTyyPDqNH2r5EPdxO1O_ZqiofHiFFE9ifRI/edit

2. In Row 1, add these headers:
   - A1: Name
   - B1: Title
   - C1: Company
   - D1: Location
   - E1: Years
   - F1: Email
   - G1: Phone
   - H1: LinkedIn URL
   - I1: Fit Score
   - J1: Reasoning
   - K1: Status
   - L1: Date Found
   - M1: Date Contacted
   - N1: Message Sent
   - O1: Response Received
   - P1: Next Follow-Up
   - Q1: Notes

3. Format Row 1 as a header:
   - Bold text
   - Background color: #0f4c5c (Refined Wealth teal)
   - Text color: White
   - Freeze Row 1 (View → Freeze → 1 row)

4. Set column widths:
   - Name, Company, Location: 150px
   - Title: 180px
   - Years, Fit Score: 80px
   - Email: 220px
   - Phone: 130px
   - LinkedIn URL: 280px
   - All tracking columns: 120px

---

## Data Validation Rules (Optional)

**Status Column (K):**
- Dropdown with values: New, Contacted, Responded, Qualified, Client, Not Interested

**Fit Score Column (I):**
- Number range: 0 to 10
- Format: One decimal place

**Date Columns (L, M, P):**
- Format: MM/DD/YYYY

**Response Received Column (O):**
- Dropdown with values: Yes, No, Pending

---

## Usage Notes

- **Automated Population**: OttoKit will populate columns A-J automatically when prospects are found
- **Manual Updates**: Matt/Kyle update columns K-Q as they work through leads
- **Sorting**: Sort by Fit Score (descending) to prioritize best prospects
- **Filtering**: Filter by Status to see pipeline stages
- **Follow-ups**: Use conditional formatting on "Next Follow-Up" to highlight overdue tasks
