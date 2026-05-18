"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AuditRawResponses, WorkflowResponse } from "@/lib/types";

// ─── Workflow catalog ────────────────────────────────────────────────────

const WORKFLOWS = [
  { key: "sales_followup", label: "Sales follow-up & lead qualification" },
  { key: "client_reporting", label: "Client / customer reporting" },
  { key: "quote_proposal", label: "Quote & proposal generation" },
  { key: "client_onboarding", label: "Client onboarding" },
  { key: "internal_reporting", label: "Internal operational reporting" },
  { key: "finance_ar", label: "Finance / AR / invoicing" },
  { key: "other", label: "Other" },
] as const;

const TEAM_SIZES = [
  { value: "solo", label: "Just me" },
  { value: "2-10", label: "2 – 10 people" },
  { value: "11-50", label: "11 – 50 people" },
  { value: "51+", label: "51+ people" },
] as const;

type TeamSize = (typeof TEAM_SIZES)[number]["value"];

// ─── Component ───────────────────────────────────────────────────────────

interface AuditQuizProps {
  sessionId: string; // Stripe checkout session id, passed from /thank-you/[id]
}

type Step =
  | "role"
  | "team"
  | "workflows"
  | "w1_friction"
  | "w1_goal"
  | "w1_void"
  | "w2_friction"
  | "w2_goal"
  | "w2_void"
  | "calibration";

const STEPS: Step[] = [
  "role",
  "team",
  "workflows",
  "w1_friction",
  "w1_goal",
  "w1_void",
  "w2_friction",
  "w2_goal",
  "w2_void",
  "calibration",
];

interface DraftState {
  role: string;
  team: TeamSize | "";
  selectedWorkflows: string[];
  w1: { friction: string; goal: string; void: string };
  w2: { friction: string; goal: string; void: string };
  calibration: string;
}

const INITIAL: DraftState = {
  role: "",
  team: "",
  selectedWorkflows: [],
  w1: { friction: "", goal: "", void: "" },
  w2: { friction: "", goal: "", void: "" },
  calibration: "",
};

