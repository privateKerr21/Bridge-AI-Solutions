# Bridge AI Solutions Website Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current generic landing page with a two-page Bold & Editorial site — a conversion-focused landing page (`index.html`) and a long-form editorial content page (`insights.html`).

**Architecture:** `index.html` is a self-contained conversion funnel (hero → quiz → email capture → process → stats → footer). `insights.html` repurposes existing content from `landing_page_v2.html` restyled in the new design system. Both pages share a single `Assets/Brand/styles.css` global stylesheet plus inline page-specific styles. No build tools, no frameworks — vanilla HTML/CSS/JS only.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS (quiz logic), Google Fonts (Space Grotesk, Inter, Space Mono), Vercel (auto-deploy from main branch)

**Design Reference:** `docs/plans/2026-03-07-website-redesign-design.md`

**Source Content:** `Assets/landing_page_v2.html` (mine for content, do not delete)

---

## Task 1: Global Design System (styles.css)

**Files:**
- Modify: `Assets/Brand/styles.css`

**Context:**
The current `styles.css` uses the old sage green palette and generic styles. We're replacing the design tokens and base styles. Read the file first, then overwrite with the new system. Keep any existing layout utilities that are still useful.

**Step 1: Read the current stylesheet**

Open and read `Assets/Brand/styles.css` to understand what currently exists.

**Step 2: Replace with new design system**

Replace the full contents of `Assets/Brand/styles.css` with:

```css
/* ============================================
   BRIDGE AI SOLUTIONS — Global Design System
   Bold & Editorial — Soft Gold Edition
   ============================================ */

@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

/* --- Design Tokens --- */
:root {
  --bg:        #F5F2EE;
  --ink:       #0D0D0D;
  --gold:      #D4AF37;
  --gold-dark: #B8971F;
  --muted:     #6B6B6B;
  --border:    #0D0D0D;
  --dark-bg:   #0D0D0D;
  --dark-text: #F5F2EE;

  --font-head: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'Space Mono', monospace;

  --max-width: 1200px;
  --border-weight: 2px;
}

/* --- Reset --- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }

/* --- Container --- */
.container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

/* --- Typography --- */
h1, h2, h3, h4 {
  font-family: var(--font-head);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

h1 { font-size: clamp(2.5rem, 6vw, 5rem); }
h2 { font-size: clamp(2rem, 4vw, 3.5rem); }
h3 { font-size: clamp(1.25rem, 2.5vw, 1.75rem); }

.label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

/* --- Buttons --- */
.btn {
  display: inline-block;
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 1rem;
  padding: 14px 32px;
  border: var(--border-weight) solid var(--ink);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  border-radius: 0;
  text-align: center;
}

.btn-primary {
  background: var(--gold);
  color: var(--ink);
}

.btn-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--ink);
}

.btn-dark {
  background: var(--ink);
  color: var(--dark-text);
  border-color: var(--ink);
}

.btn-dark:hover {
  background: var(--gold);
  color: var(--ink);
}

.btn-outline {
  background: transparent;
  color: var(--ink);
}

.btn-outline:hover {
  background: var(--ink);
  color: var(--dark-text);
}

/* --- Dividers --- */
.rule {
  border: none;
  border-top: var(--border-weight) solid var(--ink);
  margin: 0;
}

/* --- Section base --- */
.section {
  padding: 80px 0;
}

.section-dark {
  background: var(--dark-bg);
  color: var(--dark-text);
}

.section-dark .label { color: var(--gold); }

/* --- Gold accent --- */
.gold { color: var(--gold); }
.bg-gold { background: var(--gold); }

/* --- Navbar --- */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: var(--bg);
  border-bottom: var(--border-weight) solid var(--ink);
}

.navbar-logo {
  font-family: var(--font-head);
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
}

.navbar-logo span { color: var(--gold); }

.navbar-links {
  display: flex;
  gap: 32px;
  list-style: none;
}

.navbar-links a {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: color 0.15s;
}

.navbar-links a:hover { color: var(--gold-dark); }

@media (max-width: 640px) {
  .navbar-links { display: none; }
}

/* --- Footer --- */
.footer {
  background: var(--ink);
  color: var(--dark-text);
  padding: 48px 0 32px;
  border-top: var(--border-weight) solid var(--ink);
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  flex-wrap: wrap;
}

.footer-brand {
  font-family: var(--font-head);
  font-weight: 800;
  font-size: 1.25rem;
}

.footer-brand span { color: var(--gold); }

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-links a {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  transition: color 0.15s;
}

.footer-links a:hover { color: var(--gold); }

.footer-copy {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid #333;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--muted);
}
```

