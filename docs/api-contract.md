# Legal Matrix: Centralized REST API Contract Specification

## 1. Global Standards & Envelope Convention

All Legal Matrix frontend services interact with the backend API adhering to strict JSON envelope contracts. 

### 1.1 Request Headers
- `Content-Type: application/json`
- `Accept: application/json`
- `Authorization: Bearer <JWT_ACCESS_TOKEN>` (for authenticated routes)
- `X-Client-Version: 1.0.0`
- `X-Language-Preference: en | hi`

### 1.2 Standard Success Envelope
```json
{
  "success": true,
  "data": {},
  "meta": {
    "timestamp": "2026-10-02T12:00:00Z",
    "page": 1,
    "limit": 10,
    "total": 45
  },
  "error": null
}
```

### 1.3 Standard Error Envelope (Human-Empathetic)
Every error provides both a developer debug code and a pre-formatted, low-cognitive-load `userMessage` so page scripts never display technical jargon.
```json
{
  "success": false,
  "data": null,
  "meta": {
    "timestamp": "2026-10-02T12:00:00Z"
  },
  "error": {
    "code": "MPE_TOLERANCE_EXCEEDED",
    "message": "Observed error +0.72g exceeds maximum permissible tolerance of +/-0.50g for Class III commercial scale.",
    "userMessage": "The observed error is greater than the legal limit permitted for this scale.",
    "fieldErrors": [
      {
        "field": "observedError",
        "message": "Value must be between -0.50g and +0.50g"
      }
    ]
  }
}
```

---

## 2. Authentication & Session Endpoints (`/api/v1/auth`)

### 2.1 Login
- **Endpoint:** `POST /api/v1/auth/login`
- **Request Body:**
```json
{
  "role": "TRADER | INSPECTOR | ADMIN | CITIZEN",
  "identifier": "rajesh@sharmastore.com | 9876543210",
  "password": "Password123!"
}
```
- **Response Data (`200 OK`):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsIn...",
  "user": {
    "id": "usr_99120",
    "name": "Rajesh Kumar",
    "role": "TRADER",
    "establishmentName": "Sharma General Store",
    "location": "Lucknow, Uttar Pradesh",
    "avatar": "/assets/images/trader-avatar.png"
  }
}
```

### 2.2 Current User Profile
- **Endpoint:** `GET /api/v1/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response Data (`200 OK`):** Current authenticated user details and active permissions.

---

## 3. Application Lifecycle Endpoints (`/api/v1/applications`)

### 3.1 List Trader Applications
- **Endpoint:** `GET /api/v1/applications`
- **Query Params:** `status=ALL | PENDING | SCHEDULED | COMPLETED&page=1&limit=10`
- **Response Data (`200 OK`):** Array of trader application summaries.

### 3.2 Track Application by Number (Public Access)
- **Endpoint:** `GET /api/v1/applications/track/:applicationNumber`
- **Example:** `GET /api/v1/applications/track/LM-2024-00124`
- **Response Data (`200 OK`):**
```json
{
  "applicationNumber": "LM-2024-00124",
  "appliedOn": "2024-01-12T09:30:00Z",
  "trader": {
    "name": "Sharma General Store",
    "proprietor": "Rajesh Kumar",
    "address": "Shop 14, Main Market, Hazratganj, Lucknow"
  },
  "instrument": {
    "type": "WEIGHING_SCALE",
    "typeName": "Digital Weighing Scale",
    "model": "DWS-30KG-PRO",
    "serialNumber": "SN-882910-2023",
    "maxCapacity": "30 kg",
    "verificationDivision": "5 g"
  },
  "currentStatus": {
    "stage": "INSPECTION_SCHEDULED",
    "title": "Inspection Scheduled",
    "description": "Your inspection is scheduled on 15 Jan 2024 with Inspector Singh.",
    "scheduledDate": "2024-01-15T10:30:00Z"
  },
  "stages": [
    { "id": 1, "name": "Submitted", "date": "12 Jan 2024", "status": "COMPLETED" },
    { "id": 2, "name": "Payment", "date": "12 Jan 2024", "status": "COMPLETED" },
    { "id": 3, "name": "Inspection", "date": "15 Jan 2024", "status": "IN_PROGRESS" },
    { "id": 4, "name": "Verification", "date": "Pending", "status": "PENDING" },
    { "id": 5, "name": "Certificate", "date": "Pending", "status": "PENDING" }
  ]
}
```