export default function AuditQuiz({ sessionId }: AuditQuizProps) {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<DraftState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const step = STEPS[stepIndex];
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  // ─── Validation per step ──────────────────────────────────────────────
  function canAdvance(): boolean {
    switch (step) {
      case "role":
        return draft.role.trim().length > 0;
      case "team":
        return draft.team !== "";
      case "workflows":
        return draft.selectedWorkflows.length === 2;
      case "w1_friction":
        return draft.w1.friction.trim().length > 0;
      case "w1_goal":
        return draft.w1.goal.trim().length > 0;
      case "w1_void":
        return draft.w1.void.trim().length > 0;
      case "w2_friction":
        return draft.w2.friction.trim().length > 0;
      case "w2_goal":
        return draft.w2.goal.trim().length > 0;
      case "w2_void":
        return draft.w2.void.trim().length > 0;
      case "calibration":
        return draft.calibration.trim().length > 0;
    }
  }

  function next() {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      submit();
    }
  }

  function back() {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  }

  function toggleWorkflow(key: string) {
    const has = draft.selectedWorkflows.includes(key);
    if (has) {
      setDraft({
        ...draft,
        selectedWorkflows: draft.selectedWorkflows.filter((k) => k !== key),
      });
    } else if (draft.selectedWorkflows.length < 2) {
      setDraft({
        ...draft,
        selectedWorkflows: [...draft.selectedWorkflows, key],
      });
    }
  }

  // ─── Submit ──────────────────────────────────────────────────────────
  async function submit() {
    setSubmitting(true);
    setError(null);

    const [w1Key, w2Key] = draft.selectedWorkflows;
    const w1Label = WORKFLOWS.find((w) => w.key === w1Key)?.label ?? w1Key;
    const w2Label = WORKFLOWS.find((w) => w.key === w2Key)?.label ?? w2Key;

    const workflows: WorkflowResponse[] = [
      {
        workflow_key: w1Key,
        workflow_label: w1Label,
        friction: draft.w1.friction,
        goal: draft.w1.goal,
        void: draft.w1.void,
      },
      {
        workflow_key: w2Key,
        workflow_label: w2Label,
        friction: draft.w2.friction,
        goal: draft.w2.goal,
        void: draft.w2.void,
      },
    ];

    const payload: AuditRawResponses & { session_id: string } = {
      session_id: sessionId,
      role_and_business: draft.role,
      team_size: draft.team as TeamSize,
      selected_workflows: draft.selectedWorkflows,
      workflows,
      calibration_blocker: draft.calibration,
    };

    try {
      const res = await fetch("/api/audit/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Submission failed (${res.status})`);
      }

      const { auditId } = await res.json();
      router.push(`/dashboard/audit/${auditId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setSubmitting(false);
    }
  }

  // ─── Render ─────────────────────────────────────────────────────────
  const [w1Key, w2Key] = draft.selectedWorkflows;
  const w1Label = WORKFLOWS.find((w) => w.key === w1Key)?.label ?? "Workflow 1";
  const w2Label = WORKFLOWS.find((w) => w.key === w2Key)?.label ?? "Workflow 2";

  return (
    <section className="audit-quiz">
      <div className="audit-quiz-inner">
        <div className="audit-quiz-header">
          <span className="audit-quiz-label">{`Step ${stepIndex + 1} of ${STEPS.length}`}</span>
          <div className="audit-quiz-progress">
            <div className="audit-quiz-progress-bar" style={{ transform: `scaleX(${progress / 100})` }} />
          </div>
        </div>

        <div className="audit-quiz-body">
          {step === "role" && (
            <Question
              question="What's your role and business?"
              hint="One line is plenty. Example: 'Founder of a 12-person marketing agency' or 'Head of ops at a 30-person SaaS.'"
            >
              <input
                type="text"
                className="audit-input"
                value={draft.role}
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                placeholder="Your role + business"
                autoFocus
              />
            </Question>
          )}

          {step === "team" && (
            <Question question="How big is your team right now?">
              <div className="audit-options">
                {TEAM_SIZES.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`audit-option${draft.team === opt.value ? " selected" : ""}`}
                    onClick={() => setDraft({ ...draft, team: opt.value })}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </Question>
          )}

          {step === "workflows" && (
            <Question
              question="Pick the 2 areas eating the most of your week."
              hint="Select exactly 2. The audit focuses on these in depth."
            >
              <div className="audit-options">
                {WORKFLOWS.map((wf) => {
                  const selected = draft.selectedWorkflows.includes(wf.key);
                  const disabled = !selected && draft.selectedWorkflows.length >= 2;
                  return (
                    <button
                      type="button"
                      key={wf.key}
                      className={`audit-option${selected ? " selected" : ""}${disabled ? " disabled" : ""}`}
                      onClick={() => toggleWorkflow(wf.key)}
                      disabled={disabled}
                    >
                      {wf.label}
                    </button>
                  );
                })}
              </div>
              <p className="audit-multi-counter">
                {draft.selectedWorkflows.length} of 2 selected
              </p>
            </Question>
          )}

          {step === "w1_friction" && (
            <Question
              question={`${w1Label}: what does this workflow look like manually today?`}
              hint="Be specific. Tools used, who does it, roughly how many hours per week it eats."
            >
              <textarea
                className="audit-textarea"
                value={draft.w1.friction}
                onChange={(e) => setDraft({ ...draft, w1: { ...draft.w1, friction: e.target.value } })}
                rows={5}
                placeholder="e.g. 'Every Friday I spend ~4 hours pulling numbers from GA, HubSpot, and our project tool into a Google Slides deck for each of our 8 clients.'"
                autoFocus
              />
            </Question>
          )}

          {step === "w1_goal" && (
            <Question
              question={`${w1Label}: what is this workflow actually meant to accomplish?`}
              hint="Strategic goal, not the activity. Are you reporting to retain clients? Show progress? Drive renewals? Trigger upsells?"
            >
              <textarea
                className="audit-textarea"
                value={draft.w1.goal}
                onChange={(e) => setDraft({ ...draft, w1: { ...draft.w1, goal: e.target.value } })}
                rows={4}
                placeholder="e.g. 'Keep clients confident in our work so they renew quarterly contracts.'"
                autoFocus
              />
            </Question>
          )}

          {step === "w1_void" && (
            <Question
              question={`${w1Label}: what aren't you doing here that you wish you were?`}
              hint="What would you do if this workflow took 1/10 the time? What gets dropped because of this work?"
            >
              <textarea
                className="audit-textarea"
                value={draft.w1.void}
                onChange={(e) => setDraft({ ...draft, w1: { ...draft.w1, void: e.target.value } })}
                rows={4}
                placeholder="e.g. 'I'd actually look at the numbers and proactively spot underperforming campaigns. Right now I'm just packaging data, not analyzing it.'"
                autoFocus
              />
            </Question>
          )}

          {step === "w2_friction" && (
            <Question
              question={`${w2Label}: what does this workflow look like manually today?`}
              hint="Same drill as the last workflow — be specific about the grind."
            >
              <textarea
                className="audit-textarea"
                value={draft.w2.friction}
                onChange={(e) => setDraft({ ...draft, w2: { ...draft.w2, friction: e.target.value } })}
                rows={5}
                placeholder="Walk through the manual steps."
                autoFocus
              />
            </Question>
          )}

          {step === "w2_goal" && (
            <Question
              question={`${w2Label}: what is this workflow actually meant to accomplish?`}
            >
              <textarea
                className="audit-textarea"
                value={draft.w2.goal}
                onChange={(e) => setDraft({ ...draft, w2: { ...draft.w2, goal: e.target.value } })}
                rows={4}
                placeholder="The real strategic outcome."
                autoFocus
              />
            </Question>
          )}

          {step === "w2_void" && (
            <Question
              question={`${w2Label}: what aren't you doing here that you wish you were?`}
            >
              <textarea
                className="audit-textarea"
                value={draft.w2.void}
                onChange={(e) => setDraft({ ...draft, w2: { ...draft.w2, void: e.target.value } })}
                rows={4}
                placeholder="What would change if this took 1/10 the time?"
                autoFocus
              />
            </Question>
          )}

          {step === "calibration" && (
            <Question
              question="One more — what's stopped you from automating this so far?"
              hint="Be honest. Time? Tools that broke? Don't know which one to tackle first? Bad past experience?"
            >
              <textarea
                className="audit-textarea"
                value={draft.calibration}
                onChange={(e) => setDraft({ ...draft, calibration: e.target.value })}
                rows={4}
                placeholder="Your blocker."
                autoFocus
              />
            </Question>
          )}
        </div>

        {error && <p className="audit-error">{error}</p>}

        <div className="audit-quiz-nav">
          <button
            type="button"
            className="audit-back"
            onClick={back}
            disabled={stepIndex === 0 || submitting}
          >
            ← Back
          </button>
          <button
            type="button"
            className="audit-next"
            onClick={next}
            disabled={!canAdvance() || submitting}
          >
            {submitting
              ? "Generating your roadmap…"
              : stepIndex === STEPS.length - 1
              ? "Generate my roadmap →"
              : "Next →"}
          </button>
        </div>
      </div>
    </section>
  );
}

function Question({
  question,
  hint,
  children,
}: {
  question: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="audit-question">
      <h2 className="audit-question-text">{question}</h2>
      {hint && <p className="audit-question-hint">{hint}</p>}
      <div className="audit-question-input">{children}</div>
    </div>
  );
}
