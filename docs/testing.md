# Legal Matrix: Verification, Accessibility & Testing Strategy

## 1. Quality Assurance Philosophy

Legal Matrix is designed as a mission-critical public utility. A failure or ambiguity in the interface can result in delayed trade licenses, penalization of merchants, or denial of consumer protection. Therefore, testing focuses on **accessibility**, **cognitive clarity**, **responsive resilience**, and **state predictability**.

---

## 2. Accessibility & Compliance Verification (WCAG 2.1 AA)

Every page and component must pass the following accessibility gates:

### 2.1 Contrast & Readability
- All text elements must achieve a contrast ratio of at least **4.5:1** against their background (normal text) and **3:1** (large headings).
- All interactive controls (buttons, inputs, borders) must achieve at least **3:1** against adjacent backgrounds.
- No information may be conveyed solely through color. Every status indicator must feature **Color + Icon + Text Label**.

### 2.2 Touch Target & Physical Ergonomics
- Every interactive element (buttons, cards, links, tabs, radio targets) must provide a minimum clickable/tappable area of **44px × 44px**.
- Generous spacing (minimum 8px gap) must surround clickable controls to prevent accidental activation on small touchscreens.

### 2.3 Keyboard Navigation & Focus Trapping
- A user must be able to complete all workflows using only the `Tab`, `Shift+Tab`, `Enter`, `Space`, and `Esc` keys.
- Visible focus rings (`3px solid var(--color-border-focus)`) must be displayed on focused elements.
- When an accessible modal dialog opens:
  - Focus must automatically move to the first interactive element inside the modal.
  - Focus must remain trapped inside the modal while open.
  - Pressing `Esc` must safely close the modal and restore focus to the trigger button.

### 2.4 Screen Reader Compatibility
- Images must have concise, descriptive `alt` text.
- Icon-only buttons (such as search buttons, close icons, notification bells) must have explicit `aria-label` attributes.
- Dynamic asynchronous content updates (e.g. tracking results, MPE live calculations, error alerts) must be enclosed in `aria-live="polite"` or `role="alert"` regions.

---

## 3. Responsive Breakpoint Test Matrix

The platform must render without awkward wrapping, horizontal scrollbars, or broken layout across this device matrix:

| Breakpoint | Target Devices | Critical Layout Checks |
| :--- | :--- | :--- |
| **320px – 374px** | Ultra-budget Android phones, JioPhone Next | Single-column cards, stepper switches to condensed indicator, 100% width buttons. |
| **375px – 424px** | Standard smartphones (iPhone SE, Galaxy A-series) | Comfortable card padding, full-width inputs, sticky mobile bottom action bars. |
| **768px – 1023px** | Tablets (iPad portrait, Android tablets in field) | 2-column card grids, horizontal stepper, sidebar collapsible to off-canvas drawer. |
| **1024px – 1439px**| Laptops & Office Desktop PCs | Full layout with permanent navigation sidebar, 3-column quick action cards, split dashboard. |
| **1440px+** | High-DPI Desktop Monitors | Max-width content boundaries (`max-w-7xl` / `1280px`), centered readable columns. |

---

## 4. End-to-End Workflow Verification Checklist

### 4.1 Trader Registration & Application Workflow
- [ ] Selecting "Weighing Scale" highlights card with active border and checkmark.
- [ ] Leaving required fields blank displays friendly inline hint: *"Please enter your scale's model number."*
- [ ] Uploading sample document validates file extension and renders thumbnail preview.
- [ ] Refreshing browser on Step 3 restores previous inputs from draft storage.
- [ ] Submitting application triggers loading spinner, disables submit button, and renders Application Number `LM-2024-XXXXX`.

### 4.2 Application Tracking
- [ ] Searching valid number `LM-2024-00124` renders 5-stage visual progress timeline.
- [ ] Active stage ("Inspection Scheduled") is clearly highlighted with inspector details.
- [ ] Searching non-existent number renders human-friendly empty state with clear suggestion to check number.

### 4.3 Inspector Field Verification & MPE Gauge
- [ ] Inspector dashboard displays today's assigned inspections with priority badges.
- [ ] Clicking an inspection opens 6-step guided form.
- [ ] Checklist toggles ([YES] / [NO]) toggle with clear tactile state changes.
- [ ] Changing Observed Reading dynamically moves the MPE gauge needle.
- [ ] Entering out-of-tolerance value immediately updates verdict badge to crimson `[× Outside Permitted Limit]`.
- [ ] Clicking `[? What does this mean?]` opens understandable analogy modal.
- [ ] Final submission opens mandatory irreversible confirmation modal.

### 4.4 Public QR Verification
- [ ] Navigating to `/verify-qr.html?cert=LM-2024-00124` displays emerald green `[✓ CERTIFICATE VERIFIED]` banner.
- [ ] Verified certificate displays owner, instrument type, and issue/expiry dates.
- [ ] Tampered/invalid query parameters display clear warning banner without technical stack traces.

---

## 5. Console & Runtime Hygiene

- **Zero Console Errors:** No uncaught promises, missing imports, unhandled rejections, or script errors.
- **Zero Broken Links:** All relative links (`/portal/...`, `/landing/...`) must resolve reliably.
- **Graceful Network Degradation:** Simulating offline mode (`navigator.onLine = false`) shows clear banner: *"You are currently offline. Your changes are saved locally."*
