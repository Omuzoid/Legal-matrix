/**
 * LEGAL MATRIX: Accessible Input Validation Utility
 */

export const validator = {
  isValidPhone(phone) {
    const clean = phone.replace(/[^0-9]/g, '');
    return clean.length >= 10;
  },

  isValidApplicationNumber(appNum) {
    return /^LM-\d{4}-\d{5}$/i.test(appNum.trim());
  },

  isNotEmpty(val) {
    return val !== null && val !== undefined && String(val).trim().length > 0;
  },

  markField(inputElement, isValid, errorMessage = '') {
    if (!inputElement) return;
    const parent = inputElement.closest('div') || inputElement.parentElement;
    let errorEl = parent.querySelector('.form-error');

    if (!isValid) {
      inputElement.classList.add('is-invalid');
      inputElement.setAttribute('aria-invalid', 'true');
      if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'form-error';
        parent.appendChild(errorEl);
      }
      errorEl.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:inline-block; vertical-align:-1px; margin-right:4px;" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>${errorMessage}`;
    } else {
      inputElement.classList.remove('is-invalid');
      inputElement.removeAttribute('aria-invalid');
      if (errorEl) errorEl.remove();
    }
  }
};
