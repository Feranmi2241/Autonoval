import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, ShoppingCart, Tag, CreditCard, User, Receipt, Truck,
  Plus, Minus, ArrowRight, HelpCircle, ThumbsUp, ThumbsDown, MessageSquare, 
  Sparkles, Send, X, FileText, Check, ShieldCheck, Heart, Info, Clock, AlertTriangle,
  Phone, Mail, MessageCircle
} from 'lucide-react';
import { AutoNovaAudio } from './AudioEngine';

// Rich FAQ Dataset categorized for filtering and search indexing
const FAQ_DATA = [
  {
    id: 'faq-1',
    category: 'buying',
    question: 'How do I purchase a vehicle on AutoNova?',
    answer: 'Buying on AutoNova is secure and streamlined. Browse our certified showroom, run a simulated valuation on your current trade-in, and click "Initiate Purchase". This holds the vehicle on our private ledger. You can choose to checkout directly, apply for integrated financing, or schedule a physical inspect-and-test drive prior to finalized payment authorization.'
  },
  {
    id: 'faq-2',
    category: 'buying',
    question: 'What is the "Sovereign Car Passport"?',
    answer: 'Every car listed on AutoNova features a Sovereign Passport—a cryptographically verified physical history ledger. It aggregates manufacturer maintenance records, customs import logs, regional battery telemetry checks, and chassis acoustic diagnostic records. Once verified, this data is unalterable, ensuring absolute truth in ownership history.'
  },
  {
    id: 'faq-3',
    category: 'selling',
    question: 'How do I list my car for sale?',
    answer: 'Navigate to the "Seller Dashboard" and click "Create Listing". Input your Vehicle Identification Number (VIN) and local registration code. Our NovaCore™ engine will pull physical telemetry logs, history indices, and state configurations to automatically populate vehicle specifications and calculate a premium, hyper-localized market valuation corridor.'
  },
  {
    id: 'faq-4',
    category: 'selling',
    question: 'How are seller payouts disbursed?',
    answer: 'Once a buyer authorizes a transaction, funds are processed into our secure encrypted escrow protocol. When vehicle logistics are cleared and the custom inspection validation period (typically 72 hours) completes successfully, the escrow triggers instant payout disbursement to your linked bank account.'
  },
  {
    id: 'faq-5',
    category: 'financing',
    question: 'Can I finance an electric vehicle on the platform?',
    answer: 'Absolutely. We offer specialized kinetic financing models tailored specifically for electric vehicles. This includes real-time integration of active national and regional green tax credits, battery depreciation amortization tables, and preferred borrowing rates sourced from our sustainable lending pool partners.'
  },
  {
    id: 'faq-6',
    category: 'financing',
    question: 'How do green tax credit calculations work?',
    answer: 'When you finalize your vehicle checkout, our financing module automatically analyzes federal and local state EV incentives. These credits are deducted directly from your principal purchase matrix on-the-fly, reducing your monthly payment obligations from day one without requiring complex tax filings.'
  },
  {
    id: 'faq-7',
    category: 'account',
    question: 'How do I verify my member profile status?',
    answer: 'Verification is managed securely through your Member Settings page. Upload a valid government-issued ID and complete the instant facial biometric compliance scan. Verified members unlock access to premium high-value bidding corridors, customized valuation alerts, and direct seller chat interfaces.'
  },
  {
    id: 'faq-8',
    category: 'account',
    question: 'Is my personal data encrypted on AutoNova?',
    answer: 'Security is our core metric. All user identity credentials, financial records, and message logs are protected using end-to-end industry-grade encryption. Sensitive physical vehicle telemetry is synchronized to an anonymized ledger node, stripping away any personal linkage to maintain absolute privacy.'
  },
  {
    id: 'faq-9',
    category: 'payments',
    question: 'How does the secure escrow protocol work?',
    answer: 'The AutoNova Escrow protocol prevents payment asymmetry. When a purchase is initiated, the buyer’s capital is securely locked in an encrypted vault. Funds are only transferred to the seller after the physical delivery log is signed, and the 3-day inspection window closes without structural discrepancy logs.'
  },
  {
    id: 'faq-10',
    category: 'payments',
    question: 'What payment methods do you support?',
    answer: 'We support standard high-throughput bank transfers (ACH/Wire), major credit/debit card integrations for escrow holdings, and secure digital wallets. For high-tier enterprise clients and sovereign buyers, customized institutional transaction clearances can be coordinated through our compliance department.'
  },
  {
    id: 'faq-11',
    category: 'delivery',
    question: 'How does vehicle logistics and delivery work?',
    answer: 'We operate an active logistics coordination grid. Upon transaction confirmation, an approved transport vehicle is dispatched to the seller. The car is protected inside a climate-managed container, tracked in real-time, and delivered straight to the buyer’s chosen address with a complete handover kit.'
  },
  {
    id: 'faq-12',
    category: 'delivery',
    question: 'Can I track my vehicle transport in real-time?',
    answer: 'Yes. Once logistics are initialized, your Order Tracking board updates with real-time GPS coordinates, vehicle temperature sensors, and projected local arrival matrices. You will receive active push alerts as the delivery node approaches your drop-off zone.'
  }
];

