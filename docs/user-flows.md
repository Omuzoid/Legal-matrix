# Legal Matrix: User Journey Flows & Cognitive Reduction Maps

## 1. UX Principle: Cognitive Streamlining

Traditional government portals fail users through:
- Dense legalese and intimidating bureaucratic terminology.
- Monolithic forms requiring 30+ fields on a single scrolling page.
- Mysterious status codes (e.g., `ERR_STATUS_CODE_41_DEPT_WAIT`).
- Lack of immediate, visual affirmation that a step succeeded.

Legal Matrix solves this by enforcing **one concept per screen step**, **visual touch-first cards**, **empathetic plain-language copy**, and **unambiguous visual affirmations**.

---

## 2. Citizen User Journeys

### Journey 2.1: Instant QR Certificate Verification (Grocery / Retail Store Scenario)
A customer at a market doubts a scale's authenticity or wants to verify the government seal displayed at the billing counter.

```
[ Citizen at Market ]
         │
         │ Scans QR sticker on weighing scale with phone camera
         ▼
[ Public URL: /portal/pages/public/verify-qr.html?cert=LM-2024-00124 ]
         │
         ├─── If Valid ───► [ High-Visibility Emerald Green Banner ]
         │                   - Icon: Bold White Checkmark in Green Circle
         │                   - Headline: "CERTIFICATE VERIFIED"
         │                   - Trust Note: "Issued by Department of Legal Metrology"
         │                   - Clean Metadata: Shop Name, Instrument Type, Validity Date
         │                   - Button: [Verify Another Certificate]
         │
         └─── If Invalid ──► [ Clear Crimson Red Alert Banner ]
                             - Icon: Warning Shield
                             - Headline: "CERTIFICATE COULD NOT BE VERIFIED"
                             - Explanation: "This certificate is not found or has expired."
                             - Direct Action Button: [Report This Store / Instrument →]
```

### Journey 2.2: Reporting a Measurement Discrepancy (Consumer Grievance)
A citizen buys 1 kg of apples, but suspects the grocer's scale was manipulated.

```
[ Landing Page: "Report a Problem" ]
         │
         ▼
[ Step 1: "What would you like to report?" ]
  Visual Choice Cards:
  - ⚖ Wrong Weighing
  - 💰 Incorrect Measurement
  - 📄 Suspicious / Missing Certificate
  - 🏪 Shop Overcharging
  - ❓ Other Issue
         │
         ▼
[ Step 2: "Where did this happen?" ]
  - Store Name & City/Market
  - Optional Photo of Receipt / Scale
  - Short 1-sentence description
         │
         ▼
[ Step 3: "Your Contact Details" ]
  - Mobile Number (for SMS status updates)
         │
         ▼
[ Instant Success Card ]
  - Large Checkmark Illustration
  - "Your report has been received."
  - Reference Number: #CMP-2024-8831
  - "An inspector will investigate within 3 working days."
```

---

## 3. Trader User Journeys

### Journey 3.1: 5-Step Instrument Verification Application
A grocer needs official government verification for a newly purchased counter scale.

```
[ Trader Dashboard ] ──► Clicks [ Register New Instrument ]
         │
         ▼
[ Step 1 of 5: "What type of instrument is this?" ]
  Visual Cards (3x2 Grid):
  [ ⚖ Weighing Scale ]   [ ⛽ Fuel Dispenser ]   [ 📏 Measuring Meter ]
  [ 🚚 Weighbridge ]     [ 📦 Packaging Scale ]  [ ⋯ Other ]
         │ (Selects Weighing Scale)
         ▼
[ Step 2 of 5: "About Your Instrument" ]
  - Brand Name (e.g., Eagle)
  - Model Number (e.g., DWS-30)
  - Maximum Capacity (e.g., 30 kg)
  - Serial Number on back of scale
         │
         ▼
[ Step 3 of 5: "Shop & Purchase Details" ]
  - Shop Name (Pre-filled from profile)
  - Address (Pre-filled)
  - Upload Photo or Invoice (Simple drag-and-drop or camera capture)
         │
         ▼
[ Step 4 of 5: "Review Your Details" ]
  - Clean summary card showing scale picture, model, serial, and fee (₹150)
  - "Is all information correct?"
         │
         ▼
[ Step 5 of 5: "Submission & Tracking" ]
  - Visual Celebration / Green Checkmark
  - "Application Submitted Successfully!"
  - Application Number: LM-2024-00124
  - Action Buttons: [Track Application Now] or [Back to Dashboard]
```

