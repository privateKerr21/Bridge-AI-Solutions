# Bridge AI Solutions Additions — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add logo to footers on all pages, build a pricing page with 3 tiers, upgrade email forms to a swap-ready async handler, and add a Pricing nav link across all pages.

**Architecture:** All vanilla HTML/CSS/JS. Shared styles live in `Assets/Brand/styles.css`. Each page has inline page-specific styles. Logo uses `filter: invert(1)` to work on the dark footer without a separate asset. Email handler posts to `/api/subscribe` (placeholder) with full payload including quiz answers for future segmentation.

**Tech Stack:** HTML5, CSS3 custom properties, vanilla JS (async/await), Google Fonts (already loaded), Vercel static hosting

---

## Task 1: Footer logo styles + logo on index.html and insights.html

**Files:**
- Modify: `Assets/Brand/styles.css`
- Modify: `index.html`
- Modify: `insights.html`

**Step 1: Add footer logo CSS to styles.css**

Read `Assets/Brand/styles.css` first. Then add these rules after the `.footer-copy` block:

```css
/* --- Footer Logo --- */
.footer-logo-wrap {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--border-dark);
}

.footer-logo {
  width: 120px;
  height: auto;
  filter: invert(1);
  opacity: 0.85;
  display: inline-block;
}
```

**Step 2: Add logo to index.html footer**

Read `index.html`. Find the `<footer class="footer">` element. Inside the `<div class="container">`, add the logo wrap as the FIRST child, before `.footer-inner`:

```html
<div class="footer-logo-wrap">
  <img src="Assets/Brand/Logos/transparent/hero_logo.png"
       alt="Bridge AI Solutions logo"
       class="footer-logo">
</div>
```

The full footer structure should be:
```html
<footer class="footer">
  <div class="container">
    <div class="footer-logo-wrap">
      <img src="Assets/Brand/Logos/transparent/hero_logo.png"
           alt="Bridge AI Solutions logo"
           class="footer-logo">
    </div>
    <div class="footer-inner">...</div>
    <p class="footer-copy">...</p>
  </div>
</footer>
```

**Step 3: Add logo to insights.html footer**

Read `insights.html`. Make the identical footer change — same logo wrap HTML, same position (first child inside `.container`). The `src` path is the same since both files are at the project root.

**Step 4: Verify**

Open `http://localhost:2123` and `http://localhost:2123/insights.html` in browser. Confirm:
- [ ] Logo appears in the footer on both pages
- [ ] Logo is white (inverted) on the dark footer
- [ ] Logo is roughly 120px wide and centered
- [ ] Border-bottom divider appears between logo and footer-inner

**Step 5: Commit**

```bash
cd "C:\Users\kerrk\OneDrive\Documents\Bridge AI Solutions"
git add Assets/Brand/styles.css index.html insights.html
git commit -m "feat: add Bridge AI logo to footer on all pages"
```

---

## Task 2: Add Pricing nav link to index.html and insights.html

**Files:**
- Modify: `index.html`
- Modify: `insights.html`

**Context:** The navbar on both pages currently has 3 links. We're adding "Pricing" as a 4th link. Do this BEFORE building pricing.html so the link exists on all pages consistently.

**Step 1: Update navbar in index.html**

Read `index.html`. Find the `<ul class="navbar-links">`. Add a 4th list item:

```html
<li><a href="pricing.html">Pricing</a></li>
```

Insert it after the "Insights" link, so the order is: Take the Quiz → How It Works → Insights → Pricing.

**Step 2: Update navbar in insights.html**

Read `insights.html`. Find `<ul class="navbar-links">`. Add the same 4th item:

```html
<li><a href="pricing.html">Pricing</a></li>
```

**Step 3: Commit**

```bash
cd "C:\Users\kerrk\OneDrive\Documents\Bridge AI Solutions"
git add index.html insights.html
git commit -m "feat: add Pricing nav link to index and insights pages"
```

---

## Task 3: Pricing page — pricing.html

