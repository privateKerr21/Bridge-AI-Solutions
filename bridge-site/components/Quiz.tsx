"use client";

import { useState } from "react";

type QuestionKey = "q1" | "q2" | "q3";
type Answers = Partial<Record<QuestionKey, string>>;

const questions: QuestionKey[] = ["q1", "q2", "q3"];

const results = {
  high: {
    badge: "High Build Potential",
    title: "You're leaving serious capacity on the table.",
    desc: "Based on your answers, you're spending significant hours on work a custom tool could handle. You're a strong candidate for a Focused or Signature Build. Let's identify exactly what to build.",
  },
  medium: {
    badge: "Good Fit for a Custom Build",
    title: "There's a real opportunity here.",
    desc: "A targeted custom tool could meaningfully reduce your manual workload and free you up for higher-value work. The right build pays for itself fast. Let's map it out.",
  },
  ready: {
    badge: "Ready to Build",
    title: "You're already in the right mindset.",
    desc: "You know what needs to happen — you just need someone to build it properly. Let's skip the intro and get straight to scoping your custom solution.",
  },
  low: {
    badge: "Starting Point Identified",
    title: "Small builds, big momentum.",
    desc: "Even a focused custom tool — scoped tight to one problem — can compound over time. Let's find your best first build and see what's possible from day one.",
  },
};

const workTypeLabels: Record<string, string> = {
  outreach: "outreach and follow-ups",
  admin: "admin and reporting",
  research: "research and data gathering",
  content: "content and communications",
};

const hoursLabels: Record<string, string> = {
  low: "1–3 hours a week",
  medium: "3–7 hours a week",
  high: "7–15 hours a week",
  extreme: "15+ hours a week",
};

const aiExpLabels: Record<string, string> = {
  none: "haven't found the right starting point yet",
  tried: "tried a few tools but nothing has stuck",
  using: "using some AI tools but want to go further",
  ready: "know what I want — just need someone to build it",
};

function calculateResult(answers: Answers) {
  if (answers.q3 === "ready") return results.ready;
  if (answers.q2 === "extreme" || answers.q2 === "high") return results.high;
  if (answers.q2 === "medium") return results.medium;
  return results.low;
}

function buildEmailLink(answers: Answers, result: (typeof results)[keyof typeof results]) {
  const work = workTypeLabels[answers.q1 ?? ""] || "repetitive work";
  const hours = hoursLabels[answers.q2 ?? ""] || "several hours a week";
  const exp = aiExpLabels[answers.q3 ?? ""] || "";

  const key =
    result.badge === "Ready to Build" ? "ready"
    : result.badge === "High Build Potential" ? "high"
    : result.badge === "Good Fit for a Custom Build" ? "medium"
    : "low";

  const subjects: Record<string, string> = {
    ready: "AI automation build — ready to move fast",
    high: `Automating my ${work} — high potential`,
    medium: `Exploring AI automation for my ${work}`,
    low: "Starting point for AI automation",
  };

  const bodies: Record<string, string> = {
    ready: `Hi Hayden,\n\nI just took the quiz on Bridge AI — came out as "Ready to Build."\n\nI've been spending ${hours} on ${work} and I ${exp}. I'm not looking for an intro — I want a custom tool built.\n\nWorth a quick call?\n\n[Your name]`,
    high: `Hi Hayden,\n\nI just took the quiz on Bridge AI — looks like I have high build potential.\n\nI'm spending ${hours} on ${work} and I ${exp}. Sounds like there's real capacity to recover here.\n\nWould love to scope something out. Open to a call?\n\n[Your name]`,
    medium: `Hi Hayden,\n\nTook the quiz on Bridge AI — got "Good Fit for a Custom Build."\n\nI'm spending ${hours} on ${work} and I ${exp}. Curious what a custom tool could do for my operation.\n\nOpen to a quick call?\n\n[Your name]`,
    low: `Hi Hayden,\n\nI just took the quiz on Bridge AI — got "Starting Point Identified."\n\nI'm spending ${hours} on ${work}. Even if it's focused to start, I want to see what the right first build would look like.\n\nUp for a quick chat?\n\n[Your name]`,
  };

  return (
    "mailto:h.kerr@aibridgedsolutions.com" +
    "?subject=" + encodeURIComponent(subjects[key]) +
    "&body=" + encodeURIComponent(bodies[key])
  );
}

function buildLinkedInDraft(answers: Answers, result: (typeof results)[keyof typeof results]) {
  const work = workTypeLabels[answers.q1 ?? ""] || "repetitive work";
  const hours = hoursLabels[answers.q2 ?? ""] || "several hours a week";
  const exp = aiExpLabels[answers.q3 ?? ""] || "";
  return `Hi Hayden — I just took the quiz on your Bridge AI site and came out as "${result.badge}." I'm spending ${hours} on ${work} and I ${exp}. Would love to connect and hear what you've built for similar businesses.`;
}

type QuizVariant = "default" | "hero";