### Journey 3.2: Tracking Existing Application Status
```
[ Trader enters LM-2024-00124 ]
         │
         ▼
[ Visual 5-Stage Stepper Banner ]
  (✓) Submitted ──► (✓) Fee Paid ──► (●) Inspection Scheduled ──► (○) Calibrated ──► (○) Certificate Issued
         │
         ▼
[ Prominent Current Status Card ]
  - Avatar: Inspector Singh Illustration
  - Title: "Inspection Scheduled for 15 Jan 2024"
  - Subtitle: "Inspector Singh will visit Sharma General Store between 10:00 AM - 12:00 PM."
  - Advice: "Please keep the instrument clean and purchase invoice ready."
```

---

## 4. Field Inspector User Journeys

### Journey 4.1: Daily Field Inspection & Calibration
Inspector Singh arrives at Sharma General Store with standard test weights.

```
[ Inspector Dashboard ]
  - Today's Metric: 5 Inspections Scheduled
  - Selects: "Sharma General Store (10:30 AM)" ──► Clicks [Start Inspection]
         │
         ▼
[ Step 1: Trader & Instrument Verification ]
  - Verifies Serial Number physically on device matches SN-882910-2023
         │
         ▼
[ Step 2: Visual & Physical Inspection Checklist ]
  - Large High-Contrast Tactile Toggle Buttons:
    • Any physical damage to body? [ NO ✓ ] [ YES ]
    • Display clearly legible?      [ YES ✓ ] [ NO ]
    • Level indicator centered?     [ YES ✓ ] [ NO ]
    • Lead seal intact?             [ YES ✓ ] [ NO ]
         │
         ▼
[ Step 3: Measurement & MPE Tolerance Gauge ]
  - Test Load applied: 10 kg
  - Scale Readout entered: 10.0002 kg
  - Observed Error: +0.20 g
  - Maximum Permissible Error (MPE): 0.50 g
  - Visual Tolerance Gauge:
    Needle floats safely in green zone at +0.20g.
  - Automatic Green Banner: [ ✓ Result: Within Permitted Limit ]
  - Link: [? What does this mean?] opens layman guidance
         │
         ▼
[ Step 4: Photographic Evidence ]
  - One-tap camera capture of instrument stamping seal
         │
         ▼
[ Step 5: Final Decision & Digital Sign-off ]
  - Action: [ PASS & APPROVE CERTIFICATE ] or [ REJECT / RE-CALIBRATE ]
  - Irreversible Action Confirmation Modal:
    "Are you sure you want to approve this weighing scale? A digital legal certificate will be instantly issued."
  - [ Confirm & Issue Certificate ]
```

---

## 5. Government Administrator User Journeys

```
[ Admin Dashboard Overview ]
  - Top Metrics: 1,248 Applications | 230 Pending | 892 Certified | 34 Complaints
  - Visual Bar Chart: Monthly Verification Trends
  - Real-Time Activity Feed:
    • "Certificate LM-2024-00124 issued for Sharma General Store" (1 min ago)
    • "Complaint #8831 assigned to Inspector Verma" (12 mins ago)
  - Global Search & Filtering:
    • Search by Trader, Certificate, Inspector, or District
  - Inspector Allocation Modal:
    • 1-click re-assignment of pending inspections based on district workload
```