**Step 3: Verify in browser**

Open any existing HTML file referencing `Brand/styles.css` and confirm no console errors. The page will look broken — that's expected. We're replacing both HTML pages next.

**Step 4: Commit**

```bash
cd "C:\Users\kerrk\OneDrive\Documents\Bridge AI Solutions"
git add Assets/Brand/styles.css
git commit -m "feat: new design system — soft gold editorial palette"
```

---

## Task 2: Landing Page — index.html

**Files:**
- Modify: `index.html` (currently a redirect — full rewrite)

**Context:**
`index.html` currently just redirects to `Assets/landing_page_v2.html`. We're replacing it with the full landing page. The page must be self-contained with inline styles for page-specific CSS, plus it imports `Assets/Brand/styles.css`. All asset paths must be relative from the root (e.g., `Assets/Brand/styles.css`, `Assets/Brand/Logos/...`).

The quiz uses vanilla JS — no libraries. It shows one question at a time, tracks answers in a JS object, and displays a result screen with a personalized message + email field.

**Step 1: Read current index.html**

Read `index.html` to note the existing logo path and any meta tags worth preserving.

**Step 2: Write the new index.html**

Replace `index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bridge AI Solutions — Your AI Systems, Built For You</title>
  <meta name="description" content="Bridge AI Solutions builds custom AI automation systems for small businesses. Stop doing work AI can do. We'll build it for you.">
  <link rel="icon" type="image/jpeg" href="Assets/Brand/Logos/bridge_ai_logo%20(1).jpg">
  <link rel="stylesheet" href="Assets/Brand/styles.css">
  <style>
    /* ---- PAGE-SPECIFIC STYLES ---- */

    /* Navbar offset */
    body { padding-top: 64px; }

    /* ---- HERO ---- */
    .hero {
      min-height: calc(100vh - 64px);
      display: flex;
      align-items: center;
      background: var(--ink);
      color: var(--dark-text);
      padding: 80px 0;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: 'AI';
      position: absolute;
      right: -40px;
      top: 50%;
      transform: translateY(-50%);
      font-family: var(--font-head);
      font-weight: 800;
      font-size: clamp(200px, 30vw, 400px);
      color: rgba(212, 175, 55, 0.06);
      line-height: 1;
      pointer-events: none;
      user-select: none;
    }

    .hero-inner {
      position: relative;
      z-index: 1;
      max-width: 860px;
    }

    .hero-label {
      color: var(--gold);
      margin-bottom: 24px;
    }

    .hero h1 {
      color: var(--dark-text);
      margin-bottom: 24px;
    }

    .hero h1 em {
      font-style: normal;
      color: var(--gold);
    }

    .hero-sub {
      font-size: 1.2rem;
      color: #A0A0A0;
      max-width: 560px;
      margin-bottom: 48px;
      line-height: 1.7;
    }

    .hero-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      align-items: center;
    }

    .hero-or {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--muted);
      text-transform: uppercase;
    }

    .hero-email-form {
      display: flex;
      gap: 0;
      border: var(--border-weight) solid #444;
    }

    .hero-email-form input {
      background: transparent;
      border: none;
      padding: 14px 20px;
      color: var(--dark-text);
      font-family: var(--font-body);
      font-size: 0.95rem;
      outline: none;
      width: 240px;
    }

    .hero-email-form input::placeholder { color: #666; }

    .hero-email-form button {
      background: var(--gold);
      color: var(--ink);
      border: none;
      padding: 14px 24px;
      font-family: var(--font-head);
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.15s;
      border-left: var(--border-weight) solid #444;
    }

    .hero-email-form button:hover { background: var(--gold-dark); }

    @media (max-width: 640px) {
      .hero-email-form { flex-direction: column; }
      .hero-email-form input { width: 100%; border-bottom: var(--border-weight) solid #444; }
      .hero-email-form button { border-left: none; border-top: var(--border-weight) solid #444; }
    }

    /* ---- QUIZ ---- */
    .quiz-section {
      padding: 100px 0;
      background: var(--bg);
      border-top: var(--border-weight) solid var(--ink);
      border-bottom: var(--border-weight) solid var(--ink);
    }

    .quiz-header {
      text-align: center;
      margin-bottom: 56px;
    }

    .quiz-header .label { margin-bottom: 16px; display: block; }
    .quiz-header h2 { margin-bottom: 16px; }
    .quiz-header p { color: var(--muted); max-width: 480px; margin: 0 auto; }

    .quiz-progress {
      width: 100%;
      max-width: 640px;
      margin: 0 auto 48px;
      height: 3px;
      background: #E0DDD9;
      border-radius: 0;
    }

    .quiz-progress-bar {
      height: 100%;
      background: var(--gold);
      transition: width 0.4s ease;
    }

    .quiz-frame {
      max-width: 640px;
      margin: 0 auto;
    }

    .quiz-question {
      display: none;
    }

    .quiz-question.active {
      display: block;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .quiz-q-label {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--muted);
      margin-bottom: 12px;
    }

    .quiz-q-text {
      font-family: var(--font-head);
      font-weight: 700;
      font-size: clamp(1.3rem, 2.5vw, 1.75rem);
      margin-bottom: 32px;
      line-height: 1.2;
    }

    .quiz-options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    @media (max-width: 540px) {
      .quiz-options { grid-template-columns: 1fr; }
    }

    .quiz-option {
      padding: 20px 24px;
      border: var(--border-weight) solid var(--ink);
      background: transparent;
      font-family: var(--font-body);
      font-weight: 500;
      font-size: 0.95rem;
      cursor: pointer;
      text-align: left;
      transition: background 0.15s, color 0.15s, transform 0.1s;
      line-height: 1.4;
    }

    .quiz-option:hover {
      background: var(--ink);
      color: var(--dark-text);
      transform: translate(-2px, -2px);
    }

    .quiz-option.selected {
      background: var(--gold);
      color: var(--ink);
      border-color: var(--gold-dark);
    }

    /* ---- QUIZ RESULT ---- */
    .quiz-result {
      display: none;
      text-align: center;
      animation: fadeIn 0.4s ease;
    }

    .quiz-result.active { display: block; }

    .result-badge {
      display: inline-block;
      background: var(--gold);
      color: var(--ink);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 6px 16px;
      margin-bottom: 24px;
    }

    .result-title {
      font-family: var(--font-head);
      font-weight: 800;
      font-size: clamp(1.75rem, 3.5vw, 2.5rem);
      margin-bottom: 16px;
    }

    .result-desc {
      color: var(--muted);
      max-width: 480px;
      margin: 0 auto 40px;
      font-size: 1.05rem;
      line-height: 1.7;
    }

    .result-email-form {
      display: flex;
      max-width: 480px;
      margin: 0 auto;
      border: var(--border-weight) solid var(--ink);
    }

    .result-email-form input {
      flex: 1;
      padding: 16px 20px;
      border: none;
      font-family: var(--font-body);
      font-size: 1rem;
      outline: none;
      background: var(--bg);
    }

    .result-email-form button {
      background: var(--gold);
      color: var(--ink);
      border: none;
      border-left: var(--border-weight) solid var(--ink);
      padding: 16px 28px;
      font-family: var(--font-head);
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: background 0.15s;
      white-space: nowrap;
    }

    .result-email-form button:hover { background: var(--gold-dark); }

    @media (max-width: 540px) {
      .result-email-form { flex-direction: column; }
      .result-email-form button { border-left: none; border-top: var(--border-weight) solid var(--ink); }
    }

    .result-note {
      margin-top: 12px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    /* ---- PROCESS ---- */
    .process-section {
      padding: 100px 0;
      background: var(--ink);
      color: var(--dark-text);
    }

    .process-header {
      margin-bottom: 64px;
    }

    .process-header .label { color: var(--gold); display: block; margin-bottom: 16px; }

    .process-steps {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
    }

    @media (max-width: 768px) {
      .process-steps { grid-template-columns: 1fr; }
    }

    .process-step {
      padding: 48px 40px;
      border-right: var(--border-weight) solid #333;
    }

    .process-step:last-child { border-right: none; }

    @media (max-width: 768px) {
      .process-step { border-right: none; border-bottom: var(--border-weight) solid #333; }
      .process-step:last-child { border-bottom: none; }
    }

    .step-number {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--gold);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 20px;
    }

    .process-step h3 {
      font-size: 1.5rem;
      margin-bottom: 16px;
      color: var(--dark-text);
    }

    .process-step p {
      color: #A0A0A0;
      line-height: 1.7;
      font-size: 0.95rem;
    }

    /* ---- STATS ---- */
    .stats-section {
      padding: 80px 0;
      background: var(--bg);
      border-top: var(--border-weight) solid var(--ink);
      border-bottom: var(--border-weight) solid var(--ink);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0;
    }

    @media (max-width: 900px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 480px) {
      .stats-grid { grid-template-columns: 1fr; }
    }

    .stat-item {
      padding: 40px 32px;
      border-right: var(--border-weight) solid var(--ink);
    }

    .stat-item:last-child { border-right: none; }

    @media (max-width: 900px) {
      .stat-item:nth-child(2) { border-right: none; }
      .stat-item:nth-child(3) { border-right: var(--border-weight) solid var(--ink); }
      .stat-item:nth-child(1),
      .stat-item:nth-child(2) { border-bottom: var(--border-weight) solid var(--ink); }
    }

    .stat-number {
      font-family: var(--font-head);
      font-weight: 800;
      font-size: clamp(3rem, 6vw, 5rem);
      line-height: 1;
      color: var(--ink);
      margin-bottom: 8px;
    }

    .stat-number span { color: var(--gold); }

    .stat-label {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--muted);
    }

    .stat-desc {
      margin-top: 8px;
      font-size: 0.9rem;
      color: var(--ink);
      line-height: 1.5;
    }

    /* ---- CTA BAND ---- */
    .cta-band {
      padding: 80px 0;
      background: var(--gold);
      border-top: var(--border-weight) solid var(--ink);
      border-bottom: var(--border-weight) solid var(--ink);
    }

    .cta-band-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
      flex-wrap: wrap;
    }

    .cta-band h2 {
      max-width: 600px;
      line-height: 1.1;
    }
  </style>
</head>
<body>

  <!-- NAVBAR -->
  <nav class="navbar">
    <div class="navbar-logo">Bridge <span>AI</span></div>
    <ul class="navbar-links">
      <li><a href="#quiz">Take the Quiz</a></li>
      <li><a href="#process">How It Works</a></li>
      <li><a href="insights.html">Insights</a></li>
    </ul>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="container">
      <div class="hero-inner">
        <span class="label hero-label">// Bridge AI Solutions</span>
        <h1>Stop doing work<br><em>AI can do.</em></h1>
        <p class="hero-sub">You already know AI can automate your busywork. We build the systems that actually do it — custom, clean, and handed off to you.</p>
        <div class="hero-actions">
          <a href="#quiz" class="btn btn-primary">Find Out What You Can Automate &rarr;</a>
          <span class="hero-or">or get updates</span>
          <form class="hero-email-form" onsubmit="handleHeroEmail(event)">
            <input type="email" placeholder="your@email.com" required>
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <hr class="rule">

  <!-- QUIZ -->
  <section id="quiz" class="quiz-section">
    <div class="container">
      <div class="quiz-header">
        <span class="label">2-Minute Assessment</span>
        <h2>What can AI automate for you?</h2>
        <p>Answer 3 quick questions and get a personalized automation roadmap.</p>
      </div>

      <div class="quiz-progress">
        <div class="quiz-progress-bar" id="progressBar" style="width: 0%"></div>
      </div>

      <div class="quiz-frame">

        <!-- Q1 -->
        <div class="quiz-question active" id="q1">
          <p class="quiz-q-label">Question 1 of 3</p>
          <h3 class="quiz-q-text">What type of work takes up most of your time right now?</h3>
          <div class="quiz-options">
            <button class="quiz-option" onclick="selectAnswer('q1', 'outreach')">Outreach &amp; follow-ups</button>
            <button class="quiz-option" onclick="selectAnswer('q1', 'admin')">Admin &amp; reporting</button>
            <button class="quiz-option" onclick="selectAnswer('q1', 'research')">Research &amp; data gathering</button>
            <button class="quiz-option" onclick="selectAnswer('q1', 'content')">Content &amp; communications</button>
          </div>
        </div>

        <!-- Q2 -->
        <div class="quiz-question" id="q2">
          <p class="quiz-q-label">Question 2 of 3</p>
          <h3 class="quiz-q-text">How much time per week do you spend on this?</h3>
          <div class="quiz-options">
            <button class="quiz-option" onclick="selectAnswer('q2', 'low')">1–3 hours</button>
            <button class="quiz-option" onclick="selectAnswer('q2', 'medium')">3–7 hours</button>
            <button class="quiz-option" onclick="selectAnswer('q2', 'high')">7–15 hours</button>
            <button class="quiz-option" onclick="selectAnswer('q2', 'extreme')">15+ hours</button>
          </div>
        </div>

        <!-- Q3 -->
        <div class="quiz-question" id="q3">
          <p class="quiz-q-label">Question 3 of 3</p>
          <h3 class="quiz-q-text">Have you tried any AI tools to solve this yet?</h3>
          <div class="quiz-options">
            <button class="quiz-option" onclick="selectAnswer('q3', 'none')">Not yet — don't know where to start</button>
            <button class="quiz-option" onclick="selectAnswer('q3', 'tried')">Tried a few things, nothing stuck</button>
            <button class="quiz-option" onclick="selectAnswer('q3', 'using')">Using some tools but want more</button>
            <button class="quiz-option" onclick="selectAnswer('q3', 'ready')">Ready to go — just need someone to build it</button>
          </div>
        </div>

        <!-- RESULT -->
        <div class="quiz-result" id="quizResult">
          <div class="result-badge" id="resultBadge">Your Result</div>
          <h2 class="result-title" id="resultTitle">Loading...</h2>
          <p class="result-desc" id="resultDesc"></p>
          <form class="result-email-form" onsubmit="handleResultEmail(event)">
            <input type="email" placeholder="your@email.com" required>
            <button type="submit">Get My Roadmap &rarr;</button>
          </form>
          <p class="result-note">No spam. Unsubscribe any time.</p>
        </div>

      </div>
    </div>
  </section>

  <hr class="rule">

  <!-- HOW IT WORKS -->
  <section id="process" class="process-section">
    <div class="container">
      <div class="process-header">
        <span class="label">How It Works</span>
        <h2>Three steps.<br>Zero guesswork.</h2>
      </div>
      <div class="process-steps">
        <div class="process-step">
          <p class="step-number">01 / Discover</p>
          <h3>We map your time</h3>
          <p>A 30-minute call to identify exactly which tasks are eating your hours and which are ready to automate.</p>
        </div>
        <div class="process-step">
          <p class="step-number">02 / Build</p>
          <h3>We build the system</h3>
          <p>Custom automation workflows designed around your tools, your workflow, and your compliance requirements.</p>
        </div>
        <div class="process-step">
          <p class="step-number">03 / Hand Off</p>
          <h3>You take the wheel</h3>
          <p>Full documentation, training, and ongoing support. You own it — we're here when you need us.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="stats-section">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number">10<span>+</span></div>
          <div class="stat-label">Hours saved / week</div>
          <div class="stat-desc">Average time recovered by clients in the first 30 days</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">80<span>%</span></div>
          <div class="stat-label">Of busywork is automatable</div>
          <div class="stat-desc">Research shows most repetitive tasks can be handled by AI today</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">3<span>x</span></div>
          <div class="stat-label">ROI in 90 days</div>
          <div class="stat-desc">Typical return on automation investment within the first quarter</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">2<span>wks</span></div>
          <div class="stat-label">Average build time</div>
          <div class="stat-desc">From discovery call to live, working automation system</div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA BAND -->
  <section class="cta-band">
    <div class="container">
      <div class="cta-band-inner">
        <h2>Want the full picture first?</h2>
        <a href="insights.html" class="btn btn-dark">Read the Research &rarr;</a>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer-inner">
        <div>
          <div class="footer-brand">Bridge <span>AI</span></div>
          <p style="color: #666; font-size: 0.85rem; margin-top: 8px; max-width: 260px; line-height: 1.6;">Custom AI automation for small businesses that are ready to stop doing work they shouldn't be doing.</p>
        </div>
        <nav class="footer-links">
          <a href="#quiz">Take the Quiz</a>
          <a href="#process">How It Works</a>
          <a href="insights.html">Insights</a>
          <a href="mailto:hello@bridgeaisolutions.com">Contact</a>
        </nav>
      </div>
      <p class="footer-copy">&copy; 2026 Bridge AI Solutions. All rights reserved.</p>
    </div>
  </footer>

  <script>
    // ---- QUIZ LOGIC ----
    const answers = {};
    const questions = ['q1', 'q2', 'q3'];
    let current = 0;

    const results = {
      high: {
        badge: 'High Automation Potential',
        title: "You're leaving serious time on the table.",
        desc: "Based on your answers, you're spending significant hours on work that AI can handle today. You're an ideal candidate for a custom automation build. Get your personalized roadmap below."
      },
      medium: {
        badge: 'Good Automation Fit',
        title: "There's a real opportunity here.",
        desc: "You've got a solid automation opportunity. A targeted system could meaningfully reduce your manual workload and free you up for higher-value work. Let's map it out."
      },
      ready: {
        badge: 'Ready to Build',
        title: "You're already in the right mindset.",
        desc: "You know what needs to happen — you just need someone to build it properly. Let's skip the intro and get straight to your custom roadmap."
      },
      low: {
        badge: 'Starting Point Identified',
        title: "Small wins, big momentum.",
        desc: "Even with lighter automation needs, the right system can compound over time. Get your starter roadmap and see what's possible from day one."
      }
    };

    function selectAnswer(questionId, value) {
      answers[questionId] = value;

      // Highlight selected
      const q = document.getElementById(questionId);
      q.querySelectorAll('.quiz-option').forEach(btn => btn.classList.remove('selected'));
      event.target.classList.add('selected');

      // Advance after short delay
      setTimeout(() => nextQuestion(), 300);
    }

    function nextQuestion() {
      current++;
      const progress = (current / 3) * 100;
      document.getElementById('progressBar').style.width = progress + '%';

      if (current < 3) {
        document.getElementById(questions[current - 1]).classList.remove('active');
        document.getElementById(questions[current]).classList.add('active');
      } else {
        // Show result
        document.getElementById(questions[current - 1]).classList.remove('active');
        showResult();
      }
    }

    function showResult() {
      const result = calculateResult();
      document.getElementById('resultBadge').textContent = result.badge;
      document.getElementById('resultTitle').textContent = result.title;
      document.getElementById('resultDesc').textContent = result.desc;
      document.getElementById('quizResult').classList.add('active');
      document.getElementById('progressBar').style.width = '100%';
    }

    function calculateResult() {
      if (answers.q3 === 'ready') return results.ready;
      if (answers.q2 === 'extreme' || answers.q2 === 'high') return results.high;
      if (answers.q2 === 'medium') return results.medium;
      return results.low;
    }

    function handleHeroEmail(e) {
      e.preventDefault();
      const email = e.target.querySelector('input').value;
      e.target.innerHTML = '<p style="color: var(--gold); font-family: var(--font-mono); font-size: 0.85rem; padding: 14px 0;">You\'re in. Check your inbox.</p>';
      console.log('Hero email:', email); // Replace with real integration
    }

    function handleResultEmail(e) {
      e.preventDefault();
      const email = e.target.querySelector('input').value;
      e.target.closest('.quiz-result').querySelector('.result-email-form').innerHTML =
        '<p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--gold); padding: 16px 0;">Roadmap on its way. Check your inbox.</p>';
      console.log('Result email:', email); // Replace with real integration
    }
  </script>

</body>
</html>
```

