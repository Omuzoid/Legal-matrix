/**
 * LEGAL MATRIX: Field Inspection & MPE Service
 */

import { api } from './api.js';

export const inspectionService = {
  async getSchedule(date = null) {
    return api.get('/inspections/schedule', { date });
  },

  async calculateMpe(data) {
    return api.post('/inspections/calculate-mpe', data);
  },

  async finalizeInspection(inspectionId, submissionData) {
    return api.post(`/inspections/${inspectionId}/finalize`, submissionData);
  }
};
