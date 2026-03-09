/**
 * LinkedIn Lead Follow-Up Email Automation
 * Refined Wealth Management - Matt & Kyle
 *
 * This script runs daily and sends personalized email digests
 * for prospects needing follow-up at different timelines.
 *
 * Timeline triggers:
 * - Day 3: Initial follow-up
 * - Day 14: Week 2 check-in
 * - Day 180: Month 6 re-engagement
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  // Email recipients
  recipients: {
    matt: "matt@refinedwealth.com", // Replace with actual email
    kyle: "kyle@refinedwealth.com"  // Replace with actual email
  },

  // Follow-up timelines (in days)
  timelines: {
    day3: 3,
    week2: 14,
    month6: 180
  },

  // Sheet configuration
  sheetName: "Leads", // Name of the worksheet with lead data
  spreadsheetId: "1A-uhmnRHsTyyPDqNH2r5EPdxO1O_ZqiofHiFFE9ifRI",

  // Column mapping (adjust if your columns differ)
  columns: {
    name: 0,           // Column A
    title: 1,          // Column B
    company: 2,        // Column C
    location: 3,       // Column D
    years: 4,          // Column E
    email: 5,          // Column F
    phone: 6,          // Column G
    linkedinUrl: 7,    // Column H
    fitScore: 8,       // Column I
    reasoning: 9,      // Column J
    status: 10,        // Column K
    dateFound: 11,     // Column L
    dateContacted: 12, // Column M
    messageSent: 13,   // Column N
    responseReceived: 14, // Column O
    nextFollowUp: 15,  // Column P
    notes: 16,         // Column Q
    assignedTo: 17     // Column R (optional - track Matt vs Kyle)
  },

  // Timezone
  timezone: "America/Denver" // Mountain Time for Utah
};

// ============================================================================
// MAIN FUNCTION - Run Daily via Trigger
// ============================================================================

function sendDailyFollowUpEmails() {
  const sheet = SpreadsheetApp.openById(CONFIG.spreadsheetId).getSheetByName(CONFIG.sheetName);
  const data = sheet.getDataRange().getValues();

  // Skip header row
  const leads = data.slice(1);

  // Get today's date at midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Categorize leads by follow-up timeline
  const followUps = {
    day3: [],
    week2: [],
    month6: []
  };

  leads.forEach((row, index) => {
    const status = row[CONFIG.columns.status];
    const dateContacted = row[CONFIG.columns.dateContacted];
    const responseReceived = row[CONFIG.columns.responseReceived];

    // Skip if no contact date or already responded
    if (!dateContacted || responseReceived === "Yes") return;

    // Skip if status is Client or Not Interested
    if (status === "Client" || status === "Not Interested") return;

    // Calculate days since contact
    const contactDate = new Date(dateContacted);
    contactDate.setHours(0, 0, 0, 0);
    const daysSince = Math.floor((today - contactDate) / (1000 * 60 * 60 * 24));

    // Categorize by timeline
    const leadData = {
      row: index + 2, // +2 because: +1 for header, +1 for 0-indexing
      name: row[CONFIG.columns.name],
      title: row[CONFIG.columns.title],
      company: row[CONFIG.columns.company],
      location: row[CONFIG.columns.location],
      fitScore: row[CONFIG.columns.fitScore],
      status: status,
      dateContacted: formatDate(contactDate),
      daysSince: daysSince,
      linkedinUrl: row[CONFIG.columns.linkedinUrl],
      reasoning: row[CONFIG.columns.reasoning]
    };

    if (daysSince === CONFIG.timelines.day3) {
      followUps.day3.push(leadData);
    } else if (daysSince === CONFIG.timelines.week2) {
      followUps.week2.push(leadData);
    } else if (daysSince === CONFIG.timelines.month6) {
      followUps.month6.push(leadData);
    }
  });

  // Send emails to Matt and Kyle if there are follow-ups
  const totalFollowUps = followUps.day3.length + followUps.week2.length + followUps.month6.length;

  if (totalFollowUps > 0) {
    sendEmailToRecipient(CONFIG.recipients.matt, "Matt", followUps, totalFollowUps);
    sendEmailToRecipient(CONFIG.recipients.kyle, "Kyle", followUps, totalFollowUps);

    Logger.log(`Sent follow-up emails: ${totalFollowUps} total prospects`);
  } else {
    Logger.log("No follow-ups due today");
  }
}

// ============================================================================
// EMAIL COMPOSITION
// ============================================================================

function sendEmailToRecipient(email, name, followUps, totalCount) {
  const subject = `LinkedIn Follow-Ups Due - ${formatDate(new Date())} (${totalCount} prospects)`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: #0f4c5c; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .section { background: #f9f9f9; padding: 20px; margin-bottom: 20px; border-left: 4px solid #0f4c5c; }
        .section-header { font-size: 18px; font-weight: bold; margin-bottom: 15px; display: flex; align-items: center; }
        .emoji { margin-right: 10px; font-size: 24px; }
        .prospect { background: white; padding: 15px; margin-bottom: 15px; border-radius: 6px; border: 1px solid #e0e0e0; }
        .prospect-name { font-size: 16px; font-weight: bold; color: #0f4c5c; }
        .prospect-info { color: #666; font-size: 14px; margin: 5px 0; }
        .fit-score { display: inline-block; background: #4CAF50; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; }
        .fit-score.high { background: #4CAF50; }
        .fit-score.medium { background: #FF9800; }
        .fit-score.low { background: #f44336; }
        .message-suggestion { background: #e3f2fd; padding: 12px; margin-top: 10px; border-radius: 4px; font-style: italic; color: #1976d2; }
        .action-links { margin-top: 10px; }
        .btn { display: inline-block; padding: 8px 16px; background: #0f4c5c; color: white; text-decoration: none; border-radius: 4px; font-size: 13px; margin-right: 10px; }
        .summary { background: #fff3cd; padding: 15px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #ffc107; }
        .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>LinkedIn Follow-Ups Due</h1>
          <p style="margin: 5px 0 0 0;">Hi ${name}, you have ${totalCount} prospects needing follow-up today.</p>
        </div>

        <div class="summary">
          <strong>📊 Today's Follow-Up Summary:</strong><br>
          🔴 Day 3 Follow-Ups: ${followUps.day3.length}<br>
          🟡 Week 2 Check-Ins: ${followUps.week2.length}<br>
          🔵 Month 6 Re-Engagements: ${followUps.month6.length}
        </div>

        ${generateSectionHtml("🔴 DAY 3 FOLLOW-UPS", followUps.day3, "Initial contact sent 3 days ago - time for first follow-up")}
        ${generateSectionHtml("🟡 WEEK 2 CHECK-INS", followUps.week2, "Contacted 2 weeks ago - check-in to maintain warmth")}
        ${generateSectionHtml("🔵 MONTH 6 RE-ENGAGEMENTS", followUps.month6, "Long-dormant prospects - opportunity to re-engage")}

        <div class="footer">
          <p>This is an automated reminder from your LinkedIn Lead Tracking System.<br>
          <a href="https://docs.google.com/spreadsheets/d/${CONFIG.spreadsheetId}/edit" style="color: #0f4c5c;">View Full Lead Sheet</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: htmlBody
  });
}

function generateSectionHtml(title, prospects, description) {
  if (prospects.length === 0) {
    return "";
  }

  let html = `
    <div class="section">
      <div class="section-header">
        <span>${title}</span>
      </div>
      <p style="margin-top: 0; color: #666; font-size: 14px;">${description}</p>
  `;

  prospects.forEach((prospect, index) => {
    const fitScoreClass = prospect.fitScore >= 8 ? "high" : prospect.fitScore >= 6 ? "medium" : "low";
    const messageSuggestion = generateMessageSuggestion(prospect, title);

    html += `
      <div class="prospect">
        <div class="prospect-name">
          ${index + 1}. ${prospect.name}
          <span class="fit-score ${fitScoreClass}">${prospect.fitScore} fit</span>
        </div>
        <div class="prospect-info">
          ${prospect.title} at ${prospect.company} | ${prospect.location}
        </div>
        <div class="prospect-info">
          Contacted: ${prospect.dateContacted} (${prospect.daysSince} days ago) | Status: ${prospect.status}
        </div>
        ${prospect.reasoning ? `<div class="prospect-info" style="font-style: italic;">💡 ${prospect.reasoning}</div>` : ""}

        <div class="message-suggestion">
          <strong>Suggested Message:</strong><br>
          ${messageSuggestion}
        </div>

        <div class="action-links">
          <a href="${prospect.linkedinUrl}" class="btn" target="_blank">View LinkedIn</a>
          <a href="https://docs.google.com/spreadsheets/d/${CONFIG.spreadsheetId}/edit#gid=0&range=A${prospect.row}" class="btn" target="_blank">Update Status</a>
        </div>
      </div>
    `;
  });

  html += `</div>`;

  return html;
}

// ============================================================================
// MESSAGE SUGGESTIONS
// ============================================================================

function generateMessageSuggestion(prospect, timeline) {
  const firstName = prospect.name.split(' ')[0];

  if (timeline.includes("DAY 3")) {
    return `Hi ${firstName}, I wanted to follow up on my connection request from earlier this week. I work with ${prospect.company} professionals on financial planning tailored to oil & gas careers. Would you be open to a brief conversation?`;
  } else if (timeline.includes("WEEK 2")) {
    return `${firstName}, I know you're busy, so I wanted to check in briefly. Many ${prospect.title}s I work with in ${prospect.location} have found value in discussing retirement planning strategies specific to the energy sector. Would this be relevant for you?`;
  } else if (timeline.includes("MONTH 6")) {
    return `Hi ${firstName}, it's been a while since we connected. I wanted to reach out again as I continue working with professionals at ${prospect.company} on financial planning. Has anything changed in your situation where a conversation might be valuable?`;
  }

  return `Hi ${firstName}, following up on my earlier outreach about financial planning for ${prospect.company} professionals.`;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function formatDate(date) {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// ============================================================================
// SETUP FUNCTIONS - Run Once
// ============================================================================

/**
 * Creates a daily trigger at 8 AM Mountain Time
 * Run this function once to set up the automation
 */
function createDailyTrigger() {
  // Delete existing triggers to avoid duplicates
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'sendDailyFollowUpEmails') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create new daily trigger at 8 AM
  ScriptApp.newTrigger('sendDailyFollowUpEmails')
    .timeBased()
    .atHour(8)
    .everyDays(1)
    .inTimezone(CONFIG.timezone)
    .create();

  Logger.log('Daily trigger created: Will run at 8 AM Mountain Time');
}

/**
 * Manual test function - sends emails immediately
 * Use this to test the email format before enabling daily automation
 */
function testEmailNow() {
  Logger.log('Running test email...');
  sendDailyFollowUpEmails();
  Logger.log('Test complete - check email inbox');
}

/**
 * Delete all triggers
 * Run this if you need to disable the automation
 */
function deleteTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'sendDailyFollowUpEmails') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  Logger.log('All triggers deleted');
}
