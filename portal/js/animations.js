/**
 * LEGAL MATRIX: Lightweight Institutional Motion & Scroll Observer
 * GPU-friendly transitions, IntersectionObserver reveal, accessible reduced-motion support
 */

function initAnimations() {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mark document root as motion-ready
  document.documentElement.classList.add('motion-ready');

  // 1. Calculate Grid Stagger Delays for Card Containers
  if (!prefersReducedMotion) {
    const cardGrids = document.querySelectorAll('.gov-cards-grid, .services-grid, .pathway-cards-grid, .responsibility-grid');
    cardGrids.forEach(grid => {
      const cards = grid.children;
      Array.from(cards).forEach((card, index) => {
        const staggerMs = (index % 3) * 65;
        card.style.transitionDelay = `${staggerMs}ms`;
      });
    });
  }

  // 2. Intersection Observer for Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      // Elements already above 60% of initial viewport show immediately; others animate on scroll
      if (rect.top >= 0 && rect.top <= windowHeight * 0.6) {
        el.classList.add('is-visible');
      } else {
        revealObserver.observe(el);
      }
    });
  } else {
    // Immediate visibility for reduced motion or older browsers
    revealElements.forEach(el => {
      el.classList.add('is-visible');
    });
  }

  // 3. Interactive Ticker Pause on Hover and Keyboard Focus
  const tickers = document.querySelectorAll('.ticker-track');
  tickers.forEach(ticker => {
    ticker.addEventListener('mouseenter', () => {
      ticker.style.animationPlayState = 'paused';
    });
    ticker.addEventListener('mouseleave', () => {
      ticker.style.animationPlayState = 'running';
    });
    ticker.addEventListener('focusin', () => {
      ticker.style.animationPlayState = 'paused';
    });
    ticker.addEventListener('focusout', () => {
      ticker.style.animationPlayState = 'running';
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}
