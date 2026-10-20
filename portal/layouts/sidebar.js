/**
 * LEGAL MATRIX: Institutional Role-Based Sidebar Navigation Layout
 * Clean SVG icons, no random emojis, zero em dashes
 * With seamless English / Hindi localization support
 */

import { getLanguage, onLanguageChange } from '../i18n/i18n.js';

export function injectSidebar(containerId = 'app-sidebar-container', role = 'trader', activePath = '') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const labels = {
    dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' },
    my_apps: { en: 'My Applications', hi: 'मेरे आवेदन' },
    register_inst: { en: 'Register Instrument', hi: 'उपकरण पंजीकरण' },
    my_certs: { en: 'My Certificates', hi: 'मेरे प्रमाणपत्र' },
    track_app: { en: 'Track Application', hi: 'आवेदन ट्रैक करें' },
    report_grievance: { en: 'Report Grievance', hi: 'शिकायत दर्ज करें' },
    trader_profile: { en: 'Trader Profile', hi: 'व्यापारी प्रोफ़ाइल' },
    inspector_dash: { en: 'Inspector Dashboard', hi: 'निरीक्षक डैशबोर्ड' },
    assigned_inspections: { en: 'Assigned Inspections', hi: 'सौंपे गए निरीक्षण' },
    new_inspection: { en: 'New Inspection Form', hi: 'नया निरीक्षण फॉर्म' },
    inspection_history: { en: 'Inspection History', hi: 'निरीक्षण इतिहास' },
    inspector_profile: { en: 'Inspector Profile', hi: 'निरीक्षक प्रोफ़ाइल' },
    control_center: { en: 'Control Center', hi: 'नियंत्रण केंद्र' },
    apps_ledger: { en: 'Applications Ledger', hi: 'आवेदन खाता' },
    inspectors_roster: { en: 'Inspectors Roster', hi: 'निरीक्षक सूची' },
    public_grievances: { en: 'Public Grievances', hi: 'जन शिकायतें' },
    audit_log: { en: 'System Audit Log', hi: 'सिस्टम ऑडिट लॉग' },
    logout: { en: 'Logout', hi: 'लॉगआउट' }
  };

  const roleTitles = {
    trader: { en: 'TRADER WORKSPACE', hi: 'व्यापारी कार्यक्षेत्र' },
    inspector: { en: 'INSPECTOR WORKSPACE', hi: 'निरीक्षक कार्यक्षेत्र' },
    admin: { en: 'ADMIN WORKSPACE', hi: 'प्रशासनिक कार्यक्षेत्र' }
  };

  const menusByRole = {
    trader: [
      { key: 'dashboard', path: '/portal/pages/trader/dashboard.html', icon: 'grid' },
      { key: 'my_apps', path: '/portal/pages/trader/applications.html', icon: 'folder' },
      { key: 'register_inst', path: '/portal/pages/trader/register-instrument.html', icon: 'scale' },
      { key: 'my_certs', path: '/portal/pages/trader/certificates.html', icon: 'award' },
      { key: 'track_app', path: '/portal/pages/public/track.html', icon: 'search' },
      { key: 'report_grievance', path: '/portal/pages/citizen/complaint.html', icon: 'alert' },
      { key: 'trader_profile', path: '/portal/pages/trader/profile.html', icon: 'user' },
      { key: 'logout', path: '/portal/pages/auth/login.html?logout=true', icon: 'log-out' }
    ],
    inspector: [
      { key: 'inspector_dash', path: '/portal/pages/inspector/dashboard.html', icon: 'grid' },
      { key: 'assigned_inspections', path: '/portal/pages/inspector/schedule.html', icon: 'calendar' },
      { key: 'new_inspection', path: '/portal/pages/inspector/inspect.html', icon: 'scale' },
      { key: 'inspection_history', path: '/portal/pages/inspector/history.html', icon: 'folder' },
      { key: 'inspector_profile', path: '/portal/pages/trader/profile.html', icon: 'user' },
      { key: 'logout', path: '/portal/pages/auth/login.html?logout=true', icon: 'log-out' }
    ],
    admin: [
      { key: 'control_center', path: '/portal/pages/admin/dashboard.html', icon: 'grid' },
      { key: 'apps_ledger', path: '/portal/pages/admin/applications.html', icon: 'folder' },
      { key: 'inspectors_roster', path: '/portal/pages/admin/inspectors.html', icon: 'user' },
      { key: 'public_grievances', path: '/portal/pages/admin/complaints.html', icon: 'alert' },
      { key: 'audit_log', path: '/portal/pages/admin/audit-log.html', icon: 'shield' },
      { key: 'logout', path: '/portal/pages/auth/login.html?logout=true', icon: 'log-out' }
    ]
  };

  const getSvgIcon = (name) => {
    switch (name) {
      case 'grid':
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>';
      case 'folder':
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>';
      case 'scale':
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>';
      case 'award':
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="m15.48 13.93 2.52 7.07-6-3-6 3 2.52-7.07"/></svg>';
      case 'search':
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>';
      case 'alert':
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
      case 'user':
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>';
      case 'calendar':
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
      case 'shield':
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
      case 'log-out':
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>';
      default:
        return '';
    }
  };

  function render() {
    const lang = getLanguage();
    const menu = menusByRole[role] || menusByRole.trader;
    const titleText = (roleTitles[role] && roleTitles[role][lang]) || `${role.toUpperCase()} WORKSPACE`;

    const html = `
      <aside class="app-sidebar" aria-label="Portal Navigation">
        <div class="sidebar-header">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <rect width="48" height="48" rx="6" fill="#0b3558"/>
            <rect x="10" y="38" width="28" height="3" rx="1" fill="#ea580c"/>
            <rect x="22.5" y="10" width="3" height="28" rx="1" fill="#ffffff"/>
            <rect x="8" y="14" width="32" height="3" rx="1" fill="#ffffff"/>
            <path d="M 6 26 Q 12 30 18 26 Z" fill="#ea580c"/>
            <path d="M 30 26 Q 36 30 42 26 Z" fill="#ea580c"/>
          </svg>
          <div>
            <div style="font-weight: 700; font-size: 14px; color: var(--color-primary); line-height: 1.2;">LEGAL MATRIX</div>
            <div style="font-size: 11px; color: var(--color-text-muted);">${titleText}</div>
          </div>
        </div>

        <nav class="sidebar-nav">
          ${menu.map(item => {
            const currentPath = (activePath || window.location.pathname || '').split('?')[0].toLowerCase();
            const itemPath = item.path.split('?')[0].toLowerCase();
            const isActive = currentPath === itemPath || 
              (currentPath.includes(itemPath) && itemPath !== '') ||
              (itemPath.includes('dashboard') && (currentPath.endsWith('/') || currentPath.endsWith(`/${role}/`)));
            const text = (labels[item.key] && labels[item.key][lang]) || item.key;
            return `
              <a href="${item.path}" class="sidebar-link ${isActive ? 'active' : ''}">
                <span aria-hidden="true" style="display: flex; align-items: center;">${getSvgIcon(item.icon)}</span>
                <span>${text}</span>
              </a>
            `;
          }).join('')}
        </nav>
      </aside>
    `;

    container.innerHTML = html;
  }

  render();
  onLanguageChange(() => render());
}
