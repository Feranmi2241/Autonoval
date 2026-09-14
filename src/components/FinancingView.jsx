import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  Sparkles, DollarSign, Calendar, Percent, Landmark, HelpCircle, 
  TrendingDown, Check, ChevronDown, Award, ArrowUpRight, BadgeAlert
} from 'lucide-react';

export const FinancingView = ({ 
  showNotification,
  selectedCarPrice = 55000,
  selectedCarName = ""
}) => {
  const [searchParams] = useSearchParams();
  const priceFromUrl = parseInt(searchParams.get('price'), 10);
  const nameFromUrl = searchParams.get('name');
  const initialPrice = !isNaN(priceFromUrl) && priceFromUrl > 0 ? priceFromUrl : selectedCarPrice;
  const initialName = nameFromUrl || selectedCarName;

  // Financing Parameters
  const [vehiclePrice, setVehiclePrice] = useState(initialPrice);
  const [downPayment, setDownPayment] = useState(Math.round(initialPrice * 0.2));
  const [tradeIn, setTradeIn] = useState(0);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(5.2);

  // Sync if selectedCarPrice changes
  useEffect(() => {
    if (selectedCarPrice) {
      setVehiclePrice(selectedCarPrice);
      setDownPayment(Math.round(selectedCarPrice * 0.2));
    }
  }, [selectedCarPrice]);

  // Monthly payment calculation
  const P = Math.max(0, vehiclePrice - downPayment - tradeIn);
  const r = (interestRate / 100) / 12;
  const n = loanTerm;

  let monthlyPayment = 0;
  if (P > 0) {
    if (r === 0) {
      monthlyPayment = Math.round(P / n);
    } else {
      monthlyPayment = Math.round(P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    }
  }

  // Pre-qualification State
  const [isQualified, setIsQualified] = useState(false);
  const [submittingPreQual, setSubmittingPreQual] = useState(false);
  const [fullName, setFullName] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');

  const handlePreQualifySubmit = (e) => {
    e.preventDefault();
    if (!fullName || !monthlyIncome) {
      showNotification("Please fill in all credential fields.", "error");
      return;
    }
    AutoNovaAudio.playClick();
    setSubmittingPreQual(true);

    setTimeout(() => {
      setSubmittingPreQual(false);
      setIsQualified(true);
      AutoNovaAudio.playSuccess();
      showNotification("Congratulations! You have been pre-approved for Tier 1 interest rates.", "success");
    }, 1800);
  };

  const handleSelectOffer = (lenderName) => {
    AutoNovaAudio.playClick();
    showNotification(`Selected ${lenderName} offer. Our escrow team will initialize contract generation.`, "success");
  };

  return (
    <div className="flex-grow bg-white min-h-[calc(100vh-80px)] overflow-y-auto pb-24">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Page Title Header */}
        <header className="mb-12 border-b border-zinc-100 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-700 font-mono text-[10px] font-bold uppercase tracking-widest mb-1.5">
              <Sparkles className="h-4 w-4 text-teal-700 animate-pulse" />
              <span>Bespoke Financial Engineering</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-black text-teal-950 tracking-tight">
              Financing Made Kinetic
            </h1>
            <p className="text-xs text-zinc-500 font-medium mt-1">
              Analyze real-time interest parameters, simulate amortizations, and lock down premium lender rates.
            </p>
          </div>

          {selectedCarName && (
            <div className="bg-teal-50 border border-teal-100 rounded-xl px-4.5 py-3">
              <p className="font-mono text-[8px] font-extrabold text-teal-800 uppercase tracking-wider">Actively Simulating</p>
              <p className="text-xs font-bold text-teal-950 mt-0.5">{selectedCarName}</p>
            </div>
          )}
        </header>

        {/* Dynamic Parameter Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Parameter Control Panel (5 Columns) */}
          <div className="lg:col-span-5 bg-zinc-50 border border-zinc-200/60 p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-display font-black text-teal-950 text-base mb-6 flex items-center gap-2">
                <Landmark className="h-5 w-5 text-teal-700" />
                Parameter Selection
              </h3>

              <div className="space-y-6">
                
                {/* Vehicle Price */}
                <div>
                  <label className="font-mono text-[8px] font-black text-zinc-400 mb-2 block uppercase tracking-widest">Vehicle Price (USD)</label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-zinc-400 text-xs font-bold">$</span>
                    </div>
                    <input 
                      type="number"
                      value={vehiclePrice}
                      onChange={(e) => setVehiclePrice(Math.max(0, parseInt(e.target.value) || 0))}
                      className="block w-full pl-9 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-teal-950 focus:ring-teal-700/20 focus:border-teal-700"
                    />
                  </div>
                </div>

                {/* Down Payment & Trade-In Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[8px] font-black text-zinc-400 mb-2 block uppercase tracking-widest">Down Payment</label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <span className="text-zinc-400 text-xs font-bold">$</span>
                      </div>
                      <input 
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Math.max(0, parseInt(e.target.value) || 0))}
                        className="block w-full pl-8 pr-3 py-3 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-teal-950 focus:ring-teal-700/20 focus:border-teal-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[8px] font-black text-zinc-400 mb-2 block uppercase tracking-widest">Trade-In Value</label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <span className="text-zinc-400 text-xs font-bold">$</span>
                      </div>
                      <input 
                        type="number"
                        value={tradeIn}
                        onChange={(e) => setTradeIn(Math.max(0, parseInt(e.target.value) || 0))}
                        className="block w-full pl-8 pr-3 py-3 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-teal-950 focus:ring-teal-700/20 focus:border-teal-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Loan Term Range Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-mono text-[8px] font-black text-zinc-400 uppercase tracking-widest">Loan Term</label>
                    <span className="font-display font-extrabold text-xs text-teal-700">{loanTerm} Months</span>
                  </div>
                  <input 
                    type="range"
                    min="12"
                    max="84"
                    step="12"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                    className="w-full accent-teal-700 cursor-pointer"
                  />
                  <div className="flex justify-between mt-1 text-[8px] font-mono font-bold text-zinc-400">
                    <span>12 MO</span>
                    <span>48 MO</span>
                    <span>84 MO</span>
                  </div>
                </div>

                {/* Interest rate input */}
                <div>
                  <label className="font-mono text-[8px] font-black text-zinc-400 mb-2 block uppercase tracking-widest">Interest Rate (APR %)</label>
                  <div className="relative rounded-xl shadow-sm">
                    <input 
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="block w-full pr-10 pl-4 py-3 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-teal-950 focus:ring-teal-700/20 focus:border-teal-700"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-zinc-400 text-xs font-bold">%</span>
                    </div>
                  </div>
                  <p className="mt-2 text-[9px] font-mono text-zinc-400 uppercase tracking-wide">
                    Real-time AI adjusted: typically 4.9% - 7.5%
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Dynamic Results Display (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Payment Summary Box */}
            <div className="bg-teal-950 text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-sm relative overflow-hidden">
              <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
                <span className="font-mono text-[8px] font-black text-teal-400 uppercase tracking-widest block mb-1">Estimated Monthly Payment</span>
                <div className="flex items-baseline justify-center md:justify-start gap-1">
                  <span className="font-display font-black text-4xl tracking-tight text-white">${monthlyPayment.toLocaleString()}</span>
                  <span className="text-xs text-zinc-400 font-bold uppercase">/mo</span>
                </div>
              </div>

              <div className="relative z-10 w-full md:w-auto">
                <button 
                  onClick={() => { AutoNovaAudio.playClick(); setIsQualified(!isQualified); }}
                  className="w-full md:w-auto px-6 py-3.5 bg-teal-500 hover:bg-teal-400 text-teal-950 font-mono text-[10px] font-black tracking-widest uppercase rounded-xl transition-all cursor-pointer shadow-md hover:scale-[1.01]"
                >
                  {isQualified ? 'Review approved rates' : 'Get Pre-Qualified'}
                </button>
              </div>

              {/* Glowing decorative background aura */}
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Trajectory Amortization visual bars */}
            <div className="border border-zinc-200/60 p-6 rounded-2xl flex-grow bg-white flex flex-col justify-between">
              <div>
                <h3 className="font-display font-black text-teal-950 text-base mb-1">Amortization Trajectory</h3>
                <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest mb-6">Principal vs interest ratio breakdown over timeline</p>
              </div>

              {/* Graphical Repayment bars */}
              <div className="h-44 w-full relative flex items-end justify-between gap-2.5 pb-4 border-b border-zinc-100">
                {Array.from({ length: 6 }).map((_, i) => {
                  const factor = (i + 1) / 6;
                  const principalHeight = Math.round(factor * 100);
                  const interestHeight = Math.max(10, Math.round((1 - factor) * 40));
                  
                  return (
                    <div key={i} className="flex-1 flex flex-col justify-end h-full gap-1 group relative">
                      {/* Hover stats label */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-teal-950 text-white font-mono text-[8px] py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-sm">
                        Yr {i+1}: {Math.round(100 - (i*15))}% Int Remaining
                      </div>

                      {/* Interest bar block */}
                      <div 
                        style={{ height: `${interestHeight}%` }}
                        className="w-full bg-teal-900/15 group-hover:bg-teal-900/25 rounded-sm transition-all duration-300"
                      />
                      {/* Principal bar block */}
                      <div 
                        style={{ height: `${principalHeight}%` }}
                        className="w-full bg-teal-700/60 group-hover:bg-teal-700 rounded-sm transition-all duration-300"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Graphic Legends */}
              <div className="flex justify-between mt-4 font-mono text-[8px] text-zinc-400 font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-teal-700/60 rounded" />
                  <span>Principal Repayment</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-teal-900/15 rounded" />
                  <span>Interest Accumulated</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Pre-qualification interactive Form section */}
        <AnimatePresence>
          {!isQualified ? (
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16"
            >
              <div className="max-w-2xl">
                <h3 className="font-display font-black text-teal-950 text-base mb-1.5 flex items-center gap-2">
                  <Award className="h-5 w-5 text-teal-700" />
                  Apply for Pre-Approved Escrow Pricing
                </h3>
                <p className="text-xs text-zinc-500 font-medium mb-6">
                  Fill out credentials to query our direct Nigerian escrow channels and obtain pre-qualified Tier 1 rates.
                </p>

                <form onSubmit={handlePreQualifySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[8px] font-black text-zinc-400 mb-2 block uppercase tracking-widest">Full Legal Name</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Chinelo Obi"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="block w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-teal-950 focus:ring-teal-700/20 focus:border-teal-700"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[8px] font-black text-zinc-400 mb-2 block uppercase tracking-widest">Estimated Monthly Income (USD)</label>
                    <input 
                      type="number"
                      required
                      placeholder="e.g. 15000"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      className="block w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-teal-950 focus:ring-teal-700/20 focus:border-teal-700"
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2 pt-2">
                    <button
                      type="submit"
                      disabled={submittingPreQual}
                      className="px-6 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[9px] tracking-widest font-extrabold uppercase rounded-xl cursor-pointer transition-all flex items-center gap-2"
                    >
                      {submittingPreQual ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Checking Escrows...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Credentials</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.section>
          ) : (
            <motion.section 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 border border-emerald-200/50 rounded-2xl p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-800">
                  <Check className="h-5 w-5 stroke-[3]" />
                  <h4 className="font-display font-black text-base">Pre-Qualification Elite Approved</h4>
                </div>
                <p className="text-xs text-emerald-950/70 font-medium max-w-xl">
                  Outstanding news, <strong>{fullName || 'Client'}</strong>. Our proprietary escrows verified your monthly liquidity threshold. Tier 1 parameters locked down for the next 30 days.
                </p>
              </div>

              <button 
                onClick={() => { AutoNovaAudio.playClick(); setIsQualified(false); setFullName(''); setMonthlyIncome(''); }}
                className="px-4 py-2.5 bg-white border border-emerald-200 hover:bg-emerald-100 text-emerald-800 font-mono text-[9px] font-extrabold uppercase tracking-widest rounded-lg cursor-pointer transition-all"
              >
                Reset Pre-Approval
              </button>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Partner Lender Ecosystem Grid */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-black text-teal-950 tracking-tight">Partner Lender Ecosystem</h2>
            <p className="text-xs text-zinc-400 font-mono uppercase tracking-widest mt-1">Directly integrated APIs for competitive rate indexing</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "AutoNova Nigeria Capital", tier: "Premium In-House", apr: "4.9%", term: "60 Months", monthly: monthlyPayment },
              { name: "Access Bank Elite Finance", tier: "AI Best Match", apr: "5.1%", term: "72 Months", monthly: Math.round(monthlyPayment * 0.88), featured: true },
              { name: "GTBank Premium Assets", tier: "Strategic Partner", apr: "5.4%", term: "48 Months", monthly: Math.round(monthlyPayment * 1.21) },
              { name: "Zenith Bank Curation Escrow", tier: "Flex Option", apr: "5.8%", term: "84 Months", monthly: Math.round(monthlyPayment * 0.78) }
            ].map((lender, index) => (
              <div 
                key={index}
                className={`bg-zinc-50 border rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 ${
                  lender.featured 
                    ? 'border-teal-700 bg-teal-50/20 ring-2 ring-teal-700/10' 
                    : 'border-zinc-200/60'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-display font-extrabold text-teal-950 text-sm">{lender.name}</h4>
                  </div>
                  <span className={`inline-block font-mono text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                    lender.featured ? 'bg-teal-700 text-white' : 'bg-zinc-200/80 text-zinc-500'
                  }`}>
                    {lender.tier}
                  </span>

                  <div className="space-y-3.5 my-6 border-t border-b border-zinc-200/40 py-4.5 font-semibold text-xs text-zinc-600">
                    <div className="flex justify-between items-center">
                      <span>Rate Index APR</span>
                      <span className="font-mono font-black text-teal-950">{lender.apr}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Assumed Term</span>
                      <span className="font-mono font-bold text-zinc-500">{lender.term}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Monthly Installment</span>
                      <span className="font-display font-black text-teal-700">${lender.monthly.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectOffer(lender.name)}
                  className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[9px] tracking-widest font-extrabold uppercase rounded-xl transition-all cursor-pointer text-center"
                >
                  Select Offer
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Collapsible FAQ Section */}
        <section className="max-w-3xl mx-auto mb-12">
          <div className="text-center mb-10">
            <h2 className="font-display text-xl font-black text-teal-950 tracking-tight">Financing FAQs</h2>
            <p className="text-xs text-zinc-400 font-mono uppercase tracking-widest mt-1">Understanding kinetics and currency protection</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What exactly is APR in premium automotive financing?",
                a: "Annual Percentage Rate (APR) compiles the primary baseline interest index and pre-calculated lender transaction overheads into a singular, highly transparent annual metrics cost."
              },
              {
                q: "How does my credit portfolio affect my AI kinetic rates?",
                a: "Our AI engine analyzes cashflow liquidity patterns to dynamically offset loan term parameters. High credit score index ratings immediately lock down the absolute lowest sub-5% APR offers."
              },
              {
                q: "Can I adjust my down payment post-qualification?",
                a: "Absolutely. AutoNova offers fluid parameter configuration up until contract validation. Adjusting parameters down or upward instantly recalculates integrated lender API responses."
              }
            ].map((faq, i) => (
              <details 
                key={i} 
                className="group bg-zinc-50 border border-zinc-200/50 rounded-2xl p-5 cursor-pointer hover:bg-zinc-100/50 transition-colors"
              >
                <summary className="flex justify-between items-center font-display font-bold text-xs text-teal-950 select-none">
                  <span>{faq.q}</span>
                  <ChevronDown className="h-4 w-4 text-zinc-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3.5 text-xs text-zinc-500 font-medium leading-relaxed border-t border-zinc-200/40 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
};