**Step 3: Open in browser and verify**

```bash
start "C:\Users\kerrk\OneDrive\Documents\Bridge AI Solutions\index.html"
```

Check:
- [ ] Navbar renders correctly with gold accent
- [ ] Hero full-viewport dark section loads
- [ ] "AI" watermark text visible faintly
- [ ] Quiz shows Q1 on load
- [ ] Selecting an answer advances to Q2, then Q3
- [ ] Result screen shows after Q3 with correct badge/title
- [ ] Email forms submit without errors (check console.log)
- [ ] Stats strip renders 4 columns
- [ ] Process section dark background correct
- [ ] CTA band gold background
- [ ] Footer dark

**Step 4: Commit**

```bash
cd "C:\Users\kerrk\OneDrive\Documents\Bridge AI Solutions"
git add index.html
git commit -m "feat: new landing page — editorial design, quiz, email capture"
```

---

## Task 3: Editorial Page — insights.html

**Files:**
- Create: `insights.html` (in root, alongside index.html)
- Source: `Assets/landing_page_v2.html` (content only — restyle completely)

**Context:**
Create `insights.html` by taking the content from the existing `landing_page_v2.html` (pain points, ROI stats, gap section, AI reality section, audience section, process detail, warning section) and restyling it in the new design system. Do NOT copy the old CSS — apply new classes. Add a sticky back-to-top CTA linking to `index.html`.