**Files:**
- Create: `pricing.html`

**Context:** New standalone page at the project root. Imports the same `Assets/Brand/styles.css`. Page-specific styles in an inline `<style>` block. Same navbar (4 links) and footer (with logo) as other pages. The middle tier (Full System) is featured with a gold border and "Most Popular" badge.

**Step 1: Create pricing.html**

Create `pricing.html` at `C:\Users\kerrk\OneDrive\Documents\Bridge AI Solutions\pricing.html` with the following complete structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bridge AI Solutions — Pricing</title>
  <meta name="description" content="Simple, transparent pricing for AI automation. No retainers, no surprises. One-time project fees for custom AI automation builds.">
  <link rel="icon" type="image/jpeg" href="Assets/Brand/Logos/bridge_ai_logo%20(1).jpg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="Assets/Brand/styles.css">
  <style>
    /* ---- HERO ---- */
    .pricing-hero {
      background: var(--dark-bg);
      color: var(--dark-text);
      padding: 100px 0 80px;
    }

    .pricing-hero .label {
      color: var(--gold);
      display: block;
      margin-bottom: 16px;
    }

    .pricing-hero h1 {
      margin-bottom: 20px;
    }

    .pricing-hero p {
      color: #A0A0A0;
      font-size: 1.1rem;
      max-width: 520px;
      line-height: 1.7;
    }

    /* ---- PRICING SECTION ---- */
    .pricing-section {
      padding: 100px 0;
      background: var(--bg);
      border-bottom: var(--border-weight) solid var(--ink);
    }

    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
      border: var(--border-weight) solid var(--ink);
      margin-bottom: 48px;
    }

    @media (max-width: 768px) {
      .pricing-grid {
        grid-template-columns: 1fr;
      }
    }

    .pricing-card {
      padding: 48px 40px;
      border-right: var(--border-weight) solid var(--ink);
      position: relative;
      background: var(--bg);
      transition: transform 0.15s ease;
    }

    .pricing-card:last-child {
      border-right: none;
    }

    @media (max-width: 768px) {
      .pricing-card {
        border-right: none;
        border-bottom: var(--border-weight) solid var(--ink);
      }
      .pricing-card:last-child {
        border-bottom: none;
      }
    }

    .pricing-card.featured {
      background: var(--ink);
      color: var(--dark-text);
      transform: translateY(-4px);
      box-shadow: 0 8px 0 var(--gold);
    }

    @media (max-width: 768px) {
      .pricing-card.featured {
        transform: none;
        box-shadow: inset 4px 0 0 var(--gold);
      }
    }

    .popular-badge {
      display: inline-block;
      background: var(--gold);
      color: var(--ink);
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 4px 12px;
      margin-bottom: 24px;
    }

    .tier-name {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--muted);
      margin-bottom: 12px;
    }

    .pricing-card.featured .tier-name {
      color: #A0A0A0;
    }

    .tier-price {
      font-family: var(--font-head);
      font-weight: 800;
      font-size: clamp(2rem, 4vw, 3rem);
      line-height: 1;
      margin-bottom: 4px;
      color: var(--ink);
    }

    .pricing-card.featured .tier-price {
      color: var(--dark-text);
    }

    .tier-type {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 16px;
    }

    .pricing-card.featured .tier-type {
      color: #A0A0A0;
    }

    .tier-monthly {
      font-family: var(--font-head);
      font-weight: 600;
      font-size: 1rem;
      color: var(--gold);
      margin-bottom: 4px;
    }

    .tier-monthly-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 32px;
    }

    .pricing-card.featured .tier-monthly-label {
      color: #A0A0A0;
    }

    .tier-divider {
      border: none;
      border-top: 1px solid var(--border-light);
      margin: 0 0 32px;
    }

    .pricing-card.featured .tier-divider {
      border-top-color: #333;
    }

    .tier-features {
      list-style: none;
      margin: 0 0 40px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .tier-features li {
      font-size: 0.95rem;
      line-height: 1.5;
      padding-left: 20px;
      position: relative;
      color: var(--ink);
    }

    .pricing-card.featured .tier-features li {
      color: var(--dark-text);
    }

    .tier-features li::before {
      content: '→';
      position: absolute;
      left: 0;
      color: var(--gold);
      font-weight: 700;
    }

    .tier-note {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--muted);
      line-height: 1.6;
      margin-bottom: 32px;
      font-style: italic;
    }

    .pricing-card.featured .tier-note {
      color: #888;
    }

    .pricing-disclaimer {
      text-align: center;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--muted);
      line-height: 1.7;
      max-width: 640px;
      margin: 0 auto;
    }

    /* ---- FAQ ---- */
    .faq-section {
      padding: 100px 0;
      background: var(--dark-bg);
      color: var(--dark-text);
    }

    .faq-section .label {
      color: var(--gold);
      display: block;
      margin-bottom: 16px;
    }

    .faq-section h2 {
      margin-bottom: 64px;
      max-width: 560px;
    }

    .faq-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0;
      border: var(--border-weight) solid #333;
    }

    @media (max-width: 640px) {
      .faq-grid {
        grid-template-columns: 1fr;
      }
    }

    .faq-item {
      padding: 40px;
      border-right: var(--border-weight) solid #333;
      border-bottom: var(--border-weight) solid #333;
    }

    .faq-item:nth-child(2),
    .faq-item:nth-child(4) {
      border-right: none;
    }

    .faq-item:nth-child(3),
    .faq-item:nth-child(4) {
      border-bottom: none;
    }

    @media (max-width: 640px) {
      .faq-item {
        border-right: none;
      }
      .faq-item:last-child {
        border-bottom: none;
      }
    }

    .faq-q {
      font-family: var(--font-head);
      font-weight: 700;
      font-size: 1.1rem;
      margin-bottom: 16px;
      line-height: 1.3;
      color: var(--dark-text);
    }

    .faq-a {
      color: #A0A0A0;
      font-size: 0.95rem;
      line-height: 1.7;
    }

    /* ---- CTA BAND ---- */
    .pricing-cta {
      padding: 80px 0;
      background: var(--gold);
      border-top: var(--border-weight) solid var(--ink);
      border-bottom: var(--border-weight) solid var(--ink);
    }

    .pricing-cta-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
      flex-wrap: wrap;
    }

    .pricing-cta h2 {
      max-width: 500px;
    }
  </style>
