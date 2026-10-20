/**
 * LEGAL MATRIX: Institutional Government Footer Layout
 * Contains official ministry details, legal policies, tricolor accent, and verified links
 * Strictly compliant with Indian Government standards, with instant English/Hindi switching
 */

import { t, onLanguageChange, applyLanguageToDOM } from '../i18n/i18n.js';

export function injectFooter(containerId = 'app-footer-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const html = `
    <footer class="app-gov-footer" role="contentinfo" style="background-color: #0b3558; color: #ffffff;">
      <!-- Subtle Tricolor Accent Line at Top of Footer -->
      <div class="tricolor-stripe" aria-hidden="true"></div>

      <div class="container" style="padding-top: 40px; padding-bottom: 28px;">
        <div class="gov-footer-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px; margin-bottom: 32px;">
          <!-- Column 1: Institutional Authority -->
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
              <div style="width: 36px; height: 36px; background: #ffffff; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0b3558" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                  <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                  <path d="M7 21h10"/>
                  <path d="M12 3v18"/>
                  <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
                </svg>
              </div>
              <span style="font-weight: 800; font-size: 18px; color: #ffffff; letter-spacing: 0.5px;" data-i18n="brand.title">LEGAL MATRIX</span>
            </div>
            <p style="font-size: 13px; color: #cbd5e1; line-height: 1.5; margin-bottom: 12px;" data-i18n="brand.portal_name">
              ${t('brand.portal_name', 'National Legal Metrology Digital Services Portal')}
            </p>
            <div style="font-size: 12px; color: #94a3b8; line-height: 1.6; border-left: 2px solid #ea580c; padding-left: 10px;">
              <span data-i18n="brand.dept">${t('brand.dept', 'Department of Consumer Affairs')}</span><br>
              <span data-i18n="brand.ministry">${t('brand.ministry', 'Ministry of Consumer Affairs, Food & Public Distribution')}</span><br>
              <span data-i18n="brand.gov">${t('brand.gov', 'Government of India')}</span>
            </div>
          </div>

          <!-- Column 2: Digital Public Services -->
          <div>
            <div style="font-size: 14px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 6px;" data-i18n="footer.services_title">
              ${t('footer.services_title', 'Digital Services')}
            </div>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 13px;">
              <li style="margin-bottom: 8px;">
                <a href="/portal/pages/public/verify-qr.html" style="color: #cbd5e1; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/></svg>
                  <span data-i18n="nav.verify">${t('nav.verify', 'Verify Certificate')}</span>
                </a>
              </li>
              <li style="margin-bottom: 8px;">
                <a href="/portal/pages/trader/register-instrument.html" style="color: #cbd5e1; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/></svg>
                  <span data-i18n="carousel.slide1.cta">${t('carousel.slide1.cta', 'Register an Instrument')}</span>
                </a>
              </li>
              <li style="margin-bottom: 8px;">
                <a href="/portal/pages/public/track.html" style="color: #cbd5e1; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  <span data-i18n="nav.track">${t('nav.track', 'Track Application')}</span>
                </a>
              </li>
              <li style="margin-bottom: 8px;">
                <a href="/portal/pages/citizen/complaint.html" style="color: #cbd5e1; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>
                  <span data-i18n="nav.grievance">${t('nav.grievance', 'Consumer Grievance')}</span>
                </a>
              </li>
              <li style="margin-bottom: 8px;">
                <a href="/portal/pages/auth/login.html" style="color: #cbd5e1; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/></svg>
                  <span data-i18n="nav.login">${t('nav.login', 'Officer & Trader Login')}</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Column 3: Institutional & Policy Links -->
          <div>
            <div style="font-size: 14px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 6px;" data-i18n="footer.links_title">
              ${t('footer.links_title', 'Important Links')}
            </div>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 13px;">
              <li style="margin-bottom: 8px;">
                <a href="https://consumeraffairs.nic.in/" target="_blank" rel="noopener noreferrer" style="color: #cbd5e1; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  <span data-i18n="brand.dept">${t('brand.dept', 'Department of Consumer Affairs')}</span>
                </a>
              </li>
              <li style="margin-bottom: 8px;">
                <a href="https://india.gov.in/" target="_blank" rel="noopener noreferrer" style="color: #cbd5e1; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                  <span>National Portal of India</span>
                </a>
              </li>
              <li style="margin-bottom: 8px;">
                <a href="/portal/pages/public/privacy-policy.html" style="color: #cbd5e1; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span data-i18n="footer.privacy">${t('footer.privacy', 'Privacy Policy')}</span>
                </a>
              </li>
              <li style="margin-bottom: 8px;">
                <a href="/portal/pages/public/terms-and-conditions.html" style="color: #cbd5e1; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <span data-i18n="footer.terms">${t('footer.terms', 'Terms and Conditions')}</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Column 4: Help and Guidance -->
          <div>
            <div style="font-size: 14px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 6px;" data-i18n="footer.contact_title">
              ${t('footer.contact_title', 'National Helpdesk')}
            </div>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 13px;">
              <li style="margin-bottom: 8px;">
                <a href="/portal/pages/public/terms-and-conditions.html#guidelines" style="color: #cbd5e1; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  <span data-i18n="nav.acts">${t('nav.acts', 'Acts & Rules')}</span>
                </a>
              </li>
              <li style="margin-bottom: 8px;">
                <a href="tel:1800114000" style="color: #cbd5e1; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>National Consumer Helpline: 1800-11-4000</span>
                </a>
              </li>
              <li style="margin-bottom: 8px;">
                <a href="/portal/pages/citizen/complaint.html" style="color: #cbd5e1; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span data-i18n="nav.grievance">${t('nav.grievance', 'Consumer Grievance')}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Copyright and Institutional Authority -->
        <div class="footer-bottom-strip" style="border-top: 1px solid rgba(255, 255, 255, 0.15); padding-top: 20px; font-size: 12px; color: #94a3b8; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div data-i18n="footer.copyright">
            ${t('footer.copyright', 'Content Owned, Maintained and Updated by Department of Consumer Affairs, Ministry of Consumer Affairs, Food & Public Distribution, Government of India.')}
          </div>
          <div style="color: #cbd5e1;" data-i18n="footer.gigw">
            ${t('footer.gigw', 'Compliant with Guidelines for Indian Government Websites (GIGW 3.0) and ISO 9001 standards.')}
          </div>
        </div>
      </div>
    </footer>
  `;

  container.innerHTML = html;

  // React to language changes
  onLanguageChange(() => {
    applyLanguageToDOM(container);
  });
}
