import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  Check, ArrowLeft, Lock, ShieldCheck, CreditCard, Banknote,
  MapPin, Phone, User, Landmark, Sparkles, Send, Copy, AlertCircle,
  Clock, ArrowRight, ShieldAlert, BadgePercent, Download, MessageSquare, Truck, Sliders
} from 'lucide-react';

export const CheckoutView = ({ 
  userName, 
  role, 
  activeCar, 
  checkoutData,
  onBackToCart, 
  onBackToShowroom, 
  showNotification,
  onOrderSuccess
}) => {
  // Safe fallback vehicle details
  const car = activeCar || {
    id: 'lucid-air-sapphire',
    name: 'Lucid Air Sapphire',
    make: 'Lucid',
    model: 'Air Sapphire',
    price: 249000,
    desc: 'The pinnacle of electric performance. Hand-assembled precision with a tri-motor powertrain and exclusive Sapphire interior.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChSHTYG1fVEn51XrratM392c2DGk5YhV69dRhzAsrX0VqUVRyPwh4t0Bc3Z1yqbuHM1iwCp1z3F1f2DFYcCnQBaF58dNsRz04FGkjaacH__aGBqktgyHMoGXzkjfrEpWVM1mq6iJDyKim3w30TIK9fh70WRI94sb_sCrpZUR9ab7tTWzIn61C0M7HfPfQXrEP8HmgAqtxraak9I2UUN-nInEHsShMMWbj7SBUZHDhmnv_Y94yq_foA5JHq6JxTan8scFr1UuOAgUUh',
    specs: { power: '1,234 hp', zeroToSixty: '1.89s', range: '685 km' }
  };

  // Safe fallback financial values
  const {
    basePrice = car.price,
    addOnTotal = 2800,
    destinationFee = 1500,
    discountAmount = 0,
    totalEstimatedPrice = car.price + 2800 + 1500,
    deliveryMethod = 'showroom',
    deliveryState: initialDeliveryState = 'Lagos',
    deliveryAddress: initialDeliveryAddress = ''
  } = checkoutData || {};

  // Form states
  const [currentStep, setCurrentStep] = useState(2); // Step 1: Delivery (implied done), Step 2: Payment, Step 3: Confirmation
  const [paymentTab, setPaymentTab] = useState('card'); // 'card' | 'bank' | 'financing' | 'digital'
  const [orderNumber] = useState(() => `AN-NG-${Math.floor(800000 + Math.random() * 100000)}`);
  const [deliveryDateStr] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14); // 2 weeks in future
    return d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
  });
  
  // Delivery details form
  const [fullName, setFullName] = useState(userName || 'Julian Sterling');
  const [phone, setPhone] = useState('+234 (80) 3123 4567');
  const [deliveryState, setDeliveryState] = useState(initialDeliveryState);
  const [deliveryAddress, setDeliveryAddress] = useState(initialDeliveryAddress || 'Plot 14, Admiralty Way, Lekki Phase 1');
  const [postalCode, setPostalCode] = useState('105102');

  // Card details form
  const [cardNumber, setCardNumber] = useState('');

  // Real-time card brand detection based on standard IIN prefixes
  const detectCardBrand = (number) => {
    if (/^4/.test(number)) return 'Visa';
    if (/^(5[1-5]|2[2-7])/.test(number)) return 'Mastercard';
    if (/^3[47]/.test(number)) return 'Amex';
    if (/^6(011|5)/.test(number)) return 'Discover';
    return null;
  };
  const cardBrand = detectCardBrand(cardNumber);
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [billingSame, setBillingSame] = useState(true);

  // Bank transfer states
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Order processing states
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleCopyAccount = (accNo) => {
    navigator.clipboard.writeText(accNo);
    setCopiedAccount(true);
    AutoNovaAudio.playClick();
    showNotification("Escrow Account Number copied to clipboard!", "success");
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handlePlaceOrder = () => {
    // Form Validations
    if (!fullName.trim()) {
      showNotification("Please provide your full legal name.", "error");
      return;
    }
    if (!phone.trim()) {
      showNotification("Phone number is required for dispatch notification.", "error");
      return;
    }
    if (deliveryMethod === 'delivery' && !deliveryAddress.trim()) {
      showNotification("Please specify a flatbed delivery address.", "error");
      return;
    }

    if (paymentTab === 'card') {
      if (cardNumber.length < 12) {
        showNotification("Please enter a valid debit/credit card number.", "error");
        return;
      }
      if (!expiryDate.includes('/')) {
        showNotification("Enter a valid expiry date (MM/YY).", "error");
        return;
      }
      if (cvc.length < 3) {
        showNotification("Security code CVC must be at least 3 digits.", "error");
        return;
      }
    }

    AutoNovaAudio.playClick();
    setIsProcessing(true);

    // Simulate clearing / verification blockchain lag
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      setCurrentStep(3);
      AutoNovaAudio.playSuccess();
      showNotification("Order placed! Nigerian Customs Escrow channel established.", "success");
      
      if (onOrderSuccess) {
        onOrderSuccess({
          id: orderNumber,
          carName: car.name,
          trim: car.trim || 'Exclusive Curation',
          price: totalEstimatedPrice || car.price,
          status: 'Processing',
          placedDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
          image: car.image,
          timelineStep: 1, // Start at step 1: Confirmed
          deliveryMethod: deliveryMethod,
          orderComplete: false,
        });
      }
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col text-zinc-900 font-sans select-none">
      
      {/* Top Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-zinc-200/60 shadow-sm h-20">
        <div className="flex justify-between items-center h-full px-4 md:px-12 max-w-7xl mx-auto">
          <div 
            onClick={onBackToCart}
            className="font-display text-lg md:text-xl font-black tracking-tight text-teal-950 cursor-pointer flex items-center gap-2"
          >
            <span>AutoNova Kinetic</span>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-teal-50 border border-teal-100 text-teal-800">
              Nigeria
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => { AutoNovaAudio.playClick(); onBackToCart(); }}
              className="inline-flex items-center gap-1 px-3 py-1.5 hover:bg-zinc-100 font-mono text-[10px] tracking-widest uppercase font-extrabold rounded-xl transition-all cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Cart</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Layout container */}
      <main className="pt-28 pb-20 px-4 md:px-12 max-w-7xl mx-auto flex-grow w-full">
        
        {/* Progress Timeline Header */}
        <div className="mb-12">
          <div className="flex items-center justify-center max-w-2xl mx-auto">
            {/* Step 1: Delivery */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-9 h-9 rounded-full bg-teal-800 text-white flex items-center justify-center font-mono font-black text-xs shadow-md">
                <Check className="h-4.5 w-4.5" />
              </div>
              <span className="mt-2 font-mono text-[8px] font-extrabold text-teal-900 uppercase tracking-widest">Delivery</span>
            </div>

            {/* Connecting line */}
            <div className={`flex-1 h-0.5 mx-4 -mt-5 transition-all duration-500 ${
              currentStep >= 2 ? 'bg-teal-800' : 'bg-zinc-200'
            }`} />

            {/* Step 2: Payment */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-black text-xs transition-all ${
                currentStep === 2 
                  ? 'bg-teal-700 text-white shadow-md ring-4 ring-teal-700/10' 
                  : currentStep > 2 
                    ? 'bg-teal-800 text-white' 
                    : 'bg-zinc-200 text-zinc-400'
              }`}>
                {currentStep > 2 ? <Check className="h-4.5 w-4.5" /> : '2'}
              </div>
              <span className={`mt-2 font-mono text-[8px] font-extrabold uppercase tracking-widest ${
                currentStep >= 2 ? 'text-teal-900' : 'text-zinc-400'
              }`}>Payment</span>
            </div>

            {/* Connecting line */}
            <div className={`flex-1 h-0.5 mx-4 -mt-5 transition-all duration-500 ${
              currentStep >= 3 ? 'bg-teal-800' : 'bg-zinc-200'
            }`} />

            {/* Step 3: Review */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-black text-xs transition-all ${
                currentStep === 3 
                  ? 'bg-teal-700 text-white shadow-md ring-4 ring-teal-700/10' 
                  : 'bg-zinc-200 text-zinc-400'
              }`}>
                3
              </div>
              <span className={`mt-2 font-mono text-[8px] font-extrabold uppercase tracking-widest ${
                currentStep === 3 ? 'text-teal-900' : 'text-zinc-400'
              }`}>Review</span>
            </div>
          </div>
        </div>

        {/* Loading / Processing State Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 z-[100] backdrop-blur-md bg-zinc-950/20 flex flex-col items-center justify-center text-center">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-zinc-100 flex flex-col items-center max-w-sm mx-4">
              <div className="relative w-14 h-14 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-teal-500/10" />
                <div className="absolute inset-0 rounded-full border-4 border-t-teal-800 animate-spin" />
              </div>
              <h3 className="font-display font-black text-base text-teal-950 uppercase tracking-wider mb-2">Establishing Secure Channel</h3>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Verifying escrow parameters and clearing duties with the Nigerian Customs Ledger. Please do not disconnect.
              </p>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!orderComplete ? (
            <motion.div 
              key="checkout-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              
              {/* Left Column: Form Details */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* 1. Recipient / Logistics Details */}
                <section className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-200/60 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-teal-800">
                      <MapPin className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h2 className="font-display font-black text-sm text-teal-950 uppercase tracking-wider">
                        1. Dispatch & Delivery Route
                      </h2>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">
                        {deliveryMethod === 'showroom' ? 'Lekki Showroom VIP Collection' : 'Flatbed Home Transport'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                        Legal Recipient Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <input 
                          type="text" 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your Legal Legal Name"
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                        Mobile Dispatch contact
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <input 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+234..."
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                        />
                      </div>
                    </div>

                    {deliveryMethod === 'delivery' && (
                      <>
                        <div className="md:col-span-2 flex flex-col gap-1.5">
                          <label className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                            Destination Address
                          </label>
                          <input 
                            type="text" 
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            placeholder="Street Name, Area, Estate"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                            State
                          </label>
                          <select 
                            value={deliveryState}
                            onChange={(e) => setDeliveryState(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                          >
                            <option value="Lagos">Lagos State</option>
                            <option value="Abuja">FCT Abuja</option>
                            <option value="Rivers">Rivers State (Port Harcourt)</option>
                            <option value="Kano">Kano State</option>
                            <option value="Oyo">Oyo State (Ibadan)</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                            Postal Code
                          </label>
                          <input 
                            type="text" 
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </section>

                {/* 2. Interactive Payment Escrow Option Selector */}
                <section className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-200/60 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-teal-800">
                      <CreditCard className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h2 className="font-display font-black text-sm text-teal-950 uppercase tracking-wider">
                        2. Certified Escrow Channel
                      </h2>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">
                        Secured clearing networks
                      </p>
                    </div>
                  </div>

                  {/* Payment Tabs Selector */}
                  <div className="flex flex-wrap gap-2 p-1.5 bg-zinc-100 rounded-xl mb-6">
                    <button 
                      type="button"
                      onClick={() => { AutoNovaAudio.playClick(); setPaymentTab('card'); }}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transition-all ${
                        paymentTab === 'card' 
                          ? 'bg-white text-teal-950 shadow-sm border border-zinc-200/20' 
                          : 'text-zinc-500 hover:text-zinc-800'
                      }`}
                    >
                      <CreditCard className="h-3.5 w-3.5" />
                      <span>Debit/Credit Card</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => { AutoNovaAudio.playClick(); setPaymentTab('bank'); }}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transition-all ${
                        paymentTab === 'bank' 
                          ? 'bg-white text-teal-950 shadow-sm border border-zinc-200/20' 
                          : 'text-zinc-500 hover:text-zinc-800'
                      }`}
                    >
                      <Landmark className="h-3.5 w-3.5" />
                      <span>Bank Transfer</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => { AutoNovaAudio.playClick(); setPaymentTab('financing'); }}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transition-all ${
                        paymentTab === 'financing' 
                          ? 'bg-white text-teal-950 shadow-sm border border-zinc-200/20' 
                          : 'text-zinc-500 hover:text-zinc-800'
                      }`}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Financing</span>
                    </button>
                  </div>

                  {/* Card Form */}
                  {paymentTab === 'card' && (
                    <div className="space-y-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                          Card Number
                        </label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                          <input 
                            type="text" 
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').substring(0, 16))}
                            placeholder="0000 0000 0000 0000"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-20 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 font-mono tracking-widest"
                          />
                          <AnimatePresence>
                            {cardBrand && (
                              <motion.span
                                initial={{ opacity: 0, scale: 0.8, x: 6 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-teal-50 border border-teal-100 text-teal-800 text-[9px] font-mono font-black uppercase tracking-wide"
                              >
                                {cardBrand}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                            Expiry Date
                          </label>
                          <input 
                            type="text" 
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value.substring(0, 5))}
                            placeholder="MM/YY"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 font-mono tracking-widest text-center"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                            CVC / CVV
                          </label>
                          <input 
                            type="password" 
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                            placeholder="***"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 font-mono tracking-widest text-center"
                          />
                        </div>
                      </div>

                      <div className="pt-4 flex items-center gap-3">
                        <button 
                          type="button"
                          onClick={() => { AutoNovaAudio.playClick(); setBillingSame(!billingSame); }}
                          className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                            billingSame ? 'bg-teal-800' : 'bg-zinc-200'
                          }`}
                        >
                          <div className={`bg-white w-4 h-4 rounded-full shadow transition-transform duration-200 ${
                            billingSame ? 'translate-x-5' : 'translate-x-0'
                          }`} />
                        </button>
                        <span className="text-[11px] text-zinc-500 font-medium">Billing address same as delivery address</span>
                      </div>
                    </div>
                  )}

                  {/* Bank Transfer Form */}
                  {paymentTab === 'bank' && (
                    <div className="space-y-4">
                      <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200/50 flex items-start gap-3">
                        <AlertCircle className="h-4 w-4 text-teal-800 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-zinc-500 leading-normal font-medium">
                          You can wire or transfer funds directly to AutoNova's CBN Escrow Vault. Copy the account details below. Your order will clear instantly upon confirmation of funds.
                        </p>
                      </div>

                      <div className="space-y-3">
                        {[
                          { bank: "Access Bank Plc", name: "AUTONOVA NIGERIA LTD ESCROW", acc: "1234567890" },
                          { bank: "Zenith Bank Plc", name: "AUTONOVA NIGERIA LTD ESCROW", acc: "0987654321" }
                        ].map((acc, idx) => (
                          <div 
                            key={idx} 
                            className="bg-white border border-zinc-200/60 p-4 rounded-xl flex justify-between items-center hover:border-teal-700/10 transition-colors"
                          >
                            <div>
                              <p className="text-xs font-bold text-teal-950 font-display uppercase tracking-wider">{acc.bank}</p>
                              <p className="text-[10px] font-mono font-bold text-zinc-400 tracking-wide mt-1">
                                {acc.name}
                              </p>
                              <p className="text-xs font-mono font-black text-teal-950 mt-1">{acc.acc}</p>
                            </div>
                            
                            <button 
                              type="button"
                              onClick={() => handleCopyAccount(acc.acc)}
                              className="p-2.5 rounded-xl text-zinc-400 hover:text-teal-800 hover:bg-teal-50 transition-colors"
                              title="Copy Account Number"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Financing Panel */}
                  {paymentTab === 'financing' && (
                    <div className="space-y-4">
                      <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-100/50 flex items-start gap-3">
                        <Sparkles className="h-4 w-4 text-teal-800 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-teal-950">Pre-Approved Capital Available</p>
                          <p className="text-[10px] text-teal-700 font-semibold leading-normal mt-0.5">
                            AutoNova Partners (Access Bank, GTBank) offer certified monthly plans based on your pre-qualified credentials.
                          </p>
                        </div>
                      </div>

                      <div className="bg-zinc-50 p-4 border border-zinc-200/60 rounded-xl grid grid-cols-2 gap-4">
                        <div>
                          <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase block mb-1">
                            Financing Rate
                          </span>
                          <span className="font-display font-black text-sm text-teal-950 block">
                            5.1% APR
                          </span>
                        </div>
                        <div>
                          <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase block mb-1">
                            Amortization Term
                          </span>
                          <span className="font-display font-black text-sm text-teal-950 block">
                            72 Months
                          </span>
                        </div>
                        <div className="col-span-2 pt-2 border-t border-zinc-200/50">
                          <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase block mb-1">
                            Pre-Approved Installment Value
                          </span>
                          <span className="font-display font-black text-base text-teal-800">
                            ₦{Math.round(totalEstimatedPrice * 1600 * 0.018).toLocaleString()} / month
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </section>

              </div>

              {/* Right Column: Interactive Sticky Order Summary */}
              <aside className="lg:col-span-4">
                <div className="sticky top-24 space-y-6">
                  
                  {/* Summary Card */}
                  <div className="bg-white rounded-2xl p-6 border border-zinc-200/60 shadow-lg">
                    <h3 className="font-display font-black text-sm text-teal-950 uppercase tracking-wider mb-5">
                      Your Order Spec
                    </h3>

                    <div className="flex gap-4 pb-5 border-b border-zinc-100">
                      <div className="w-20 h-14 rounded-xl bg-zinc-100 overflow-hidden shrink-0">
                        <img 
                          className="w-full h-full object-cover" 
                          src={car.image} 
                          alt={car.name} 
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-display font-black text-xs text-teal-950 leading-tight truncate">
                          {car.name}
                        </h4>
                        <p className="text-[9px] font-mono font-bold text-zinc-400 uppercase mt-1">
                          Tri-motor // Sapphire Trim
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3.5 py-5 border-b border-zinc-100 text-xs font-semibold text-zinc-500">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="text-teal-950 font-bold">₦{(basePrice * 1600).toLocaleString()}</span>
                      </div>

                      {addOnTotal > 0 && (
                        <div className="flex justify-between">
                          <span>Add-ons</span>
                          <span className="text-teal-950 font-bold">₦{(addOnTotal * 1600).toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>Lagos Port Clearing & Duty</span>
                        <span className="text-teal-950 font-bold">₦{(destinationFee * 1600).toLocaleString()}</span>
                      </div>

                      {discountAmount > 0 && (
                        <div className="flex justify-between text-teal-800 bg-teal-50/50 p-2 rounded-lg border border-teal-100/30">
                          <span>Promo Applied (5%)</span>
                          <span>- ₦{(discountAmount * 1600).toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-5 flex justify-between items-baseline">
                      <span className="font-display font-black text-xs text-teal-950 uppercase tracking-widest">
                        Total Value
                      </span>
                      <div className="text-right">
                        <span className="font-display font-black text-xl text-teal-950 block">
                          ₦{(totalEstimatedPrice * 1600).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium block">
                          Est. ${totalEstimatedPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={handlePlaceOrder}
                      className="w-full bg-teal-700 hover:bg-teal-800 text-white font-mono text-[10px] font-black tracking-widest uppercase py-4 rounded-xl shadow-lg mt-6 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-99"
                    >
                      <Lock className="h-4 w-4" />
                      <span>Place Secure Escrow Order</span>
                    </button>
                  </div>

                  {/* Escrow Guarantee Badge */}
                  <div className="bg-teal-50/30 border border-teal-100/50 p-5 rounded-2xl">
                    <div className="flex items-start gap-3 text-teal-900">
                      <ShieldCheck className="h-5 w-5 text-teal-800 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold font-display uppercase tracking-wider">AutoNova Escrow Guarantee</h4>
                        <p className="text-[10px] text-zinc-500 font-medium leading-relaxed mt-1">
                          Your money is held in a secure CBN-compliant escrow structure. Funds are strictly released to the liquidator/seller only upon Port Customs inspection and dispatch sign-off.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </aside>

            </motion.div>
          ) : (
            <motion.div 
              key="checkout-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 25 }}
              className="max-w-3xl mx-auto bg-white border border-zinc-200/60 shadow-2xl rounded-3xl p-6 md:p-10 text-center"
            >
              {/* Success Header */}
              <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6 text-teal-800 shadow-inner">
                <Check className="h-10 w-10 text-teal-700" />
              </div>

              <h2 className="font-display font-black text-xl md:text-3xl text-teal-950 tracking-tight">
                You're all set! Order Confirmed.
              </h2>
              <p className="text-zinc-500 font-medium text-xs md:text-sm mt-2 max-w-lg mx-auto">
                Thank you for choosing AutoNova Kinetic. Your precision-engineered journey begins now on the sovereign Nigerian node network.
              </p>

              {/* Order Summary Card */}
              <div className="bg-zinc-50 rounded-2xl border border-zinc-200/60 overflow-hidden my-8 text-left shadow-sm">
                <div className="p-5 md:p-6 flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden bg-zinc-200 shrink-0 shadow-inner">
                    <img 
                      className="w-full h-full object-cover" 
                      src={car.image} 
                      alt={car.name} 
                    />
                  </div>
                  <div className="w-full md:w-2/3 grid grid-cols-2 gap-x-4 gap-y-5">
                    <div>
                      <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Order Number</p>
                      <p className="font-display font-black text-xs md:text-sm text-teal-950 mt-1">{orderNumber}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Delivery Date</p>
                      <p className="font-display font-black text-xs md:text-sm text-teal-950 mt-1">{deliveryDateStr}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Vehicle Spec</p>
                      <p className="font-display font-black text-xs md:text-sm text-teal-950 mt-1 leading-tight">{car.name}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Total Paid (Escrow)</p>
                      <div className="mt-1">
                        <span className="font-display font-black text-xs md:text-sm text-teal-700 block">
                          ₦{(totalEstimatedPrice * 1600).toLocaleString()}
                        </span>
                        <span className="font-mono text-[8px] font-bold text-zinc-400 block tracking-wider">
                          (${totalEstimatedPrice.toLocaleString()} USD)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps Timeline */}
              <section className="mb-10 mt-6 bg-zinc-50/50 p-6 rounded-2xl border border-zinc-200/40">
                <h3 className="font-mono text-[8px] font-extrabold text-zinc-400 mb-6 text-center uppercase tracking-[0.2em]">Next Steps</h3>
                <div className="relative flex justify-between items-start max-w-md mx-auto px-2">
                  {/* Progress Line */}
                  <div className="absolute top-5 left-8 right-8 h-0.5 bg-zinc-200 z-0">
                    <div className="h-full bg-teal-700 w-1/2"></div>
                  </div>
                  
                  {/* Stage 1 */}
                  <div className="relative z-10 flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center shadow-sm">
                      <Check className="h-4.5 w-4.5 text-teal-800" />
                    </div>
                    <span className="font-mono text-[8px] font-extrabold text-teal-900 uppercase tracking-widest">Processing</span>
                  </div>

                  {/* Stage 2 */}
                  <div className="relative z-10 flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-full border-2 border-teal-700 bg-white flex items-center justify-center shadow-md">
                      <div className="w-2.5 h-2.5 rounded-full bg-teal-700 animate-pulse" />
                    </div>
                    <span className="font-mono text-[8px] font-extrabold text-teal-950 uppercase tracking-widest">CBN & Doc Clearing</span>
                  </div>

                  {/* Stage 3 */}
                  <div className="relative z-10 flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200/50 flex items-center justify-center">
                      <Truck className="h-4.5 w-4.5 text-zinc-400" />
                    </div>
                    <span className="font-mono text-[8px] font-extrabold text-zinc-400 uppercase tracking-widest">Flatbed Delivery</span>
                  </div>
                </div>
              </section>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button 
                  onClick={() => {
                    AutoNovaAudio.playClick();
                    showNotification(`Transit tracking node activated. Dispatch departing Lagos Port soon to ${deliveryMethod === 'showroom' ? 'Lekki Showroom' : deliveryState}.`, "info");
                  }}
                  className="flex-1 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[9px] font-black uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                >
                  <Truck className="h-3.5 w-3.5" />
                  <span>Track Your Order</span>
                </button>

                <button 
                  onClick={() => {
                    AutoNovaAudio.playClick();
                    showNotification("Secure messaging tunnel established with Lekki Concierge.", "success");
                  }}
                  className="flex-1 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-teal-950 font-mono text-[9px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Chat with Seller</span>
                </button>

                <button 
                  onClick={() => {
                    AutoNovaAudio.playClick();
                    showNotification("Downloading electronic CBN escrow ledger receipt.", "success");
                    const credentialData = {
                      orderId: orderNumber,
                      recipient: fullName,
                      curation: car.name,
                      basePriceNGN: basePrice * 1600,
                      totalPaidNGN: totalEstimatedPrice * 1600,
                      clearingPort: "Lagos Apapa Complex",
                      dispatchRoute: deliveryMethod === 'showroom' ? 'Lekki Showroom Pickup' : `Enclosed Flatbed to ${deliveryState}`,
                      status: "CBN Escrow Held"
                    };
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(credentialData, null, 2));
                    const dl = document.createElement('a');
                    dl.setAttribute("href", dataStr);
                    dl.setAttribute("download", `Invoice_${orderNumber}.json`);
                    dl.click();
                  }}
                  className="flex-grow-0 py-3.5 px-5 bg-zinc-50 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 font-mono text-[9px] font-black uppercase tracking-wider rounded-xl border border-zinc-200 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Receipt</span>
                </button>
              </div>

              {/* Suggestion Row */}
              <section className="text-left mt-10 pt-8 border-t border-zinc-200/50">
                <h3 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider mb-4">Protect Your Investment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card 1 */}
                  <div 
                    onClick={() => {
                      AutoNovaAudio.playClick();
                      showNotification("Elite Insurance coverage option added to consultation.", "success");
                    }}
                    className="group bg-zinc-50 border border-zinc-200/50 p-5 rounded-2xl flex gap-4 items-center hover:bg-zinc-100/50 transition-all cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-xl bg-white border border-zinc-100 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <ShieldCheck className="h-7 w-7 text-teal-800" />
                    </div>
                    <div>
                      <p className="font-display font-black text-xs text-teal-950 mb-0.5">Elite Insurance</p>
                      <p className="text-[10px] text-zinc-500 font-semibold leading-normal">
                        Comprehensive protection starting at ₦398,400/mo, underwritten by AXA Mansard & Leadway Assurance (CBN Approved).
                      </p>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div 
                    onClick={() => {
                      AutoNovaAudio.playClick();
                      showNotification("Laser-measured custom floor mats option added to curation.", "success");
                    }}
                    className="group bg-zinc-50 border border-zinc-200/50 p-5 rounded-2xl flex gap-4 items-center hover:bg-zinc-100/50 transition-all cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-xl bg-white border border-zinc-100 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <Sliders className="h-7 w-7 text-teal-800" />
                    </div>
                    <div>
                      <p className="font-display font-black text-xs text-teal-950 mb-0.5">Custom Floor Mats</p>
                      <p className="text-[10px] text-zinc-500 font-semibold leading-normal">
                        Laser-measured, heavy-duty protective floor liners styled for your vehicle, shipped directly to your Nigerian address.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Return link */}
              <div className="mt-8 pt-4 border-t border-zinc-100 flex justify-center">
                <button
                  onClick={() => {
                    AutoNovaAudio.playClick();
                    onBackToShowroom();
                  }}
                  className="text-[10px] font-mono font-black text-teal-800 hover:text-teal-950 uppercase tracking-widest flex items-center gap-1.5 cursor-pointer hover:translate-x-1 transition-transform"
                >
                  <span>Return to Showroom Dashboard</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200/50 py-12 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="font-display text-lg font-black text-teal-950">AutoNova Kinetic</div>
            <p className="text-[10px] font-mono font-medium text-zinc-400 uppercase tracking-widest">
              © 2026 AutoNova Nigeria Ltd. Precision Engineered Curation.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-mono font-bold uppercase text-zinc-400">
            <button onClick={onBackToShowroom} className="hover:text-teal-950 transition-colors">Privacy Policy</button>
            <button onClick={onBackToShowroom} className="hover:text-teal-950 transition-colors">Terms of Service</button>
            <button onClick={onBackToShowroom} className="hover:text-teal-950 transition-colors">Shipping ledger</button>
            <button onClick={onBackToShowroom} className="hover:text-teal-950 transition-colors">Support Node</button>
          </div>
        </div>
      </footer>

    </div>
  );
};
