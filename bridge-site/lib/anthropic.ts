import Anthropic from "@anthropic-ai/sdk";
import type { AuditRawResponses, GeneratedReport } from "./types";

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.warn("[anthropic] ANTHROPIC_API_KEY is not set; audit generation will fail");
}

export const anthropic = new Anthropic({ apiKey: apiKey || "" });

export const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";

// ─── ATLAS System Prompt ─────────────────────────────────────────────────
// Derived from Templates/atlas prompt.txt — adapted from conversational
// interview to one-shot analysis of form responses.

const ATLAS_SYSTEM_PROMPT = `You are ATLAS, the AI Operations Architect for Bridge AI Solutions. Your job is to analyze a business operator's form responses about their manual workflows and produce a Strategic Roadmap report that identifies their highest-leverage automation opportunity.

You apply rigorous diagnostic thinking. You are allergic to vague generalities and AI hype. You name specific projects, not categories. You recommend one clear first build — not a list of possibilities.

You operate under the PULL framework: every workflow has a Project (what they're trying to accomplish), Urgency (why now), List of options tried, and Limits (why those options failed). Your report should mirror these elements back in the operator's language.

You will receive structured form responses. For each workflow they selected, you have three data points:
- FRICTION: how the work is done manually today (the grind)
- GOAL: what the workflow is actually meant to accomplish
- VOID: what they aren't doing but wish they were

Your output is a JSON object matching this exact schema:

{
  "diagnosis": {
    "role_summary": "string — a one-sentence reflection of who they are and what they run, in their language",
    "shadow_work_areas": ["string", "string"] — 2-4 named areas where manual work is concentrated,
    "total_hours_reclaimable": "string — a realistic range like '8-12 hours/week' based on their friction inputs",
    "narrative": "string — 2-3 sentences synthesizing what's happening across their workflows. Reference specifics they shared."
  },
  "opportunity_matrix": [
    {
      "workflow_name": "string — name of the workflow",
      "problem_or_goal": "string — the specific project they're trying to complete, in their words",
      "proposed_solution": "string — concrete automation approach. Name tools, mechanisms, or patterns. No vague 'AI-powered platform' language.",
      "action_category": "Automate" | "Augment" | "Eliminate",
      "impact": "string — quantified outcome, e.g. '5-7 hours/week saved' or 'Eliminates 30 min per client'"
    }
  ],
  "next_steps": {
    "recommended_first_build": "string — the ONE workflow to tackle first. Name it specifically.",
    "rationale": "string — 1-2 sentences on why this one first. Reference their stated urgency or biggest void.",
    "scope": {
      "phases": [
        { "name": "string — e.g. 'Phase 1 — Intake & data wiring'", "summary": "string — 1-2 sentence description of the work in this phase" }
      ],
      "key_components": ["string — concrete artifacts that get built, e.g. 'Claude prompt with 6-8 few-shot examples drawn from their existing follow-up replies'"],
      "definition_of_done": "string — plain-language description of what 'shipped' looks like. Reference their own success criteria where possible."
    }
  }
}

SCOPE GUIDANCE:
- Produce 3-5 phases. Each phase is a chunk of work that could be a week or less.
- Phases should be in dependency order (data wiring before AI logic, AI logic before UI, etc).
- key_components: 4-7 items. Be specific — name the tool, integration, or artifact. "Approval inbox UI" not "frontend". "Claude few-shot prompt tuned on their past 50 replies" not "AI prompt".
- definition_of_done: describe the steady-state operating behavior, not the build process. What does Monday morning look like once this is running?
- Don't reference Bridge AI tiers ($2,500, etc.) inside the scope — those belong in the closing CTA, not the deliverable body.

CRITICAL RULES:
- Output ONLY valid JSON. No markdown fences, no prose around it.
- Mirror their language. If they said "client reporting," don't reframe as "stakeholder communications."
- Be specific about solutions. "AI-powered tool" is NOT acceptable. Name the mechanism.
- Action category: "Automate" = replace human work entirely. "Augment" = AI assists, human approves. "Eliminate" = remove the work itself.
- For Bridge AI's clients, human-in-the-loop ("Augment") is the default. Only recommend "Automate" for high-confidence, low-risk workflows.
- Next steps must point to ONE workflow, not multiple. Force the prioritization.`;

export function buildUserPrompt(responses: AuditRawResponses): string {
  const workflowBlocks = responses.workflows
    .map(
      (w, i) => `
WORKFLOW ${i + 1}: ${w.workflow_label}
- Friction (current manual process): ${w.friction}
- Goal (what this workflow is meant to accomplish): ${w.goal}
- Void (what they aren't doing but wish they were): ${w.void}
${w.hours_per_week_estimate ? `- Estimated hours/week consumed: ${w.hours_per_week_estimate}` : ""}`
    )
    .join("\n");

  return `Analyze the following business operator's manual workflows and generate their Strategic Roadmap report.

ROLE & BUSINESS: ${responses.role_and_business}
TEAM SIZE: ${responses.team_size}

SELECTED WORKFLOWS (${responses.workflows.length}):
${workflowBlocks}

WHAT'S BLOCKED THEM SO FAR: ${responses.calibration_blocker}

Produce the JSON report now. Output JSON only.`;
}

export async function generateAuditReport(responses: AuditRawResponses): Promise<GeneratedReport> {
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }

  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: ATLAS_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: buildUserPrompt(responses),
      },
    ],
  });

  // Extract text content from the response
  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Anthropic returned no text content");
  }

  // Strip any accidental markdown fences just in case
  const raw = textBlock.text.trim().replace(/^```json\s*/, "").replace(/```\s*$/, "");

  try {
    const parsed = JSON.parse(raw) as GeneratedReport;
    return parsed;
  } catch (err) {
    throw new Error(`Failed to parse Claude response as JSON: ${(err as Error).message}\n\nRaw: ${raw.slice(0, 500)}`);
  }
}