// Popular Articles list
const POPULAR_ARTICLES = [
  { id: 'art-ev-guide', title: '2025 EV Buying Guide & Battery Valuation', url: 'blog' },
  { id: 'art-trade-in', title: 'How to trade-in your vehicle with NovaCore™ AI', url: 'valuation' },
  { id: 'art-titles', title: 'Understanding Title Transfers & Escrow Security', url: 'finance' },
  { id: 'art-inspect', title: 'Safety Inspection 101: Acoustic Engine Mapping', url: 'blog' }
];

// Interactive chatbot simulated conversations
const CHAT_QUICK_REPLIES = [
  { q: "How does the escrow payment work?", r: "Excellent question! Our secure escrow protocol holds your payment capital in an encrypted vault. Funds are only disbursed to the seller AFTER you physically receive the vehicle and complete your 3-day inspection window. It completely eliminates transaction fraud." },
  { q: "What is AI-driven valuation accuracy?", r: "NovaCore™ AI utilizes 4D kinetic mapping. Instead of basic estimations based on age and generic mileage, it integrates multi-modal telemetry databases, live market auctions, and environmental degradation parameters to ensure a valuation precision of 99.85%." },
  { q: "Tell me about shipping and delivery times.", r: "Vehicle logistics typically take between 3 to 7 business days, depending on geographic distance. Every transport occurs within climate-managed freight containers with real-time GPS telemetry tracking accessible directly on your member dashboard." },
  { q: "Can I cancel a transaction after payment?", r: "Yes. If the vehicle delivered does not match the specifications or reveals undeclared structural damage during the 3-day inspection phase, you can log a discrepancy report. Escrow holding will be paused and our inspection pod will resolve or refund your capital." }
];