</head>
<body>

  <!-- NAVBAR -->
  <nav class="navbar">
    <a href="index.html" class="navbar-logo">Bridge <span>AI</span></a>
    <ul class="navbar-links">
      <li><a href="index.html#quiz">Take the Quiz</a></li>
      <li><a href="index.html#process">How It Works</a></li>
      <li><a href="insights.html">Insights</a></li>
      <li><a href="pricing.html" aria-current="page">Pricing</a></li>
    </ul>
  </nav>

  <main>

    <!-- HERO -->
    <section class="pricing-hero">
      <div class="container">
        <span class="label">// Pricing</span>
        <h1>Simple, transparent<br>pricing.</h1>
        <p>No retainers. No surprises. You pay for what gets built.</p>
      </div>
    </section>

    <hr class="rule">

    <!-- PRICING GRID -->
    <section class="pricing-section">
      <div class="container">

        <div class="pricing-grid">

          <!-- TIER 1: Starter -->
          <div class="pricing-card">
            <p class="tier-name">Starter Automation</p>
            <div class="tier-price">$500</div>
            <div class="tier-type">One-time project fee</div>
            <div class="tier-monthly">+ $300–$500<span style="font-size:0.75rem;font-weight:500">/mo</span></div>
            <div class="tier-monthly-label">Estimated tools &amp; APIs</div>
            <hr class="tier-divider">
            <ul class="tier-features">
              <li>1 automated workflow</li>
              <li>Single tool integration</li>
              <li>Setup + documentation</li>
              <li>1 revision round</li>
            </ul>
            <p class="tier-note">Best for: one specific task eating your time — outreach follow-ups, data entry, report generation.</p>
            <a href="mailto:hello@bridgeaisolutions.com?subject=Starter Automation Inquiry" class="btn btn-dark" style="width:100%;text-align:center;">Book a Discovery Call &rarr;</a>
          </div>

          <!-- TIER 2: Full System (FEATURED) -->
          <div class="pricing-card featured">
            <div class="popular-badge">Most Popular</div>
            <p class="tier-name">Full System</p>
            <div class="tier-price">$1,500–$2,000</div>
            <div class="tier-type">One-time project fee</div>
            <div class="tier-monthly">+ $500–$800<span style="font-size:0.75rem;font-weight:500">/mo</span></div>
            <div class="tier-monthly-label">Estimated tools &amp; APIs</div>
            <hr class="tier-divider">
            <ul class="tier-features">
              <li>3–5 interconnected workflows</li>
              <li>Multi-tool integration</li>
              <li>Google Sheets dashboard</li>
              <li>Full testing + handoff</li>
              <li>2 revision rounds</li>
            </ul>
            <p class="tier-note">Best for: replacing an entire category of work — lead gen, client onboarding, reporting pipelines.</p>
            <a href="mailto:hello@bridgeaisolutions.com?subject=Full System Inquiry" class="btn btn-primary" style="width:100%;text-align:center;">Book a Discovery Call &rarr;</a>
          </div>

          <!-- TIER 3: Ongoing Operations -->
          <div class="pricing-card">
            <p class="tier-name">Ongoing Operations</p>
            <div class="tier-price">Custom</div>
            <div class="tier-type">One-time build + monthly retainer</div>
            <div class="tier-monthly">Tools bundled</div>
            <div class="tier-monthly-label">in monthly retainer</div>
            <hr class="tier-divider">
            <ul class="tier-features">
              <li>Everything in Full System</li>
              <li>Ongoing monitoring &amp; updates</li>
              <li>Monthly strategy calls</li>
              <li>Priority support</li>
              <li>Quarterly automation audit</li>
            </ul>
            <p class="tier-note">Best for: businesses ready to treat AI as infrastructure — not a one-time project.</p>
            <a href="mailto:hello@bridgeaisolutions.com?subject=Ongoing Operations Inquiry" class="btn btn-dark" style="width:100%;text-align:center;">Let's Talk &rarr;</a>
          </div>

        </div>

        <p class="pricing-disclaimer">
          Tool and API costs vary by provider and usage volume.<br>
          We'll give you an exact estimate during your free discovery call.
        </p>

      </div>
    </section>

    <!-- FAQ -->
    <section class="faq-section">
      <div class="container">
        <span class="label">Common Questions</span>
        <h2>Before you book.</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <p class="faq-q">What's included in the project fee?</p>
            <p class="faq-a">The fee covers your discovery call, the full build, documentation so you understand what was built, and the revision rounds listed in your tier. You own everything delivered.</p>
          </div>
          <div class="faq-item">
            <p class="faq-q">How long does a build take?</p>
            <p class="faq-a">Starter builds typically take about a week. Full System builds run 2–3 weeks from the discovery call. Timelines depend on complexity and your availability for feedback rounds.</p>
          </div>
          <div class="faq-item">
            <p class="faq-q">What if I need changes after handoff?</p>
            <p class="faq-a">Revision rounds are included in each tier. Changes beyond those are billed at an hourly rate we'll agree on upfront. Ongoing Operations clients get continuous updates included.</p>
          </div>
          <div class="faq-item">
            <p class="faq-q">Do you work with my existing tools?</p>
            <p class="faq-a">We work with most major platforms — Zapier, Make, Google Workspace, Airtable, HubSpot, Slack, and more. Bring your stack to the discovery call and we'll tell you exactly what's possible.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA BAND -->
    <section class="pricing-cta">
      <div class="container">
        <div class="pricing-cta-inner">
          <h2>Not sure which tier fits?</h2>
          <a href="mailto:hello@bridgeaisolutions.com?subject=Discovery Call Request" class="btn btn-dark">Book a Free Discovery Call &rarr;</a>
        </div>
      </div>
    </section>

  </main>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer-logo-wrap">
        <img src="Assets/Brand/Logos/transparent/hero_logo.png"
             alt="Bridge AI Solutions logo"
             class="footer-logo">
      </div>
      <div class="footer-inner">
        <div>
          <div class="footer-brand">Bridge <span>AI</span></div>
          <p style="color:#666;font-size:0.85rem;margin-top:8px;max-width:260px;line-height:1.6;">Custom AI automation for small businesses that are ready to stop doing work they shouldn't be doing.</p>
        </div>
        <nav class="footer-links">
          <a href="index.html#quiz">Take the Quiz</a>
          <a href="index.html#process">How It Works</a>
          <a href="insights.html">Insights</a>
          <a href="pricing.html" aria-current="page">Pricing</a>
          <a href="mailto:hello@bridgeaisolutions.com">Contact</a>
        </nav>
      </div>
      <p class="footer-copy">&copy; 2026 Bridge AI Solutions. All rights reserved.</p>
    </div>
  </footer>

