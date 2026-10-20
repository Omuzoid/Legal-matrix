# Legal Matrix: Frontend Architecture Specification

## 1. Dual-Tier Frontend Architecture

The Legal Matrix platform employs a hybrid architecture designed for optimal user acquisition, instant accessibility, and zero-overhead government workflow execution.

```
                              ┌────────────────────────────────────────┐
                              │           PUBLIC WEB TRAFFIC           │
                              │   (Citizens, First-Time Traders)       │
                              └───────────────────┬────────────────────┘
                                                  │
                                                  ▼
                              ┌────────────────────────────────────────┐
                              │      TIER 1: PUBLIC LANDING PAGE       │
                              │       React 18 + TypeScript + Vite     │
                              │       Location: /landing/              │
                              │  - Public marketing & awareness        │
                              │  - High visual fidelity & animations   │
                              │  - Educational metrology guides        │
                              │  - Direct links into portal workflows  │
                              └───────────────────┬────────────────────┘
                                                  │
                       Navigates to Service / Login / Verification
                                                  │
                                                  ▼
                              ┌────────────────────────────────────────┐
                              │     TIER 2: OPERATIONAL SERVICE PORTAL │
                              │    HTML5 + Modern CSS3 + Vanilla JS    │
                              │       Location: /portal/               │
                              │  - 100% zero-framework overhead        │
                              │  - Instant load on 2G/3G & slow WebViews│
                              │  - Role-based modular workflows        │
                              │  - Centralized API & Mock service layer│
                              └───────────────────┬────────────────────┘
                                                  │
                                                  ▼
                              ┌────────────────────────────────────────┐
                              │      CENTRALIZED API SERVICE LAYER     │
                              │          (portal/services/)            │
                              │  - `api.js` (Fetch Client + Intercept) │
                              │  - Domain services (Auth, Apps, etc.)  │
                              │  - `mockAdapter.js` (Dev Sandbox)      │
                              └───────────────────┬────────────────────┘
                                                  │
                                                  ▼
                              ┌────────────────────────────────────────┐
                              │          REST API / BACKEND            │
                              │         (Node.js + Express)            │
                              └────────────────────────────────────────┘
```

---

## 2. Tier 1: Public Landing Page (React + TypeScript)

### Structure & Technology Stack
- **Framework:** React 18 with TypeScript.
- **Build Tool:** Vite (sub-second HMR, optimized production tree-shaking).
- **Styling:** CSS Variables matching the Legal Matrix Design System with utility classes for rapid layout.
- **Icons:** `lucide-react` for crisp, consistent visual language.
- **Key Sections:**
  1. **Header & Utility Bar:** Ashoka Lion emblem, "LEGAL MATRIX" title, language selector dropdown (`English`, `हिंदी`), fast search, direct `[Login]` and `[Services]` links.
  2. **Hero Section:** Friendly shopkeeper illustration beside digital counter scale, speech bubble *"Accurate Measurement, Fair Trade, Stronger India"*, primary CTA `[Apply for Verification →]`, secondary `[Verify Certificate]`, tertiary `[Track Application]`.
  3. **Trust Indicators:** 4 badges with icons: *"Transparent Process"*, *"Easy to Use for Everyone"*, *"Secure & Verified Certificates"*, *"Government Authorized"*.
  4. **"What do you want to do?" Visual Cards:** Instant pathways for:
     - `Verify Certificate` (QR Scan)
     - `Register Instrument` (Verification request)
     - `Track Application` (Live status)
     - `Report a Problem` (Grievance submission)
  5. **"How it works?" 4-Step Illustrated Flow:**
     - Step 1: Apply (Online submission)
     - Step 2: Inspection (Official field visit)
     - Step 3: Verification (Accuracy test)
     - Step 4: Certificate (Download verified stamp)
  6. **Why Legal Matrix?** Visual value cards (Simplicity, Transparency, Fraud Prevention, Direct Access).
  7. **Interactive Certificate & QR Showcase:** Explaining how merchants display the QR seal and how customers verify it in 5 seconds.
  8. **Need Help? / Grievance Helpline:** Direct call link, office locator, and FAQ accordion.
  9. **Government Footer:** Accessibility statement, terms of service, national portal links, and copyright.

---

## 3. Tier 2: Operational Service Portal (HTML5 + CSS3 + Vanilla JS)

