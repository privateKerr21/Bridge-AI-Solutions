"""
Google Sheets Population Script
Populates Matt-Kyle-LinkedIn-Leads-2026 sheet with prospect data

Requirements:
    pip install gspread oauth2client

Setup:
    1. Enable Google Sheets API: https://console.cloud.google.com/
    2. Create OAuth credentials and download as 'credentials.json'
    3. Run this script - it will open browser for authorization
"""

import gspread
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime

# Google Sheet ID
SHEET_ID = "1A-uhmnRHsTyyPDqNH2r5EPdxO1O_ZqiofHiFFE9ifRI"

# Prospect data from Apify search results
PROSPECTS = [
    {
        "Name": "Guillermo L. Hernandez (CFA, PhD)",
        "Title": "Senior Investment Analyst",
        "Company": "Puma Energy",
        "Location": "Texas",
        "Years": "15+",
        "Email": "Check profile - gmail.com",
        "Phone": "TBD",
        "LinkedIn URL": "https://www.linkedin.com/in/guille990",
        "Fit Score": 9.5,
        "Reasoning": "CFA, PhD, oil and gas operations expertise, Texas location, advanced data analysis skills",
        "Status": "New",
        "Date Found": "2026-01-17",
        "Date Contacted": "",
        "Message Sent": "",
        "Response Received": "",
        "Next Follow-Up": "",
        "Notes": "3200+ followers"
    },
    {
        "Name": "Vilvanathan Subramanian",
        "Title": "Global CFO | Strategic Finance",
        "Company": "Oil & Gas Company (TBD)",
        "Location": "International (AE domain)",
        "Years": "20+",
        "Email": "Check profile",
        "Phone": "TBD",
        "LinkedIn URL": "https://ae.linkedin.com/in/vilva-nathan",
        "Fit Score": 9.8,
        "Reasoning": "Global CFO level, proven track record in oil and gas sector, strategic finance expertise",
        "Status": "New",
        "Date Found": "2026-01-17",
        "Date Contacted": "",
        "Message Sent": "",
        "Response Received": "",
        "Next Follow-Up": "",
        "Notes": "1700+ followers - senior executive level"
    },
    {
        "Name": "Stephen C. May",
        "Title": "Transactional Finance Executive",
        "Company": "PPL Corporation",
        "Location": "Greater Richmond Region",
        "Years": "25+",
        "Email": "Check profile - gmail.com",
        "Phone": "TBD",
        "LinkedIn URL": "https://www.linkedin.com/in/scmay41",
        "Fit Score": 9.0,
        "Reasoning": "Oil and gas reserve-based financings expertise, Westinghouse Electric background",
        "Status": "New",
        "Date Found": "2026-01-17",
        "Date Contacted": "",
        "Message Sent": "",
        "Response Received": "",
        "Next Follow-Up": "",
        "Notes": "280+ followers"
    },
    {
        "Name": "Sarah Mizell (CFP®)",
        "Title": "President, Senior Financial Advisor",
        "Company": "Cove Wealth Management",
        "Location": "Houston, Texas",
        "Years": "15+",
        "Email": "Check profile",
        "Phone": "TBD",
        "LinkedIn URL": "https://www.linkedin.com/in/sarahmizell",
        "Fit Score": 8.5,
        "Reasoning": "CFP certified, Houston oil & gas hub, senior advisor, Rice University education",
        "Status": "New",
        "Date Found": "2026-01-17",
        "Date Contacted": "",
        "Message Sent": "",
        "Response Received": "",
        "Next Follow-Up": "",
        "Notes": "950+ followers"
    },
    {
        "Name": "Shawn Robinson",
        "Title": "Chief Financial and Operating Officer",
        "Company": "Estacar Companies",
        "Location": "Amarillo, Texas",
        "Years": "20+",
        "Email": "Check profile - gmail.com",
        "Phone": "TBD",
        "LinkedIn URL": "https://www.linkedin.com/in/sshawnrobinson",
        "Fit Score": 7.5,
        "Reasoning": "CFO level executive, Texas location, West Texas A&M University",
        "Status": "New",
        "Date Found": "2026-01-17",
        "Date Contacted": "",
        "Message Sent": "",
        "Response Received": "",
        "Next Follow-Up": "",
        "Notes": "350+ followers"
    },
    {
        "Name": "Charles Thomas",
        "Title": "Geological Consultant",
        "Company": "Retired",
        "Location": "Midland-Odessa, Texas",
        "Years": "30+",
        "Email": "8chthomas@gmail.com",
        "Phone": "TBD",
        "LinkedIn URL": "https://www.linkedin.com/in/charles-thomas-673a1a167",
        "Fit Score": 7.0,
        "Reasoning": "Retired, Midland-Odessa oil country location, geological background - may have referral network",
        "Status": "New",
        "Date Found": "2026-01-17",
        "Date Contacted": "",
        "Message Sent": "",
        "Response Received": "",
        "Next Follow-Up": "",
        "Notes": "10+ followers - retired but well-connected in oil country"
    }
]


def populate_sheet():
    """Populate Google Sheet with prospect data"""

    # Define the scope
    scope = [
        'https://spreadsheets.google.com/feeds',
        'https://www.googleapis.com/auth/drive'
    ]

    # Add credentials to the account
    creds = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)

    # Authorize the clientsheet
    client = gspread.authorize(creds)

    # Get the sheet
    sheet = client.open_by_key(SHEET_ID).sheet1

    print(f"Connected to sheet: {sheet.title}")
    print(f"Adding {len(PROSPECTS)} prospects...")

    # Add each prospect
    for i, prospect in enumerate(PROSPECTS, start=2):  # Start at row 2 (row 1 is headers)
        row_data = [
            prospect["Name"],
            prospect["Title"],
            prospect["Company"],
            prospect["Location"],
            prospect["Years"],
            prospect["Email"],
            prospect["Phone"],
            prospect["LinkedIn URL"],
            prospect["Fit Score"],
            prospect["Reasoning"],
            prospect["Status"],
            prospect["Date Found"],
            prospect["Date Contacted"],
            prospect["Message Sent"],
            prospect["Response Received"],
            prospect["Next Follow-Up"],
            prospect["Notes"]
        ]

        # Update the row
        sheet.insert_row(row_data, i)
        print(f"✓ Added: {prospect['Name']} (Fit Score: {prospect['Fit Score']})")

    print(f"\n✅ Successfully added {len(PROSPECTS)} prospects to the sheet!")
    print(f"View at: https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit")


if __name__ == "__main__":
    try:
        populate_sheet()
    except FileNotFoundError:
        print("❌ Error: credentials.json not found")
        print("\nSetup instructions:")
        print("1. Go to: https://console.cloud.google.com/")
        print("2. Create a project and enable Google Sheets API")
        print("3. Create Service Account credentials")
        print("4. Download credentials as 'credentials.json'")
        print("5. Place in same directory as this script")
        print("6. Share the Google Sheet with the service account email")
    except Exception as e:
        print(f"❌ Error: {e}")
