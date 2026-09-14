import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, CreditCard, ThumbsUp, ThumbsDown, Check, ArrowUpRight, 
  Lock, User, Download, FileText, AlertTriangle, BookOpen, Sparkles, 
  CheckCircle2, Scale, ShieldAlert, ArrowRight, Mail, HelpCircle
} from 'lucide-react';
import { AutoNovaAudio } from './AudioEngine';

export const TermsOfServiceView = ({ userName, role, onNavigateToView, showNotification, initialTab = 'terms' }) => {
  const [activeSection, setActiveSection] = useState(initialTab === 'privacy' ? 'privacy-policy' : 'introduction');
  const [feedbackRegistered, setFeedbackRegistered] = useState(false);
  const [feedbackValue, setFeedbackValue] = useState(null); // 'positive' or 'negative'
  const [isDownloading, setIsDownloading] = useState(false);

  // Section Refs for smooth scrolling
  const sectionRefs = {
    introduction: useRef(null),
    'user-accounts': useRef(null),
    'marketplace-rules': useRef(null),
    'privacy-policy': useRef(null),
    liability: useRef(null),
    termination: useRef(null)
  };

  const sectionsList = [
    { id: 'introduction', label: '1. Introduction', num: '1' },
    { id: 'user-accounts', label: '2. User Accounts', num: '2' },
    { id: 'marketplace-rules', label: '3. Marketplace Rules', num: '3' },
    { id: 'privacy-policy', label: '4. Privacy & Data', num: '4' },
    { id: 'liability', label: '5. Limitation of Liability', num: '5' },
    { id: 'termination', label: '6. Account Termination', num: '6' }
  ];

  // Scroll spy to update active sidebar item on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (const [id, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    AutoNovaAudio.playClick();
    setActiveSection(id);
    if (sectionRefs[id]?.current) {
      sectionRefs[id].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Jump straight to the Privacy & Data section when arriving via /privacy —
  // previously /terms and /privacy were 100% identical with no distinction at all.
  useEffect(() => {
    if (initialTab === 'privacy' && sectionRefs['privacy-policy']?.current) {
      const t = setTimeout(() => {
        sectionRefs['privacy-policy'].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTab]);

  const handleFeedback = (type) => {
    AutoNovaAudio.playSuccess();
    setFeedbackRegistered(true);
    setFeedbackValue(type);
    showNotification("Feedback recorded. Thank you for helping us maintain absolute clarity.", "success");
  };

  const handleDownloadPDF = () => {
    AutoNovaAudio.playClick();
    setIsDownloading(true);
    showNotification("Compiling secure legal document ledger...", "info");
    
    setTimeout(() => {
      setIsDownloading(false);
      AutoNovaAudio.playSuccess();
      showNotification("Document decrypted. Triggering system print dialogue.", "success");
      window.print();
    }, 1500);
  };

  const handleContactLegal = () => {
    AutoNovaAudio.playClick();
    showNotification("Establishing encrypted line to Legal Compliance Pod...", "info");
    setTimeout(() => {
      AutoNovaAudio.playSuccess();
      showNotification("Secure downlink verified. Legal response team alerted.", "success");
    }, 1200);
  };

  return (
    <div className="w-full bg-[#fdf8f8] min-h-screen pb-16 font-sans text-zinc-900 overflow-x-hidden">
      
      {/* 1. HERO HEADER AREA */}
      <section className="relative pt-12 pb-10 px-6 text-center border-b border-zinc-200/40 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-teal-300/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-300/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-3xl mx-auto space-y-4 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/40 text-teal-950 font-mono text-[8.5px] uppercase font-black tracking-widest"
          >
            <ShieldCheck className="h-3 w-3 text-teal-600 animate-pulse" />
            <span>AutoNova Legal Core</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl md:text-4xl font-extrabold text-teal-950 tracking-tight"
          >
            {initialTab === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-medium text-zinc-500"
          >
            <span className="px-3 py-1 bg-white border border-zinc-200 rounded-full">
              Last updated: July 2024
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Version 2.4.1 (Kinetic Protocol)</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-2"
          >
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 bg-teal-950 hover:bg-teal-900 text-white font-mono text-[9px] font-bold tracking-widest uppercase px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                  COMPILING...
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" />
                  DOWNLOAD PDF
                </>
              )}
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. MAIN LAYOUT GRID */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: Sidebar TOC Navigation (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6">
          <div className="bg-white border border-zinc-200/50 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-mono text-[9.5px] font-bold text-teal-900 tracking-widest uppercase border-b border-zinc-100 pb-2">
              Legal Navigation
            </h3>
            
            <nav className="flex flex-col gap-1.5">
              {sectionsList.map((sect) => {
                const isActive = activeSection === sect.id;
                return (
                  <button
                    key={sect.id}
                    onClick={() => scrollToSection(sect.id)}
                    className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                      isActive 
                        ? 'bg-teal-950 text-white shadow-sm font-black' 
                        : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                    }`}
                  >
                    <span>{sect.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Prompting Widget */}
          <div className="bg-teal-50 border border-teal-200/30 rounded-3xl p-6 space-y-4">
            <p className="text-[11px] text-zinc-500 leading-relaxed font-semibold">
              Need further technical clarification regarding our kinetic ledger compliance matrices or transaction protocols?
            </p>
            <button
              onClick={handleContactLegal}
              className="w-full bg-white hover:bg-zinc-50 border border-teal-600/30 text-teal-950 font-mono text-[8.5px] font-black tracking-widest uppercase py-3 rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>CONTACT LEGAL POD</span>
              <ArrowUpRight className="h-3 w-3 text-teal-600" />
            </button>
          </div>
        </aside>

        {/* RIGHT COLUMN: Interactive Document Reader (9 cols) */}
        <article className="col-span-1 lg:col-span-9 space-y-12 bg-white border border-zinc-200/50 rounded-[32px] p-6 md:p-10 shadow-sm">
          
          {/* Document Introduction header */}
          <div className="space-y-4">
            <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-medium">
              Welcome to AutoNova Kinetic Intelligence. These Terms of Service ("Terms") govern your access to and use of our automotive marketplace platform, services, and applications. Please read these terms carefully before engaging with our kinetic ecosystem.
            </p>
          </div>

          {/* Section 1: Introduction */}
          <section 
            id="introduction" 
            ref={sectionRefs.introduction}
            className="space-y-4 scroll-mt-24"
          >
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-2">
              <span className="font-mono text-[10px] bg-teal-100 text-teal-900 px-2 py-0.5 rounded-md font-bold">1</span>
              <h2 className="font-display text-sm md:text-base font-extrabold text-teal-950">
                Introduction &amp; Covenant
              </h2>
            </div>
            
            <div className="text-xs md:text-sm text-zinc-500 leading-relaxed space-y-3 font-medium">
              <p>
                By accessing AutoNova, you agree to be bound by these Terms and our Privacy Policy. Our platform provides a high-velocity interface for buying, selling, and financing high-performance vehicles through advanced algorithmic matching.
              </p>
              <p>
                We reserve the right to update these terms at any time. Significant changes will be communicated via the email address associated with your account or through a prominent notice on our interface.
              </p>
            </div>
          </section>

          {/* Custom Stylized Image Break */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="my-8 rounded-2xl overflow-hidden aspect-[21/9] relative group border border-zinc-200/40"
          >
            <img 
              alt="A clean, minimalist high-tech automotive workshop interior with soft natural lighting and a futuristic aesthetic." 
              className="w-full h-full object-cover filter brightness-95 group-hover:scale-101 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ0tfDfPN-_EhoDHh6O8qHaiKeTThlPqyl3fP810MyClowVM7G4aBUYIKDGn3yGTYD1Vv13ienzCnMia7-K0c4AffGAJPQaLW8NxQ8_wCO08p5fsgQU92K2WGXK3xLQqMZWjhoUNY3NuyE2hI4CrT6qLFp9vrXCnvNxWDm0sfdR13WnA54OUUbDjIpUaBoifptPj4teT1DdjWetZwcfBOMV1CcCBiRqWNkWAynz-YDlkA7IudiiZk0RNKa73KZ4GbEajnq2XiBZpff"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/40 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-3 left-4 font-mono text-[7px] font-bold text-white tracking-widest bg-teal-950/60 px-2 py-0.5 rounded backdrop-blur-xs uppercase">
              AUTONOVA CORE PROTOCOL SPECIFICATION
            </span>
          </motion.div>

          {/* Section 2: User Accounts */}
          <section 
            id="user-accounts" 
            ref={sectionRefs['user-accounts']}
            className="space-y-4 scroll-mt-24"
          >
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-2">
              <span className="font-mono text-[10px] bg-teal-100 text-teal-900 px-2 py-0.5 rounded-md font-bold">2</span>
              <h2 className="font-display text-sm md:text-base font-extrabold text-teal-950">
                User Accounts &amp; Node Registration
              </h2>
            </div>
            
            <div className="text-xs md:text-sm text-zinc-500 leading-relaxed space-y-4 font-medium">
              <p>
                To access certain features of the platform, you must register for an AutoNova account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
              </p>
              
              <ul className="space-y-2.5 pl-1.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>You must be at least 18 years of age to create an account.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>All information provided must be accurate, verified, and kept current.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Identity verification is required for high-value transactional bidding channels.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Marketplace Rules */}
          <section 
            id="marketplace-rules" 
            ref={sectionRefs['marketplace-rules']}
            className="space-y-6 scroll-mt-24"
          >
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-2">
              <span className="font-mono text-[10px] bg-teal-100 text-teal-900 px-2 py-0.5 rounded-md font-bold">3</span>
              <h2 className="font-display text-sm md:text-base font-extrabold text-teal-950">
                Marketplace Rules &amp; Escrow Security
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-teal-50/40 rounded-2xl border border-teal-100/50 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h4 className="font-display text-xs md:text-sm font-bold text-teal-950">
                  Authenticity &amp; Diagnostics
                </h4>
                <p className="text-[11.5px] text-zinc-500 leading-relaxed font-semibold">
                  All listings must be verified through our Kinetic Scan protocol to ensure mechanical integrity, electronic module conformity, and unalterable ownership history.
                </p>
              </div>

              <div className="p-5 bg-teal-50/40 rounded-2xl border border-teal-100/50 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                  <CreditCard className="h-4 w-4" />
                </div>
                <h4 className="font-display text-xs md:text-sm font-bold text-teal-950">
                  Transaction Escrow
                </h4>
                <p className="text-[11.5px] text-zinc-500 leading-relaxed font-semibold">
                  Payments are processed through secure, encrypted escrow channels. AutoNova acts as a neutral facilitator and certified escrow provider for all marketplace deals.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Privacy & Data */}
          <section 
            id="privacy-policy" 
            ref={sectionRefs['privacy-policy']}
            className="space-y-4 scroll-mt-24"
          >
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-2">
              <span className="font-mono text-[10px] bg-teal-100 text-teal-900 px-2 py-0.5 rounded-md font-bold">4</span>
              <h2 className="font-display text-sm md:text-base font-extrabold text-teal-950">
                Privacy, Data &amp; Telemetry
              </h2>
            </div>
            
            <div className="text-xs md:text-sm text-zinc-500 leading-relaxed space-y-4 font-medium">
              <p>
                Your privacy is paramount. We utilize industry-leading encryption to protect your personal data, cryptographic session keys, and transaction history. We do not sell your personal information to third parties.
              </p>
              
              <div className="bg-teal-50/60 p-5 rounded-2xl border-l-4 border-teal-800 italic text-[11.5px] text-zinc-600 font-semibold">
                "AutoNova leverages anonymized kinetic data to improve platform performance and matching algorithms, ensuring a frictionless experience for all users."
              </div>
            </div>
          </section>

          {/* Section 5: Limitation of Liability */}
          <section 
            id="liability" 
            ref={sectionRefs.liability}
            className="space-y-4 scroll-mt-24"
          >
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-2">
              <span className="font-mono text-[10px] bg-teal-100 text-teal-900 px-2 py-0.5 rounded-md font-bold">5</span>
              <h2 className="font-display text-sm md:text-base font-extrabold text-teal-950">
                Limitation of Liability
              </h2>
            </div>
            
            <div className="text-xs md:text-sm text-zinc-500 leading-relaxed space-y-3 font-medium">
              <p>
                AutoNova provides the platform on an "as-is" and "as-available" basis. To the maximum extent permitted by law, AutoNova shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, telemetry data, or financial revenues.
              </p>
              <p>
                We do not guarantee uninterrupted server uptimes, real-time sync states in extreme weather conditions affecting vehicle telemetry, or mechanical failures occurring after the closed 3-day inspection corridor.
              </p>
            </div>
          </section>

          {/* Section 6: Account Termination */}
          <section 
            id="termination" 
            ref={sectionRefs.termination}
            className="space-y-4 scroll-mt-24"
          >
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-2">
              <span className="font-mono text-[10px] bg-teal-100 text-teal-900 px-2 py-0.5 rounded-md font-bold">6</span>
              <h2 className="font-display text-sm md:text-base font-extrabold text-teal-950">
                Account Termination
              </h2>
            </div>
            
            <div className="text-xs md:text-sm text-zinc-500 leading-relaxed font-medium">
              <p>
                We reserve the right to suspend or terminate your account access at our sole discretion, without notice, for conduct that we believe violates these Terms, presents systemic security risks, or is harmful to other users of the platform, us, or third parties, or for any other reason.
              </p>
            </div>
          </section>

          {/* Was this helpful interactive feedback block */}
          <div className="mt-12 flex flex-col items-center justify-center p-6 md:p-8 bg-zinc-50/50 border border-zinc-200/50 rounded-3xl text-center space-y-4">
            <h3 className="font-display text-xs md:text-sm font-extrabold text-teal-950">
              Was this document helpful?
            </h3>
            <p className="text-[11px] text-zinc-400 font-medium">
              We value your feedback to keep our legal and compliance agreements clear and concise.
            </p>

            <AnimatePresence mode="wait">
              {!feedbackRegistered ? (
                <motion.div 
                  key="feedback-selectors"
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex gap-3"
                >
                  <button 
                    onClick={() => handleFeedback('positive')}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-zinc-200/80 rounded-full font-sans text-xs font-bold text-zinc-600 hover:text-teal-950 hover:border-teal-700 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <ThumbsUp className="h-3.5 w-3.5 text-teal-600" />
                    <span>Yes</span>
                  </button>
                  <button 
                    onClick={() => handleFeedback('negative')}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-zinc-200/80 rounded-full font-sans text-xs font-bold text-zinc-600 hover:text-red-950 hover:border-red-700 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <ThumbsDown className="h-3.5 w-3.5 text-red-600" />
                    <span>No</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="feedback-thankyou"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-950 font-mono text-[9px] font-bold px-3 py-1.5 rounded-lg border border-teal-200/40 uppercase tracking-widest"
                >
                  <Check className="h-3.5 w-3.5 text-teal-700" />
                  <span>Feedback Registered!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </article>

      </section>

    </div>
  );
};
