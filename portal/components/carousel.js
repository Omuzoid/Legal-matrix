/**
 * LEGAL MATRIX: Hero Story Carousel Component
 * 5 Visual Real-Image Slides explaining the Legal Metrology ecosystem:
 *  1. Trader Online Registration (/assets/images/hero/trader-registration.jpg)
 *  2. Public Certificate Verification (/assets/images/hero/citizen-verification.jpg)
 *  3. Access Services Online (/assets/images/hero/digital-transformation.jpg)
 *  4. Inspector On-Site Verification (/assets/images/hero/inspector-verification.jpg)
 *  5. Verified Digital Certificate (/assets/images/hero/digital-certificate.jpg)
 *
 * Fully accessible: auto-rotation, indicators, pause-on-hover/focus/visibility,
 * mobile touch swipe, keyboard navigation, clickable hero images, and bilingual support.
 */

import { t, onLanguageChange } from '../i18n/i18n.js';

// 5 Carousel Slides Configuration with Real AI-Generated Photographic Assets
const SLIDES_CONFIG = [
  {
    id: 1,
    tagKey: 'carousel.slide1.tag',
    titleKey: 'carousel.slide1.title',
    descKey: 'carousel.slide1.desc',
    ctaPrimaryKey: 'carousel.slide1.cta',
    ctaPrimaryHref: '/portal/pages/trader/register-instrument.html',
    ctaSecondaryKey: null,
    ctaSecondaryHref: null,
    imageSrc: '/assets/images/hero/trader-registration.jpg',
    imageAlt: 'Indian merchant registering commercial weighing scale online on Legal Matrix portal',
    imageLink: '/portal/pages/trader/register-instrument.html',
    imageLinkAria: 'Register an Instrument: Open online instrument registration for traders'
  },
  {
    id: 2,
    tagKey: 'carousel.slide2.tag',
    titleKey: 'carousel.slide2.title',
    descKey: 'carousel.slide2.desc',
    ctaPrimaryKey: 'carousel.slide2.cta_primary',
    ctaPrimaryHref: '/portal/pages/public/verify-qr.html',
    ctaSecondaryKey: 'carousel.slide2.cta_secondary',
    ctaSecondaryHref: '/portal/pages/citizen/complaint.html',
    imageSrc: '/assets/images/hero/citizen-verification.jpg',
    imageAlt: 'Indian citizen verifying weighing scale QR code on smartphone without login',
    imageLink: '/portal/pages/public/verify-qr.html',
    imageLinkAria: 'Verify Without Login: Open public certificate verification service'
  },
  {
    id: 3,
    tagKey: 'carousel.slide3.tag',
    titleKey: 'carousel.slide3.title',
    descKey: 'carousel.slide3.desc',
    ctaPrimaryKey: 'carousel.slide3.cta',
    ctaPrimaryHref: '/portal/pages/public/services.html',
    ctaSecondaryKey: null,
    ctaSecondaryHref: null,
    imageSrc: '/assets/images/hero/digital-transformation.jpg',
    imageAlt: 'Transition from paper registers to digital government services on Legal Matrix',
    imageLink: '/portal/pages/public/services.html',
    imageLinkAria: 'Access Services Online: Explore directory of digital metrology services'
  },
  {
    id: 4,
    tagKey: 'carousel.slide4.tag',
    titleKey: 'carousel.slide4.title',
    descKey: 'carousel.slide4.desc',
    ctaPrimaryKey: 'carousel.slide4.cta',
    ctaPrimaryHref: '/portal/pages/public/track.html',
    ctaSecondaryKey: null,
    ctaSecondaryHref: null,
    imageSrc: '/assets/images/hero/inspector-verification.jpg',
    imageAlt: 'Legal Metrology inspector visiting shop to verify commercial weighing scale',
    imageLink: '/portal/pages/public/track.html',
    imageLinkAria: 'Inspection at Your Location: Track your scheduled inspection and application status'
  },
  {
    id: 5,
    tagKey: 'carousel.slide5.tag',
    titleKey: 'carousel.slide5.title',
    descKey: 'carousel.slide5.desc',
    ctaPrimaryKey: 'carousel.slide5.cta',
    ctaPrimaryHref: '/portal/pages/public/verify-qr.html',
    ctaSecondaryKey: null,
    ctaSecondaryHref: null,
    imageSrc: '/assets/images/hero/digital-certificate.jpg',
    imageAlt: 'Verified digital certificate with QR code for commercial measuring instrument',
    imageLink: '/portal/pages/public/verify-qr.html',
    imageLinkAria: 'Receive Your Verified Certificate: Verify official digital calibration certificate'
  }
];

