# Codebase Audit — 2026-04-29

Senior-engineer review of the static site (`index.html`, `insights.html`, `pricing.html` + `Assets/Brand/styles.css`).

## Real bugs (fix first)

### 1. Quiz email template is silently broken — HIGH
- File: `index.html:1189–1192`
- `buildEmailDraft()` checks for badge names `'High Automation Potential'` and `'Good Automation Fit'`, but the actual badge values rendered (lines `1096`, `1100`, `1105`, `1110`) are `'High Build Potential'` and `'Good Fit for a Custom Build'`.
- Result: every email subject falls through to the `'low'` template. People who scored "high potential" still get the consolation-prize email.
- Fix: align the keys in the lookup with the strings actually written to `result.badge`.

### 2. Mobile navbar dies at <768px with no fallback — HIGH
- File: `Assets/Brand/styles.css:272`
- `navbar-links` and `navbar-cta` are hidden at the breakpoint with no hamburger menu or alternative.
- Result: mobile visitors cannot reach Pricing, Insights, Use Cases, or any of the in-page section links.
- Fix: add a hamburger toggle + slide-down menu, or at minimum surface the CTAs vertically below the logo.

### 3. Broken insights article link — HIGH
- File: `insights.html:1181`
- Links to `insights/no-code-vs-custom-ai.html`. The relative path resolves wrong from `/insights.html` (which already lives at the root, not under `/insights/`).
- Fix: use `./no-code-vs-custom-ai.html` or absolute `/insights/no-code-vs-custom-ai.html` and confirm the actual file location.

### 4. Quiz progress bar caps at 66% — MEDIUM
- File: `index.html:1128`
- `progress = (completed / 3) * 100` uses the previous index — final question shows 66%, not 100%, until `showResult()` runs.
- Fix: `progress = ((completed + 1) / 3) * 100` or move the calc after the answer is recorded.

### 5. Clipboard copy fails silently if denied — MEDIUM
- File: `index.html:1218`
- `navigator.clipboard.writeText()` has no `.catch()`. In private mode or denied-permission browsers the button text never reverts and the user thinks nothing happened.
- Fix: wrap in try/catch or `.then(...).catch(showFallback)` that shows the email content in a textarea selectable manually.

## Conversion / SEO leaks (low effort, high return)

### 6. No Open Graph or Twitter meta tags — HIGH
- All three main pages. Every shared link looks broken in social previews.
- Add: `og:image`, `og:title`, `og:description`, `twitter:card`, `twitter:image` per page.

### 7. No canonical URLs — MEDIUM
- Crawlers may treat `/pricing` and `/pricing.html` as duplicates.
- Add: `<link rel="canonical" href="https://bridgeaisolutions.com/pricing" />` etc per page.

### 8. Missing accessibility markup — MEDIUM
- No `aria-label` on icon buttons (copy button on the email draft)
- No `aria-current="page"` on `index.html`'s nav (other pages have it)
- Quiz buttons are bare `<button>` with inline `onclick` — no semantic form structure
- Hero logo `alt="Bridge AI Solutions mark"` is generic
- Fails WCAG 2.1 AA in obvious ways. Locks out screen readers.

### 9. Missing `rel="noopener noreferrer"` on `target="_blank"` links — LOW
- Calendly links have `rel="noopener"`, LinkedIn / Product Hunt structured-data links don't.

## Architectural smell

### 10. 600–850 lines of inline `<style>` per HTML file — MEDIUM
- Every page has its own `<style>` block re-defining shared patterns (sections, cards, grids, buttons).
- `Assets/Brand/styles.css` exists but isn't doing its job — page-specific blocks should extract to it.
- Adding a fourth page = copy-paste hell. Refactor before next addition.

### 11. Inline `style="..."` snippets across CTAs — LOW
- Pricing buttons (`pricing.html:427, 450, 472`) repeat `style="width:100%;box-sizing:border-box;text-align:center;"`
- Insights body intro paragraphs repeat `style="color:var(--muted-light);max-width:640px;font-size:1.05rem;line-height:1.75;margin-bottom:0;"`
- Extract to utility classes (`.btn-full`, `.lede`).

## Performance polish

### 12. Fonts not preloaded — LOW
- `index.html:9–10` has `preconnect` to Google Fonts but no `<link rel="preload" as="font">` for Space Grotesk / Inter / Space Mono.
- Causes FOIT / layout shift on slow connections.

### 13. No `loading="lazy"` on below-fold images — LOW
- Hero logo (`index.html:827`) and footer logo (`index.html:1059`) could use it.

## Things that are good (don't touch)

- Copy is strong — compelling, ROI-focused, no fluff
- Design tokens in `styles.css` are coherent and well-scoped
- Three-tier pricing is clearly presented; founding-client framing is smart
- Quiz UX is clever and the result-routing concept is right; just needs the badge bug fix
- Mobile responsive layout works once the navbar issue is fixed

## Suggested fix order

1. **Today (30 min):** Items 1, 6 — broken quiz logic + OG tags. Recovers actual conversion right now.
2. **This week:** Items 2, 3, 4, 5 — mobile nav, broken link, progress bar, clipboard handling.
3. **Before next page added:** Item 10 — extract shared CSS so adding `/about`, `/case-studies`, etc. doesn't double the maintenance burden.
4. **When polishing:** Items 7, 8, 9, 11, 12, 13.

## Overall

Solid marketing foundation. Copy and design are doing their jobs. The quiz email bug is the only thing actively bleeding conversion right now — that's the priority. Everything else is incremental quality work.