### Directory Breakdown
```
portal/
├── pages/
│   ├── auth/
│   │   ├── login.html              # Role selection (Trader, Inspector, Admin, Citizen) + Credentials
│   │   ├── register.html           # Trader/Establishment account creation wizard
│   │   └── forgot-password.html    # Mobile OTP password reset
│   ├── public/
│   │   ├── services.html           # Visual catalog of all 6 legal metrology services
│   │   ├── verify-qr.html          # Public QR certificate scanner & instant verification badge
│   │   └── track.html              # Visual 5-stage progress timeline lookup
│   ├── citizen/
│   │   ├── complaint.html          # Guided 4-step consumer grievance filing
│   │   └── complaint-success.html  # Visual confirmation card with tracking number
│   ├── trader/
│   │   ├── dashboard.html          # Welcome Rajesh Kumar, quick action cards, latest app timeline
│   │   ├── register-instrument.html# 5-step wizard (Instrument Type -> Details -> Docs -> Review -> Pay)
│   │   ├── applications.html       # Full application history with filter & card view
│   │   ├── certificates.html       # Active certificates with instant print/download & QR view
│   │   └── profile.html            # Shop establishment details & license validity
│   ├── inspector/
│   │   ├── dashboard.html          # Inspector Singh dashboard, Today's schedule, priority indicators
│   │   ├── schedule.html           # Full calendar/list of field inspections with status pills
│   │   ├── inspect.html            # 6-step guided inspection (Details, Visual Check, Measurement, MPE, Evidence, Decision)
│   │   └── history.html            # Past completed & stamped records
│   └── admin/
│       ├── dashboard.html          # System overview, 4 metric cards, application trend chart, live activity feed
│       ├── applications.html       # Global applications table with search, filter, and assignment modal
│       ├── inspectors.html         # Field inspector roster, workload allocation, district coverage
│       ├── complaints.html         # Citizen grievance triage, evidence inspection, resolution logging
│       └── audit-log.html          # Tamper-evident transaction and certificate issuance ledger
├── components/
│   ├── button.css                  # Reusable 44px+ tactile buttons
│   ├── card.css                    # Visual service cards, metric cards
│   ├── stepper.css / stepper.js    # Visual progress bar with completed/active states
│   ├── timeline.css / timeline.js  # Application tracking timeline with inspector avatars
│   ├── mpeMeter.css / mpeMeter.js  # Dynamic MPE tolerance gauge & calculator
│   ├── modal.css / modal.js        # Accessible modal dialog with focus trap
│   ├── toast.css / toast.js        # Notification toasts
│   └── dataTable.css / dataTable.js# Responsive table with mobile card fallback
├── layouts/
│   ├── header.js                   # Injects accessible government header
│   ├── sidebar.js                  # Injects role-specific sidebar drawer
│   └── footer.js                   # Injects standard footer
├── services/
│   ├── api.js                      # Core HTTP client with fetch wrapper & interceptors
│   ├── mockAdapter.js              # Development sandbox data provider (zero network required)
│   ├── authService.js              # Session & login state management
│   ├── applicationService.js       # Applications CRUD & progress tracker
│   ├── instrumentService.js        # Instrument types, classes & specifications
│   ├── inspectionService.js        # Inspection checklists, MPE calculations & submissions
│   ├── certificateService.js       # Official certificate generation, retrieval & QR payload
│   └── complaintService.js         # Public grievances management
├── utils/
│   ├── validator.js                # Instant input validation with empathetic error hints
│   ├── storage.js                  # Safe browser storage wrapper (sessionStorage / localStorage)
│   ├── formatters.js               # Indian currency (₹), date formats (DD MMM YYYY), units (kg, g, L)
│   └── i18n.js                     # Internationalization engine
└── config/
    └── env.config.js               # Base URL config, mock toggle, feature flags
```

---

## 4. Centralized API Service Layer & Mock Adapter

### 4.1 Zero-Fetch-in-HTML Rule
Page scripts **never** call `fetch()` directly. All HTTP communications flow through domain service modules which invoke `api.js`:

```javascript
// Example in portal/pages/trader/register-instrument.js
import { applicationService } from '../../services/applicationService.js';

async function handleStepSubmission(formData) {
  try {
    showLoadingState();
    const result = await applicationService.createApplication(formData);
    showSuccessState(result.applicationNumber);
  } catch (error) {
    showHumanErrorState(error.userMessage);
  } finally {
    hideLoadingState();
  }
}
```

### 4.2 The Mock Adapter (`services/mockAdapter.js`)
To enable fully interactive development without a running backend, `services/api.js` delegates to `mockAdapter.js` when `ENV.USE_MOCKS === true`.
- **Preloaded Realistic Data:** Contains realistic records matching the reference visual (e.g. Application `LM-2024-00124` for Sharma General Store, Inspector Singh's schedule, MPE calculation test suites).
- **Simulated Network Latency:** Injects `300ms–600ms` realistic latency to test loading indicators, button disablement, and spinner animations.
- **Seamless Backend Transition:** Flipping `USE_MOCKS: false` directs calls to `http://localhost:5000/api/v1` without altering a single line of page code.

---

## 5. State Management & Lifecycle

1. **Session & Auth State:** Managed in memory and mirrored to `sessionStorage` under `lm_auth_session`. Contains current user role (`TRADER`, `INSPECTOR`, `ADMIN`, `CITIZEN`), full name, establishment, and token expiry.
2. **Multi-Step Form Drafts:** Every wizard (Instrument Registration, Field Inspection, Complaint Filing) writes form field values to `localStorage` under `lm_draft_<wizard_name>` on every change event. If the browser closes or reloads, progress is immediately restored with an alert: *"We restored your unsaved draft."*
3. **Route & Role Guarding:** `layouts/header.js` and `authService.js` inspect the active page URL and user session. If an unauthenticated user navigates to `/pages/trader/dashboard.html`, they are redirected to `/pages/auth/login.html?role=trader&redirect=...` with a friendly explanatory toast.

---

## 6. Internationalization (i18n) Foundation

All user-facing text strings are mapped via `utils/i18n.js`:
- DOM elements can specify `data-i18n="trader.dashboard.welcome"` or use JS helper `t('trader.dashboard.welcome')`.
- Language selector updates active locale in `localStorage` and triggers instant re-translation of dynamic labels without requiring full page reload.
- Initial dictionaries supported: `en` (English) and `hi` (Hindi).