**Step 1: Read source content**

Read `Assets/landing_page_v2.html` focusing on the HTML structure (sections, headings, paragraphs, stats) from line 1145 onward. Identify the 6 key content sections to port:
1. Pain cards (section id="pain")
2. Gap section
3. Inaction section
4. Process section (section id="process")
5. ROI section (section id="results")
6. AI Reality section
7. Audience section
8. Warning section

**Step 2: Create insights.html**

Create `insights.html` at the project root with:
- Same navbar as `index.html`
- Page hero (dark, editorial-style): "The AI Automation Brief" with subtitle
- Each content section restyled using the global design system classes
- A floating "Get Started" button linking back to `index.html#quiz`
- Same footer as `index.html`
- Inline `<style>` block for page-specific layout

The page hero should read:
```html
<section class="insights-hero section section-dark">
  <div class="container">
    <span class="label" style="color: var(--gold); display:block; margin-bottom:16px;">// The AI Automation Brief</span>
    <h1>What AI can actually<br>do for your business.</h1>
    <p style="color:#A0A0A0; max-width:560px; margin-top:24px; font-size:1.1rem; line-height:1.7;">
      The real numbers. The honest limitations. And what's possible when you stop doing work AI can do.
    </p>
    <a href="index.html#quiz" class="btn btn-primary" style="margin-top:40px;">Find Out What You Can Automate &rarr;</a>
  </div>
</section>
```

