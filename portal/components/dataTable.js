/**
 * LEGAL MATRIX: Reusable Responsive Data Table Component
 * Generates table with data-label attributes for mobile card rendering
 */

export function renderDataTable(containerElement, { columns, rows, emptyMessage = 'No records found' }) {
  if (!containerElement) return;

  if (!rows || rows.length === 0) {
    containerElement.innerHTML = `
      <div style="text-align: center; padding: 48px 16px; background: #fff; border-radius: 8px; border: 1px solid var(--border-subtle);">
        <div style="width: 44px; height: 44px; margin: 0 auto 12px auto; color: var(--text-muted); display: flex; align-items: center; justify-content: center;">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <p style="color: var(--text-secondary); font-weight: 600; font-size: 14px; margin: 0;">${emptyMessage}</p>
      </div>
    `;
    return;
  }

  const html = `
    <div class="table-responsive-container">
      <table class="data-table data-table-adaptive">
        <thead>
          <tr>
            ${columns.map(col => `<th>${col.label}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${rows.map(row => `
            <tr>
              ${columns.map(col => `
                <td data-label="${col.label}">
                  ${typeof col.render === 'function' ? col.render(row[col.key], row) : (row[col.key] ?? '')}
                </td>
              `).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  containerElement.innerHTML = html;
}
