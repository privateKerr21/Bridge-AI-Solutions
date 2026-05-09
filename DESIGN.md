---
name: Bridge AI Solutions
description: Custom AI-powered software for small B2B service businesses. Premium, trusted, Atelier-led.
colors:
  paper:     "#EDE7DD"
  bone:      "#F4EFE8"
  ink:       "#161310"
  clay:      "#3B302A"
  gilt:      "#B89968"
  gilt-deep: "#8C6F3F"
  mute:      "#7A6F66"
  mute-soft: "#B0A89E"
  hairline:  "#D8D0C2"
typography:
  display:
    fontFamily: "Fraunces, 'Times New Roman', serif"
    fontSize: "clamp(2.75rem, 6.5vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Fraunces, 'Times New Roman', serif"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Fraunces, 'Times New Roman', serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "-0.005em"
  label:
    fontFamily: "'Space Mono', ui-monospace, monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  none: "0"
  hair: "1px"
spacing:
  xs:  "8px"
  sm:  "16px"
  md:  "24px"
  lg:  "40px"
  xl:  "64px"
  xxl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    padding: "18px 32px"
    rounded: "{rounded.none}"
  button-primary-hover:
    backgroundColor: "{colors.clay}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "18px 32px"
    rounded: "{rounded.none}"
  button-ghost-hover:
    backgroundColor: "{colors.bone}"
  surface-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  surface-clay:
    backgroundColor: "{colors.clay}"
    textColor: "{colors.paper}"
  surface-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  rule-hairline:
    backgroundColor: "{colors.hairline}"
    height: "1px"
---

# Design System: Bridge AI Solutions

## 1. Overview

**Creative North Star: "The Atelier"**

Bridge is a working studio, not a showroom. The site reads like the photograph of a quiet office at the end of a long shipped project: material weight, generous whitespace, real artifacts on the table. Restraint signals premium. The visitor should feel they've stepped into a small, capable practice — not a marketing funnel.

This system explicitly rejects the saturated lane the current site sits in (cream + saturated gold + Space Grotesk + 2px brutalist borders + hover-translate-shadow), the generic AI / SaaS landing aesthetic (gradient meshes, dark glows, hero-metric templates, "Powered by AI" badges, glassmorphism), and discount-marketing language (strikethrough originals, pulsing urgency dots, "founding rate" theater). It also rejects agency clichés (bento grids, scrolling logo strips, identical icon-card sections).

What lands instead: warmer, more pigmented neutrals; an editorial serif as the dominant voice; one muted antique gilt used as a near-invisible detail rather than a brand stamp; flat tonal layering with hairline rules; photography-forward proof on every page that argues for "real software."

**Key Characteristics:**
- Photography-forward — proof is visible, not implied
- Restrained palette — paper / ink / clay; gilt is rare
- Editorial serif as voice — Fraunces sets the register
- Flat by default — depth via tonal layering and hairlines, not shadows
- Generous whitespace — silence is the loudest element

## 2. Colors

A material, pigmented neutral palette anchored on warm stone and warm near-black, with an antique gilt used as a near-invisible heritage detail.

### Primary
- **Antique Gilt** (`#B89968`): the only accent. Used for ≤3% of any screen — a single underline, a numeric figure, a rule-line endpiece. Never for body type, never for buttons, never as a brand stamp.

### Neutral
- **Warm Stone (Paper)** (`#EDE7DD`): default page surface. Replaces the brighter `#F5F2EE` cream of the legacy system. More pigment, more material.
- **Bone** (`#F4EFE8`): lighter break surface for cards, quotes, inset blocks. Tonal lift from paper, no border needed.
- **Clay** (`#3B302A`): deep warm neutral for atmospheric blocks, photography overlays, and dark sections. Replaces the flat `#0D0D0D` near-black for full-bleed backgrounds.
- **Ink** (`#161310`): warm near-black for type and as the primary surface for buttons. Used for body type on paper.
- **Mute** (`#7A6F66`): warm secondary type on paper / bone. Replaces the cooler `#6B6B6B` muted of the legacy system.
- **Mute Soft** (`#B0A89E`): tertiary type and metadata on clay / ink surfaces.
- **Hairline** (`#D8D0C2`): the only divider color. 1px rules. Never thicker.

