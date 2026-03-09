# Resource Bridge Design Guidelines

## Design Approach
**Framework**: Material Design principles adapted for accessibility-first mobile web
**Justification**: Utility-focused application serving vulnerable populations requires proven accessibility patterns, clear visual hierarchy, and optimal touch ergonomics for low-end devices.

## Core Design Principles
1. **Clarity Over Aesthetics**: Every element serves a functional purpose
2. **Maximum Accessibility**: WCAG AAA compliance throughout
3. **Touch-First Interaction**: All interactive elements ≥48px (exceeding 44px minimum)
4. **Progressive Disclosure**: Show essential info first, details on demand
5. **Offline-Ready Visual Feedback**: Clear loading and error states

## Typography System

**Font Family**: System font stack for performance
- Primary: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

**Hierarchy**:
- **Page Title**: text-3xl (30px), font-bold, leading-tight
- **Section Headers**: text-2xl (24px), font-semibold
- **Resource Card Title**: text-xl (20px), font-semibold
- **Body/Description**: text-base (16px), font-normal, leading-relaxed
- **Metadata/Distance**: text-sm (14px), font-medium
- **Buttons/CTAs**: text-lg (18px), font-semibold, uppercase tracking-wide

**Contrast**: All text maintains 7:1 ratio minimum (AAA standard)

## Layout System

**Spacing Primitives**: Use Tailwind units of **4, 6, 8, 12, 16**
- Card padding: p-6
- Section spacing: py-8, py-12
- Button padding: px-8 py-4
- Touch targets: minimum h-12 (48px)

**Grid Structure**:
- Mobile: Single column, full-width cards with mx-4 container
- Tablet (768px+): Single column maintained, max-w-2xl centered
- Desktop: max-w-4xl for readability

**Safe Zones**: 
- Bottom: pb-24 for floating action buttons
- Top: pt-safe for status bar clearance

## Component Library

### Navigation Header
- **Structure**: Sticky top header, h-16 minimum
- **Elements**: 
  - Left: Logo/Home icon (48px tap target)
  - Center: "Resource Bridge" title, text-xl
  - Right: Language toggle button (EN/ES), 48px tap target
- **Behavior**: Remains fixed during scroll, translucent backdrop blur

### Language Toggle
- **Design**: Pill-shaped segmented control
- **Size**: h-12 w-24, rounded-full
- **States**: Clear active/inactive visual distinction
- **Placement**: Top-right header, always visible

### Resource Cards
- **Card Structure**:
  - Full-width on mobile with rounded-xl corners
  - Minimum h-32 for adequate content space
  - p-6 internal padding
  - mb-4 spacing between cards
  - Subtle shadow for depth (shadow-md)

- **Card Content Hierarchy**:
  1. Resource name (text-xl, font-semibold)
  2. Category badge (inline, text-sm, pill-shaped, uppercase)
  3. Address (text-base, with map pin icon)
  4. Phone number (text-lg, tap-to-call link, font-medium)
  5. Distance indicator (text-sm, prominent when geolocation active)
  6. "What works well" snippet (text-sm, italic, if available)

- **Interactive Elements**:
  - Tap-to-call phone: Entire phone row is tappable, h-12
  - Tap-to-navigate address: Full address row tappable, h-12
  - Expand for full details: Chevron icon, 48px tap target

### Chipp.ai Assistant Integration
- **Placement**: Prominent section after header, before resource list
- **Container**: Full-width section with py-8
- **Frame**: 
  - Height: h-[600px] on mobile, h-[800px] on tablet+
  - Width: w-full with mx-4 container
  - Border: Subtle border-2 for visual containment
  - Corner: rounded-xl to match card style
- **Label**: "Ask Our Assistant" heading above frame (text-2xl, mb-4)

### "Find Near Me" Button
- **Design**: Primary CTA button, full-width on mobile
- **Size**: h-14 (56px), w-full with max-w-md centered
- **Icon**: Location pin icon, 24px, left-aligned
- **Text**: "Find Resources Near Me", text-lg
- **Position**: Sticky bottom button (fixed bottom-4) OR top of resource list
- **Behavior**: Requests permission, shows loading state, updates card distances

### Category Filters (Future MVP Enhancement)
- **Design**: Horizontal scrollable chip row
- **Chips**: h-10, px-6, rounded-full, text-sm uppercase
- **Categories**: Shelter, Food, Medical, Legal, Youth, Other
- **Behavior**: Multi-select, clear visual active state

### Resource List Container
- **Structure**: Vertical stack of cards
- **Spacing**: space-y-4 between cards
- **Loading State**: Skeleton cards with pulse animation
- **Empty State**: Clear message with icon, centered, py-16

## Touch & Interaction Patterns

**Minimum Touch Targets**: 48x48px for all interactive elements
**Button States**:
- Default: Clear, high-contrast
- Active/Pressed: Slight scale (scale-98), instant feedback
- Disabled: Reduced opacity (opacity-40)

**Tap Feedback**: Native mobile ripple effect on all buttons
**Link Styling**: Underline on interactive text, sufficient padding for touch

## Accessibility Requirements

**Focus States**: 4px outline, high contrast, visible on all interactive elements
**Screen Reader**: 
- Semantic HTML (header, main, nav, article)
- ARIA labels on all icons
- Proper heading hierarchy (h1 → h2 → h3)
- Live regions for dynamic content (distance updates)

**Text Sizing**: Users can zoom to 200% without breaking layout
**Input Fields**: Large labels (text-lg), clear placeholder text, validation messaging

## Loading & Error States

**Loading**: 
- Skeleton screens for resource cards
- Spinner for geolocation requests
- Progress indicators for data fetch

**Errors**:
- Clear, compassionate messaging ("We couldn't find your location. Please check permissions.")
- Retry buttons, h-12, clear action
- Fallback to manual location entry

## Images
**No hero image** - This is a utility application, not a marketing page. Visual resources should be limited to:
- Icons for categories (shelter, food, medical) - use icon library
- Organization logos in resource cards (if available, 48x48px max)
- Map thumbnails for location context (optional, lazy-loaded)

## Responsive Breakpoints
- Mobile: 320px - 767px (primary focus)
- Tablet: 768px - 1023px (enhanced spacing)
- Desktop: 1024px+ (max-width constraints for readability)

## Performance Considerations
- Minimize animations (only for loading states and feedback)
- Lazy load iframe after initial page render
- Optimize for 3G network speeds
- Progressive enhancement for geolocation