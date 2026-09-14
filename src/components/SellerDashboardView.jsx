import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { CountUp } from './CountUp';
import { 
  Plus, Eye, MessageSquare, TrendingUp, DollarSign, Sparkles, Check, X, 
  Trash2, Sliders, ArrowUpRight, HelpCircle, AlertCircle, ShoppingBag, 
  Calendar, Layers, Clock, Settings, UserCheck, Star, Pencil
} from 'lucide-react';

export const SellerDashboardView = ({
  userName = "Alexander Sterling",
  role = "Seller",
  onNavigateToView,
  showNotification,
  listings = [],
  onDeleteListing,
  onAcceptOffer,
  onDeactivateListing,
  isLandingMode = false,
  analyticsListingId = null,
  onStartSelling,
  onGoToValuation
}) => {
  // Chart Hover state
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Inquiries Mock Data with interactive states
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      buyerName: "Tariq Al-Mansoor",
      vehicle: "Rimac Nevera (2025)",
      type: "Price Proposal",
      message: "Direct offer: $138,000,000 (equivalent NGN currency). Secure CBN escrow node preferred. Can finalize title clearance this Saturday.",
      offerAmount: 138000000,
      status: "Pending", // Pending | Accepted | Declined
      time: "2 hours ago"
    },
    {
      id: 2,
      buyerName: "Chinedu Okafor",
      vehicle: "Lucid Air Sapphire (2025)",
      type: "Specification Inquiry",
      message: "Is the Glass Canopy panoramic pack included in this trim level? I would like to verify before placing a formal deposit on the ledger.",
      offerAmount: null,
      status: "Pending",
      time: "5 hours ago"
    },
    {
      id: 3,
      buyerName: "Julian Chen",
      vehicle: "Lotus Eletre R (2025)",
      type: "Price Proposal",
      message: "Consignment offer: $115,000 with swift escrow deposit. Can we coordinate direct delivery to my Abuja node?",
      offerAmount: 115000,
      status: "Pending",
      time: "1 day ago"
    }
  ]);

  // Aggregate Metrics
  const activeListingsCount = listings.length;
  const totalViews = listings.reduce((sum, item) => sum + (item.views || 0), 0) + 1482;
  const totalInquiries = listings.reduce((sum, item) => sum + (item.inquiries || 0), 0) + 18;
  const realizedEarnings = listings.filter(item => item.status === 'Sold').reduce((sum, item) => sum + (item.price || 0), 0) + 438000;

  // Views vs Inquiries Chart mock coordinates (Jan to Jun)
  const chartData = [
    { month: "Jan", views: 240, inquiries: 12 },
    { month: "Feb", views: 480, inquiries: 24 },
    { month: "Mar", views: 360, inquiries: 18 },
    { month: "Apr", views: 680, inquiries: 42 },
    { month: "May", views: 820, inquiries: 56 },
    { month: "Jun", views: 1120, inquiries: 78 }
  ];

  // Accept offer helper
  const handleOfferAction = (id, action) => {
    AutoNovaAudio.playSuccess();
    setInquiries(inquiries.map(inq => {
      if (inq.id === id) {
        return { ...inq, status: action };
      }
      return inq;
    }));
    
    if (action === 'Accepted') {
      showNotification(`Offer successfully accepted! Escrow legal draft dispatched to CBR nodes.`, "success");
      const acceptedInquiry = inquiries.find(inq => inq.id === id);
      if (onAcceptOffer) onAcceptOffer(id, acceptedInquiry?.vehicle);
    } else {
      showNotification(`Offer declined successfully.`, "info");
    }
  };

  // --- LANDING MODE: /sell — this view genuinely didn't exist before; the route
  // previously silently fell through to the Seller Dashboard below regardless. ---
  if (isLandingMode) {
    const sellSteps = [
      { icon: <Sliders className="h-5 w-5" />, title: 'Value It', desc: 'Answer a few quick questions and our AI gives you an instant, honest price estimate.' },
      { icon: <Layers className="h-5 w-5" />, title: 'List It', desc: 'Publish in minutes with AI-guided photo tips and a suggested price range.' },
      { icon: <ShoppingBag className="h-5 w-5" />, title: 'Get Paid Safely', desc: 'Sell to verified buyers with secure escrow payment — no haggling required.' },
    ];
    const sellFaqs = [
      { q: 'How accurate is the AI price estimate?', a: 'Our valuation model compares your car against thousands of recent local and regional sales, typically landing within 5% of final sale price.' },
      { q: 'How long does it take to sell?', a: 'Most well-priced listings receive their first serious inquiry within 48 hours, and typically sell within 2-3 weeks.' },
      { q: 'Is payment really secure?', a: 'Yes — funds are held in escrow until the buyer confirms the vehicle matches the listing, then released directly to you.' },
    ];

    return (
      <div className="flex-grow bg-[#fdf8f8] min-h-[calc(100vh-80px)] pb-24">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 to-transparent">
          <div className="max-w-5xl mx-auto px-4 md:px-8 pt-16 pb-14 text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 bg-white border border-teal-100 text-teal-800 px-3 py-1.5 rounded-full text-[9px] font-mono font-extrabold uppercase tracking-widest shadow-sm">
              <Sparkles className="h-3 w-3" />
              AI-Powered Pricing
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-black text-teal-950 tracking-tight leading-tight">
              Sell Your Car in Minutes<br className="hidden md:block" /> — Priced by AI
            </h1>
            <p className="text-sm text-zinc-500 max-w-xl mx-auto font-medium leading-relaxed">
              No haggling, no guesswork. Get an instant AI-backed valuation, publish your listing in minutes, and get paid safely through secure escrow.
            </p>

            <div className="ai-sparkle-glow rounded-2xl max-w-md mx-auto mt-4">
              <div className="bg-white border border-zinc-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3 shadow-md">
                <input
                  type="text"
                  placeholder="Year, Make & Model (e.g. 2023 Lucid Air)"
                  className="flex-grow w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                />
                <button
                  onClick={() => { AutoNovaAudio.playSuccess(); if (onGoToValuation) onGoToValuation(); }}
                  className="w-full sm:w-auto px-5 py-3 bg-teal-950 hover:bg-teal-900 text-white font-mono text-[10px] font-extrabold uppercase tracking-widest rounded-xl cursor-pointer transition-all whitespace-nowrap"
                >
                  Get My Price
                </button>
              </div>
            </div>

            <button
              onClick={() => { AutoNovaAudio.playClick(); if (onStartSelling) onStartSelling(); }}
              className="inline-flex items-center gap-2 mt-2 px-6 py-3 bg-white border border-zinc-200 hover:border-teal-700 text-teal-950 font-mono text-[10px] font-extrabold uppercase tracking-widest rounded-xl cursor-pointer transition-all shadow-sm"
            >
              <span>Get Started</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>

        {/* 3-step process */}
        <section className="max-w-5xl mx-auto px-4 md:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {sellSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-zinc-200/60 shadow-sm text-center space-y-3"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-teal-400 text-white flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="font-display font-black text-sm text-teal-950">{idx + 1}. {step.title}</h3>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trust badges */}
        <section className="max-w-5xl mx-auto px-4 md:px-8 pb-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <UserCheck className="h-4 w-4" />, label: 'Secure Escrow Payment' },
              { icon: <Check className="h-4 w-4" />, label: 'Verified Buyers Only' },
              { icon: <X className="h-4 w-4" />, label: 'No Haggling' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-zinc-200/50 shadow-sm">
                <div className="p-2 bg-teal-50 rounded-xl text-teal-700">{badge.icon}</div>
                <span className="text-xs font-bold text-teal-950">{badge.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials — previously missing entirely */}
        <section className="max-w-5xl mx-auto px-4 md:px-8 pb-14">
          <h3 className="font-display font-black text-lg text-teal-950 text-center mb-6">Sellers Love AutoNova</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'Priya N.', car: 'Sold a Tesla Model S Plaid', quote: 'Had a firm offer within 3 days. The AI price estimate was almost exactly what I sold for.' },
              { name: 'Marcus T.', car: 'Sold a Porsche Taycan', quote: 'Escrow payment made the whole thing feel safe. No back-and-forth haggling at all.' },
              { name: 'Alina R.', car: 'Sold a Rivian R1S', quote: 'Listing took maybe ten minutes. The photo tips genuinely helped it look more professional.' },
            ].map((t) => (
              <div key={t.name} className="bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm space-y-3">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className="h-3.5 w-3.5 text-amber-500 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-zinc-600 font-medium leading-relaxed">"{t.quote}"</p>
                <div>
                  <p className="text-xs font-bold text-teal-950">{t.name}</p>
                  <p className="text-[10px] text-zinc-400 font-medium">{t.car}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 md:px-8 pb-20">
          <h3 className="font-display font-black text-lg text-teal-950 text-center mb-6">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {sellFaqs.map((faq) => (
              <details key={faq.q} className="bg-white border border-zinc-200/60 rounded-2xl p-4 group">
                <summary className="text-xs font-bold text-teal-950 cursor-pointer flex items-center justify-between">
                  {faq.q}
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 group-open:rotate-45 transition-transform" />
                </summary>
                <p className="text-xs text-zinc-500 font-medium mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // --- ANALYTICS MODE: /seller/listings/:listingId/analytics — this also never
  // existed before; the route silently fell through to the full dashboard below. ---
  if (analyticsListingId) {
    const listing = listings.find(l => l.id === analyticsListingId) || listings[0] || {
      id: analyticsListingId, name: 'Your Listing', price: 0, views: 1240, inquiries: 32, image: ''
    };
    const priceDelta = 8;

    return (
      <div className="flex-grow bg-[#fdf8f8] min-h-[calc(100vh-80px)] pb-24">
        <div className="border-b border-zinc-200/60 bg-white py-5 px-4 md:px-8">
          <div className="max-w-6xl mx-auto flex items-center gap-3">
            {listing.image && (
              <img src={listing.image} alt={listing.name} referrerPolicy="no-referrer" className="w-12 h-9 rounded-lg object-cover border border-zinc-200" />
            )}
            <div>
              <span className="font-mono text-[8px] tracking-widest text-teal-700 font-extrabold uppercase block">LISTING ANALYTICS</span>
              <h1 className="font-display text-lg md:text-xl font-extrabold text-teal-950 tracking-tight leading-none mt-0.5">{listing.name}</h1>
            </div>
            <button
              onClick={() => {
                AutoNovaAudio.playClick();
                const reportLines = [
                  `AUTONOVA — LISTING ANALYTICS REPORT`,
                  `====================================`,
                  `Listing: ${listing.name}`,
                  `Generated: ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`,
                  ``,
                  `Views: ${listing.views || 1240}`,
                  `Unique Visitors: ${Math.round((listing.views || 1240) * 0.7)}`,
                  `Wishlist Saves: ${Math.round((listing.views || 1240) * 0.12)}`,
                  `Inquiries: ${listing.inquiries || 32}`,
                  ``,
                  `Monthly Views Trend:`,
                  ...chartData.map(d => `  ${d.month}: ${d.views} views, ${d.inquiries} inquiries`),
                ].join('\n');
                const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(reportLines);
                const anchor = document.createElement('a');
                anchor.setAttribute("href", dataStr);
                anchor.setAttribute("download", `AutoNova_Analytics_${listing.id || 'listing'}.txt`);
                document.body.appendChild(anchor);
                anchor.click();
                anchor.remove();
                showNotification("Report downloaded.", "success");
              }}
              className="ml-auto px-4 py-2.5 border border-zinc-200 hover:border-teal-700 text-teal-950 font-mono text-[9px] font-extrabold uppercase tracking-widest rounded-xl cursor-pointer"
            >
              Export Report
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8 space-y-8">
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Views', value: listing.views || 1240, icon: <Eye className="h-4.5 w-4.5" /> },
              { label: 'Unique Visitors', value: Math.round((listing.views || 1240) * 0.7), icon: <UserCheck className="h-4.5 w-4.5" /> },
              { label: 'Wishlist Saves', value: Math.round((listing.views || 1240) * 0.12), icon: <ShoppingBag className="h-4.5 w-4.5" /> },
              { label: 'Inquiry Rate', value: listing.inquiries || 32, icon: <MessageSquare className="h-4.5 w-4.5" /> },
            ].map((m) => (
              <div key={m.label} className="bg-white p-5 rounded-3xl border border-zinc-200/50 shadow-sm">
                <div className="p-2.5 bg-teal-50 rounded-xl text-teal-800 w-fit mb-4">{m.icon}</div>
                <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">{m.label}</p>
                <h3 className="font-display font-black text-xl md:text-2xl text-teal-950 mt-1"><CountUp value={m.value} /></h3>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-zinc-200/60 shadow-sm">
              <h3 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider mb-4">Views Over Time</h3>
              <div className="h-48 flex items-end gap-2">
                {chartData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.views / 1200) * 100}%` }}
                      transition={{ duration: 0.6 }}
                      className="w-full bg-gradient-to-t from-teal-700 to-teal-300 rounded-t-lg min-h-[4px]"
                    />
                    <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="ai-sparkle-glow rounded-3xl">
                <div className="bg-white p-6 rounded-3xl border border-zinc-200/60">
                  <h3 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    AI Pricing Insight
                  </h3>
                  <p className="text-xs text-zinc-600 font-medium leading-relaxed mb-3">
                    Your price is <strong className="text-teal-950">{priceDelta}% above</strong> similar listings — consider adjusting to increase inquiries.
                  </p>
                  <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden mb-3">
                    <div className="h-full w-[58%] bg-gradient-to-r from-purple-500 to-teal-400 rounded-full" />
                  </div>
                  <button
                    onClick={() => { AutoNovaAudio.playClick(); if (onNavigateToView) onNavigateToView('create-listing'); }}
                    className="w-full py-2.5 bg-teal-950 hover:bg-teal-900 text-white font-mono text-[9px] font-extrabold uppercase tracking-widest rounded-xl cursor-pointer"
                  >
                    Adjust Price
                  </button>
                </div>
              </div>

              {/* Location breakdown — previously missing entirely */}
              <div className="bg-white p-6 rounded-3xl border border-zinc-200/60 shadow-sm">
                <h3 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider mb-4">Interested Buyers By Location</h3>
                <div className="space-y-3">
                  {[
                    { city: 'Los Angeles, CA', pct: 38 },
                    { city: 'San Francisco, CA', pct: 24 },
                    { city: 'San Diego, CA', pct: 16 },
                    { city: 'Phoenix, AZ', pct: 12 },
                    { city: 'Other', pct: 10 },
                  ].map((loc) => (
                    <div key={loc.city} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wide">
                        <span>{loc.city}</span>
                        <span className="text-teal-800">{loc.pct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${loc.pct}%` }}
                          transition={{ duration: 0.6 }}
                          className="h-full bg-gradient-to-r from-purple-400 to-teal-400 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-[#fdf8f8] min-h-[calc(100vh-80px)] pb-32">
      {/* Header upper banner */}
      <div className="border-b border-zinc-200/60 bg-white py-5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="font-mono text-[8px] tracking-widest text-teal-700 font-extrabold uppercase block">
              LIQUIDATOR PORTAL // ASSET APPRAISALS
            </span>
            <h1 className="font-display text-xl md:text-2xl font-extrabold text-teal-950 tracking-tight leading-none mt-1">
              Seller Dashboard
            </h1>
          </div>

          <button
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('create-listing'); }}
            className="px-5 py-3 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[9px] tracking-widest font-extrabold uppercase rounded-full shadow-sm cursor-pointer transition-all flex items-center gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Create New Listing</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 space-y-8">
        
        {/* Core Metric Cards Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Metric 1 */}
          <div className="bg-white p-5 rounded-3xl border border-zinc-200/50 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-teal-50 rounded-xl text-teal-800">
                <Layers className="h-4.5 w-4.5" />
              </div>
              <span className="text-[7px] font-mono font-bold bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded-full uppercase tracking-wider">SYNCED</span>
            </div>
            <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Active Listings</p>
            <h3 className="font-display font-black text-xl md:text-2xl text-teal-950 mt-1">{activeListingsCount}</h3>
          </div>

          {/* Metric 2 */}
          <div className="bg-white p-5 rounded-3xl border border-zinc-200/50 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-teal-50 rounded-xl text-teal-800">
                <Eye className="h-4.5 w-4.5" />
              </div>
              <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-widest">REAL-TIME</span>
            </div>
            <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Listing Views</p>
            <h3 className="font-display font-black text-xl md:text-2xl text-teal-950 mt-1">{totalViews.toLocaleString()}</h3>
          </div>

          {/* Metric 3 */}
          <div className="bg-white p-5 rounded-3xl border border-zinc-200/50 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-teal-50 rounded-xl text-teal-800">
                <MessageSquare className="h-4.5 w-4.5" />
              </div>
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
            </div>
            <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Total Inquiries</p>
            <h3 className="font-display font-black text-xl md:text-2xl text-teal-950 mt-1">{totalInquiries}</h3>
          </div>

          {/* Metric 4 */}
          <div className="bg-white p-5 rounded-3xl border border-zinc-200/50 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-teal-50 rounded-xl text-teal-800">
                <DollarSign className="h-4.5 w-4.5" />
              </div>
              <span className="inline-flex items-center gap-1 text-[7px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                Payouts OK
              </span>
            </div>
            <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Realized Earnings</p>
            <h3 className="font-display font-black text-xl md:text-2xl text-teal-950 mt-1">${realizedEarnings.toLocaleString()}</h3>
          </div>

        </section>

        {/* Double Column Row: Graph & Active Inquiries */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Interactive Views vs Inquiries Chart (SVG) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-zinc-200/60 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-teal-700" />
                  <span>Views vs Inquiries Ledger</span>
                </h3>
                <p className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Appraisal & interest conversion parameters</p>
              </div>

              {/* Legends */}
              <div className="flex gap-4 text-[9px] font-mono font-bold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-teal-700" />
                  <span className="text-zinc-500 uppercase">VIEWS</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-purple-600" />
                  <span className="text-zinc-500 uppercase">INQUIRIES</span>
                </div>
              </div>
            </div>

            {/* Custom High-Fidelity SVG Chart Canvas */}
            <div className="relative h-60 w-full bg-zinc-50 rounded-2xl border border-zinc-100/50 p-4">
              <svg viewBox="0 0 600 220" className="w-full h-full overflow-visible">
                {/* Horizontal grid lines */}
                {[0, 1, 2, 3, 4].map((grid, idx) => {
                  const yVal = 20 + idx * 45;
                  return (
                    <line 
                      key={grid} 
                      x1="40" 
                      y1={yVal} 
                      x2="560" 
                      y2={yVal} 
                      stroke="#e4e4e7" 
                      strokeDasharray="4 4" 
                    />
                  );
                })}

                {/* Draw Views Line Path (Teal) */}
                <path 
                  d="M 50 180 L 150 140 L 250 160 L 350 100 L 450 70 L 550 20" 
                  fill="none" 
                  stroke="#0f766e" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                />

                {/* Draw Inquiries Line Path (Purple) */}
                <path 
                  d="M 50 200 L 150 180 L 250 190 L 350 150 L 450 130 L 550 100" 
                  fill="none" 
                  stroke="#9333ea" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                />

                {/* Draw Interactive Hover points */}
                {chartData.map((data, idx) => {
                  const xCoord = 50 + idx * 100;
                  // Views point
                  const viewsY = 180 - (idx === 0 ? 0 : idx === 1 ? 40 : idx === 2 ? 20 : idx === 3 ? 80 : idx === 4 ? 110 : 160);
                  // Inquiries point
                  const inqY = 200 - (idx === 0 ? 0 : idx === 1 ? 20 : idx === 2 ? 10 : idx === 3 ? 50 : idx === 4 ? 70 : 100);

                  const isHovered = hoveredPoint === idx;

                  return (
                    <g key={idx} className="cursor-pointer">
                      {/* Vertical highlight line on hover */}
                      {isHovered && (
                        <line 
                          x1={xCoord} 
                          y1="10" 
                          x2={xCoord} 
                          y2="210" 
                          stroke="#cbd5e1" 
                          strokeWidth="1.5" 
                        />
                      )}

                      {/* Views Dot */}
                      <circle 
                        cx={xCoord} 
                        cy={viewsY} 
                        r={isHovered ? "7" : "5"} 
                        fill="#0f766e" 
                        stroke="#ffffff" 
                        strokeWidth="2.5" 
                        onMouseEnter={() => { AutoNovaAudio.playHover(); setHoveredPoint(idx); }}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />

                      {/* Inquiries Dot */}
                      <circle 
                        cx={xCoord} 
                        cy={inqY} 
                        r={isHovered ? "7" : "5"} 
                        fill="#9333ea" 
                        stroke="#ffffff" 
                        strokeWidth="2.5" 
                        onMouseEnter={() => { AutoNovaAudio.playHover(); setHoveredPoint(idx); }}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />

                      {/* X Axis Text labels */}
                      <text 
                        x={xCoord} 
                        y="218" 
                        fill="#94a3b8" 
                        fontSize="9" 
                        textAnchor="middle" 
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {data.month.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip Hover Overlay */}
              <AnimatePresence>
                {hoveredPoint !== null && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-4 left-4 bg-white/95 border border-zinc-200/80 p-3 rounded-xl shadow-md text-xxs font-mono font-bold text-zinc-500 space-y-1"
                  >
                    <p className="text-[9px] text-teal-950 uppercase tracking-widest border-b border-zinc-100 pb-1">
                      {chartData[hoveredPoint].month} Performance
                    </p>
                    <p className="text-teal-700 uppercase">VIEWS: {chartData[hoveredPoint].views}</p>
                    <p className="text-purple-600 uppercase">INQUIRIES: {chartData[hoveredPoint].inquiries}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Offers & Inquiries console */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-zinc-200/60 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider mb-5 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-teal-700 animate-pulse" />
                <span>Active Inquiries & Offers</span>
              </h3>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                <AnimatePresence mode="popLayout">
                  {inquiries.map((inq) => (
                    <motion.div
                      key={inq.id}
                      layoutId={`inq-${inq.id}`}
                      className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-xxs space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-display font-black text-teal-950 text-xs">{inq.buyerName}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[7px] font-mono uppercase font-bold ${
                              inq.type === 'Price Proposal' 
                                ? 'bg-amber-50 text-amber-800 border border-amber-100' 
                                : 'bg-blue-50 text-blue-800 border border-blue-100'
                            }`}>
                              {inq.type}
                            </span>
                          </div>
                          <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5">
                            {inq.vehicle} • {inq.time}
                          </p>
                        </div>

                        {/* Status tag */}
                        <span className={`font-mono text-[8px] font-bold uppercase tracking-widest ${
                          inq.status === 'Accepted' 
                            ? 'text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full' 
                            : inq.status === 'Declined' 
                              ? 'text-red-700 bg-red-50 px-2 py-0.5 rounded-full' 
                              : 'text-zinc-400'
                        }`}>
                          {inq.status}
                        </span>
                      </div>

                      <p className="text-zinc-600 font-semibold leading-relaxed">
                        "{inq.message}"
                      </p>

                      {/* Interactive Buttons if Pending */}
                      {inq.status === 'Pending' && (
                        <div className="flex gap-2 pt-1">
                          {inq.offerAmount ? (
                            <>
                              <button
                                onClick={() => handleOfferAction(inq.id, 'Accepted')}
                                className="flex-1 py-2 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[8px] font-extrabold uppercase rounded-lg cursor-pointer transition-colors"
                              >
                                Accept Offer
                              </button>
                              <button
                                onClick={() => handleOfferAction(inq.id, 'Declined')}
                                className="px-3 py-2 border border-zinc-200 hover:bg-zinc-100 text-zinc-500 rounded-lg cursor-pointer"
                              >
                                Decline
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => {
                                AutoNovaAudio.playSuccess();
                                showNotification(`Encrypted secure message dispatched to ${inq.buyerName}.`, "success");
                              }}
                              className="w-full py-2 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[8px] font-extrabold uppercase rounded-lg cursor-pointer transition-colors"
                            >
                              Reply to inquiry
                            </button>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </section>

        {/* Listings Ledger section */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200/60 shadow-sm space-y-6">
          <div>
            <h3 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider">
              Consolidated Listings Ledger
            </h3>
            <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase font-bold mt-0.5">Edit, track, or deactivate published vehicle specifications</p>
          </div>

          {/* List/Table results */}
          {listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {listings.map((car) => (
                <div 
                  key={car.id}
                  className="p-4 bg-zinc-50 border border-zinc-250/50 rounded-2xl flex gap-4 items-center justify-between hover:border-zinc-300 transition-all"
                >
                  <div className="flex gap-4 items-center min-w-0">
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                      <img 
                        src={car.image} 
                        alt={car.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-display font-black text-xs text-teal-950 truncate">{car.name}</h4>
                      <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5">
                        {car.year} • {car.type} • ${car.price.toLocaleString()}
                      </p>
                      
                      {/* Active / Pending Status bubble */}
                      <span className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-[7px] font-mono font-bold uppercase ${
                        car.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-800' 
                          : 'bg-amber-50 text-amber-800'
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${car.status === 'Active' ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`} />
                        <span>{car.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right hand Action buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        AutoNovaAudio.playClick();
                        if (onNavigateToView) onNavigateToView('create-listing');
                      }}
                      className="p-2 border border-zinc-200 hover:bg-teal-50 rounded-xl text-zinc-500 hover:text-teal-700 transition-colors cursor-pointer"
                      title="Edit Listing"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        AutoNovaAudio.playSuccess();
                        if (onDeactivateListing) onDeactivateListing(car.id);
                        showNotification("Listing state toggled.", "info");
                      }}
                      className="p-2 border border-zinc-200 hover:bg-zinc-150 rounded-xl text-zinc-500 hover:text-teal-950 transition-colors cursor-pointer"
                      title="Deactivate Listing"
                    >
                      <Sliders className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        AutoNovaAudio.playSuccess();
                        if (onDeleteListing) onDeleteListing(car.id);
                        showNotification("Listing removed from ledger.", "success");
                      }}
                      className="p-2 border border-zinc-200 hover:bg-red-50 rounded-xl text-zinc-400 hover:text-red-700 transition-colors cursor-pointer"
                      title="Delete Listing"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-zinc-50 rounded-2xl border border-zinc-100/60">
              <AlertCircle className="h-8 w-8 text-zinc-300 mx-auto mb-2" />
              <p className="text-xs text-zinc-500 font-bold">You currently have no custom listings published.</p>
              <button
                onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('create-listing'); }}
                className="mt-3 font-mono text-[9px] font-bold text-teal-700 hover:underline uppercase"
              >
                Create Listing Now
              </button>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};