### Named Rules
**The Three-Percent Rule.** Antique gilt occupies no more than 3% of any rendered viewport. If you find yourself reaching for gilt twice on the same screen, you're using it wrong. The rarity is the asset.

**The Paper-First Rule.** The default page surface is `paper` (`#EDE7DD`). Clay and ink surfaces are interruptions that must earn their place — a hero atmospheric block, a single quoted section, a footer. Never alternate clay/paper section-by-section; it produces marketing-page striping.

**The No-Saturated-Gold Rule.** The legacy `#D4AF37` and `#B8971F` are deprecated. Antique gilt (`#B89968`) is the only accent. Saturated yellow-gold reads costume-jewelry; antique gilt reads heritage.

## 3. Typography

**Display Font:** Fraunces (with Times New Roman fallback)
**Body Font:** Inter (with system-ui fallback)
**Label / Mono Font:** Space Mono (used sparingly, label-only)

**Character:** Fraunces is the voice — a contemporary serif with heritage weight, optical-size variation, and quiet confidence. Inter handles long-form readability without competing with the display. Space Mono survives only as a wide-tracked label register, never for body or display. Space Grotesk is removed from the system.

### Hierarchy
- **Display** (Fraunces, 400, `clamp(2.75rem, 6.5vw, 5rem)`, line-height 1.05, tracking -0.02em): hero headlines and primary section openings only. Optical-size axis tuned high for material weight.
- **Headline** (Fraunces, 400, `clamp(2rem, 4vw, 3.25rem)`, line-height 1.1): section titles below the fold.
- **Title** (Fraunces, 500, `1.375rem`, line-height 1.25): card titles, list-item leads, sub-section heads.
- **Body** (Inter, 400, `1.0625rem` / 17px, line-height 1.65, max 68ch): default reading type. Capped at 68 characters per line.
- **Label** (Space Mono, 400, `0.7rem`, uppercase, tracking 0.14em): metadata strips, numeric labels, section tags. Rare. Never wrapped to two lines.

### Named Rules
**The Serif-Voice Rule.** Fraunces is the brand's voice. Display, headline, and title all live there. Mixing in a sans-serif headline immediately collapses the register; Inter is body-only.

**The Label-Discipline Rule.** Space Mono labels ride above section heads as a quiet metadata strip (e.g. `// 02 — PROCESS`). They do not become inline accents inside paragraphs. They do not get colored. They do not appear inside cards.

## 4. Elevation

Flat. The system uses tonal layering and hairline rules to convey depth, not shadows.

A surface change (paper → bone, paper → clay, paper → ink) is the depth cue. A 1px `hairline` rule (`#D8D0C2` on paper; `rgba(255,255,255,0.08)` on clay/ink) is the structural divider. Cards have no shadow, no border, no radius — they are tonal lifts of bone over paper.

### Named Rules
**The No-Shadow Rule.** Box-shadow is forbidden as a default. The only allowed exception is a focus ring on interactive elements (`outline: 2px solid {colors.gilt}; outline-offset: 3px`). If you reach for a shadow to imply depth, restate the layout in tonal layering instead.

**The Hairline-Only Rule.** Dividers are 1px `hairline`. Never 2px. Never colored. The legacy 2px ink-borders are removed from the system.

## 5. Components

### Buttons
- **Shape:** sharp corners (radius 0).
- **Primary:** `ink` background, `paper` text, Space Mono label typography, padding `18px 32px`. No border, no shadow.
- **Hover:** background shifts to `clay`. No translate, no shadow, no transform. 200ms ease.
- **Ghost:** transparent background, `ink` text, no border. Hover background shifts to `bone`.
- **Focus:** 2px gilt outline at 3px offset.

