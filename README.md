# LEGAL MATRIX
### Digital Legal Metrology Platform for India

> **A modern, accessible, visual-first public service ecosystem for legal metrology:empowering citizens, traders, inspectors, and administrators with zero-friction verification, certification, and calibration tracking.**

---

## 🏛️ Project Overview

Legal Matrix is built from scratch to replace antiquated, dense government portals with a visual-first, low-cognitive-load digital experience. Whether accessed by a rural shopkeeper registering a counter scale, an elderly citizen verifying a market vendor's certificate via QR code, an official field inspector checking tolerances on a weighbridge, or a state administrator monitoring compliance, Legal Matrix communicates with **visual clarity, familiar symbols, tactile controls, and empathetic language**.

---

## 📐 Dual-Tier Architecture

```
                               LEGAL MATRIX
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
┌─────────────────────────────┐                     ┌─────────────────────────────┐
│    PUBLIC LANDING WEB       │                     │  GOVERNMENT SERVICE PORTAL  │
│  React 18 + TypeScript      │                     │  HTML5 + CSS3 + Vanilla JS  │
│       (/landing/)           │                     │         (/portal/)          │
│                             │                     │                             │
│  • Public Education         │   Navigates into    │  • 100% Zero-Framework Run  │
│  • Visual Workflow Hero     │ ──────────────────► │  • Universal Low-End Device │
│  • Trust Indicators         │     Services /      │  • Trader Registration      │
│  • Public QR Quick Scan     │    Workflows /      │  • Application Tracking     │
│  • Interactive Explainer    │       Login         │  • Field Inspector & MPE    │
│  • High Visual Polish       │                     │  • Admin Control Center     │
└─────────────────────────────┘                     └──────────────┬──────────────┘
                                                                   │
                                                                   ▼
                                                    ┌─────────────────────────────┐
                                                    │  CENTRALIZED API LAYER      │
                                                    │    (/portal/services/)      │
                                                    │                             │
                                                    │  • api.js HTTP Client       │
                                                    │  • Mock Adapter (Sandbox)   │
                                                    │  • Ready for Node.js REST   │
                                                    └─────────────────────────────┘
```

---

## 🗂️ Project Directory Structure

```
LEGAL MATRIX/
├── landing/                    # React 18 + TypeScript Public Landing Page
│   ├── public/                 # Static assets, favicon, manifest
│   ├── src/                    # Components, Hero, Sections, Styles
│   ├── index.html              # Entry HTML
│   ├── package.json            # React & Vite configuration
│   ├── tsconfig.json           # TypeScript configuration
│   └── vite.config.ts          # Vite build config
│
├── portal/                     # Operational Service Portal (HTML/CSS/Vanilla JS)
│   ├── assets/                 # Icons, SVG badges, government seals
│   │   ├── icons/              # Lucide SVG vector collection
│   │   └── images/             # Visual illustrations & avatars
│   ├── components/             # Reusable UI components
│   │   ├── button.css          # Tactile 44px+ buttons
│   │   ├── card.css            # Visual choice cards & metric cards
│   │   ├── stepper.css / js    # Multi-step progress tracker
│   │   ├── timeline.css / js   # Application tracking timeline
│   │   ├── mpeMeter.css / js   # Interactive MPE tolerance meter
│   │   ├── modal.css / js      # Accessible modal dialogs with focus trap
│   │   ├── toast.css / js      # Accessible status toasts
│   │   └── dataTable.css / js  # Responsive table to mobile card switcher
│   ├── config/
│   │   └── env.config.js       # Centralized API base URL & mock toggle
│   ├── css/
│   │   ├── variables.css       # Complete design token definitions
│   │   ├── base.css            # Reset, typography, accessibility rings
│   │   └── layout.css          # Responsive containers, grid & header/sidebar
│   ├── js/                     # Global portal scripts
│   ├── layouts/
│   │   ├── header.js           # Government header with emblem & language
│   │   ├── sidebar.js          # Role-based collapsible drawer
│   │   └── footer.js           # Standard government footer
│   ├── pages/
│   │   ├── auth/               # Login, Register, Forgot Password
│   │   ├── public/             # Services Catalog, QR Verification, Track App
│   │   ├── citizen/            # Consumer Grievance / Report Problem
│   │   ├── trader/             # Trader Dashboard, Register Instrument, Certificates
│   │   ├── inspector/          # Inspector Dashboard, Guided 6-Step Inspection & MPE
│   │   └── admin/              # Administrator Dashboard, Audit Log, Assignments
│   ├── services/               # Centralized API Layer
│   │   ├── api.js              # Fetch client wrapper with interceptors
│   │   ├── mockAdapter.js      # Realistic development mock sandbox
│   │   ├── authService.js      # Auth & session token management
│   │   ├── applicationService.js# Applications lifecycle & tracker
│   │   ├── instrumentService.js# Instrument catalog & specs
│   │   ├── inspectionService.js# Inspection forms & MPE verification
│   │   ├── certificateService.js# Official certificates & QR validation
│   │   └── complaintService.js # Citizen grievances
│   └── utils/
│       ├── validator.js        # Empathetic input validator
│       ├── storage.js          # Draft auto-save & session wrapper
│       ├── formatters.js       # Indian Currency (₹), Dates, Weight units
│       └── i18n.js             # Multilingual dictionary engine
│
├── docs/                       # Official Engineering Documentation
│   ├── architecture.md         # System & Technical Architecture Specification
│   ├── design-system.md        # Tokens, Accessibility Standards & Components
│   ├── frontend-architecture.md# Dual-Tier Portal & React Architecture
│   ├── api-contract.md         # REST API Request/Response Envelopes
│   ├── user-flows.md           # User Journey Maps & Cognitive Reduction
│   └── testing.md              # WCAG 2.1 AA Checklist & Test Strategy
│
└── README.md                   # This master documentation
```

---

## 🎨 Design Philosophy: The Visual-First Standard

Legal Matrix rejects traditional walls of text:
1. **Visual Cues on Every Action:** Clear iconography for every instrument, service, and status.
2. **Short, Empathetic Instructions:** "Verify Your Instrument" instead of *"Application for Verification and Stamping of Weights and Measures"*.
3. **Never Color Alone:** Every status badge combines **Icon + Color + Text** (`✓ Valid`, `! Scheduled`, `× Exceeded Limit`).
4. **Interactive MPE Meter:** Turns dry mathematics into an intuitive slider with green tolerance bands and plain-language explanations.
5. **Universal Touch Targets:** Minimum 44px × 44px clickable areas for elderly or first-time smartphone users.

---

## 🚀 Development Roadmap & Phases

- **Phase 1:** Design System, Tokens, Common CSS, Layout & Centralized API Mock Engine
- **Phase 2:** React + TypeScript Public Landing Page
- **Phase 3:** Public Service Portal (Services Catalog, QR Verification & Application Tracking)
- **Phase 4:** Authentication UI (Visual Role Selector, Login, Registration)
- **Phase 5:** Trader Portal (Dashboard, 5-Step Instrument Registration, Certificates)
- **Phase 6:** Field Inspector Portal (Dashboard, Schedule, 6-Step Guided Inspection & MPE Gauge)
- **Phase 7:** Certificate Viewer (Official Stamping Template, QR Code & Print Engine)
- **Phase 8:** Citizen Grievance Portal & Admin Command Center (Analytics, Tables, Logs)
- **Phase 9:** API Integration Architecture & Production Switch
- **Phase 10:** Accessibility Audit, Mobile Testing & Responsive Optimization
- **Phase 11:** End-to-End User Testing & Bug Resolution