export class HeroCarousel {
  constructor(containerId = 'hero-carousel-root', options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.slides = options.slides || SLIDES_CONFIG;
    this.currentIndex = 0;
    this.timer = null;
    this.intervalMs = options.intervalMs || 5000; // 5 seconds rotation
    this.isHovered = false;
    this.isFocused = false;
    this.isUserPaused = false;
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.render();
    this.bindEvents();
    this.preloadImages();
    this.startAutoRotation();

    // Listen for language switch
    onLanguageChange(() => this.updateText());
  }

  preloadImages() {
    this.slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.imageSrc;
    });
  }

  render() {
    const html = `
      <section class="hero-carousel-section" role="region" aria-roledescription="carousel" aria-label="Legal Matrix Ecosystem Overview">
        <div class="hero-carousel-container">
          <!-- Main Hero Banner Card matching Reference Design -->
          <div class="hero-carousel-card">
            <!-- Organic Tricolor Ribbons and Ashoka Chakra Watermark -->
            <div class="hero-card-tricolor-canvas" aria-hidden="true">
              <div class="tricolor-wave-saffron"></div>
              <div class="tricolor-wave-green"></div>
              <!-- Ashoka Chakra Watermark -->
              <svg class="hero-chakra-watermark" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="90" stroke="#0b3558" stroke-width="2.5" stroke-dasharray="3 3"/>
                <circle cx="100" cy="100" r="78" stroke="#0b3558" stroke-width="2"/>
                <circle cx="100" cy="100" r="24" stroke="#0b3558" stroke-width="2.5"/>
                <circle cx="100" cy="100" r="8" fill="#0b3558"/>
                ${Array.from({ length: 24 }).map((_, i) => `
                  <line x1="100" y1="100" x2="${(100 + 78 * Math.cos((i * 15 * Math.PI) / 180)).toFixed(2)}" y2="${(100 + 78 * Math.sin((i * 15 * Math.PI) / 180)).toFixed(2)}" stroke="#0b3558" stroke-width="1.8"/>
                `).join('')}
              </svg>
            </div>

            <!-- Left Outer Side Arrow Button -->
            <button type="button" class="carousel-side-nav-btn carousel-side-prev" id="carousel-side-prev" aria-label="${t('carousel.prev', 'Previous slide')}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            <!-- Right Outer Side Arrow Button -->
            <button type="button" class="carousel-side-nav-btn carousel-side-next" id="carousel-side-next" aria-label="${t('carousel.next', 'Next slide')}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>

            <!-- Viewport containing slides -->
            <div class="carousel-viewport" id="carousel-viewport">
              ${this.slides.map((slide, idx) => `
                <div class="carousel-slide ${idx === 0 ? 'active' : ''}" 
                     id="carousel-slide-${idx}" 
                     role="group" 
                     aria-roledescription="slide" 
                     aria-label="${t('carousel.slide', 'Slide')} ${idx + 1} ${t('carousel.of', 'of')} ${this.slides.length}"
                     aria-hidden="${idx === 0 ? 'false' : 'true'}">
                  
                  <!-- Left: Text & CTA Column -->
                  <div class="slide-text-col">
                    <div class="slide-tag-badge" id="slide-tag-${idx}">
                      <span class="tag-label-text">${t(slide.tagKey)}</span>
                    </div>
                    <h1 class="slide-heading" id="slide-title-${idx}">
                      ${t(slide.titleKey)}
                    </h1>
                    <p class="slide-description" id="slide-desc-${idx}">
                      ${t(slide.descKey)}
                    </p>
                    <div class="slide-actions">
                      <a href="${slide.ctaPrimaryHref}" class="slide-btn-primary" id="slide-btn-primary-${idx}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h10"/>
                        </svg>
                        <span>${t(slide.ctaPrimaryKey)}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </a>
                      ${slide.ctaSecondaryKey ? `
                        <a href="${slide.ctaSecondaryHref}" class="slide-btn-secondary" id="slide-btn-secondary-${idx}">
                          <span>${t(slide.ctaSecondaryKey)}</span>
                        </a>
                      ` : ''}
                    </div>

                    <!-- Bottom Controls & Indicators Bar placed inside left content area -->
                    <div class="carousel-controls-bar">
                      <!-- Counter: 01 / 05 -->
                      <div class="carousel-counter-group" aria-live="polite">
                        <span class="carousel-counter-text">
                          <span class="carousel-counter-active" id="carousel-current-num-${idx}">0${idx + 1}</span>
                          / 0${this.slides.length}
                        </span>
                      </div>

                      <!-- Circular Prev Arrow -->
                      <button type="button" class="carousel-mini-nav-btn carousel-btn-prev" aria-label="${t('carousel.prev', 'Previous slide')}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <polyline points="15 18 9 12 15 6"/>
                        </svg>
                      </button>

                      <!-- Dot / Pill Indicators -->
                      <div class="carousel-indicators" role="tablist" aria-label="Slide Selection">
                        ${this.slides.map((_, dotIdx) => `
                          <button type="button" 
                                  class="carousel-indicator-btn ${dotIdx === idx ? 'active' : ''}" 
                                  role="tab" 
                                  aria-selected="${dotIdx === idx ? 'true' : 'false'}" 
                                  aria-label="${t('carousel.slide', 'Slide')} ${dotIdx + 1}"
                                  data-slide-index="${dotIdx}">
                          </button>
                        `).join('')}
                      </div>

                      <!-- Circular Next Arrow -->
                      <button type="button" class="carousel-mini-nav-btn carousel-btn-next" aria-label="${t('carousel.next', 'Next slide')}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </button>

                      <!-- Pause/Play button -->
                      <button type="button" class="carousel-mini-nav-btn carousel-btn-playpause" aria-label="${t('carousel.pause', 'Pause auto-rotation')}">
                        <svg class="icon-pause" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <rect x="6" y="4" width="4" height="16" rx="1"/>
                          <rect x="14" y="4" width="4" height="16" rx="1"/>
                        </svg>
                        <svg class="icon-play" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style="display:none;" aria-hidden="true">
                          <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Right: Hero Image Column with Organic Edge Blending -->
                  <div class="slide-visual-col">
                    <a href="${slide.imageLink}" 
                       class="hero-image-card" 
                       id="hero-img-link-${idx}"
                       aria-label="${slide.imageLinkAria}" 
                       title="${t(slide.titleKey)}">
                      <div class="hero-image-frame">
                        <img src="${slide.imageSrc}" 
                             alt="${slide.imageAlt}" 
                             class="hero-slide-img" 
                             loading="${idx === 0 ? 'eager' : 'lazy'}" 
                             decoding="async" />
                      </div>
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    `;

    this.container.innerHTML = html;
  }

  bindEvents() {
    const prevBtns = this.container.querySelectorAll('.carousel-btn-prev');
    const nextBtns = this.container.querySelectorAll('.carousel-btn-next');
    const sidePrevBtn = this.container.querySelector('#carousel-side-prev');
    const sideNextBtn = this.container.querySelector('#carousel-side-next');
    const playPauseBtns = this.container.querySelectorAll('.carousel-btn-playpause');
    const indicators = this.container.querySelectorAll('.carousel-indicator-btn');
    const section = this.container.querySelector('.hero-carousel-section');

    prevBtns.forEach(btn => btn.addEventListener('click', () => {
      this.handleManualNav(this.currentIndex - 1);
    }));

    nextBtns.forEach(btn => btn.addEventListener('click', () => {
      this.handleManualNav(this.currentIndex + 1);
    }));

    sidePrevBtn?.addEventListener('click', () => {
      this.handleManualNav(this.currentIndex - 1);
    });

    sideNextBtn?.addEventListener('click', () => {
      this.handleManualNav(this.currentIndex + 1);
    });

    playPauseBtns.forEach(btn => btn.addEventListener('click', () => {
      this.togglePlayPause();
    }));

    indicators.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-slide-index'), 10);
        this.handleManualNav(idx);
      });
    });

    // Pause on Hover over section, resume on mouse leave
    section?.addEventListener('mouseenter', () => {
      this.isHovered = true;
    });
    section?.addEventListener('mouseleave', () => {
      this.isHovered = false;
    });

    // Pause on Keyboard Focus inside carousel, resume when focus leaves carousel
    section?.addEventListener('focusin', (e) => {
      try {
        if (e.target && e.target.matches && e.target.matches(':focus-visible')) {
          this.isFocused = true;
        }
      } catch (err) {
        // Safe fallback
      }
    });
    section?.addEventListener('focusout', (e) => {
      if (!section.contains(e.relatedTarget)) {
        this.isFocused = false;
      }
    });

    // Keyboard Arrow Navigation
    section?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.handleManualNav(this.currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        this.handleManualNav(this.currentIndex + 1);
      }
    });

    // Touch / Swipe Navigation for Mobile
    const viewport = this.container.querySelector('#carousel-viewport');
    viewport?.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewport?.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      const diffX = this.touchStartX - this.touchEndX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          this.handleManualNav(this.currentIndex + 1);
        } else {
          this.handleManualNav(this.currentIndex - 1);
        }
      }
    }, { passive: true });

    // Pause when browser tab is hidden, resume when visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && !this.isUserPaused && !this.timer) {
        this.startAutoRotation();
      }
    });
  }

  shouldRotate() {
    return !this.isHovered && !this.isFocused && !this.isUserPaused && !document.hidden;
  }

  handleManualNav(targetIndex) {
    this.goTo(targetIndex);
    this.isFocused = false;
    // Restart interval from now so the user has a full 5 seconds on the selected slide
    if (this.timer) clearInterval(this.timer);
    if (!this.isUserPaused) {
      this.startAutoRotation();
    }
  }

  goTo(index) {
    const slides = this.container.querySelectorAll('.carousel-slide');
    const indicators = this.container.querySelectorAll('.carousel-indicator-btn');
    const counterEls = this.container.querySelectorAll('.carousel-counter-active');
    if (!slides.length) return;

    const targetIndex = (index + this.slides.length) % this.slides.length;
    if (targetIndex === this.currentIndex && slides[this.currentIndex]?.classList.contains('active')) {
      return;
    }

    // Deactivate old slide
    slides.forEach((s, i) => {
      if (i !== targetIndex) {
        s.classList.remove('active');
        s.setAttribute('aria-hidden', 'true');
      }
    });

    // Sync indicators across all slides
    indicators.forEach((ind) => {
      const dotIdx = parseInt(ind.getAttribute('data-slide-index'), 10);
      if (dotIdx === targetIndex) {
        ind.classList.add('active');
        ind.setAttribute('aria-selected', 'true');
      } else {
        ind.classList.remove('active');
        ind.setAttribute('aria-selected', 'false');
      }
    });

    // Activate target slide
    this.currentIndex = targetIndex;
    slides[this.currentIndex]?.classList.add('active');
    slides[this.currentIndex]?.setAttribute('aria-hidden', 'false');

    // Update counter text across all controls bars
    counterEls.forEach((counter) => {
      counter.textContent = `0${this.currentIndex + 1}`;
    });

    // Preload next slide image
    const nextIdx = (this.currentIndex + 1) % this.slides.length;
    const nextImg = new Image();
    nextImg.src = this.slides[nextIdx].imageSrc;
  }

  next() {
    this.goTo(this.currentIndex + 1);
  }

  prev() {
    this.goTo(this.currentIndex - 1);
  }

  startAutoRotation() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.isUserPaused) return;

    this.timer = setInterval(() => {
      if (this.shouldRotate()) {
        this.next();
      }
    }, this.intervalMs);
  }

  pause() {
    this.isHovered = true;
  }

  resume() {
    this.isHovered = false;
    this.isFocused = false;
  }

  togglePlayPause() {
    this.isUserPaused = !this.isUserPaused;
    this.updatePlayPauseUI();
    if (this.isUserPaused) {
      if (this.timer) clearInterval(this.timer);
      this.timer = null;
    } else {
      this.startAutoRotation();
    }
  }

  updatePlayPauseUI() {
    const playPauseBtns = this.container.querySelectorAll('.carousel-btn-playpause');
    playPauseBtns.forEach((btn) => {
      const pauseIcon = btn.querySelector('.icon-pause');
      const playIcon = btn.querySelector('.icon-play');

      if (this.isUserPaused) {
        if (pauseIcon) pauseIcon.style.display = 'none';
        if (playIcon) playIcon.style.display = 'block';
        btn.setAttribute('aria-label', t('carousel.play', 'Resume auto-rotation'));
        btn.classList.add('is-paused');
      } else {
        if (pauseIcon) pauseIcon.style.display = 'block';
        if (playIcon) playIcon.style.display = 'none';
        btn.setAttribute('aria-label', t('carousel.pause', 'Pause auto-rotation'));
        btn.classList.remove('is-paused');
      }
    });
  }

  updateText() {
    this.slides.forEach((slide, idx) => {
      const tagLabel = this.container.querySelector(`#slide-tag-${idx} .tag-label-text`);
      const titleEl = this.container.querySelector(`#slide-title-${idx}`);
      const descEl = this.container.querySelector(`#slide-desc-${idx}`);
      const btnPrimaryEl = this.container.querySelector(`#slide-btn-primary-${idx} span`);
      const btnSecondaryEl = this.container.querySelector(`#slide-btn-secondary-${idx} span`);
      const chipText = this.container.querySelector(`#hero-img-link-${idx} .hover-chip-text`);

      if (tagLabel) tagLabel.textContent = t(slide.tagKey);
      if (titleEl) titleEl.textContent = t(slide.titleKey);
      if (descEl) descEl.textContent = t(slide.descKey);
      if (btnPrimaryEl) btnPrimaryEl.textContent = t(slide.ctaPrimaryKey);
      if (btnSecondaryEl) btnSecondaryEl.textContent = t(slide.ctaSecondaryKey);
      if (chipText) chipText.textContent = t('carousel.click_to_open', 'Click image to open');
    });

    const prevBtns = this.container.querySelectorAll('.carousel-btn-prev, #carousel-side-prev');
    const nextBtns = this.container.querySelectorAll('.carousel-btn-next, #carousel-side-next');
    prevBtns.forEach(btn => btn.setAttribute('aria-label', t('carousel.prev', 'Previous slide')));
    nextBtns.forEach(btn => btn.setAttribute('aria-label', t('carousel.next', 'Next slide')));
    this.updatePlayPauseUI();
  }
}
