/**
 * LEGAL MATRIX: Mock Sandbox Adapter
 * Realistic government metrology data matching reference specifications
 */

import { ENV } from '../config/env.config.js';

// In-Memory Clean State (No hardcoded fake operational records)
const mockDatabase = {
  currentUser: null,
  applications: [],
  certificates: [],
  inspectorSchedule: [],
  complaints: [],
  adminMetrics: {
    totalApplications: 0,
    pendingInspections: 0,
    certificatesIssued: 0,
    complaints: 0,
    monthlyTrends: [],
    recentActivities: []
  }
};

// Helper for simulated delay
const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const mockAdapter = {
  async handle(method, endpoint, body = null, params = {}) {
    await delay(ENV.SIMULATED_LATENCY_MS);

    // Normalize endpoint string
    const cleanEndpoint = endpoint.replace('/api/v1', '');

    // Auth endpoints
    if (cleanEndpoint.startsWith('/auth/login')) {
      const role = body?.role || 'TRADER';
      const user = {
        id: `usr_${role.toLowerCase()}_${Date.now()}`,
        name: body?.name || (role === 'TRADER' ? 'Registered Commercial Trader' : role === 'INSPECTOR' ? 'Legal Metrology Officer' : 'Controller of Legal Metrology'),
        role,
        establishment: role === 'TRADER' ? (body?.establishment || 'Commercial Enterprise') : undefined,
        location: body?.location || 'State Jurisdiction',
        phone: body?.phone || '',
        title: role === 'INSPECTOR' ? 'Field Verification Officer' : role === 'ADMIN' ? 'State Directorate of Legal Metrology' : undefined
      };
      mockDatabase.currentUser = user;
      return { success: true, data: { token: 'mock-jwt-token-9981', user } };
    }

    if (cleanEndpoint.startsWith('/auth/me')) {
      return { success: true, data: mockDatabase.currentUser };
    }

    // Application Tracking Endpoint
    if (cleanEndpoint.startsWith('/applications/track/')) {
      const appNumber = cleanEndpoint.split('/').pop().toUpperCase().trim();
      const app = mockDatabase.applications.find(a => 
        a.applicationNumber.toUpperCase() === appNumber ||
        a.applicationNumber.replace('2024', '2026').toUpperCase() === appNumber ||
        a.applicationNumber.replace('2026', '2024').toUpperCase() === appNumber
      );
      if (app) {
        return { success: true, data: app };
      }
      // Return 404 friendly
      return {
        success: false,
        error: {
          code: 'APPLICATION_NOT_FOUND',
          userMessage: `We could not find application "${appNumber}". Please check the number and try again.`
        }
      };
    }

    // Applications List & Create
    if (cleanEndpoint === '/applications' && method === 'GET') {
      return { success: true, data: mockDatabase.applications };
    }

    if (cleanEndpoint === '/applications' && method === 'POST') {
      const newAppNumber = `LM-2026-00${101 + mockDatabase.applications.length}`;
      const newApp = {
        id: `app_${Date.now()}`,
        applicationNumber: newAppNumber,
        instrumentType: body.instrumentType || 'WEIGHING_SCALE',
        instrumentTypeName: body.instrumentTypeName || 'Commercial Weighing Scale',
        brand: body.brand || 'Unspecified',
        model: body.model || 'Standard',
        serialNumber: body.serialNumber || `SN-${Math.floor(100000 + Math.random() * 900000)}`,
        capacity: body.capacity || '30 kg',
        traderName: body.traderName || 'Registered Enterprise',
        address: body.address || 'Commercial Premises',
        appliedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'SUBMITTED',
        statusTitle: 'Application Submitted',
        statusMessage: 'Your application has been received and is queued for verification fee processing.',
        feePaid: 250,
        stages: [
          { id: 1, name: 'Submitted', date: 'Today', status: 'COMPLETED' },
          { id: 2, name: 'Payment Pending', date: 'Pending', status: 'IN_PROGRESS' },
          { id: 3, name: 'Inspection', date: 'Pending', status: 'PENDING' },
          { id: 4, name: 'Verification', date: 'Pending', status: 'PENDING' },
          { id: 5, name: 'Certificate', date: 'Pending', status: 'PENDING' }
        ]
      };
      mockDatabase.applications.unshift(newApp);
      return { success: true, data: newApp };
    }

    // Inspector Schedule & Inspections
    if (cleanEndpoint === '/inspections/schedule') {
      return { success: true, data: mockDatabase.inspectorSchedule };
    }

    if (cleanEndpoint.includes('/calculate-mpe')) {
      const observed = parseFloat(body?.observedReading) || 0.20;
      const mpe = parseFloat(body?.maximumPermissibleError) || 0.50;
      const isPass = Math.abs(observed) <= mpe;
      return {
        success: true,
        data: {
          observed,
          mpe,
          unit: 'g',
          isWithinTolerance: isPass,
          verdict: isPass ? 'PASS' : 'FAIL',
          verdictText: isPass ? 'Within Permitted Limit' : 'Outside Permitted Limit'
        }
      };
    }

    if (cleanEndpoint.includes('/finalize')) {
      const decision = body?.decision || 'PASS';
      const certNumber = `CERT-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      if (decision === 'PASS') {
        mockDatabase.certificates.unshift({
          certificateNumber: certNumber,
          applicationNumber: body?.appNumber || `LM-2026-${Math.floor(10000 + Math.random() * 90000)}`,
          instrument: body?.instrument || 'Commercial Weighing Scale',
          model: body?.model || 'Standard',
          serialNumber: body?.serialNumber || 'SN-VERIFIED',
          owner: body?.traderName || 'Registered Trader',
          issueDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          validUntil: '1 Year from Stamping',
          status: 'VALID',
          issuingAuthority: 'Department of Legal Metrology',
          observedError: `${body?.observed || 0.20} g`,
          mpeAllowed: '+/-0.50 g',
          stampSealNumber: `SEAL-${Math.floor(1000 + Math.random() * 9000)}`,
          qrPayload: `/portal/pages/public/verify-qr.html?cert=${certNumber}`
        });
      }
      return {
        success: true,
        data: {
          certificateNumber: certNumber,
          decision,
          message: 'Inspection submitted successfully. Digital stamp recorded in ledger.'
        }
      };
    }

    // Certificates & QR Verification
    if (cleanEndpoint.startsWith('/certificates/verify/')) {
      const certNum = cleanEndpoint.split('/').pop().toUpperCase().trim();
      const cert = mockDatabase.certificates.find(c => c.certificateNumber.toUpperCase() === certNum);
      if (cert) {
        return { success: true, data: { isValid: true, ...cert } };
      }
      return {
        success: false,
        error: {
          code: 'CERTIFICATE_INVALID',
          userMessage: 'We could not verify this certificate. Please check the QR code or certificate number.'
        }
      };
    }

    // Complaints
    if (cleanEndpoint === '/complaints' && method === 'POST') {
      const complaintNumber = `CMP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newComplaint = {
        complaintNumber,
        ...body,
        status: 'RECEIVED',
        reportedOn: 'Today'
      };
      mockDatabase.complaints.unshift(newComplaint);
      return {
        success: true,
        data: {
          complaintNumber,
          message: 'Your report has been received. Our inspection team will investigate.'
        }
      };
    }

    // Admin Overview
    if (cleanEndpoint === '/admin/overview') {
      return { success: true, data: mockDatabase.adminMetrics };
    }

    // Fallback
    return { success: true, data: {} };
  }
};
