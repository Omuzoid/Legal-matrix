/**
 * LEGAL MATRIX: Global Environment & Configuration
 * Controls base URL, mock sandbox toggle, and timeout thresholds
 */

export const ENV = {
  API_BASE_URL: 'http://localhost:5000/api/v1',
  USE_MOCKS: true, // Set to false to connect directly to Node.js backend
  SIMULATED_LATENCY_MS: 300,
  APP_NAME: 'Legal Matrix',
  APP_VERSION: '1.0.0',
  DEFAULT_LANGUAGE: 'en'
};
