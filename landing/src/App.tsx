import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  QrCode, 
  FileSearch, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  PhoneCall,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText,
  Clock,
  Layers,
  BookOpen,
  LayoutGrid,
  LogIn,
  Bell,
  ArrowRight,
  HelpCircle,
  Award,
  Globe
} from 'lucide-react';
import { HeroCarousel } from './components/HeroCarousel';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi'>(() => {
    try {
      const stored = sessionStorage.getItem('legalMatrixLanguage');
      if (stored === 'hi' || stored === 'en') return stored;
    } catch {}
    return 'en';
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [quickSearchId, setQuickSearchId] = useState('');
  const [searchMode, setSearchMode] = useState<'track' | 'cert'>('track');
  const [serviceFilter, setServiceFilter] = useState<'all' | 'citizen' | 'trader' | 'officer'>('all');

  // Sync language with sessionStorage & document attribute
  const handleLanguageChange = (newLang: 'en' | 'hi') => {
    setLang(newLang);
    try {
      sessionStorage.setItem('legalMatrixLanguage', newLang);
      document.documentElement.setAttribute('lang', newLang);
    } catch {}
    window.dispatchEvent(new CustomEvent('legalMatrixLanguageChange', { detail: { lang: newLang } }));
  };

  useEffect(() => {
    try {
      sessionStorage.setItem('legalMatrixLanguage', lang);
      document.documentElement.setAttribute('lang', lang);
    } catch {}
  }, [lang]);

  // Sync if external language switch fires
  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ lang: 'en' | 'hi' }>;
      if (customEvent.detail?.lang && (customEvent.detail.lang === 'en' || customEvent.detail.lang === 'hi')) {
        setLang(customEvent.detail.lang);
      }
    };
    window.addEventListener('legalMatrixLanguageChange', handleSync);
    return () => window.removeEventListener('legalMatrixLanguageChange', handleSync);
  }, []);

  // Lightweight Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [serviceFilter]);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = quickSearchId.trim();
    if (!val) return;
    if (searchMode === 'track') {
      window.location.href = `/portal/pages/public/track.html?app=${encodeURIComponent(val)}`;
    } else {
      window.location.href = `/portal/pages/public/verify-qr.html?cert=${encodeURIComponent(val)}`;
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: lang === 'en' 
        ? "Who is legally required to verify and stamp measuring instruments?"
        : "किन व्यक्तियों को माप उपकरणों का सत्यापन और मुद्रांकन कराना अनिवार्य है?",
      a: lang === 'en'
        ? "Under Section 24 of the Legal Metrology Act, 2009, every person possessing any commercial weight or measure used in trade, transaction, or protection must verify and stamp it before commercial use and periodically thereafter as prescribed by State Rules."
        : "विधिक मापविज्ञान अधिनियम, 2009 की धारा 24 के अंतर्गत, व्यावसायिक लेन-देन में उपयोग किए जाने वाले किसी भी वजन या माप को उपयोग से पहले और उसके बाद समय-समय पर राज्य नियमों के अनुसार सत्यापित और मुद्रांकित कराना अनिवार्य है।"
    },
    {
      q: lang === 'en'
        ? "What is Maximum Permissible Error (MPE) in legal metrology?"
        : "विधिक मापविज्ञान में अधिकतम अनुमेय त्रुटि (MPE) क्या है?",
      a: lang === 'en'
        ? "Maximum Permissible Error (MPE) is the legally defined extreme limit of measurement error permitted by statutory calibration standards. Instruments with errors exceeding the MPE fail verification and cannot be legally stamped for commercial trade."
        : "अधिकतम अनुमेय त्रुटि (MPE) कानूनी रूप से परिभाषित माप त्रुटि की अधिकतम सीमा है। यदि त्रुटि MPE से अधिक होती है, तो उपकरण सत्यापन में विफल हो जाता है और व्यावसायिक उपयोग के लिए अमान्य घोषित किया जाता है।"
    },
    {
      q: lang === 'en'
        ? "What is the division of responsibility between Central and State authorities?"
        : "केंद्रीय और राज्य प्राधिकरणों के बीच उत्तरदायित्व का क्या विभाजन है?",
      a: lang === 'en'
        ? "The Central Government (Department of Consumer Affairs) enacts the Act, secondary standards, overarching rules, and issues Model Approvals for newly manufactured instruments. State and UT Directorates handle field verification, periodic stamping, market inspections, and anti-fraud surveillance."
        : "केंद्र सरकार (उपभोक्ता मामले विभाग) राष्ट्रीय अधिनियम, नियम और मॉडल अनुमोदन जारी करती है। राज्य और केंद्र शासित प्रदेश निदेशालय जमीनी स्तर पर आवधिक सत्यापन, मुद्रांकन और प्रवर्तन का संचालन करते हैं।"
    },
    {
      q: lang === 'en'
        ? "What mandatory declarations must appear on pre-packaged commodities?"
        : "पूर्व-पैक वस्तुओं (Pre-Packaged Commodities) पर क्या अनिवार्य घोषणाएं होनी चाहिए?",
      a: lang === 'en'
        ? "Under the Legal Metrology (Packaged Commodities) Rules, 2011, every retail packaged commodity must clearly declare: manufacturer/packer identity, commodity name, net quantity in standard metric units, month and year of packing, Maximum Retail Price (MRP inclusive of all taxes), and consumer helpline details."
        : "विधिक मापविज्ञान (पैक की गई वस्तुएं) नियम, 2011 के तहत प्रत्येक पैक वस्तु पर निर्माता का नाम, वस्तु का नाम, शुद्ध मात्रा, पैकिंग माह व वर्ष, MRP (सभी करों सहित), तथा उपभोक्ता सहायता संपर्क अनिवार्य रूप से घोषित होना चाहिए।"
    },
    {
      q: lang === 'en'
        ? "How can an ordinary citizen verify a merchant scale or report short-weighting?"
        : "एक आम नागरिक व्यापारी के तराजू की जांच कैसे कर सकता है या कम वजन की शिकायत कैसे दर्ज कर सकता है?",
      a: lang === 'en'
        ? "Citizens can inspect the verification certificate or physical stamp on the scale. Through this portal, citizens can verify certificate authenticity via QR verification, or submit an official consumer grievance. Grievances are routed directly to jurisdictional enforcement officers."
        : "नागरिक तराजू पर लगे सत्यापन प्रमाण पत्र या भौतिक मुद्रांकन की जांच कर सकते हैं। इस पोर्टल के माध्यम से QR सत्यापन द्वारा प्रमाण पत्र की प्रामाणिकता की जांच की जा सकती है, या कम तौलने पर आधिकारिक शिकायत दर्ज कराई जा सकती है।"
    }
  ];

  return (
    <div className="landing-app">
      {/* Accessible Off-Screen Skip Link */}
      <a href="#main-content" className="sr-only">
        {lang === 'en' ? 'Skip to Main Content' : 'मुख्य सामग्री पर जाएं'}
      </a>

      {/* 1. TOP INSTITUTIONAL AUTHORITY STRIP */}
      <div className="gov-top-bar" role="region" aria-label="Official Authority Strip">
        <div className="landing-container">
          <div className="gov-top-content">
            <div className="gov-identity-strip">
              <span className="gov-flag-emblem" aria-hidden="true">&#x1F1EE;&#x1F1F3;</span>
              <span>{lang === 'en' ? 'भारत सरकार | Government of India' : 'Government of India | भारत सरकार'}</span>
              <span className="gov-sep" aria-hidden="true">&bull;</span>
              <span>{lang === 'en' ? 'उपभोक्ता मामले विभाग | Department of Consumer Affairs' : 'उपभोक्ता मामले विभाग | Department of Consumer Affairs'}</span>
            </div>

            <div className="top-utility-group">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '12px', color: '#0b3558' }}>
                <Globe size={14} className="globe-icon" aria-hidden="true" />
                <select 
                  value={lang} 
                  onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'hi')}
                  aria-label="Change language / भाषा बदलें"
                  style={{
                    background: 'transparent',
                    border: '1.5px solid #0b3558',
                    borderRadius: '4px',
                    padding: '3px 8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#0b3558',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. INSTITUTIONAL HEADER & BRANDING */}
      <header className="institutional-header">
        <div className="landing-container">
          <div className="header-inner">
            <a href="/" className="official-brand-link" aria-label="Legal Matrix Home">
              <div className="official-seal">
                <Scale size={28} style={{ color: '#ffffff' }} aria-hidden="true" />
              </div>
              <div className="official-brand-titles">
                <div className="brand-super">
                  {lang === 'en' ? 'Ministry of Consumer Affairs, Food & Public Distribution' : 'उपभोक्ता मामले, खाद्य और सार्वजनिक वितरण मंत्रालय'}
                </div>
                <div className="brand-main">
                  LEGAL MATRIX
                </div>
                <div className="brand-sub">
                  {lang === 'en' ? 'National Legal Metrology Digital Services Portal' : 'राष्ट्रीय विधिक मापविज्ञान डिजिटल सेवा पोर्टल'}
                </div>
              </div>
            </a>

            <div className="header-actions">
              <a href="/portal/pages/auth/login.html" className="gov-btn gov-btn-navy">
                <LogIn size={16} aria-hidden="true" />
                <span>{lang === 'en' ? 'Officer & Trader Login' : 'अधिकारी एवं व्यापारी लॉगिन'}</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 3. PRIMARY NAVIGATION BAR */}
      <nav className="institutional-navbar" aria-label="Main Navigation">
        <div className="landing-container">
          <ul className="nav-menu">
            <li>
              <a href="/" className="nav-link">
                <LayoutGrid size={15} aria-hidden="true" />
                <span>{lang === 'en' ? 'Home' : 'मुख्य पृष्ठ'}</span>
              </a>
            </li>
            <li>
              <a href="/landing/dist/index.html" className="nav-link active">
                <Globe size={15} aria-hidden="true" />
                <span>{lang === 'en' ? 'Public Portal' : 'सार्वजनिक पोर्टल'}</span>
              </a>
            </li>
            <li>
              <a href="/portal/pages/public/services.html" className="nav-link">
                <Award size={15} aria-hidden="true" />
                <span>{lang === 'en' ? 'Services Directory' : 'सेवा निर्देशिका'}</span>
              </a>
            </li>
            <li>
              <a href="/portal/pages/public/verify-qr.html" className="nav-link">
                <QrCode size={15} aria-hidden="true" />
                <span>{lang === 'en' ? 'Verify Certificate' : 'प्रमाणपत्र सत्यापन'}</span>
              </a>
            </li>
            <li>
              <a href="/portal/pages/public/track.html" className="nav-link">
                <FileSearch size={15} aria-hidden="true" />
                <span>{lang === 'en' ? 'Track Application' : 'आवेदन ट्रैक करें'}</span>
              </a>
            </li>
            <li>
              <a href="/portal/pages/citizen/complaint.html" className="nav-link alert-link">
                <AlertTriangle size={15} aria-hidden="true" />
                <span>{lang === 'en' ? 'Consumer Grievance' : 'शिकायत दर्ज करें'}</span>
              </a>
            </li>
            <li>
              <a href="#about-metrology" className="nav-link">
                <BookOpen size={15} aria-hidden="true" />
                <span>{lang === 'en' ? 'About Legal Metrology' : 'विधिक मापविज्ञान'}</span>
              </a>
            </li>
            <li>
              <a href="/portal/pages/public/terms-and-conditions.html" className="nav-link">
                <FileText size={15} aria-hidden="true" />
                <span>{lang === 'en' ? 'Terms & Conditions' : 'नियम एवं शर्तें'}</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Tricolor Accent Line beneath Header */}
      <div className="tricolor-stripe" aria-hidden="true"></div>

      {/* 4. CONTINUOUS SMOOTH MOVING NOTICE TICKER */}
      <div className="announcements-bar" role="region" aria-label="Official Service Notices">
        <div className="landing-container">
          <div className="ticker-wrapper">
            <div className="ticker-label">
              <Bell size={14} className="bell-icon" aria-hidden="true" />
              <span>{lang === 'en' ? 'SERVICE NOTICE' : 'महत्वपूर्ण सूचना'}</span>
            </div>

            <div className="ticker-viewport">
              <div className="ticker-track">
                <span>
                  {lang === 'en'
                    ? 'Mandatory periodic verification and stamping for all commercial weighing instruments and retail scales under Section 24 of the Legal Metrology Act, 2009.'
                    : 'विधिक मापविज्ञान अधिनियम, 2009 की धारा 24 के अंतर्गत व्यावसायिक उपयोग वाले सभी वजन और माप उपकरणों का आवधिक सत्यापन व मुद्रांकन अनिवार्य है।'}
                </span>
                <span className="ticker-bullet">&bull;</span>
                <span>
                  {lang === 'en'
                    ? 'Verify commercial instrument stamping certificates online instantly using the public QR Verification tool.'
                    : 'सार्वजनिक QR सत्यापन उपकरण का उपयोग करके व्यावसायिक मुद्रांकन प्रमाणपत्रों की ऑनलाइन तुरंत जांच करें।'}
                </span>
                <span className="ticker-bullet">&bull;</span>
                <span>
                  {lang === 'en'
                    ? 'Traders can file Form V e-applications for initial, annual, or biennial calibration online.'
                    : 'व्यापारी प्रारंभिक, वार्षिक या द्विवार्षिक अंशांकन हेतु फॉर्म V ई-आवेदन ऑनलाइन जमा कर सकते हैं।'}
                </span>
                <span className="ticker-bullet">&bull;</span>
                <span>
                  {lang === 'en'
                    ? 'Ensure all retail pre-packaged goods declare net quantity, MRP, and packer information under Packaged Commodities Rules, 2011.'
                    : 'सुनिश्चित करें कि सभी खुदरा पैकेज्ड वस्तुओं पर शुद्ध मात्रा, MRP तथा निर्माता विवरण स्पष्ट रूप से घोषित हो।'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main id="main-content">
        {/* 5. HERO VISUAL STORY CAROUSEL (5 VISUAL SLIDES) */}
        <HeroCarousel lang={lang} />

        {/* QUICK SERVICE SEARCH CARD */}
        <section className="section-quick-search" style={{ padding: '36px 0', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
          <div className="landing-container">
            <div className="hero-search-card" style={{ maxWidth: '800px', margin: '0 auto', background: '#ffffff', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', borderTop: '4px solid var(--india-saffron)' }}>
              <div className="search-tab-header">
                <button 
                  type="button" 
                  className={`search-tab-btn ${searchMode === 'track' ? 'active' : ''}`}
                  onClick={() => setSearchMode('track')}
                >
                  <FileSearch size={16} aria-hidden="true" />
                  <span>{lang === 'en' ? 'Track Application' : 'आवेदन स्थिति ट्रैक करें'}</span>
                </button>
                <button 
                  type="button" 
                  className={`search-tab-btn ${searchMode === 'cert' ? 'active' : ''}`}
                  onClick={() => setSearchMode('cert')}
                >
                  <QrCode size={16} aria-hidden="true" />
                  <span>{lang === 'en' ? 'Verify Certificate ID' : 'प्रमाणपत्र संख्या जांचें'}</span>
                </button>
              </div>

              <form onSubmit={handleQuickSubmit} className="search-form-row">
                <div className="search-input-wrap">
                  <Search size={18} className="search-input-icon" aria-hidden="true" />
                  <input 
                    type="text" 
                    value={quickSearchId}
                    onChange={(e) => setQuickSearchId(e.target.value)}
                    placeholder={searchMode === 'track' 
                      ? (lang === 'en' ? 'Enter Application No. (e.g. LM-2026-00124)' : 'आवेदन संख्या दर्ज करें (उदा. LM-2026-00124)') 
                      : (lang === 'en' ? 'Enter Certificate No. (e.g. CERT-2026-4401)' : 'प्रमाणपत्र संख्या दर्ज करें (उदा. CERT-2026-4401)')}
                    className="gov-search-input"
                    aria-label={searchMode === 'track' ? 'Application Number' : 'Certificate Number'}
                  />
                </div>
                <button type="submit" className="gov-btn gov-btn-navy">
                  <Search size={16} aria-hidden="true" />
                  <span>{lang === 'en' ? 'Search Record' : 'रिकॉर्ड खोजें'}</span>
                </button>
              </form>
              <div className="search-helper-text">
                {searchMode === 'track' 
                  ? (lang === 'en' ? 'Enter your application number generated during online submission.' : 'ऑनलाइन आवेदन जमा करते समय प्राप्त अपनी आवेदन संख्या दर्ज करें।') 
                  : (lang === 'en' ? 'Verify statutory validity, stamping date, and assigned officer of any commercial certificate.' : 'किसी भी व्यावसायिक प्रमाणपत्र की वैधानिक वैधता, मुद्रांकन तिथि और निरीक्षक की पुष्टि करें।')}
              </div>
            </div>
          </div>
        </section>

        {/* 6. PRIMARY CITIZEN & BUSINESS PATHWAYS WITH DYNAMIC ROLE TABS */}
        <section className="section-service-pathways">
          <div className="landing-container">
            <div className="section-head reveal-on-scroll">
              <span className="section-subhead">{lang === 'en' ? 'SERVICE PATHWAYS' : 'सेवा मार्ग'}</span>
              <h2 className="section-title">
                <span className="heading-icon-badge">
                  <LayoutGrid size={18} aria-hidden="true" />
                </span>
                <span>{lang === 'en' ? 'Select Your Operational Category' : 'अपनी संचालन श्रेणी का चयन करें'}</span>
              </h2>
              <p className="section-description">
                {lang === 'en' 
                  ? 'Direct access for commercial traders, consumers, and departmental enforcement officers.'
                  : 'व्यापारियों, उपभोक्ताओं और विभागीय प्रवर्तन अधिकारियों के लिए सीधी पहुँच।'}
              </p>
            </div>

            {/* Interactive Role Tabs */}
            <div className="service-filter-tabs reveal-on-scroll" role="tablist">
              <button 
                type="button" 
                className={`filter-tab ${serviceFilter === 'all' ? 'active' : ''}`}
                onClick={() => setServiceFilter('all')}
              >
                {lang === 'en' ? 'All Pathways' : 'सभी सेवाएँ'}
              </button>
              <button 
                type="button" 
                className={`filter-tab ${serviceFilter === 'trader' ? 'active' : ''}`}
                onClick={() => setServiceFilter('trader')}
              >
                {lang === 'en' ? 'Traders & Manufacturers' : 'व्यापारी एवं निर्माता'}
              </button>
              <button 
                type="button" 
                className={`filter-tab ${serviceFilter === 'citizen' ? 'active' : ''}`}
                onClick={() => setServiceFilter('citizen')}
              >
                {lang === 'en' ? 'Citizens & Consumers' : 'नागरिक एवं उपभोक्ता'}
              </button>
              <button 
                type="button" 
                className={`filter-tab ${serviceFilter === 'officer' ? 'active' : ''}`}
                onClick={() => setServiceFilter('officer')}
              >
                {lang === 'en' ? 'Enforcement Officers' : 'प्रवर्तन अधिकारी'}
              </button>
            </div>

            <div className="pathway-cards-grid">
              {/* Card 1: Commercial Traders & Manufacturers */}
              {(serviceFilter === 'all' || serviceFilter === 'trader') && (
                <div className="pathway-card reveal-on-scroll">
                  <div className="pathway-icon-wrapper navy-accent">
                    <Scale size={28} aria-hidden="true" />
                  </div>
                  <h3 className="pathway-title">
                    {lang === 'en' ? 'Commercial Traders & Manufacturers' : 'व्यापारी एवं उपकरण निर्माता'}
                  </h3>
                  <p className="pathway-desc">
                    {lang === 'en' 
                      ? 'Register commercial weighing scales, fuel dispensers, weighbridges, and submit Form V e-applications for annual stamping.'
                      : 'व्यावसायिक तराजू, ईंधन पंप, धर्मकांटा का पंजीकरण करें और वार्षिक मुद्रांकन हेतु फॉर्म V ई-आवेदन जमा करें।'}
                  </p>
                  <ul className="pathway-list">
                    <li><a href="/portal/pages/trader/register-instrument.html">&bull; {lang === 'en' ? 'Apply for Instrument Verification' : 'उपकरण सत्यापन हेतु आवेदन करें'}</a></li>
                    <li><a href="/portal/pages/trader/dashboard.html">&bull; {lang === 'en' ? 'Trader Dashboard & Applications' : 'व्यापारी डैशबोर्ड एवं आवेदन'}</a></li>
                    <li><a href="/portal/pages/trader/certificates.html">&bull; {lang === 'en' ? 'Download Stamping Certificates' : 'मुद्रांकन प्रमाणपत्र डाउनलोड करें'}</a></li>
                  </ul>
                  <a href="/portal/pages/trader/register-instrument.html" className="pathway-footer-link">
                    <span>{lang === 'en' ? 'Open Trader Services' : 'व्यापारी सेवाएँ खोलें'}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              )}

              {/* Card 2: Citizens & Consumers */}
              {(serviceFilter === 'all' || serviceFilter === 'citizen') && (
                <div className="pathway-card reveal-on-scroll">
                  <div className="pathway-icon-wrapper saffron-accent">
                    <AlertTriangle size={28} aria-hidden="true" />
                  </div>
                  <h3 className="pathway-title">
                    {lang === 'en' ? 'Citizens & Consumers' : 'नागरिक एवं उपभोक्ता'}
                  </h3>
                  <p className="pathway-desc">
                    {lang === 'en' 
                      ? 'Protect consumer rights, verify merchant scale certificates by QR code, and report short-weighting or packaged goods violations.'
                      : 'उपभोक्ता अधिकारों की रक्षा करें, QR कोड से व्यापारी के तराजू की जांच करें और कम तौलने पर तुरंत शिकायत दर्ज करें।'}
                  </p>
                  <ul className="pathway-list">
                    <li><a href="/portal/pages/public/verify-qr.html">&bull; {lang === 'en' ? 'QR Stamping Certificate Verification' : 'QR मुद्रांकन प्रमाणपत्र सत्यापन'}</a></li>
                    <li><a href="/portal/pages/citizen/complaint.html">&bull; {lang === 'en' ? 'Report Short-Weight or Defective Scale' : 'कम वजन या दोषपूर्ण तराजू की शिकायत करें'}</a></li>
                    <li><a href="/portal/pages/public/track.html">&bull; {lang === 'en' ? 'Track Citizen Grievance Status' : 'उपभोक्ता शिकायत स्थिति ट्रैक करें'}</a></li>
                  </ul>
                  <a href="/portal/pages/citizen/complaint.html" className="pathway-footer-link">
                    <span>{lang === 'en' ? 'Report a Grievance' : 'शिकायत दर्ज करें'}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              )}

              {/* Card 3: Departmental Officers */}
              {(serviceFilter === 'all' || serviceFilter === 'officer') && (
                <div className="pathway-card reveal-on-scroll">
                  <div className="pathway-icon-wrapper green-accent">
                    <Building2 size={28} aria-hidden="true" />
                  </div>
                  <h3 className="pathway-title">
                    {lang === 'en' ? 'Enforcement & Inspection Officers' : 'प्रवर्तन एवं निरीक्षण अधिकारी'}
                  </h3>
                  <p className="pathway-desc">
                    {lang === 'en' 
                      ? 'Authorized Legal Metrology Officers access field inspection schedules, record MPE tolerance tests, and issue digital stamps.'
                      : 'विधिक मापविज्ञान अधिकारी निरीक्षण अनुसूची देखें, MPE त्रुटि परीक्षण दर्ज करें और डिजिटल मुहर जारी करें।'}
                  </p>
                  <ul className="pathway-list">
                    <li><a href="/portal/pages/inspector/dashboard.html">&bull; {lang === 'en' ? 'Inspector Verification Workspace' : 'निरीक्षक सत्यापन कार्यक्षेत्र'}</a></li>
                    <li><a href="/portal/pages/inspector/inspect.html">&bull; {lang === 'en' ? 'MPE Dynamic Tolerance Form' : 'MPE सहिष्णुता परीक्षण फॉर्म'}</a></li>
                    <li><a href="/portal/pages/admin/dashboard.html">&bull; {lang === 'en' ? 'State Administrative Control Center' : 'राज्य प्रशासनिक नियंत्रण केंद्र'}</a></li>
                  </ul>
                  <a href="/portal/pages/auth/login.html" className="pathway-footer-link">
                    <span>{lang === 'en' ? 'Departmental Login' : 'विभागीय लॉगिन'}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 7. ABOUT LEGAL METROLOGY */}
        <section id="about-metrology" className="section-about-metrology">
          <div className="landing-container">
            <div className="about-panel reveal-on-scroll">
              <div className="about-text-content">
                <span className="section-subhead">{lang === 'en' ? 'STATUTORY STRUCTURE' : 'वैधानिक संरचना'}</span>
                <h2 className="about-title">
                  <span className="heading-icon-badge">
                    <BookOpen size={18} aria-hidden="true" />
                  </span>
                  <span>{lang === 'en' ? 'About Legal Metrology in India' : 'भारत में विधिक मापविज्ञान'}</span>
                </h2>
                <p className="about-body-text">
                  {lang === 'en' 
                    ? 'Legal metrology is the application of statutory regulatory requirements to measurements and measuring instruments. It provides public guarantee regarding measurement accuracy, consumer protection, and commercial equity under the Legal Metrology Act, 2009.'
                    : 'विधिक मापविज्ञान माप और माप उपकरणों पर लागू होने वाली वैधानिक नियामक आवश्यकताओं का अनुप्रयोग है। यह विधिक मापविज्ञान अधिनियम, 2009 के तहत माप सटीकता, उपभोक्ता संरक्षण और निष्पक्ष व्यापार की सार्वजनिक गारंटी प्रदान करता है।'}
                </p>

                <div className="responsibility-grid">
                  <div className="resp-box">
                    <div className="resp-badge central">{lang === 'en' ? 'Central Government Role' : 'केंद्र सरकार की भूमिका'}</div>
                    <h4 className="resp-title">{lang === 'en' ? 'Department of Consumer Affairs' : 'उपभोक्ता मामले विभाग'}</h4>
                    <p className="resp-text">
                      {lang === 'en' 
                        ? 'Formulates national legislation, enacts model rules, approves specifications of prototype standards, and issues Model Approval certificates under Section 22 for new commercial instrument designs.'
                        : 'राष्ट्रीय कानून तैयार करता है, मॉडल नियम बनाता है, मानक विनिर्देशों को मंजूरी देता है और नए व्यावसायिक उपकरणों के लिए धारा 22 के तहत मॉडल अनुमोदन जारी करता है।'}
                    </p>
                  </div>

                  <div className="resp-box">
                    <div className="resp-badge state">{lang === 'en' ? 'State & UT Governments Role' : 'राज्य एवं केंद्र शासित प्रदेशों की भूमिका'}</div>
                    <h4 className="resp-title">{lang === 'en' ? 'State Directorates of Legal Metrology' : 'राज्य विधिक मापविज्ञान निदेशालय'}</h4>
                    <p className="resp-text">
                      {lang === 'en' 
                        ? 'Maintains secondary and working standards, conducts physical verification and stamping of commercial instruments, conducts market inspections, and prosecutes offenses such as short-weighing or tampering.'
                        : 'माध्यमिक और कार्यकारी मानकों को बनाए रखता है, उपकरणों का भौतिक सत्यापन व मुद्रांकन करता है, बाजार निरीक्षण करता है और कम तौलने या छेड़छाड़ पर कानूनी कार्रवाई करता है।'}
                    </p>
                  </div>
                </div>

                <div className="official-disclaimer-note">
                  <strong>{lang === 'en' ? 'Official Reference:' : 'आधिकारिक संदर्भ:'}</strong> {lang === 'en' ? 'For statutory gazette notifications, directorate directory, and centralized circulars, visit the official Department of Consumer Affairs portal at' : 'वैधानिक राजपत्र अधिसूचनाओं, निदेशालय निर्देशिका और केंद्रीय परिपत्रों के लिए आधिकारिक उपभोक्ता मामले विभाग पोर्टल पर जाएं:'}{' '}
                  <a href="https://consumeraffairs.nic.in/" target="_blank" rel="noopener noreferrer" className="inline-gov-link">
                    consumeraffairs.nic.in <ExternalLink size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
                  </a>.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. VERIFICATION WORKFLOW (STEP-BY-STEP PROCESS) */}
        <section id="process-flow" className="section-process-workflow">
          <div className="landing-container">
            <div className="section-head text-center reveal-on-scroll">
              <span className="section-subhead">{lang === 'en' ? 'FOUR-STAGE WORKFLOW' : 'चार-चरणीय कार्यप्रणाली'}</span>
              <h2 className="section-title">
                <span className="heading-icon-badge">
                  <Clock size={18} aria-hidden="true" />
                </span>
                <span>{lang === 'en' ? 'Statutory Verification & Stamping Process' : 'वैधानिक सत्यापन एवं मुद्रांकन प्रक्रिया'}</span>
              </h2>
              <p className="section-description">
                {lang === 'en' 
                  ? 'Standard procedural lifecycle from application filing to physical verification and digital certificate generation.'
                  : 'आवेदन जमा करने से लेकर भौतिक सत्यापन और डिजिटल प्रमाणपत्र जारी होने तक का मानक जीवनचक्र।'}
              </p>
            </div>

            <div className="workflow-steps-container">
              {/* Step 1 */}
              <div className="workflow-step-item reveal-on-scroll">
                <div className="workflow-step-index">1</div>
                <div className="workflow-icon-box">
                  <FileText size={28} aria-hidden="true" />
                </div>
                <h3 className="workflow-step-name">{lang === 'en' ? 'Application & Form V' : 'आवेदन एवं फॉर्म V'}</h3>
                <p className="workflow-step-info">
                  {lang === 'en' 
                    ? 'Trader submits e-application with instrument class, serial number, make, and capacity details.'
                    : 'व्यापारी उपकरण की श्रेणी, सीरियल नंबर, निर्माता और क्षमता विवरण के साथ ई-आवेदन जमा करते हैं।'}
                </p>
                <div className="workflow-meta-tag">{lang === 'en' ? 'Online Submission' : 'ऑनलाइन प्रस्तुतिकरण'}</div>
              </div>

              {/* Step 2 */}
              <div className="workflow-step-item reveal-on-scroll">
                <div className="workflow-step-index">2</div>
                <div className="workflow-icon-box">
                  <Clock size={28} aria-hidden="true" />
                </div>
                <h3 className="workflow-step-name">{lang === 'en' ? 'Inspector Scheduling' : 'निरीक्षक निर्धारण'}</h3>
                <p className="workflow-step-info">
                  {lang === 'en' 
                    ? 'Jurisdictional officer is assigned and verification date is scheduled for field or laboratory inspection.'
                    : 'क्षेत्राधिकार अधिकारी को नियुक्त किया जाता है और भौतिक निरीक्षण हेतु तिथि निर्धारित की जाती है।'}
                </p>
                <div className="workflow-meta-tag">{lang === 'en' ? 'Officer Allocated' : 'अधिकारी आवंटित'}</div>
              </div>

              {/* Step 3 */}
              <div className="workflow-step-item reveal-on-scroll">
                <div className="workflow-step-index">3</div>
                <div className="workflow-icon-box">
                  <Scale size={28} aria-hidden="true" />
                </div>
                <h3 className="workflow-step-name">{lang === 'en' ? 'MPE Calibration Check' : 'MPE अंशांकन जांच'}</h3>
                <p className="workflow-step-info">
                  {lang === 'en' 
                    ? 'Physical testing using certified working standards. Error must fall strictly within Maximum Permissible Error.'
                    : 'मानक भारों का उपयोग कर भौतिक परीक्षण। त्रुटि अधिकतम अनुमेय त्रुटि (MPE) के भीतर होनी चाहिए।'}
                </p>
                <div className="workflow-meta-tag">{lang === 'en' ? 'Accuracy Verified' : 'सटीकता सत्यापित'}</div>
              </div>

              {/* Step 4 */}
              <div className="workflow-step-item reveal-on-scroll">
                <div className="workflow-step-index">4</div>
                <div className="workflow-icon-box">
                  <CheckCircle2 size={28} aria-hidden="true" />
                </div>
                <h3 className="workflow-step-name">{lang === 'en' ? 'Stamping & Certificate' : 'मुद्रांकन एवं प्रमाणपत्र'}</h3>
                <p className="workflow-step-info">
                  {lang === 'en' 
                    ? 'Physical seal applied to instrument. Digital certificate issued with encrypted QR code for public verification.'
                    : 'उपकरण पर भौतिक मुहर लगाई जाती है और सार्वजनिक जांच हेतु एन्क्रिप्टेड QR कोड युक्त डिजिटल प्रमाणपत्र जारी होता है।'}
                </p>
                <div className="workflow-meta-tag">{lang === 'en' ? 'Certificate Issued' : 'प्रमाणपत्र जारी'}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. STATUTORY ACTS & RULES */}
        <section id="acts-rules" className="section-acts-rules">
          <div className="landing-container">
            <div className="section-head reveal-on-scroll">
              <span className="section-subhead">{lang === 'en' ? 'LEGAL PROVISIONS' : 'कानूनी प्रावधान'}</span>
              <h2 className="section-title">
                <span className="heading-icon-badge">
                  <FileText size={18} aria-hidden="true" />
                </span>
                <span>{lang === 'en' ? 'Key Acts, Rules and Statutory Schedules' : 'प्रमुख अधिनियम, नियम और वैधानिक अनुसूचियां'}</span>
              </h2>
              <p className="section-description">
                {lang === 'en' 
                  ? 'Governing provisions applicable to commercial weights, measures, weighing instruments, and pre-packaged commodities.'
                  : 'व्यावसायिक वजन, माप, तौल उपकरणों और पैक की गई वस्तुओं पर लागू होने वाले कानूनी प्रावधान।'}
              </p>
            </div>

            <div className="acts-grid">
              <div className="act-card reveal-on-scroll">
                <div className="act-header">
                  <BookOpen size={20} className="act-icon" aria-hidden="true" />
                  <h4>{lang === 'en' ? 'The Legal Metrology Act, 2009' : 'विधिक मापविज्ञान अधिनियम, 2009'}</h4>
                </div>
                <p>{lang === 'en' ? 'Act No. 1 of 2010. Establishes uniform standards, units of measurement, model approval, and inspection powers.' : 'अधिनियम संख्या 1 (2010)। मानक इकाइयां, मॉडल अनुमोदन और निरीक्षण अधिकार स्थापित करता है।'}</p>
                <div className="act-meta">{lang === 'en' ? 'Primary Central Legislation' : 'प्राथमिक केंद्रीय कानून'}</div>
              </div>

              <div className="act-card reveal-on-scroll">
                <div className="act-header">
                  <Layers size={20} className="act-icon" aria-hidden="true" />
                  <h4>{lang === 'en' ? 'The Legal Metrology (General) Rules, 2011' : 'विधिक मापविज्ञान (सामान्य) नियम, 2011'}</h4>
                </div>
                <p>{lang === 'en' ? 'Outlines specifications for non-automatic weighing instruments, fuel dispensers, weighbridges, and MPE limits.' : 'गैर-स्वचालित तौल उपकरणों, ईंधन पंपों, धर्मकांटों और MPE सीमाओं के विनिर्देशों की रूपरेखा।'}</p>
                <div className="act-meta">{lang === 'en' ? 'Technical Calibration Standards' : 'तकनीकी अंशांकन मानक'}</div>
              </div>

              <div className="act-card reveal-on-scroll">
                <div className="act-header">
                  <FileText size={20} className="act-icon" aria-hidden="true" />
                  <h4>{lang === 'en' ? 'Packaged Commodities Rules, 2011' : 'पैक की गई वस्तुएं नियम, 2011'}</h4>
                </div>
                <p>{lang === 'en' ? 'Prescribes mandatory declarations on all pre-packaged retail commodities including weight, MRP, and consumer helpline.' : 'खुदरा पैक वस्तुओं पर शुद्ध वजन, MRP और उपभोक्ता हेल्पलाइन सहित अनिवार्य घोषणाएं निर्धारित करता है।'}</p>
                <div className="act-meta">{lang === 'en' ? 'Consumer Protection Provisions' : 'उपभोक्ता संरक्षण प्रावधान'}</div>
              </div>

              <div className="act-card reveal-on-scroll">
                <div className="act-header">
                  <ShieldCheck size={20} className="act-icon" aria-hidden="true" />
                  <h4>{lang === 'en' ? 'Approval of Models Rules, 2011' : 'मॉडल अनुमोदन नियम, 2011'}</h4>
                </div>
                <p>{lang === 'en' ? 'Requires manufacturers to submit prototypes for testing and receive approval certificates before mass distribution.' : 'निर्माताओं को बड़े पैमाने पर वितरण से पूर्व प्रोटोटाइप परीक्षण और अनुमोदन प्रमाणपत्र प्राप्त करना अनिवार्य है।'}</p>
                <div className="act-meta">{lang === 'en' ? 'Manufacturing & Import Approval' : 'निर्माण एवं आयात अनुमोदन'}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. FREQUENTLY ASKED QUESTIONS */}
        <section className="section-faqs">
          <div className="landing-container">
            <div className="section-head text-center reveal-on-scroll">
              <span className="section-subhead">{lang === 'en' ? 'CITIZEN & TRADER GUIDANCE' : 'नागरिक एवं व्यापारी मार्गदर्शन'}</span>
              <h2 className="section-title">
                <span className="heading-icon-badge">
                  <HelpCircle size={18} aria-hidden="true" />
                </span>
                <span>{lang === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले प्रश्न'}</span>
              </h2>
              <p className="section-description">
                {lang === 'en' ? 'Clear statutory answers regarding verification duties, tolerances, and citizen rights.' : 'सत्यापन कर्तव्यों, सहिष्णुता सीमाओं और नागरिक अधिकारों से संबंधित स्पष्ट वैधानिक उत्तर।'}
              </p>
            </div>

            <div className="faq-accordion-wrap reveal-on-scroll">
              {faqs.map((item, index) => (
                <div key={index} className={`faq-item ${activeFaq === index ? 'open' : ''}`}>
                  <button 
                    type="button" 
                    className="faq-question-btn"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={activeFaq === index}
                  >
                    <span className="faq-q-text">
                      <HelpCircle size={18} className="faq-q-icon" aria-hidden="true" />
                      {item.q}
                    </span>
                    <span className="faq-chevron">
                      {activeFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </button>
                  {activeFaq === index && (
                    <div className="faq-answer-panel">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. CITIZEN HELPLINE & GRIEVANCE SUPPORT STRIP */}
        <section className="section-helpline-strip">
          <div className="landing-container">
            <div className="helpline-inner-grid reveal-on-scroll">
              <div>
                <span className="helpline-label">{lang === 'en' ? 'NATIONAL GRIEVANCE & CONSUMER DESK' : 'राष्ट्रीय उपभोक्ता शिकायत डेस्क'}</span>
                <h3 className="helpline-title">{lang === 'en' ? 'Report Mis-measurement, Tampering, or Overcharging' : 'गलत माप, छेड़छाड़ या अधिक मूल्य वसूली की रिपोर्ट करें'}</h3>
                <p className="helpline-text">
                  {lang === 'en'
                    ? 'Encountered an unverified weighing scale or missing mandatory declarations on a packaged commodity? File a direct grievance with your State Legal Metrology Division.'
                    : 'क्या आपको असत्यापित तराजू या पैकेज्ड वस्तु पर अनिवार्य विवरण गायब मिला? अपने राज्य विधिक मापविज्ञान प्रभाग में सीधे शिकायत दर्ज करें।'}
                </p>
              </div>

              <div className="helpline-actions">
                <a href="tel:1800114000" className="gov-btn gov-btn-primary helpline-btn">
                  <PhoneCall size={18} aria-hidden="true" />
                  <span>{lang === 'en' ? 'Call Toll-Free: 1800-11-4000' : 'टोल-फ्री कॉल: 1800-11-4000'}</span>
                </a>
                <a href="/portal/pages/citizen/complaint.html" className="gov-btn gov-btn-outline-navy">
                  <AlertTriangle size={18} aria-hidden="true" />
                  <span>{lang === 'en' ? 'Submit Online Grievance' : 'ऑनलाइन शिकायत दर्ज करें'}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 12. INSTITUTIONAL FOOTER */}
      <footer className="institutional-footer" role="contentinfo">
        <div className="tricolor-stripe" aria-hidden="true"></div>

        <div className="landing-container">
          <div className="footer-top-grid">
            {/* Ministry Identification */}
            <div className="footer-col brand-col">
              <div className="footer-brand-header">
                <Scale size={24} style={{ color: 'var(--india-saffron)' }} aria-hidden="true" />
                <span className="footer-brand-title">LEGAL MATRIX</span>
              </div>
              <p className="footer-brand-desc">
                {lang === 'en' 
                  ? 'National Legal Metrology Digital Ecosystem. Modernizing statutory verification, stamping records, and consumer equity across India.'
                  : 'राष्ट्रीय विधिक मापविज्ञान डिजिटल पारिस्थितिकी तंत्र। भारत भर में वैधानिक सत्यापन, मुद्रांकन और उपभोक्ता निष्पक्षता का आधुनिकीकरण।'}
              </p>
              <div className="footer-gov-hierarchy">
                <div>{lang === 'en' ? 'Department of Consumer Affairs' : 'उपभोक्ता मामले विभाग'}</div>
                <div>{lang === 'en' ? 'Ministry of Consumer Affairs, Food & Public Distribution' : 'उपभोक्ता मामले, खाद्य और सार्वजनिक वितरण मंत्रालय'}</div>
                <div>{lang === 'en' ? 'Government of India' : 'भारत सरकार'}</div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4 className="footer-heading">{lang === 'en' ? 'Online Services' : 'ऑनलाइन सेवाएँ'}</h4>
              <ul className="footer-link-list">
                <li>
                  <a href="/portal/pages/trader/register-instrument.html">
                    <Scale size={13} aria-hidden="true" />
                    <span>{lang === 'en' ? 'Instrument Verification (Form V)' : 'उपकरण सत्यापन (फॉर्म V)'}</span>
                  </a>
                </li>
                <li>
                  <a href="/portal/pages/public/verify-qr.html">
                    <QrCode size={13} aria-hidden="true" />
                    <span>{lang === 'en' ? 'QR Certificate Verification' : 'QR प्रमाणपत्र सत्यापन'}</span>
                  </a>
                </li>
                <li>
                  <a href="/portal/pages/public/track.html">
                    <FileSearch size={13} aria-hidden="true" />
                    <span>{lang === 'en' ? 'Application Status Tracking' : 'आवेदन स्थिति ट्रैकिंग'}</span>
                  </a>
                </li>
                <li>
                  <a href="/portal/pages/citizen/complaint.html">
                    <AlertTriangle size={13} aria-hidden="true" />
                    <span>{lang === 'en' ? 'Consumer Grievance Lodging' : 'उपभोक्ता शिकायत दर्ज करें'}</span>
                  </a>
                </li>
                <li>
                  <a href="/portal/pages/public/services.html">
                    <LayoutGrid size={13} aria-hidden="true" />
                    <span>{lang === 'en' ? 'Services Directory' : 'सेवा निर्देशिका'}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Statutory Framework */}
            <div className="footer-col">
              <h4 className="footer-heading">{lang === 'en' ? 'Statutory References' : 'वैधानिक संदर्भ'}</h4>
              <ul className="footer-link-list">
                <li>
                  <a href="#acts-rules">
                    <BookOpen size={13} aria-hidden="true" />
                    <span>{lang === 'en' ? 'The Legal Metrology Act, 2009' : 'विधिक मापविज्ञान अधिनियम, 2009'}</span>
                  </a>
                </li>
                <li>
                  <a href="#acts-rules">
                    <FileText size={13} aria-hidden="true" />
                    <span>{lang === 'en' ? 'Packaged Commodities Rules, 2011' : 'पैक की गई वस्तुएं नियम, 2011'}</span>
                  </a>
                </li>
                <li>
                  <a href="#acts-rules">
                    <Layers size={13} aria-hidden="true" />
                    <span>{lang === 'en' ? 'General Rules, 2011 (MPE Specs)' : 'सामान्य नियम, 2011 (MPE विनिर्देश)'}</span>
                  </a>
                </li>
                <li>
                  <a href="https://consumeraffairs.nic.in/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={13} aria-hidden="true" />
                    <span>{lang === 'en' ? 'Department Portal (External)' : 'विभागीय पोर्टल (बाहरी)'}</span>
                  </a>
                </li>
                <li>
                  <a href="/portal/pages/auth/login.html">
                    <LogIn size={13} aria-hidden="true" />
                    <span>{lang === 'en' ? 'Departmental Officer Login' : 'अधिकारी लॉगिन'}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Policies & Institutional Compliance */}
            <div className="footer-col">
              <h4 className="footer-heading">{lang === 'en' ? 'Policies & Compliance' : 'नीतियां एवं अनुपालन'}</h4>
              <ul className="footer-link-list">
                <li>
                  <a href="/portal/pages/public/privacy-policy.html">
                    <ShieldCheck size={13} aria-hidden="true" />
                    <span>{lang === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}</span>
                  </a>
                </li>
                <li>
                  <a href="/portal/pages/public/terms-and-conditions.html">
                    <FileText size={13} aria-hidden="true" />
                    <span>{lang === 'en' ? 'Terms and Conditions' : 'नियम एवं शर्तें'}</span>
                  </a>
                </li>
                <li>
                  <a href="#about-metrology">
                    <BookOpen size={13} aria-hidden="true" />
                    <span>{lang === 'en' ? 'Statutory Guidelines' : 'वैधानिक दिशानिर्देश'}</span>
                  </a>
                </li>
                <li>
                  <a href="tel:1800114000">
                    <PhoneCall size={13} aria-hidden="true" />
                    <span>{lang === 'en' ? 'National Consumer Helpline' : 'राष्ट्रीय उपभोक्ता हेल्पलाइन'}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div>
              {lang === 'en'
                ? 'An official initiative under the Legal Metrology Act, 2009. Directorate of Legal Metrology, Department of Consumer Affairs, Government of India.'
                : 'विधिक मापविज्ञान अधिनियम, 2009 के अंतर्गत एक आधिकारिक पहल। विधिक मापविज्ञान निदेशालय, उपभोक्ता मामले विभाग, भारत सरकार।'}
            </div>
            <div className="footer-copyright">
              &copy; 2026 Legal Matrix. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