### 3.3 Create New Instrument Verification Application
- **Endpoint:** `POST /api/v1/applications`
- **Request Body:**
```json
{
  "instrumentType": "WEIGHING_SCALE",
  "brand": "Eagle Electronics",
  "model": "DWS-30KG",
  "serialNumber": "EE-99214-2024",
  "capacity": "30kg",
  "accuracyClass": "CLASS_III",
  "establishmentName": "Sharma General Store",
  "address": "Hazratganj, Lucknow",
  "documentUrl": "https://cdn.legalmatrix.gov.in/docs/invoice-99.pdf"
}
```
- **Response Data (`201 Created`):**
```json
{
  "applicationId": "app_2024_00124",
  "applicationNumber": "LM-2024-00124",
  "status": "SUBMITTED",
  "paymentUrl": "/portal/pages/trader/payment.html?app=LM-2024-00124",
  "message": "Application registered successfully."
}
```

---

## 4. Inspection & MPE Workflow Endpoints (`/api/v1/inspections`)

### 4.1 Inspector Schedule
- **Endpoint:** `GET /api/v1/inspections/schedule`
- **Query Params:** `date=2024-01-15`
- **Response Data (`200 OK`):**
```json
[
  {
    "id": "insp_101",
    "applicationNumber": "LM-2024-00124",
    "traderName": "Sharma General Store",
    "instrument": "Digital Weighing Scale",
    "time": "10:30 AM",
    "address": "Hazratganj, Lucknow",
    "status": "PENDING",
    "priority": "HIGH"
  },
  {
    "id": "insp_102",
    "applicationNumber": "LM-2024-00125",
    "traderName": "Gupta Rice Mill",
    "instrument": "Weighbridge (50 Ton)",
    "time": "11:45 AM",
    "address": "Transport Nagar, Lucknow",
    "status": "IN_PROGRESS",
    "priority": "MEDIUM"
  },
  {
    "id": "insp_103",
    "applicationNumber": "LM-2024-00126",
    "traderName": "City Fuel Station",
    "instrument": "Fuel Dispenser",
    "time": "02:00 PM",
    "address": "Alambagh, Lucknow",
    "status": "PENDING",
    "priority": "NORMAL"
  }
]
```

### 4.2 MPE Tolerance Calculation & Verification
- **Endpoint:** `POST /api/v1/inspections/:id/calculate-mpe`
- **Request Body:**
```json
{
  "instrumentClass": "CLASS_III",
  "testLoad": 10.00,
  "unit": "kg",
  "observedReading": 10.0002,
  "maximumPermissibleError": 0.0005
}
```
- **Response Data (`200 OK`):**
```json
{
  "observedError": 0.0002,
  "maximumPermissibleError": 0.0005,
  "unit": "g",
  "isWithinTolerance": true,
  "percentageOfTolerance": 40.0,
  "verdict": "PASS",
  "verdictText": "Within Permitted Limit",
  "explanation": "The observed discrepancy (+0.20g) is well within the legal tolerance of +/-0.50g under Legal Metrology Rules."
}
```

### 4.3 Finalize Inspection Decision
- **Endpoint:** `POST /api/v1/inspections/:id/finalize`
- **Request Body:**
```json
{
  "decision": "PASS | FAIL",
  "checklistAnswers": {
    "physicalDamage": false,
    "displayFunctional": true,
    "levelIndicatorCentered": true,
    "sealsIntact": true
  },
  "observedError": 0.20,
  "mpeLimit": 0.50,
  "evidencePhotoUrls": ["https://cdn.legalmatrix.gov.in/evidence/photo1.jpg"],
  "inspectorRemarks": "Instrument calibrated with certified standard weight kit #ST-99. Stamped with seal #UP-LM-2024-41."
}
```

