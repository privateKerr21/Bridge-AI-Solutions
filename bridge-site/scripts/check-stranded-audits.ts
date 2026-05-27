/**
 * Check Supabase for audit_responses rows generated under the old schema
 * (containing `rough_scope` or `risk_moat_score`). Those rows will crash
 * the dashboard view now that the schema requires structured `scope` and
 * has no `risk_moat_score` field.
 *
 * Run: npx tsx --env-file=.env.local scripts/check-stranded-audits.ts
 */
import { supabaseAdmin } from "../lib/supabase/admin";

interface Row {
  id: string;
  status: string | null;
  created_at: string | null;
  generated_report: unknown;
}

async function main() {
  const { data, error } = await supabaseAdmin
    .from("audit_responses")
    .select("id, status, created_at, generated_report")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("✗ Query failed:", error.message);
    process.exit(1);
  }

  const rows = (data ?? []) as Row[];
  console.log(`\n=== audit_responses: ${rows.length} total rows ===\n`);

  if (rows.length === 0) {
    console.log("No audit responses exist yet. Schema change is safe — no stranded data.\n");
    return;
  }

  const stranded: Array<{ id: string; reasons: string[]; created_at: string | null }> = [];

  for (const row of rows) {
    const reasons: string[] = [];
    const report = row.generated_report as Record<string, unknown> | null;

    if (!report) {
      // No report yet — pending/failed/generating. Not stranded, just incomplete.
      continue;
    }

    const nextSteps = report.next_steps as Record<string, unknown> | undefined;
    const matrix = report.opportunity_matrix as Array<Record<string, unknown>> | undefined;

    if (nextSteps?.rough_scope !== undefined) reasons.push("legacy next_steps.rough_scope (string)");
    if (nextSteps?.scope === undefined) reasons.push("missing new next_steps.scope");
    if (Array.isArray(matrix)) {
      const withRiskMoat = matrix.filter((m) => m.risk_moat_score !== undefined).length;
      if (withRiskMoat > 0)
        reasons.push(`${withRiskMoat} opportunity_matrix entries with legacy risk_moat_score`);
    }

    if (reasons.length > 0) {
      stranded.push({ id: row.id, reasons, created_at: row.created_at });
    }
  }

  console.log(`Status breakdown:`);
  const byStatus = rows.reduce<Record<string, number>>((acc, r) => {
    const k = r.status ?? "null";
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  Object.entries(byStatus).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

  console.log(`\nStranded rows (old schema): ${stranded.length}`);
  if (stranded.length === 0) {
    console.log("✓ No remediation needed.\n");
  } else {
    console.log("\nDetails:");
    stranded.forEach((s) => {
      console.log(`  ${s.id} (${s.created_at})`);
      s.reasons.forEach((r) => console.log(`    - ${r}`));
    });
    console.log("\nRemediation options: backfill via re-generation, soft-delete, or add defensive guards in the view.\n");
  }
}

main().catch((err) => {
  console.error("✗ FATAL:", err);
  process.exit(1);
});
