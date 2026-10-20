/**
 * LEGAL MATRIX: Interactive MPE Gauge Component
 * Calculates and visualizes metrological error against maximum permissible limits
 */

export function initMpeGauge(containerElement, initialOptions = {}) {
  if (!containerElement) return;

  const state = {
    observed: initialOptions.observed ?? 0.20,
    mpe: initialOptions.mpe ?? 0.50,
    unit: initialOptions.unit || 'g',
    onVerdictChange: initialOptions.onVerdictChange || null
  };

  function calculateVerdict() {
    const absObserved = Math.abs(state.observed);
    const isPass = absObserved <= state.mpe;
    
    // Percentage for needle position: 0% is -MPE * 1.5, 50% is 0, 100% is +MPE * 1.5
    const span = state.mpe * 2;
    const clampedObserved = Math.max(-state.mpe * 1.25, Math.min(state.mpe * 1.25, state.observed));
    // Normalize to 0..100% with 50% center
    const percent = 50 + (clampedObserved / (state.mpe * 2.5)) * 100;
    
    return {
      isPass,
      needlePercent: Math.max(5, Math.min(95, percent)),
      verdictText: isPass ? 'Within Permitted Limit' : 'Outside Permitted Limit',
      detailText: isPass 
        ? 'The observed error is within the maximum permissible limit.'
        : 'The observed error exceeds the legal permissible tolerance.'
    };
  }

  function render() {
    const verdict = calculateVerdict();

    containerElement.innerHTML = `
      <div class="mpe-container">
        <div class="mpe-grid">
          <div class="mpe-input-card">
            <label for="mpe-observed-input">Observed Reading Error</label>
            <div class="mpe-input-wrapper">
              <input type="number" id="mpe-observed-input" step="0.01" value="${state.observed.toFixed(2)}">
              <span class="mpe-unit-badge">${state.unit}</span>
            </div>
            <span class="form-hint">Discrepancy measured by test weight</span>
          </div>

          <div class="mpe-input-card">
            <label for="mpe-limit-input">Maximum Permissible Error (MPE)</label>
            <div class="mpe-input-wrapper">
              <input type="number" id="mpe-limit-input" step="0.01" value="${state.mpe.toFixed(2)}">
              <span class="mpe-unit-badge">${state.unit}</span>
            </div>
            <span class="form-hint">Legal tolerance threshold</span>
          </div>
        </div>

        <div class="mpe-gauge-wrapper" aria-label="Visual Error Gauge">
          <div class="mpe-track-bar">
            <div class="mpe-center-marker" title="Zero Error (Ideal)"></div>
            <div class="mpe-needle" style="left: ${verdict.needlePercent}%;">
              <div class="mpe-needle-pin"></div>
              <div class="mpe-needle-line"></div>
              <div class="mpe-needle-value">${state.observed > 0 ? '+' : ''}${state.observed.toFixed(2)} ${state.unit}</div>
            </div>
          </div>
          <div class="mpe-scale-labels">
            <span>-${state.mpe.toFixed(2)} ${state.unit}</span>
            <span>0.00 (Zero Error)</span>
            <span>+${state.mpe.toFixed(2)} ${state.unit}</span>
          </div>
        </div>

        <div class="mpe-verdict-card ${verdict.isPass ? 'verdict-pass' : 'verdict-fail'}">
          <div class="mpe-verdict-icon">
            ${verdict.isPass ? '✓' : '×'}
          </div>
          <div>
            <div class="mpe-verdict-title">Result: ${verdict.verdictText}</div>
            <p style="margin: 0; color: inherit;">${verdict.detailText}</p>
            <a href="javascript:void(0)" class="mpe-explainer-link" id="mpe-modal-trigger">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/></svg>
              What does this mean?
            </a>
          </div>
        </div>
      </div>
    `;

    // Event listeners for dynamic update
    const observedInput = containerElement.querySelector('#mpe-observed-input');
    const limitInput = containerElement.querySelector('#mpe-limit-input');

    observedInput?.addEventListener('input', (e) => {
      state.observed = parseFloat(e.target.value) || 0;
      updateGaugeOnly();
    });

    limitInput?.addEventListener('input', (e) => {
      state.mpe = Math.max(0.01, parseFloat(e.target.value) || 0.50);
      updateGaugeOnly();
    });

    containerElement.querySelector('#mpe-modal-trigger')?.addEventListener('click', () => {
      showMpeExplainerModal();
    });
  }

  function updateGaugeOnly() {
    const verdict = calculateVerdict();
    const needle = containerElement.querySelector('.mpe-needle');
    const needleVal = containerElement.querySelector('.mpe-needle-value');
    const verdictCard = containerElement.querySelector('.mpe-verdict-card');
    const verdictIcon = containerElement.querySelector('.mpe-verdict-icon');
    const verdictTitle = containerElement.querySelector('.mpe-verdict-title');

    if (needle) needle.style.left = `${verdict.needlePercent}%`;
    if (needleVal) needleVal.textContent = `${state.observed > 0 ? '+' : ''}${state.observed.toFixed(2)} ${state.unit}`;
    
    if (verdictCard) {
      verdictCard.className = `mpe-verdict-card ${verdict.isPass ? 'verdict-pass' : 'verdict-fail'}`;
    }
    if (verdictIcon) verdictIcon.textContent = verdict.isPass ? '✓' : '×';
    if (verdictTitle) verdictTitle.textContent = `Result: ${verdict.verdictText}`;

    if (typeof state.onVerdictChange === 'function') {
      state.onVerdictChange(verdict.isPass, state.observed, state.mpe);
    }
  }

  function showMpeExplainerModal() {
    import('./modal.js').then(({ openModal }) => {
      openModal({
        title: 'What is Maximum Permissible Error (MPE)?',
        content: `
          <div style="font-size: var(--font-size-base); line-height: 1.6;">
            <p>Every physical weighing machine or meter has slight microscopic variations due to gravity, temperature, and wear.</p>
            <div style="background: var(--color-primary-light); padding: 16px; border-radius: 8px; margin: 16px 0;">
              <strong>Simple Analogy:</strong>
              <p style="margin: 4px 0 0 0;">If you buy 1 kg of sugar, the law permits the scale to differ by a tiny fraction of a gram (e.g. 0.50 grams). This allowed margin is called the <em>Maximum Permissible Error</em>.</p>
            </div>
            <p><strong>✓ Within Permitted Limit:</strong> The scale is accurate, honest, and certified for public commercial use.</p>
            <p><strong>× Outside Permitted Limit:</strong> The scale is inaccurate and cannot be stamped until recalibrated.</p>
          </div>
        `,
        confirmText: 'Understood'
      });
    });
  }

  render();

  return {
    getState: () => ({ ...state }),
    setObserved: (val) => {
      state.observed = val;
      render();
    }
  };
}