</body>
</html>
```

**Step 2: Verify in browser**

Open `http://localhost:2123/pricing.html`. Check:
- [ ] Dark hero with gold label renders
- [ ] All 3 pricing cards visible
- [ ] Middle card (Full System) has dark background + "Most Popular" gold badge + bottom gold shadow
- [ ] Monthly cost line in gold on all cards
- [ ] Feature list arrows (→) in gold
- [ ] FAQ grid renders as 2×2
- [ ] Gold CTA band at bottom
- [ ] Footer with logo

**Step 3: Commit**

```bash
cd "C:\Users\kerrk\OneDrive\Documents\Bridge AI Solutions"
git add pricing.html
git commit -m "feat: add pricing page with 3 tiers and FAQ"
```

---

## Task 4: Add Pricing nav link to pricing.html + update all navbars

**Files:**
- Modify: `index.html`
- Modify: `insights.html`

**Context:** pricing.html already has "Pricing" in its navbar (built in Task 3). Now add it to the other two pages.

**Step 1: Update navbar in index.html**

Read `index.html`. Find `<ul class="navbar-links">`. The current 3 items are: Take the Quiz, How It Works, Insights. Add a 4th:

```html
<li><a href="pricing.html">Pricing</a></li>
```

Also add "Pricing" to the footer links in index.html, after "Insights":
```html
<a href="pricing.html">Pricing</a>
```

