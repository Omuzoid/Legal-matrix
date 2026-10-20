/**
 * LEGAL MATRIX: Application Lifecycle & Tracking Service
 */

import { api } from './api.js';

export const applicationService = {
  async getApplications(filter = {}) {
    return api.get('/applications', filter);
  },

  async trackApplication(applicationNumber) {
    return api.get(`/applications/track/${encodeURIComponent(applicationNumber)}`);
  },

  async createApplication(applicationData) {
    return api.post('/applications', applicationData);
  }
};
