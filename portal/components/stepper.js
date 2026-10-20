/**
 * LEGAL MATRIX: Reusable Stepper Component
 * Renders and updates a multi-step visual progress bar
 */

export function renderStepper(containerElement, steps, currentStepIndex) {
  if (!containerElement) return;

  const html = `
    <nav aria-label="Progress" class="stepper-container">
      <ol class="stepper">
        ${steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isActive = idx === currentStepIndex;
          const statusClass = isCompleted ? 'is-completed' : isActive ? 'is-active' : '';
          const ariaCurrent = isActive ? 'aria-current="step"' : '';
          
          return `
            <li class="step-item ${statusClass}" ${ariaCurrent}>
              <div class="step-circle">
                ${isCompleted ? '✓' : idx + 1}
              </div>
              <span class="step-label">${step.label}</span>
            </li>
          `;
        }).join('')}
      </ol>
    </nav>
  `;

  containerElement.innerHTML = html;
}
