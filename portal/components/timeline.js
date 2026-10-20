/**
 * LEGAL MATRIX: Reusable Timeline Component
 * Renders horizontal or vertical application progress timelines
 */

export function renderHorizontalTimeline(containerElement, stages) {
  if (!containerElement) return;

  const html = `
    <div class="tracking-timeline-h" role="region" aria-label="Application Progress Timeline">
      ${stages.map((stage) => {
        const isDone = stage.status === 'COMPLETED';
        const isCurrent = stage.status === 'IN_PROGRESS';
        const stateClass = isDone ? 'is-done' : isCurrent ? 'is-current' : '';
        
        return `
          <div class="timeline-step ${stateClass}">
            <div class="timeline-node" aria-hidden="true">
              ${isDone ? '✓' : stage.id}
            </div>
            <span class="timeline-title">${stage.name}</span>
            <span class="timeline-date">${stage.date || 'Pending'}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;

  containerElement.innerHTML = html;
}

export function renderVerticalTimeline(containerElement, stages) {
  if (!containerElement) return;

  const html = `
    <div class="tracking-timeline-v" role="list">
      ${stages.map((stage) => {
        const isDone = stage.status === 'COMPLETED';
        const isCurrent = stage.status === 'IN_PROGRESS';
        const stateClass = isDone ? 'is-done' : isCurrent ? 'is-current' : '';

        return `
          <div class="timeline-item-v ${stateClass}" role="listitem">
            <div class="timeline-bullet-v" aria-hidden="true"></div>
            <div>
              <div class="timeline-title">${stage.name}</div>
              <div class="timeline-date">${stage.date || 'Pending'}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  containerElement.innerHTML = html;
}
