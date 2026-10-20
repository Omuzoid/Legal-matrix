/**
 * LEGAL MATRIX: Certificate Verification & Official Issuance Service
 */

import { api } from './api.js';

export const certificateService = {
  async verifyByNumberOrQr(tokenOrNumber) {
    return api.get(`/certificates/verify/${encodeURIComponent(tokenOrNumber)}`);
  },

  async getCertificate(certificateNumber) {
    return api.get(`/certificates/verify/${encodeURIComponent(certificateNumber)}`);
  }
};