**Step 3: Restyle pain point cards**

Replace old `.pain-card` styling with:
```css
.insight-card {
  border: var(--border-weight) solid var(--ink);
  padding: 40px;
  background: var(--bg);
  transition: transform 0.15s, box-shadow 0.15s;
}

.insight-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 5px 5px 0 var(--ink);
}

.insight-card .industry-tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--gold-dark);
  border: 1px solid var(--gold);
  padding: 4px 10px;
  display: inline-block;
  margin-bottom: 20px;
}

.insight-card .pain-stat {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #E0DDD9;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--ink);
  font-weight: 700;
}
```

**Step 4: Add floating CTA**

```html
<div class="floating-cta">
  <a href="index.html#quiz" class="btn btn-primary">Start Your Assessment &rarr;</a>
</div>

<style>
.floating-cta {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 50;
  box-shadow: 4px 4px 0 var(--ink);
}

@media (max-width: 540px) {
  .floating-cta { bottom: 16px; right: 16px; }
}
</style>
```

**Step 5: Verify in browser**

```bash
start "C:\Users\kerrk\OneDrive\Documents\Bridge AI Solutions\insights.html"
```

Check:
- [ ] Dark hero section renders correctly
- [ ] All content sections visible and readable
- [ ] Cards have correct borders and hover effects
- [ ] Floating CTA visible and links correctly to `index.html#quiz`
- [ ] Footer matches index.html footer