**Step 2: Update navbar in insights.html**

Read `insights.html`. Same change — add `<li><a href="pricing.html">Pricing</a></li>` to the navbar.

Also add "Pricing" to the footer links in insights.html, after "Insights" (which has `aria-current="page"`) and before "Contact".

**Step 3: Verify**

Open `http://localhost:2123` and `http://localhost:2123/insights.html`. Confirm "Pricing" appears in the navbar on both pages and links to pricing.html.

**Step 4: Commit**

```bash
cd "C:\Users\kerrk\OneDrive\Documents\Bridge AI Solutions"
git add index.html insights.html
git commit -m "feat: add Pricing nav and footer link to all pages"
```

---

## Task 5: Upgrade email handlers on index.html

**Files:**
- Modify: `index.html`

**Context:** index.html has two email forms: (1) hero email form with `handleHeroEmail(event)`, (2) quiz result form with `handleResultEmail(event)`. Both currently just console.log and replace themselves. Upgrade to async fetch with loading state, error handling, and full quiz payload.

**Step 1: Read index.html**

Read the current `handleHeroEmail`, `handleResultEmail`, and `calculateResult` functions. Note the exact element IDs and structure.

**Step 2: Replace the JS email handlers**

In the `<script>` block, replace `handleHeroEmail` and `handleResultEmail` with the following upgraded versions. Keep all other JS (quiz logic) unchanged.

