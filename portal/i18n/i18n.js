/**
 * LEGAL MATRIX: Centralized Localization Engine
 * Supports seamless switching between English and Hindi
 * Persistent across sessions via sessionStorage ('legalMatrixLanguage')
 * Zero reload translation for DOM elements and dynamic JS content
 */

import { en } from './en.js';
import { hi } from './hi.js';

const STORAGE_KEY = 'legalMatrixLanguage';
const dictionaries = { en, hi };
const listeners = new Set();

/**
 * Get currently selected language ('en' or 'hi')
 */
export function getLanguage() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === 'hi' || stored === 'en') {
      return stored;
    }
  } catch {
    // SessionStorage may be restricted in some sandboxes
  }
  return 'en';
}

/**
 * Translate a key into the active language
 * @param {string} key - Dictionary key (e.g. 'nav.home')
 * @param {string} [fallback] - Fallback string if key is not found
 * @returns {string}
 */
export function t(key, fallback = '') {
  const lang = getLanguage();
  const dict = dictionaries[lang] || dictionaries.en;
  if (dict && dict[key] !== undefined) {
    return dict[key];
  }
  if (dictionaries.en && dictionaries.en[key] !== undefined) {
    return dictionaries.en[key];
  }
  return fallback || key;
}

/**
 * Set active language and immediately update the entire page DOM
 * @param {'en' | 'hi'} lang
 */
export function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'hi') lang = 'en';

  try {
    sessionStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Fallback if storage fails
  }

  // Update HTML lang attribute
  if (document.documentElement) {
    document.documentElement.setAttribute('lang', lang);
  }

  // Translate all marked DOM elements
  applyLanguageToDOM();

  // Notify registered observers
  listeners.forEach((callback) => {
    try {
      callback(lang);
    } catch (err) {
      console.error('Error in language change listener:', err);
    }
  });

  // Dispatch custom window event
  window.dispatchEvent(new CustomEvent('legalMatrixLanguageChange', { detail: { lang } }));
}

/**
 * Register a listener callback to run when language changes
 * @param {Function} callback
 * @returns {Function} Unsubscribe function
 */
export function onLanguageChange(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

/**
 * Scans the DOM and applies translations to all data-i18n attributes
 * @param {HTMLElement|Document} root
 */
export function applyLanguageToDOM(root = document) {
  const currentLang = getLanguage();

  // 1. Text Content
  const textElements = root.querySelectorAll('[data-i18n]');
  textElements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key, el.textContent);
    }
  });

  // 2. HTML Content (safe formatting)
  const htmlElements = root.querySelectorAll('[data-i18n-html]');
  htmlElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (key) {
      el.innerHTML = t(key, el.innerHTML);
    }
  });

  // 3. Placeholders
  const placeholderElements = root.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) {
      el.placeholder = t(key, el.placeholder);
    }
  });

  // 4. Title Attributes
  const titleElements = root.querySelectorAll('[data-i18n-title]');
  titleElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (key) {
      el.title = t(key, el.title);
    }
  });

  // 5. ARIA Labels
  const ariaElements = root.querySelectorAll('[data-i18n-aria]');
  ariaElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    if (key) {
      el.setAttribute('aria-label', t(key, el.getAttribute('aria-label')));
    }
  });

  // 6. Synchronize language select elements if present
  const langSelects = root.querySelectorAll('#header-lang-select, .lang-selector-select');
  langSelects.forEach((sel) => {
    if (sel.value !== currentLang) {
      sel.value = currentLang;
    }
  });
}

// Automatically translate DOM on load
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyLanguageToDOM());
  } else {
    applyLanguageToDOM();
  }
}