**Step 6: Commit**

```bash
cd "C:\Users\kerrk\OneDrive\Documents\Bridge AI Solutions"
git add insights.html
git commit -m "feat: add insights.html — editorial long-form content page"
```

---

## Task 4: Cross-Page Polish & QA

**Files:**
- Modify: `index.html` (minor tweaks based on review)
- Modify: `insights.html` (minor tweaks based on review)

**Step 1: Mobile responsiveness check**

Open both pages in browser dev tools (F12 → Toggle Device Toolbar) and test at:
- 375px (iPhone SE)
- 768px (tablet)

Check for:
- [ ] Text doesn't overflow containers
- [ ] Quiz options stack to single column on mobile
- [ ] Navbar links hidden on mobile (already handled in CSS)
- [ ] Stats grid goes to 2-col on tablet, 1-col on mobile
- [ ] Process steps stack vertically on mobile
- [ ] Hero email form stacks on mobile

Fix any issues found.

**Step 2: Test quiz all paths**

Run through all 3 questions and verify all 4 result variants display correctly:
- Answer Q3 = "ready" → "Ready to Build" result
- Answer Q2 = "extreme" + Q3 ≠ ready → "High Automation Potential" result
- Answer Q2 = "medium" + Q3 ≠ ready → "Good Automation Fit" result
- Answer Q2 = "low" + Q3 ≠ ready → "Starting Point Identified" result

