# Legal Matrix: Design System & Visual Specification

## 1. Design Philosophy: Visual-First & Zero Cognitive Load

Government digital services must be immediately usable by every citizen:regardless of age, literacy level, language proficiency, or digital experience. 

### The Five Invariant Questions
Every screen must answer these five questions within 3 seconds of viewing:
1. **WHAT IS THIS?** (Clear icon + plain-language heading)
2. **WHAT CAN I DO?** (Large visual cards & obvious choice buttons)
3. **WHERE DO I CLICK?** (Distinct 44px+ touch targets with high-contrast affordance)
4. **WHAT HAPPENS NEXT?** (Numbered step indicators & explicit preview)
5. **DID MY ACTION WORK?** (Instant visual confirmation with icon + color + text)

---

## 2. Design Tokens & CSS Variables

All styles in Legal Matrix are strictly parameterized via CSS custom properties. No arbitrary hex codes are permitted in component stylesheets.

```css
:root {
  /* ==========================================================================
     PRIMARY BRAND IDENTITY (Trustworthy Indian Government Blue & Gold Accents)
     ========================================================================== */
  --color-primary: #154360;        /* Deep Navy Blue: Authority, Stability, Trust */
  --color-primary-hover: #0e2e42;  /* Darkened Navy for button hover/focus */
  --color-primary-light: #ebf5fb;  /* Soft Ice Blue for card backgrounds/tints */
  --color-primary-subtle: #d4e6f1; /* Border tint for active elements */

  --color-accent: #d4ac0d;         /* Golden Ochre: Official Seals, Verification Badges */
  --color-accent-hover: #b7950b;
  --color-accent-light: #fef9e7;   /* Warm tint for highlight banners */

  /* ==========================================================================
     SEMANTIC STATUS PALETTE (Color + Icon + Text Triple-Assurance)
     ========================================================================== */
  --color-success: #1e8449;        /* Forest Emerald Green: Verified, Passed */
  --color-success-bg: #eafaf1;     /* Light tint for success cards & badges */
  --color-success-border: #a9dfbf;

  --color-warning: #d35400;        /* Deep Amber Orange: Pending, Scheduled, Attention */
  --color-warning-bg: #fef5e7;
  --color-warning-border: #f8c471;

  --color-danger: #c0392b;         /* Crimson Red: Failed, Error, Exceeded Limit */
  --color-danger-bg: #fdedec;
  --color-danger-border: #f5b7b1;

  --color-info: #2874a6;           /* Cerulean Blue: Informational Callouts */
  --color-info-bg: #ebf5fb;
  --color-info-border: #aed6f1;

  /* ==========================================================================
     NEUTRALS & ELEVATION SURFACES
     ========================================================================== */
  --color-bg-page: #f8f9fa;        /* Clean Off-White Background */
  --color-bg-surface: #ffffff;     /* Pure White Card & Modal Surface */
  --color-bg-subtle: #f2f4f7;      /* Input fields, disabled surfaces */

  --color-text-main: #1c2833;      /* High contrast dark charcoal (Contrast > 11:1) */
  --color-text-secondary: #566573; /* Descriptive metadata (Contrast > 5.2:1) */
  --color-text-muted: #7f8c8d;     /* Supporting hints, timestamps */
  --color-text-inverse: #ffffff;   /* Pure white text on primary/status buttons */

  --color-border-subtle: #e2e8f0;  /* Standard card/table borders */
  --color-border-focus: #1b4f72;   /* 3px High-visibility focus ring */

  /* ==========================================================================
     TYPOGRAPHY SCALE
     ========================================================================== */
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', sans-serif;
  --font-family-display: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  --font-size-xs: 0.75rem;    /* 12px: Fine stamps, timestamps */
  --font-size-sm: 0.875rem;   /* 14px: Metadata, table content */
  --font-size-base: 1rem;     /* 16px: Default readable body */
  --font-size-lg: 1.125rem;   /* 18px: Subheadings, button text */
  --font-size-xl: 1.25rem;    /* 20px: Card titles */
  --font-size-2xl: 1.5rem;    /* 24px: Section headers */
  --font-size-3xl: 2rem;      /* 32px: Main page titles */
  --font-size-4xl: 2.5rem;    /* 40px: Hero banner titles */

  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;

  /* ==========================================================================
     SPACING & LAYOUT GRIDS
     ========================================================================== */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */

  /* ==========================================================================
     ELEVATION, RADII & TOUCH TARGETS
     ========================================================================== */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
  --shadow-card-hover: 0 12px 24px -4px rgba(21, 67, 96, 0.12);

  --touch-target-min: 44px; /* WCAG 2.1 Target Size compliance */

  /* ==========================================================================
     MOTION & TRANSITIONS
     ========================================================================== */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 350ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Accessibility: Respect Reduced Motion Preference */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 3. Accessibility Standards (WCAG 2.1 AA Checklist)

| Criterion | Implementation in Legal Matrix |
| :--- | :--- |
| **Non-Text Contrast (1.4.11)** | All buttons, borders, and input fields maintain at least 3:1 contrast against adjacent backgrounds. |
| **Text Contrast (1.4.3)** | Main body text (`--color-text-main`) maintains >11:1 against white; secondary text maintains >5.2:1 (exceeds 4.5:1 requirement). |
| **Touch Target Size (2.5.5)** | All clickable elements (buttons, cards, links, tabs, form inputs) are guaranteed minimum `44px x 44px` clickable bounding box. |
| **Use of Color (1.4.1)** | Never use color alone. Every status badge, validation state, and alert includes an explicit icon (`✓`, `!`, `×`), label text, and distinctive border. |
| **Focus Visible (2.4.7)** | Every interactive element has an obvious `3px solid var(--color-border-focus)` outline with `2px` offset when focused via keyboard. |
| **Semantic Structure** | True `<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>`, `<dialog>`, and `<button>` elements with `aria-expanded`, `aria-controls`, and `aria-live` for dynamic updates. |

---

## 4. Key Component Specifications

### 4.1 Visual Choice & Service Cards
- **Geometry:** Elevated card with `16px` border-radius, `24px` internal padding.
- **Visual Cue:** Large 48px Lucide icon inside a circular soft-tint badge.
- **Cognitive Typography:** Bold 18px title, exactly 1 line of simple plain-language guidance, and a clear arrow CTA (`→`).
- **Interactive State:** Hover lifts card by `4px`, transitions shadow to `--shadow-card-hover`, and changes border to `--color-primary-subtle`. Active state adds haptic-style scale down (`scale(0.98)`).

### 4.2 Multi-Step Visual Progress Stepper
- **Layout:** Horizontal on screens > 640px; vertically stacked or condensed indicator on 320px–639px screens.
- **Step States:**
  - `Completed`: Solid green circle with white checkmark (`✓`), connecting line turns green.
  - `Active`: Solid navy blue circle with bold white number, subtle pulse halo, step name bolded.
  - `Upcoming`: Light grey border circle with grey number, subtle muted text.
- **Draft Safety:** Each step features "Save & Continue Later" without losing filled fields.

### 4.3 Interactive MPE (Maximum Permissible Error) Meter
- **Purpose:** Eliminate inspector and trader confusion regarding metrology tolerances.
- **Visual Display:**
  - Symmetric horizontal tolerance bar centered at `0.00` error.
  - Permitted tolerance band colored in soft green (`-MPE` to `+MPE`).
  - Out-of-spec zones colored in soft red on both flanks.
  - Dynamic indicator needle indicating `Observed Error` with live numeric readout.
  - Prominent verdict banner: `[✓ Within Permitted Limit]` or `[× Error Exceeds Limit]`.
  - Contextual helper modal: `[? What does Maximum Permissible Error mean?]` with real-world grocery scale analogies.

### 4.4 Official Government Certificate Component
- **Security Styling:** Fine-line guilloche security pattern border, official Department watermark emblem, serial number bar.
- **Metadata Grid:** High-contrast key-value pairs (Certificate No, Instrument Model, Serial No, Trader Name, Location, Issue Date, Validity Date, Officer Stamp).
- **Embedded QR Code:** Crisp high-resolution SVG QR code with explicit label *"Scan to verify this certificate on government registry"*.
- **Print Optimization:** Dedicated `@media print` rules removing navigation headers, footers, and background tints while enforcing crisp monochrome/grayscale vector rendering.

### 4.5 Responsive Data Table to Mobile Cards
- On desktop (> 768px): Structured tabular format with sticky header, sortable columns, and status pills.
- On mobile (≤ 768px): Each row automatically transforms into an independent visual card with labeled key-value lines and a primary action button at the bottom. No horizontal scrollbars required.