```javascript
// ---- EMAIL SUBMISSION ----

async function submitEmail(email, source, quizAnswers = {}) {
  const payload = {
    email,
    source,
    quizAnswers,
    timestamp: new Date().toISOString(),
    page: window.location.pathname
  };

  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) throw new Error('Subscribe request failed');
  return response;
}

function showEmailError(container) {
  const err = document.createElement('p');
  err.style.cssText = 'font-family:var(--font-mono);font-size:0.8rem;color:var(--muted);margin-top:12px;line-height:1.6;';
  err.textContent = 'Something went wrong — email us directly at hello@bridgeaisolutions.com';
  container.appendChild(err);
}

async function handleHeroEmail(e) {
  e.preventDefault();
  const form = e.target;
  const input = form.querySelector('input[type="email"]');
  const btn = form.querySelector('button[type="submit"]');
  const email = input.value;

  // Loading state
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    await submitEmail(email, 'hero');
    // Success
    form.innerHTML = '<p style="color:var(--gold);font-family:var(--font-mono);font-size:0.85rem;padding:14px 0;">You\'re in. Check your inbox.</p>';
  } catch (err) {
    // Reset button and show error
    btn.textContent = originalText;
    btn.disabled = false;
    showEmailError(form);
    console.error('Hero email error:', err);
  }
}

async function handleResultEmail(e) {
  e.preventDefault();
  const form = e.target;
  const input = form.querySelector('input[type="email"]');
  const btn = form.querySelector('button[type="submit"]');
  const email = input.value;

  // Loading state
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    await submitEmail(email, 'quiz-result', { ...answers });
    // Success
    const confirmation = document.createElement('p');
    confirmation.style.cssText = 'font-family:var(--font-mono);font-size:0.85rem;color:var(--gold);padding:16px 0;';
    confirmation.textContent = 'Roadmap on its way. Check your inbox.';
    form.replaceWith(confirmation);
  } catch (err) {
    btn.textContent = originalText;
    btn.disabled = false;
    showEmailError(form);
    console.error('Result email error:', err);
  }
}
```

**Step 3: Verify behavior in browser**

Open `http://localhost:2123`. Test each form:

**Hero form — success path:** The fetch to `/api/subscribe` will fail (404) because the endpoint doesn't exist. That's expected — verify the error message appears: "Something went wrong — email us directly at hello@bridgeaisolutions.com"

**Hero form — to verify success path works:** Temporarily add a mock at the top of the script block:
```javascript
// TEMP: mock fetch for local testing — remove before production
const _realFetch = window.fetch;
window.fetch = async (url, opts) => {
  if (url === '/api/subscribe') return new Response('{}', { status: 200 });
  return _realFetch(url, opts);
};
```
Then verify the success confirmation appears. Remove the mock after testing.

**Step 4: Remove the mock and commit**

```bash
cd "C:\Users\kerrk\OneDrive\Documents\Bridge AI Solutions"
git add index.html
git commit -m "feat: upgrade email handlers — async fetch, loading state, error handling, quiz payload"
```

---

## Task 6: Push to Vercel

**Step 1: Verify clean state**

```bash
cd "C:\Users\kerrk\OneDrive\Documents\Bridge AI Solutions"
git status
git log --oneline -8
```

Confirm all 5 feature commits are present and working tree is clean.

**Step 2: Push to main**

```bash
git push origin main
```

**Step 3: Verify Vercel deployment**

After push, check:
- [ ] `https://[your-vercel-url]/` — logo in footer, "Pricing" in navbar
- [ ] `https://[your-vercel-url]/pricing` — pricing page loads
- [ ] `https://[your-vercel-url]/insights` — logo in footer, "Pricing" in navbar
- [ ] Hero email form shows error state correctly (fetch to /api/subscribe fails gracefully)
