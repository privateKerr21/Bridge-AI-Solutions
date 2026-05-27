// Shared types for the Shadow Audit funnel.

export type AuditTier = "audit_free" | "audit_paid";

export type AuditVariant = "a" | "b";

export type LeadStatus =
  | "lead"
  | "purchased"
  | "audit_completed"
  | "call_booked"
  | "converted"
  | "churned";

export interface Lead {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  variant: AuditVariant | null;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
}

export interface Purchase {
  id: string;
  lead_id: string;
  stripe_session_id: string;
  stripe_payment_intent_id: string | null;
  tier: AuditTier;
  amount_cents: number;
  status: "completed" | "refunded" | "disputed";
  created_at: string;
}

// Form responses captured per workflow (ATLAS triad)
export interface WorkflowResponse {
  workflow_key: string; // e.g. "sales_followup"
  workflow_label: string;
  friction: string;
  goal: string;
  void: string;
  hours_per_week_estimate?: number;
}

export interface AuditRawResponses {
  role_and_business: string;
  team_size: "solo" | "2-10" | "11-50" | "51+";
  selected_workflows: string[]; // workflow keys
  workflows: WorkflowResponse[];
  calibration_blocker: string;
}

// Generated report structure (output of Claude)
export interface OpportunityMatrixItem {
  workflow_name: string;
  problem_or_goal: string;
  proposed_solution: string;
  action_category: "Automate" | "Augment" | "Eliminate";
  impact: string; // e.g. "8-12 hours/week reclaimed"
}

export interface BuildPhase {
  name: string; // e.g. "Phase 1 — Intake & data wiring"
  summary: string; // 1-2 sentence description of the work in this phase
}

export interface BuildScope {
  phases: BuildPhase[]; // 3-5 chronological phases
  key_components: string[]; // concrete artifacts/integrations that get built
  definition_of_done: string; // what "shipped" looks like in plain language
}

export interface GeneratedReport {
  diagnosis: {
    role_summary: string;
    shadow_work_areas: string[];
    total_hours_reclaimable: string; // e.g. "10-15 hours/week"
    narrative: string;
  };
  opportunity_matrix: OpportunityMatrixItem[];
  next_steps: {
    recommended_first_build: string;
    rationale: string;
    scope: BuildScope;
  };
}
