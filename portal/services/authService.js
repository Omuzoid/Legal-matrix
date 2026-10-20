/**
 * LEGAL MATRIX: Authentication & Session Service
 */

import { api } from './api.js';

export const authService = {
  async login(role, identifier, password) {
    const data = await api.post('/auth/login', { role, identifier, password });
    if (data.token) {
      sessionStorage.setItem('lm_token', data.token);
      sessionStorage.setItem('lm_user', JSON.stringify(data.user));
    }
    return data;
  },

  logout() {
    sessionStorage.removeItem('lm_token');
    sessionStorage.removeItem('lm_user');
    window.location.href = '/portal/pages/auth/login.html';
  },

  getCurrentUser() {
    try {
      const user = sessionStorage.getItem('lm_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return !!sessionStorage.getItem('lm_token');
  },

  getUserRole() {
    const user = this.getCurrentUser();
    return user ? user.role : 'CITIZEN';
  }
};
