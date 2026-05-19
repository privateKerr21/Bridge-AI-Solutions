# Hero Visual Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a radial gold glow background, gradient text on the accent word, and staggered fade-up animations to the hero section.

**Architecture:** All changes are CSS + ~20 lines of vanilla JS added inline to `index.html`. No new files. IntersectionObserver pattern used for animations so it can be extended site-wide later.

**Tech Stack:** Vanilla CSS, Vanilla JS (IntersectionObserver), no build tools.

---

### Task 1: Radial Gold Glow Background

**Files:**
- Modify: `index.html` — `.hero` CSS block (~line 16)

**Step 1: Replace the solid background-color with a radial gradient**

In the `.hero` rule, replace:
```css
background-color: var(--dark-bg);
```
With:
```css
background: radial-gradient(
  ellipse 70% 60% at 28% 55%,
  rgba(212, 175, 55, 0.13) 0%,
  rgba(212, 175, 55, 0.04) 45%,
  transparent 70%
), var(--dark-bg);
```

**Step 2: Preview in browser**
Run: `python -m http.server 2123` from project root, open `http://localhost:2123`.
Expected: Subtle warm glow visible behind the headline area on the dark background.

**Step 3: Commit**
```bash
git add index.html
git commit -m "style: add radial gold glow to hero background"
```

---

### Task 2: Gradient Text on Accent Word

**Files:**
- Modify: `index.html` — `.hero h1 .text-accent` CSS block (~line 118)

**Step 1: Replace the flat gold color with a gradient**

In the `.hero h1 .text-accent` rule, replace:
```css
color: var(--gold);
```
With:
```css
background: linear-gradient(120deg, #D4AF37 0%, #F5C518 50%, #C8960C 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
color: transparent; /* fallback */
```

**Step 2: Preview in browser**
Expected: "AI can do." renders with a gold → bright yellow → amber metallic shimmer.

**Step 3: Commit**
```bash
git add index.html
git commit -m "style: add gradient text effect to hero accent word"
```

---

### Task 3: Staggered Fade-Up Animations

**Files:**
- Modify: `index.html` — hero CSS block + bottom `<script>` tag

**Step 1: Add `.fade-up` CSS class and keyframe**

Add after the existing `.hero` CSS rules (before the Quiz Section comment):
```css
/* Hero Animations */
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Step 2: Add `fade-up` class + `data-delay` to hero elements**

In the hero HTML (~line 696), add `class="fade-up"` and `data-delay` attributes:

```html
<span class="label hero-label fade-up" data-delay="0">// Bridge AI Solutions</span>
<h1 class="fade-up" data-delay="150">Stop doing work<br><span class="text-accent">AI can do.</span></h1>
<p class="hero-sub fade-up" data-delay="300">...</p>
<div class="hero-actions fade-up" data-delay="450">...</div>
```

And for the stats grid:
```html
<div class="hero-right fade-up" data-delay="600">
```

**Step 3: Add IntersectionObserver JS**

Find the closing `</script>` tag at the bottom of the file and add before it:
```js
// Hero fade-up animations
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));
```

**Step 4: Preview in browser**
Hard-refresh (`Ctrl+Shift+R`). Expected: On page load, elements cascade in with staggered fade-up — label first, then headline, subtext, buttons, stats grid.

**Step 5: Commit**
```bash
git add index.html
git commit -m "feat: add staggered fade-up animations to hero section"
```

---

### Task 4: Final Review & Deploy

**Step 1: Full visual check**
- Glow visible but not garish
- Gradient text readable and metallic-feeling
- Animations smooth, no jank, no layout shift

**Step 2: Push to main**
```bash
git push origin main
```
Expected: Vercel auto-deploys. Check Vercel dashboard for successful build.
