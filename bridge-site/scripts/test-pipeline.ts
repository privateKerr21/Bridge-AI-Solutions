/**
 * Live pipeline smoke test — Claude → JSON validation → PDF render.
 *
 * Run: npx tsx scripts/test-pipeline.ts
 *
 * Hits the real Claude API with realistic mock form responses. Validates the
 * returned JSON conforms to the GeneratedReport schema (incl. new structured
 * scope: phases / key_components / definition_of_done). Then runs the result
 * through the PDF renderer to confirm round-trip works.
 *
 * Output:
 *   - Pretty-printed JSON to stdout
 *   - tmp/test-pipeline.pdf (real Claude output rendered)
 *   - Schema validation results
 */
import fs from "node:fs";
import path from "node:path";
import { generateAuditReport, MODEL } from "../lib/anthropic";
import { renderReportPdf } from "../lib/pdf";
import type { AuditRawResponses, GeneratedReport } from "../lib/types";

const mockResponses: AuditRawResponses = {
  role_and_business: "Founder of a 12-person digital marketing agency serving SMB and mid-market e-commerce clients",
  team_size: "11-50",
  selected_workflows: ["sales_followup", "client_reporting"],
  workflows: [
    {
      workflow_key: "sales_followup",
      workflow_label: "Sales follow-up & lead qualification",
      friction:
        "Inbound leads come in through our site form and a few referral partners. I'm the only one who responds and I'm usually 1-3 days behind. Half of them have already gone cold or hired someone else by the time I reach out. I keep meaning to write a sequence but the leads aren't homogeneous enough to template.",
      goal:
        "Get every qualified lead a thoughtful response within 4 hours of their inquiry, without me being personally on the hook.",
      void:
        "I'd actually do real discovery on these leads — research them, ask the right questions, qualify them properly. Right now I'm just trying to get back to them at all.",
      hours_per_week_estimate: 6,
    },
    {
      workflow_key: "client_reporting",
      workflow_label: "Weekly client reporting",
      friction:
        "Our senior account manager spends most of every Friday assembling reports for 8 retainer clients. Pulls data from GA4, Meta Ads, Google Ads, and our project management tool. Then writes the commentary herself. The format drifts client to client. She's our highest-paid IC.",
      goal:
        "Give clients a consistent, on-time weekly readout that builds trust and surfaces issues before they escalate.",
      void:
        "We'd be doing actual strategic analysis instead of data assembly. Spotting patterns across clients. Catching underperforming campaigns earlier.",
      hours_per_week_estimate: 8,
    },
  ],
  calibration_blocker:
    "Tried Zapier flows twice — they kept breaking when our CRM or ad platforms had small API changes. Tried hiring a contractor who built something half-finished and ghosted. I don't have time to maintain anything I build myself.",
};

function validateReport(report: GeneratedReport): { ok: boolean; errors: string[] } {
  const errors: string[] = [];

  // Diagnosis
  if (!report.diagnosis?.role_summary) errors.push("missing diagnosis.role_summary");
  if (!Array.isArray(report.diagnosis?.shadow_work_areas) || report.diagnosis.shadow_work_areas.length === 0)
    errors.push("missing or empty diagnosis.shadow_work_areas");
  if (!report.diagnosis?.total_hours_reclaimable) errors.push("missing diagnosis.total_hours_reclaimable");
  if (!report.diagnosis?.narrative) errors.push("missing diagnosis.narrative");

  // Opportunity matrix
  if (!Array.isArray(report.opportunity_matrix) || report.opportunity_matrix.length === 0) {
    errors.push("missing or empty opportunity_matrix");
  } else {
    report.opportunity_matrix.forEach((item, i) => {
      if (!item.workflow_name) errors.push(`opportunity_matrix[${i}].workflow_name missing`);
      if (!item.problem_or_goal) errors.push(`opportunity_matrix[${i}].problem_or_goal missing`);
      if (!item.proposed_solution) errors.push(`opportunity_matrix[${i}].proposed_solution missing`);
      if (!["Automate", "Augment", "Eliminate"].includes(item.action_category as string))
        errors.push(`opportunity_matrix[${i}].action_category invalid: ${item.action_category}`);
      if (!item.impact) errors.push(`opportunity_matrix[${i}].impact missing`);
      // The new schema must NOT include risk_moat_score
      if ((item as unknown as Record<string, unknown>).risk_moat_score !== undefined)
        errors.push(`opportunity_matrix[${i}] still includes deprecated risk_moat_score`);
    });
  }

  // Next steps + new structured scope
  if (!report.next_steps?.recommended_first_build) errors.push("missing next_steps.recommended_first_build");
  if (!report.next_steps?.rationale) errors.push("missing next_steps.rationale");
  if (!report.next_steps?.scope) {
    errors.push("missing next_steps.scope (structured)");
  } else {
    if (!Array.isArray(report.next_steps.scope.phases) || report.next_steps.scope.phases.length < 2)
      errors.push("next_steps.scope.phases must have at least 2 entries");
    else
      report.next_steps.scope.phases.forEach((p, i) => {
        if (!p.name) errors.push(`scope.phases[${i}].name missing`);
        if (!p.summary) errors.push(`scope.phases[${i}].summary missing`);
      });
    if (!Array.isArray(report.next_steps.scope.key_components) || report.next_steps.scope.key_components.length < 2)
      errors.push("next_steps.scope.key_components must have at least 2 entries");
    if (!report.next_steps.scope.definition_of_done) errors.push("scope.definition_of_done missing");
  }

  // Legacy field check — must not be present
  if ((report.next_steps as unknown as Record<string, unknown>).rough_scope !== undefined)
    errors.push("next_steps still includes deprecated rough_scope");

  return { ok: errors.length === 0, errors };
}

async function main() {
  console.log(`\n=== LIVE PIPELINE TEST ===`);
  console.log(`Model: ${MODEL}`);
  console.log(`Mock buyer: ${mockResponses.role_and_business}`);
  console.log(`Workflows: ${mockResponses.workflows.map((w) => w.workflow_label).join(" + ")}`);
  console.log(`\nCalling Claude...`);

  const t0 = Date.now();
  const report = await generateAuditReport(mockResponses);
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`✓ Claude returned in ${elapsed}s\n`);

  console.log("=== GENERATED REPORT (raw) ===");
  console.log(JSON.stringify(report, null, 2));

  console.log("\n=== SCHEMA VALIDATION ===");
  const { ok, errors } = validateReport(report);
  if (ok) {
    console.log("✓ Schema valid — all required fields present, no deprecated fields, structured scope is well-formed");
  } else {
    console.log(`✗ Schema validation FAILED with ${errors.length} error(s):`);
    errors.forEach((e) => console.log(`  - ${e}`));
  }

  console.log("\n=== RENDERING PDF ===");
  const pdfBuffer = await renderReportPdf(report);
  const outDir = path.join(process.cwd(), "tmp");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "test-pipeline.pdf");
  fs.writeFileSync(outPath, pdfBuffer);
  console.log(`✓ Rendered ${pdfBuffer.length.toLocaleString()} bytes → ${outPath}`);

  console.log(`\n=== RESULT: ${ok ? "PASS" : "FAIL"} ===\n`);
  process.exit(ok ? 0 : 1);
}

main().catch((err) => {
  console.error("\n✗ FATAL:", err);
  process.exit(1);
});