export const HelpCenterView = ({ userName, role, onNavigateToView, showNotification, initialTab = 'faq' }) => {
  const [activeView, setActiveView] = useState(initialTab); // 'faq' | 'contact'
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'General Question', message: '' });
  const [contactSent, setContactSent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFaqId, setOpenFaqId] = useState(null);
  
  // Feedback States
  const [feedbackRegistered, setFeedbackRegistered] = useState(false);
  const [feedbackValue, setFeedbackValue] = useState(null); // 'positive' or 'negative'

  // Chat Support Widget States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'agent', text: `Greetings, user. I am your AutoNova support module. How can I assist with your journey?`, time: 'Just now' }
  ]);
  const [customChatMessage, setCustomChatMessage] = useState('');
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  // Category metrics config
  const categories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle },
    { id: 'buying', name: 'Buying', icon: ShoppingCart },
    { id: 'selling', name: 'Selling', icon: Tag },
    { id: 'financing', name: 'Financing', icon: CreditCard },
    { id: 'account', name: 'Account', icon: User },
    { id: 'payments', name: 'Payments', icon: Receipt },
    { id: 'delivery', name: 'Delivery', icon: Truck },
  ];

  // Filters FAQ based on search input and active category
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter(faq => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const cleanQuery = searchQuery.toLowerCase().trim();
      if (!cleanQuery) return matchesCategory;
      
      const matchesSearch = 
        faq.question.toLowerCase().includes(cleanQuery) || 
        faq.answer.toLowerCase().includes(cleanQuery) ||
        faq.category.toLowerCase().includes(cleanQuery);
        
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleCategoryClick = (catId) => {
    AutoNovaAudio.playClick();
    setSelectedCategory(catId);
    setOpenFaqId(null);
    if (catId !== 'all') {
      showNotification(`Showing ${catId} knowledge base entries.`, 'info');
    }
  };

  const handleFaqToggle = (faqId) => {
    AutoNovaAudio.playClick();
    setOpenFaqId(prev => prev === faqId ? null : faqId);
  };

  const handleFeedback = (type) => {
    AutoNovaAudio.playSuccess();
    setFeedbackRegistered(true);
    setFeedbackValue(type);
    showNotification("Feedback recorded. Thank you for refining our knowledge bases.", "success");
  };

  // Chat Assistant functions
  const handleOpenChat = () => {
    AutoNovaAudio.playSuccess();
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    AutoNovaAudio.playClick();
    setIsChatOpen(false);
  };

  const executeAgentResponse = (userQueryText) => {
    setIsAgentTyping(true);
    
    // Attempt to match keywords or use default fallback response
    setTimeout(() => {
      let matchedResponse = "Your query has been logged by our support systems. Our live customer compliance pod is assessing the request and will respond shortly on your secure messenger portal.";
      
      const lowerQuery = userQueryText.toLowerCase();
      if (lowerQuery.includes('escrow') || lowerQuery.includes('pay') || lowerQuery.includes('money')) {
        matchedResponse = "Capital is secured via the AutoNova Encrow system. Sellers only receive payouts once vehicle delivery and compliance inspection (72-hour window) have cleared successfully without discrepancy logs.";
      } else if (lowerQuery.includes('valuation') || lowerQuery.includes('accuracy') || lowerQuery.includes('price')) {
        matchedResponse = "NovaCore™ AI leverages dynamic market indices and raw physical telemetry metrics. This eliminates traditional sales bias, resulting in accurate, real-time pricing grids updated in sub-second intervals.";
      } else if (lowerQuery.includes('delivery') || lowerQuery.includes('ship') || lowerQuery.includes('logistics')) {
        matchedResponse = "Vehicle transit is fully integrated. Cars are packed into sealed freight containers, protected from environmental exposure, and tracked in real-time via satellite tracking modules.";
      } else if (lowerQuery.includes('tax') || lowerQuery.includes('finance') || lowerQuery.includes('credit')) {
        matchedResponse = "AutoNova applies relevant green energy credits directly to your principal financing matrices on-the-fly, reducing monthly amortization balances without tedious external filings.";
      }

      setChatMessages(prev => [
        ...prev,
        { sender: 'agent', text: matchedResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      setIsAgentTyping(false);
      AutoNovaAudio.playSuccess();
    }, 1500);
  };

  const handleSendCustomMessage = (e) => {
    e.preventDefault();
    if (!customChatMessage.trim()) return;

    AutoNovaAudio.playClick();
    const userText = customChatMessage;
    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: userText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setCustomChatMessage('');
    executeAgentResponse(userText);
  };

  const handleQuickReply = (quickObj) => {
    AutoNovaAudio.playClick();
    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: quickObj.q, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);

    setIsAgentTyping(true);
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'agent', text: quickObj.r, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      setIsAgentTyping(false);
      AutoNovaAudio.playSuccess();
    }, 1200);
  };

  return (
    <div className="w-full bg-[#fdf8f8] min-h-screen pb-16 font-sans text-zinc-900 overflow-x-hidden">
      
      {/* 1. HERO SEARCH HEADER */}
      <section className="relative pt-12 pb-16 px-6 text-center border-b border-zinc-200/40 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-teal-300/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-300/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-3xl mx-auto space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/40 text-teal-950 font-mono text-[8.5px] uppercase font-black tracking-widest"
          >
            <Sparkles className="h-3 w-3 text-teal-600 animate-pulse" />
            <span>AutoNova Support Uplink</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl md:text-4xl font-extrabold text-teal-950 tracking-tight"
          >
            How can we assist your journey?
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs md:text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed font-medium"
          >
            Query our real-time indexed knowledge bases for instant specifications regarding transactions, escrow payments, logistics schedules, and AI pricing matrix guidelines.
          </motion.p>

          {/* Interactive Search Console */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-zinc-200/80 p-2 shadow-sm flex items-center max-w-xl mx-auto hover:border-teal-700 hover:shadow transition-all group"
          >
            <Search className="h-5 w-5 text-zinc-400 pl-2 pointer-events-none group-focus-within:text-teal-700" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specifications, guidelines, policies..."
              className="w-full bg-transparent border-0 ring-0 outline-none focus:ring-0 text-xs text-zinc-800 placeholder-zinc-400 font-medium px-3 py-2"
            />
            {searchQuery && (
              <button 
                onClick={() => { AutoNovaAudio.playClick(); setSearchQuery(''); }}
                className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 mr-1 transition-all"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <button 
              onClick={() => {
                AutoNovaAudio.playSuccess();
                if (searchQuery.trim()) {
                  showNotification(`Searching matrices for "${searchQuery}"`, 'success');
                }
              }}
              className="bg-teal-950 hover:bg-teal-900 text-white font-mono text-[9px] font-bold tracking-widest uppercase px-5 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              QUERY
            </button>
          </motion.div>
        </div>
      </section>


      {/* Tab switcher: FAQ vs Contact — previously these were two separate routes
          rendering identical content since initialTab was ignored. */}
      <div className="flex justify-center px-6 -mt-2 mb-2">
        <div className="inline-flex bg-white border border-zinc-200/70 rounded-full p-1 shadow-sm">
          {[
            { id: 'faq', label: 'Help Center' },
            { id: 'contact', label: 'Contact Us' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { AutoNovaAudio.playClick(); setActiveView(tab.id); }}
              className={`px-5 py-2 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-widest transition-all cursor-pointer ${
                activeView === tab.id ? 'bg-teal-950 text-white' : 'text-zinc-500 hover:text-teal-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeView === 'contact' && (
        <section className="py-12 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="ai-sparkle-glow rounded-3xl">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200/60 shadow-sm">
              {contactSent ? (
                <div className="text-center py-8 space-y-3">
                  <Check className="h-10 w-10 text-emerald-500 mx-auto" />
                  <h3 className="font-display font-black text-teal-950">Message sent!</h3>
                  <p className="text-xs text-zinc-500">We'll get back to you within one business day.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    AutoNovaAudio.playSuccess();
                    setContactSent(true);
                    showNotification("Your message has been sent.", "success");
                  }}
                  className="space-y-4"
                >
                  <h3 className="font-display font-black text-lg text-teal-950">Send us a message</h3>
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                  >
                    {['General Question', 'Buying', 'Selling', 'Billing', 'Technical Issue'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help?"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-teal-950 hover:bg-teal-900 text-white font-mono text-[10px] font-extrabold uppercase tracking-widest rounded-xl cursor-pointer transition-all"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <a href="tel:+18005550142" className="bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm flex items-center gap-3 hover:border-teal-700 transition-all cursor-pointer">
              <div className="p-2.5 bg-teal-50 rounded-xl text-teal-700"><Phone className="h-4 w-4" /></div>
              <div>
                <p className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Phone</p>
                <p className="text-xs font-bold text-teal-950">+1 (800) 555-0142</p>
              </div>
            </a>
            <a href="mailto:support@autonova.com" className="bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm flex items-center gap-3 hover:border-teal-700 transition-all cursor-pointer">
              <div className="p-2.5 bg-teal-50 rounded-xl text-teal-700"><Mail className="h-4 w-4" /></div>
              <div>
                <p className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Email</p>
                <p className="text-xs font-bold text-teal-950">support@autonova.com</p>
              </div>
            </a>
            <button
              onClick={() => { AutoNovaAudio.playClick(); setIsChatOpen(true); }}
              className="w-full bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm flex items-center gap-3 hover:border-teal-700 transition-all cursor-pointer text-left"
            >
              <div className="p-2.5 bg-teal-50 rounded-xl text-teal-700"><MessageCircle className="h-4 w-4" /></div>
              <div>
                <p className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Live Chat</p>
                <p className="text-xs font-bold text-teal-950">Start Live Chat →</p>
              </div>
            </button>

            {/* Quick links to FAQ topics — previously missing entirely */}
            <div className="bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm">
              <p className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-3">Popular Topics</p>
              <div className="flex flex-wrap gap-2">
                {['Buying', 'Selling', 'Financing', 'Payments', 'Delivery'].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => { AutoNovaAudio.playClick(); setActiveView('faq'); setSelectedCategory(topic.toLowerCase()); }}
                    className="px-3 py-1.5 bg-zinc-50 hover:bg-teal-50 border border-zinc-200 hover:border-teal-200 rounded-lg text-[10px] font-bold text-zinc-600 hover:text-teal-800 transition-all cursor-pointer"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeView === 'faq' && (
      <>
      {/* 2. TOPIC BROWSER GRID */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <h2 className="font-mono text-[9px] font-bold text-teal-900 tracking-widest uppercase">
            Browse by Topic Domain
          </h2>
          <p className="text-xs text-zinc-400 font-medium">Filter FAQ databases according to system modules</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[96px] group ${
                  isActive 
                    ? 'bg-teal-950 border-teal-950 text-white shadow-md scale-102' 
                    : 'bg-white border-zinc-200/60 hover:border-teal-700 text-zinc-700 hover:text-teal-950 hover:scale-[1.01]'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  isActive 
                    ? 'bg-teal-900 text-teal-300' 
                    : 'bg-teal-50 text-teal-800 group-hover:bg-teal-950 group-hover:text-teal-300'
                }`}>
                  {React.createElement(cat.icon, { className: 'h-4 w-4' })}
                </div>
                <span className="font-display text-[10.5px] font-bold tracking-tight uppercase block pt-2">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. MAIN FAQ LAYOUT ACCORDION & SIDEBAR BENTO */}
      <section className="py-8 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: FAQ List Accordions (8 cols) */}
        <div className="col-span-1 lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <h3 className="font-display text-sm md:text-base font-extrabold text-teal-950">
              Frequently Asked Questions 
              {selectedCategory !== 'all' && (
                <span className="text-xs text-teal-700 font-medium font-sans normal-case pl-1.5 capitalize">
                  ({selectedCategory})
                </span>
              )}
            </h3>
            <span className="font-mono text-[9px] font-bold text-zinc-400">
              {filteredFaqs.length} SYSTEM ENTRIES
            </span>
          </div>

          {filteredFaqs.length > 0 ? (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div 
                    key={faq.id}
                    className="bg-white border border-zinc-200/50 hover:border-zinc-300 rounded-2xl overflow-hidden transition-all shadow-sm"
                  >
                    <button
                      onClick={() => handleFaqToggle(faq.id)}
                      className="w-full px-5 py-4 text-left flex justify-between items-center cursor-pointer hover:bg-zinc-50/50 transition-colors"
                    >
                      <span className="font-display text-xs md:text-sm font-bold text-teal-950 pr-4">
                        {faq.question}
                      </span>
                      <span className={`p-1 rounded-lg bg-zinc-50 text-zinc-400 transition-all ${isOpen ? 'rotate-180 bg-teal-50 text-teal-700' : ''}`}>
                        {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-1 border-t border-zinc-100/60 text-xs md:text-sm text-zinc-500 font-medium leading-relaxed space-y-3 bg-zinc-50/30">
                            <p>{faq.answer}</p>
                            <div className="flex items-center justify-between pt-3 border-t border-zinc-100/60 font-mono text-[8px] font-bold text-zinc-400">
                              <span className="uppercase">MODULE AREA: {faq.category}</span>
                              <span className="text-teal-700">STATUS: VERIFIED SECURE</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-zinc-300 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h4 className="font-display text-sm font-bold text-teal-950">No matching search matrices found</h4>
              <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-medium">
                We couldn't index any FAQ entries matching your query. Try searching simpler keywords like "escrow", "delivery", "tax", or "listing".
              </p>
              <button
                onClick={() => { AutoNovaAudio.playClick(); setSearchQuery(''); setSelectedCategory('all'); }}
                className="font-mono text-[9px] font-bold tracking-widest uppercase text-teal-700 hover:underline cursor-pointer"
              >
                RESET FILTERS
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sidebar Widgets (4 cols) */}
        <aside className="col-span-1 lg:col-span-4 space-y-6">
          
          {/* Popular Insight Articles */}
          <div className="bg-white border border-zinc-200/50 rounded-3xl p-6 shadow-sm space-y-4">
            <h4 className="font-mono text-[9px] font-bold text-teal-900 uppercase tracking-widest border-b border-zinc-100 pb-2">
              Popular Insights
            </h4>
            <div className="flex flex-col gap-2">
              {POPULAR_ARTICLES.map((art) => (
                <button
                  key={art.id}
                  onClick={() => {
                    AutoNovaAudio.playClick();
                    onNavigateToView(art.url);
                    showNotification(`Routing to dynamic resource: ${art.title}`, "success");
                  }}
                  className="w-full p-3 rounded-xl text-left border border-zinc-100/80 hover:border-teal-700 hover:bg-teal-50 transition-all cursor-pointer flex items-center justify-between text-xs font-bold text-zinc-700 hover:text-teal-950 group"
                >
                  <span className="flex items-center gap-2 pr-2">
                    <FileText className="h-3.5 w-3.5 text-zinc-400 group-hover:text-teal-700" />
                    {art.title}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-zinc-300 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chat with Support Card */}
          <div className="bg-gradient-to-br from-teal-950 to-zinc-950 text-white rounded-3xl p-6 border border-teal-900/50 relative overflow-hidden shadow-md group">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-colors" />
            
            <div className="relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-teal-900/80 text-teal-300 flex items-center justify-center shadow-lg border border-teal-800">
                <MessageSquare className="h-4 w-4" />
              </div>
              
              <div className="space-y-1">
                <h4 className="font-display text-sm font-bold text-white">Still need support?</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                  Our live support agents and diagnostic pods are synchronized 24/7 to resolve complex physical and legal vehicle queries.
                </p>
              </div>

              <button
                onClick={handleOpenChat}
                className="w-full bg-teal-500 hover:bg-teal-400 text-teal-950 font-mono text-[9px] font-black tracking-widest uppercase py-3 rounded-xl transition-all shadow-md cursor-pointer"
              >
                CHAT WITH SUPPORT
              </button>
            </div>
          </div>

          {/* Helpful Feedback Widget */}
          <div className="bg-white border border-zinc-200/50 rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
              WAS THIS PAGE HELPFUL?
            </span>
            
            <AnimatePresence mode="wait">
              {!feedbackRegistered ? (
                <motion.div 
                  key="feedback-btns"
                  exit={{ opacity: 0, x: -10 }}
                  className="flex gap-2"
                >
                  <button 
                    onClick={() => handleFeedback('positive')}
                    className="p-1.5 rounded-full border border-zinc-200 hover:border-teal-700 hover:bg-teal-50 text-zinc-400 hover:text-teal-800 transition-all cursor-pointer"
                    title="Helpful"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    onClick={() => handleFeedback('negative')}
                    className="p-1.5 rounded-full border border-zinc-200 hover:border-red-700 hover:bg-red-50 text-zinc-400 hover:text-red-800 transition-all cursor-pointer"
                    title="Not Helpful"
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="feedback-thanks"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[9.5px] font-mono text-teal-800 font-bold flex items-center gap-1 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/30"
                >
                  <Check className="h-3 w-3" />
                  FEEDBACK RECEIVED!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </aside>
      </section>

      </>
      )}

      {/* 4. FOOTER PROMO CALL-TO-ACTION */}
      <section className="pt-12 px-6 max-w-7xl mx-auto">
        <div className="relative h-72 rounded-[32px] overflow-hidden flex items-center justify-center text-center p-6 border border-zinc-200/40">
          <div className="absolute inset-0 z-0">
            <img 
              alt="A clean, futuristic showroom featuring high-end electric vehicles and glossy surfaces." 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02] filter brightness-[0.70] contrast-[1.05]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUfL_Lt07Ne9-SfqpE4N2-bOjO0S85Yk5-JSBmYElTY3d8GpGJw0M50-0IqIf9eTxa2zrSkBI3qYfCW6OBVsGGDN0At4eZxS7M-9wMOoOTw3HHyzODOHiFRmdl0CSXr40DCuopEagUt1vnZcKUqeM7tlR3lQ6pAkFirXYWAJwQACzstBa40H06rhzLkqPwYSAY2zb4vRtOKin820FCfq0Iri1zCDKAv5Xa2-0MNLFmTR9KYeMi6UDuWElsfYraNso9lt9ELuRnIfAV"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 text-white max-w-xl space-y-4">
            <h2 className="font-display text-lg md:text-2xl font-extrabold">
              Experience Kinetic Intelligence
            </h2>
            <p className="text-zinc-200 text-xs md:text-sm font-medium leading-relaxed opacity-90 max-w-md mx-auto">
              Join over 50,000 drivers utilizing synchronized international ledger validation to transact with total structural certainty.
            </p>
            <button
              onClick={() => {
                AutoNovaAudio.playSuccess();
                onNavigateToView('dashboard');
                showNotification("Opening marketplace catalog listings...", "success");
              }}
              className="bg-teal-500 hover:bg-teal-400 text-teal-950 font-mono text-[9px] font-black tracking-widest uppercase px-6 py-3 rounded-full transition-all shadow-md cursor-pointer"
            >
              GET STARTED TODAY
            </button>
          </div>
        </div>
      </section>

      {/* 5. CHAT WITH SUPPORT INTERACTIVE MODAL DIALOG */}
      <AnimatePresence>
        {isChatOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-zinc-200 rounded-[24px] w-full max-w-md overflow-hidden shadow-2xl relative flex flex-col h-[520px]"
            >
              {/* Header */}
              <div className="px-5 py-4 flex justify-between items-center border-b border-zinc-100 bg-teal-950 text-white">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <span className="p-1.5 bg-teal-900 text-teal-300 rounded-lg border border-teal-800 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4" />
                    </span>
                    <span className="absolute bottom-0 right-0 h-2 w-2 bg-green-400 rounded-full border border-teal-950 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-display text-xs font-extrabold text-white">Support Ledger Pod</h3>
                    <p className="font-mono text-[7px] text-teal-400 font-bold uppercase tracking-widest">
                      UPLINK STATE: ACTIVE
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseChat}
                  className="p-1 rounded-full bg-teal-900 hover:bg-teal-850 text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Chat messages viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50 flex flex-col">
                {chatMessages.map((msg, idx) => {
                  const isAgent = msg.sender === 'agent';
                  return (
                    <div 
                      key={idx}
                      className={`flex flex-col max-w-[85%] ${isAgent ? 'self-start items-start' : 'self-end items-end'}`}
                    >
                      <div className={`p-3 rounded-2xl text-[11.5px] leading-relaxed font-medium shadow-sm ${
                        isAgent 
                          ? 'bg-white text-zinc-800 rounded-tl-none border border-zinc-100' 
                          : 'bg-teal-950 text-white rounded-tr-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[7.5px] font-mono text-zinc-400 font-bold pt-1 uppercase">
                        {isAgent ? 'AUTO-AGENT' : userName || 'MEMBER'} • {msg.time}
                      </span>
                    </div>
                  );
                })}

                {/* Agent Typing Animation */}
                {isAgentTyping && (
                  <div className="self-start items-start flex flex-col max-w-[85%]">
                    <div className="p-3 rounded-2xl text-[11.5px] bg-white text-zinc-800 rounded-tl-none border border-zinc-100 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce" />
                      <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                    <span className="text-[7.5px] font-mono text-zinc-400 font-bold pt-1 uppercase">
                      SYSTEM COMPILING ANSWER...
                    </span>
                  </div>
                )}
              </div>

              {/* Quick Reply Chips wrapper */}
              <div className="p-3 bg-white border-t border-zinc-100/60 overflow-x-auto flex gap-2 scrollbar-none whitespace-nowrap">
                {CHAT_QUICK_REPLIES.map((rep, rIdx) => (
                  <button
                    key={rIdx}
                    onClick={() => handleQuickReply(rep)}
                    className="px-3 py-1.5 bg-teal-50 border border-teal-200/55 hover:bg-teal-100 rounded-full font-sans text-[10px] font-bold text-teal-900 transition-all cursor-pointer flex-shrink-0 inline-block"
                  >
                    {rep.q}
                  </button>
                ))}
              </div>

              {/* Chat Input form */}
              <form 
                onSubmit={handleSendCustomMessage}
                className="p-3 bg-white border-t border-zinc-100/80 flex gap-2 items-center"
              >
                <input
                  type="text"
                  value={customChatMessage}
                  onChange={(e) => setCustomChatMessage(e.target.value)}
                  placeholder="Ask our support matrix a question..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-800 placeholder-zinc-400 outline-none ring-0 focus:ring-1 focus:ring-teal-700 focus:border-teal-700 font-medium"
                />
                <button
                  type="submit"
                  disabled={!customChatMessage.trim()}
                  className="p-2 bg-teal-950 text-white rounded-xl hover:bg-teal-900 active:scale-95 transition-all cursor-pointer disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
