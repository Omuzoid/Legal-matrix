/**
 * LEGAL MATRIX: Safe Draft Storage & Session Cache Wrapper
 */

export const draftStorage = {
  saveDraft(key, data) {
    try {
      localStorage.setItem(`lm_draft_${key}`, JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  },

  loadDraft(key) {
    try {
      const data = localStorage.getItem(`lm_draft_${key}`);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  clearDraft(key) {
    localStorage.removeItem(`lm_draft_${key}`);
  }
};

/**
 * Purges legacy mock, demo, and prototype entries from browser storage
 * while strictly safeguarding active user preferences (such as legalMatrixLanguage)
 * and active authentication session tokens.
 */
export function cleanupPrototypeStorage() {
  try {
    const preserveKeys = ['legalMatrixLanguage', 'lm_auth_token', 'lm_session', 'lm_user'];
    const keysToRemove = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      const isPreserved = preserveKeys.some(pk => key === pk || key.startsWith('lm_auth'));
      if (!isPreserved && (
        key.startsWith('lm_mock') ||
        key.startsWith('mock_') ||
        key.startsWith('demo_') ||
        key.startsWith('prototype_') ||
        key.includes('sample') ||
        key.includes('fake')
      )) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(k => localStorage.removeItem(k));
  } catch (err) {
    console.warn('Storage cleanup non-critical notice:', err);
  }
}

// Auto-run cleanup on initial load
cleanupPrototypeStorage();