**Step 3: Verify cross-page links**

- [ ] Navbar "Insights" on `index.html` → `insights.html`
- [ ] CTA band "Read the Research" on `index.html` → `insights.html`
- [ ] Floating CTA on `insights.html` → `index.html#quiz`
- [ ] Footer "Insights" link on `index.html` → `insights.html`

**Step 4: Commit final polish**

```bash
cd "C:\Users\kerrk\OneDrive\Documents\Bridge AI Solutions"
git add index.html insights.html
git commit -m "fix: mobile responsiveness and cross-page link QA"
```

---

## Task 5: Deploy to Vercel

**Step 1: Verify vercel.json**

Read `vercel.json` to confirm routing config is correct (no redirect to old `Assets/landing_page_v2.html`).

**Step 2: Update vercel.json if needed**

If `vercel.json` has a redirect to the old page, update it to route `/` to `index.html` (which is now the actual page, not a redirect).

**Step 3: Push to main**

```bash
cd "C:\Users\kerrk\OneDrive\Documents\Bridge AI Solutions"
git push origin main
```

**Step 4: Monitor Vercel deployment**

Check the Vercel dashboard for deployment status. Once live:
- [ ] Visit the production URL
- [ ] Confirm `index.html` loads (not the old redirect)
- [ ] Confirm `insights.html` accessible at `/insights`
- [ ] Run quiz end-to-end on production

**Step 5: Commit updated vercel.json if changed**

```bash
git add vercel.json
git commit -m "fix: update vercel routing for new two-page structure"
git push origin main
```

---

## Out of Scope (Next Phase)
- Real email capture backend (Mailchimp/ConvertKit integration)
- Quiz result email automation
- Analytics (GA4 or Plausible)
- Contact form backend