export default function Quiz({ variant = "default" }: { variant?: QuizVariant } = {}) {
  const isHero = variant === "hero";
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = done ? calculateResult(answers) : null;

  function selectAnswer(questionId: QuestionKey, value: string) {
    setAnswers({ ...answers, [questionId]: value });
  }

  function goNext() {
    if (current < 2) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  }

  function goBack() {
    if (done) {
      setDone(false);
      setCurrent(2);
      return;
    }
    if (current > 0) setCurrent(current - 1);
  }

  function startOver() {
    setAnswers({});
    setCurrent(0);
    setDone(false);
    setCopied(false);
  }

  function copyLinkedIn() {
    if (!result) return;
    const text = buildLinkedInDraft(answers, result);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const progress = done ? 100 : ((current + 1) / 3) * 100;

  const questionData = [
    {
      id: "q1" as QuestionKey,
      label: "Question 1 of 3",
      text: "What type of work takes up most of your time right now?",
      options: [
        { value: "outreach", label: "Outreach & follow-ups" },
        { value: "admin", label: "Admin & reporting" },
        { value: "research", label: "Research & data gathering" },
        { value: "content", label: "Content & communications" },
      ],
    },
    {
      id: "q2" as QuestionKey,
      label: "Question 2 of 3",
      text: "How much time per week do you spend on this?",
      options: [
        { value: "low", label: "1–3 hours" },
        { value: "medium", label: "3–7 hours" },
        { value: "high", label: "7–15 hours" },
        { value: "extreme", label: "15+ hours" },
      ],
    },
    {
      id: "q3" as QuestionKey,
      label: "Question 3 of 3",
      text: "Have you tried any AI tools to solve this yet?",
      options: [
        { value: "none", label: "Not yet — don't know where to start" },
        { value: "tried", label: "Tried a few things, nothing stuck" },
        { value: "using", label: "Using some tools but want more" },
        { value: "ready", label: "Ready to go — just need someone to build it" },
      ],
    },
  ];

  const q = questionData[current];

  const sectionClass = isHero ? "quiz-section quiz-hero" : "quiz-section section";
  const containerClass = isHero ? "quiz-hero-inner" : "container";

  return (
    <section className={sectionClass} id="quiz">
      <div className={containerClass}>
        <div className="quiz-header">
          <span className="label">2-Minute Assessment</span>
          {isHero ? (
            <p className="quiz-hero-tagline">Find your biggest operational bottleneck in 3 questions.</p>
          ) : (
            <>
              <h2>Where&apos;s your biggest operational bottleneck?</h2>
              <p>Answer 3 quick questions and find out what a custom build could do for your business.</p>
            </>
          )}
        </div>

        <div className="quiz-progress">
          <div className="quiz-progress-bar" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>

        {!done && (
          <div className="quiz-question active">
            <div className="quiz-q-label">{q.label}</div>
            <div className="quiz-q-text">{q.text}</div>
            <div className="quiz-options">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  className={`quiz-option${answers[q.id] === opt.value ? " selected" : ""}`}
                  onClick={() => selectAnswer(q.id, opt.value)}
                  aria-pressed={answers[q.id] === opt.value}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="quiz-nav">
              <button
                type="button"
                className="quiz-nav-back"
                onClick={goBack}
                disabled={current === 0}
                aria-label="Previous question"
              >
                ← Back
              </button>
              <button
                type="button"
                className="quiz-nav-next"
                onClick={goNext}
                disabled={!answers[q.id]}
                aria-label={current === 2 ? "See your result" : "Next question"}
              >
                {current === 2 ? "See your result →" : "Next →"}
              </button>
            </div>
          </div>
        )}

        {done && result && (
          <div className="quiz-result active">
            <span className="result-badge">{result.badge}</span>
            <h2 className="result-title">{result.title}</h2>
            <p className="result-desc">{result.desc}</p>

            <div className="result-actions">
              <a
                href="https://calendly.com/h-kerr711/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink"
              >
                Book a discovery call
              </a>
              <button
                type="button"
                className="quiz-result-back"
                onClick={goBack}
                aria-label="Edit my answers"
              >
                ← Edit answers
              </button>
            </div>

            <details className="result-alt-paths">
              <summary>Prefer email or LinkedIn?</summary>
              <div className="result-alt-paths-inner">
                <div className="result-contact-links">
                  <a href={buildEmailLink(answers, result)}>Send a personalized email →</a>
                </div>
                <div className="linkedin-draft-block">
                  <p className="linkedin-draft-label">// Or copy this LinkedIn message</p>
                  <div className="linkedin-draft-box">
                    <p className="linkedin-draft-text">{buildLinkedInDraft(answers, result)}</p>
                    <button
                      className={`linkedin-copy-btn${copied ? " copied" : ""}`}
                      onClick={copyLinkedIn}
                      aria-label="Copy LinkedIn message to clipboard"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/haydenkerr-bridged"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-go-link"
                  >
                    Open LinkedIn →
                  </a>
                </div>
              </div>
            </details>
          </div>
        )}
      </div>
    </section>
  );
}
