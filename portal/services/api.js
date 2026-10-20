/**
 * LEGAL MATRIX: Centralized API HTTP Client
 * Transparently delegates to mockAdapter when USE_MOCKS is enabled
 * No fetch() calls scattered in HTML
 */

import { ENV } from '../config/env.config.js';
import { mockAdapter } from './mockAdapter.js';

class ApiClient {
  constructor() {
    this.baseUrl = ENV.API_BASE_URL;
  }

  getToken() {
    return sessionStorage.getItem('lm_token') || localStorage.getItem('lm_token') || '';
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  async request(method, endpoint, body = null, params = {}) {
    // If Mock Mode is active, delegate directly to Mock Adapter
    if (ENV.USE_MOCKS) {
      const response = await mockAdapter.handle(method, endpoint, body, params);
      if (!response.success) {
        const error = new Error(response.error?.userMessage || 'An unexpected error occurred.');
        error.code = response.error?.code || 'UNKNOWN_ERROR';
        error.userMessage = response.error?.userMessage || 'We could not complete your request. Please try again.';
        throw error;
      }
      return response.data;
    }

    // Production REST API execution
    let url = `${this.baseUrl}${endpoint}`;
    if (Object.keys(params).length > 0) {
      const query = new URLSearchParams(params).toString();
      url += `?${query}`;
    }

    const options = {
      method,
      headers: this.getHeaders()
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    try {
      const res = await fetch(url, options);

      // Handle 401 Unauthorized (Session Expired)
      if (res.status === 401) {
        sessionStorage.removeItem('lm_token');
        window.location.href = '/portal/pages/auth/login.html?sessionExpired=true';
        throw new Error('Session expired. Please log in again.');
      }

      // Handle 403 Forbidden
      if (res.status === 403) {
        throw new Error('You do not have permission to perform this government action.');
      }

      const json = await res.json();
      if (!res.ok || !json.success) {
        const err = new Error(json.error?.message || 'Server error');
        err.userMessage = json.error?.userMessage || 'We could not connect to the service right now. Please try again.';
        err.code = json.error?.code;
        throw err;
      }

      return json.data;
    } catch (networkError) {
      // Never display raw technical socket/SSL errors to user
      const friendlyError = new Error(networkError.userMessage || 'We could not connect to the service right now. Please try again.');
      friendlyError.userMessage = networkError.userMessage || 'We could not connect to the service right now. Please try again.';
      friendlyError.original = networkError;
      throw friendlyError;
    }
  }

  get(endpoint, params = {}) {
    return this.request('GET', endpoint, null, params);
  }

  post(endpoint, body = {}) {
    return this.request('POST', endpoint, body);
  }

  put(endpoint, body = {}) {
    return this.request('PUT', endpoint, body);
  }

  delete(endpoint) {
    return this.request('DELETE', endpoint);
  }
}

export const api = new ApiClient();