---

## 5. Official Certificates & QR Verification (`/api/v1/certificates`)

### 5.1 Public Certificate Verification by Number or QR Token
- **Endpoint:** `GET /api/v1/certificates/verify/:tokenOrCertNumber`
- **Example:** `GET /api/v1/certificates/verify/LM-2024-00124`
- **Response Data (`200 OK`):**
```json
{
  "isValid": true,
  "status": "VALID",
  "certificateNumber": "LM-2024-00124",
  "instrument": "Digital Weighing Scale",
  "owner": "Sharma General Store",
  "proprietor": "Rajesh Kumar",
  "location": "Shop 14, Main Market, Hazratganj, Lucknow",
  "issueDate": "15 Jan 2024",
  "validUntil": "15 Jan 2025",
  "issuingAuthority": "Department of Legal Metrology, Government of Uttar Pradesh",
  "inspectorName": "Inspector Singh",
  "qrPayload": "https://legalmatrix.gov.in/portal/pages/public/verify-qr.html?cert=LM-2024-00124"
}
```

### 5.2 Invalid / Revoked Certificate Response
- **Response Data (`200 OK` with valid=false):**
```json
{
  "isValid": false,
  "status": "REVOKED | NOT_FOUND | EXPIRED",
  "userMessage": "We could not verify this certificate. It may be expired, invalid, or never issued.",
  "actionAdvice": "If you suspect fraudulent measuring equipment, you can report it directly using our Grievance Portal."
}
```

---

## 6. Citizen Grievance & Complaint Reporting (`/api/v1/complaints`)

### 6.1 Submit Consumer Complaint
- **Endpoint:** `POST /api/v1/complaints`
- **Request Body:**
```json
{
  "issueType": "WRONG_WEIGHING | INCORRECT_MEASUREMENT | SUSPICIOUS_CERTIFICATE | SHOP_ISSUE | OTHER",
  "shopName": "Local Grocery Store",
  "address": "Chowk Bazar, Lucknow",
  "description": "The scale display was obscured and weight charged was 1.2kg instead of 1.0kg.",
  "contactPhone": "9876543210",
  "photoEvidenceUrl": null
}
```
- **Response Data (`201 Created`):**
```json
{
  "complaintNumber": "CMP-2024-8831",
  "registeredDate": "2024-01-15T14:20:00Z",
  "status": "RECEIVED",
  "estimatedResolutionDays": 3,
  "userMessage": "Your report has been received. Our field inspection team will investigate."
}
```

---

## 7. Administrator Analytics & Activity (`/api/v1/admin`)

### 7.1 Dashboard Metrics Overview
- **Endpoint:** `GET /api/v1/admin/overview`
- **Response Data (`200 OK`):**
```json
{
  "metrics": {
    "totalApplications": 1248,
    "pendingInspections": 230,
    "certificatesIssued": 892,
    "complaints": 34,
    "failedInspections": 18
  },
  "monthlyTrends": [
    { "month": "Jan", "applications": 180, "inspections": 160 },
    { "month": "Feb", "applications": 220, "inspections": 210 },
    { "month": "Mar", "applications": 310, "inspections": 290 },
    { "month": "Apr", "applications": 260, "inspections": 240 },
    { "month": "May", "applications": 380, "inspections": 350 },
    { "month": "Jun", "applications": 420, "inspections": 390 }
  ],
  "recentActivities": [
    { "type": "APPLICATION_SUBMITTED", "text": "New application submitted for Weighing Scale", "time": "2 mins ago" },
    { "type": "INSPECTION_COMPLETED", "text": "Inspection completed for Sharma General Store", "time": "15 mins ago" },
    { "type": "CERTIFICATE_ISSUED", "text": "Certificate LM-2024-00124 issued", "time": "1 hour ago" },
    { "type": "COMPLAINT_RECEIVED", "text": "New consumer complaint received in Zone 4", "time": "2 hours ago" }
  ]
}
```
