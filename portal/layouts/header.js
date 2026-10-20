/**
 * LEGAL MATRIX: Institutional Government Header Layout
 * Inspired by official Government of India digital service portals
 * With instant English/Hindi switching powered by portal/i18n/i18n.js
 */

import { getLanguage, setLanguage, t, onLanguageChange, applyLanguageToDOM } from '../i18n/i18n.js';

export function injectHeader(containerId = 'app-header-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const currentLang = getLanguage();

  const activeNav = (() => {
    const p = (window.location.pathname || '').toLowerCase();
    if (p === '/' || (p.endsWith('/index.html') && !p.includes('/landing/') && !p.includes('/portal/'))) return 'home';
    if (p.includes('/landing/')) return 'public_portal';
    if (p.includes('/services.html')) return 'services';
    if (p.includes('/verify-qr.html')) return 'verify';
    if (p.includes('/track.html')) return 'track';
    if (p.includes('/complaint.html')) return 'grievance';
    if (p.includes('/trader/')) return 'trader';
    if (p.includes('/inspector/')) return 'inspector';
    if (p.includes('/admin/')) return 'admin';
    if (p.includes('/privacy-policy.html')) return 'privacy';
    if (p.includes('/terms-and-conditions.html')) return 'terms';
    return '';
  })();

  const navLinkStyle = (isActive) => `display: inline-flex; align-items: center; gap: 6px; padding: 12px 16px; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; border-right: 1px solid rgba(255, 255, 255, 0.12); border-bottom: 3px solid ${isActive ? '#ea580c' : 'transparent'}; background-color: ${isActive ? 'rgba(255, 255, 255, 0.16)' : 'transparent'};`;

  const html = `
    <!-- Accessible Off-Screen Skip Link -->
    <a href="#main-content" class="sr-only" data-i18n="skip.content">${t('skip.content', 'Skip to Main Content')}</a>

    <!-- Top Institutional Strip -->
    <div class="gov-top-strip" role="region" aria-label="Official Authority Strip">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; padding-top: 6px; padding-bottom: 6px; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; color: #0b3558;">
          <span aria-hidden="true">&#x1F1EE;&#x1F1F3;</span>
          <span data-i18n="brand.gov">${t('brand.gov', 'Government of India')}</span>
          <span style="color: #94a3b8;" aria-hidden="true">&bull;</span>
          <span data-i18n="brand.dept">${t('brand.dept', 'Department of Consumer Affairs')}</span>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <!-- Compact Language Selector: [ 🌐 English / हिन्दी ▼ ] -->
          <div class="lang-selector-wrapper" style="display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 12px; color: #0b3558;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <select id="header-lang-select" class="lang-selector-select" aria-label="Change language / भाषा बदलें" style="background: transparent; border: 1.5px solid #0b3558; border-radius: 4px; padding: 3px 8px; font-size: 12px; font-weight: 700; color: #0b3558; cursor: pointer; outline: none;">
              <option value="en" ${currentLang === 'en' ? 'selected' : ''}>English</option>
              <option value="hi" ${currentLang === 'hi' ? 'selected' : ''}>हिन्दी</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Institutional Brand & Identity Header -->
    <header class="app-gov-header" role="banner" style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; padding-bottom: 12px; flex-wrap: wrap; gap: 12px;">
        <a href="/index.html" class="gov-brand-link" style="display: flex; align-items: center; gap: 14px; text-decoration: none; color: inherit;" aria-label="Legal Matrix Home">
          <!-- Stylized Original Legal Metrology Scales SVG Symbol -->
          <div style="width: 48px; height: 48px; background: #0b3558; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 6px rgba(11, 53, 88, 0.2);">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
              <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
              <path d="M7 21h10"/>
              <path d="M12 3v18"/>
              <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
            </svg>
          </div>

          <div>
            <div data-i18n="brand.ministry" style="font-size: 11px; font-weight: 700; color: #c2410c; text-transform: uppercase; letter-spacing: 0.04em;">
              ${t('brand.ministry', 'Ministry of Consumer Affairs, Food & Public Distribution')}
            </div>
            <div data-i18n="brand.title" style="font-size: 24px; font-weight: 800; color: #0b3558; letter-spacing: 0.02em; line-height: 1.1; margin: 2px 0;">
              ${t('brand.title', 'LEGAL MATRIX')}
            </div>
            <div data-i18n="brand.portal_name" style="font-size: 12px; color: #64748b; font-weight: 500;">
              ${t('brand.portal_name', 'National Legal Metrology Digital Services Portal')}
            </div>
          </div>
        </a>

        <div style="display: flex; align-items: center; gap: 10px;">
          <a href="/portal/pages/auth/login.html" class="btn btn-primary btn-sm" style="display: inline-flex; align-items: center; gap: 6px; font-weight: 700; border-radius: 4px; padding: 8px 16px; background-color: #0b3558; color: #ffffff; text-decoration: none;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            <span data-i18n="nav.login">${t('nav.login', 'Officer & Trader Login')}</span>
          </a>
        </div>
      </div>

      <!-- Government Navigation Bar -->
      <nav class="gov-main-nav" aria-label="Main Navigation" style="background-color: #0b3558; border-top: 1px solid rgba(255, 255, 255, 0.1);">
        <div class="container" style="display: flex; align-items: center; justify-content: space-between;">
          <ul class="gov-nav-list" role="menubar" style="display: flex; list-style: none; margin: 0; padding: 0; flex-wrap: wrap;">
            <li role="none">
              <a href="/index.html" class="gov-nav-link ${activeNav === 'home' ? 'active' : ''}" role="menuitem" style="${navLinkStyle(activeNav === 'home')}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span data-i18n="nav.home">${t('nav.home', 'Home')}</span>
              </a>
            </li>
            <li role="none">
              <a href="/landing/dist/index.html" class="gov-nav-link ${activeNav === 'public_portal' ? 'active' : ''}" role="menuitem" style="${navLinkStyle(activeNav === 'public_portal')}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                <span data-i18n="nav.public_portal">${t('nav.public_portal', 'Public Portal')}</span>
              </a>
            </li>
            <li role="none">
              <a href="/portal/pages/public/services.html" class="gov-nav-link ${activeNav === 'services' ? 'active' : ''}" role="menuitem" style="${navLinkStyle(activeNav === 'services')}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                <span data-i18n="nav.services">${t('nav.services', 'Services Directory')}</span>
              </a>
            </li>
            <li role="none">
              <a href="/portal/pages/public/verify-qr.html" class="gov-nav-link ${activeNav === 'verify' ? 'active' : ''}" role="menuitem" style="${navLinkStyle(activeNav === 'verify')}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>
                <span data-i18n="nav.verify">${t('nav.verify', 'Verify Certificate')}</span>
              </a>
            </li>
            <li role="none">
              <a href="/portal/pages/public/track.html" class="gov-nav-link ${activeNav === 'track' ? 'active' : ''}" role="menuitem" style="${navLinkStyle(activeNav === 'track')}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
                <span data-i18n="nav.track">${t('nav.track', 'Track Application')}</span>
              </a>
            </li>
            <li role="none">
              <a href="/portal/pages/citizen/complaint.html" class="gov-nav-link ${activeNav === 'grievance' ? 'active' : ''}" role="menuitem" style="${navLinkStyle(activeNav === 'grievance')}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <span data-i18n="nav.grievance">${t('nav.grievance', 'Consumer Grievance')}</span>
              </a>
            </li>
            ${activeNav === 'trader' ? `
            <li role="none">
              <a href="/portal/pages/trader/dashboard.html" class="gov-nav-link active" role="menuitem" style="${navLinkStyle(true)}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/></svg>
                <span data-i18n="trader.workspace">${t('trader.workspace', 'Trader Portal')}</span>
              </a>
            </li>` : ''}
            ${activeNav === 'inspector' ? `
            <li role="none">
              <a href="/portal/pages/inspector/dashboard.html" class="gov-nav-link active" role="menuitem" style="${navLinkStyle(true)}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                <span>Inspector Workspace</span>
              </a>
            </li>` : ''}
            ${activeNav === 'admin' ? `
            <li role="none">
              <a href="/portal/pages/admin/dashboard.html" class="gov-nav-link active" role="menuitem" style="${navLinkStyle(true)}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                <span>Admin Control Center</span>
              </a>
            </li>` : ''}
            ${activeNav === 'privacy' ? `
            <li role="none">
              <a href="/portal/pages/public/privacy-policy.html" class="gov-nav-link active" role="menuitem" style="${navLinkStyle(true)}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span data-i18n="footer.link_privacy">${t('footer.link_privacy', 'Privacy Policy')}</span>
              </a>
            </li>` : ''}
            <li role="none">
              <a href="/portal/pages/public/terms-and-conditions.html" class="gov-nav-link ${activeNav === 'terms' ? 'active' : ''}" role="menuitem" style="${navLinkStyle(activeNav === 'terms')}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <span data-i18n="nav.acts">${t('nav.acts', 'Terms and Conditions')}</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Tricolor Accent Line beneath Header -->
      <div class="tricolor-stripe" aria-hidden="true"></div>
    </header>
  `;

  container.innerHTML = html;

  // Language selector change handler - instant update without reload
  const selectEl = container.querySelector('#header-lang-select');
  if (selectEl) {
    selectEl.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }

  // Ensure header syncs if language changes anywhere
  onLanguageChange((lang) => {
    if (selectEl && selectEl.value !== lang) {
      selectEl.value = lang;
    }
  });
}
