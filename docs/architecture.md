# Legal Matrix: System & Technical Architecture Specification

## 1. Executive Summary

**Legal Matrix** is a public-interest digital platform for legal metrology verification, calibration tracking, certification, and public dispute reporting. The system bridges four distinct stakeholder groups:
1. **General Citizens:** Requiring zero-friction certificate verification, educational transparency, and one-tap consumer grievance filing.
2. **Traders / Shop Owners:** Requiring a low-cognitive-load, guided multi-step journey to register instruments, pay fees, schedule inspections, and download stamping certificates.
3. **Field Inspectors:** Requiring efficient, high-contrast, mobile-field-ready inspection forms with automated Maximum Permissible Error (MPE) calculation, checklist validation, and evidence capture.
4. **Government Administrators:** Requiring high-visibility operational dashboards, district-level tracking, auditor logs, and inspector assignment workflows.

---

## 2. High-Level Macro Architecture

The system decouples the **Public Marketing & Information Discovery Experience** from the **Operational Service & Workflow Portal**:

```
+-----------------------------------------------------------------------------------+
|                              PUBLIC DISCOVERY LAYER                               |
|                                                                                   |
|  [ React 18 + TypeScript + Vite + Tailwind/CSS Modules + Lucide Icons ]           |
|  - High-performance, SEO-optimized public landing experience                      |
|  - Value proposition, animated process walkthrough, public trust badges           |
|  - Citizen quick-actions: Instant QR scan launcher, track search, help desk       |
+-----------------------------------------------------------------------------------+
                                         |
                                         | Smooth Navigation Transition
                                         v
+-----------------------------------------------------------------------------------+
|                        GOVERNMENT SERVICE & APPLICATION PORTAL                    |
|                                                                                   |
|  [ Modern HTML5 + CSS3 Custom Properties + Modular Vanilla JavaScript (ES6+) ]    |
|  - Zero heavy framework bundle overhead; instant execution on 2G/3G & budget phones|
|  - 100% accessible, WCAG 2.1 AA compliant, tactile visual-first components         |
|  - Centralized API Service Layer (`services/api.js`) with isolated Mock Adapter    |
|  - Role-based experiences: Citizen, Trader, Inspector, Administrator              |
|  - Multi-step wizards with draft recovery, interactive MPE meter, QR verification |
+-----------------------------------------------------------------------------------+
                                         |
                                         | Clean JSON REST API (HTTP/HTTPS)
                                         v
+-----------------------------------------------------------------------------------+
|                         ENTERPRISE BACKEND SERVICE LAYER                          |
|                                                                                   |
|  [ Node.js + Express.js / TypeScript ] (Future Phase Implementation)              |
|  - JWT Authentication with HTTP-Only Secure Cookies                               |
|  - Role-Based Access Control (RBAC) middleware                                    |
|  - MPE mathematical calculation validation engine                                 |
|  - Digital Signature & cryptographic QR generation (ECDSA / SHA-256)             |
|  - File upload pipeline (S3 / Local encrypted blob store with MIME verification)  |
+-----------------------------------------------------------------------------------+
                                         |
                                         | Connection Pool (pg / Prisma / Kysely)
                                         v
+-----------------------------------------------------------------------------------+
|                          PERSISTENCE & AUDIT DATA LAYER                           |
|                                                                                   |
|  [ PostgreSQL Relational Database ]                                               |
|  - ACID-compliant transactions for legal metrology certifications                 |
|  - Tamper-evident audit log tables for all inspection state transitions           |
|  - Spatial GIS support (PostGIS) for inspector geo-tagging & routing              |
+-----------------------------------------------------------------------------------+
```

---

## 3. Rationale for Architectural Split

### Why React + TypeScript for Landing Page?
1. **Interactive Visual Storytelling:** Allows fluid, rich components (animated hero demonstrations, dynamic search suggestions, interactive 4-step workflow explainer, responsive language toggles).
2. **Modern Developer Ergonomics:** Type-safe props, rapid UI composition, and tree-shaken production bundles.
3. **SEO & Static Metadata:** Optimized meta tags, OpenGraph previews, and fast First Contentful Paint (FCP).

### Why HTML5 + CSS3 + Vanilla JavaScript for Service Portals?
1. **Universal Device Compatibility:** Government portals must serve users on INR 5,000 Android phones running outdated WebViews or lightweight browsers (Opera Mini, KaiOS, UC Browser).
2. **Zero Hydration Latency & CPU Overhead:** Pure DOM operations execute instantly without virtual DOM diffing overhead or megabyte-sized framework runtime downloads over unstable rural connections.
3. **Long-Term Longevity & Zero Framework Churn:** Government software must endure 5-10+ years without breaking due to framework major version deprecations.
4. **Isolated Maintenance:** Clean separation between layout templates, utility styles, and service layers makes security audits transparent and frictionless.

