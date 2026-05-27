/**
 * Generate a sample Shadow Work Audit PDF using realistic mock data.
 *
 * Run: npx tsx scripts/sample-report.ts
 *
 * Output: tmp/sample-report.pdf
 */
import fs from "node:fs";
import path from "node:path";
import { renderReportPdf } from "../lib/pdf";
import type { GeneratedReport } from "../lib/types";

const mock: GeneratedReport = {
  diagnosis: {
    role_summary:
      "Founder of a 12-person marketing agency, mid-build on lead workflow automations",
    shadow_work_areas: ["Sales follow-up", "Client reporting"],
    total_hours_reclaimable: "10–14 hrs/week",
    narrative:
      "Your week is currently absorbing two compounding shadow workflows: lead follow-up that decays the moment your inbox gets noisy, and weekly client reporting that pulls a senior person into spreadsheet copy-paste. Neither is a tooling problem — you already own the tools. The problem is that no one workflow has been engineered end-to-end. The follow-up cadence dies because you're the bottleneck on approving sends; the reporting dies because the data lives in four places and assembly is manual. Both are the kind of work that AI is good at when it's scoped to your specific inputs, and bad at when bolted on as a generic assistant.",
  },
  opportunity_matrix: [
    {
      workflow_name: "Sales follow-up & lead qualification",
      problem_or_goal:
        "Inbound leads sit untouched for 24–72 hrs because no one owns the follow-up cadence. By the time a human responds, the lead has gone cold or chosen a faster competitor.",
      proposed_solution:
        "AI-drafted follow-up sequences keyed to lead source and stated intent, queued in a human-approval inbox. You review and approve in 60 seconds per lead instead of writing from scratch.",
      action_category: "Augment",
      impact: "5–7 hrs/week reclaimed; faster time-to-first-response on inbound",
    },
    {
      workflow_name: "Weekly client reporting",
      problem_or_goal:
        "A senior team member spends ~1 day per week assembling client-facing reports from GA4, ad platforms, and a CRM. Reports are inconsistent and the team member is your highest-cost capacity.",
      proposed_solution:
        "Scheduled pipeline that pulls each client's data into a templated narrative report. AI writes the commentary; a human approves before send.",
      action_category: "Automate",
      impact: "5–7 hrs/week reclaimed; consistent client-facing artifact",
    },
  ],
  next_steps: {
    recommended_first_build: "Lead follow-up approval inbox (the sales workflow above)",
    rationale:
      "Of the two, follow-up has the shorter feedback loop and higher direct revenue impact — every cold lead is lost revenue, and approval-gated AI drafts are a well-understood pattern with low downside. Reporting is the higher-hours win but has more integration surface area, so it's better as a second build once the first one proves the operating model.",
    scope: {
      phases: [
        {
          name: "Phase 1 — Intake",
          summary:
            "Wire your existing form fills and CRM lead-created events into a single queue. Normalize lead source, first-touch context, and any stated intent into a consistent shape.",
        },
        {
          name: "Phase 2 — Draft engine",
          summary:
            "Build the Claude prompt with 6–8 few-shot examples drawn from your past replies. Tune it so drafts sound like you, not like a generic SDR.",
        },
        {
          name: "Phase 3 — Approval inbox",
          summary:
            "Simple web UI showing each lead alongside its drafted reply. Edit-in-place, one-click send. Sends route through your existing email so threading and deliverability stay clean.",
        },
        {
          name: "Phase 4 — Calibration",
          summary:
            "Run the first 100 leads through the system. Capture every edit you make to a draft, feed those edits back into the prompt examples. Lock the cadence once edit rate drops below ~15%.",
        },
      ],
      key_components: [
        "CRM / form-fill webhook intake (whichever tool you're already on — HubSpot, Pipedrive, plain form post)",
        "Claude prompt tuned on 6–8 of your real past follow-up replies",
        "Approval inbox UI (one-screen list view, edit + send)",
        "Outbound email integration using your existing domain so deliverability stays intact",
        "Lightweight event log so you can see which leads got drafts, sends, and replies",
        "Calibration loop: capture human edits and roll them back into the prompt examples",
      ],
      definition_of_done:
        "On a normal Monday, every inbound lead from the past weekend has a drafted follow-up waiting in one inbox by 8am. You spend 10–15 minutes scanning, lightly editing, and approving. Nothing sits past 24 hours. You stop being the bottleneck without giving up the voice or judgment that makes the replies work.",
    },
  },
};

async function main() {
  const pdfBuffer = await renderReportPdf(mock);

  const outDir = path.join(process.cwd(), "tmp");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "sample-report.pdf");
  fs.writeFileSync(outPath, pdfBuffer);

  console.log(`Wrote ${pdfBuffer.length.toLocaleString()} bytes → ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
