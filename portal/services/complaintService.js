/**
 * LEGAL MATRIX: Citizen Grievance & Complaint Service
 */

import { api } from './api.js';

export const complaintService = {
  async submitComplaint(complaintData) {
    return api.post('/complaints', complaintData);
  }
};