### Cards / Containers
- **Corner Style:** sharp (radius 0).
- **Background:** `bone` over `paper` parent — tonal lift, no border.
- **Shadow:** none. Ever.
- **Border:** none, except optional 1px `hairline` top rule for archival sections.
- **Internal Padding:** `lg` (40px) at minimum.

### Inputs / Fields
- **Style:** transparent background, 1px bottom-only `hairline` rule. No box border.
- **Focus:** bottom rule shifts to `ink`, 1px gilt sub-rule appears 2px below.
- **Error:** bottom rule shifts to `clay`; label below in `clay`.

### Navigation
- **Style:** transparent on first viewport, `paper` with hairline-bottom rule when scrolled. No fixed dark bar.
- **Typography:** Inter 14px for nav links (not Space Mono — too costume); active state via 1px gilt underline at 4px offset.
- **Mobile:** full-bleed `paper` overlay, large Fraunces link list.

### Section Rules / Dividers
- **Style:** 1px `hairline` full-width, with optional 1ch antique-gilt centerpiece for chapter-scale breaks (used 0–2 times per page).

### Photography Treatment
- **Color:** photography prints in warm tones — never cool blue casts. Skin tones lean warm. Product UI screenshots shot on `paper` or `bone` surfaces, never floating on white.
- **Crop:** generous negative space inside the frame; subjects rarely centered.
- **Frame:** photography sits flush to its container — no drop-shadows, no rounded corners, no bordered "polaroid" treatments.

### Quote / Pull-Quote
- **Style:** Fraunces display weight, hung in `bone` surface, 1ch antique-gilt opening quote mark sized to 1.5× the body, source attribution below in Space Mono label.

## 6. Do's and Don'ts

### Do:
- **Do** use `paper` (`#EDE7DD`) as the default page surface. Clay and ink are interruptions, not equals.
- **Do** restrict antique gilt (`#B89968`) to ≤3% of any rendered viewport — one underline, one figure, one endpiece. Treat it like an expensive ingredient.
- **Do** lead every section with Fraunces. The serif is the brand's voice.
- **Do** convey depth through tonal layering (paper → bone → clay → ink) and 1px `hairline` rules. Never shadows.
- **Do** show real product screenshots, real Looms, real before/after artifacts. Photography-forward is the whole point of the Atelier register.
- **Do** cap body line length at 68 characters. Long lines collapse the editorial register instantly.
- **Do** route every CTA through one Calendly endpoint. Multiple conversion mechanics signal an unsettled sales process.

### Don't:
- **Don't** use the legacy saturated gold (`#D4AF37`, `#B8971F`). They are out of the system. Antique gilt only.
- **Don't** use Space Grotesk anywhere. Fraunces handles display, headline, and title. Mixing Space Grotesk in immediately reverts to the saturated reflex lane PRODUCT.md flags.
- **Don't** use 2px ink borders. The brutalist 2px border was the legacy signature; it is removed. Hairline 1px or no border at all.
- **Don't** use the legacy hover pattern (`translate(-2px, -2px)` + `box-shadow: 4px 4px 0 ink`). Hover effects are background tint shifts and underline appearances. No transforms.
- **Don't** ship gradient mesh backgrounds, dark glows, glassmorphism, hero-metric templates, "Powered by AI" badges, or any other generic AI/SaaS-landing reflex.
- **Don't** ship strikethrough original prices, pulsing "limited spots" dots, countdown timers, or "founding rate" theater. Discount marketing contradicts premium positioning.
- **Don't** ship bento grids, scrolling logo strips, or identical icon-card sections. Agency clichés.
- **Don't** ship side-stripe accent borders (`border-left` greater than 1px as a colored stripe). Always wrong.
- **Don't** ship gradient text via `background-clip: text`. Always wrong.
- **Don't** stack three background layers on the hero (image + grid + vignette). The Atelier hero is one photograph or one tonal block. Restraint.
- **Don't** alternate clay/paper section-by-section down a page. That produces marketing-page striping. Clay is an interruption that earns its place.
