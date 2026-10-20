/**
 * LEGAL MATRIX: Accessible Modal Dialog Module
 * Implements WCAG 2.1 Dialog standards: Focus trapping, ESC to close, backdrop click
 */

let activeModal = null;
let previousActiveElement = null;

export function openModal({
  title,
  content,
  confirmText = 'OK',
  cancelText = null,
  onConfirm = null,
  onCancel = null,
  isDanger = false
}) {
  closeModal(); // Close any currently active modal

  previousActiveElement = document.activeElement;

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.setAttribute('aria-labelledby', 'modal-active-title');

  backdrop.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <h2 id="modal-active-title" class="modal-title">${title}</h2>
        <button class="modal-close-btn" aria-label="Close dialog">&times;</button>
      </div>
      <div class="modal-body">
        ${content}
      </div>
      <div class="modal-footer">
        ${cancelText ? `<button class="btn btn-outline modal-btn-cancel">${cancelText}</button>` : ''}
        <button class="btn ${isDanger ? 'btn-danger' : 'btn-primary'} modal-btn-confirm">${confirmText}</button>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);
  document.body.style.overflow = 'hidden';

  // Force reflow for CSS animation
  void backdrop.offsetWidth;
  backdrop.classList.add('is-open');
  activeModal = backdrop;

  const closeBtn = backdrop.querySelector('.modal-close-btn');
  const confirmBtn = backdrop.querySelector('.modal-btn-confirm');
  const cancelBtn = backdrop.querySelector('.modal-btn-cancel');

  function handleClose() {
    closeModal();
    if (typeof onCancel === 'function') onCancel();
  }

  closeBtn?.addEventListener('click', handleClose);
  cancelBtn?.addEventListener('click', handleClose);

  confirmBtn?.addEventListener('click', () => {
    closeModal();
    if (typeof onConfirm === 'function') onConfirm();
  });

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) handleClose();
  });

  // Focus trapping and ESC key handler
  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      handleClose();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = backdrop.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  }

  document.addEventListener('keydown', handleKeyDown);
  backdrop._handleKeyDown = handleKeyDown;

  // Set initial focus
  setTimeout(() => confirmBtn?.focus(), 50);
}

export function closeModal() {
  if (!activeModal) return;

  if (activeModal._handleKeyDown) {
    document.removeEventListener('keydown', activeModal._handleKeyDown);
  }

  activeModal.classList.remove('is-open');
  document.body.style.overflow = '';

  setTimeout(() => {
    activeModal?.remove();
    activeModal = null;
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  }, 250);
}
