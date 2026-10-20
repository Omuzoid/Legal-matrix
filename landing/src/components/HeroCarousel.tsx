import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Scale, QrCode, ArrowRight, Play, Pause } from 'lucide-react';

interface HeroCarouselProps {
  lang: 'en' | 'hi';
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ lang }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const slidesData = [
    // Slide 1: Trader Online Registration
    {
      id: 1,
      tag: lang === 'en' ? 'TRADER REGISTRATION' : 'व्यापारी पंजीकरण',
      title: lang === 'en' ? 'Register Your Instrument Online' : 'अपने उपकरण का ऑनलाइन पंजीकरण करें',
      desc: lang === 'en' 
        ? 'Traders can apply online for verification of eligible weighing and measuring instruments.'
        : 'व्यापारी पात्र वजन और माप उपकरणों के सत्यापन के लिए ऑनलाइन आवेदन कर सकते हैं।',
      ctaPrimary: lang === 'en' ? 'Register an Instrument' : 'उपकरण का पंजीकरण करें',
      ctaPrimaryHref: '/portal/pages/trader/register-instrument.html',
      ctaSecondary: null,
      ctaSecondaryHref: null,
      imageSrc: '/assets/images/hero/trader-registration.jpg',
      imageAlt: 'Indian merchant registering commercial weighing scale online on Legal Matrix portal',
      imageLink: '/portal/pages/trader/register-instrument.html',
      imageLinkAria: 'Register an Instrument: Open online instrument registration for traders'
    },

    // Slide 2: Public Zero-Login Services
    {
      id: 2,
      tag: lang === 'en' ? 'NO LOGIN REQUIRED' : 'बिना लॉगिन उपलब्ध',
      title: lang === 'en' ? 'Verify Without Login' : 'बिना लॉगिन सत्यापन करें',
      desc: lang === 'en'
        ? 'Citizens can check certificate details and access public verification services without creating an account.'
        : 'नागरिक बिना खाता बनाए प्रमाणपत्र विवरण देख सकते हैं और सार्वजनिक सत्यापन सेवाओं तक पहुँच सकते हैं।',
      ctaPrimary: lang === 'en' ? 'Verify Certificate' : 'प्रमाणपत्र सत्यापित करें',
      ctaPrimaryHref: '/portal/pages/public/verify-qr.html',
      ctaSecondary: lang === 'en' ? 'Report a Problem' : 'समस्या की रिपोर्ट करें',
      ctaSecondaryHref: '/portal/pages/citizen/complaint.html',
      imageSrc: '/assets/images/hero/citizen-verification.jpg',
      imageAlt: 'Indian citizen verifying weighing scale QR code on smartphone without login',
      imageLink: '/portal/pages/public/verify-qr.html',
      imageLinkAria: 'Verify Without Login: Open public certificate verification service'
    },

    // Slide 3: Simple Digital Services (Paperwork to Digital)
    {
      id: 3,
      tag: lang === 'en' ? 'DIGITAL SERVICES' : 'डिजिटल सेवाएँ',
      title: lang === 'en' ? 'Access Services Online' : 'ऑनलाइन सेवाओं तक पहुँचें',
      desc: lang === 'en'
        ? 'Find the relevant service, submit an application where available, and follow the process digitally.'
        : 'प्रासंगिक सेवा खोजें, जहाँ उपलब्ध हो आवेदन जमा करें और प्रक्रिया को डिजिटल रूप से पूरा करें।',
      ctaPrimary: lang === 'en' ? 'Explore Services' : 'सेवाएँ देखें',
      ctaPrimaryHref: '/portal/pages/public/services.html',
      ctaSecondary: null,
      ctaSecondaryHref: null,
      imageSrc: '/assets/images/hero/digital-transformation.jpg',
      imageAlt: 'Transition from paper registers to digital government services on Legal Matrix',
      imageLink: '/portal/pages/public/services.html',
      imageLinkAria: 'Access Services Online: Explore directory of digital metrology services'
    },

    // Slide 4: Inspector Visit & Verification
    {
      id: 4,
      tag: lang === 'en' ? 'ON-SITE INSPECTION' : 'स्थान पर निरीक्षण',
      title: lang === 'en' ? 'Inspection at Your Location' : 'आपके स्थान पर निरीक्षण',
      desc: lang === 'en'
        ? 'After the applicable appointment is arranged, an inspector can visit the registered location to examine the instrument.'
        : 'नियुक्ति निर्धारित होने के बाद, निरीक्षक उपकरण की जाँच के लिए पंजीकृत स्थान का दौरा कर सकते हैं।',
      ctaPrimary: lang === 'en' ? 'Track Application' : 'आवेदन ट्रैक करें',
      ctaPrimaryHref: '/portal/pages/public/track.html',
      ctaSecondary: null,
      ctaSecondaryHref: null,
      imageSrc: '/assets/images/hero/inspector-verification.jpg',
      imageAlt: 'Legal Metrology inspector visiting shop to verify commercial weighing scale',
      imageLink: '/portal/pages/public/track.html',
      imageLinkAria: 'Inspection at Your Location: Track your scheduled inspection and application status'
    },

    // Slide 5: Verified Digital Certificate
    {
      id: 5,
      tag: lang === 'en' ? 'DIGITAL CERTIFICATE' : 'डिजिटल प्रमाणपत्र',
      title: lang === 'en' ? 'Receive Your Verified Certificate' : 'अपना सत्यापित प्रमाणपत्र प्राप्त करें',
      desc: lang === 'en'
        ? 'After successful verification, an applicable certificate can be issued with its defined validity period.'
        : 'सफल सत्यापन के बाद, निर्धारित वैधता अवधि के साथ लागू प्रमाणपत्र जारी किया जा सकता है।',
      ctaPrimary: lang === 'en' ? 'Verify Certificate' : 'प्रमाणपत्र सत्यापित करें',
      ctaPrimaryHref: '/portal/pages/public/verify-qr.html',
      ctaSecondary: null,
      ctaSecondaryHref: null,
      imageSrc: '/assets/images/hero/digital-certificate.jpg',
      imageAlt: 'Verified digital certificate with QR code for commercial measuring instrument',
      imageLink: '/portal/pages/public/verify-qr.html',
      imageLinkAria: 'Receive Your Verified Certificate: Verify official digital calibration certificate'
    }
  ];

  // Automatic rotation timer (5 seconds)
  useEffect(() => {
    if (isPaused || isUserPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, isUserPaused, slidesData.length]);

  // Tab visibility check
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else if (!isUserPaused) {
        setIsPaused(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isUserPaused]);

  // Preload images
  useEffect(() => {
    slidesData.forEach(s => {
      const img = new Image();
      img.src = s.imageSrc;
    });
  }, []);

  const handlePrev = () => {
    setIsPaused(false);
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  const handleNext = () => {
    setIsPaused(false);
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  };

  const togglePlayPause = () => {
    setIsUserPaused(prev => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section 
      className="hero-carousel-section"
      role="region"
      aria-roledescription="carousel"
      aria-label="Legal Matrix Ecosystem Overview"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => { setIsPaused(true); }}
      onMouseLeave={() => { setIsPaused(false); }}
      onFocus={(e) => {
        try {
          if ((e.target as HTMLElement).matches(':focus-visible')) {
            setIsPaused(true);
          }
        } catch {
          // Fallback
        }
      }}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          setIsPaused(false);
        }
      }}
      ref={containerRef}
    >
      {/* Subtle Ambient Background Canvas */}
      <div className="hero-ambient-canvas" aria-hidden="true">
        <div className="ambient-orb orb-saffron"></div>
        <div className="ambient-orb orb-blue"></div>
        <div className="ambient-orb orb-green"></div>
        <div className="ambient-grid-mesh"></div>
      </div>

      <div className="hero-carousel-container">
        {/* Slides Viewport */}
        <div 
          className="carousel-viewport" 
          onTouchStart={handleTouchStart} 
          onTouchEnd={handleTouchEnd}
        >
          {slidesData.map((slide, idx) => (
            <div 
              key={slide.id}
              className={`carousel-slide ${idx === currentSlide ? 'active' : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${lang === 'en' ? 'Slide' : 'स्लाइड'} ${idx + 1} ${lang === 'en' ? 'of' : 'का'} ${slidesData.length}`}
              aria-hidden={idx === currentSlide ? 'false' : 'true'}
            >
              {/* Left Column: Heading & CTAs */}
              <div className="slide-text-col">
                <div className="slide-tag-badge">
                  <span className="tag-indicator-dot" aria-hidden="true"></span>
                  <span>{slide.tag}</span>
                </div>
                <h1 className="slide-heading">
                  {slide.title}
                </h1>
                <p className="slide-description">
                  {slide.desc}
                </p>

                <div className="slide-actions">
                  <a href={slide.ctaPrimaryHref} className="slide-btn-primary">
                    <Scale size={18} aria-hidden="true" />
                    <span>{slide.ctaPrimary}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>

                  {slide.ctaSecondary && (
                    <a href={slide.ctaSecondaryHref!} className="slide-btn-secondary">
                      <QrCode size={18} aria-hidden="true" />
                      <span>{slide.ctaSecondary}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Clickable Hero Image Card */}
              <div className="slide-visual-col">
                <a 
                  href={slide.imageLink} 
                  className="hero-image-card" 
                  aria-label={slide.imageLinkAria}
                  title={slide.title}
                >
                  <div className="hero-image-frame">
                    <img 
                      src={slide.imageSrc} 
                      alt={slide.imageAlt} 
                      className="hero-slide-img" 
                      loading={idx === 0 ? 'eager' : 'lazy'} 
                      decoding="async" 
                    />
                    <div className="hero-image-hover-chip" aria-hidden="true">
                      <span>{lang === 'en' ? 'Click image to open' : 'खोलने के लिए छवि पर क्लिक करें'}</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Controls Bar */}
        <div className="carousel-controls-bar">
          {/* Counter: 01 / 05 */}
          <div className="carousel-counter-group" aria-live="polite">
            <span className="carousel-counter-text">
              <span className="carousel-counter-active">0{currentSlide + 1}</span>
              {' '}/ 0{slidesData.length}
            </span>
          </div>

          {/* Indicator Dots */}
          <div className="carousel-indicators" role="tablist" aria-label="Slide Selection">
            {slidesData.map((_, idx) => (
              <button 
                key={idx}
                type="button" 
                className={`carousel-indicator-btn ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                role="tab" 
                aria-selected={idx === currentSlide}
                aria-label={`${lang === 'en' ? 'Go to slide' : 'स्लाइड पर जाएं'} ${idx + 1}`}
              />
            ))}
          </div>

          {/* Previous / PlayPause / Next Navigation Buttons */}
          <div className="carousel-nav-buttons">
            <button 
              type="button" 
              className="carousel-nav-btn"
              onClick={handlePrev}
              aria-label={lang === 'en' ? 'Previous slide' : 'पिछला स्लाइड'}
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button 
              type="button" 
              className={`carousel-nav-btn ${isUserPaused ? 'is-paused' : ''}`}
              onClick={togglePlayPause}
              aria-label={isUserPaused ? (lang === 'en' ? 'Resume auto-rotation' : 'ऑटो-रोटेशन फिर से शुरू करें') : (lang === 'en' ? 'Pause auto-rotation' : 'ऑटो-रोटेशन रोकें')}
            >
              {isUserPaused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
            </button>
            <button 
              type="button" 
              className="carousel-nav-btn"
              onClick={handleNext}
              aria-label={lang === 'en' ? 'Next slide' : 'अगला स्लाइड'}
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
