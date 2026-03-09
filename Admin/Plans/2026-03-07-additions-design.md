# Bridge AI Solutions — Additions Design Doc

**Date**: 2026-03-07
**Status**: Approved
**Author**: Claude (Bridge AI Solutions session)

---

## Overview

Three additions to the existing two-page website (index.html + insights.html):

1. **Logo in footer** — surface `hero_logo.png` on both pages
2. **Pricing page** — new `pricing.html` with 3 tiers
3. **Email handler upgrade** — swap-ready `fetch()` with loading state, error handling, quiz payload

---

## Addition 1: Logo in Footer

**Both `index.html` and `insights.html`**

Add the `hero_logo.png` image to the footer on both pages, centered above the `.footer-inner` content block.

**File:** `Assets/Brand/Logos/transparent/hero_logo.png`

**Placement:**
```html
<footer class="footer">
  <div class="container">
    <div class="footer-logo-wrap">
      <img src="Assets/Brand/Logos/transparent/hero_logo.png"
           alt="Bridge AI Solutions"
           class="footer-logo">
    </div>
    <div class="footer-inner">...</div>
    <p class="footer-copy">...</p>
  </div>
</footer>
```

**CSS (in styles.css):**
```css
.footer-logo-wrap {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #2a2a2a;
}

.footer-logo {
  width: 120px;
  height: auto;
  filter: invert(1);  /* flips black logo to white on dark footer */
  opacity: 0.85;
}
```

The `filter: invert(1)` converts the black logo to white for the dark footer background. No separate white asset needed.

---

## Addition 2: Pricing Page (`pricing.html`)

**New page at project root.**

### Layout

```
[ Navbar ] — same as other pages
[ Hero — dark ] — "Simple, transparent pricing."
[ Pricing Grid — 3 tiers ]
[ FAQ Strip — 4 questions ]
[ CTA Band — gold ]
[ Footer — with logo ]
```

### Hero
- `.label` (gold): "// Pricing"
- `h1`: "Simple, transparent pricing."
- Subtext: "No retainers. No surprises. You pay for what gets built."

### Pricing Grid (3-col, collapses to 1-col on mobile ≤768px)

**Tier 1 — Starter Automation**
- Price: `$500` one-time
- Monthly: `+ $300–$500/mo` tools & APIs
- Features:
  - 1 automated workflow
  - Single tool integration
  - Setup + documentation
  - 1 revision round
- CTA: "Book a Discovery Call →" (mailto or anchor)
- Note: "Most starter builds run on commonly available tools"

**Tier 2 — Full System** ← FEATURED (gold border + "Most Popular" badge)
- Price: `$1,500–$2,000` one-time
- Monthly: `+ $500–$800/mo` tools & APIs
- Features:
  - 3–5 interconnected workflows
  - Multi-tool integration
  - Google Sheets dashboard
  - Full testing + handoff
  - 2 revision rounds
- CTA: "Book a Discovery Call →"

**Tier 3 — Ongoing Operations**
- Price: `Custom` one-time build
- Monthly: `Tools bundled in retainer`
- Features:
  - Everything in Full System
  - Ongoing monitoring & updates
  - Monthly strategy calls
  - Priority support
  - Quarterly automation audit
- CTA: "Let's Talk →"

**Disclaimer below grid:**
> "Tool and API costs vary by provider and usage. We'll give you an exact estimate during your discovery call."

### FAQ Strip (light background)
4 Q&A items in 2-column grid:
- "What's included in the project fee?" — Discovery call, build, documentation, revisions as specified
- "How long does a build take?" — Starter: ~1 week. Full System: 2–3 weeks from discovery call
- "What if I need changes after handoff?" — Revision rounds included; additional changes billed hourly
- "Do you work with my tools?" — We work with most major platforms. Bring your stack to the discovery call.

### CTA Band (gold)
- h2: "Not sure which tier fits?"
- Button (dark): "Book a Free Discovery Call →" — links to mailto:hello@bridgeaisolutions.com

### Navbar links
Same as other pages: "Take the Quiz" (index.html#quiz), "How It Works" (index.html#process), "Insights" (insights.html)

Add "Pricing" link to navbar on ALL three pages (index.html, insights.html, pricing.html).

---

## Addition 3: Email Handler Upgrade

**Both `index.html` forms: hero email form + quiz result email form**

### Current state
Both forms `console.log` the email and replace themselves with a static confirmation string.

### New behavior

```javascript
async function submitEmail(email, source, quizAnswers = {}) {
  const payload = {
    email,
    source,           // 'hero' or 'quiz-result'
    quizAnswers,      // { q1: 'outreach', q2: 'high', q3: 'ready' }
    timestamp: new Date().toISOString(),
    page: window.location.pathname
  };

  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) throw new Error('Subscribe failed');
  return response;
}
```

### UX states

**Loading:** Button text changes to "Sending..." and is disabled during the fetch.

**Success:** Current confirmation messages (already designed and approved).

**Error:** Inline message below the form:
```
"Something went wrong — email us directly at hello@bridgeaisolutions.com"
```
Error shown in `var(--muted)` text, Space Mono font.

### Integration swap
When ready to connect a real provider, replace the `fetch('/api/subscribe', ...)` call with the provider's endpoint. The payload structure (email, source, quizAnswers, timestamp) is already shaped for segmentation.

---

## File Changes Summary

| File | Change |
|---|---|
| `Assets/Brand/styles.css` | Add `.footer-logo-wrap` and `.footer-logo` styles |
| `index.html` | Add logo to footer; upgrade email handlers; add "Pricing" to navbar |
| `insights.html` | Add logo to footer; add "Pricing" to navbar |
| `pricing.html` | Create new page |

---

## Out of Scope
- Real email backend integration
- Booking calendar embed
- Pricing page linked from quiz result (future enhancement)