---

## 4. Frontend Portal Modular Architecture

The `portal/` application follows a clean **Component-and-Service-Oriented Architecture (CSOA)**:

```
portal/
├── config/
│   └── env.config.js           # Environment configuration (API_BASE_URL, mode, mock flags)
├── services/
│   ├── api.js                  # Centralized HTTP Client (fetch wrapper, error handling, interceptors)
│   ├── authService.js          # Authentication & session state management
│   ├── applicationService.js   # Application lifecycle (create, fetch, track, update)
│   ├── instrumentService.js    # Metrological instrument registration & category catalogs
│   ├── inspectionService.js    # Inspector schedules, checklists, measurements, MPE calculation
│   ├── certificateService.js   # Certificate issuance, retrieval, QR payload verification
│   ├── complaintService.js     # Citizen grievance submission & resolution status
│   └── userService.js          # Profile data, notification preferences
├── layouts/
│   ├── header.html / js        # Unified accessible header with emblem, role avatar, language
│   ├── sidebar.html / js       # Role-specific drawer navigation (Trader, Inspector, Admin)
│   └── footer.html / js        # Official government footer with accessibility links
├── components/
│   ├── button.css / js         # Tactile primary, secondary, danger, icon buttons (min 44px)
│   ├── card.css                # Visual service cards, metric cards, schedule cards
│   ├── stepper.css / js        # Visual numbered step progress bar with status indicators
│   ├── modal.css / js          # Accessible modal dialog with focus trapping & ARIA roles
│   ├── timeline.css / js       # Horizontal/vertical application progression timeline
│   ├── mpeMeter.css / js       # Interactive MPE visual gauge (tolerance band + observed error)
│   ├── qrViewer.css / js       # High-contrast certificate QR viewer & scanner trigger
│   ├── toast.css / js          # Non-obtrusive status notification toasts
│   └── dataTable.css / js      # Responsive table with automatic mobile card conversion
├── pages/
│   ├── auth/                   # Role selection, login, registration, password recovery
│   ├── citizen/                # Public complaint registration, quick tracking
│   ├── trader/                 # Trader dashboard, 5-step instrument registration, certificate list
│   ├── inspector/              # Inspector dashboard, today's schedule, 6-step guided inspection
│   ├── admin/                  # Admin overview, district metrics, inspection assignments, audit log
│   └── public/                 # Standalone QR verification page, certificate view/print
└── utils/
    ├── validator.js            # Client-side input validation with friendly error hints
    ├── storage.js              # Safe session wrapper with JSON serialization & fallback
    ├── formatters.js           # Date, currency (INR ₹), weight/volume units formatter
    └── i18n.js                 # Foundation for multilingual translations (EN, HI, Regional)
```

---

## 5. Security & Trust Principles

1. **Defense in Depth (Client-Side Non-Authority):**
   - The frontend never makes final security or authorization decisions.
   - UI role-based masking is purely for cognitive simplicity and UX ergonomics.
   - All role-guarded actions must be verified by backend JWT/Session tokens.
2. **Zero Plaintext Credentials in Storage:**
   - Passwords and sensitive personal identifiers are never cached in `localStorage` or `sessionStorage`.
   - Auth tokens are managed using HTTP-Only Secure cookies where available, or short-lived memory tokens with refresh-token rotation.
3. **No Sensitive Error Leaks:**
   - Database errors, stack traces, and internal server codes (e.g., `500 Internal Server Error`, `PG::UniqueViolation`) are intercepted at the API client level.
   - Users are presented with empathetic, action-oriented instructions: *"We could not verify this certificate right now. Please check your certificate number or try again shortly."*
4. **Input Sanitization & Output Encoding:**
   - All user inputs are sanitized before DOM insertion to prevent Cross-Site Scripting (XSS).
   - Strict Content Security Policy (CSP) headers are defined.

---

## 6. Offline-Readiness & Future Scalability

While the MVP does not require a full background sync engine, the architecture establishes the following offline-resilient primitives:
- **Service Worker Preparation:** Clean asset isolation ensures CSS, icons, and layout skeletons can be cached via Cache API.
- **Form State Local Persistence (`DraftStorage`):** Long multi-step inspection forms and instrument registrations save progress automatically to `IndexedDB` / `sessionStorage`, preventing loss of input if cellular connection drops in rural markets.
- **Deterministic Queue Abstraction:** The `api.js` client is designed with an interceptor hook that can queue outgoing inspection submissions when `navigator.onLine === false`.
